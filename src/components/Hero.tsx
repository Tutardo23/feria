"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroCerrosFinal() {
  const rootRef = useRef<HTMLElement | null>(null);
  const ringsRef = useRef<HTMLDivElement | null>(null);
  const sweepRef = useRef<HTMLDivElement | null>(null);
  const circleTextRef = useRef<SVGSVGElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const nocheRef = useRef<HTMLHeadingElement | null>(null);
  const cienciasRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // === animaciones originales ===
      gsap.to(rootRef.current, { duration: 12, repeat: -1, ease: "none", "--angle": 360 });
      gsap.fromTo(
        sweepRef.current,
        { xPercent: -120, opacity: 0.18 },
        { xPercent: 120, opacity: 0.28, duration: 2.2, ease: "power2.out", repeat: -1, repeatDelay: 3 }
      );
      gsap.to(circleTextRef.current, {
        rotate: -360, transformOrigin: "50% 50%", duration: 40, repeat: -1, ease: "none",
      });
      gsap.to(logoRef.current, { scale: 1.04, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true });

      // === EFECTO NUEVO: "STRETCH" PARA NOCHE Y CIENCIAS ===
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

      // entrada + estiramiento tipo rebote
      tl.fromTo(
        nocheRef.current,
        { scaleY: 0.8, scaleX: 1.4, opacity: 0, filter: "blur(10px)" },
        {
          scaleY: 1.15,
          scaleX: 0.95,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
        }
      )
        .to(nocheRef.current, {
          scaleY: 1,
          scaleX: 1,
          duration: 0.6,
          ease: "power2.out",
        })
        .fromTo(
          cienciasRef.current,
          { scaleY: 0.8, scaleX: 1.4, opacity: 0, filter: "blur(10px)" },
          {
            scaleY: 1.15,
            scaleX: 0.95,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "elastic.out(1, 0.6)",
          },
          "-=0.3"
        )
        .to(cienciasRef.current, {
          scaleY: 1,
          scaleX: 1,
          duration: 0.6,
          ease: "power2.out",
        });

      // pulso luminoso
      gsap.to([nocheRef.current, cienciasRef.current], {
        textShadow: "0 0 20px rgba(252,215,217,0.9)",
        color: "#fff",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate min-h-[100svh] w-full overflow-hidden text-white bg-transparent"
      style={{ "--angle": 0 } as React.CSSProperties}
    >
      {/* === FONDO === */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <Image
            src="/entrada.png"
            alt="Entrada Colegio Los Cerros"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#7A1C32]/50 via-[#5E1527]/60 to-[#2A0B13]/70 sm:from-[#7A1C32]/40 sm:via-[#5E1527]/50 sm:to-[#2A0B13]/60" />
      </div>

      {/* === EFECTOS === */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(900px 900px at 50% 50%, rgba(252,215,217,0.12), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "conic-gradient(from calc(var(--angle)*1deg), transparent 0deg, rgba(122,28,50,0.22) 120deg, transparent 360deg)",
        }}
      />
      <div
        ref={sweepRef}
        className="absolute z-20 top-[12%] left-0 h-48 w-[36%] origin-left skew-x-12 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
          filter: "blur(6px)",
          mixBlendMode: "screen",
        }}
      />

      {/* === CÍRCULO ENERGÉTICO === */}
      <div ref={ringsRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center">
        {/* === TEXTO SUPERIOR === */}
        <h2
          ref={nocheRef}
          className="text-[#FCD7D9] text-2xl sm:text-4xl font-semibold tracking-[0.35em] mb-6 select-none"
        >
          NOCHE DE LAS
        </h2>

        {/* === CÍRCULO === */}
        <div className="relative flex items-center justify-center">
          <div
            data-shard
            className="relative w-[66vmin] h-[66vmin] rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(252,215,217,0.9), rgba(255,255,255,0.45), rgba(124,28,50,0.85))",
              WebkitMaskImage: "radial-gradient(circle at center, transparent 49%, black 51%)",
              maskImage: "radial-gradient(circle at center, transparent 49%, black 51%)",
              filter: "drop-shadow(0 0 22px rgba(252,215,217,0.35))",
            }}
          />

          {/* === LOGO === */}
          <div
            ref={logoRef}
            className="absolute z-40 w-[28vmin] h-[28vmin] rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border border-white/30 shadow-[0_0_40px_rgba(252,215,217,0.3)]"
          >
            <Image src="/logo-cerros.png" alt="Logo Colegio Los Cerros" fill className="object-contain p-3" />
          </div>

          {/* === SEGUNDO ARO === */}
          <div
            data-shard
            className="absolute w-[50vmin] h-[50vmin] rounded-full"
            style={{
              background:
                "conic-gradient(from 30deg, rgba(255,255,255,0.5), rgba(252,215,217,0.25), rgba(255,255,255,0.5))",
              WebkitMaskImage: "radial-gradient(circle at center, transparent 62%, black 64%)",
              maskImage: "radial-gradient(circle at center, transparent 62%, black 64%)",
              filter: "drop-shadow(0 0 16px rgba(255,255,255,0.25))",
            }}
          />
        </div>

        {/* === TEXTO INFERIOR === */}
        <h2
          ref={cienciasRef}
          className="text-[#FCD7D9] text-2xl sm:text-4xl font-semibold tracking-[0.35em] mt-6 select-none"
        >
          CIENCIAS
        </h2>
      </div>

      {/* === TEXTO ORBITAL === */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
        <svg ref={circleTextRef} width="70vmin" height="70vmin" viewBox="0 0 100 100" className="opacity-90">
          <defs>
            <path id="orbit" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" fill="none" />
          </defs>
          <text fill="rgba(255,255,255,0.95)" fontSize="4" letterSpacing="1.2" fontFamily="Outfit, sans-serif">
            <textPath href="#orbit" startOffset="0%">● LA NOCHE DE LAS CIENCIAS — COLEGIO LOS CERROS — 2025 ●</textPath>
          </text>
        </svg>
      </div>

      {/* === INDICADOR INFERIOR === */}
      <div className="absolute z-40 bottom-5 left-1/2 -translate-x-1/2 text-xs sm:text-sm tracking-widest text-white/85 p-0.1">
        DESLIZÁ PARA ENTRAR
        <div className="mt-1 h-px w-24 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      </div>
    </section>
  );
}
