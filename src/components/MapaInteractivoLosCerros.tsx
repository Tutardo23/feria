"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

interface MapaInteractivoLosCerrosProps {
  cursoInicial?: string;
}

export default function MapaInteractivoLosCerros({
  cursoInicial = "4° Grado A",
}: MapaInteractivoLosCerrosProps) {
  const arrowRefs = useRef<HTMLDivElement[]>([]);

  // 📍 Coordenadas finales (fijas)
  const ubicaciones: Record<string, { top: number; left: number }[]> = {
    "Salita de 5 A (Tarde)": [{ top: 40.33, left: 90.74 }],
    "Salita de 5 B (Tarde)": [{ top: 40.33, left: 90.74 }],
    "1° Grado A": [{ top: 68.75, left: 71.32 }],
    "1° Grado B": [{ top: 68.75, left: 71.32 }],
    "2° Grado A": [{ top: 49.55, left: 32.25 }],
    "2° Grado B": [{ top: 49.55, left: 32.25 }],
    "3° Grado A": [{ top: 48.66, left: 15.51 }],
    "3° Grado B": [{ top: 48.66, left: 15.51 }],
    "4° Grado A": [
      { top: 66.82, left: 90.51 },
      { top: 26.34, left: 64.84 },
    ],
    "4° Grado B": [
      { top: 66.82, left: 90.51 },
      { top: 26.34, left: 64.84 },
    ],
    "5° Grado A": [{ top: 51.93, left: 45.87 }],
    "5° Grado B": [{ top: 51.93, left: 45.87 }],
    "6° Grado A": [{ top: 35.86, left: 32.48 }],
    "6° Grado B": [{ top: 35.86, left: 32.48 }],
    "1° Año A": [{ top: 77.53, left: 54.58 }],
    "1° Año B": [{ top: 79.61, left: 46.54 }],
    "2° Año A": [{ top: 96.28, left: 82.25 }],
    "2° Año B": [{ top: 96.28, left: 82.25 }],
    "3° Año A": [{ top: 80.8, left: 22.88 }],
    "3° Año B": [{ top: 81.4, left: 22.66 }],
    "4° Año A y B": [{ top: 81.25, left: 40.55 }],
    "4° Año A": [{ top: 89.73, left: 47.21 }],
    "4° Año B": [{ top: 89.73, left: 47.21 }],
    "5° Año A": [{ top: 94.79, left: 38.06 }],
    "5° Año B": [{ top: 91.52, left: 29.13 }],
    "6° Año A": [{ top: 63.84, left: 39.62 }],
    "6° Año B": [{ top: 63.84, left: 39.62 }],
  };

  const coords = ubicaciones[cursoInicial] || [];

  // ✨ Animación de rebote
  useEffect(() => {
    arrowRefs.current.forEach((arrow) => {
      if (arrow)
        gsap.fromTo(
          arrow,
          { y: -6, scale: 0.95 },
          {
            y: 6,
            scale: 1.05,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            duration: 1.3,
          }
        );
    });
  }, [coords]);

  return (
    <section className="bg-[#7A1C32] text-white font-[Outfit] flex flex-col items-center py-8 px-3">
      <h2 className="text-2xl md:text-3xl font-bold mb-5 text-center leading-tight">
        {cursoInicial}
      </h2>

      <div className="relative w-full max-w-md aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-lg border border-white/20">
        <Image
          src="/mapa.jpg"
          alt="Mapa Colegio Los Cerros"
          fill
          className="object-contain"
          priority
        />

        {/* 📍 Flechas fijas */}
        {coords.map((pos, i) => (
          <motion.div
            key={i}
            ref={(el) => {
              if (el) arrowRefs.current[i] = el;
            }}
            className="absolute z-20 flex flex-col items-center justify-center"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div style={{ transform: "rotate(180deg)" }}>
              <motion.div
                className="text-5xl md:text-7xl text-[#FCD7D9] drop-shadow-[0_0_20px_rgba(252,215,217,0.9)] select-none"
                animate={{ y: [0, 15, 0], scale: [1, 1.1, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                ↓
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
