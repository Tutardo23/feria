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
      const btns = Array.from(btnsRef.current?.querySelectorAll<HTMLElement>("a") ?? []);

      // Animaciones de entrada
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(videoRef.current!, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1 })
        .fromTo(h1Ref.current!, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.3)
        .fromTo(copyRef.current!, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.5)
        .fromTo(btns, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.7);

      // 🎥 Parallax: solo el video hace zoom al scrollear
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
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
        src="/ciencias.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/ciencias-poster.jpg"
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/60 via-green-900/40 to-green-950/70" />

      {/* Contenido */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        {/* Logo */}
        <div className="mb-4">
          <Image
            src="/logo-colegio.png"
            alt="Colegio Pucará"
            width={70}
            height={70}
            className="drop-shadow-xl"
          />
        </div>

        {/* Título */}
        <h1
          ref={h1Ref}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
          style={{ textShadow: "0 3px 10px rgba(0,0,0,.4)" }}
        >
          NOCHE DE LAS <span className="text-[#F5C242]">CIENCIAS</span>
        </h1>

        {/* Subtítulo */}
        <p
          ref={copyRef}
          className="mt-2 text-base sm:text-lg text-white/90 font-medium"
        >
          EDICIÓN XI · 2025
        </p>

        <p className="mt-3 max-w-lg text-sm sm:text-base text-white/80">
          Un encuentro para descubrir, experimentar y compartir el conocimiento.
        </p>

        {/* Botones */}
        <div
          ref={btnsRef}
          className="mt-6 flex flex-col sm:flex-row justify-center gap-3 w-full max-w-sm"
        >
          <a
            href="#destacados"
            className="flex-1 text-center rounded-lg px-5 py-2 
                       bg-gradient-to-r from-yellow-400 to-[#F5C242] text-[#0C2D57] text-sm font-semibold 
                       shadow-md hover:scale-105 transition-transform"
          >
            Ver destacados
          </a>
          <a
            href="#buscar"
            className="flex-1 text-center rounded-lg px-5 py-2 
                       bg-white/90 text-green-900 text-sm font-semibold 
                       shadow-md hover:scale-105 transition-transform"
          >
            Buscar mi curso
          </a>
        </div>
      </div>

      {/* Curva inferior */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-14">
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
