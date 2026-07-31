'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'

import { ChevronLeft, ChevronRight } from 'lucide-react'

const IMAGES = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length)
    }, 6000)

    
return () => clearInterval(timer)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % IMAGES.length)
  const prev = () => setCurrent((prev) => (prev - 1 + IMAGES.length) % IMAGES.length)

  return (
    <section className="relative overflow-hidden min-h-[600px] flex items-center justify-center bg-[#1A2035] group">
      {IMAGES.map((img, index) => (
        <div
          key={img}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: current === index ? 1 : 0,
            backgroundImage: `url("${img}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: current === index ? 1 : 0
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[#1A2035]/70 z-10" />
      
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1
          className="text-white font-extrabold mb-6"
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1 }}
        >
          CAPACITACIÓN<br />PROFESIONAL
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Te brindamos enseñanza de calidad, a cargo de docentes especializados. ¡Selah es tu mejor opción!
        </p>
        <Link
          href="/cursos"
          className="inline-block rounded-full font-bold text-white transition-transform hover:scale-105"
          style={{ backgroundColor: '#289EA4', padding: '15px 40px', fontSize: '1.1rem' }}
        >
          Más Información
        </Link>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white z-30 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white z-30 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${current === idx ? 'bg-[#E3004F]' : 'bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </section>
  )
}
