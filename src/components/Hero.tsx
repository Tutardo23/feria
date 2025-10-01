"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const btns = Array.from(
        btnsRef.current?.querySelectorAll<HTMLElement>("a") ?? []
      );

      // Estado inicial
      if (videoRef.current)
        gsap.set(videoRef.current, { opacity: 0, scale: 1.04 });
      if (h1Ref.current) gsap.set(h1Ref.current, { opacity: 0, y: 12 });
      if (copyRef.current) gsap.set(copyRef.current, { opacity: 0, y: 12 });
      gsap.set(btns, { opacity: 0, y: 10 });

      // Animaciones de entrada
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(videoRef.current!, { opacity: 1, scale: 1, duration: 0.6 }, 0)
        .to(h1Ref.current!, { opacity: 1, y: 0, duration: 0.35 }, 0.15)
        .to(copyRef.current!, { opacity: 1, y: 0, duration: 0.35 }, 0.3)
        .to(btns, { opacity: 1, y: 0, duration: 0.35, stagger: 0.1 }, 0.6);

      // Parallax del video (sin hacerlo gigante)
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top", // dura lo que mide el Hero
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.to(videoRef.current, {
            scale: 1.05 + p * 0.05, // zoom suave
            overwrite: "auto",
          });
          gsap.to("#hero .fade", {
            opacity: 1 - p * 0.3, // contenido se desvanece sutilmente
            overwrite: "auto",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-black text-white z-0"
    >
      {/* Video de fondo */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/ciencias.mp4" // 📌 tu video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/ciencias-poster.jpg"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-green-950/60 via-green-900/40 to-green-950/70" />

      {/* Contenido */}
      <div className="fade relative z-[20] mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/logo-colegio.png"
            alt="Colegio Pucará"
            width={110}
            height={110}
            className="drop-shadow-xl"
          />
        </div>

        {/* Título */}
        <h1
          ref={h1Ref}
          className="text-[40px] sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.95]"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,.35)" }}
        >
          NOCHE DE LAS <span className="text-[#F5C242]">CIENCIAS</span>
        </h1>

        {/* Subtítulo */}
        <p
          ref={copyRef}
          className="mt-3 text-lg sm:text-xl text-white/90 font-semibold"
        >
          EDICIÓN XI · 2025
        </p>

        <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/80">
          Un encuentro para descubrir, experimentar y compartir el conocimiento.
        </p>

        {/* Botones */}
        <div
          ref={btnsRef}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md"
        >
          <a
            href="#destacados"
            className="relative overflow-hidden flex-1 text-center rounded-lg px-6 py-3 
                       bg-gradient-to-r from-yellow-400 to-[#F5C242] text-[#0C2D57] font-semibold 
                       shadow-md hover:scale-105 transition-transform"
          >
            Ver destacados
          </a>

          <a
            href="#buscar"
            className="relative overflow-hidden flex-1 text-center rounded-lg px-6 py-3 
                       bg-white/90 text-green-900 font-semibold 
                       shadow-md hover:scale-105 transition-transform"
          >
            Buscar mi curso
          </a>
        </div>
      </div>

      {/* Curva inferior */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-20"
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
