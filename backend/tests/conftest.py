import io
import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Banco de teste — usa a mesma DATABASE_URL (postgres do docker)
TEST_DB_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://adipa:adipa@db:5432/adipa_db",
)

from app.database import Base, get_db  # noqa: E402
from app.security import hash_password  # noqa: E402
from app.models import Admin  # noqa: E402

engine_test = create_engine(TEST_DB_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine_test)


@pytest.fixture(scope="session", autouse=True)
def setup_db():
    """Cria todas as tabelas antes dos testes e remove depois."""
    Base.metadata.create_all(bind=engine_test)
    yield
    Base.metadata.drop_all(bind=engine_test)


@pytest.fixture()
def db_session(setup_db):
    """Sessão limpa por teste — rollback ao final."""
    connection = engine_test.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)

    yield session

    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture()
def client(db_session):
    """TestClient com banco isolado via dependency override."""
    from main import app  # importa após setup do engine
    from app.routers.auth import _attempts

    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    _attempts.clear()  # reseta rate limit entre testes
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


@pytest.fixture()
def admin_in_db(db_session):
    """Cria um admin de teste no banco."""
    admin = Admin(username="testadmin", hashed_password=hash_password("testpass123"))
    db_session.add(admin)
    db_session.commit()
    return admin


@pytest.fixture()
def auth_headers(client, admin_in_db):
    """Retorna headers Bearer com token válido."""
    res = client.post("/auth/login", json={"username": "testadmin", "password": "testpass123"})
    assert res.status_code == 200
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture()
def fake_image() -> io.BytesIO:
    """Imagem PNG mínima válida (1x1 pixel)."""
    import struct, zlib

    def _chunk(name: bytes, data: bytes) -> bytes:
        c = struct.pack(">I", len(data)) + name + data
        return c + struct.pack(">I", zlib.crc32(name + data) & 0xFFFFFFFF)

    png = (
        b"\x89PNG\r\n\x1a\n"
        + _chunk(b"IHDR", struct.pack(">IIBBBBB", 1, 1, 8, 2, 0, 0, 0))
        + _chunk(b"IDAT", zlib.compress(b"\x00\xff\xff\xff"))
        + _chunk(b"IEND", b"")
    )
    buf = io.BytesIO(png)
    buf.name = "test.png"
    return buf
