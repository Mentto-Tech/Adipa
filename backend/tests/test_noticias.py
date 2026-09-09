"""Testes do CRUD de notícias — rotas públicas e protegidas."""
import io
import pytest


def _image_file(name="capa.png"):
    """Retorna um arquivo PNG mínimo válido."""
    import struct, zlib

    def _chunk(tag: bytes, data: bytes) -> bytes:
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    png = (
        b"\x89PNG\r\n\x1a\n"
        + _chunk(b"IHDR", struct.pack(">IIBBBBB", 1, 1, 8, 2, 0, 0, 0))
        + _chunk(b"IDAT", zlib.compress(b"\x00\xff\xff\xff"))
        + _chunk(b"IEND", b"")
    )
    return (name, io.BytesIO(png), "image/png")


# ------------------------------------------------------------------ #
#  Rotas públicas                                                      #
# ------------------------------------------------------------------ #

class TestListarNoticias:
    def test_lista_vazia(self, client):
        res = client.get("/noticias/")
        assert res.status_code == 200
        assert res.json() == []

    def test_lista_apos_criacao(self, client, auth_headers):
        client.post(
            "/noticias/",
            headers=auth_headers,
            data={"titulo": "Notícia Pública", "texto": "Texto aqui"},
            files={"capa": _image_file()},
        )
        res = client.get("/noticias/")
        assert res.status_code == 200
        assert len(res.json()) == 1

    def test_paginacao_skip_limit(self, client, auth_headers):
        for i in range(3):
            client.post(
                "/noticias/",
                headers=auth_headers,
                data={"titulo": f"Notícia {i}", "texto": "Texto"},
                files={"capa": _image_file()},
            )
        res = client.get("/noticias/?skip=1&limit=2")
        assert res.status_code == 200
        assert len(res.json()) == 2


class TestObterNoticia:
    def test_obter_por_slug(self, client, auth_headers):
        client.post(
            "/noticias/",
            headers=auth_headers,
            data={"titulo": "Slug Test", "texto": "conteudo"},
            files={"capa": _image_file()},
        )
        res = client.get("/noticias/slug-test")
        assert res.status_code == 200
        body = res.json()
        assert body["titulo"] == "Slug Test"
        assert body["slug"] == "slug-test"

    def test_slug_inexistente_retorna_404(self, client):
        res = client.get("/noticias/nao-existe")
        assert res.status_code == 404


# ------------------------------------------------------------------ #
#  Criação (POST) — protegida                                          #
# ------------------------------------------------------------------ #

class TestCriarNoticia:
    def test_criar_com_sucesso(self, client, auth_headers):
        res = client.post(
            "/noticias/",
            headers=auth_headers,
            data={"titulo": "Minha Notícia", "texto": "Conteúdo completo"},
            files={"capa": _image_file()},
        )
        assert res.status_code == 201
        body = res.json()
        assert body["titulo"] == "Minha Notícia"
        assert body["slug"] == "minha-noticia"
        assert "id" in body
        assert "criado_em" in body

    def test_criar_sem_autenticacao(self, client):
        res = client.post(
            "/noticias/",
            data={"titulo": "Sem token", "texto": "Texto"},
            files={"capa": _image_file()},
        )
        assert res.status_code == 403

    def test_criar_sem_capa_falha(self, client, auth_headers):
        res = client.post(
            "/noticias/",
            headers=auth_headers,
            data={"titulo": "Sem capa", "texto": "Texto"},
        )
        assert res.status_code == 422

    def test_criar_capa_invalida(self, client, auth_headers):
        res = client.post(
            "/noticias/",
            headers=auth_headers,
            data={"titulo": "Capa inválida", "texto": "Texto"},
            files={"capa": ("doc.pdf", io.BytesIO(b"PDF"), "application/pdf")},
        )
        assert res.status_code == 400

    def test_slug_unico_para_titulos_duplicados(self, client, auth_headers):
        for _ in range(3):
            client.post(
                "/noticias/",
                headers=auth_headers,
                data={"titulo": "Titulo Igual", "texto": "Texto"},
                files={"capa": _image_file()},
            )
        res = client.get("/noticias/")
        slugs = [n["slug"] for n in res.json()]
        assert len(set(slugs)) == len(slugs)  # todos únicos

    def test_campos_obrigatorios_faltando(self, client, auth_headers):
        res = client.post(
            "/noticias/",
            headers=auth_headers,
            data={"titulo": "Sem texto"},
            files={"capa": _image_file()},
        )
        assert res.status_code == 422

    def test_titulo_com_acentos_gera_slug_ascii(self, client, auth_headers):
        res = client.post(
            "/noticias/",
            headers=auth_headers,
            data={"titulo": "Ação Política", "texto": "Texto"},
            files={"capa": _image_file()},
        )
        assert res.status_code == 201
        assert res.json()["slug"] == "acao-politica"


