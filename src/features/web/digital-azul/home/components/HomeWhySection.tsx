import Image from 'next/image'

import { Monitor, Shield, Users } from 'lucide-react'

import { homeWhy } from '../homeContent'
import { daFont, sectionPadding, sectionWrap } from '../homeTheme'

const ICONS = { shield: Shield, monitor: Monitor, users: Users } as const

export default function HomeWhySection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: sectionPadding }}>
      <div style={sectionWrap}>
        <p
          style={{
            fontFamily: daFont,
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#94A3B8',
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}
        >
          {homeWhy.eyebrow}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}
          className="home-why-grid"
        >
          {homeWhy.items.map(item => {
            const Icon = ICONS[item.icon as keyof typeof ICONS]

            return (
              <div
                key={item.title}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FAFBFC',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ position: 'relative', height: 160, flexShrink: 0 }}>
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
                      bottom: '0.875rem',
                      left: '1rem',
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  >
                    <Icon size={22} color="#ffffff" strokeWidth={2} />
                  </div>
                </div>

                <div style={{ padding: '1.25rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3
                    style={{
                      fontFamily: daFont,
                      fontWeight: 700,
                      fontSize: '1.0625rem',
                      color: '#0F172A',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: daFont,
                      fontSize: '0.875rem',
                      color: '#64748B',
                      lineHeight: 1.7,
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
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
