import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quem somos – ADIPA",
};

const consAdm = [
  { nome: "Rodrigo Garla - Marilan", cargo: "Presidente do Conselho de Administração" },
  { nome: "Eloizi C. D. Ferraz - ZD Alimentos", cargo: "Conselheira" },
  { nome: "Regiane Zambon - Jazam", cargo: "Conselheira" },
  { nome: "Vanessa S. Fernandes - Amenco", cargo: "Conselheira" },
  { nome: "Cristina Y. N. Yabuta - Granja Nagano", cargo: "Conselheira" },
  { nome: "Orlando Zancopé Neto", cargo: "Conselheiro" },
  { nome: "Ronald Domingues - Dori", cargo: "Conselheiro" },
];

const consFiscal = [
  { nome: "Paulo Y. Ueyama - Granja Ueyama", cargo: "Conselheiro" },
  { nome: "Fernando M. L. Ferreira - Ass. de Apicultores - AMAR", cargo: "Conselheiro" },
  { nome: "Wanderley Moro - Sítio Bela Vista", cargo: "Conselheiro" },
];

const diretoria = [
  { nome: "Sandra F. Y. Matunoshita - S.O.S. Alergia", cargo: "Presidente" },
  { nome: "Raquel S. de A. Caetano - Nutrissima", cargo: "Vice-presidente" },
  { nome: "Diogo Mizuomoto - D.I.M. Alimentos", cargo: "1º Tesoureiro" },
  { nome: "Edivaldo Colombo - Fazenda S. J. do Mirante", cargo: "2º Tesoureiro" },
  { nome: "Toshio Hito - POP's Fantasy", cargo: "1º Secretário" },
  { nome: "Lúcio M. Z. dos Santos - DBG", cargo: "2º Secretário" },
];

function MemberGrid({ members }: { members: { nome: string; cargo: string }[] }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "32px 24px",
      maxWidth: 900,
      margin: "0 auto",
    }}>
      {members.map((m) => (
        <div key={m.nome} style={{ textAlign: "center" }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: "#255753", marginBottom: 6 }}>{m.nome}</p>
          <p style={{ fontSize: 13, color: "#666" }}>{m.cargo}</p>
        </div>
      ))}
    </div>
  );
}

