'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { eyebrow, sectionH2, sectionDesc } from '@/features/web/home/components/typography'

const TEAM_IMAGES = [
  '/images/equipo/img4794.webp',
  '/images/equipo/img4828.webp',
  '/images/equipo/img4860.webp',
  '/images/equipo/img4873.webp',
  '/images/equipo/img4877.webp',
  '/images/equipo/img4881.webp',
  '/images/equipo/img4882.webp',
  '/images/equipo/img4887.webp',
  '/images/equipo/img4897.webp',
  '/images/equipo/img4899.webp',
  '/images/equipo/img4904.webp',
  '/images/equipo/img4906.webp',
  '/images/equipo/img4914.webp',
  '/images/equipo/img4918.webp',
  '/images/equipo/img4927.webp',
  '/images/equipo/img4933.webp',
  '/images/equipo/img4936.webp',
  '/images/equipo/img4937.webp',
  '/images/equipo/img4953.webp',
  '/images/equipo/img4957.webp'
]

export default function ProfessorsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)

  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto advance
  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(activeIndex)
      setActiveIndex((prev) => (prev + 1) % TEAM_IMAGES.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [activeIndex])

  const handleScrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const handleScrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  return (
    <section className="bg-slate-50 py-20 px-6 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p style={{ ...eyebrow, display: 'block', textAlign: 'center' }}>
            Nuestra Fortaleza
          </p>
          <h2 style={{ ...sectionH2, textAlign: 'center', marginBottom: '0.75rem' }}>
            Nuestro equipo
          </h2>
          <p style={{ ...sectionDesc, textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
            Aprende de profesionales con amplia experiencia en el sector industrial y académico.
          </p>
        </div>

        {/* Imagen del Equipo y Texto */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto mb-16">
          {/* Imagen a la Izquierda */}
          <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200 aspect-[4/3] bg-slate-200 w-full">
            {TEAM_IMAGES.map((src, idx) => {
              let zIndex = 'z-0'
              let opacity = 'opacity-0'
              let transition = 'transition-opacity duration-[1500ms] ease-in-out'
              
              if (idx === activeIndex) {
                zIndex = 'z-20'
                opacity = 'opacity-100'
              } else if (idx === prevIndex) {
                zIndex = 'z-10'
                opacity = 'opacity-100'
                // El previo no hace transición de opacidad, simplemente se queda atrás mientras el nuevo aparece encima
                transition = 'transition-none'
              }

              return (
                <Image
                  key={src}
                  src={`${src}?v=4`}
                  alt="Nuestro Equipo MS&M Consulting"
                  fill
                  className={`object-cover ${transition} ${opacity} ${zIndex}`}
                  priority={idx === 0}
                  unoptimized
                />
              )
            })}
          </div>

          {/* Texto Generado */}
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#000000]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Expertos comprometidos con tu éxito
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              En MS&M Consulting, nos enorgullece contar con un equipo multidisciplinario de profesionales altamente capacitados y con vasta experiencia en diversas industrias. Nuestro objetivo es brindar soluciones integrales adaptadas a los desafíos del mercado actual.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              No solo somos consultores; somos aliados estratégicos que se involucran en cada proyecto con dedicación, ética y empatía. Creemos firmemente que la confianza y la innovación constante son los pilares fundamentales para impulsar el crecimiento sostenible de tu organización.
            </p>
          </div>
        </div>

        {/* Thumbnail Carousel */}
        <div className="w-full relative px-10 group">
          {/* Flechas de navegación del carrusel */}
          <button
            onClick={handleScrollPrev}
            aria-label="Desplazar a la izquierda"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white border border-slate-200 hover:border-transparent shadow-md hover:bg-[#FFB600] text-slate-700 hover:text-white p-2 rounded-full transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={handleScrollNext}
            aria-label="Desplazar a la derecha"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white border border-slate-200 hover:border-transparent shadow-md hover:bg-[#FFB600] text-slate-700 hover:text-white p-2 rounded-full transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>

          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pt-4 pb-6 snap-x hide-scrollbar items-center" 
            style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
          >
            {TEAM_IMAGES.map((src, idx) => (
              <button
                key={src}
                onClick={() => {
                  setPrevIndex(activeIndex)
                  setActiveIndex(idx)
                }}
                className={`relative flex-shrink-0 w-36 h-24 sm:w-48 sm:h-32 rounded-xl overflow-hidden transition-all duration-300 snap-center
                  ${idx === activeIndex ? 'border border-[#000000] scale-105 shadow-xl' : 'border border-transparent opacity-60 hover:opacity-100'}`}
                aria-label={`Ver imagen ${idx + 1}`}
              >
                <Image
                  src={`${src}?v=3`}
                  alt={`Miniatura ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 144px, 192px"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  )
}
