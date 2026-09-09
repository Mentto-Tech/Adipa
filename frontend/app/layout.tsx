import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADIPA – Associação para o Desenvolvimento da Indústria de Produção de Alimentos",
  description:
    "A ADIPA nasceu com o propósito de integrar a cadeia produtiva de alimentos levando inovação e sustentabilidade para o setor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
