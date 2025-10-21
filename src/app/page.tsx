import Hero from "@/components/Hero";
import Proyectos from "@/components/Proyectos";
import Cursos from "@/components/Cursos";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
       <Proyectos />
       <Cursos />
       <Footer />
    </main>
  );
}
