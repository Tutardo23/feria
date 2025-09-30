'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export default function Hero() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-logo', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
      gsap.fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
      gsap.fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6 })
      gsap.fromTo('.hero-buttons', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.9 })
    }, container)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={container}
      className="relative min-h-screen flex flex-col justify-center text-center overflow-hidden"
    >
      {/* Fondo con imagen */}
      <Image
        src="/hero.jpg" // 📌 tu foto
        alt="Feria de Ciencias Colegio Pucará"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay verde degradado más sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00572D]/50 via-[#00572D]/30 to-[#00572D]/60" />

      {/* Contenido */}
      <div className="relative z-10 px-4 max-w-3xl mx-auto">
        {/* Logo */}
        <div className="hero-logo flex justify-center mb-6">
          <div className="bg-white/90 p-3 rounded-xl shadow-lg">
            <Image
              src="/logo-colegio.png"
              alt="Colegio Pucará"
              width={100}
              height={100}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Título */}
        <h1 className="hero-title text-4xl sm:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
          Feria de Ciencias
          <span className="block text-[#F5C242]">Colegio Pucará 2025</span>
        </h1>

        {/* Subtítulo */}
        <p className="hero-subtitle mt-4 text-base sm:text-lg text-white/90 max-w-xl mx-auto">
          Un día para descubrir, aprender y compartir.  
          Consultá aquí horarios, grupos y lugares de presentación.
        </p>

        {/* Botones */}
        <div className="hero-buttons mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="#destacados"
            className="rounded-lg px-6 py-3 bg-[#F5C242] text-[#0C2D57] font-semibold shadow-md hover:bg-yellow-400 transition"
          >
            Ver destacados
          </a>
          <a
            href="#buscar"
            className="rounded-lg px-6 py-3 border border-white/80 text-white font-semibold hover:bg-white/10 transition"
          >
            Buscar mi curso
          </a>
        </div>
      </div>

      {/* Nuevo divisor elegante */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-20 drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
        >
          <path
            fill="#F5C242"
            d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"
          />
        </svg>
      </div>
    </section>
  )
}
