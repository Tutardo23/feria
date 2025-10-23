"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import MapaModal from "./MapaModal";

type Curso = {
  nivel: "Jardín" | "Primaria" | "Secundaria";
  hora: string;
  curso: string;
  tema: string;
  lugar: string;
};

const DATA: Curso[] = [
  // === JARDÍN ===
  { nivel: "Jardín", hora: "19:00 hs", curso: "Salita de 5 A (Tarde)", tema: "Un reino de sapos y misterios", lugar: "Comedor" },
  { nivel: "Jardín", hora: "20:45 hs", curso: "Salita de 5 B (Tarde)", tema: "Un reino de sapos y misterios", lugar: "Comedor" },

  // === PRIMARIA ===
  { nivel: "Primaria", hora: "19:00 hs", curso: "1° Grado A", tema: "La dulce vida de grandes trabajadoras", lugar: "Aula de 1° grado" },
  { nivel: "Primaria", hora: "20:45 hs", curso: "1° Grado B", tema: "La dulce vida de grandes trabajadoras", lugar: "Aula de 1° grado" },

  { nivel: "Primaria", hora: "19:00 hs", curso: "2° Grado A", tema: "Diversión Reciclada", lugar: "Aulas de 2° grado" },
  { nivel: "Primaria", hora: "20:45 hs", curso: "2° Grado B", tema: "Diversión Reciclada", lugar: "Aulas de 2° grado" },

  { nivel: "Primaria", hora: "19:00 hs", curso: "3° Grado A", tema: "Cuidemos el agua, cuidemos la vida", lugar: "Aula de 3° grado" },
  { nivel: "Primaria", hora: "20:45 hs", curso: "3° Grado B", tema: "Cuidemos el agua, cuidemos la vida", lugar: "Aula de 3° grado" },

  { nivel: "Primaria", hora: "19:00 hs", curso: "4° Grado A", tema: "Mini Huerta Escolar", lugar: "Aula de 4° grado + huerta en campo de deportes" },
  { nivel: "Primaria", hora: "20:45 hs", curso: "4° Grado B", tema: "Mini Huerta Escolar", lugar: "Aula de 4° grado + huerta en campo de deportes" },

  { nivel: "Primaria", hora: "19:00 hs", curso: "5° Grado A", tema: "Guardianas del agua: Gotitas que salvan", lugar: "Aula de 5° grado A" },
  { nivel: "Primaria", hora: "20:45 hs", curso: "5° Grado B", tema: "Guardianas del agua: Gotitas que salvan", lugar: "Aula de 5° grado A" },

  { nivel: "Primaria", hora: "19:00 hs", curso: "6° Grado A", tema: "Click verde", lugar: "Aula de 6° grado" },
  { nivel: "Primaria", hora: "20:45 hs", curso: "6° Grado B", tema: "Click verde", lugar: "Aula de 6° grado" },

  // === SECUNDARIA ===
  { nivel: "Secundaria", hora: "19:00 hs", curso: "1° Año A", tema: "Pascalandia", lugar: "Aula 1° A" },
  { nivel: "Secundaria", hora: "20:45 hs", curso: "1° Año B", tema: "Pascalandia", lugar: "Aula 1° B" },

  { nivel: "Secundaria", hora: "19:00 hs", curso: "2° Año A", tema: "Eco alumnas, transformando plástico en conciencia", lugar: "Playón de entrada" },
  { nivel: "Secundaria", hora: "20:45 hs", curso: "2° Año B", tema: "Eco alumnas, transformando plástico en conciencia", lugar: "Playón de entrada" },

  { nivel: "Secundaria", hora: "19:00 hs", curso: "3° Año A", tema: "Figuras que hablan: el arte de la forma", lugar: "Aula 3°A" },
  { nivel: "Secundaria", hora: "20:45 hs", curso: "3° Año B", tema: "La armonía de la naturaleza: el número áureo en la creación", lugar: "Aula 2°A" },

  { nivel: "Secundaria", hora: "19:00 hs", curso: "4° Año A", tema: "Pequeñas decisiones, grandes cambios", lugar: "Aula 4° A" },
  { nivel: "Secundaria", hora: "20:45 hs", curso: "4° Año B", tema: "Pequeñas decisiones, grandes cambios", lugar: "Aula 4° A" },
  { nivel: "Secundaria", hora: "19:00 hs o 20:45 hs ", curso: "4° Año B", tema: "¡Prepárate para la descarga!: El Poder de la FEM", lugar: "Pasillo frente al aula 4°A" },
  

  { nivel: "Secundaria", hora: "19:00 hs y 20:45 hs", curso: "5° Año A", tema: "Experiencia U", lugar: "Aula 5° A" },
  { nivel: "Secundaria", hora: "19:00 hs o 20:45 hs", curso: "5° Año B", tema: "El eco de un voto inconsciente", lugar: "Aula 5° B" },
  

  { nivel: "Secundaria", hora: "19:00 hs o 20:45 hs", curso: "6° Año A", tema: "Perdidas en la historia", lugar: "Patio Primaria" },
  { nivel: "Secundaria", hora: "19:00 hs a 20:45 hs", curso: "6° Año B", tema: "6° Emprende", lugar: "Patio Primaria" },
  { nivel: "Secundaria", hora: "19:00 hs a 20:45 hs", curso: "6° Año B", tema: "Fe joven", lugar: "Patio Primaria" },
  
];

