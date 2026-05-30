'use client'

import { useState } from 'react'

import Image from 'next/image'

import { X, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react'

const FOTOS = [
  {
    src: '/images/equipo/jpg/IMG_4077.jpg',
    area: 'Corporativo',
    descripcion: 'Equipo comprometido con la excelencia y el desarrollo estratégico de nuestra institución.',
  },
  {
    src: '/images/equipo/jpg/IMG_4100.jpg',
    area: 'Corporativo',
    descripcion: 'Profesionales dedicados a brindar soluciones educativas de alto impacto para nuestros estudiantes.',
  },
  {
    src: '/images/equipo/jpg/IMG_4425.jpg',
    area: 'Corporativo',
    descripcion: 'Talento humano que impulsa cada día la visión y misión de nuestra organización educativa.',
  },
  {
    src: '/images/equipo/jpg/IMG_4435.jpg',
    area: 'Corporativo',
    descripcion: 'Colaboradores que hacen posible la transformación educativa y el crecimiento de nuestra comunidad.',
  },
  {
    src: '/images/equipo/jpg/IMG_4444.jpg',
    area: 'Corporativo',
    descripcion: 'Líderes comprometidos con la calidad, la innovación y el futuro de la educación en el país.',
  },
  {
    src: '/images/equipo/jpg/IMG_4431.jpg',
    area: 'Corporativo',
    descripcion: 'Profesionales que fortalecen nuestra cultura organizacional y el bienestar de nuestra comunidad.',
  },
]

export default function EquipoSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const prev = () => setLightboxIndex(i => i !== null ? (i - 1 + FOTOS.length) % FOTOS.length : null)
  const next = () => setLightboxIndex(i => i !== null ? (i + 1) % FOTOS.length : null)

  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1.5rem', borderTop: '1px solid hsl(214,20%,92%)' }}>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <>
          <div
            onClick={() => setLightboxIndex(null)}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1300, backdropFilter: 'blur(6px)' }}
          />
          <div style={{ position: 'fixed', inset: 0, zIndex: 1301, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <button onClick={() => setLightboxIndex(null)} style={{ position: 'fixed', top: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', cursor: 'pointer', padding: '8px', color: '#fff', display: 'flex', alignItems: 'center', zIndex: 1302 }}>
              <X size={22} />
            </button>
            <button onClick={e => { e.stopPropagation(); prev() }} style={{ position: 'fixed', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', cursor: 'pointer', padding: '10px', color: '#fff', display: 'flex', zIndex: 1302 }}>
              <ChevronLeft size={28} />
            </button>
            <div style={{ position: 'relative', width: '90vw', height: '85vh', maxWidth: '1000px' }}>
              <Image src={FOTOS[lightboxIndex].src} alt={`Equipo ${lightboxIndex + 1}`} fill style={{ objectFit: 'contain' }} sizes="90vw" />
            </div>
            <button onClick={e => { e.stopPropagation(); next() }} style={{ position: 'fixed', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', cursor: 'pointer', padding: '10px', color: '#fff', display: 'flex', zIndex: 1302 }}>
              <ChevronRight size={28} />
            </button>
            <div style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.5)', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', fontWeight: 600, padding: '4px 14px', borderRadius: '999px', zIndex: 1302 }}>
              {lightboxIndex + 1} / {FOTOS.length}
            </div>
          </div>
        </>
      )}

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(2,94,68,0.08)', border: '1px solid rgba(2,94,68,0.2)', borderRadius: '999px', padding: '0.375rem 1rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#025E44', fontWeight: 600 }}>Galería</span>
          </div>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.25, margin: 0 }}>
            Nuestro <span style={{ color: '#025E44' }}>Equipo</span>
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
              onClick={() => setLightboxIndex(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'relative',
                aspectRatio: '3/2',
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
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
                background: 'linear-gradient(to top, rgba(2,94,68,0.95) 0%, rgba(2,94,68,0.6) 50%, transparent 100%)',
                opacity: hoveredIndex === i ? 1 : 0,
                transition: 'opacity 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.25rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <Briefcase size={13} color="#BDD962" />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#BDD962', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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
