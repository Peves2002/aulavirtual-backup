import Image from 'next/image'

import { Monitor, Shield, Users } from 'lucide-react'

import { homeWhy } from '../homeContent'
import { daCardPadding, daType, sectionPadding, sectionWrap } from '../homeTheme'

const ICONS = { shield: Shield, monitor: Monitor, users: Users } as const

export default function HomeWhySection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: sectionPadding }}>
      <div style={sectionWrap}>
        <h2
          style={{
            ...daType.sectionTitle,
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}
        >
          {homeWhy.eyebrow}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            alignItems: 'stretch',
            marginBottom: '3rem',
          }}
          className="home-why-grid"
        >
          {homeWhy.items.map(item => {
            const Icon = ICONS[item.icon as keyof typeof ICONS]

            return (
              <div
                key={item.title}
                style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FAFBFC',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ position: 'relative', height: 180, flexShrink: 0 }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:768px) 100vw, 360px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(to top, ${item.color}cc 0%, transparent 55%)`,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '1rem',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  >
                    <Icon size={24} color="#ffffff" strokeWidth={2} />
                  </div>
                </div>

                <div style={{ padding: daCardPadding, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ ...daType.cardTitle, marginBottom: '0.875rem' }}>{item.title}</h3>
                  <p style={{ ...daType.cardBody, margin: 0, flex: 1 }}>{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {homeWhy.cta && (
          <div style={{ textAlign: 'center' }}>
            <a
              href={homeWhy.cta.href}
              className="no-underline inline-flex items-center gap-2 transition-opacity hover:opacity-90"
              style={{
                ...daType.link,
                fontSize: '1rem',
                color: '#ffffff',
                backgroundColor: 'var(--color-primary, #092e67)',
                padding: '0.875rem 1.5rem',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              }}
            >
              {homeWhy.cta.label}
            </a>
          </div>
        )}

        <style>{`
          @media (max-width: 768px) {
            .home-why-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
