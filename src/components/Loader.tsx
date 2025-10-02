'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export default function Loader() {
  const [loading, setLoading] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const bgImgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loaderRef.current || !titleRef.current || !subtitleRef.current) return

    const letters = titleRef.current.querySelectorAll('span')

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          scale: 1.05,
          filter: 'blur(20px)',
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => setLoading(false),
        })
      },
    })

    // Fade-in de la imagen de fondo
    if (bgImgRef.current) {
      tl.fromTo(
        bgImgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' },
        0
      )
    }

    // Letras principales
    tl.fromTo(
      letters,
      { opacity: 0, y: 80, rotateX: -90, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        stagger: 0.08,
      },
      0.2
    )

    // Línea energética
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'expo.out' },
      '-=0.4'
    )

    // Subtítulo
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3'
    )
  }, [])

  if (!loading) return null

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-white overflow-hidden bg-black"
    >
      {/* Imagen de fondo optimizada */}
      <div ref={bgImgRef} className="absolute inset-0">
        <Image
          src="/loader-bg.jpg"
          alt="Loader background"
          fill
          priority
          unoptimized
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Título animado */}
        <h1
          ref={titleRef}
          className="text-5xl sm:text-7xl font-extrabold tracking-[0.3em] flex gap-2"
        >
          {Array.from('PUCARA').map((char, i) => (
            <span
              key={i}
              className="inline-block text-white drop-shadow-[0_0_12px_rgba(245,194,66,0.9)]"
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Línea energética */}
        <div className="mt-6 w-64 h-1 bg-white/20 overflow-hidden rounded-full">
          <div
            ref={lineRef}
            className="h-full w-full bg-gradient-to-r from-yellow-400 via-green-500 to-yellow-400 origin-left scale-x-0 animate-pulse"
          />
        </div>

        {/* Subtítulo */}
        <p
          ref={subtitleRef}
          className="mt-6 text-lg sm:text-xl text-white/90 tracking-widest uppercase"
        >
          Edición XI · 2025
        </p>
      </div>
    </div>
  )
}
