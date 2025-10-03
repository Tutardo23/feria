'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { dataSecundaria } from './dataSecundaria'
import Image from 'next/image'

type Categoria = 'primaria' | 'secundaria' | 'especiales'

export interface Grupo {
  tema: string
  integrantes: string[]
  hora: string
  lugar: string
}

export interface Division {
  id: string
  grupos: Grupo[]
}

const data: Record<Categoria, Record<string, Division[]>> = {
  primaria: {
    '1° Grado': [
      {
        id: 'A',
        grupos: [
          { tema: 'Nuestras raíces: Tradiciones de familias tucumanas', integrantes: [], hora: '19:00 a 20:00', lugar: 'Aulas de 1° Grado A y B' },
        ],
      },
      {
        id: 'B',
        grupos: [
          { tema: 'Nuestras raíces: Tradiciones de familias tucumanas', integrantes: [], hora: '20:00 a 21:00', lugar: 'Aulas de 1° Grado A y B' },
        ],
      },
    ],
    '2° Grado': [
      {
        id: 'A',
        grupos: [
          { tema: 'Tucumán para saborear y celebrar – Turismo cultural y gastronomía tradicional', integrantes: [], hora: '19:00 a 20:00', lugar: 'Aula de 2° Grado A' },
        ],
      },
      {
        id: 'B',
        grupos: [
          { tema: 'Tucumán para saborear y celebrar – Turismo cultural y gastronomía tradicional', integrantes: [], hora: '20:00 a 21:00', lugar: 'Aula de 2° Grado A' },
        ],
      },
    ],
    '3° Grado': [
      {
        id: 'A',
        grupos: [
          { tema: 'Arte y expresiones culturales de Tucumán', integrantes: [], hora: '19:00 a 20:00', lugar: 'Aula de 3° Grado B' },
        ],
      },
      {
        id: 'B',
        grupos: [
          { tema: 'Arte y expresiones culturales de Tucumán', integrantes: [], hora: '20:00 a 21:00', lugar: 'Aula de 3° Grado B' },
        ],
      },
    ],
    '4° Grado': [
      {
        id: 'A',
        grupos: [
          { tema: 'Próceres tucumanos, héroes de la historia', integrantes: [], hora: '19:00 a 20:00', lugar: 'Aulas de 4° Grado A y B' },
        ],
      },
      {
        id: 'B',
        grupos: [
          { tema: 'Próceres tucumanos, héroes de la historia', integrantes: [], hora: '20:00 a 21:00', lugar: 'Aulas de 4° Grado A y B' },
        ],
      },
    ],
    '5° Grado': [
      {
        id: 'A',
        grupos: [
          { tema: 'Explorando los orígenes: De los astros a la dulzura de la caña', integrantes: [], hora: '19:00 a 20:00', lugar: 'Entrada del colegio' },
        ],
      },
      {
        id: 'B',
        grupos: [
          { tema: 'Explorando los orígenes: De los astros a la dulzura de la caña', integrantes: [], hora: '20:00 a 21:00', lugar: 'Entrada del colegio' },
        ],
      },
    ],
    '6° Grado': [
      {
        id: 'A',
        grupos: [
          { tema: 'El maíz – súper alimento, da vida y cultura', integrantes: [], hora: '19:00 a 20:00', lugar: 'Aulas de 6° Grado A y B' },
        ],
      },
      {
        id: 'B',
        grupos: [
          { tema: 'El maíz – súper alimento, da vida y cultura', integrantes: [], hora: '20:00 a 21:00', lugar: 'Aulas de 6° Grado A y B' },
        ],
      },
    ],
  },
  especiales: {
    Arte: [
      {
        id: 'General',
        grupos: [
          { tema: 'Tucumán cultura y color', integrantes: [], hora: '19:30 a 21:00', lugar: 'Aula de 3° Grado A' },
        ],
      },
    ],
    Robótica: [
      {
        id: 'General',
        grupos: [
          { tema: 'Museo Tecnológico Pucará', integrantes: [], hora: '19:30 a 21:00', lugar: 'Aula de 2° Grado B' },
        ],
      },
    ],
    'Sala de 5': [
      {
        id: 'General',
        grupos: [
          { tema: 'Un reino de sapos y misterios', integrantes: [], hora: '19:30 a 21:00', lugar: 'Comedor' },
        ],
      },
    ],
  },
  secundaria: dataSecundaria,
}

/* --------- Ícono --------- */
const Beaker = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M9 2h6v2h-1v4.586l4.707 4.707A1 1 0 0 1 18.293 15H5.707a1 1 0 0 1-.707-1.707L9 8.586V4H8V2h1zM7.414 13h9.172L13 9.414V4h-2v5.414L7.414 13z"></path>
    <path d="M5 17a2 2 0 0 0 2 2h10a2 2 0 1 0 0-4H7a2 2 0 0 0-2 2z"></path>
  </svg>
)

