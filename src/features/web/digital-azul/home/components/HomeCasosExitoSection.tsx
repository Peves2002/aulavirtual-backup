import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

import { homeCasosExito } from '../homeContent'
import { daColors, daFont, sectionPadding, sectionWrap } from '../homeTheme'

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
              CASOS DE ÉXITO
            </h2>
            <p style={{ fontFamily: daFont, fontSize: '0.875rem', color: '#64748B', margin: 0, maxWidth: 480, lineHeight: 1.6 }}>
              Experiencias, resultados y entidades que confían en nuestras soluciones de aprendizaje.
            </p>
          </div>
          <Link
            href="/casos-de-exito"
            className="no-underline inline-flex items-center gap-1 flex-shrink-0"
            style={{ fontFamily: daFont, fontSize: '0.8125rem', fontWeight: 700, color: daColors.blue }}
          >
            Ver todos los casos <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
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
              <div style={{ position: 'relative', height: 130, flexShrink: 0 }}>
                <Image src={caso.image} alt={caso.title} fill sizes="240px" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1rem 1.125rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p
                  style={{
                    fontFamily: daFont,
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: daColors.teal,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    margin: '0 0 0.375rem',
                  }}
                >
                  {caso.result}
                </p>
                <p
                  style={{
                    fontFamily: daFont,
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    lineHeight: 1.35,
                    margin: '0 0 0.375rem',
                  }}
                >
                  {caso.title}
                </p>
                <p
                  style={{
                    fontFamily: daFont,
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: daColors.blue,
                    margin: '0 0 0.5rem',
                  }}
                >
                  {caso.client}
                </p>
                <p
                  style={{
                    fontFamily: daFont,
                    fontSize: '0.75rem',
                    color: '#64748B',
                    lineHeight: 1.5,
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
