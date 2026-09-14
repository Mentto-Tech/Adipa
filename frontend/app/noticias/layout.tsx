import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notícias – ADIPA",
};

export default function NoticiasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