export default function QuemSomos() {
  return (
    <>
      <Navbar />

      {/* ── HERO com imagem de fundo ── */}
      <section style={{
        position: "relative",
        height: 340,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        <Image
          src="/bg-quem-somos.jpg"
          alt="Campo agrícola"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        {/* overlay verde escuro */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(20, 58, 40, 0.65)"
        }} />
        {/* conteúdo centralizado */}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "#fff" }}>
          <Image
            src="/logo.png"
            alt="ADIPA"
            width={80}
            height={80}
            style={{ width: 80, height: 80, objectFit: "contain", filter: "brightness(0) invert(1)", margin: "0 auto 12px" }}
          />
          <p style={{ fontSize: 32, fontWeight: 900, letterSpacing: ".08em" }}>ADIPA</p>
        </div>
      </section>

      {/* ── MISSÃO + FOTO ── */}
      <section style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto",
          display: "flex", alignItems: "flex-start", gap: 56, flexWrap: "wrap"
        }}>
          {/* texto esquerda */}
          <div style={{ flex: "1 1 340px" }}>
            <h2 style={{ fontSize: "clamp(22px, 1vw, 30px)", fontWeight: 800, color: "#255753", lineHeight: 1.3, marginBottom: 24 }}>
              "Visando ao desenvolvimento competitivo e sustentável e à promoção da saúde humana, animal, vegetal e ambiental...
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#333" }}>
              A <strong>ADIPA</strong> destina-se a promover o desenvolvimento da indústria de alimentos, por meio da colaboração, cooperativismo, associativismo, conhecimento, pesquisa científica e tecnológica, desenvolvimento tecnológico, inovação tecnológica, empreendedorismo e sustentabilidade social e ambiental, visando ao desenvolvimento competitivo e sustentável e à promoção da saúde humana, animal, vegetal e ambiental, apoiando as atividades empresariais intensivas em manufatura, educação, pesquisa e inovação, sempre em benefício da coletividade, contribuindo para o desenvolvimento econômico, social e ambiental do país.
            </p>
          </div>
          {/* foto direita */}
          <div style={{ flex: "1 1 340px" }}>
            <Image
              src="/fotoQuemSomos.png"
              alt="Reunião ADIPA"
              width={480}
              height={320}
              style={{ width: "100%", height: "auto", borderRadius: 8, objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* ── NOSSA HISTÓRIA ── */}
      <section style={{ background: "#fff"}}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#255753", marginBottom: 20 }}>Nossa história:</h2>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "#333", marginBottom: 20 }}>
            Conhecendo o potencial da nossa região no setor alimentício e da cidade de Marília, considerada a Capital Nacional do Alimento, em 2020, Chikao Nishimura (acionista do Grupo Jacto) – à época diretor do CIESP Alta Paulista – solicitou ao Prof. Dr. Elvis Fusco (Superintendente Executivo da Fundação Shunji Nishimura de Tecnologia) que tomasse a frente do credenciamento do APL da Indústria de Alimentos, devido a sua trajetória no credenciamento de Arranjos Produtivos Locais no estado.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "#333", marginBottom: "4rem"}}>
            Após a conquista do credenciamento, único no estado de São Paulo na área de alimentos, eles constataram a necessidade da criação de uma entidade que realizasse a governança e gestão dos APLs da cadeia da produção de alimentos da região. Assim, no dia 1º de abril de 2022, foi instituída a ADIPA – Associação para o Desenvolvimento da Indústria de Alimentos, na cidade de Marília, por produtores, indústrias do setor de alimentos e entidades parceiras da região, que aceitaram o desafio e ter como propósito integrar a cadeia produtiva de alimentos levando inovação e sustentabilidade para o setor.
          </p>
        </div>
      </section>

      {/* ── PROPÓSITO / VISÃO / VALORES ── */}
      <section style={{
        background: "#255753",
        padding: "72px 24px",
        position: "relative",
      }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 40, textAlign: "center",
        }}
          className="pvv-grid"
        >
          {/* Propósito */}
          <div style={{ color: "#fff" }}>
            <div style={{ marginBottom: 20 }}>
              <Image src="/nossoProposito.png" alt="Nosso Propósito" width={64} height={64} style={{ display: "inline-block" }} />
            </div>
            <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 12 }}>Nosso propósito</h3>
            <p style={{ fontSize: 14, lineHeight: 1.75, opacity: .9 }}>
              Construir um mundo melhor por meio da integração, cooperação e desenvolvimento da indústria de alimentos.
            </p>
          </div>

          {/* Visão */}
          <div style={{ color: "#fff" }}>
            <div style={{ marginBottom: 20 }}>
              <Image src="/NossaVisao.png" alt="Nossa Visão" width={64} height={64} style={{ display: "inline-block" }} />
            </div>
            <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 12 }}>Nossa visão</h3>
            <p style={{ fontSize: 14, lineHeight: 1.75, opacity: .9 }}>
              Ser referência na cadeia produtiva de alimentos na integração com empresas, governo, academia e sociedade civil, e no fomento da inovação, sustentabilidade e saudabilidade, gerando assim valor para o mundo.
            </p>
          </div>

          {/* Valores */}
          <div style={{ color: "#fff" }}>
            <div style={{ marginBottom: 20 }}>
              <Image src="/NossosValores.png" alt="Nossos Valores" width={64} height={64} style={{ display: "inline-block" }} />
            </div>
            <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 12 }}>Nossos valores</h3>
            <p style={{ fontSize: 14, lineHeight: 1.75, opacity: .9 }}>
              Transparência – Imparcialidade – Colaboração – Comprometimento – Inovação – Excelência
            </p>
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .pvv-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── CONSELHO DE ADMINISTRAÇÃO ── */}
      <section style={{ background: "#fff", padding: "72px 24px" }}>
        <h2 style={{ textAlign: "center", color: "#255753", fontWeight: 900, fontSize: 24, letterSpacing: ".1em", marginBottom: 48 }}>
          CONSELHO DE ADMINISTRAÇÃO
        </h2>
        <MemberGrid members={consAdm} />
      </section>

      {/* ── CONSELHO FISCAL ── */}
      <section style={{ background: "#fff", padding: "0 24px 72px" }}>
        <h2 style={{ textAlign: "center", color: "#255753", fontWeight: 900, fontSize: 24, letterSpacing: ".1em", marginBottom: 48 }}>
          CONSELHO FISCAL
        </h2>
        <MemberGrid members={consFiscal} />
      </section>

      {/* ── DIRETORIA EXECUTIVA ── */}
      <section style={{ background: "#fff", padding: "0 24px 80px" }}>
        <h2 style={{ textAlign: "center", color: "#255753", fontWeight: 900, fontSize: 24, letterSpacing: ".1em", marginBottom: 48 }}>
          DIRETORIA EXECUTIVA
        </h2>
        <MemberGrid members={diretoria} />
      </section>

      <Footer />
    </>
  );
}
