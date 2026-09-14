"use client";

import { useState } from "react";
import Image from "next/image";

interface Midia {
  id: number;
  tipo: string;
  url: string;
  ordem: number;
}

export default function MidiaCarousel({ midias }: { midias: Midia[] }) {
  const [current, setCurrent] = useState(0);

  const itemsPerView = 3;
  const maxIndex = Math.max(0, midias.length - itemsPerView);

  function prev() {
    setCurrent((i) => Math.max(0, i - 1));
  }

  function next() {
    setCurrent((i) => Math.min(maxIndex, i + 1));
  }

  return (
    <div className="carousel">
      <button
        className="carousel-arrow carousel-arrow-left"
        onClick={prev}
        disabled={current === 0}
        aria-label="Anterior"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${current * (100 / itemsPerView)}%)` }}
        >
          {midias.map((midia) => (
            <div key={midia.id} className="carousel-slide">
              {midia.tipo === "foto" ? (
                <Image
                  src={midia.url}
                  alt={`Mídia ${midia.ordem + 1}`}
                  width={400}
                  height={300}
                  className="carousel-img"
                />
              ) : (
                <video
                  controls
                  className="carousel-video"
                  src={midia.url}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        className="carousel-arrow carousel-arrow-right"
        onClick={next}
        disabled={current >= maxIndex}
        aria-label="Próximo"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {midias.length > itemsPerView && (
        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Ir para posição ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
