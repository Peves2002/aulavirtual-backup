'use client'

import { Award, BarChart3, Globe, GraduationCap, Settings } from 'lucide-react'

import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { eyebrowDark, sectionH2Dark, sectionDescDark, cardTitle, cardBody } from '@/features/web/home/components/typography'
import { digitalAzulEcosystem } from '@/features/web/digital-azul/data/digitalAzulContent'

const ICON_MAP = {
  Globe,
  GraduationCap,
  Settings,
  Award,
  BarChart3,
} as const

export default function EcosystemSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, var(--web-dark-deep, #0f172a) 0%, var(--web-dark, #1E40AF) 50%, var(--web-dark-mid, #1e3a8a) 100%)',
        padding: '5rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <p style={{ ...eyebrowDark, display: 'block', textAlign: 'center' }}>Ecosistema Digital Azul</p>
            <h2 style={{ ...sectionH2Dark, textAlign: 'center', marginBottom: '0.75rem' }}>
              Todo integrado, todo conectado
            </h2>
            <p style={{ ...sectionDescDark, textAlign: 'center' }}>
              Cinco componentes que funcionan de manera integrada para gestionar programas, participantes y resultados.
            </p>
          </div>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {digitalAzulEcosystem.map((item, i) => {
            const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP]

            return (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1.5px solid rgba(255,255,255,0.1)',
                    borderRadius: '18px',
                    padding: '1.75rem 1.5rem',
                    backdropFilter: 'blur(12px)',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(var(--web-light-rgb, 56, 189, 248), 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <Icon size={22} color="var(--web-light, #38BDF8)" />
                  </div>
                  <h3 style={{ ...cardTitle, color: '#ffffff', fontSize: '1rem', marginBottom: '0.625rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ ...cardBody, color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem' }}>
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
