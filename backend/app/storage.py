import os
import uuid

from fastapi import UploadFile

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
S3_BUCKET = os.getenv("S3_BUCKET")
S3_BASE_URL = os.getenv("S3_BASE_URL")
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "/uploads")


# ── S3 ──────────────────────────────────────────────────────────────

def _s3_client():
    import boto3
    return boto3.client(
        "s3",
        region_name=AWS_REGION,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    )


def _upload_s3(file: UploadFile, subfolder: str) -> str:
    from botocore.exceptions import BotoCoreError, ClientError

    ext = os.path.splitext(file.filename or "file")[1]
    key = f"{subfolder}/{uuid.uuid4().hex}{ext}"

    try:
        _s3_client().upload_fileobj(
            file.file,
            S3_BUCKET,
            key,
            ExtraArgs={"ContentType": file.content_type or "application/octet-stream"},
        )
    except (BotoCoreError, ClientError) as e:
        raise RuntimeError(f"Erro ao enviar arquivo para S3: {e}") from e

    base = S3_BASE_URL.rstrip("/") if S3_BASE_URL else f"https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com"
    return f"{base}/{key}"


def _delete_s3(url: str) -> None:
    from botocore.exceptions import BotoCoreError, ClientError

    base = S3_BASE_URL.rstrip("/") if S3_BASE_URL else f"https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com"
    if not url.startswith(base):
        return
    key = url[len(base):].lstrip("/")
    try:
        _s3_client().delete_object(Bucket=S3_BUCKET, Key=key)
    except (BotoCoreError, ClientError):
        pass


# ── Local (fallback para dev/testes) ───────────────────────────────

def _upload_local(file: UploadFile, subfolder: str) -> str:
    dest_dir = os.path.join(UPLOAD_DIR, subfolder)
    os.makedirs(dest_dir, exist_ok=True)
    ext = os.path.splitext(file.filename or "file")[1]
    filename = f"{uuid.uuid4().hex}{ext}"
    dest_path = os.path.join(dest_dir, filename)
    with open(dest_path, "wb") as f:
        f.write(file.file.read())
    return f"/{subfolder}/{filename}"


def _delete_local(url: str) -> None:
    path = os.path.join(UPLOAD_DIR, url.lstrip("/"))
    try:
        os.remove(path)
    except OSError:
        pass


# ── API pública ─────────────────────────────────────────────────────

def upload_file(file: UploadFile, subfolder: str) -> str:
    if S3_BUCKET:
        return _upload_s3(file, subfolder)
    return _upload_local(file, subfolder)


def delete_file(url: str) -> None:
    if not url:
        return
    if S3_BUCKET:
        _delete_s3(url)
    else:
        _delete_local(url)
