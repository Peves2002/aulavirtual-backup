import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

import { homeRecursos } from '../homeContent'
import { daCardPadding, daColors, daType, sectionPadding, sectionWrap } from '../homeTheme'

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
            <h2 style={{ ...daType.sectionTitle, margin: '0 0 0.625rem' }}>{homeRecursos.title}</h2>
            <p style={{ ...daType.sectionSubtitle, margin: 0, maxWidth: 520 }}>{homeRecursos.subtitle}</p>
          </div>
          <Link
            href="/recursos"
            className="no-underline inline-flex items-center gap-1 flex-shrink-0"
            style={{ ...daType.link, color: daColors.blue }}
          >
            Ver todos los recursos <ArrowRight size={16} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}
        >
          {homeRecursos.items.map(item => (
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
              <div style={{ position: 'relative', height: 140, flexShrink: 0 }}>
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
                    bottom: '1rem',
                    left: '1.125rem',
                    right: '1.125rem',
                    ...daType.cardTitle,
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
              </div>

              <div style={{ padding: daCardPadding, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ ...daType.cardBody, margin: '0 0 0.875rem', flex: 1 }}>{item.description}</p>
                <Link
                  href={item.href}
                  className="no-underline inline-flex items-center gap-1"
                  style={{ ...daType.link, fontSize: '0.875rem', color: item.color }}
                >
                  {item.linkLabel} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
