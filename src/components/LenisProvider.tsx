"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // ✅ Inicializar Lenis sin 'smooth' (API nueva)
    const lenis = new Lenis({
      duration: 1.2, // suavidad general
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing suave
      wheelMultiplier: 1.2,
      smoothWheel: true,
    });

    // 🔄 Sincronizar con GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // ⚙️ Guardamos la referencia de la función para removerla después
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update); // 👈 ahora sí remueve correctamente
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
