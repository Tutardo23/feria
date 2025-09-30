import Hero from '@/components/Hero'
import Eventos from '@/components/Eventos'
import Cursos from '@/components/Cursos'

export default function Home() {
  return (
    <>
      <Hero />
      <Eventos />
      <Cursos />  {/* 👈 Aquí se agrega */}
    </>
  )
}
