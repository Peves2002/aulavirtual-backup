import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

import { homeCasosExito } from '../homeContent'
import { daCardPadding, daColors, daType, sectionPadding, sectionWrap } from '../homeTheme'

export default function HomeCasosExitoSection() {
  return (
    <section style={{ backgroundColor: '#F4F7FB', padding: sectionPadding }}>
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
            <h2 style={{ ...daType.sectionTitle, margin: '0 0 0.625rem' }}>CASOS DE ÉXITO</h2>
            <p style={{ ...daType.sectionSubtitle, margin: 0, maxWidth: 520 }}>
              Experiencias, resultados y entidades que confían en nuestras soluciones de aprendizaje.
            </p>
          </div>
          <Link
            href="/casos-de-exito"
            className="no-underline inline-flex items-center gap-1 flex-shrink-0"
            style={{ ...daType.link, color: daColors.blue }}
          >
            Ver todos los casos <ArrowRight size={16} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}
        >
          {homeCasosExito.map(caso => (
            <Link
              key={caso.title}
              href="/casos-de-exito"
              className="no-underline overflow-hidden rounded-xl"
              style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 12px rgba(15,23,42,0.06)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div style={{ position: 'relative', height: 150, flexShrink: 0 }}>
                <Image src={caso.image} alt={caso.title} fill sizes="240px" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: daCardPadding, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p
                  style={{
                    ...daType.cardBodySm,
                    fontWeight: 700,
                    color: daColors.teal,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    margin: '0 0 0.5rem',
                  }}
                >
                  {caso.result}
                </p>
                <p style={{ ...daType.cardTitle, margin: '0 0 0.5rem' }}>{caso.title}</p>
                <p
                  style={{
                    ...daType.cardBodySm,
                    fontWeight: 600,
                    color: daColors.blue,
                    margin: '0 0 0.625rem',
                  }}
                >
                  {caso.client}
                </p>
                <p
                  style={{
                    ...daType.cardBody,
                    margin: 0,
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  } as React.CSSProperties}
                >
                  {caso.testimonial}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
