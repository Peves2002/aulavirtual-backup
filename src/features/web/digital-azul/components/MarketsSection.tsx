'use client'

import Link from 'next/link'

import { ArrowRight, Building2, Landmark, User } from 'lucide-react'

import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { eyebrow, sectionH2, sectionDesc, cardTitle, cardBody, smallText } from '@/features/web/home/components/typography'
import { digitalAzulMarkets } from '@/features/web/digital-azul/data/digitalAzulContent'

const ICONS = {
  publico: Landmark,
  privado: Building2,
  individual: User,
} as const

export default function MarketsSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem', borderTop: '1px solid hsl(214, 20%, 92%)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <p style={{ ...eyebrow, display: 'block', textAlign: 'center' }}>Mercados que atendemos</p>
            <h2 style={{ ...sectionH2, textAlign: 'center', marginBottom: '0.75rem' }}>
              Un ecosistema para cada necesidad
            </h2>
            <p style={{ ...sectionDesc, textAlign: 'center' }}>
              Programas institucionales, soluciones corporativas y cursos abiertos, integrados en una misma plataforma tecnológica.
            </p>
          </div>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {digitalAzulMarkets.map((market, i) => {
            const Icon = ICONS[market.id as keyof typeof ICONS]

            return (
              <ScrollReveal key={market.id} delay={i * 0.08}>
                <div
                  style={{
                    height: '100%',
                    backgroundColor: '#f8fafc',
                    borderRadius: '20px',
                    padding: '2rem 1.75rem',
                    border: '1.5px solid hsl(214, 20%, 92%)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement

                    el.style.transform = 'translateY(-6px)'
                    el.style.boxShadow = '0 16px 40px rgba(var(--web-primary-rgb, 37, 146, 127), 0.12)'
                    el.style.borderColor = 'var(--web-primary, #2563EB)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement

                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                    el.style.borderColor = 'hsl(214, 20%, 92%)'
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(var(--web-primary-rgb, 37, 146, 127), 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <Icon size={24} color="var(--web-primary, #2563EB)" />
                  </div>

                  <p style={{ ...smallText, color: 'var(--web-primary, #2563EB)', fontWeight: 700, marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {market.subtitle}
                  </p>
                  <h3 style={{ ...cardTitle, fontSize: '1.125rem', marginBottom: '0.75rem' }}>{market.title}</h3>
                  <p style={{ ...cardBody, marginBottom: '1.25rem', flex: 1 }}>{market.description}</p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {market.examples.map(example => (
                      <li
                        key={example}
                        style={{
                          ...smallText,
                          color: '#64748b',
                          paddingLeft: '0.875rem',
                          position: 'relative',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: '0.45em',
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--web-primary, #2563EB)',
                          }}
                        />
                        {example}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={market.cta.href}
                    className="no-underline inline-flex items-center gap-2"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: 'var(--web-primary, #2563EB)',
                    }}
                  >
                    {market.cta.label} <ArrowRight size={16} />
                  </Link>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
