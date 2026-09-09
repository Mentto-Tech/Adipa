from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
import enum

from app.database import Base


class MidiaType(str, enum.Enum):
    foto = "foto"
    video = "video"


class Noticia(Base):
    __tablename__ = "noticias"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(255), nullable=False)
    texto = Column(Text, nullable=False)
    capa = Column(String(512), nullable=False)  # caminho do arquivo de capa
    slug = Column(String(255), unique=True, index=True, nullable=False)
    criado_em = Column(DateTime, default=datetime.utcnow)
    atualizado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    midias = relationship("Midia", back_populates="noticia", cascade="all, delete-orphan")


class Midia(Base):
    __tablename__ = "midias"

    id = Column(Integer, primary_key=True, index=True)
    noticia_id = Column(Integer, ForeignKey("noticias.id"), nullable=False)
    tipo = Column(Enum(MidiaType), nullable=False)
    url = Column(String(512), nullable=False)  # caminho ou URL do arquivo
    ordem = Column(Integer, default=0)

    noticia = relationship("Noticia", back_populates="midias")
