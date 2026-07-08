import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

import { homeSoluciones } from '../homeContent'
import { daCardPadding, daType, sectionPadding, sectionWrap } from '../homeTheme'

export default function HomeSolucionesSection() {
  return (
    <section id="soluciones" style={{ backgroundColor: '#F4F7FB', padding: sectionPadding }}>
      <div style={sectionWrap}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ ...daType.sectionTitle, marginBottom: '0.875rem' }}>{homeSoluciones.title}</h2>
          <p style={{ ...daType.sectionSubtitle, maxWidth: 600, margin: '0 auto' }}>{homeSoluciones.subtitle}</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}
        >
          {homeSoluciones.cards.map(card => (
            <div
              key={card.title}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(15,23,42,0.06)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div style={{ position: 'relative', height: 160 }}>
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
                    bottom: '1rem',
                    left: '1.125rem',
                    right: '1.125rem',
                    ...daType.cardTitle,
                    fontWeight: 800,
                    fontSize: '0.9375rem',
                    color: '#ffffff',
                    letterSpacing: '0.04em',
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>
              </div>

              <div style={{ padding: daCardPadding, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ ...daType.cardBody, color: '#475569', margin: '0 0 1.25rem', flex: 1 }}>{card.description}</p>

                <Link
                  href={card.href}
                  className="no-underline inline-flex items-center gap-1"
                  style={{ ...daType.link, color: card.color }}
                >
                  {card.ctaLabel} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
