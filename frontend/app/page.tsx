import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Partner logos fetched from the actual site
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
      <section style={{ background: "#255753", padding: "72px 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", color: "#fff" }}>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(18px, 2.5vw, 24px)", marginBottom: 24 }}>
            COMUNICADO — ADIPA | ADMISSÃO DE NOVOS ASSOCIADOS
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
            Em razão de atualização do Estatuto Social, a Associação para o Desenvolvimento da Indústria de Produção de Alimentos – <strong>ADIPA torna público que está apta a receber manifestações de interesse de ingresso em seu quadro associativo</strong>
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 20, fontWeight: 700 }}>
            Poderão requerer admissão pessoas jurídicas que atuem na produção, beneficiamento e/ou manufatura de alimentos, bem como entidades congêneres vinculadas à cadeia produtiva de alimentos.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
            <strong>A admissão de novos associados será deliberada pela Diretoria Executiva e dependerá de referendo do Conselho de Administração para aprovação, observado o disposto no Estatuto Social</strong> — Capítulo II (Dos Associados), Seção II (Admissão), especialmente os Arts. 9 e 10, devendo a deliberação correspondente constar em ata.
          </p>
          <Link href="/associe-se" style={{
            display: "inline-block", background: "#e8692a", color: "#fff",
            fontWeight: 700, fontSize: 14, padding: "14px 36px", borderRadius: 50,
            textDecoration: "none"
          }}>
            Para enviar pedido de associação, clique aqui!
          </Link>
        </div>
      </section>

      {/* ── HERO ── */}
      <section style={{ background: "#fff", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 64, flexWrap: "wrap", justifyContent: "center" }}>
          <Image
            src="/logo.png"
            alt="ADIPA"
            width={200}
            height={200}
            style={{ width: 200, height: 200, objectFit: "contain", flexShrink: 0 }}
            priority
          />
          <div style={{ flex: 1, minWidth: 260 }}>
            <p style={{ fontSize: 17, color: "#333", lineHeight: 1.7, marginBottom: 28 }}>
              Seja bem-vindo à Associação para o Desenvolvimento da Indústria de Produção de Alimentos.
            </p>
            <Link href="/associe-se" style={{
              display: "inline-block", background: "#255753", color: "#fff",
              fontWeight: 700, fontSize: 13, padding: "12px 32px", borderRadius: 50,
              textDecoration: "none", letterSpacing: ".08em"
            }}>
              ASSOCIE-SE
            </Link>
          </div>
        </div>
      </section>

      {/* ── POR QUE ADIPA ── */}
      <section style={{
        background: "#255753",
        backgroundImage: "url('/bg-field.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
        padding: "80px 24px"
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 64, flexWrap: "wrap" }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.1, minWidth: 200, flex: "0 0 auto" }}>
            Por que<br />ADIPA?
          </h2>
          <div style={{ flex: 1, minWidth: 260 }}>
            <p style={{ color: "#fff", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
              A ADIPA nasceu com o propósito de integrar a cadeia produtiva de alimentos levando inovação e sustentabilidade para o setor. Nossa visão é para fora, para o mundo. Saudabilidade, representatividade, responsabilidade social, ecossistemas de inovação e ESG são temas sempre presentes em nossos encontros. Nossas ações são norteadas pelos pilares do caráter, do comprometimento e da competência para assim construirmos um mundo melhor para todos.
            </p>
            <Link href="/quem-somos" style={{
              display: "inline-block", border: "2px solid #fff", color: "#fff",
              fontWeight: 700, fontSize: 13, padding: "12px 32px", borderRadius: 50,
              textDecoration: "none", letterSpacing: ".08em", background: "transparent"
            }}>
              SAIBA MAIS
            </Link>
          </div>
        </div>
      </section>

      {/* ── PARCEIROS ── */}
      <section style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", color: "#255753", fontWeight: 800, fontSize: 22, letterSpacing: ".1em", marginBottom: 48 }}>
            PARCEIROS
          </h2>

          {/* Row 1 */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 48, flexWrap: "wrap", marginBottom: 40 }}>
            {partnersRow1.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" aria-label={p.name}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image src={p.logo} alt={p.name} width={220} height={120} style={{ height: p.height, width: "auto", objectFit: "contain" }} />
              </a>
            ))}
          </div>

          {/* Row 2 */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
            {partnersRow2.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" aria-label={p.name}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image src={p.logo} alt={p.name} width={220} height={120} style={{ height: p.height, width: "auto", objectFit: "contain" }} />
              </a>
            ))}
          </div>

          <hr style={{ marginTop: 56, borderColor: "#e0e0e0" }} />
        </div>
      </section>

      <Footer />
    </>
  );
}
