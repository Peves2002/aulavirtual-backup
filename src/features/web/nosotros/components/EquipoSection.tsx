'use client'

import { useState } from 'react'

import Image from 'next/image'

import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const FOTOS = [
  'IMG_4077', 'IMG_4097', 'IMG_4098', 'IMG_4099', 'IMG_4100', 'IMG_4101',
  'IMG_4420', 'IMG_4421', 'IMG_4422', 'IMG_4423', 'IMG_4425', 'IMG_4427',
  'IMG_4428', 'IMG_4429', 'IMG_4430', 'IMG_4431', 'IMG_4432', 'IMG_4433',
  'IMG_4434', 'IMG_4435', 'IMG_4436', 'IMG_4437', 'IMG_4438', 'IMG_4439',
  'IMG_4440', 'IMG_4441', 'IMG_4442', 'IMG_4443', 'IMG_4444', 'IMG_4445',
].map(name => `/images/equipo/jpg/${name}.jpg`)

export default function EquipoSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

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
            {/* Cerrar */}
            <button
              onClick={() => setLightboxIndex(null)}
              style={{ position: 'fixed', top: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', cursor: 'pointer', padding: '8px', color: '#fff', display: 'flex', alignItems: 'center', zIndex: 1302 }}
            >
              <X size={22} />
            </button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prev() }}
              style={{ position: 'fixed', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', cursor: 'pointer', padding: '10px', color: '#fff', display: 'flex', alignItems: 'center', zIndex: 1302 }}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Imagen */}
            <div style={{ position: 'relative', width: '90vw', height: '85vh', maxWidth: '1000px' }}>
              <Image
                src={FOTOS[lightboxIndex]}
                alt={`Equipo ${lightboxIndex + 1}`}
                fill
                style={{ objectFit: 'contain' }}
                sizes="90vw"
              />
            </div>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); next() }}
              style={{ position: 'fixed', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', cursor: 'pointer', padding: '10px', color: '#fff', display: 'flex', alignItems: 'center', zIndex: 1302 }}
            >
              <ChevronRight size={28} />
            </button>

            {/* Contador */}
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

        {/* Grid de fotos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '0.75rem',
        }}>
          {FOTOS.map((src, i) => (
            <div
              key={src}
              onClick={() => setLightboxIndex(i)}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(2,94,68,0.2)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)' }}
            >
              <Image
                src={src}
                alt={`Equipo ${i + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
