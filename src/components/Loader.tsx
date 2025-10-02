'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

export default function Loader() {
  const [loading, setLoading] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loaderRef.current || !titleRef.current || !subtitleRef.current) return

    const letters = titleRef.current.querySelectorAll('span')

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          scale: 1.1,
          filter: 'blur(20px)',
          duration: 1.2,
          ease: 'power2.inOut',
          onComplete: () => setLoading(false),
        })
      },
    })

    tl.fromTo(
      letters,
      { opacity: 0, y: 80, rotateX: -90, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        stagger: 0.1,
      }
    )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'expo.out' },
        '-=0.4'
      )
      .fromTo(
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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
    >
      {/* Título con letras individuales */}
      <h1
        ref={titleRef}
        className="text-4xl sm:text-6xl font-extrabold tracking-widest flex gap-2"
      >
        {Array.from('PUCARA').map((char, i) => (
          <span key={i} className="inline-block">
            {char}
          </span>
        ))}
      </h1>

      {/* Línea energética */}
      <div className="mt-6 w-64 h-1 bg-white/20 overflow-hidden rounded-full">
        <div
          ref={lineRef}
          className="h-full w-full bg-gradient-to-r from-yellow-400 via-green-500 to-yellow-400 origin-left scale-x-0"
        ></div>
      </div>

      {/* Subtítulo */}
      <p
        ref={subtitleRef}
        className="mt-6 text-base sm:text-lg text-white/80 tracking-wide uppercase"
      >
        Edición XI · 2025
      </p>
    </div>
  )
}
