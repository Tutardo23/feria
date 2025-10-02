import Hero from '@/components/Hero'
import Eventos from '@/components/Eventos'
import Cursos from '@/components/Cursos'
import Cantina from '@/components/Cantina'
import Opinion from '@/components/Opinion'
import AvisoMusical from '@/components/AvisoMusical'
import Loader from '@/components/Loader'

export default function Home() {
  return (
    <>
    <Loader />
      <Hero />
      <Eventos />
      <Cursos />  {/* 👈 Aquí se agrega */}
      <Cantina />
      <Opinion />
      <AvisoMusical />
    </>
  )
}
