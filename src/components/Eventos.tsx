'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const eventos = [
  { id: 1, titulo: 'Obra de teatro', hora: '10:00 hs', lugar: 'Aula Magna', img: '/evento1.jpg' },
  { id: 2, titulo: 'Concurso de ciencia', hora: '11:30 hs', lugar: 'SUM', img: '/evento2.jpg' },
  { id: 3, titulo: 'Coro escolar', hora: '12:00 hs', lugar: 'Patio', img: '/evento3.jpg' },
  { id: 4, titulo: 'Laboratorio abierto', hora: '13:30 hs', lugar: 'Laboratorio', img: '/evento4.jpg' },
]

export default function Eventos() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section id="destacados" className="bg-[#FFF8E1] py-16">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2D57] text-left">
            Eventos destacados
          </h2>
          <p className="mt-1 text-sm sm:text-base text-[#00572D] text-left">
            Actividades más importantes de la feria
          </p>
        </div>

        {/* Carrusel tipo Instagram */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        >
          {eventos.map((evento) => (
            <motion.div
              key={evento.id}
              className="snap-center flex-shrink-0 w-[85%] sm:w-[300px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-full h-56 sm:h-48">
                <Image
                  src={evento.img}
                  alt={evento.titulo}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold text-[#00572D]">{evento.titulo}</h3>
                <p className="text-sm text-gray-600">{evento.hora} – {evento.lugar}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
