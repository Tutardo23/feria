'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export default function Hero() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-logo', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8 })
      gsap.fromTo('.hero-title span', { y: 60, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3
      })
      gsap.fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1 })
      gsap.fromTo('.hero-buttons a', { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        delay: 1.3
      })

      // Animación partículas fondo
      gsap.to('.atom', {
        y: 'random(-30,30)',
        x: 'random(-30,30)',
        rotate: 'random(-45,45)',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5
      })
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
        src="/hero.jpg"
        alt="Feria de Ciencias Colegio Pucará"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay dinámico */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/60 via-green-800/40 to-green-950/70 animate-pulse" />

      {/* Partículas científicas */}
      <div className="absolute inset-0 -z-0 flex justify-center items-center opacity-20">
        <div className="atom absolute top-16 left-10 text-6xl text-yellow-400">⚛️</div>
        <div className="atom absolute bottom-20 right-16 text-5xl text-green-300">🧪</div>
        <div className="atom absolute top-1/2 left-1/3 text-7xl text-white/40">🔬</div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="hero-logo flex justify-center mb-6">
          <div className="bg-white/90 p-3 rounded-xl shadow-xl">
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
          <span>Feria de Ciencias</span>{' '}
          <span className="block text-[#F5C242]">Colegio Pucará 2025</span>
        </h1>

        {/* Subtítulo */}
        <p className="hero-subtitle mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
          Un día para descubrir, experimentar y compartir.  
          Consultá aquí horarios, grupos y lugares de presentación.
        </p>

        {/* Botones */}
        {/* Botones */}
<div className="hero-buttons mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mx-auto">
  <a
    href="#destacados"
    className="flex-1 text-center rounded-lg px-6 py-3 bg-[#F5C242] text-[#0C2D57] font-semibold shadow-md hover:scale-105 hover:bg-yellow-400 transition transform"
  >
    Ver destacados
  </a>
  <a
    href="#buscar"
    className="flex-1 text-center rounded-lg px-6 py-3 bg-white/90 text-green-900 font-semibold shadow-md hover:scale-105 hover:bg-white transition transform"
  >
    Buscar mi curso
  </a>
</div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-20">
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
  )
}
