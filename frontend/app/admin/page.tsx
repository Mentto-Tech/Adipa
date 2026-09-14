"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getToken, removeToken } from "@/lib/auth";
import {
  apiListNoticias, apiGetNoticia, apiCreateNoticia,
  apiUpdateNoticia, apiDeleteNoticia,
  type NoticiaListItem, type NoticiaOut,
} from "@/lib/api";
import "./admin.css";

type Mode = "list" | "create" | "edit";
interface FormState { titulo: string; texto: string; capa: File | null; fotos: File[]; }
const emptyForm: FormState = { titulo: "", texto: "", capa: null, fotos: [] };

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [noticias, setNoticias] = useState<NoticiaListItem[]>([]);
  const [mode, setMode] = useState<Mode>("list");
  const [editTarget, setEditTarget] = useState<NoticiaOut | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [existingMidias, setExistingMidias] = useState<{ id: number; url: string; tipo: string }[]>([]);
  const [removeMidias, setRemoveMidias] = useState<number[]>([]);

  useEffect(() => {
    if (!getToken()) router.replace("/admin/login");
    else setReady(true);
  }, [router]);

  const loadNoticias = useCallback(async () => {
    try { setNoticias(await apiListNoticias()); }
    catch { setFeedback({ type: "err", msg: "Erro ao carregar notícias." }); }
  }, []);

  useEffect(() => { if (ready) loadNoticias(); }, [ready, loadNoticias]);

  useEffect(() => {
    if (!form.capa) { setPreviewUrl(null); return; }
    const url = URL.createObjectURL(form.capa);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [form.capa]);

  function logout() {
    if (!window.confirm("Tem certeza que deseja sair?")) return;
    removeToken();
    router.replace("/admin/login");
  }

  function startCreate() {
    setForm(emptyForm); setEditTarget(null);
    setFeedback(null); setPreviewUrl(null);
    setExistingMidias([]); setRemoveMidias([]);
    setMode("create");
  }

  async function startEdit(item: NoticiaListItem) {
    setFeedback(null);
    try {
      const full = await apiGetNoticia(item.slug);
      setEditTarget(full);
      setForm({ titulo: full.titulo, texto: full.texto, capa: null, fotos: [] });
      setExistingMidias(full.midias.filter((m) => m.tipo === "foto"));
      setRemoveMidias([]);
      setPreviewUrl(null);
      setMode("edit");
    } catch { setFeedback({ type: "err", msg: "Erro ao carregar notícia." }); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.titulo.trim() || !form.texto.trim()) {
      setFeedback({ type: "err", msg: "Título e texto são obrigatórios." }); return;
    }
    if (mode === "create" && !form.capa) {
      setFeedback({ type: "err", msg: "Selecione uma imagem de capa." }); return;
    }
    setSubmitting(true); setFeedback(null);
    const fd = new FormData();
    fd.append("titulo", form.titulo.trim());
    fd.append("texto", form.texto.trim());
    if (form.capa) fd.append("capa", form.capa);
    for (const foto of form.fotos) {
      fd.append("fotos", foto);
    }
    if (mode === "edit" && removeMidias.length > 0) {
      fd.append("remove_midias", removeMidias.join(","));
    }
    try {
      if (mode === "create") await apiCreateNoticia(fd);
      else if (mode === "edit" && editTarget) await apiUpdateNoticia(editTarget.id, fd);
      setFeedback({ type: "ok", msg: mode === "create" ? "Notícia publicada!" : "Notícia atualizada!" });
      await loadNoticias(); setMode("list");
    } catch (err: unknown) {
      setFeedback({ type: "err", msg: err instanceof Error ? err.message : "Erro desconhecido." });
    } finally { setSubmitting(false); }
  }

  async function confirmDelete() {
    if (deleteId === null) return;
    try { await apiDeleteNoticia(deleteId); setFeedback({ type: "ok", msg: "Notícia excluída." }); await loadNoticias(); }
    catch { setFeedback({ type: "err", msg: "Erro ao excluir notícia." }); }
    finally { setDeleteId(null); }
  }

  if (!ready) return null;

  const isForm = mode === "create" || mode === "edit";

  return (
    <>
      <main className="admin-main">
          {/* Top bar */}
          <div className="topbar">
            <div className="topbar-left">
              <button className="btn-home" onClick={() => router.push("/")} title="Voltar para home">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <span className="topbar-title">
                {mode === "list" && "Gerenciar Notícias"}
                {mode === "create" && "Nova Notícia"}
                {mode === "edit" && "Editar Notícia"}
              </span>
            </div>
            <div className="topbar-actions">
              {mode === "list" && (
                <button className="btn-primary" onClick={startCreate}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Nova notícia
                </button>
              )}
              <button className="btn-logout" onClick={logout}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sair
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="content">
            {feedback && (
              <div role="alert" className={`feedback ${feedback.type}`}>
                {feedback.type === "ok"
                  ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                }
                {feedback.msg}
              </div>
            )}

            {/* List */}
            {mode === "list" && (
              noticias.length === 0
                ? (
                  <div className="empty">
                    <svg width="64" height="64" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>
                    </svg>
                    <p>Nenhuma notícia publicada ainda.</p>
                    <button className="btn-primary" onClick={startCreate}>Criar primeira notícia</button>
                  </div>
                )
                : (
                  <div className="news-grid">
                    {noticias.map((n) => (
                      <div key={n.id} className="news-card">
                        <div className="news-thumb">
                          <Image src={n.capa} alt={n.titulo} fill className="object-cover" sizes="72px" />
                        </div>
                        <div className="news-info">
                          <p className="news-title">{n.titulo}</p>
                          <p className="news-meta">
                            {new Date(n.criado_em).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                          </p>
                        </div>
                        <div className="news-actions">
                          <button className="btn-icon" onClick={() => startEdit(n)}>
                            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Editar
                          </button>
                          <button className="btn-icon danger" onClick={() => setDeleteId(n.id)}>
                            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                              <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                            </svg>
                            Excluir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
            )}

            {/* Form */}
            {isForm && (
              <div className="form-card">
                <div className="form-header">
                  <h2 className="form-title">{mode === "create" ? "Nova notícia" : "Editar notícia"}</h2>
                  <button className="btn-back" onClick={() => { setMode("list"); setFeedback(null); }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                    Voltar
                  </button>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="field">
                    <label htmlFor="titulo">Título *</label>
                    <input id="titulo" type="text" placeholder="Título da notícia"
                      value={form.titulo}
                      onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))} />
                  </div>

                  <div className="field">
                    <label htmlFor="texto">Conteúdo *</label>
                    <textarea id="texto" placeholder="Escreva o conteúdo da notícia…"
                      value={form.texto}
                      onChange={(e) => setForm((f) => ({ ...f, texto: e.target.value }))} />
                  </div>

                  <div className="field">
                    <label>
                      Imagem de capa
                      {mode === "create" ? " *" : " (deixe em branco para manter a atual)"}
                    </label>

                    {(previewUrl || (mode === "edit" && editTarget && !previewUrl)) && (
                      <div>
                        <span className="capa-label">{previewUrl ? "Nova capa" : "Capa atual"}</span>
                        <div className="capa-preview">
                          <Image
                            src={previewUrl ?? editTarget!.capa}
                            alt="Preview" fill style={{ objectFit: "cover" }} sizes="280px" />
                        </div>
                      </div>
                    )}

                    <label className={`file-area${previewUrl || (mode === "edit" && editTarget) ? " file-area-margin" : ""}`}>
                      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={(e) => setForm((f) => ({ ...f, capa: e.target.files?.[0] ?? null }))} />
                      <svg width="28" height="28" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 8px" }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      <p className="file-select-name">
                        {form.capa ? form.capa.name : "Clique para selecionar"}
                      </p>
                      <p className="file-hint">JPG, PNG, WEBP ou GIF</p>
                    </label>
                  </div>

                  <div className="field">
                    <label>Imagens do carrossel (até 10, opcional)</label>

                    {mode === "edit" && existingMidias.length > 0 && (
                      <div className="midia-grid">
                        {existingMidias.map((m) => (
                          <div key={m.id} className="midia-thumb">
                            <Image src={m.url} alt="Mídia" fill className="object-cover" sizes="80px" />
                            <button
                              type="button"
                              className="midia-remove"
                              onClick={() => {
                                setExistingMidias((prev) => prev.filter((x) => x.id !== m.id));
                                setRemoveMidias((prev) => [...prev, m.id]);
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {form.fotos.length > 0 && (
                      <div className="midia-grid">
                        {form.fotos.map((f, i) => (
                          <div key={i} className="midia-thumb">
                            <Image src={URL.createObjectURL(f)} alt={f.name} fill className="object-cover" sizes="80px" />
                            <button
                              type="button"
                              className="midia-remove"
                              onClick={() => setForm((prev) => ({ ...prev, fotos: prev.fotos.filter((_, j) => j !== i) }))}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {(existingMidias.length + form.fotos.length) < 10 && (
                      <label className="file-area file-area-sm">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files ?? []);
                            const remaining = 10 - existingMidias.length - form.fotos.length;
                            setForm((f) => ({ ...f, fotos: [...f.fotos, ...files].slice(0, 10) }));
                            e.target.value = "";
                          }}
                        />
                        <p className="file-select-name">+ Adicionar imagens</p>
                        <p className="file-hint">{10 - existingMidias.length - form.fotos.length} vaga(s) restante(s)</p>
                      </label>
                    )}
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-primary" disabled={submitting}>
                      {submitting ? "Salvando…" : mode === "create" ? "Publicar notícia" : "Salvar alterações"}
                    </button>
                    <button type="button" className="btn-outline" onClick={() => { setMode("list"); setFeedback(null); }}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
      </main>

      {/* Modal de confirmação */}
      {deleteId !== null && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal">
            <h3 id="modal-title">Excluir notícia?</h3>
            <p>Esta ação é permanente e não pode ser desfeita. A notícia e seus arquivos serão removidos.</p>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setDeleteId(null)}>Cancelar</button>
              <button className="btn-danger" onClick={confirmDelete}>Sim, excluir</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
