'use client'

import Image from 'next/image'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { eyebrow, sectionH2, sectionDesc } from '@/features/web/home/components/typography'

const badges = [
  'Especialistas en Higiene Ocupacional.png',
  'Especialistas en Monitoreo Ocupacional.png',
  'Especialistas en SSOMA.png',
  'Especialistas en SST Y SO.png',
  'Especialistas en SST e Higiene Ocupacional.png',
  'Especialistas en SST e IA.png',
  'especialista-en-salud.png'
]

export default function EquipoEspecializadoSection() {
  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ ...eyebrow, display: 'block', textAlign: 'center' }}>
              MS&M Consulting
            </p>
            <h2 style={{ ...sectionH2, textAlign: 'center', marginBottom: '0.75rem' }}>
              Nuestro Equipo Especializado
            </h2>
            <p style={{ ...sectionDesc, textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              Contamos con especialistas en diversas áreas de seguridad, salud ocupacional, monitoreo e higiene industrial.
            </p>
          </div>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            justifyItems: 'center',
          }}
        >
          {badges.map((badge, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="up">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '350px',
                  aspectRatio: '1',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid hsl(214,20%,91%)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                className="hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(37,146,127,0.15)] group"
              >
                <Image
                  src={`/images/equipo-especializado/${badge}`}
                  alt={badge.replace('.png', '')}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
