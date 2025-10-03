'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion'

type Item = { titulo: string; photo: string; alt: string }

const FERIA: Item[] = [
  { titulo: 'Experimentos',        photo: '/feriaE.jpg', alt: 'Niños haciendo experimentos' },
  { titulo: 'Robótica',            photo: '/feriaR.JPG', alt: 'Robots en exhibición' },
  { titulo: 'Música',              photo: '/feriaM.JPG', alt: 'Presentación musical' },
  { titulo: 'Arte & Ciencia',      photo: '/feriaA.JPG', alt: 'Exposición de arte científico' },
  { titulo: 'Stands',              photo: '/feriaS.JPG', alt: 'Puestos y stands' },
  { titulo: 'Charlas científicas', photo: '/feria6.jpg', alt: 'Charla de ciencia' },
  { titulo: 'Astronomía',          photo: '/feriaAs.png', alt: 'Observación de estrellas' },
  { titulo: 'Laboratorio',         photo: '/feriaL.JPG', alt: 'Prácticas de laboratorio' },
]

export default function FeriaCards() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])
  const [i, setI] = useState(0)
  const [showModal, setShowModal] = useState<null | 'colgados' | 'otra'>(null)

  const len = FERIA.length
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  // 🔹 Función para calcular posiciones relativas
  function delta(idx: number, current: number, total: number) {
    let d = idx - current
    const half = Math.floor(total / 2)
    if (d > half) d -= total
    if (d < -half) d += total
    return d
  }

  // 🔹 Layout dinámico
  const layout = useMemo(() => {
    return FERIA.map((_, idx) => {
      const d = delta(idx, i, len)
      if (isMobile) {
        if (d === 0) return { x: 0, z: 30, scale: 1, op: 1 }
        if (d === -1) return { x: -140, z: 20, scale: 0.9, op: 0.6 }
        if (d === 1) return { x: 140, z: 20, scale: 0.9, op: 0.6 }
        return { x: Math.sign(d) * 220, z: 10, scale: 0.8, op: 0.25 }
      } else {
        if (d === 0) return { x: 0, z: 30, scale: 1, op: 1 }
        if (d === -1) return { x: -220, z: 20, scale: 0.9, op: 0.65 }
        if (d === 1) return { x: 220, z: 20, scale: 0.9, op: 0.65 }
        return { x: Math.sign(d) * 340, z: 10, scale: 0.75, op: 0.25 }
      }
    })
  }, [i, len, isMobile])

  // 🔹 Animación GSAP fluida
  useEffect(() => {
    cardRefs.current.forEach((el, idx) => {
      if (!el) return
      const L = layout[idx]
      gsap.to(el, {
        x: L.x,
        zIndex: L.z,
        scale: L.scale,
        opacity: L.op,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    })
  }, [layout])

  // 🔹 Navegación
  const prev = () => setI(v => (v - 1 + len) % len)
  const next = () => setI(v => (v + 1) % len)

  // 🔹 Swipe para mobile
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    let startX = 0

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
    }
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX
      if (Math.abs(dx) > 50) {
        dx < 0 ? next() : prev()
      }
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchend', onEnd)

    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchend', onEnd)
    }
  }, [])

  return (
    <section className="relative bg-gradient-to-b from-green-50 via-white to-yellow-50 py-16 sm:py-20" id="recuerdos">
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

          {/* Carrusel */}
          {/* Carrusel */}
<div
  ref={stageRef}
  className="relative h-[340px] sm:h-[380px] flex justify-center overflow-hidden touch-pan-y"
>
  {FERIA.map((f, idx) => (
    <div
      key={`${f.titulo}-${idx}`}
      ref={el => { if (el) cardRefs.current[idx] = el }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                 w-[220px] sm:w-[240px] md:w-[260px] 
                 h-[280px] sm:h-[300px] md:h-[320px]
                 bg-white rounded-[14px] border border-gray-200 shadow-md
                 flex flex-col overflow-hidden cursor-pointer transition
                 will-change-transform will-change-opacity"
    >
      {/* Imagen */}
      <div className="relative w-full h-[75%]">
        <Image
          src={f.photo}
          alt={f.alt}
          fill
          quality={100}
          priority={idx === 0}
          sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 320px"
          className="object-cover rounded-t-[14px]"
        />
      </div>
      {/* Pie */}
      <div className="flex items-center justify-center h-[25%] border-t border-gray-200 bg-white">
        <h3 className="text-gray-800 font-semibold text-sm sm:text-base text-center px-2">
          {f.titulo}
        </h3>
      </div>
    </div>
  ))}

  {/* Flechas en PC */}
  <button
    onClick={prev}
    aria-label="Anterior"
    className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 z-20
               w-11 h-11 rounded-full bg-green-600 text-white text-2xl items-center justify-center
               shadow-lg hover:bg-green-700 transition"
  >
    ‹
  </button>
  <button
    onClick={next}
    aria-label="Siguiente"
    className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 z-20
               w-11 h-11 rounded-full bg-green-600 text-white text-2xl items-center justify-center
               shadow-lg hover:bg-green-700 transition"
  >
    ›
  </button>
</div>

        </div>

        {/* Shows en vivo */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-green-900 mb-6">🎶 Shows en vivo</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => setShowModal('colgados')}
              className="px-6 py-4 rounded-xl bg-yellow-200 hover:bg-yellow-300 text-green-900 font-bold shadow-md transition"
            >
              Banda Colgados – 21:30 hs
            </button>
            <button
              onClick={() => setShowModal('otra')}
              className="px-6 py-4 rounded-xl bg-green-200 hover:bg-green-300 text-green-900 font-bold shadow-md transition"
            >
              Otra banda – 22:30 hs
            </button>
          </div>
        </div>
      </div>

      {/* Modal Colgados */}
      {showModal === 'colgados' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setShowModal(null)}>
          <div className="bg-white max-w-2xl rounded-2xl p-6 shadow-lg relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowModal(null)} className="absolute top-3 right-3 text-lg">✕</button>
            <h4 className="text-2xl font-bold text-green-900">Colgados</h4>
            <p className="mt-2 text-gray-700">
              Colgados es una banda de rock de Tucumán formada en 2021, nacida del encuentro entre alumnos del músico y profesor Mauro Ros.
              Desde entonces, han recorrido escenarios en radios, colegios, eventos municipales y teatros.
              Cuentan con un álbum tributo a varios artistas y actualmente se encuentran desarrollando nuevos proyectos musicales.
            </p>
            <p className="mt-3 text-gray-800 font-medium">
              Integrantes: Juan Pablo Navarro, Santiago José Peverelli, Celeste Torán, Lisandro Maidana y Tomás José Frontini.
            </p>
            <p className="mt-4 font-bold text-yellow-700">Horario: 21:30 hs</p>
          </div>
        </motion.div>
      )}

      {/* Modal Otra banda */}
      {showModal === 'otra' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setShowModal(null)}>
          <div className="bg-white max-w-md rounded-2xl p-6 shadow-lg relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowModal(null)} className="absolute top-3 right-3 text-lg">✕</button>
            <h4 className="text-2xl font-bold text-green-900">Otra banda</h4>
            <p className="mt-2 text-gray-700">Próximamente más info sobre esta banda invitada.</p>
            <p className="mt-4 font-bold text-yellow-700">Horario: 22:30 hs</p>
          </div>
        </motion.div>
      )}
    </section>
  )
}
