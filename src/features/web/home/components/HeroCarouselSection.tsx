'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react'

const SLIDES = [
  {
    image: '/heros/hero1.webp',
    tag: 'MS&M CONSULTING',
    title: 'Consultoría Integral en Seguridad, Salud Ocupacional y Gestión Empresarial',
    slogan: 'NO SOLO BRINDAMOS SERVICIOS, CONSTRUIMOS CONFIANZA',
    desc: 'Soluciones especializadas en SG-SST, Monitoreos Ocupacionales, Licencias e ITSE, Sistemas Integrados ISO (45001, 14001, 9001), Capacitaciones Integrales y Homologaciones SIG.',
  },
  {
    image: '/heros/hero2.webp',
    tag: 'SISTEMAS INTEGRADOS (SIG)',
    title: 'Sistemas Integrados de Gestión ISO 45001, 14001 y 9001',
    slogan: 'EXCELENCIA TÉCNICA Y CUMPLIMIENTO LEGAL',
    desc: 'Asesoría experta en homologación de sistemas integrados de gestión, auditorías y preparación para certificaciones internacionales.',
  },
  {
    image: '/heros/hero3.webp',
    tag: 'LICENCIAS & ITSE',
    title: 'Licencias de Funcionamiento y Certificados ITSE - INDECI',
    slogan: 'CRECIMIENTO ORDENADO, SEGURO Y SOSTENIBLE',
    desc: 'Elaboración e implementación de planos y documentación técnica para Inspección Técnica de Seguridad en Edificaciones (ITSE).',
  },
  {
    image: '/heros/hero4.webp',
    tag: 'CAPACITACIÓN & EMERGENCIAS',
    title: 'Capacitaciones Integrales y Gestión de Respuesta ante Emergencias',
    slogan: 'ENTRENAMIENTO PRÁCTICO Y PROFESIONAL',
    desc: 'Formación en primeros auxilios, lucha contra incendios, materiales peligrosos, evacuación, rescate y prevención del hostigamiento sexual.',
  },
]

export default function HeroCarouselSection({ waNumber = '51900281578' }: { waNumber?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % SLIDES.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused])

  const nextSlide = () => setCurrentIndex(prev => (prev + 1) % SLIDES.length)
  const prevSlide = () => setCurrentIndex(prev => (prev - 1 + SLIDES.length) % SLIDES.length)

  const currentSlide = SLIDES[currentIndex]

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950"
      style={{ minHeight: 'calc(100vh - var(--navbar-height, 88px))', display: 'flex', alignItems: 'center' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Fade Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={`${currentSlide.image}?v=${Date.now()}`}
            alt={currentSlide.title}
            fill
            priority
            unoptimized
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              background: currentIndex === 0
                ? 'linear-gradient(to top, rgba(2, 6, 23, 0.75) 0%, rgba(2, 6, 23, 0.45) 50%, rgba(2, 6, 23, 0.65) 100%)'
                : 'linear-gradient(to right, rgba(2, 6, 23, 0.75) 0%, rgba(2, 6, 23, 0.35) 50%, transparent 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Grid Pattern Overlay */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Content Container (Center/Full-width for Slide 1, Left for Slide 2 & 4, Right for Slide 3) */}
      <div
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-16 w-full flex"
        style={{
          justifyContent: currentIndex === 0 ? 'center' : currentIndex === 2 ? 'flex-end' : 'flex-start',
        }}
      >
        <div className={currentIndex === 0 ? 'max-w-3xl w-full text-center' : 'max-w-xl w-full'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className={`p-6 md:p-8 rounded-2xl backdrop-blur-md bg-slate-950/45 border border-white/10 shadow-2xl ${
                currentIndex === 0 ? 'flex flex-col items-center' : ''
              }`}
            >
              {/* Tag / Eyebrow */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3"
                style={{
                  backgroundColor: 'rgba(var(--web-light-rgb, 189, 217, 98), 0.15)',
                  border: '1px solid rgba(var(--web-light-rgb, 189, 217, 98), 0.3)',
                }}
              >
                <ShieldCheck size={14} color="var(--web-light, #BDD962)" />
                <span
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.7rem',
                    color: 'var(--web-light, #BDD962)',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {currentSlide.tag}
                </span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: currentIndex === 0 ? 'clamp(1.5rem, 3.2vw, 2.35rem)' : 'clamp(1.35rem, 2.8vw, 2.125rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  marginBottom: '0.5rem',
                }}
              >
                {currentSlide.title}
              </h1>

              {/* Slogan */}
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--web-light, #BDD962)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                {currentSlide.slogan}
              </p>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.5,
                  marginBottom: '1.5rem',
                  maxWidth: currentIndex === 0 ? '640px' : '100%',
                }}
              >
                {currentSlide.desc}
              </p>

              {/* Buttons */}
              <div className={`flex flex-wrap items-center gap-3 ${currentIndex === 0 ? 'justify-center' : ''}`}>
                <a
                  href={`https://wa.me/${waNumber}?text=Hola,%20deseo%20mayor%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20MS%26M%20CONSULTING`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-bold transition-all duration-200 shadow-md"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    backgroundColor: 'var(--web-light, #BDD962)',
                    color: '#0A0A0A',
                    fontSize: '0.8125rem',
                  }}
                >
                  Solicitar Asesoría <ArrowRight size={16} />
                </a>

                <Link
                  href="/cursos"
                  className="no-underline inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    fontSize: '0.8125rem',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  Ver Cursos
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/60 text-white/80 hover:text-white hover:bg-slate-900/90 transition-all border border-white/10 backdrop-blur-sm cursor-pointer hidden md:flex"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/60 text-white/80 hover:text-white hover:bg-slate-900/90 transition-all border border-white/10 backdrop-blur-sm cursor-pointer hidden md:flex"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Diapositiva ${i + 1}`}
            className="transition-all duration-300 rounded-full cursor-pointer border-none"
            style={{
              width: currentIndex === i ? '32px' : '10px',
              height: '10px',
              backgroundColor: currentIndex === i ? 'var(--web-light, #BDD962)' : 'rgba(255, 255, 255, 0.35)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
