import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

import type { FeaturedProgram } from '../getFeaturedPrograms'
import { daCardPadding, daColors, daType, sectionPadding, sectionWrap } from '../homeTheme'

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
            <h2 style={{ ...daType.sectionTitle, margin: '0 0 0.625rem' }}>PROGRAMAS DESTACADOS</h2>
            <p style={{ ...daType.sectionSubtitle, margin: 0 }}>
              Programas estratégicos disponibles en el Campus Digital Azul.
            </p>
          </div>
          <Link
            href="/cursos"
            className="no-underline inline-flex items-center gap-1 flex-shrink-0"
            style={{ ...daType.link, color: daColors.blue }}
          >
            Ver todos los programas <ArrowRight size={16} />
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
          {programs.map(item => (
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
              <div style={{ position: 'relative', height: 160, flexShrink: 0 }}>
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

              <div style={{ padding: daCardPadding, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ ...daType.cardTitle, marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ ...daType.cardBody, margin: '0 0 0.875rem', flex: 1 }}>{item.description}</p>
                <Link
                  href={item.href}
                  className="no-underline inline-flex items-center gap-1"
                  style={{ ...daType.link, fontSize: '0.875rem', color: item.color }}
                >
                  Ver programa <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
