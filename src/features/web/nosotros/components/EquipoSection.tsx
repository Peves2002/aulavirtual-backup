'use client'

import { useState } from 'react'

import Image from 'next/image'

import { Briefcase } from 'lucide-react'

const FOTOS = [
  {
    src: '/images/equipo/Administración.png',
    area: 'Administración',
    descripcion: 'Equipo comprometido con la excelencia y el desarrollo estratégico de nuestra institución.',
  },
  {
    src: '/images/equipo/Contabilidad.png',
    area: 'Contabilidad',
    descripcion: 'Profesionales dedicados a brindar soluciones educativas de alto impacto para nuestros estudiantes.',
  },
  {
    src: '/images/equipo/Dirección Comercial.png',
    area: 'Dirección Comercial',
    descripcion: 'Talento humano que impulsa cada día la visión y misión de nuestra organización educativa.',
  },
  {
    src: '/images/equipo/Marketing.png',
    area: 'Marketing',
    descripcion: 'Colaboradores que hacen posible la transformación educativa y el crecimiento de nuestra comunidad.',
  },
  {
    src: '/images/equipo/Recursos Humanos.png',
    area: 'Recursos Humanos',
    descripcion: 'Líderes comprometidos con la calidad, la innovación y el futuro de la educación en el país.',
  },
  {
    src: '/images/equipo/Área Legal.png',
    area: 'Área Legal',
    descripcion: 'Profesionales que fortalecen nuestra cultura organizacional y el bienestar de nuestra comunidad.',
  },
]

export default function EquipoSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1.5rem', borderTop: '1px solid hsl(214,20%,92%)' }}>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(var(--web-dark-rgb,2,94,68),0.08)', border: '1px solid rgba(var(--web-dark-rgb,2,94,68),0.2)', borderRadius: '999px', padding: '0.375rem 1rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'var(--web-dark, #025E44)', fontWeight: 600 }}>Galería</span>
          </div>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.25, margin: 0 }}>
            Nuestro <span style={{ color: 'var(--web-dark, #025E44)' }}>Equipo</span>
          </h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem', color: '#64748b', lineHeight: 1.7, marginTop: '0.75rem', maxWidth: '520px' }}>
            Conoce a las personas que trabajan cada día para hacer posible nuestra misión educativa.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {FOTOS.map((foto, i) => (
            <div
              key={foto.src}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transform: hoveredIndex === i ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <Image
                src={foto.src}
                alt={`Equipo corporativo ${i + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
              />

              {/* Overlay hover */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(var(--web-dark-rgb,2,94,68),0.95) 0%, rgba(var(--web-dark-rgb,2,94,68),0.6) 50%, transparent 100%)',
                opacity: hoveredIndex === i ? 1 : 0,
                transition: 'opacity 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.25rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <Briefcase size={13} color="var(--web-light, #BDD962)" />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: 'var(--web-light, #BDD962)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {foto.area}
                  </span>
                </div>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, margin: 0 }}>
                  {foto.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
