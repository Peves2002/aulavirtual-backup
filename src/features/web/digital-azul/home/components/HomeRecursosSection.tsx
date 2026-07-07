import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

import { homeRecursos } from '../homeContent'
import { daFont, sectionPadding, sectionWrap } from '../homeTheme'

export default function HomeRecursosSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: sectionPadding }}>
      <div style={sectionWrap}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: daFont,
                fontWeight: 800,
                fontSize: 'clamp(1.25rem, 3vw, 1.625rem)',
                color: '#0F172A',
                letterSpacing: '0.02em',
                margin: '0 0 0.5rem',
              }}
            >
              {homeRecursos.title}
            </h2>
            <p style={{ fontFamily: daFont, fontSize: '0.875rem', color: '#64748B', margin: 0, maxWidth: 480, lineHeight: 1.6 }}>
              {homeRecursos.subtitle}
            </p>
          </div>
          <Link
            href="/recursos"
            className="no-underline inline-flex items-center gap-1 flex-shrink-0"
            style={{ fontFamily: daFont, fontSize: '0.8125rem', fontWeight: 700, color: '#0B3A82' }}
          >
            Ver todos los recursos <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            alignItems: 'stretch',
          }}
        >
          {homeRecursos.items.map(item => (
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
              <div style={{ position: 'relative', height: 120, flexShrink: 0 }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 100vw, 280px"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to top, ${item.color}cc 0%, transparent 55%)`,
                  }}
                />
                <h3
                  style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    left: '1rem',
                    right: '1rem',
                    fontFamily: daFont,
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
              </div>

              <div style={{ padding: '1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p
                  style={{
                    fontFamily: daFont,
                    fontSize: '0.8125rem',
                    color: '#64748B',
                    margin: '0 0 0.75rem',
                    lineHeight: 1.5,
                    flex: 1,
                  }}
                >
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="no-underline inline-flex items-center gap-1"
                  style={{ fontFamily: daFont, fontSize: '0.75rem', fontWeight: 700, color: item.color }}
                >
                  {item.linkLabel} <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
