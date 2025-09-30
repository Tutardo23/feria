'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Categoria = 'comidas' | 'bebidas' | 'promos'

const items = {
  comidas: [
    { nombre: 'Empanadas', precio: '$500', img: '/cantina/empanadas.jpg' },
    { nombre: 'Sandwich de milanesa', precio: '$1200', img: '/cantina/mila.jpg' },
    { nombre: 'Pizza por porción', precio: '$900', img: '/cantina/pizza.jpg' },
  ],
  bebidas: [
    { nombre: 'Agua mineral', precio: '$400', img: '/cantina/agua.jpg' },
    { nombre: 'Gaseosa', precio: '$700', img: '/cantina/coca.jpg' },
    { nombre: 'Jugo natural', precio: '$600', img: '/cantina/jugo.jpg' },
  ],
  promos: [
    { nombre: 'Combo Feria (mila + gaseosa)', precio: '$1500', img: '/cantina/combo.jpg' },
  ],
}

export default function Cantina() {
  const [categoria, setCategoria] = useState<Categoria>('comidas')

  return (
    <section id="cantina" className="relative py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <div className="container mx-auto px-4">
        {/* Encabezado en 2 columnas */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          
          {/* Identidad izquierda */}
          <div className="flex md:justify-start justify-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold shadow-sm">
              <span className="text-green-700">🔬</span>
              Espacio de las Ciencias
            </div>
          </div>

          {/* Título + Tabs a la derecha */}
          <div className="text-right">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-800">
              Cantina <span className="text-green-800">2025</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-1 w-20 ml-auto mt-2 rounded-full bg-green-700"
            />
            <p className="mt-3 text-gray-700">
              Descubrí las opciones de comidas y bebidas disponibles durante la feria.
            </p>

            {/* Tabs categorías */}
            <div className="flex justify-end gap-3 mt-5">
              {(['comidas', 'bebidas', 'promos'] as Categoria[]).map((cat) => {
                const active = categoria === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoria(cat)}
                    className={`px-4 py-2 rounded-full font-medium transition border shadow-sm
                      ${active
                        ? 'bg-yellow-500 text-white border-yellow-500'
                        : 'bg-white text-yellow-800 border-yellow-200 hover:bg-yellow-50'
                      }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Grid productos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {items[categoria].map((item, i) => (
            <motion.div
              key={item.nombre}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition"
            >
              <div className="relative w-full h-40">
                <Image
                  src={item.img}
                  alt={item.nombre}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-yellow-800">{item.nombre}</h3>
                <p className="mt-1 text-green-700 font-bold">{item.precio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
