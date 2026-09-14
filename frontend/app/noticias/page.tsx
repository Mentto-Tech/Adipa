"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { apiListNoticias, type NoticiaListItem } from "@/lib/api";
import "./page.css";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function Noticias() {
  const [noticias, setNoticias] = useState<NoticiaListItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiListNoticias()
      .then(setNoticias)
      .catch(() => setError("Não foi possível carregar as notícias. Tente novamente mais tarde."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <main className="noticias-page">
        <div className="noticias-header">
          <h1 className="noticias-title">Notícias</h1>
          <p className="noticias-subtitle">Fique por dentro das novidades da ADIPA</p>
        </div>

        <div className="noticias-grid">
          {loading && (
            <p className="noticias-empty">Carregando...</p>
          )}

          {!loading && error && (
            <p className="noticias-error">{error}</p>
          )}

          {!loading && !error && noticias.length === 0 && (
            <p className="noticias-empty">Nenhuma notícia publicada ainda.</p>
          )}

          {noticias.map((noticia) => (
            <Link key={noticia.id} href={`/noticias/${noticia.slug}`} className="noticia-card">
              {noticia.capa ? (
                <Image
                  src={noticia.capa}
                  alt={noticia.titulo}
                  width={600}
                  height={750}
                  className="noticia-card-img"
                />
              ) : (
                <div className="noticia-card-img-placeholder">Sem imagem</div>
              )}
              <div className="noticia-card-overlay">
                <span className="noticia-card-date">{formatDate(noticia.criado_em)}</span>
                <h2 className="noticia-card-title">{noticia.titulo}</h2>
                <span className="noticia-card-btn">SAIBA MAIS</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
