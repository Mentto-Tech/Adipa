import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Associe-se – ADIPA",
};

const associados = [
  { name: "Carino Ingredientes",   href: "https://carinoingredientes.com.br/",                                                   src: "/associados/carinoLogo.png" },
  { name: "Marilan",               href: "https://www.grupomarilan.com.br/",                                                     src: "/associados/MarilanLogo.png" },
  { name: "Higye",                 href: "https://www.facebook.com/Regielehigyeconsultoriadealimentos/",                         src: "/associados/HigyeLogo.png" },
  { name: "Jazam",                 href: "https://www.jazam.com.br/",                                                            src: "/associados/JazamLogo.png" },
  { name: "SOS Alegria",           href: "https://www.sosalergia.com.br/",                                                       src: "/associados/SosAlegriaLogo.png" },
  { name: "Meraki",                href: "#",                                                                                    src: "/associados/MerakiLogo.png" },
  { name: "Massas Paulista",       href: "http://massaspaulista.com.br/",                                                        src: "/associados/PaulistaLogo.png" },
  { name: "Its Foods",             href: "#",                                                                                    src: "/associados/itsFoodsLogo.png" },
  { name: "AMAR",                  href: "https://www.facebook.com/apiariosmarilia/?locale=pt_BR",                               src: "/associados/amarLogo.png" },
  { name: "Amenco",                href: "https://amenco.com.br/",                                                               src: "/associados/amencoLogo.png" },
  { name: "DIM Alimentos",         href: "http://dimalimentos.com.br/",                                                          src: "/associados/dimLogo.png" },
  { name: "Nutrissima",            href: "https://www.nutrissimaonline.com.br/",                                                  src: "/associados/nutrissimaLogo.png" },
  { name: "ZD Alimentos",          href: "https://zdalimentos.com.br/",                                                          src: "/associados/zdalimentosLogo.png" },
  { name: "DBG",                   href: "https://www.refrisaojose.com.br/",                                                     src: "/associados/dbgLogo.png" },
  { name: "Dori",                  href: "https://dori.com.br/",                                                                 src: "/associados/doriLogo.png" },
  { name: "Ovos Top",              href: "https://ovostop.com.br/",                                                              src: "/associados/ovosTopLog.png" },
  { name: "Intercoffee",           href: "https://www.intercoffee.com.br/",                                                      src: "/associados/Intercoffee.png" },
  { name: "Pop's Fantasy",         href: "https://www.instagram.com/popsfantasy/",                                               src: "/associados/popFantasyLogo.png" },
  { name: "Edivaldo Colombo",      href: "https://www.linkedin.com/posts/edivaldo-colombo-consultoria-e-foodtech-lab-innovation-and-technology-9636b329_foodtechlab-edivaldocolomboconsultoria-activity-7430780642948333568-p4I7/?originalSubdomain=pt", src: "/associados/edivaldoLogo.png" },
  { name: "Biscoito Rodrigo",      href: "https://www.instagram.com/biscoitosrodrigomr/",                                        src: "/associados/biscoitorodrigoLogo.png" },
  { name: "Café Dona Santina",     href: "https://www.cafedonasantina.com.br/",                                                  src: "/associados/cafeDonaLogo.png" },
  { name: "Clara e Gema",          href: "https://claraegema.pt/",                                                               src: "/associados/ClaraGemaLogo.png" },
  { name: "Doce Doçura",           href: "https://www.instagram.com/docedocurabr/",                                              src: "/associados/doceDocuraLogo.png" },
  { name: "Café Le Verdon",        href: "https://www.cafeleverdonfabrica.com.br/",                                              src: "/associados/leVerdonLogo.png" },
  { name: "Mazi Foods",            href: "https://www.mazifoods.com.br/",                                                        src: "/associados/maziLogo.png" },
  { name: "Nutrisoil",             href: "https://www.nutrisoil.com.br/",                                                        src: "/associados/NutrisoilLogo.png" },
  { name: "Sítio Santa Gertrudes", href: "https://www.instagram.com/sitio_santa_gertrudes/",                                     src: "/associados/SantaGertrudesLogo.png" },
  { name: "Sense Solution",        href: "https://www.instagram.com/sense.solution/",                                            src: "/associados/SenseSolutionLogo.png" },
  { name: "Sítio Bela Vista",      href: "https://www.sitiobelavista.com.br/",                                                   src: "/associados/sitioBelaLogo.png" },
];

