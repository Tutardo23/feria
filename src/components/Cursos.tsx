

'use client'

import { useState } from 'react'

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
        id: 'A',
        grupos: [
          { tema: 'El ciclo del agua', integrantes: ['Ana', 'Pedro'], hora: '09:00', lugar: 'Aula 1' },
          { tema: 'Plantas y semillas', integrantes: ['Lucía', 'Martín'], hora: '10:30', lugar: 'Laboratorio' },
        ],
      },
      {
        id: 'B',
        grupos: [
          { tema: 'Los planetas', integrantes: ['Juan', 'María'], hora: '11:00', lugar: 'SUM' },
        ],
      },
    ],
    '2° Grado': [{ id: 'A', grupos: [] }, { id: 'B', grupos: [] }],
    '3° Grado': [{ id: 'A', grupos: [] }, { id: 'B', grupos: [] }],
    '4° Grado': [{ id: 'A', grupos: [] }, { id: 'B', grupos: [] }],
    '5° Grado': [{ id: 'A', grupos: [] }, { id: 'B', grupos: [] }],
    '6° Grado': [{ id: 'A', grupos: [] }, { id: 'B', grupos: [] }],
  },
  secundaria: {
    '1° Año': [{ id: 'A', grupos: [] }, { id: 'B', grupos: [] }],
    '2° Año': [{ id: 'A', grupos: [] }, { id: 'B', grupos: [] }],
    '3° Año': [{ id: 'A', grupos: [] }, { id: 'B', grupos: [] }],
    '4° Año': [{ id: 'A', grupos: [] }, { id: 'B', grupos: [] }],
    '5° Año': [{ id: 'A', grupos: [] }, { id: 'B', grupos: [] }],
    '6° Año': [{ id: 'A', grupos: [] }, { id: 'B', grupos: [] }],
  },
  especiales: {
    Música: [{ id: 'General', grupos: [] }],
  },
}

export default function Cursos() {
  const [categoria, setCategoria] = useState<Categoria>('primaria')
  const [cursoActivo, setCursoActivo] = useState<string | null>(null)
  const [divisionActiva, setDivisionActiva] = useState<Division | null>(null)

  const divisiones = cursoActivo ? data[categoria][cursoActivo] : []

  return (
    <section id="cursos" className="bg-[#f9fafb] py-16">
      <div className="container mx-auto px-4">
        {/* Título */}
        <h2 className="text-3xl font-bold text-[#0C2D57] mb-8">Cursos y grupos</h2>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto">
          {(['primaria', 'secundaria', 'especiales'] as Categoria[]).map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategoria(cat); setCursoActivo(null) }}
              className={`px-4 py-2 rounded-full font-medium transition ${
                categoria === cat
                  ? 'bg-[#F5C242] text-[#0C2D57]'
                  : 'bg-white border text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid de cursos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Object.keys(data[categoria]).map((curso) => (
            <button
              key={curso}
              onClick={() => setCursoActivo(curso)}
              className={`p-4 rounded-lg shadow font-semibold transition ${
                cursoActivo === curso
                  ? 'bg-[#F5C242] text-[#0C2D57]'
                  : 'bg-white text-[#00572D] hover:bg-yellow-100'
              }`}
            >
              {curso}
            </button>
          ))}
        </div>

        {/* Divisiones (A y B) */}
        {cursoActivo && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {divisiones.map((div) => (
              <div
                key={div.id}
                onClick={() => setDivisionActiva(div)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6 cursor-pointer"
              >
                <h4 className="text-lg font-semibold text-[#00572D]">División {div.id}</h4>
                <p className="text-sm text-gray-600">
                  {div.grupos.length > 0 ? `${div.grupos.length} grupos` : `Grupos asignados a ${div.id}`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de división */}
      {divisionActiva && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-[#0C2D57]">División {divisionActiva.id}</h3>
              <button
                onClick={() => setDivisionActiva(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Grupos */}
            <div className="p-4 space-y-4">
              {divisionActiva.grupos.length > 0 ? (
                divisionActiva.grupos.map((g, i) => (
                  <div key={i} className="bg-[#FFF8E1] p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#00572D]">{g.tema}</h4>
                    <p className="text-sm text-gray-600">Integrantes: {g.integrantes.join(', ')}</p>
                    <p className="mt-1 text-sm font-medium text-[#0C2D57]">
                      {g.hora} – {g.lugar}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No hay grupos cargados en esta división.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
