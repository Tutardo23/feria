'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

export default function Despedida() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.despedida-title',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }
        )
        gsap.fromTo(
          '.despedida-text',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
        )
        gsap.fromTo(
          '.despedida-btn',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' }
        )
        gsap.to('.glow', {
          boxShadow: '0 0 20px rgba(245,194,66,0.8)',
          repeat: -1,
          yoyo: true,
          duration: 1.5,
        })
      }, sectionRef)
      return () => ctx.revert()
    }
  }, [])

  return (
    <>
      {/* Sección de despedida */}
      <section
        ref={sectionRef}
        className="relative bg-gradient-to-b from-green-50 via-white to-green-50 text-center py-24 overflow-hidden"
      >
        {/* Onda superior */}
        <div className="absolute top-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="w-full h-20"
          >
            <path
              fill="#ffffff"
              d="M0,64L80,69.3C160,75,320,85,480,85.3C640,85,800,75,960,58.7C1120,43,1280,21,1360,10.7L1440,0L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            />
          </svg>
        </div>

        {/* Contenido */}
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="despedida-title text-4xl font-extrabold text-green-900">
            ¡Gracias por acompañarnos!
          </h2>
          <p className="despedida-text mt-4 text-lg text-green-800/80">
            Queremos saber tu opinión sobre la{' '}
            <span className="font-semibold text-green-900">Noche de las Ciencias</span>.  
            Tus comentarios nos ayudan a mejorar y seguir creciendo juntos.
          </p>

          <div className="mt-8">
            <button className="despedida-btn glow px-8 py-3 rounded-lg font-semibold bg-[#F5C242] text-[#0C2D57] hover:bg-yellow-400 transition">
              Dejar mi opinión
            </button>
          </div>
        </div>

        {/* Onda inferior */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="w-full h-20"
          >
            <path
              fill="#ffffff"
              d="M0,32L80,48C160,64,320,96,480,96C640,96,800,64,960,58.7C1120,53,1280,75,1360,85.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            />
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#14532d] text-white mt-0">
  <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
    {/* Logo y nombre */}
    <div className="flex flex-col items-center md:items-start">
      <Image
        src="/logo-colegio.png"
        alt="Colegio Pucará"
        width={60}
        height={60}
        className="mb-3"
      />
      <p className="font-semibold text-lg">Colegio Pucará</p>
      <p className="text-sm text-white/80">Feria de Ciencias 2025</p>
    </div>

    {/* Links de navegación */}
    <div className="flex flex-col md:flex-row justify-center gap-4 font-medium">
      <a href="#inicio" className="hover:text-yellow-400 transition">Inicio</a>
      <a href="#destacados" className="hover:text-yellow-400 transition">Eventos</a>
      <a href="#buscar" className="hover:text-yellow-400 transition">Cursos</a>
      <a href="#contacto" className="hover:text-yellow-400 transition">Contacto</a>
    </div>

    {/* Créditos */}
    <div className="flex flex-col items-center md:items-end text-sm text-white/80">
      <p>© {new Date().getFullYear()} Colegio Pucará</p>
      <p className="mt-1">Todos los derechos reservados</p>
    </div>
  </div>
</footer>

    </>
  )
}