export default function AssocieSe() {
  return (
    <>
      <Navbar />

      {/* ── POR QUE SER ASSOCIADO ── */}
      <section style={{ background: "#255753", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 56, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 340px", color: "#fff" }}>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.2, marginBottom: 28 }}>
              POR QUE SER<br />ASSOCIADO?
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.85, opacity: 0.95, marginBottom: 32 }}>
              Una-se a outros participantes da cadeia produtiva de alimentos para construir um futuro melhor para a sua empresa, o setor produtivo e o mundo. O Associado ADIPA terá acesso às parcerias estratégicas estabelecidas com empresas, governos e academia para levar competitividade, inovação e sustentabilidade para seu negócio.
            </p>
            <a href="#formulario" style={{
              display: "inline-block", background: "#e8692a", color: "#fff",
              fontWeight: 700, fontSize: 14, padding: "14px 36px", borderRadius: 50,
              textDecoration: "none", letterSpacing: ".08em"
            }}>
              ASSOCIE-SE
            </a>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTO ── */}
      <section style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 56, flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 220px" }}>
            <Image
              src="https://i0.wp.com/adipa.org.br/wp-content/uploads/elementor/thumbs/Higye-COnsultoria-qtv2e2jic76oulkz321axz16iwfhpvjoqbdwyrwbzq.jpg?w=1170&ssl=1"
              alt="Higye Consultoria"
              width={220}
              height={220}
              style={{ width: "100%", height: "auto", borderRadius: 8, objectFit: "cover" }}
            />
          </div>
          <div style={{ flex: "1 1 300px" }}>
            <h2 style={{ fontWeight: 800, fontSize: 20, color: "#255753", marginBottom: 16 }}>Depoimento Higye</h2>
            <blockquote style={{
              fontSize: 15, lineHeight: 1.85, color: "#444", fontStyle: "italic", margin: 0,
              borderLeft: "4px solid #255753", paddingLeft: 20,
            }}>
              "A ADIPA é uma associação que promove a integração, cooperação e desenvolvimento do setor de alimentos, desde o agro até a indústria. Ela oferece um ambiente de networking com líderes do setor e parcerias estratégicas com governos, instituições de ensino e centros tecnológicos. Ao se associar à ADIPA, você estará colaborando para um futuro mais sustentável e inovador na nossa área.
              <br /><br />
              Ser parte da ADIPA é mais do que apenas fazer parte de uma associação. É sobre se engajar em projetos que realmente fazem a diferença, influenciar o mercado e ter acesso a benefícios exclusivos que podem impulsionar o seu negócio.
              <br /><br />
              Eu sou associada e acredito muito no trabalho da ADIPA. Vamos juntos transformar o futuro da indústria de alimentos! 💚"
            </blockquote>
            <div style={{ marginTop: 28 }}>
              <a href="#formulario" style={{
                display: "inline-block", background: "#255753", color: "#fff",
                fontWeight: 700, fontSize: 14, padding: "12px 32px", borderRadius: 50,
                textDecoration: "none", letterSpacing: ".08em"
              }}>
                ASSOCIE-SE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONHEÇA NOSSOS ASSOCIADOS ── */}
      <section style={{ background: "#f9f9f9", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{
            textAlign: "center", fontWeight: 900, fontSize: 20,
            color: "#255753", letterSpacing: ".08em", marginBottom: 48
          }}>
            CONHEÇA NOSSOS ASSOCIADOS
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 24,
            alignItems: "center",
            justifyItems: "center",
          }}>
            {associados.map((a) => (
              <a key={a.name} href={a.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image
                  src={a.src}
                  alt={a.name}
                  width={140}
                  height={80}
                  style={{ width: 140, height: "auto", objectFit: "contain" }}
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULÁRIO ── */}
      <section id="formulario" style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 style={{
            textAlign: "center", fontWeight: 900, fontSize: 20,
            color: "#255753", letterSpacing: ".08em", marginBottom: 40
          }}>
            PREENCHA O FORMULÁRIO ABAIXO PARA SE TORNAR UM ASSOCIADO ADIPA
          </h2>

          <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Field label="Razão Social *" name="razaoSocial" />
              <Field label="Nome Fantasia *" name="nomeFantasia" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
              <Field label="Data de fundação *" name="dataFundacao" type="date" />
              <Field label="CNPJ *" name="cnpj" />
              <Field label="Logradouro *" name="logradouro" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Field label="Número *" name="numero" />
              <Field label="Bairro *" name="bairro" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 20 }}>
              <Field label="Cidade *" name="cidade" />
              <Field label="Estado *" name="estado" />
              <Field label="CEP *" name="cep" />
              <Field label="Número de colaboradores *" name="colaboradores" type="number" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Field label="E-mail setor financeiro *" name="emailFinanceiro" type="email" />
              <Field label="Telefone setor financeiro *" name="telefoneFinanceiro" type="tel" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Field label="Nome do representante completo *" name="nomeRepresentante" />
              <Field label="CPF (usado para lista de presença em assembleias) *" name="cpf" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Field label="RG *" name="rg" />
              <Field label="Data de nascimento *" name="dataNascimento" type="date" />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#255753", marginBottom: 8 }}>
                Requerimento *
              </label>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: "#555", background: "#f9f9f9", padding: 16, border: "1px solid #ddd", borderRadius: 6 }}>
                Através do presente formulário, solicito minha admissão como associado(a) da Associação para o Desenvolvimento da Indústria de Produção de Alimentos - ADIPA na forma de seu Estatuto, cujo teor foi por mim lido e compreendido, comprometendo-me, desde o deferimento do presente pedido, a agir de acordo com seus dispositivos. Por ser verdade, ratifico todas as declarações por mim prestadas neste requerimento, declarando ainda:{" "}
                a. Ciência de que o envio do presente Termo de Requerimento de Adesão ao quadro de associados da ADIPA não obriga esta entidade a promover o referido vínculo, que se encontrará dependente de análise ao atendimento dos requisitos contidos no Estatuto e/ou Regimento Interno, dentre tais a idoneidade do requerente, o segmento de atuação e a pertinência do vínculo pretendido.{" "}
                b. Que o faço com precisão, de tal forma que todas as informações prestadas refletem a mais pura verdade, respondendo por eventuais desdobramentos ocasionados em razão da incorreção dos dados lançados.{" "}
                c. Ciência e concordância com o disposto no Estatuto e/ou Regimento Interno da ADIPA, bem como de que o vínculo associativo se inicia a partir de sua aprovação pela Presidência Executiva e do pagamento da contribuição mensal de associado(a), definida pelo número de funcionários da empresa.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <input type="checkbox" id="termos" name="termos" style={{ marginTop: 3 }} />
              <label htmlFor="termos" style={{ fontSize: 13, color: "#444" }}>
                Declaro que li e aceito os{" "}
                <a href="https://mentto.com.br/termos-de-uso-e-politicas-de-privacidade/" target="_blank" rel="noopener noreferrer" style={{ color: "#255753" }}>
                  termos e políticas
                </a>
              </label>
            </div>

            <div style={{ textAlign: "center", marginTop: 8 }}>
              <button type="submit" style={{
                background: "#255753", color: "#fff", fontWeight: 700,
                fontSize: 14, padding: "14px 48px", borderRadius: 50,
                border: "none", cursor: "pointer", letterSpacing: ".08em"
              }}>
                ENVIAR
              </button>
            </div>
          </form>

          <p style={{ textAlign: "center", fontSize: 13, color: "#888", marginTop: 24, fontWeight: 700 }}>
            *Boletos com data de vencimento todo dia 10
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label htmlFor={name} style={{ fontSize: 13, fontWeight: 600, color: "#255753" }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        style={{
          border: "1px solid #ccc", borderRadius: 6,
          padding: "10px 12px", fontSize: 14, color: "#333",
          outline: "none", width: "100%", boxSizing: "border-box",
        }}
      />
    </div>
  );
}
