import Link from 'next/link'

import { ArrowRight, Quote } from 'lucide-react'

import InstitutionalHero from '@/features/web/digital-azul/components/InstitutionalHero'
import { digitalAzulBrand } from '@/features/web/digital-azul/data/digitalAzulContent'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { cardBody } from '@/features/web/home/components/typography'

const placeholders = [
  {
    title: 'Programas institucionales ejecutados',
    description: 'Resultados de formación en entidades del sector público.',
  },
  {
    title: 'Programas corporativos',
    description: 'Experiencias de empresas que desarrollaron competencias con Digital Azul.',
  },
  {
    title: 'Testimonios de participantes',
    description: 'Historias de personas que avanzaron al siguiente nivel.',
  },
]

export const metadata = {
  title: `Casos de Éxito - ${digitalAzulBrand.name}`,
  description: 'Resultados, programas ejecutados y testimonios que generan confianza y credibilidad.',
}

export default function CasosDeExitoPage() {
  return (
    <>
      <InstitutionalHero
        badge="Credibilidad"
        title={<>Casos de <span style={{ color: 'var(--web-light, #38BDF8)' }}>éxito</span></>}
        description="Conoce resultados obtenidos, programas ejecutados y experiencias de participantes y entidades que confían en Digital Azul."
      />

      <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
            {placeholders.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'flex-start',
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    padding: '1.75rem',
                    border: '1.5px solid hsl(214, 20%, 92%)',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(var(--web-primary-rgb, 37, 99, 235), 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Quote size={20} color="var(--web-primary, #2563EB)" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.0625rem', fontWeight: 700, color: '#0A0A0A', marginBottom: '0.375rem' }}>
                      {item.title}
                    </h3>
                    <p style={cardBody}>{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <p style={{ ...cardBody, marginBottom: '1.5rem' }}>
                Próximamente publicaremos casos detallados. ¿Quieres compartir tu experiencia o conocer referencias?
              </p>
              <Link
                href="/contacto"
                className="no-underline inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
                style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'var(--web-primary, #2563EB)' }}
              >
                Contáctanos <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
