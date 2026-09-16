import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import type { Metadata } from "next";
import AssocieSeForm from "./AssocieSeForm";
import "./page.css";

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
      <section className="as-hero">
        <div className="as-hero-inner">
          <div className="as-hero-content">
            <h1 className="as-hero-title">
              POR QUE SER<br />ASSOCIADO?
            </h1>
            <p className="as-hero-text">
              Una-se a outros participantes da cadeia produtiva de alimentos para construir um futuro melhor para a sua empresa, o setor produtivo e o mundo. O Associado ADIPA terá acesso às parcerias estratégicas estabelecidas com empresas, governos e academia para levar competitividade, inovação e sustentabilidade para seu negócio.
            </p>
            <a href="#formulario" className="btn-associate-orange">
              ASSOCIE-SE
            </a>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTO ── */}
      <section className="as-testimonial">
        <div className="as-testimonial-inner">
          <Image
            src="https://i0.wp.com/adipa.org.br/wp-content/uploads/elementor/thumbs/Higye-COnsultoria-qtv2e2jic76oulkz321axz16iwfhpvjoqbdwyrwbzq.jpg?w=1170&ssl=1"
            alt="Higye Consultoria"
            width={220}
            height={220}
            className="as-testimonial-photo"
          />
          <div className="as-testimonial-content">
            <h2 className="as-testimonial-title">Depoimento Higye</h2>
            <blockquote className="as-testimonial-quote">
              "A ADIPA é uma associação que promove a integração, cooperação e desenvolvimento do setor de alimentos, desde o agro até a indústria. Ela oferece um ambiente de networking com líderes do setor e parcerias estratégicas com governos, instituições de ensino e centros tecnológicos. Ao se associar à ADIPA, você estará colaborando para um futuro mais sustentável e inovador na nossa área.
              <br /><br />
              Ser parte da ADIPA é mais do que apenas fazer parte de uma associação. É sobre se engajar em projetos que realmente fazem a diferença, influenciar o mercado e ter acesso a benefícios exclusivos que podem impulsionar o seu negócio.
              <br /><br />
              Eu sou associada e acredito muito no trabalho da ADIPA. Vamos juntos transformar o futuro da indústria de alimentos! 💚"
            </blockquote>
            <div className="as-testimonial-cta">
              <a href="#formulario" className="btn-associate-green">
                ASSOCIE-SE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONHEÇA NOSSOS ASSOCIADOS ── */}
      <section className="as-members">
        <div className="as-members-inner">
          <h2 className="as-members-title">CONHEÇA NOSSOS ASSOCIADOS</h2>
          <div className="as-members-grid">
            {associados.map((a) => (
              <a key={a.name} href={a.href} target="_blank" rel="noopener noreferrer" className="as-member-link">
                <Image
                  src={a.src}
                  alt={a.name}
                  width={140}
                  height={80}
                  className="as-member-logo"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULÁRIO ── */}
      <section id="formulario" className="as-form-section">
        <div className="as-form-inner">
          <h2 className="as-form-title">
            PREENCHA O FORMULÁRIO ABAIXO PARA SE TORNAR UM ASSOCIADO ADIPA
          </h2>

          <AssocieSeForm />

          <p className="as-form-note">*Boletos com data de vencimento todo dia 10</p>
        </div>
      </section>

      <Footer />
    </>
  );
}