# ------------------------------------------------------------------ #
#  Atualização (PUT) — protegida                                       #
# ------------------------------------------------------------------ #

class TestAtualizarNoticia:
    def _criar(self, client, auth_headers, titulo="Original"):
        res = client.post(
            "/noticias/",
            headers=auth_headers,
            data={"titulo": titulo, "texto": "Texto original"},
            files={"capa": _image_file()},
        )
        assert res.status_code == 201
        return res.json()

    def test_atualizar_titulo_e_texto(self, client, auth_headers):
        noticia = self._criar(client, auth_headers)
        res = client.put(
            f"/noticias/{noticia['id']}",
            headers=auth_headers,
            data={"titulo": "Novo Título", "texto": "Novo texto"},
        )
        assert res.status_code == 200
        body = res.json()
        assert body["titulo"] == "Novo Título"
        assert body["texto"] == "Novo texto"

    def test_atualizar_com_nova_capa(self, client, auth_headers):
        noticia = self._criar(client, auth_headers)
        capa_original = noticia["capa"]
        res = client.put(
            f"/noticias/{noticia['id']}",
            headers=auth_headers,
            data={"titulo": "Mesmo Título", "texto": "Mesmo texto"},
            files={"capa": _image_file("nova.png")},
        )
        assert res.status_code == 200
        assert res.json()["capa"] != capa_original

    def test_atualizar_sem_autenticacao(self, client, auth_headers):
        noticia = self._criar(client, auth_headers)
        res = client.put(
            f"/noticias/{noticia['id']}",
            data={"titulo": "Hack", "texto": "Hack"},
        )
        assert res.status_code == 403

    def test_atualizar_id_inexistente(self, client, auth_headers):
        res = client.put(
            "/noticias/99999",
            headers=auth_headers,
            data={"titulo": "X", "texto": "Y"},
        )
        assert res.status_code == 404

    def test_atualizar_capa_invalida(self, client, auth_headers):
        noticia = self._criar(client, auth_headers)
        res = client.put(
            f"/noticias/{noticia['id']}",
            headers=auth_headers,
            data={"titulo": "X", "texto": "Y"},
            files={"capa": ("file.exe", io.BytesIO(b"EXE"), "application/octet-stream")},
        )
        assert res.status_code == 400


# ------------------------------------------------------------------ #
#  Exclusão (DELETE) — protegida                                       #
# ------------------------------------------------------------------ #

class TestDeletarNoticia:
    def _criar(self, client, auth_headers, titulo="Para Deletar"):
        res = client.post(
            "/noticias/",
            headers=auth_headers,
            data={"titulo": titulo, "texto": "Texto"},
            files={"capa": _image_file()},
        )
        assert res.status_code == 201
        return res.json()

    def test_deletar_com_sucesso(self, client, auth_headers):
        noticia = self._criar(client, auth_headers)
        res = client.delete(f"/noticias/{noticia['id']}", headers=auth_headers)
        assert res.status_code == 204

        # confirma remoção
        res2 = client.get(f"/noticias/{noticia['slug']}")
        assert res2.status_code == 404

    def test_deletar_sem_autenticacao(self, client, auth_headers):
        noticia = self._criar(client, auth_headers)
        res = client.delete(f"/noticias/{noticia['id']}")
        assert res.status_code == 403

    def test_deletar_id_inexistente(self, client, auth_headers):
        res = client.delete("/noticias/99999", headers=auth_headers)
        assert res.status_code == 404

    def test_deletar_remove_da_listagem(self, client, auth_headers):
        noticia = self._criar(client, auth_headers)
        client.delete(f"/noticias/{noticia['id']}", headers=auth_headers)
        lista = client.get("/noticias/").json()
        ids = [n["id"] for n in lista]
        assert noticia["id"] not in ids
