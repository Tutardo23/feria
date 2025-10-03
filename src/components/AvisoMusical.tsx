'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Utensils } from 'lucide-react' // 🔹 iconos pro

export default function AvisoMusical() {
  const [showAviso, setShowAviso] = useState(false)
  const [avisoCerrado, setAvisoCerrado] = useState(false)

  useEffect(() => {
    if (!avisoCerrado) {
      const timer = setTimeout(() => setShowAviso(true), 15000) // 15 segundos
      return () => clearTimeout(timer)
    }
  }, [avisoCerrado])

  if (!showAviso || avisoCerrado) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
      onClick={() => { setShowAviso(false); setAvisoCerrado(true) }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6 text-center"
      >
        {/* Encabezado con ícono */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Music className="w-5 h-5 text-green-700" />
          <h4 className="text-lg font-bold text-green-900">Atención</h4>
        </div>

        {/* Texto del aviso */}
        <p className="text-sm text-green-800 mb-4 leading-relaxed">
  A partir de las <strong>21:30 hs</strong> comienzan las 
  <strong> bandas en vivo</strong>. Te invitamos a quedarte, disfrutar de 
  la música y compartir este momento especial.
</p>

<div className="flex items-center justify-center gap-2 text-sm text-green-800 mb-4">
 
  <span>
    La <strong>cantina</strong> ya está abierta con comidas y bebidas para todos.
  </span>
</div>



        {/* Botón */}
        <button
          onClick={() => { setShowAviso(false); setAvisoCerrado(true) }}
          className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          Entendido
        </button>
      </motion.div>
    </div>
  )
}
