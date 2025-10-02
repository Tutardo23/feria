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

export const dataSecundaria: Record<string, Division[]> = {
  '1° Año': [
    {
  id: 'A',
  grupos: [
    { tema: 'Tucumanismos', integrantes: [], hora: '19:30 a 21:00', lugar: 'Literatura, Arte y Religión · Prof. Jiménez' },
    { tema: 'Piedad popular: la devoción a la Virgen de la Merced', integrantes: [], hora: '19:30 a 21:00', lugar: 'Literatura, Arte y Religión · Prof. Corvalán' },
    { tema: 'La influencia de los pueblos originarios. Culturas indígenas que habitaron en Tucumán, su legado. Diaguitas/Calchaqui.', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Miglio' },
    { tema: 'Sol de Tucumán: Energía que transforma hogares e industrias', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Exactas · Prof. Joaquín' },
    { tema: 'Proyecciones de población en Tucumán', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Exactas · Prof. Cisneros' },
    { tema: 'Myths and Legends of Tucuman', integrantes: [], hora: '19:30 a 21:00', lugar: 'Inglés · Prof. Córdoba' },
    { tema: 'Climate Change', integrantes: [], hora: '19:30 a 21:00', lugar: 'Inglés · Prof. Ruiz' },
  ],
},
    {
  id: 'B',
  grupos: [
    { tema: 'Tucumán: tradición viva', integrantes: [], hora: '19:30 a 21:00', lugar: 'Literatura, Arte y Religión · Prof. Jiménez' },
    { tema: 'Piedad popular: San Francisco Solano y Tucumán', integrantes: [], hora: '19:30 a 21:00', lugar: 'Literatura, Arte y Religión · Prof. Corvalán' },
    { tema: 'Automatización Industrial: Prototipo de Clasificación por Color', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Exactas · Prof. Brizuela' },
    { tema: 'Señales del cerro: Comunicación ancestral y física de las ondas', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Exactas · Prof. Joaquín' },
    { tema: 'Economía Regional', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Exactas · Prof. Cisneros' },
    { tema: 'The Green House effect', integrantes: [], hora: '19:30 a 21:00', lugar: 'Inglés · Prof. Ruiz' },
    { tema: 'La influencia de los pueblos originarios. Culturas indígenas que habitaron en Tucumán, su legado. Los lules.', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Miglio' },
  ]
}
,
  ],
  '2° Año': [
    {
      id: 'A',
      grupos: [
        { tema: '"Tucumán: leyendas sin fin"', integrantes: [], hora: '19:30 a 21:00', lugar: 'Literatura, Arte y Religión · Prof. Mena' },
        { tema: 'La física del rugby', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Exactas · Prof. Barrios' },
        { tema: 'Aprendemos Jugando: Creación de videojuegos didácticos', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Exactas · Prof. Pinto' },
        { tema: 'La batalla de Tucumán en 1812: desarrollo y efectos en la política revolucionaria', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Parrado' },
        { tema: 'Percy Hill: un área del pasado con gran futuro', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Naturales y Deporte · Prof. Silva' },
{ tema: 'Observación de aves. ¿Cómo se hace?', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Naturales y Deporte · Prof. Silva' },

      ],
    },
    {
      id: 'B',
      grupos: [
        { tema: 'Escritores en Tucumán: escenas de su vida', integrantes: [], hora: '19:30 a 21:00', lugar: 'Literatura, Arte y Religión · Prof. Mena' },
        { tema: 'La fe en Tucumán a lo largo del tiempo', integrantes: [], hora: '19:30 a 21:00', lugar: 'Literatura, Arte y Religión · Prof. Barrios' },
        { tema: 'Aire Limpio, Mentes Claras: Sistema Automatizado de Monitoreo de Calidad del Aire', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Exactas · Prof. Pinto' },
        { tema: 'El papel de Tucumán durante la declaración de independencia en 1816', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Parrado' },
        { tema: 'Bioindicadores del agua contaminada en los ríos de Tucumán', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Naturales y Deporte · Prof. Galván' },
        { tema: 'Calidad del agua en los ríos tucumanos', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Naturales y Deporte · Prof. Terán' },
        { tema: 'El ciclo del nitrógeno en los cultivos de caña de azúcar', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Naturales y Deporte · Prof. Terán' },
      ],
    },
  ],
  '3° Año': [
    {
      id: 'A',
      grupos: [
        { tema: 'Arte sacro en Tucumán', integrantes: [], hora: '19:30 a 21:00', lugar: 'Literatura, Arte y Religión · Prof. Lord' },
        { tema: 'Procesamiento de datos de rendimiento deportivo', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Exactas · Prof. Gallardo' },
        { tema: 'Modelado matemático del azúcar en Tucumán', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Exactas · Prof. Gallardo' },
        { tema: 'San Miguel de Tucumán: desde su fundación hasta la actualidad', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Prieto' },
        { tema: 'La caña de azúcar: el alma de Tucumán', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Prieto' },
        { tema: 'La industria azucarera en Tucumán', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Torres' },
        { tema: 'La justicia de paz en Tucumán', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Pacheco' },
        
      ],
    },
    {
      id: 'B',
      grupos: [
        { tema: 'Misteriosa Tucumán: los cuentos de Francisco Juliá', integrantes: [], hora: '19:30 a 21:00', lugar: 'Literatura, Arte y Religión · Prof. Casiva' },
        { tema: 'La evangelización de los dominicos en Tucumán', integrantes: [], hora: '19:30 a 21:00', lugar: 'Literatura, Arte y Religión · Prof. Lord' },
        { tema: 'El Cadillal: aspectos geográficos', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Torres' },
        { tema: 'La Independencia Argentina', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Pacheco' },
        { tema: 'Conservas locales de estación', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Naturales y Deporte · Prof. Paez' },
        { tema: 'Jabón cítrico artesanal', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Naturales y Deporte · Prof. Paez' },
        { tema: 'Huellas del Deporte Tucumano: de la Historia al Presente', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Naturales y Deporte · Prof. Soruco' },
      ],
    },
  ],
  '5° Año': [
    {
      id: 'General',
      grupos: [
        { tema: 'Historia y Ficción: Belgrano en un relato de Adolfo Colombres', integrantes: [], hora: '19:30 a 21:00', lugar: 'Literatura, Arte y Religión · Prof. Casiva' },
        { tema: 'El impacto del relieve en los cultivos locales', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Costas' },
        { tema: 'Turismo geográfico en Tucumán: Sierra de San Javier', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Costas' },
        { tema: 'La enseñanza del inglés en los colegios de Tucumán', integrantes: [], hora: '19:30 a 21:00', lugar: 'Inglés · Prof. Díaz Sorbello' },
        { tema: 'Inglés y Turismo en Tucumán', integrantes: [], hora: '19:30 a 21:00', lugar: 'Inglés · Prof. Díaz Sorbello' },
        { tema: 'Tourism in Tucumán. Places to visit.', integrantes: [], hora: '19:30 a 21:00', lugar: 'Inglés · Prof. Nuñez' },
      ],
    },
  ],
  '6° Año': [
    {
      id: 'A',
      grupos: [
        { tema: 'El legado artístico de Lola Mora', integrantes: [], hora: '19:30 a 21:00', lugar: 'Literatura, Arte y Religión · Prof. Arnedo' },
        { tema: 'Problemática del tránsito en Tucumán y sus posibles soluciones', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Exactas · Prof. Salcedo' },
        { tema: 'La boleta única como herramienta de transparencia', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Lix Klett' },
        { tema: 'El trabajo y la ciudadanía en relación a la actividad citrícola', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Sierra' },
        { tema: 'El trabajo y la ciudadanía en relación a la actividad azucarera', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Sierra' },
      ],
    },
    {
      id: 'B',
      grupos: [
        { tema: 'Producción, población, clima y salud en Tucumán: análisis y proyecciones', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Exactas · Prof. Salcedo' },
        { tema: 'Contribución del PBI de Tucumán respecto al NOA', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Di Risio' },
        { tema: 'Tucumán 4.0: La IA como Puente entre la Tradición Educativa y el Futuro del Aprendizaje', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Córdoba' },
        { tema: 'La inflación en la Argentina y en Tucumán', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Sosa Reto' },
        { tema: 'El fentanilo en la Argentina. Sus consecuencias jurídicas.', integrantes: [], hora: '19:30 a 21:00', lugar: 'Ciencias Sociales · Prof. Lix Klett' },
      ],
    },
  ],
}
