'use client'

import Image from 'next/image'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { eyebrow, sectionH2, sectionDesc } from '@/features/web/home/components/typography'

const images = [
  'IMG_4794.JPG', 'IMG_4828.JPG', 'IMG_4860.JPG', 'IMG_4873.JPG',
  'IMG_4877.JPG', 'IMG_4881.JPG', 'IMG_4882.JPG', 'IMG_4887.JPG',
  'IMG_4897.JPG', 'IMG_4899.JPG', 'IMG_4904.JPG', 'IMG_4906.JPG',
  'IMG_4914.JPG', 'IMG_4918.JPG', 'IMG_4927.JPG', 'IMG_4933.JPG',
  'IMG_4936.JPG', 'IMG_4937.JPG', 'IMG_4953.JPG', 'IMG_4957.JPG'
]

export default function NuestroEquipoSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem', borderBottom: '1px solid hsl(214,20%,92%)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ ...eyebrow, display: 'block', textAlign: 'center' }}>
              MS&M Consulting
            </p>
            <h2 style={{ ...sectionH2, textAlign: 'center', marginBottom: '0.75rem' }}>
              Nuestro Equipo
            </h2>
            <p style={{ ...sectionDesc, textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              Conoce a los profesionales comprometidos y apasionados que hacen posible nuestro éxito y el de nuestros clientes, día tras día.
            </p>
          </div>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem',
          }}
        >
          {images.map((img, i) => (
            <ScrollReveal key={i} delay={(i % 4) * 0.05} direction="up">
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '1',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  border: '1px solid hsl(214,20%,92%)',
                  cursor: 'pointer',
                }}
                className="group"
              >
                <Image
                  src={`/images/equipo/${img}`}
                  alt={`Equipo MS&M ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
