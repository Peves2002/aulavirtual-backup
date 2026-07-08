import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

import InstitutionalHero from '@/features/web/digital-azul/components/InstitutionalHero'
import { recursosPageItems } from '@/features/web/digital-azul/home/homeContent'
import { daCardPadding, daType } from '@/features/web/digital-azul/home/homeTheme'
import { digitalAzulBrand } from '@/features/web/digital-azul/data/digitalAzulContent'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { cardBody } from '@/features/web/home/components/typography'

export const metadata = {
  title: `Recursos - ${digitalAzulBrand.name}`,
  description: 'Biblioteca pública de artículos, guías, plantillas y materiales de aprendizaje.',
}

export default function RecursosPage() {
  return (
    <>
      <InstitutionalHero
        badge="Biblioteca pública"
        title={<>Recursos de <span style={{ color: 'var(--web-light, #38BDF8)' }}>aprendizaje</span></>}
        description="Generamos valor antes de la venta con contenidos que fortalecen el posicionamiento institucional de Digital Azul."
      />

      <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
              alignItems: 'stretch',
            }}
          >
            {recursosPageItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1.5px solid hsl(214, 20%, 92%)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 12px rgba(15,23,42,0.04)',
                  }}
                >
                  <div style={{ position: 'relative', height: 180, flexShrink: 0 }}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width:768px) 100vw, 320px"
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
                    <p style={{ ...daType.cardBody, color: '#475569', margin: '0 0 1.25rem', flex: 1 }}>
                      {item.description}
                    </p>
                    <Link
                      href="/contacto"
                      className="no-underline inline-flex items-center gap-1"
                      style={{ ...daType.link, fontSize: '0.875rem', color: item.color }}
                    >
                      Solicitar acceso <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div
              style={{
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '2.5rem',
                border: '1.5px solid hsl(214, 20%, 92%)',
              }}
            >
              <p style={{ ...cardBody, maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                Estamos ampliando nuestra biblioteca de recursos. Suscríbete a nuestros canales o contáctanos para recibir nuevos materiales.
              </p>
              <Link
                href="/contacto"
                className="no-underline inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
                style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'var(--web-primary, #2563EB)' }}
              >
                Solicitar información <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
