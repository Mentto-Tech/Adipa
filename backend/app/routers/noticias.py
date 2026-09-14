import re
from typing import List, Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Midia, MidiaType, Noticia
from app.schemas import NoticiaListItem, NoticiaOut
from app.security import get_current_admin
from app.storage import delete_file, upload_file

router = APIRouter(prefix="/noticias", tags=["noticias"])

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
ALLOWED_VIDEO_TYPES = {"video/mp4", "video/webm", "video/ogg"}


def slugify(text: str) -> str:    text = text.lower().strip()
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


@router.post("/", response_model=NoticiaOut, status_code=status.HTTP_201_CREATED)
async def criar_noticia(
    titulo: str = Form(...),
    texto: str = Form(...),
    capa: UploadFile = File(...),
    fotos: Optional[List[UploadFile]] = File(default=None),
    videos: Optional[List[UploadFile]] = File(default=None),
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    # Valida capa
    if capa.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Capa deve ser uma imagem. Recebido: {capa.content_type}",
        )

    # Salva capa
    capa_url = upload_file(capa, "capas")

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
            url = upload_file(foto, "fotos")
            db.add(Midia(noticia_id=noticia.id, tipo=MidiaType.foto, url=url, ordem=ordem))

    # Processa vídeos
    if videos:
        for ordem, video in enumerate(videos):
            if video.content_type not in ALLOWED_VIDEO_TYPES:
                raise HTTPException(
                    status_code=400,
                    detail=f"Vídeo inválido: {video.filename} ({video.content_type})",
                )
            url = upload_file(video, "videos")
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


@router.put("/{id}", response_model=NoticiaOut)
async def atualizar_noticia(
    id: int,
    titulo: str = Form(...),
    texto: str = Form(...),
    capa: Optional[UploadFile] = File(default=None),
    fotos: Optional[List[UploadFile]] = File(default=None),
    remove_midias: Optional[str] = Form(default=None),
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    noticia = db.query(Noticia).filter(Noticia.id == id).first()
    if not noticia:
        raise HTTPException(status_code=404, detail="Notícia não encontrada")

    noticia.titulo = titulo
    noticia.texto = texto

    if capa and capa.filename:
        if capa.content_type not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(status_code=400, detail="Capa deve ser uma imagem.")
        delete_file(noticia.capa)
        noticia.capa = upload_file(capa, "capas")

    if remove_midias:
        ids_to_remove = [int(x) for x in remove_midias.split(",") if x.strip().isdigit()]
        if ids_to_remove:
            db.query(Midia).filter(Midia.id.in_(ids_to_remove), Midia.noticia_id == id).delete(synchronize_session="fetch")

    if fotos:
        existing_count = db.query(Midia).filter(Midia.noticia_id == id).count()
        for idx, foto in enumerate(fotos):
            if foto.content_type not in ALLOWED_IMAGE_TYPES:
                raise HTTPException(
                    status_code=400,
                    detail=f"Foto inválida: {foto.filename} ({foto.content_type})",
                )
            url = upload_file(foto, "fotos")
            db.add(Midia(noticia_id=noticia.id, tipo=MidiaType.foto, url=url, ordem=existing_count + idx))

    db.commit()
    db.refresh(noticia)
    return noticia


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_noticia(id: int, db: Session = Depends(get_db), _admin: str = Depends(get_current_admin)):
    noticia = db.query(Noticia).filter(Noticia.id == id).first()
    if not noticia:
        raise HTTPException(status_code=404, detail="Notícia não encontrada")
    delete_file(noticia.capa)
    for midia in noticia.midias:
        delete_file(midia.url)
    db.delete(noticia)
    db.commit()
