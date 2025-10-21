"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { FaInstagram, FaGlobe } from "react-icons/fa";

export default function FooterCerros() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
      gsap.to(".brillo", {
        backgroundPositionX: "200%",
        duration: 8,
        repeat: -1,
        ease: "linear",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden text-white bg-[#7A1C32] py-24 flex flex-col items-center justify-center"
    >
      {/* ✨ Fondo animado */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 brillo opacity-20"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.25) 0%, transparent 40%, rgba(255,255,255,0.25) 60%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
        />
        <Image
          src="/entrada.png"
          alt="Fondo Colegio Los Cerros"
          fill
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A0B13]/90 via-[#5E1527]/80 to-transparent" />
      </div>

      {/* 🌸 Contenido */}
      <div className="relative z-10 text-center flex flex-col items-center gap-6 px-6">
        {/* Logo */}
        <div className="w-28 h-28 relative">
          <Image
            src="/logo-cerros.png"
            alt="Logo Colegio Los Cerros"
            fill
            className="object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]"
          />
        </div>

        {/* Nombre */}
        <h3 className="text-3xl md:text-4xl font-semibold tracking-wide text-[#FCD7D9]">
          Colegio Los Cerros
        </h3>

        {/* Texto institucional */}
        <p className="max-w-xl text-[#FFF8F7]/80 text-sm md:text-base leading-relaxed">
          Gracias a todas las alumnas, familias y docentes que formaron parte de{" "}
          <span className="italic">La Noche de las Ciencias 2025</span>.  
          Un espacio para compartir la pasión por aprender, crear y descubrir.
        </p>

        {/* Enlaces */}
        <div className="flex flex-wrap justify-center gap-5 mt-4">
          <a
            href="https://www.instagram.com/apdestucuman/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#FCD7D9] hover:text-white transition text-lg"
          >
            <FaInstagram className="text-2xl" />
            @apdestucuman
          </a>

          <a
            href="https://loscerros.apdes.edu.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#FCD7D9] hover:text-white transition text-lg"
          >
            <FaGlobe className="text-2xl" />
            Sitio institucional
          </a>
        </div>

        {/* Línea decorativa */}
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#FCD7D9] to-transparent mt-8" />

        {/* Créditos finales */}
        <span className="text-xs opacity-70 mt-2">
          © 2025 Colegio Los Cerros 
        </span>
      </div>
    </footer>
  );
}
