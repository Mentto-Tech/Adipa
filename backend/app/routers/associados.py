import os
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/associados", tags=["associados"])


class AssociadoRequest(BaseModel):
    razaoSocial: str
    nomeFantasia: str
    dataFundacao: str
    cnpj: str
    logradouro: str
    numero: str
    bairro: str
    cidade: str
    estado: str
    cep: str
    colaboradores: str
    emailFinanceiro: str
    telefoneFinanceiro: str
    nomeRepresentante: str
    cpf: str
    rg: str
    dataNascimento: str


@router.post("")
async def cadastrar_associado(data: AssociadoRequest):
    api_key = os.getenv("MAILERLITE_API_KEY")
    group_id = os.getenv("MAILERLITE_GROUP_ID")

    if not api_key or not group_id:
        raise HTTPException(status_code=500, detail="Configuração do MailerLite ausente")

    payload = {
        "email": data.emailFinanceiro,
        "fields": {
            "name": data.nomeRepresentante,
            "company": data.razaoSocial or data.nomeFantasia,
            "phone": data.telefoneFinanceiro,
            "city": data.cidade,
            "state": data.estado,
            "razao_social": data.razaoSocial,
            "nome_fantasia": data.nomeFantasia,
            "data_fundacao": data.dataFundacao,
            "cnpj": data.cnpj,
            "logradouro": data.logradouro,
            "numero": data.numero,
            "bairro": data.bairro,
            "cep": data.cep,
            "colaboradores": data.colaboradores,
            "cpf": data.cpf,
            "rg": data.rg,
            "data_nascimento": data.dataNascimento,
        },
        "groups": [group_id],
    }

    async with httpx.AsyncClient() as client:
        res = await client.post(
            "https://connect.mailerlite.com/api/subscribers",
            json=payload,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {api_key}",
            },
        )

    if res.status_code not in (200, 201):
        raise HTTPException(status_code=502, detail="Erro ao cadastrar no MailerLite")

    return {"ok": True}
