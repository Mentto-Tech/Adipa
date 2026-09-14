import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { apiGetNoticia } from "@/lib/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const noticia = await apiGetNoticia(slug);
    return { title: `${noticia.titulo} – ADIPA` };
  } catch {
    return { title: "Notícia – ADIPA" };
  }
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let noticia;

  try {
    noticia = await apiGetNoticia(slug);
  } catch {
    notFound();
  }

  const midias = noticia.midias?.sort((a, b) => a.ordem - b.ordem) ?? [];

  return (
    <>
      <Navbar />

      <main className="noticia-detail">
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

            {midias.length > 0 && (
              <MidiaCarousel midias={midias} />
            )}
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
