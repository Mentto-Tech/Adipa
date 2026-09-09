"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Início", href: "/" },
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Associe-se", href: "/associe-se" },
  { label: "Comunicados", href: "/comunicados" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        {/* Logo */}
        <Link href="/" style={{ flexShrink: 0 }}>
          <Image src="/logoNome.png" alt="ADIPA" width={100} height={56} style={{ height: 56, width: "auto", objectFit: "contain" }} priority />
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 32, alignItems: "center", flex: 1, justifyContent: "center" }} className="desktop-nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{ color: "#222", fontWeight: 500, fontSize: 15, textDecoration: "none", whiteSpace: "nowrap" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#255753")}
              onMouseLeave={e => (e.currentTarget.style.color = "#222")}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* WhatsApp CTA */}
        <a
          href="https://api.whatsapp.com/send?phone=5514981421360&text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20site%20da%20ADIPA.%20%20Pode%20me%20ajudar%3F"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#255753", color: "#fff", fontWeight: 600, fontSize: 14,
            padding: "10px 20px", borderRadius: 50, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0
          }}
          className="desktop-nav"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Entre em contato!
        </a>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu" style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <span style={{ display: "block", width: 24, height: 2, background: "#255753", transition: "transform .2s", transform: open ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ display: "block", width: 24, height: 2, background: "#255753", opacity: open ? 0 : 1, transition: "opacity .2s" }} />
          <span style={{ display: "block", width: 24, height: 2, background: "#255753", transition: "transform .2s", transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "#fff", borderTop: "1px solid #eee", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{ color: "#255753", fontWeight: 600, fontSize: 15, textDecoration: "none" }} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a href="https://api.whatsapp.com/send?phone=5514981421360" target="_blank" rel="noopener noreferrer"
            style={{ color: "#fff", background: "#255753", padding: "10px 20px", borderRadius: 50, fontWeight: 600, fontSize: 14, textDecoration: "none", textAlign: "center" }}>
            Entre em contato!
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
