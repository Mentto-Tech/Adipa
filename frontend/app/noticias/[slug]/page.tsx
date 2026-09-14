"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { apiGetNoticia, type NoticiaOut } from "@/lib/api";
import MidiaCarousel from "./MidiaCarousel";
import "./page.css";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function textToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .split(/\n\n+/)
    .filter((p) => p.trim())
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export default function NoticiaPage() {
  const { slug } = useParams<{ slug: string }>();
  const [noticia, setNoticia] = useState<NoticiaOut | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    apiGetNoticia(slug)
      .then(setNoticia)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <>
      <Navbar />

      <main className="noticia-detail">
        {loading && <p style={{ textAlign: "center", padding: "80px", color: "#888" }}>Carregando...</p>}

        {!loading && error && (
          <p style={{ textAlign: "center", padding: "80px", color: "#c0392b" }}>Notícia não encontrada.</p>
        )}

        {!loading && noticia && (
          <div className="noticia-detail-container">
            <Link href="/noticias" className="noticia-back-link">
              ← Voltar para Notícias
            </Link>

            <article className="noticia-article">
              <h1 className="noticia-title">{noticia.titulo}</h1>

              <div className="noticia-body">
                {noticia.capa && (
                  <div className="noticia-cover-float">
                    <Image
                      src={noticia.capa}
                      alt={noticia.titulo}
                      width={600}
                      height={400}
                      className="noticia-cover-img"
                      priority
                    />
                  </div>
                )}
                <div
                  className="noticia-content"
                  dangerouslySetInnerHTML={{ __html: textToHtml(noticia.texto) }}
                />
              </div>

              {noticia.midias && noticia.midias.length > 0 && (
                <MidiaCarousel midias={[...noticia.midias].sort((a, b) => a.ordem - b.ordem)} />
              )}
            </article>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
