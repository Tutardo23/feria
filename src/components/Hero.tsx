"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Hero() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const btns = Array.from(
        btnsRef.current?.querySelectorAll<HTMLElement>("a") ?? []
      );

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        h1Ref.current!,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.3
      )
        .fromTo(
          copyRef.current!,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.5
        )
        .fromTo(
          btns,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          0.8
        );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      {/* Fondo degradado verde atrás */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-950 via-green-900 to-green-700" />

      {/* Imagen de fondo */}
      <Image
        src="/hero.jpg"
        alt="Noche de las Ciencias"
        fill
        className="object-cover opacity-90"
        priority
      />

      {/* Overlay con verde + negro */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/70 via-green-900/40 to-green-950/70 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40" />

      {/* Contenido */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        {/* Logo */}
        <div className="mb-5">
          <Image
            src="/logo-colegio.png"
            alt="Colegio Pucará"
            width={85}
            height={85}
            className="drop-shadow-lg"
          />
        </div>

        {/* Título */}
        <h1
          ref={h1Ref}
          className="mt-[-1rem] text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
          style={{ textShadow: "0 3px 10px rgba(0,0,0,.6)" }}
        >
          NOCHE DE LAS <span className="text-[#F5C242]">CIENCIAS</span>
        </h1>

        {/* Subtítulo */}
        <p
          ref={copyRef}
          className="mt-3 text-base sm:text-lg tracking-wide uppercase text-white/90"
        >
          EDICIÓN XI · 2025
        </p>

        <p className="mt-2 max-w-xl text-sm sm:text-base text-white/80">
          Un encuentro para descubrir, experimentar y compartir el conocimiento.
        </p>

        {/* Botones */}
        <div ref={btnsRef} className="mt-7 flex gap-5 flex-wrap justify-center">
          <a
            href="#destacados"
            className="px-6 py-2.5 rounded-full 
                       bg-[#F5C242] text-[#0C2D57] font-semibold text-sm 
                       shadow-lg hover:shadow-xl hover:scale-105 transition"
          >
            Ver destacados
          </a>
          <a
            href="#buscar"
            className="px-6 py-2.5 rounded-full border-2 border-white 
                       bg-transparent text-white font-semibold text-sm
                       hover:bg-white hover:text-green-900 hover:scale-105 transition"
          >
            Buscar mi curso
          </a>
        </div>
      </div>

      {/* Curva inferior */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-14"
        >
          <path
            fill="url(#gradiente)"
            d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,80L0,80Z"
          />
          <defs>
            <linearGradient id="gradiente" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00572D" />
              <stop offset="100%" stopColor="#F5C242" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
