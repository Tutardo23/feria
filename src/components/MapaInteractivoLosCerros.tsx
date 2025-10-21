"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

interface MapaInteractivoLosCerrosProps {
  cursoInicial?: string | null;
}

export default function MapaInteractivoLosCerros({
  cursoInicial = null,
}: MapaInteractivoLosCerrosProps) {
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const ubicaciones: Record<string, { top: number; left: number }[]> = {
    "Salita de 5 (Tarde)": [{ top: 16.1, left: 86.9 }],
    "1° Grado A": [{ top: 44.7, left: 67.2 }],
    "1° Grado B": [{ top: 46.5, left: 72.0 }],
    "2° Grado A": [{ top: 36.2, left: 27.5 }],
    "2° Grado B": [{ top: 38.1, left: 33.2 }],
    "3° Grado A": [{ top: 33.7, left: 10.7 }],
    "3° Grado B": [{ top: 34.5, left: 18.1 }],
    "4° Grado A": [{ top: 47.8, left: 85.0 }],
    "4° Grado B": [{ top: 48.2, left: 90.0 }],
    "5° Grado A y B": [{ top: 31.7, left: 44.1 }],
    "6° Grado A": [{ top: 21.0, left: 29.1 }],
    "6° Grado B": [{ top: 22.0, left: 33.5 }],
    "1° Año A y B": [{ top: 61.9, left: 51.9 }],
    "2° Año A": [{ top: 77.9, left: 75.6 }],
    "3° Año A": [{ top: 63.0, left: 16.7 }],
    "3° Año B": [{ top: 64.7, left: 24.7 }],
    "4° Año A y B": [{ top: 65, left: 75 }],
    "5° Año A": [{ top: 74.5, left: 34.3 }],
    "5° Año B": [{ top: 74.3, left: 24.4 }],
    "6° Año A": [{ top: 48.3, left: 33.8 }],
    "6° Año B": [{ top: 75.1, left: 7.1 }],
  };

  const coords =
    cursoInicial && ubicaciones[cursoInicial]
      ? ubicaciones[cursoInicial][0]
      : { top: 50, left: 50 };

  useEffect(() => {
    if (arrowRef.current) {
      gsap.fromTo(
        arrowRef.current,
        { y: -10, scale: 0.95 },
        {
          y: 10,
          scale: 1.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          duration: 1.4,
        }
      );
    }
  }, [cursoInicial]);

  return (
    <section className="bg-[#7A1C32] text-white font-[Outfit] flex flex-col items-center justify-center py-8 px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        {cursoInicial ? cursoInicial : "Mapa Interactivo"}
      </h2>

      <div className="relative w-[95vw] max-w-4xl aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        <Image
          src="/mapa.jpg"
          alt="Mapa Colegio Los Cerros"
          fill
          className="object-contain"
          priority
        />

        <AnimatePresence>
          {cursoInicial && (
            <motion.div
              key={cursoInicial}
              ref={arrowRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute z-20 flex flex-col items-center justify-center"
              style={{
                top: `${coords.top}%`,
                left: `${coords.left}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* 🔥 Flecha realmente invertida */}
              <div style={{ transform: "rotate(180deg)" }}>
                <motion.div
                  className="text-8xl text-[#FCD7D9] drop-shadow-[0_0_25px_rgba(252,215,217,0.9)]"
                  animate={{
                    y: [0, 20, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.6,
                    ease: "easeInOut",
                  }}
                >
                  ↓
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
