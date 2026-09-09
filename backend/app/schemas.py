from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

from app.models import MidiaType


class MidiaOut(BaseModel):
    id: int
    tipo: MidiaType
    url: str
    ordem: int

    class Config:
        from_attributes = True


class NoticiaOut(BaseModel):
    id: int
    titulo: str
    texto: str
    capa: str
    slug: str
    criado_em: datetime
    atualizado_em: datetime
    midias: List[MidiaOut] = []

    class Config:
        from_attributes = True


class NoticiaListItem(BaseModel):
    id: int
    titulo: str
    capa: str
    slug: str
    criado_em: datetime

    class Config:
        from_attributes = True
