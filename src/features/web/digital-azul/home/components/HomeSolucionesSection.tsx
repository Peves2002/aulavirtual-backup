import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

import { homeSoluciones } from '../homeContent'
import { daFont, sectionPadding, sectionWrap } from '../homeTheme'

export default function HomeSolucionesSection() {
  return (
    <section id="soluciones" style={{ backgroundColor: '#F4F7FB', padding: sectionPadding }}>
      <div style={sectionWrap}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: daFont,
              fontWeight: 800,
              fontSize: 'clamp(1.375rem, 3vw, 1.75rem)',
              color: '#0F172A',
              letterSpacing: '0.02em',
              marginBottom: '0.75rem',
            }}
          >
            {homeSoluciones.title}
          </h2>
          <p style={{ fontFamily: daFont, fontSize: '0.9375rem', color: '#64748B', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            {homeSoluciones.subtitle}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}
        >
          {homeSoluciones.cards.map(card => (
            <div
              key={card.title}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(15,23,42,0.06)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div style={{ position: 'relative', height: 140 }}>
                <Image src={card.image} alt={card.title} fill sizes="(max-width:768px) 100vw, 280px" style={{ objectFit: 'cover' }} />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to top, ${card.color}cc 0%, transparent 60%)`,
                  }}
                />
                <h3
                  style={{
                    position: 'absolute',
                    bottom: '0.875rem',
                    left: '1rem',
                    right: '1rem',
                    fontFamily: daFont,
                    fontWeight: 800,
                    fontSize: '0.8125rem',
                    color: '#ffffff',
                    letterSpacing: '0.04em',
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>
              </div>

              <div style={{ padding: '1.25rem 1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p
                  style={{
                    fontFamily: daFont,
                    fontSize: '0.8125rem',
                    color: '#475569',
                    lineHeight: 1.65,
                    margin: '0 0 1.25rem',
                    flex: 1,
                  }}
                >
                  {card.description}
                </p>

                <Link
                  href={card.href}
                  className="no-underline inline-flex items-center gap-1"
                  style={{
                    fontFamily: daFont,
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: card.color,
                  }}
                >
                  {card.ctaLabel} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
