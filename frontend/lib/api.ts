import { authHeaders } from "./auth";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface NoticiaListItem {
  id: number;
  titulo: string;
  capa: string;
  slug: string;
  criado_em: string;
}

export interface NoticiaOut extends NoticiaListItem {
  texto: string;
  atualizado_em: string;
  midias: { id: number; tipo: string; url: string; ordem: number }[];
}

export async function apiLogin(username: string, password: string) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail ?? "Erro ao fazer login");
  }
  return res.json() as Promise<{ access_token: string }>;
}

export async function apiListNoticias(): Promise<NoticiaListItem[]> {
  const res = await fetch(`${BASE}/noticias/`);
  if (!res.ok) throw new Error("Erro ao buscar notícias");
  return res.json();
}

export async function apiGetNoticia(slug: string): Promise<NoticiaOut> {
  const res = await fetch(`${BASE}/noticias/${slug}`);
  if (!res.ok) throw new Error("Notícia não encontrada");
  return res.json();
}

export async function apiCreateNoticia(form: FormData): Promise<NoticiaOut> {
  const res = await fetch(`${BASE}/noticias/`, {
    method: "POST",
    headers: authHeaders(),
    body: form,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail ?? "Erro ao criar notícia");
  }
  return res.json();
}

export async function apiUpdateNoticia(id: number, form: FormData): Promise<NoticiaOut> {
  const res = await fetch(`${BASE}/noticias/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: form,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail ?? "Erro ao atualizar notícia");
  }
  return res.json();
}

export async function apiDeleteNoticia(id: number): Promise<void> {
  const res = await fetch(`${BASE}/noticias/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao deletar notícia");
}
