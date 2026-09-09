import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./page.css";

const partnersRow1 = [
  { name: "CIESP Alta Paulista", href: "https://regional.ciesp.com.br/altapaulista/", logo: "/logos/ciespLogo.png", height: 60 },
  { name: "FATEC Pompeia", href: "https://www.fatecpompeia.edu.br/", logo: "/logos/pompeiaLogo.jpg", height: 110 },
  { name: "FATEC Marília", href: "https://www.fatecmarilia.edu.br/", logo: "/logos/mariliaLogo.png", height: 110 },
  { name: "SENAI Pompeia", href: "https://pompeia.sp.senai.br/", logo: "/logos/senaiPompeia.png", height: 110 },
  { name: "SENAI Marília", href: "https://marilia.sp.senai.br/", logo: "/logos/senaiMariliaLogo.png", height: 110 },
];
const partnersRow2 = [
  { name: "Fundação Shunji Nishimura", href: "https://fsnt.com.br/", logo: "/logos/fundacaoLogo.png", height: 110 },
  { name: "Mentto Tech", href: "https://mentto.com.br/", logo: "/logos/menttoLogo.png", height: 110 },
  { name: "ITAL", href: "https://ital.agricultura.sp.gov.br/", logo: "/logos/italLogo.png", height: 110 },
  { name: "SEBRAE", href: "https://www.sebrae.com.br/", logo: "/logos/sebraeLogo.png", height: 110 },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── COMUNICADO ── */}
      <section className="section-comunicado">
        <div className="comunicado-inner">
          <h2 className="comunicado-title">
            COMUNICADO — ADIPA | ADMISSÃO DE NOVOS ASSOCIADOS
          </h2>
          <p className="comunicado-text">
            Em razão de atualização do Estatuto Social, a Associação para o Desenvolvimento da Indústria de Produção de Alimentos – <strong>ADIPA torna público que está apta a receber manifestações de interesse de ingresso em seu quadro associativo</strong>
          </p>
          <p className="comunicado-text-bold">
            Poderão requerer admissão pessoas jurídicas que atuem na produção, beneficiamento e/ou manufatura de alimentos, bem como entidades congêneres vinculadas à cadeia produtiva de alimentos.
          </p>
          <p className="comunicado-text-last">
            <strong>A admissão de novos associados será deliberada pela Diretoria Executiva e dependerá de referendo do Conselho de Administração para aprovação, observado o disposto no Estatuto Social</strong> — Capítulo II (Dos Associados), Seção II (Admissão), especialmente os Arts. 9 e 10, devendo a deliberação correspondente constar em ata.
          </p>
          <Link href="/associe-se" className="btn-comunicado">
            Para enviar pedido de associação, clique aqui!
          </Link>
        </div>
      </section>

      {/* ── HERO ── */}
      <section className="section-hero">
        <div className="hero-inner">
          <Image
            src="/logo.png"
            alt="ADIPA"
            width={200}
            height={200}
            className="hero-logo"
            priority
          />
          <div className="hero-content">
            <p className="hero-text">
              Seja bem-vindo à Associação para o Desenvolvimento da Indústria de Produção de Alimentos.
            </p>
            <Link href="/associe-se" className="btn-hero">
              ASSOCIE-SE
            </Link>
          </div>
        </div>
      </section>

      {/* ── POR QUE ADIPA ── */}
      <section className="section-why">
        <div className="why-inner">
          <h2 className="why-title">
            Por que<br />ADIPA?
          </h2>
          <div className="why-content">
            <p className="why-text">
              A ADIPA nasceu com o propósito de integrar a cadeia produtiva de alimentos levando inovação e sustentabilidade para o setor. Nossa visão é para fora, para o mundo. Saudabilidade, representatividade, responsabilidade social, ecossistemas de inovação e ESG são temas sempre presentes em nossos encontros. Nossas ações são norteadas pelos pilares do caráter, do comprometimento e da competência para assim construirmos um mundo melhor para todos.
            </p>
            <Link href="/quem-somos" className="btn-why">
              SAIBA MAIS
            </Link>
          </div>
        </div>
      </section>

      {/* ── PARCEIROS ── */}
      <section className="section-partners">
        <div className="partners-inner">
          <h2 className="partners-title">PARCEIROS</h2>

          <div className="partners-row">
            {partnersRow1.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" aria-label={p.name} className="partner-link">
                <Image src={p.logo} alt={p.name} width={220} height={120} className="partner-logo" style={{ height: p.height }} />
              </a>
            ))}
          </div>

          <div className="partners-row">
            {partnersRow2.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" aria-label={p.name} className="partner-link">
                <Image src={p.logo} alt={p.name} width={220} height={120} className="partner-logo" style={{ height: p.height }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
