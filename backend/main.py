from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.database import Base, engine, SessionLocal
from app.routers import noticias
from app.routers.auth import router as auth_router, seed_admin

# Cria tabelas
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ADIPA API",
    description="API para gerenciamento de notícias da ADIPA",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Seed admin padrão na inicialização
@app.on_event("startup")
def on_startup():
    db = SessionLocal()
    try:
        seed_admin(db)
    finally:
        db.close()

# Serve arquivos de upload
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "/uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

app.include_router(auth_router)
app.include_router(noticias.router)


@app.get("/")
def root():
    return {"status": "ok", "message": "ADIPA API"}
