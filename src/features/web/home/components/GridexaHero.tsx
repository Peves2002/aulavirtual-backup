'use client'

import React, { useState, useEffect } from 'react'

import Image from 'next/image'

const HERO_IMAGES = [
  '/images/hero1.jpg',
  '/images/hero2.jpg',
  '/images/hero3.jpg'
]

export default function GridexaHero() {
  const [currentIdx, setCurrentIdx] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5000)

    return () => clearInterval(iv)
  }, [])

  return (
    <section className="relative w-full h-[100vh] min-h-[600px] overflow-hidden" style={{ marginTop: 'calc(-1 * var(--navbar-height))' }}>
      {/* Image Slider */}
      {HERO_IMAGES.map((src, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: idx === currentIdx ? 1 : 0 }}
        >
          <Image
            src={src}
            alt="Gridexa Hero"
            fill
            className="object-cover"
            priority={idx === 0}
          />
        </div>
      ))}

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins mb-6 drop-shadow-lg tracking-tight">
          GRIDEXA ENERGY ACADEMY
        </h1>
        <p className="text-xl md:text-2xl font-light font-poppins mb-8 max-w-3xl drop-shadow-md">
          El sector energético avanza, y nosotros avanzamos con él.
        </p>
        
      </div>
      
      {/* Slider indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            className={`w-12 h-1.5 rounded-full transition-all ${idx === currentIdx ? 'bg-[#BDD962]' : 'bg-white/40'}`}
            onClick={() => setCurrentIdx(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
