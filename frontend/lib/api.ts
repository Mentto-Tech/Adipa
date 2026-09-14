import { authHeaders } from "./auth";

const isServer = typeof window === "undefined";
const BASE = isServer
  ? (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000")
  : (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000");

function resolveMediaUrl(url: string): string {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const path = url.startsWith("/") ? url : `/${url}`;
  return `/uploads${path}`;
}

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

function resolveNoticiaUrls<T extends NoticiaListItem>(noticia: T): T {
  const base = { ...noticia, capa: resolveMediaUrl(noticia.capa) };
  if ("midias" in noticia) {
    const out = noticia as unknown as NoticiaOut;
    return { ...base, midias: out.midias.map((m) => ({ ...m, url: resolveMediaUrl(m.url) })) } as T;
  }
  return base as T;
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
  const data: NoticiaListItem[] = await res.json();
  return data.map(resolveNoticiaUrls);
}

export async function apiGetNoticia(slug: string): Promise<NoticiaOut> {
  const res = await fetch(`${BASE}/noticias/${slug}`);
  if (!res.ok) throw new Error("Notícia não encontrada");
  const data: NoticiaOut = await res.json();
  return resolveNoticiaUrls(data);
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

export async function apiDeleteMidia(noticiaId: number, midiaId: number): Promise<void> {
  const fd = new FormData();
  fd.append("titulo", "");
  fd.append("texto", "");
  fd.append("remove_midias", String(midiaId));
  const res = await fetch(`${BASE}/noticias/${noticiaId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: fd,
  });
  if (!res.ok) throw new Error("Erro ao remover mídia");
}
