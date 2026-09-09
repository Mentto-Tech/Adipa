import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import type { Metadata } from "next";
import "./page.css";

export const metadata: Metadata = {
  title: "Comunicados – ADIPA",
};

export default function Comunicados() {
  return (
    <>
      <Navbar />

      <div className="comunicados-page">
        <h1 className="comunicados-title">NOTA OFICIAL</h1>

        <div className="comunicados-image-wrapper">
          <Image
            src="/comunicado.png"
            alt="Nota Oficial ADIPA"
            width={800}
            height={1100}
            className="comunicados-image"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
