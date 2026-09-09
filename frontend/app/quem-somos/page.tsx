import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import "./page.css";

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
    <div className="member-grid">
      {members.map((m) => (
        <div key={m.nome} className="member-item">
          <p className="member-name">{m.nome}</p>
          <p className="member-role">{m.cargo}</p>
        </div>
      ))}
    </div>
  );
}

export default function QuemSomos() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="qs-hero">
        <Image
          src="/bg-quem-somos.jpg"
          alt="Campo agrícola"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div className="qs-hero-overlay" />
        <div className="qs-hero-content">
          <Image
            src="/logo.png"
            alt="ADIPA"
            width={80}
            height={80}
            className="qs-hero-logo"
          />
          <p className="qs-hero-name">ADIPA</p>
        </div>
      </section>

      {/* ── MISSÃO + FOTO ── */}
      <section className="qs-mission">
        <div className="qs-mission-inner">
          <div className="qs-mission-text">
            <h2 className="qs-mission-title">
              "Visando ao desenvolvimento competitivo e sustentável e à promoção da saúde humana, animal, vegetal e ambiental...
            </h2>
            <p className="qs-mission-body">
              A <strong>ADIPA</strong> destina-se a promover o desenvolvimento da indústria de alimentos, por meio da colaboração, cooperativismo, associativismo, conhecimento, pesquisa científica e tecnológica, desenvolvimento tecnológico, inovação tecnológica, empreendedorismo e sustentabilidade social e ambiental, visando ao desenvolvimento competitivo e sustentável e à promoção da saúde humana, animal, vegetal e ambiental, apoiando as atividades empresariais intensivas em manufatura, educação, pesquisa e inovação, sempre em benefício da coletividade, contribuindo para o desenvolvimento econômico, social e ambiental do país.
            </p>
          </div>
          <div className="qs-mission-photo">
            <Image
              src="/fotoQuemSomos.png"
              alt="Reunião ADIPA"
              width={480}
              height={320}
              className="qs-mission-img"
            />
          </div>
        </div>
      </section>

      {/* ── NOSSA HISTÓRIA ── */}
      <section className="qs-history">
        <div className="qs-history-inner">
          <h2 className="qs-history-title">Nossa história:</h2>
          <p className="qs-history-text">
            Conhecendo o potencial da nossa região no setor alimentício e da cidade de Marília, considerada a Capital Nacional do Alimento, em 2020, Chikao Nishimura (acionista do Grupo Jacto) – à época diretor do CIESP Alta Paulista – solicitou ao Prof. Dr. Elvis Fusco (Superintendente Executivo da Fundação Shunji Nishimura de Tecnologia) que tomasse a frente do credenciamento do APL da Indústria de Alimentos, devido a sua trajetória no credenciamento de Arranjos Produtivos Locais no estado.
          </p>
          <p className="qs-history-text">
            Após a conquista do credenciamento, único no estado de São Paulo na área de alimentos, eles constataram a necessidade da criação de uma entidade que realizasse a governança e gestão dos APLs da cadeia da produção de alimentos da região. Assim, no dia 1º de abril de 2022, foi instituída a ADIPA – Associação para o Desenvolvimento da Indústria de Alimentos, na cidade de Marília, por produtores, indústrias do setor de alimentos e entidades parceiras da região, que aceitaram o desafio e ter como propósito integrar a cadeia produtiva de alimentos levando inovação e sustentabilidade para o setor.
          </p>
        </div>
      </section>

      {/* ── PROPÓSITO / VISÃO / VALORES ── */}
      <section className="qs-pvv">
        <div className="qs-pvv-grid">
          <div className="qs-pvv-item">
            <div className="qs-pvv-icon">
              <Image src="/nossoProposito.png" alt="Nosso Propósito" width={64} height={64} />
            </div>
            <h3 className="qs-pvv-subtitle">Nosso propósito</h3>
            <p className="qs-pvv-text">
              Construir um mundo melhor por meio da integração, cooperação e desenvolvimento da indústria de alimentos.
            </p>
          </div>

          <div className="qs-pvv-item">
            <div className="qs-pvv-icon">
              <Image src="/NossaVisao.png" alt="Nossa Visão" width={64} height={64} />
            </div>
            <h3 className="qs-pvv-subtitle">Nossa visão</h3>
            <p className="qs-pvv-text">
              Ser referência na cadeia produtiva de alimentos na integração com empresas, governo, academia e sociedade civil, e no fomento da inovação, sustentabilidade e saudabilidade, gerando assim valor para o mundo.
            </p>
          </div>

          <div className="qs-pvv-item">
            <div className="qs-pvv-icon">
              <Image src="/NossosValores.png" alt="Nossos Valores" width={64} height={64} />
            </div>
            <h3 className="qs-pvv-subtitle">Nossos valores</h3>
            <p className="qs-pvv-text">
              Transparência – Imparcialidade – Colaboração – Comprometimento – Inovação – Excelência
            </p>
          </div>
        </div>
      </section>

      {/* ── CONSELHO DE ADMINISTRAÇÃO ── */}
      <section className="qs-council">
        <h2 className="qs-council-title">CONSELHO DE ADMINISTRAÇÃO</h2>
        <MemberGrid members={consAdm} />
      </section>

      {/* ── CONSELHO FISCAL ── */}
      <section className="qs-council-last">
        <h2 className="qs-council-title">CONSELHO FISCAL</h2>
        <MemberGrid members={consFiscal} />
      </section>

      {/* ── DIRETORIA EXECUTIVA ── */}
      <section className="qs-council-bottom">
        <h2 className="qs-council-title">DIRETORIA EXECUTIVA</h2>
        <MemberGrid members={diretoria} />
      </section>

      <Footer />
    </>
  );
}
