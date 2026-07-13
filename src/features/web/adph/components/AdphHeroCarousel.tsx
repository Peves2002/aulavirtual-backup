'use client'

import { useState, useEffect, useCallback } from 'react'

import Link from 'next/link'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

interface Slide {
  id: string
  titulo: string
  subtitulo: string | null
  imagen_url: string
  boton_texto: string
  boton_url: string
}

export default function AdphHeroCarousel() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch('/api/web/slides')

        if (res.ok) {
          const json = await res.json()

          if (json.success && json.data) {
            setSlides(json.data)
          }
        }
      } catch (error) {
        console.error('Error fetching slides:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  // Autoplay
  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(nextSlide, 6000)

    
return () => clearInterval(timer)
  }, [slides.length, nextSlide])

  if (loading || slides.length === 0) {
    return (
      <div className="relative w-full h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#08479b]"></div>
      </div>
    )
  }

  const activeSlide = slides[current]

  return (
    <section className="relative w-full h-screen overflow-hidden bg-slate-950 flex items-center">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeSlide.imagen_url}
            alt={activeSlide.titulo}
            className="w-full h-full object-cover"
          />
          {/* Enhanced radial gradient overlay for high contrast and elegant look */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Content */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center h-full">
        <div className="max-w-3xl space-y-6 md:space-y-8 text-left mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${activeSlide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-6"
            >


              {/* Title - direct text on image with high contrast */}
              <h1 className="text-white font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight drop-shadow-xl font-manrope">
                {activeSlide.titulo}
              </h1>

              {/* Subtitle */}
              {activeSlide.subtitulo && (
                <p className="text-slate-200 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl drop-shadow-md">
                  {activeSlide.subtitulo}
                </p>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href={activeSlide.boton_url}
                  className="group inline-flex items-center gap-2.5 bg-[#08479b] hover:bg-[#06316b] text-white font-extrabold text-sm md:text-base uppercase tracking-widest px-8 md:px-10 py-4 md:py-5 rounded-md transition-all duration-300 shadow-[0_4px_20px_rgba(8,71,155,0.4)] hover:shadow-[0_4px_30px_rgba(8,71,155,0.6)] hover:-translate-y-0.5"
                >
                  {activeSlide.boton_texto}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/nosotros"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-sm md:text-base uppercase tracking-widest px-8 md:px-10 py-4 md:py-5 rounded-md transition-all duration-300 backdrop-blur-sm"
                >
                  Conócenos
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-md bg-white/5 border border-white/10 hover:bg-[#08479b] hover:border-[#08479b] text-white transition-all duration-300 backdrop-blur-sm hidden md:block"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-md bg-white/5 border border-white/10 hover:bg-[#08479b] hover:border-[#08479b] text-white transition-all duration-300 backdrop-blur-sm hidden md:block"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Slide Indicators / Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 transition-all duration-500 rounded-full ${
                current === index ? 'w-8 bg-[#08479b]' : 'w-2 bg-white/40 hover:bg-white'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
