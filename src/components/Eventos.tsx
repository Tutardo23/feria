'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useSwipeable } from 'react-swipeable'

const eventos = [
  { id: 1, titulo: 'Obra de teatro científico', subtitulo: 'Actuación con experimentos en vivo', hora: '10:00 hs', lugar: 'Aula Magna', img: '/evento1.jpg' },
  { id: 2, titulo: 'Concurso de ciencia', subtitulo: 'Competencia entre los mejores proyectos', hora: '11:30 hs', lugar: 'SUM', img: '/evento2.jpg' },
  { id: 3, titulo: 'Coro escolar', subtitulo: 'Presentación musical con enfoque científico', hora: '12:00 hs', lugar: 'Patio', img: '/evento3.jpg' },
  { id: 4, titulo: 'Laboratorio abierto', subtitulo: 'Experimentos guiados por alumnos', hora: '13:30 hs', lugar: 'Laboratorio', img: '/evento4.jpg' },
]

export default function Eventos() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const next = () => {
    setDirection('next')
    setIndex((prev) => (prev + 1) % eventos.length)
  }
  const prev = () => {
    setDirection('prev')
    setIndex((prev) => (prev - 1 + eventos.length) % eventos.length)
  }

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    trackMouse: true, // también con mouse arrastrando
  })

  // efecto escribir para el título principal
  useEffect(() => {
    if (titleRef.current) {
      const el = titleRef.current
      const text = el.dataset.text || ''
      el.innerHTML = ''
      let i = 0
      const cursor = document.createElement('span')
      cursor.textContent = '|'
      cursor.className = 'animate-pulse ml-1 text-green-700'
      el.appendChild(cursor)

      const interval = setInterval(() => {
        if (i < text.length) {
          cursor.before(text.charAt(i))
          i++
        } else {
          clearInterval(interval)
        }
      }, 70)
      return () => clearInterval(interval)
    }
  }, [])

  // animación de slide en las cards
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          x: direction === 'next' ? 200 : -200,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
        }
      )
    }
  }, [index, direction])

  const evento = eventos[index]

  return (
    <section
      id="destacados"
      className="relative py-24 bg-gradient-to-b from-green-50 via-white to-green-50 overflow-hidden"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        {/* Columna izquierda: título */}
        <div className="lg:col-span-1 text-left">
          <span className="text-sm font-semibold tracking-wider text-green-700 uppercase">
            Feria de Ciencias
          </span>
          <h2
            ref={titleRef}
            data-text="Eventos destacados"
            className="mt-2 text-3xl sm:text-4xl font-extrabold text-green-900"
          ></h2>
          <p className="mt-3 text-base text-green-800/80 max-w-sm">
            Descubrí los proyectos y actividades más importantes de la feria en este espacio.
          </p>
        </div>

        {/* Columna derecha: carrusel con swipe */}
        <div className="lg:col-span-2 relative flex flex-col items-center" {...handlers}>
          <div
            ref={cardRef}
            key={evento.id}
            className="relative w-full h-80 sm:h-[420px] rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Imagen de fondo */}
            <Image
              src={evento.img}
              alt={evento.titulo}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/30 to-transparent" />

            {/* Texto centrado */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
              <h3 className="text-2xl sm:text-3xl font-bold">{evento.titulo}</h3>
              <p className="mt-2 text-sm sm:text-base opacity-90">{evento.subtitulo}</p>
              <p className="mt-3 text-sm font-medium">
                {evento.hora} · {evento.lugar}
              </p>
            </div>
          </div>

          {/* Flechas + Indicadores */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={prev}
              className="bg-white/90 hover:bg-green-100 text-green-800 p-3 rounded-full shadow-lg"
            >
              ◀
            </button>

            <div className="flex gap-2">
              {eventos.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full cursor-pointer transition ${
                    i === index ? 'bg-green-700 scale-110' : 'bg-green-300 hover:bg-green-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="bg-white/90 hover:bg-green-100 text-green-800 p-3 rounded-full shadow-lg"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
