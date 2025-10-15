"use client";
import { useEffect, useRef, useState } from "react";

export default function CronogramaSwipeLineaRebote() {
  const [x, setX] = useState(0);
  const [search, setSearch] = useState("");
  const startX = useRef(0);
  const startPos = useRef(0);
  const dragging = useRef(false);
  const velocity = useRef(0);
  const frame = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);


  const cursos = [
    { nivel: "Inicial", hora: "19:00", curso: "Sala de 5", proyecto: "Los sentidos en acción", lugar: "Aula 1 – Nivel Inicial" },
    { nivel: "Primaria", hora: "19:15", curso: "1° Grado", proyecto: "La magia del agua", lugar: "Patio principal" },
    { nivel: "Primaria", hora: "19:30", curso: "2° Grado", proyecto: "El ciclo de las plantas", lugar: "Aula 4 – Planta baja" },
    { nivel: "Primaria", hora: "19:45", curso: "3° Grado", proyecto: "Volcanes en erupción", lugar: "Laboratorio de Ciencias" },
    { nivel: "Primaria", hora: "20:00", curso: "4° Grado", proyecto: "Electricidad divertida", lugar: "Aula 9 – Primer piso" },
    { nivel: "Primaria", hora: "20:15", curso: "5° Grado", proyecto: "Energías renovables", lugar: "Sala de Tecnología" },
    { nivel: "Primaria", hora: "20:30", curso: "6° Grado", proyecto: "El cuerpo humano", lugar: "Aula 12" },
    { nivel: "Secundaria", hora: "20:45", curso: "1° Año", proyecto: "Energía y movimiento", lugar: "Lab. de Física" },
    { nivel: "Secundaria", hora: "21:00", curso: "2° Año", proyecto: "Reacciones químicas", lugar: "Lab. de Química" },
    { nivel: "Secundaria", hora: "21:15", curso: "3° Año", proyecto: "El ADN y la vida", lugar: "Lab. de Biología" },
    { nivel: "Secundaria", hora: "21:30", curso: "4° Año", proyecto: "Códigos y lógica", lugar: "Sala de Computación" },
    { nivel: "Secundaria", hora: "21:45", curso: "5° Año", proyecto: "Tecnología sostenible", lugar: "Aula 14" },
    { nivel: "Secundaria", hora: "22:00", curso: "6° Año", proyecto: "Investigaciones abiertas", lugar: "Laboratorios – Segundo piso" },
  ];

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[°º]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // Ajuste de tamaño para que se vea más del final
  const cardWidth = 320;
  const gap = 60;
  const totalWidth = (cardWidth + gap) * cursos.length;
  const MAX = 0;
  const MIN = -(totalWidth - (typeof window !== "undefined" ? window.innerWidth * 1.15 : 360)); // muestra un poco más del final
  const clamp = (v: number) => Math.max(Math.min(v, MAX), MIN);

  // --- Swipe manual tipo Instagram ---
  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    startPos.current = x;
    if (frame.current) cancelAnimationFrame(frame.current);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    velocity.current = dx * 0.3; // almacena velocidad
    setX(clamp(startPos.current + dx));
  };

  const onUp = (e: React.PointerEvent) => {
    dragging.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);

    // --- Rebote tipo elástico ---
    let current = x;
    const decay = 0.9;
    const animate = () => {
      velocity.current *= decay;
      current += velocity.current;
      if (current > MAX) {
        current = (current + MAX) / 2;
        velocity.current *= -0.4;
      } else if (current < MIN) {
        current = (current + MIN) / 2;
        velocity.current *= -0.4;
      }
      setX(current);
      if (Math.abs(velocity.current) > 0.5) frame.current = requestAnimationFrame(animate);
    };
    frame.current = requestAnimationFrame(animate);
  };

  // --- Buscador funcional ---
  useEffect(() => {
    if (!search) return;
    const q = normalize(search).replace("ano", "año");
    const index = cursos.findIndex((c) =>
      normalize(`${c.curso} ${c.proyecto} ${c.lugar} ${c.nivel} ${c.hora}`).includes(q)
    );
    if (index === -1) return;
    const containerWidth = window.innerWidth;
    const target = clamp(-index * (cardWidth + gap) + containerWidth / 2 - cardWidth / 2);
    setX(target);
  }, [search]);

  return (
    <section
      className="w-screen h-screen bg-[#7A1C32] text-[#FFF8F7] font-['Handlee'] flex flex-col items-center overflow-hidden select-none relative"
      style={{ touchAction: "none" }}
    >
      {/* 🔍 Buscador */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center flex flex-col gap-3 px-4">
        <h2 className="text-3xl md:text-5xl font-bold">Cronograma General</h2>
        <p className="text-[#FCD7D9]/80 text-base md:text-lg">Deslizá o buscá el curso</p>
        <input
          type="text"
          placeholder="Buscar curso, grado o lugar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-6 py-3 rounded-full text-[#7A1C32] bg-[#FFF8F7] w-[80vw] max-w-md text-lg outline-none focus:ring-4 focus:ring-[#FCD7D9]/80"
        />
      </div>

      {/* 🌐 Swipe con línea de tiempo */}
      <div
        ref={trackRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="absolute bottom-0 left-0 w-full h-[500px] cursor-grab active:cursor-grabbing"
      >
        <div
          style={{
            transform: `translateX(${x}px)`,
            transition: dragging.current ? "none" : "transform 0.2s ease-out",
          }}
          className="absolute left-0 top-0 h-full flex items-center gap-[60px] px-[15vw] will-change-transform"
        >
          {cursos.map((c, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center justify-center min-w-[320px]"
            >
              {/* Hora */}
              <div className="text-xl md:text-2xl font-bold text-[#FCD7D9] mb-3">
                {c.hora} hs
              </div>

              {/* 🔹 Línea + punto */}
              <div className="relative flex items-center justify-center mb-10 w-full">
                {i < cursos.length - 1 && (
                  <div className="absolute left-1/2 h-[2px] bg-[#FFF8F7]/30 w-[calc(100%+8rem)] translate-x-[8px]" />
                )}
                <div className="w-4 h-4 rounded-full bg-[#FFF8F7] shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              </div>

              {/* Info (cards del color del fondo) */}
              <div
                className={`bg-[#7A1C32] border border-[#FFF8F7]/30 text-[#FFF8F7] rounded-2xl shadow-lg min-w-[320px] h-[260px] flex flex-col justify-center items-center px-6 text-center transition-transform ${
                  normalize(search) &&
                  normalize(`${c.curso} ${c.proyecto}`).includes(normalize(search))
                    ? "scale-105"
                    : ""
                }`}
              >
                <h3 className="text-2xl md:text-3xl font-extrabold mb-1">{c.curso}</h3>
                <p className="text-lg italic mb-2 text-[#FCD7D9]">{c.proyecto}</p>
                <p className="text-sm opacity-80">{c.lugar}</p>
                <span className="mt-4 text-xs opacity-60">{c.nivel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
