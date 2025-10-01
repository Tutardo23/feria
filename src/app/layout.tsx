"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./globals.css"

gsap.registerPlugin(ScrollTrigger)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,          // suavidad general (0 = sin suavidad, 1 = instantáneo)
      duration: 1.2,       // cuánto tarda en llegar al destino
      wheelMultiplier: 1,  // sensibilidad del scroll con mouse/rueda
      touchMultiplier: 1.3 // sensibilidad del scroll táctil
    })

    // 🔗 Lenis informa a ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    // 🔗 Loop de animación
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <html lang="es">
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
