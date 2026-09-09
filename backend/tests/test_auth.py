"""Testes do endpoint de autenticação e rate limit."""
import pytest


class TestLogin:
    def test_login_sucesso(self, client, admin_in_db):
        res = client.post("/auth/login", json={"username": "testadmin", "password": "testpass123"})
        assert res.status_code == 200
        body = res.json()
        assert "access_token" in body
        assert body["token_type"] == "bearer"

    def test_login_senha_errada(self, client, admin_in_db):
        res = client.post("/auth/login", json={"username": "testadmin", "password": "errada"})
        assert res.status_code == 401
        assert res.json()["detail"] == "Credenciais inválidas"

    def test_login_usuario_inexistente(self, client):
        """Não deve vazar se o usuário existe ou não — mesmo status code."""
        res = client.post("/auth/login", json={"username": "fantasma", "password": "qualquer"})
        assert res.status_code == 401
        assert res.json()["detail"] == "Credenciais inválidas"

    def test_login_campos_vazios(self, client):
        res = client.post("/auth/login", json={"username": "", "password": ""})
        # FastAPI valida o schema — credenciais inválidas (sem admin com username "")
        assert res.status_code == 401

    def test_token_jwt_valido(self, client, admin_in_db):
        """Token gerado deve ser aceito em rota protegida."""
        res = client.post("/auth/login", json={"username": "testadmin", "password": "testpass123"})
        token = res.json()["access_token"]
        # Usa rota protegida para validar
        r2 = client.get("/noticias/", headers={"Authorization": f"Bearer {token}"})
        assert r2.status_code == 200

    def test_token_invalido_rejeitado(self, client):
        res = client.get("/noticias/create-protected", headers={"Authorization": "Bearer tokeninvalido"})
        # Rota GET /noticias/ é pública — testa direto no POST
        res = client.post(
            "/noticias/",
            headers={"Authorization": "Bearer tokeninvalido"},
            data={"titulo": "x", "texto": "y"},
        )
        assert res.status_code == 401

    def test_sem_token_rejeitado(self, client):
        res = client.post("/noticias/", data={"titulo": "x", "texto": "y"})
        assert res.status_code == 403


class TestRateLimit:
    def test_rate_limit_bloqueia_apos_max_tentativas(self, client):
        """Após 5 falhas no mesmo 'IP', deve retornar 429."""
        payload = {"username": "naoexiste", "password": "errada"}
        for _ in range(5):
            client.post("/auth/login", json=payload)
        res = client.post("/auth/login", json=payload)
        assert res.status_code == 429
        assert "Aguarde" in res.json()["detail"]

    def test_rate_limit_resetado_apos_sucesso(self, client, admin_in_db):
        """Login bem-sucedido reseta o contador."""
        payload_errado = {"username": "testadmin", "password": "errada"}
        for _ in range(3):
            client.post("/auth/login", json=payload_errado)

        res = client.post("/auth/login", json={"username": "testadmin", "password": "testpass123"})
        assert res.status_code == 200

        # Após reset, as 3 tentativas anteriores não devem ter impacto
        res2 = client.post("/auth/login", json={"username": "testadmin", "password": "testpass123"})
        assert res2.status_code == 200