/* --------- Colores por área --------- */
const getColorClasses = (lugar: string) => {
  if (lugar.includes('Ciencias Sociales')) return 'border-blue-200 bg-blue-50'
  if (lugar.includes('Ciencias Naturales')) return 'border-green-200 bg-green-50'
  if (lugar.includes('Ciencias Exactas')) return 'border-purple-200 bg-purple-50'
  if (lugar.includes('Literatura') || lugar.includes('Arte') || lugar.includes('Religión')) return 'border-pink-200 bg-pink-50'
  if (lugar.includes('Inglés')) return 'border-yellow-200 bg-yellow-50'
  return 'border-gray-200 bg-gray-50'
}

export default function Cursos() {
  const [categoria, setCategoria] = useState<Categoria>('primaria')
  const [query, setQuery] = useState('')
  const [cursoActivo, setCursoActivo] = useState<string | null>(null)
  const [divisionActiva, setDivisionActiva] = useState<Division | null>(null)

  const [poemaOpen, setPoemaOpen] = useState(false)
  const poemaRef = useRef<HTMLDivElement>(null)
  const versosRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const modalRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  /* --------- Animación de moléculas --------- */
  useEffect(() => {
    if (!bgRef.current) return
    const nodes = Array.from(bgRef.current.querySelectorAll('.mol')) as HTMLElement[]
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(nodes, {
      x: (i) => (i % 2 === 0 ? 16 : -18),
      y: (i) => (i % 3 === 0 ? -14 : 12),
      rotate: (i) => (i % 2 === 0 ? 8 : -6),
      opacity: 0.18,
      duration: 6,
      ease: 'sine.inOut',
      stagger: 0.4,
    })
    return () => { tl.kill() }
  }, [])

  /* --------- Esc + bloqueo scroll --------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setCursoActivo(null); setDivisionActiva(null); setPoemaOpen(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* --------- Animación GSAP para poema --------- */
  useEffect(() => {
    if (!poemaOpen || !poemaRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 40, skewY: 6, filter: "blur(6px)" },
        { opacity: 1, y: 0, skewY: 0, filter: "blur(0px)", duration: 0.8 }
      )
      const spans = versosRef.current?.querySelectorAll("span") || []
      tl.fromTo(spans,
        { opacity: 0, y: 20, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.1, duration: 0.5 },
        "-=0.4"
      )
    }, poemaRef)
    return () => ctx.revert()
  }, [poemaOpen])

  const cursosDeCategoria = useMemo(() => Object.keys(data[categoria]), [categoria])
  const cursosFiltrados = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return cursosDeCategoria
    return cursosDeCategoria.filter((c) => c.toLowerCase().includes(q))
  }, [cursosDeCategoria, query])

  const divisiones = cursoActivo ? data[categoria][cursoActivo] : []
