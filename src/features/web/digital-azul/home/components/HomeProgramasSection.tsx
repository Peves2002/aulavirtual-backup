import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

import type { FeaturedProgram } from '../getFeaturedPrograms'
import { daFont, sectionPadding, sectionWrap } from '../homeTheme'

type Props = {
  programs: FeaturedProgram[]
}

export default function HomeProgramasSection({ programs }: Props) {
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
              PROGRAMAS DESTACADOS
            </h2>
            <p style={{ fontFamily: daFont, fontSize: '0.875rem', color: '#64748B', margin: 0, lineHeight: 1.6 }}>
              Programas estratégicos disponibles en el Campus Digital Azul.
            </p>
          </div>
          <Link
            href="/cursos"
            className="no-underline inline-flex items-center gap-1 flex-shrink-0"
            style={{ fontFamily: daFont, fontSize: '0.8125rem', fontWeight: 700, color: '#0B3A82' }}
          >
            Ver todos los programas <ArrowRight size={14} />
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
          {programs.map(item => (
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
                    background: `linear-gradient(to top, ${item.color}bb 0%, transparent 60%)`,
                  }}
                />
              </div>

              <div style={{ padding: '1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontFamily: daFont,
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    color: '#0F172A',
                    marginBottom: '0.375rem',
                  }}
                >
                  {item.title}
                </h3>
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
                  Ver programa <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
