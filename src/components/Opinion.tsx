'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function GraciasFooter() {
  return (
    <div className="bg-gradient-to-b from-green-50 via-yellow-50 to-white">
      {/* Bloque de agradecimiento */}
      <section className="py-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900">
            ¡Gracias por acompañarnos!
          </h2>
          <p className="mt-4 text-lg text-green-800/80">
            Queremos saber tu opinión sobre la <span className="font-semibold">Noche de las Ciencias</span>.
            Tus comentarios nos ayudan a mejorar y seguir creciendo juntos.
          </p>

          <Link
            href="/opinion"
            className="mt-8 inline-block rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-green-900 shadow hover:bg-yellow-400 transition"
          >
            Dejanos tu opinión →
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-100 py-10 mt-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo / Identidad */}
          <div>
            <h3 className="font-bold text-xl">Colegio Pucará</h3>
            <p className="mt-2 text-green-300">
              Feria de Ciencias 2025 · Innovación y aprendizaje en comunidad.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-semibold text-lg">Secciones</h4>
            <ul className="mt-3 space-y-2 text-green-200">
              <li><a href="#destacados" className="hover:text-yellow-400">Eventos</a></li>
              <li><a href="#cursos" className="hover:text-yellow-400">Cursos y grupos</a></li>
              <li><a href="#cantina" className="hover:text-yellow-400">Cantina</a></li>
              <li><a href="/opinion" className="hover:text-yellow-400">Opinión</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-lg">Contacto</h4>
            <p className="mt-3 text-green-300">📍 Yerba Buena, Tucumán</p>
            <p className="text-green-300">📧 info@colegiopucara.edu.ar</p>
            <p className="text-green-300">☎️ (381) 123-4567</p>
          </div>
        </div>

        {/* Línea final */}
        <div className="mt-10 border-t border-green-700 pt-4 text-center text-sm text-green-400">
          © {new Date().getFullYear()} Colegio Pucará — Todos los derechos reservados
        </div>
      </footer>
    </div>
  )
}
