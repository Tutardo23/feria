'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion'

type Item = { titulo: string; photo: string; alt: string }

const FERIA: Item[] = [
  { titulo: 'Experimentos',        photo: '/feria1.jpg', alt: 'Niños haciendo experimentos' },
  { titulo: 'Robótica',            photo: '/feria2.jpg', alt: 'Robots en exhibición' },
  { titulo: 'Música',              photo: '/feria3.jpg', alt: 'Presentación musical' },
  { titulo: 'Arte & Ciencia',      photo: '/feria4.jpg', alt: 'Exposición de arte científico' },
  { titulo: 'Stands',              photo: '/feria5.jpg', alt: 'Puestos y stands' },
  { titulo: 'Charlas científicas', photo: '/feria6.jpg', alt: 'Charla de ciencia' },
  { titulo: 'Astronomía',          photo: '/feria7.jpg', alt: 'Observación de estrellas' },
  { titulo: 'Laboratorio',         photo: '/feria8.jpg', alt: 'Prácticas de laboratorio' },
]

// 👉 Normaliza la diferencia para carrusel circular
function delta(idx: number, current: number, total: number) {
  let d = idx - current
  const half = Math.floor(total / 2)
  if (d > half) d -= total
  if (d < -half) d += total
  return d
}

export default function FeriaCards() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])
  const [i, setI] = useState(0)

  const len = FERIA.length
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  // --- Layout dinámico corregido + optimizado ---
  const layout = useMemo(() => {
    return FERIA.map((_, idx) => {
      const d = delta(idx, i, len)
      if (isMobile) {
        if (d === 0)  return { x: 0, z: 30, scale: 1.0, op: 1 }
        if (d === -1) return { x: -140, z: 20, scale: 0.9, op: 0.6 }
        if (d === 1)  return { x: 140,  z: 20, scale: 0.9, op: 0.6 }
        return { x: Math.sign(d) * 220, z: 10, scale: 0.8, op: 0.25 }
      } else {
        if (d === 0)  return { x: 0,    z: 30, scale: 1.0, op: 1 }
        if (d === -1) return { x: -220, z: 20, scale: 0.9, op: 0.65 }
        if (d === 1)  return { x:  220, z: 20, scale: 0.9, op: 0.65 }
        return { x: Math.sign(d) * 340, z: 10, scale: 0.75, op: 0.25 }
      }
    })
  }, [i, len, isMobile])

  useEffect(() => {
    cardRefs.current.forEach((el, idx) => {
      if (!el) return
      const L = layout[idx]
      gsap.to(el, {
        x: L.x,
        zIndex: L.z,
        scale: L.scale,
        opacity: L.op,
        duration: 0.45,
        ease: 'power3.out',
      })
    })
  }, [layout])

  // --- Navegación ---
  const prev = () => setI(v => (v - 1 + len) % len)
  const next = () => setI(v => (v + 1) % len)

  // --- Swipe mobile (simplificado) ---
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    let startX = 0
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX }
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX
      if (Math.abs(dx) > 50) (dx < 0 ? next() : prev())
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchend', onEnd)
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchend', onEnd)
    }
  }, [])

  return (
    <section className="relative bg-gradient-to-b from-green-50 via-white to-yellow-50 py-16 sm:py-20">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          {/* Texto */}
          <header className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 text-yellow-800 px-3 py-1 text-xs font-semibold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-600 animate-pulse" />
              Feria de ciencias
            </div>

            <div className="mt-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900">
                Recuerdos que inspiran
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-1 w-24 origin-left rounded-full bg-green-400 mt-2"
              />
              <p className="mt-3 max-w-2xl text-green-800/80 italic">
                Experiencias pasadas que inspiran el futuro
              </p>
            </div>
          </header>

          {/* Carrusel polaroid */}
          <div
            ref={stageRef}
            className="relative h-[340px] sm:h-[380px] flex justify-center overflow-hidden"
          >
            {FERIA.map((f, idx) => (
              <div
                key={`${f.titulo}-${idx}`}
                ref={el => { if (el) cardRefs.current[idx] = el }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                           w-[220px] h-[300px] sm:w-[240px] sm:h-[320px]
                           bg-white rounded-[14px] border border-gray-200 shadow-md
                           flex flex-col overflow-hidden cursor-pointer"
              >
                {/* Imagen */}
                <div className="h-[75%] w-full">
                  <Image
                    src={f.photo}
                    alt={f.alt}
                    width={240}
                    height={180}
                    priority={idx === 0}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Pie polaroid */}
                <div className="h-[25%] flex items-center justify-center border-t border-gray-200">
                  <h3 className="text-gray-800 font-semibold text-sm sm:text-base">{f.titulo}</h3>
                </div>
              </div>
            ))}

            {/* Flechas */}
            <button
              onClick={prev}
              aria-label="Anterior"
              className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-20
                         w-11 h-11 rounded-full bg-green-600 text-white text-2xl items-center justify-center
                         shadow-lg hover:bg-green-700 transition"
            >‹</button>
            <button
              onClick={next}
              aria-label="Siguiente"
              className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-20
                         w-11 h-11 rounded-full bg-green-600 text-white text-2xl items-center justify-center
                         shadow-lg hover:bg-green-700 transition"
            >›</button>
          </div>
        </div>
      </div>
    </section>
  )
}
