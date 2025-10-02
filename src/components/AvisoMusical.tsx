'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function AvisoMusical() {
  const [showAviso, setShowAviso] = useState(false)
  const [avisoCerrado, setAvisoCerrado] = useState(false)

  useEffect(() => {
    if (!avisoCerrado) {
      const timer = setTimeout(() => setShowAviso(true), 8000) // 10 segundos
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
        <h4 className="text-lg font-bold text-green-900 mb-2">🎶 Atención</h4>
        <p className="text-sm text-green-800 mb-4">
          ¡No te olvides de visitar la <strong>banda musical</strong> y disfrutar de su presentación!
        </p>
        <button
          onClick={() => { setShowAviso(false); setAvisoCerrado(true) }}
          className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700"
        >
          Entendido
        </button>
      </motion.div>
    </div>
  )
}
