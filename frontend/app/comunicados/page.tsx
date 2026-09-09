import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comunicados – ADIPA",
};

export default function Comunicados() {
  return (
    <>
      <Navbar />

      <div className="bg-[#255753] min-h-screen flex flex-col items-center px-8 pt-16 pb-16" style={{ borderBottom: "1px solid white" }}>
        <h1 className="text-1xl md:text-4xl font-bold text-white" style={{ marginTop: "40px" }}>NOTA OFICIAL</h1>

        <div className="w-full max-w-2xl" style={{ margin: "40px" }}>
          <Image
            src="/comunicado.png"
            alt="Nota Oficial ADIPA"
            width={800}
            height={1100}
            className="w-full h-auto shadow-lg"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