const [mapaOpen, setMapaOpen] = useState(false)
  return (
    <section id="buscar" className="relative py-20 bg-gradient-to-br from-green-50 to-yellow-50 overflow-hidden">
      {/* Fondo decorativo */}
      <div ref={bgRef} className="pointer-events-none absolute inset-0 -z-10 opacity-10">
        <div className="mol absolute -top-6 left-6 text-7xl">⚛️</div>
        <div className="mol absolute top-1/3 right-10 text-6xl">🧪</div>
        <div className="mol absolute bottom-6 left-1/2 -translate-x-1/2 text-6xl">📐</div>
      </div>

      <div className="container mx-auto px-4">
        {/* Encabezado con chip */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 text-green-800 px-3 py-1 text-xs font-semibold">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
            Noche de las ciencias
          </div>
          <div className="mt-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900">Cursos y grupos</h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut' }} className="h-1 w-24 origin-left rounded-full bg-yellow-400 mt-2" />
            <p className="mt-3 max-w-2xl text-green-800/80">
              Elegí el nivel, buscá tu curso y consultá las divisiones con sus grupos,
              horarios y lugares de presentación.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {(['primaria', 'secundaria', 'especiales'] as Categoria[]).map((cat) => {
            const active = categoria === cat
            return (
              <button
                key={cat}
                onClick={() => { setCategoria(cat); setCursoActivo(null); setDivisionActiva(null); setQuery('') }}
                className={`px-4 py-2 rounded-full font-medium transition-all border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
                ${active ? 'bg-green-700 text-white border-green-700 focus:ring-green-700'
                         : 'bg-white text-green-800 border-green-200 hover:bg-green-50 focus:ring-green-500'}`}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            )
          })}
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative max-w-xl">
            <input
              type="search"
              placeholder="Buscar curso (ej: 3° Grado, 5° Año)…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-green-200 bg-white/90 px-4 py-2.5 pr-10 text-green-900 shadow-sm"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-700/70">⌕</span>
          </div>
        </div>

        {/* Botón del poema solo en Primaria */}
        {categoria === "primaria" && (
  <div className="mb-6 flex justify-start">
    <button
      onClick={() => setPoemaOpen(true)}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-100 hover:bg-green-200 text-green-800 text-xs font-medium shadow-sm transition"
    >
      <span className="text-lg">⛰️</span>
      <span>Poema</span>
    </button>
  </div>
)}


        {/* Grid de cursos */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cursosFiltrados.map((curso) => (
            <button
              key={curso}
              onClick={() => { setCursoActivo(curso); setDivisionActiva(null) }}
              className="group relative w-full rounded-xl px-4 py-4 text-left font-semibold shadow-sm transition
                bg-white text-green-800 hover:bg-yellow-50 border border-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span>{curso}</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-700/60 group-hover:translate-x-0.5 transition">›</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Modal Poema */}
      {poemaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setPoemaOpen(false)}>
          <motion.div
            ref={poemaRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl rounded-2xl bg-white shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-green-100 bg-green-50 px-4 py-3">
              <h4 ref={titleRef} className="text-lg font-bold text-green-900">
                🌄 Tucumán, identidad y ciencia
              </h4>
              <button onClick={() => setPoemaOpen(false)} className="text-green-800/70 hover:bg-green-100 rounded-full p-1">×</button>
            </div>
            <div className="p-6 text-center">
              <p ref={versosRef} className="whitespace-pre-line italic text-green-900 leading-relaxed">
                {`En Tucumán la historia florece,
sus raíces nos dan identidad,
la cultura ilumina caminos,
la ciencia abre puertas a la verdad.

Los niños del Colegio Pucará
son semillas que miran al cielo,
con saberes que crecen y vuelan,
con futuro en cada anhelo.

Porque la tradición nos sostiene,
y la ciencia nos invita a soñar,
es en esta tierra tucumana
donde el mañana empieza a brillar.`.split("\n").map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal Cursos */}
      {cursoActivo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => { setCursoActivo(null); setDivisionActiva(null) }}>
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-green-100 bg-green-50 px-4 py-3">
              <h4 className="text-lg font-bold text-green-900">{cursoActivo}</h4>
              <button onClick={() => { setCursoActivo(null); setDivisionActiva(null) }} className="rounded-full p-1 text-green-800/70 hover:bg-green-100">×</button>
            </div>

            {divisiones.length > 1 && !divisionActiva && (
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {divisiones.map((div, i) => (
                  <motion.button
                    key={div.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    onClick={() => setDivisionActiva(div)}
                    className="group text-left w-full rounded-xl border border-green-200 bg-white p-6 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid place-items-center rounded-lg bg-green-600/10 text-green-700 p-2">
                        <Beaker className="w-5 h-5" />
                      </span>
                      <div>
                        <div className="text-base font-semibold text-green-900">División {div.id}</div>
                        <div className="text-sm text-green-800/70">{div.grupos.length} grupos</div>
                      </div>
                      <span className="ml-auto text-green-700/60 group-hover:translate-x-0.5 transition">›</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {(divisiones.length === 1 || divisionActiva) && (
              <div className="max-h-[70vh] overflow-y-auto overscroll-contain p-4 space-y-4">
                {(divisionActiva ? divisionActiva.grupos : divisiones[0].grupos).map((g, i) => (
                  <motion.div
                    key={`${g.tema}-${i}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    className={`rounded-lg border p-4 ${getColorClasses(g.lugar)}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold break-words">{g.tema}</h5>
                        {g.integrantes.length > 0 && (
                          <p className="mt-1 text-sm truncate">Integrantes: {g.integrantes.join(', ')}</p>
                        )}
                      </div>
                      <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 rounded-full bg-black/10 px-2 py-1 text-xs font-medium">
                        🕒 {g.hora}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium font-mono">📍 {g.lugar}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
     {/* 🔹 Mapa del evento */}
      <div className="mt-16">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-green-900 text-center">
          🗺️ Mapa de la Feria
        </h3>
        <p className="mt-2 text-center text-green-800/80">
          Ubicaciones de los stands, cursos y espacios
        </p>

        {/* Imagen que abre modal */}
        <div
          onClick={() => setMapaOpen(true)}
          className="mt-6 max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg border border-green-200 cursor-pointer hover:scale-[1.02] transition"
        >
          <Image
            src="/mapa.png"
            alt="Mapa completo de la feria"
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* 🔹 Modal con zoom */}
      {mapaOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setMapaOpen(false)}
        >
          <div className="relative w-full max-w-6xl h-[85vh]">
            <Image
              src="/mapa.png"
              alt="Mapa Feria ampliado"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Botón cerrar */}
          <button
            onClick={() => setMapaOpen(false)}
            className="absolute top-5 right-5 bg-white/90 text-black px-3 py-1.5 rounded-full shadow hover:bg-white"
          >
            ✕
          </button>
        </motion.div>
      )}
    </section>
  )
}
 
