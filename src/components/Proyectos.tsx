"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function SeccionProyectosCinematic() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const proyectosRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        background: "linear-gradient(to bottom, #7A1C32, #EFB6BE, #FFF8F7)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      proyectosRef.current.forEach((el, i) => {
        if (!el) return;
        const titulo = el.querySelector(".titulo");
        const texto = el.querySelector(".texto");
        const imagen = el.querySelector(".imagen");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 40%",
            scrub: true,
          },
        });

        tl.fromTo(
          titulo,
          { opacity: 0, x: i % 2 === 0 ? -120 : 120, skewX: i % 2 === 0 ? 8 : -8 },
          { opacity: 1, x: 0, skewX: 0, duration: 1.2, ease: "power3.out" }
        );
        tl.fromTo(
          texto,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
          "-=0.8"
        );
        tl.fromTo(
          imagen,
          { opacity: 0, scale: 0.9, filter: "blur(10px)", y: 80 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1.5, ease: "power3.out" },
          "-=0.9"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const proyectos = [
    {
      titulo: "Explorando desde los primeros pasos",
      texto:
        "Las alumnas más pequeñas participaron con entusiasmo en propuestas sencillas que despertaron su curiosidad y ganas de descubrir el mundo que las rodea.",
      img: "/proyectos/5.jpg",
    },
    {
      titulo: "Aprender con experiencias",
      texto:
        "En los cursos de primaria y secundaria se realizaron actividades que integraron observación, experimentación y trabajo en equipo, mostrando distintas formas de aprender haciendo.",
      img: "/proyectos/1.jpg",
    },
    {
      titulo: "La feria en movimiento",
      texto:
        "Una jornada donde toda la comunidad educativa compartió proyectos, ideas y aprendizajes. La ciencia, el arte y la creatividad se unieron en una experiencia común.",
      img: "/proyectos/2.jpg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen text-white overflow-hidden py-32 md:py-44 bg-[#7A1C32]"
    >
      {/* 🔹 Título principal */}
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-7xl font-['Handlee'] font-bold text-[#FFF] drop-shadow-[0_3px_8px_rgba(0,0,0,0.4)]">
          Proyectos Destacados
        </h2>
        <p className="mt-4 text-lg text-[#FFF8F7]/80">
          Una muestra del trabajo y la creatividad de nuestras alumnas
        </p>
      </div>

      {/* 🔹 Lista de proyectos */}
      <div className="flex flex-col gap-48 max-w-6xl mx-auto px-6 md:px-16">
        {proyectos.map((p, i) => (
          <div
            key={i}
            ref={(el) => {
              proyectosRef.current[i] = el;
            }}
            className={`flex flex-col ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-10 md:gap-20`}
          >
            {/* Texto */}
            <div
              className={`w-full md:w-1/2 texto ${
                i === proyectos.length - 1 ? "text-[#7A1C32]" : "text-white"
              }`}
            >
              <h3
                className={`titulo text-4xl md:text-5xl font-semibold mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)] ${
                  i === proyectos.length - 1 ? "text-[#7A1C32]" : "text-white"
                }`}
                style={{ letterSpacing: "1px" }}
              >
                {p.titulo}
              </h3>
              <p
                className={`text-lg md:text-xl leading-relaxed ${
                  i === proyectos.length - 1
                    ? "text-[#7A1C32]/80"
                    : "text-[#FFF]/85"
                }`}
              >
                {p.texto}
              </p>
            </div>

            {/* Imagen (vertical) */}
            <div className="relative w-full md:w-1/2 aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)] imagen">
              <Image
                src={p.img}
                alt={p.titulo}
                fill
                className="object-cover object-center brightness-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7A1C32]/50 to-transparent" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
