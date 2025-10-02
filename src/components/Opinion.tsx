'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

const fotos = [
  '/feria1.jpg',
  '/feria2.jpg',
  '/feria3.jpg',
  '/feria4.jpg',
  '/feria5.jpg',
  '/feria6.jpg',
  '/feria7.jpg',
  '/feria8.jpg',
  '/feria9.jpg',
  '/feria10.jpg',
]

function posByIndex(i: number) {
  const rings = [
    { r: 26, count: 4 },
    { r: 36, count: 6 },
    { r: 46, count: 8 },
  ]
  let idx = i
  for (const ring of rings) {
    if (idx < ring.count) {
      const angle = (idx / ring.count) * Math.PI * 2
      return {
        top: 50 + ring.r * Math.sin(angle),
        left: 50 + ring.r * Math.cos(angle),
      }
    }
    idx -= ring.count
  }
  const angle = (i * 57.3) % 360
  const r = 55
  return {
    top: 50 + r * Math.sin((angle * Math.PI) / 180),
    left: 50 + r * Math.cos((angle * Math.PI) / 180),
  }
}

export default function Despedida() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.narrative-core',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.tile',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out' }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-[90vh] bg-gradient-to-b from-green-50 via-white to-green-50 overflow-hidden flex flex-col items-center justify-center"
      >
        {/* Fondo decorativo */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-green-200/40 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-yellow-200/40 blur-3xl" />
        </div>

        <div className="relative w-full max-w-7xl px-6 py-16 flex flex-col items-center">
          {/* Mobile: carrusel horizontal */}
          <div className="flex md:hidden w-full overflow-x-auto gap-4 pb-4">
            {fotos.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`Recuerdo ${i + 1}`}
                width={200}
                height={120}
                className="rounded-lg shadow-md object-cover w-48 h-32 flex-shrink-0"
              />
            ))}
          </div>

          {/* Desktop: fotos flotando */}
          <div className="hidden md:block pointer-events-none absolute inset-0">
            {fotos.map((src, i) => {
              const { top, left } = posByIndex(i)
              return (
                <div
                  key={i}
                  className="tile absolute"
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Image
                    src={src}
                    alt={`Recuerdo ${i + 1}`}
                    width={220}
                    height={150}
                    className="rounded-lg shadow-md opacity-80 hover:opacity-100 transition object-cover w-40 h-28"
                  />
                </div>
              )
            })}
          </div>

          {/* Bloque central */}
          <div className="relative z-10 flex justify-center mt-6 md:mt-0">
            <div className="narrative-core w-full max-w-3xl rounded-2xl border border-green-100 bg-white/90 p-8 backdrop-blur-sm shadow-md text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 text-green-800 px-3 py-1 text-xs font-semibold">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                Noche de las Ciencias
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-green-900">
                Gracias por ser parte
              </h2>

              <p className="mt-4 text-base text-green-800/80">
                Lo que hicimos juntos importa. Si querés, contanos tu experiencia para mejorar la próxima edición.
              </p>

              <div className="mt-7">
                <a
                  href="https://apdespolotucuman.questionpro.com/t/APYXJZ7MVc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-[#F5C242] px-7 py-3 font-semibold text-[#0C2D57] shadow-lg transition hover:bg-yellow-400"
                >
                  Dejar mi opinión
                </a>
              </div>

              <p className="mt-4 text-xs text-green-900/70">
                El formulario se abre en una nueva pestaña.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#14532d] text-white">
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
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

          <div className="flex flex-col md:flex-row justify-center gap-4 font-medium">
            <a href="#inicio" className="hover:text-yellow-400 transition">Inicio</a>
            <a href="#destacados" className="hover:text-yellow-400 transition">Eventos</a>
            <a href="#buscar" className="hover:text-yellow-400 transition">Cursos</a>
            <a href="#contacto" className="hover:text-yellow-400 transition">Contacto</a>
          </div>

          <div className="flex flex-col items-center md:items-end text-sm text-white/80">
            <p>© {new Date().getFullYear()} Colegio Pucará</p>
            <p className="mt-1">Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </>
  )
}