const NIVELES: Array<Curso["nivel"] | "Todos"> = ["Todos", "Jardín", "Primaria", "Secundaria"];

const colorByNivel = (nivel: Curso["nivel"]) => {
  if (nivel === "Jardín") return "bg-[#EAF7E5] text-[#234D20]";
  if (nivel === "Primaria") return "bg-[#E6EEFF] text-[#1B3C75]";
  return "bg-[#F5E0E5] text-[#7A1C32]";
};

export default function SeccionFeriaLosCerrosCinematic() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState("");
  const [nivel, setNivel] = useState<"Todos" | "Jardín" | "Primaria" | "Secundaria">("Todos");
  const [mapOpen, setMapOpen] = useState(false);
  const [cursoActivo, setCursoActivo] = useState<string | null>(null);

  const fondos = ["/6.png", "/7.png", "/8.png"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % fondos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const normalize = (t: string) => t.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
  const results = useMemo(() => {
    const q = normalize(query);
    return DATA.filter(
      (c) =>
        (nivel === "Todos" || c.nivel === nivel) &&
        normalize(`${c.curso} ${c.tema} ${c.lugar}`).includes(q)
    );
  }, [query, nivel]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cursos"
      ref={rootRef}
      className="relative w-full min-h-screen text-white font-[Outfit] overflow-hidden py-16 px-4"
    >
      {/* === Fondo === */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={fondos[index]}
              alt={`fondo-${index}`}
              width={1600}
              height={900}
              priority
              className="w-auto h-[90%] object-contain opacity-60 brightness-[0.8] contrast-110"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#7A1C32]/70 via-transparent to-[#2A0B13]/80" />
      </div>

      {/* === Encabezado === */}
      <div className="text-center mb-14 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-2">Encontrá tu curso</h2>
        <p className="text-[#FCD7D9]/80">Deslizá y ubicá el proyecto de tu hija</p>
      </div>

      {/* === Buscador === */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 relative z-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar curso o tema..."
          className="px-6 py-3 rounded-full text-[#7A1C32] bg-[#FFF8F7] w-[80vw] sm:w-[420px] outline-none focus:ring-4 focus:ring-[#FCD7D9]/60"
        />
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {NIVELES.map((n) => (
            <button
              key={n}
              onClick={() =>
                setNivel(n === "Todos" ? "Todos" : (n as "Jardín" | "Primaria" | "Secundaria"))
              }
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                nivel === n
                  ? "bg-[#FFF8F7] text-[#7A1C32] shadow-md"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* === Cards === */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-10 pb-10 scrollbar-none justify-start px-4 relative z-10">
        {results.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`card flex-shrink-0 snap-center w-[80vw] sm:w-[380px] min-h-[230px] ${colorByNivel(
              c.nivel
            )} rounded-3xl shadow-[0_12px_28px_rgba(0,0,0,0.25)] p-8 transition-transform duration-300`}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-bold">{c.curso}</h3>
              <div className="text-right">
                <div className="text-xs uppercase opacity-70">Horario</div>
                <div className="text-lg font-extrabold text-[#7A1C32]">{c.hora}</div>
              </div>
            </div>
            <p className="italic text-base text-[#7A1C32] mb-4">{c.tema}</p>
            <div className="bg-[#FFF8F7]/70 rounded-xl px-5 py-3 border border-[#7A1C32]/10 shadow-inner mb-4">
              <span className="font-semibold text-[#7A1C32]">{c.lugar}</span>
            </div>
            <button
              onClick={() => {
                setCursoActivo(c.curso);
                setMapOpen(true);
              }}
              className="rounded-full bg-[#7A1C32] text-white px-4 py-2 text-sm hover:brightness-110"
            >
              📍 Ver en mapa
            </button>
          </motion.div>
        ))}
      </div>

      <MapaModal open={mapOpen} onClose={() => setMapOpen(false)} curso={cursoActivo} />
    </section>
  );
}
