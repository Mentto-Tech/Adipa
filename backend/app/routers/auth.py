import os
from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Admin
from app.security import create_token, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])

# ---------- schemas ----------

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# ---------- in-memory rate limiter ----------
# Stores: { ip: {"count": int, "window_start": float} }
_attempts: dict = {}
MAX_ATTEMPTS = 5
WINDOW_SECONDS = 60


def _check_rate_limit(request: Request):
    import time
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    entry = _attempts.get(ip)

    if entry:
        if now - entry["window_start"] > WINDOW_SECONDS:
            _attempts[ip] = {"count": 1, "window_start": now}
        else:
            entry["count"] += 1
            if entry["count"] > MAX_ATTEMPTS:
                retry_after = int(WINDOW_SECONDS - (now - entry["window_start"])) + 1
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail=f"Muitas tentativas. Aguarde {retry_after} segundos.",
                    headers={"Retry-After": str(retry_after)},
                )
    else:
        _attempts[ip] = {"count": 1, "window_start": now}


def _reset_rate_limit(request: Request):
    ip = request.client.host if request.client else "unknown"
    _attempts.pop(ip, None)


# ---------- seed admin on startup ----------

def seed_admin(db: Session):
    """Cria o admin padrão a partir das variáveis de ambiente se não existir."""
    username = os.getenv("ADMIN_USERNAME", "admin")
    password = os.getenv("ADMIN_PASSWORD")
    if not password:
        return
    existing = db.query(Admin).filter(Admin.username == username).first()
    if not existing:
        db.add(Admin(username=username, hashed_password=hash_password(password)))
        db.commit()


# ---------- endpoint ----------

@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest, request: Request, db: Session = Depends(get_db)):
    _check_rate_limit(request)

    # Constant-time lookup to avoid user enumeration
    admin = db.query(Admin).filter(Admin.username == body.username).first()
    password_ok = verify_password(body.password, admin.hashed_password) if admin else False

    if not admin or not password_ok:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
        )

    _reset_rate_limit(request)
    token = create_token(admin.username)
    return TokenResponse(access_token=token)
