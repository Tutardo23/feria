'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Categoria = 'comidas' | 'bebidas'

const cantinaItems = {
  comidas: [
    { nombre: 'Media docena', precio: '$10.000', img: '/cantina/empanadas.jpg' },
    { nombre: 'Hamburguesa', precio: '$---', img: '/cantina/hamburguesa.jpg' }, // completar precio real
  ],
  bebidas: [
    { nombre: 'Coca Cola', precio: '$---', img: '/cantina/coca.jpg' },
    { nombre: 'Cerveza', precio: '$---', img: '/cantina/cerveza.jpg' },
    { nombre: 'Agua mineral', precio: '$---', img: '/cantina/agua.jpg' },
  ],
}

export default function Cantina() {
  const [categoria, setCategoria] = useState<Categoria>('comidas')

  return (
    <section
      id="cantina"
      className="relative py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100"
    >
      <div className="container mx-auto px-4">

        {/* 🔹 Kiosco Solidario */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-green-800 text-center">
            🛒 Kiosco Solidario
          </h2>
          <p className="mt-2 text-center text-gray-700 font-medium">
            Todo lo recaudado se destina al techo del colegio 🏫✨
          </p>

          {/* Imagen QR techo */}
          <div className="mt-6 w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg border border-yellow-200 bg-white">
            <Image
              src="/techo.png"
              alt="Proyecto Techo del colegio"
              width={600}
              height={600}
              className="object-contain w-full h-auto"
              priority
            />
          </div>

          {/* Lista de precios */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto border border-yellow-200">
            <h3 className="text-lg font-bold text-green-800 mb-4">Lista de precios</h3>
            <ul className="space-y-2 text-gray-800 font-medium">
             <li>• Dulce de leche <span className="italic">&quot;Latata&quot;</span> — $6.000 Kg</li>
<li>• Quesos <span className="italic">&quot;M&quot;</span> (Estancias Las Carreras)</li>
<li>• Caja de alfajores <span className="italic">&quot;Alfatuc&quot;</span> x18 — $5.000</li>

              <li>• Bolsa de limones — $1.000</li>
              <li>• Caja de alfajores <span className="italic">"Alfatuc"</span> x18 — $5.000</li>
              <li>• Miel pura de abeja — $5.000 (½ Kg) · $9.000 (Kg)</li>
            </ul>
          </div>
        </div>

        {/* 🔹 Cantina Normal */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          {/* Identidad izquierda */}
          <div className="flex md:justify-start justify-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold shadow-sm">
              🍴 Cantina de la Feria
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
              Opciones de comidas y bebidas disponibles durante la feria.
            </p>

            {/* Tabs categorías */}
            <div className="flex justify-end gap-3 mt-5">
              {(['comidas', 'bebidas'] as Categoria[]).map((cat) => {
                const active = categoria === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoria(cat)}
                    className={`px-4 py-2 rounded-full font-medium transition border shadow-sm
                      ${
                        active
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

        {/* Grid productos cantina */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {cantinaItems[categoria].map((item, i) => (
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
