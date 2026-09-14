"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { apiGetNoticia, type NoticiaOut } from "@/lib/api";
import "./page.css";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function NoticiaDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const [noticia, setNoticia] = useState<NoticiaOut | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    apiGetNoticia(slug)
      .then(setNoticia)
      .catch(() => setError("Notícia não encontrada."))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <>
      <Navbar />

      <main className="noticia-detalhe">
        {loading && <p className="noticia-loading">Carregando...</p>}

        {!loading && error && <p className="noticia-error-msg">{error}</p>}

        {!loading && noticia && (
          <>
            {noticia.capa && (
              <div className="noticia-hero">
                <Image
                  src={noticia.capa}
                  alt={noticia.titulo}
                  fill
                  className="noticia-hero-img"
                  priority
                />
                <div className="noticia-hero-overlay" />
              </div>
            )}

            <div className="noticia-content">
              <Link href="/noticias" className="noticia-voltar">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Voltar
              </Link>

              <p className="noticia-meta">{formatDate(noticia.criado_em)}</p>
              <h1 className="noticia-titulo">{noticia.titulo}</h1>
              <p className="noticia-texto">{noticia.texto}</p>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
