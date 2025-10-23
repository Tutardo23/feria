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

  // 📍 Coordenadas finales (actualizadas por vos)
  const ubicaciones: Record<string, { top: number; left: number }[]> = {
    "Salita de 5 (Tarde)": [{"top":26.190476190476193,"left":83.40773582458496}],
    "1° Grado A": [{ top: 52.23, left: 66.10 }],
    "1° Grado B": [{ top: 52.23, left: 66.10 }],
    "2° Grado A": [{ top: 36.2, left: 27.5 }],
    "2° Grado B": [{ top: 36.2, left: 27.5 }],
    "3° Grado A": [{ top: 33.7, left: 10.7 }],
    "3° Grado B": [{ top: 33.7, left: 10.7 }],
    "4° Grado A": [
      { top: 47.8, left: 85 },
      { top: 15.08, left: 60.75 },
    ],
    "4° Grado B": [
      { top: 47.8, left: 85 },
      { top: 15.08, left: 60.75 },
    ],
    "5° Grado A y B": [{ top: 36.01, left: 38.88 }],
    "6° Grado A": [{ top: 24.70, left: 27.38 }],
    "6° Grado B": [{ top: 24.70, left: 27.38 }],
    "1° Año A": [{ top: 67.01, left: 48.58 }],
    "1° Año B": [{ top: 70.13, left: 41.44 }],
    "2° Año A": [{ top: 87.05, left: 76.71 }],
    "2° Año B": [{ top: 87.05, left: 76.71 }],
    "3° Año A": [{ top: 68.15, left: 16.88 }],
    "3° Año B": [
      
      { top: 69.39, left: 7.18 },
    ],
    "4° Año A y B": [{ top: 81.25, left: 40.55 }],
    "4° Año A": [{ top: 81.25, left: 40.55 }],
    "4° Año B": [{ top: 81.25, left: 40.55 }],
    "5° Año A": [{ top: 82.44, left: 33.96 }],
    "5° Año B": [{ top: 78.57, left: 25.59 }],
    "6° Año A": [{ top: 48.3, left: 33.8 }],
    "6° Año B": [{ top: 48.3, left: 33.8 }],
  };

  const coords =
    cursoInicial && ubicaciones[cursoInicial]
      ? ubicaciones[cursoInicial]
      : [{ top: 50, left: 50 }];

  // ✨ Animación rebote GSAP
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
    <section className="bg-[#7A1C32] text-white font-[Outfit] flex flex-col items-center justify-center py-10 px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        {cursoInicial || "Mapa Interactivo"}
      </h2>

      {/* Contenedor del mapa */}
      <div className="relative w-[95vw] max-w-4xl aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        <Image
          src="/mapa.jpg"
          alt="Mapa Colegio Los Cerros"
          fill
          className="object-contain"
          priority
        />

        {/* Flechas animadas */}
        <AnimatePresence>
          {cursoInicial &&
            coords.map((pos, i) => (
              <motion.div
                ref={i === 0 ? arrowRef : null}
                key={`${cursoInicial}-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute z-20 flex flex-col items-center justify-center"
                style={{
                  top: `${pos.top}%`,
                  left: `calc(${pos.left}% + 4%)`, // ✅ Corrección horizontal automática
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Flecha girada 180° reales */}
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
            ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
