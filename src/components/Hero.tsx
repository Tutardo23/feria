"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const btns = Array.from(
        btnsRef.current?.querySelectorAll<HTMLElement>("a") ?? []
      );

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Video fade-in
      tl.fromTo(
        videoRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2 },
        0
      );

      // Título
      tl.fromTo(
        h1Ref.current,
        { opacity: 0, y: 40, skewY: 5 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.8 },
        0.4
      );

      // Subtítulo
      tl.fromTo(
        copyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.7
      );

      // Botones
      tl.fromTo(
        btns,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
        1
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      {/* Video de fondo */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlays para contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

      {/* Contenido */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        {/* Logo */}
        <div className="mb-6">
          <img
            src="/logo-colegio.png"
            alt="Colegio Pucará"
            className="h-20 w-20 object-contain drop-shadow-lg"
          />
        </div>

        {/* Título */}
        <h1
          ref={h1Ref}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
          style={{ textShadow: "0 4px 15px rgba(0,0,0,.7)" }}
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
        <div ref={btnsRef} className="mt-8 flex gap-5 flex-wrap justify-center">
          <a
            href="#cantina"
            className="px-6 py-2.5 rounded-full 
                       bg-[#F5C242] text-[#0C2D57] font-semibold text-sm 
                       shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
          >
            Ver cantina
          </a>
          <a
            href="#buscar"
            className="px-6 py-2.5 rounded-full border-2 border-white 
                       bg-transparent text-white font-semibold text-sm
                       hover:bg-white hover:text-green-900 hover:scale-105 transition-transform"
          >
            Buscar mi curso
          </a>
        </div>
      </div>

      {/* Curva inferior decorativa */}
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
