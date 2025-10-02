'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { dataSecundaria } from './dataSecundaria'

type Categoria = 'primaria' | 'secundaria' | 'especiales'

interface Grupo {
  tema: string
  integrantes: string[]
  hora: string
  lugar: string
}

interface Division {
  id: string
  grupos: Grupo[]
}

const data: Record<Categoria, Record<string, Division[]>> = {
  primaria: {
    '1° Grado': [
      {
        id: 'General',
        grupos: [
          { tema: 'Nuestras raíces: Tradiciones de familias tucumanas', integrantes: [], hora: '19:30 a 21:00', lugar: 'Aulas de 1° Grado A y B · Mesón 1' },
        ],
      },
    ],
    '2° Grado': [
      {
        id: 'General',
        grupos: [
          { tema: 'Tucumán para saborear y celebrar – Turismo cultural y gastronomía tradicional', integrantes: [], hora: '19:30 a 21:00', lugar: 'Aula de 2° Grado A · Mesón 2' },
        ],
      },
    ],
    '3° Grado': [
      {
        id: 'General',
        grupos: [
          { tema: 'Arte y expresiones culturales de Tucumán', integrantes: [], hora: '19:30 a 21:00', lugar: 'Aula de 3° Grado B · Mesón 1' },
        ],
      },
    ],
    '4° Grado': [
      {
        id: 'General',
        grupos: [
          { tema: 'Próceres tucumanos, héroes de la historia', integrantes: [], hora: '19:30 a 21:00', lugar: 'Aulas de 4° Grado A y B · Mesón 1' },
        ],
      },
    ],
    '5° Grado': [
      {
        id: 'General',
        grupos: [
          { tema: 'Explorando los orígenes: De los astros a la dulzura de la caña', integrantes: [], hora: '19:30 a 21:00', lugar: 'Entrada del colegio · Mesones 3' },
        ],
      },
    ],
    '6° Grado': [
      {
        id: 'General',
        grupos: [
          { tema: 'El maíz – súper alimento, da vida y cultura', integrantes: [], hora: '19:30 a 21:00', lugar: 'Aulas de 6° Grado A y B · Mesones 2' },
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
          { tema: 'Un reino de sapos y misterios', integrantes: [], hora: '19:30 a 21:00', lugar: 'Comedor · Mesones 6' },
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

export default function Cursos() {
  const [categoria, setCategoria] = useState<Categoria>('primaria')
  const [query, setQuery] = useState('')
  const [cursoActivo, setCursoActivo] = useState<string | null>(null)
  const [divisionActiva, setDivisionActiva] = useState<Division | null>(null)
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

  /* --------- A11y: cerrar modal --------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDivisionActiva(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (divisionActiva && modalRef.current) modalRef.current.focus()
  }, [divisionActiva])

  const cursosDeCategoria = useMemo(() => Object.keys(data[categoria]), [categoria])
  const cursosFiltrados = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return cursosDeCategoria
    return cursosDeCategoria.filter((c) => c.toLowerCase().includes(q))
  }, [cursosDeCategoria, query])

  const divisiones = cursoActivo ? data[categoria][cursoActivo] : []

  const catLabel = (c: Categoria) => c.charAt(0).toUpperCase() + c.slice(1)
  const catCount = (c: Categoria) => Object.values(data[c]).reduce((acc, divs) => acc + divs.length, 0)
  // Bloquear/desbloquear scroll del fondo al abrir/cerrar el modal
useEffect(() => {
  const html = document.documentElement
  const prevHtmlOverflow = html.style.overflow
  const prevBodyOverflow = document.body.style.overflow

  if (divisionActiva) {
    html.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
  } else {
    html.style.overflow = prevHtmlOverflow
    document.body.style.overflow = prevBodyOverflow
  }

  return () => {
    html.style.overflow = prevHtmlOverflow
    document.body.style.overflow = prevBodyOverflow
  }
}, [divisionActiva])


  return (
    <section id="buscar" className="relative py-20 bg-gradient-to-br from-green-50 to-yellow-50 overflow-hidden">
      {/* Fondo decorativo */}
      <div ref={bgRef} className="pointer-events-none absolute inset-0 -z-10 opacity-10">
        <div className="mol absolute -top-6 left-6 text-7xl">⚛️</div>
        <div className="mol absolute top-1/3 right-10 text-6xl">🧪</div>
        <div className="mol absolute bottom-6 left-1/2 -translate-x-1/2 text-6xl">📐</div>
      </div>

      <div className="container mx-auto px-4">
        {/* Encabezado */}
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
        <div role="tablist" aria-label="Categorías" className="flex flex-wrap items-center gap-2 mb-6">
          {(['primaria', 'secundaria', 'especiales'] as Categoria[]).map((cat) => {
            const active = categoria === cat
            return (
              <button key={cat} role="tab" aria-selected={active} onClick={() => { setCategoria(cat); setCursoActivo(null); setQuery('') }}
                className={`px-4 py-2 rounded-full font-medium transition-all border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
                ${active ? 'bg-green-700 text-white border-green-700 focus:ring-green-700'
                          : 'bg-white text-green-800 border-green-200 hover:bg-green-50 focus:ring-green-500'}`}>
                {catLabel(cat)} <span className={`ml-2 text-xs ${active ? 'text-white/90' : 'text-green-600/70'}`}>({catCount(cat)})</span>
              </button>
            )
          })}
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <label htmlFor="search" className="sr-only">Buscar curso</label>
          <div className="relative max-w-xl">
            <input id="search" type="search" placeholder="Buscar curso (ej: 3° Grado, 5° Año)…"
              value={query} onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-green-200 bg-white/90 px-4 py-2.5 pr-10 text-green-900 placeholder:text-green-900/50 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500" />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-700/70">⌕</span>
          </div>
        </div>

        {/* Grid de cursos */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cursosFiltrados.map((curso) => {
            const active = cursoActivo === curso
            const divisiones = data[categoria][curso]

            const handleClick = () => {
              if (categoria === 'primaria' || categoria === 'especiales') {
                // 🔥 abre modal directo
                const unicaDivision = divisiones[0]
                if (unicaDivision) setDivisionActiva(unicaDivision)
              } else {
                // secundaria -> mantiene divisiones
                setCursoActivo(curso)
              }
            }

            return (
              <button key={curso} onClick={handleClick}
                className={`group relative w-full rounded-xl px-4 py-4 text-left font-semibold shadow-sm transition
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${active ? 'bg-yellow-300 text-green-900 shadow-md focus:ring-yellow-400'
                         : 'bg-white text-green-800 hover:bg-yellow-50 border border-green-100 focus:ring-green-500'}`}>
                <span>{curso}</span>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-700/60 group-hover:translate-x-0.5 transition">›</span>
              </button>
            )
          })}
        </motion.div>

        {/* Divisiones solo en secundaria */}
        {cursoActivo && categoria === 'secundaria' && (
          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-green-900">{cursoActivo} · Divisiones</h3>
              <div className="text-sm text-green-800/70">Total: {divisiones.length}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {divisiones.map((div, i) => (
                <motion.button key={div.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  onClick={() => setDivisionActiva(div)}
                  className="group text-left w-full rounded-xl border border-green-200 bg-white p-6 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                  <div className="flex items-center gap-3">
                    <span className="grid place-items-center rounded-lg bg-green-600/10 text-green-700 p-2">
                      <Beaker className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="text-base font-semibold text-green-900">División {div.id}</div>
                      <div className="text-sm text-green-800/70">
                        {div.grupos.length > 0 ? `${div.grupos.length} grupo${div.grupos.length > 1 ? 's' : ''}`
                                               : `Grupos asignados a ${div.id}`}
                      </div>
                    </div>
                    <span className="ml-auto text-green-700/60 group-hover:translate-x-0.5 transition">›</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {divisionActiva && (
  // Clic en el backdrop cierra el modal
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    onClick={() => setDivisionActiva(null)}
  >
    <motion.div
      ref={modalRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
      // Evita que el clic dentro del modal cierre por propagación
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-green-100 bg-green-50 px-4 py-3">
        <h4 className="text-lg font-bold text-green-900">
          División {divisionActiva.id}
        </h4>
        <button
          onClick={() => setDivisionActiva(null)}
          className="rounded-full p-1 text-green-800/70 hover:bg-green-100 hover:text-green-900"
          aria-label="Cerrar modal"
        >
          ×
        </button>
      </div>

      {/* Contenido con scroll interno */}
      <div className="max-h-[70vh] overflow-y-auto overscroll-contain p-4 space-y-4">
        {divisionActiva.grupos.map((g, i) => (
          <motion.div
            key={`${g.tema}-${i}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
            className="rounded-lg border border-green-100 bg-green-50/60 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              {/* Texto a la izquierda */}
              <div className="flex-1 min-w-0">
                <h5 className="font-semibold text-green-900 break-words">{g.tema}</h5>
                {g.integrantes.length > 0 && (
                  <p className="mt-1 text-sm text-green-900/80 truncate">
                    Integrantes: {g.integrantes.join(', ')}
                  </p>
                )}
              </div>

              {/* Hora a la derecha (no se corta) */}
              <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 rounded-full bg-green-600/10 px-2 py-1 text-xs font-medium text-green-800">
                🕒 {g.hora}
              </span>
            </div>

            {/* Lugar debajo */}
            <p className="mt-2 text-sm font-medium text-green-900/90">📍 {g.lugar}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 border-t border-green-100 bg-white px-4 py-3">
        <button
          onClick={() => setDivisionActiva(null)}
          className="rounded-lg border border-green-200 bg-white px-3 py-2 text-green-800 hover:bg-green-50"
        >
          Cerrar
        </button>
      </div>
    </motion.div>
  </div>
)}

    </section>
  )
}
