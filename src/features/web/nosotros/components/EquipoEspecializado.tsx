'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { eyebrow, sectionH2, sectionDesc } from '@/features/web/home/components/typography'

const TEAM_IMAGES = [
  { src: '/images/equipo-especializado/especialistas-en-higiene-ocupacional.webp', title: 'Especialistas en Higiene Ocupacional' },
  { src: '/images/equipo-especializado/especialistas-en-monitoreo-ocupacional.webp', title: 'Especialistas en Monitoreo Ocupacional' },
  { src: '/images/equipo-especializado/especialistas-en-ssoma.webp', title: 'Especialistas en SSOMA' },
  { src: '/images/equipo-especializado/especialistas-en-sst-y-so.webp', title: 'Especialistas en SST y SO' },
  { src: '/images/equipo-especializado/especialistas-en-sst-e-higiene-ocupacional.webp', title: 'Especialistas en SST e Higiene Ocupacional' },
  { src: '/images/equipo-especializado/especialistas-en-sst-e-ia.webp', title: 'Especialistas en SST e IA' },
  { src: '/images/equipo-especializado/especialistas-en-salud.webp', title: 'Especialistas en Salud' }
]

export default function EquipoEspecializado() {
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

  const activeTitle = TEAM_IMAGES[activeIndex].title

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p style={{ ...eyebrow, display: 'block', textAlign: 'center' }}>
            Nuestros Especialistas
          </p>
          <h2 style={{ ...sectionH2, textAlign: 'center', marginBottom: '0.75rem' }}>
            Equipo Especializado
          </h2>
          <p style={{ ...sectionDesc, textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
            Contamos con divisiones expertas para abordar los requerimientos más complejos.
          </p>
        </div>

        {/* Imagen del Equipo y Texto (Mirrored layout) */}
        <div className="mt-12 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto mb-16">
          
          {/* Texto a la Izquierda */}
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#000000] min-h-[72px] flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {activeTitle}
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              Nuestro equipo especializado está formado por líderes en sus respectivos campos. Cada área cuenta con profesionales dedicados exclusivamente a perfeccionar su rama, asegurando resultados óptimos y estrategias vanguardistas para cada desafío.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              Creemos en la sinergia de conocimientos técnicos profundos y una visión estratégica amplia. Con años de experiencia en el mercado y un enfoque en la innovación, estamos preparados para transformar los procesos de tu negocio y escalar tus operaciones hacia el futuro.
            </p>
          </div>

          {/* Imagen a la Derecha */}
          <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200 aspect-[4/3] bg-slate-200 w-full">
            {TEAM_IMAGES.map((item, idx) => {
              let zIndex = 'z-0'
              let opacity = 'opacity-0'
              let transition = 'transition-opacity duration-[1500ms] ease-in-out'
              
              if (idx === activeIndex) {
                zIndex = 'z-20'
                opacity = 'opacity-100'
              } else if (idx === prevIndex) {
                zIndex = 'z-10'
                opacity = 'opacity-100'
                // El previo no hace transición de opacidad, simplemente se queda atrás
                transition = 'transition-none'
              }

              return (
                <Image
                  key={item.src}
                  src={item.src}
                  alt={item.title}
                  fill
                  className={`object-cover ${transition} ${opacity} ${zIndex}`}
                  priority={idx === 0}
                  unoptimized
                />
              )
            })}
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
            {TEAM_IMAGES.map((item, idx) => (
              <button
                key={item.src}
                onClick={() => {
                  setPrevIndex(activeIndex)
                  setActiveIndex(idx)
                }}
                className={`relative flex-shrink-0 w-36 h-24 sm:w-48 sm:h-32 rounded-xl overflow-hidden transition-all duration-300 snap-center
                  ${idx === activeIndex ? 'border border-[#000000] scale-105 shadow-xl' : 'border border-transparent opacity-60 hover:opacity-100'}`}
                aria-label={`Ver imagen de ${item.title}`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
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
