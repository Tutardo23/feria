import Hero from '@/components/Hero'
import Eventos from '@/components/Eventos'
import Cursos from '@/components/Cursos'
import Cantina from '@/components/Cantina'
import Opinion from '@/components/Opinion'

export default function Home() {
  return (
    <>
      <Hero />
      <Eventos />
      <Cursos />  {/* 👈 Aquí se agrega */}
      <Cantina />
      <Opinion />
    </>
  )
}
