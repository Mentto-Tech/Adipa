import os
import uuid

import boto3
from botocore.exceptions import BotoCoreError, ClientError
from fastapi import UploadFile

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
S3_BUCKET = os.getenv("S3_BUCKET")
S3_BASE_URL = os.getenv("S3_BASE_URL")  # ex: https://bucket.s3.amazonaws.com


def _s3_client():
    return boto3.client(
        "s3",
        region_name=AWS_REGION,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    )


def upload_file(file: UploadFile, subfolder: str) -> str:
    """Faz upload para o S3 e retorna a URL pública do arquivo."""
    if not S3_BUCKET:
        raise RuntimeError("S3_BUCKET não configurado.")

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


def delete_file(url: str) -> None:
    """Remove um arquivo do S3 a partir da URL pública. Falha silenciosa."""
    if not S3_BUCKET or not url:
        return

    base = S3_BASE_URL.rstrip("/") if S3_BASE_URL else f"https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com"
    if not url.startswith(base):
        return

    key = url[len(base):].lstrip("/")
    try:
        _s3_client().delete_object(Bucket=S3_BUCKET, Key=key)
    except (BotoCoreError, ClientError):
        pass
