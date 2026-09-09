import os
import re
import uuid
from typing import List, Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Midia, MidiaType, Noticia
from app.schemas import NoticiaListItem, NoticiaOut

router = APIRouter(prefix="/noticias", tags=["noticias"])

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "/uploads")
ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
ALLOWED_VIDEO_TYPES = {"video/mp4", "video/webm", "video/ogg"}


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[àáâãäå]", "a", text)
    text = re.sub(r"[èéêë]", "e", text)
    text = re.sub(r"[ìíîï]", "i", text)
    text = re.sub(r"[òóôõö]", "o", text)
    text = re.sub(r"[ùúûü]", "u", text)
    text = re.sub(r"[ç]", "c", text)
    text = re.sub(r"[ñ]", "n", text)
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s]+", "-", text)
    return text


def save_upload(file: UploadFile, subfolder: str) -> str:
    dest_dir = os.path.join(UPLOAD_DIR, subfolder)
    os.makedirs(dest_dir, exist_ok=True)
    ext = os.path.splitext(file.filename or "file")[1]
    filename = f"{uuid.uuid4().hex}{ext}"
    dest_path = os.path.join(dest_dir, filename)
    with open(dest_path, "wb") as f:
        f.write(file.file.read())
    return f"/{subfolder}/{filename}"


@router.post("/", response_model=NoticiaOut, status_code=status.HTTP_201_CREATED)
async def criar_noticia(
    titulo: str = Form(...),
    texto: str = Form(...),
    capa: UploadFile = File(...),
    fotos: Optional[List[UploadFile]] = File(default=None),
    videos: Optional[List[UploadFile]] = File(default=None),
    db: Session = Depends(get_db),
):
    # Valida capa
    if capa.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Capa deve ser uma imagem. Recebido: {capa.content_type}",
        )

    # Salva capa
    capa_url = save_upload(capa, "capas")

    # Gera slug único
    base_slug = slugify(titulo)
    slug = base_slug
    counter = 1
    while db.query(Noticia).filter(Noticia.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    noticia = Noticia(titulo=titulo, texto=texto, capa=capa_url, slug=slug)
    db.add(noticia)
    db.flush()  # obter o id antes de adicionar mídias

    # Processa fotos
    if fotos:
        for ordem, foto in enumerate(fotos):
            if foto.content_type not in ALLOWED_IMAGE_TYPES:
                raise HTTPException(
                    status_code=400,
                    detail=f"Foto inválida: {foto.filename} ({foto.content_type})",
                )
            url = save_upload(foto, "fotos")
            db.add(Midia(noticia_id=noticia.id, tipo=MidiaType.foto, url=url, ordem=ordem))

    # Processa vídeos
    if videos:
        for ordem, video in enumerate(videos):
            if video.content_type not in ALLOWED_VIDEO_TYPES:
                raise HTTPException(
                    status_code=400,
                    detail=f"Vídeo inválido: {video.filename} ({video.content_type})",
                )
            url = save_upload(video, "videos")
            db.add(Midia(noticia_id=noticia.id, tipo=MidiaType.video, url=url, ordem=ordem))

    db.commit()
    db.refresh(noticia)
    return noticia


@router.get("/", response_model=List[NoticiaListItem])
def listar_noticias(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    return db.query(Noticia).order_by(Noticia.criado_em.desc()).offset(skip).limit(limit).all()


@router.get("/{slug}", response_model=NoticiaOut)
def obter_noticia(slug: str, db: Session = Depends(get_db)):
    noticia = db.query(Noticia).filter(Noticia.slug == slug).first()
    if not noticia:
        raise HTTPException(status_code=404, detail="Notícia não encontrada")
    return noticia


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_noticia(id: int, db: Session = Depends(get_db)):
    noticia = db.query(Noticia).filter(Noticia.id == id).first()
    if not noticia:
        raise HTTPException(status_code=404, detail="Notícia não encontrada")
    db.delete(noticia)
    db.commit()
