import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "#255753", padding: "48px 24px 32px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>

        {/* Logo */}
        <div style={{ flexShrink: 0 }}>
          <Image
            src="/logo.png"
            alt="ADIPA"
            width={110}
            height={110}
            style={{ width: 110, height: 110, objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />
        </div>

        {/* Center text */}
        <div style={{ flex: 1, minWidth: 220, textAlign: "center", color: "#fff" }}>
          <p style={{ fontSize: 13, marginBottom: 8 }}>Todos os direitos reservados</p>
          <p style={{ fontSize: 14, marginBottom: 8 }}>
            Associação para o Desenvolvimento da Indústria de Produção de Alimentos.
          </p>
          <p style={{ fontSize: 13 }}>adipa.alimentos@gmail.com | +55 14 98142 - 1360</p>
          <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "16px auto", maxWidth: 320 }} />
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Design feito por: Mentto Tech</p>
        </div>

        {/* Instagram */}
        <div style={{ flexShrink: 0 }}>
          <a
            href="https://www.instagram.com/adipa.alimentos/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram ADIPA"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 48, height: 48, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.5)",
              color: "#fff", textDecoration: "none"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.851s-.012 3.585-.07 4.851c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.585-.012-4.851-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.585 2.163 15.205 2.163 12s.012-3.584.07-4.85c.062-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.415 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038C23.987 15.668 24 15.259 24 12s-.013-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.013 15.259 0 12 0z"/>
              <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
