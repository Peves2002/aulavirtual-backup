'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import HeroVisual from './HeroVisual'
import HeroInstallButton from './HeroInstallButton'

export default function HeroCarousel() {
  const heroTitle = 'Aprende sin límites,\ncrece sin fronteras'
  const heroDescription = 'Accede a cursos especializados, rutas de aprendizaje y certificaciones diseñadas para impulsar tu carrera profesional.'

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] pt-28 pb-20 lg:pt-32 lg:pb-28">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
        <div style={{ width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(var(--web-primary-rgb, 37, 146, 127),0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4">
        <div style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(var(--web-light-rgb, 189, 217, 98),0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* ── Izquierda: textos y CTA ── */}
          <div className="max-w-2xl">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--web-light, #BDD962)' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--web-light, #BDD962)' }}></span>
              </span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.6875rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
                Nueva plataforma virtual
              </span>
            </div>

            <h1 
              className="mb-6 leading-[1.15]"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}
            >
              {heroTitle.split('\n')[0]}
              <br />
              {heroTitle.split('\n')[1] && (
                <span style={{ color: 'var(--web-light, #BDD962)' }}>{heroTitle.split('\n')[1]}</span>
              )}
            </h1>

            <p 
              className="mb-10"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: '90%' }}
            >
              {heroDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link 
                href="/cursos"
                className="no-underline inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
                style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'var(--web-primary, #25927F)', boxShadow: '0 8px 24px rgba(var(--web-primary-rgb, 37, 146, 127),0.3)' }}
              >
                Ver Cursos <ArrowRight size={18} />
              </Link>
              <HeroInstallButton />
            </div>

            {/* Mini stats */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {[
                { value: '+1,200', label: 'Estudiantes' },
                { value: '+80', label: 'Cursos' },
                { value: '98%', label: 'Satisfacción' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.375rem', fontWeight: 800, color: 'var(--web-light, #BDD962)', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '3px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Derecha: visual interactivo ── */}
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
