import Link from 'next/link'

import { ArrowRight, FileText, BookOpen, Download, Lightbulb } from 'lucide-react'

import InstitutionalHero from '@/features/web/digital-azul/components/InstitutionalHero'
import { digitalAzulBrand } from '@/features/web/digital-azul/data/digitalAzulContent'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { cardTitle, cardBody } from '@/features/web/home/components/typography'

const resourceTypes = [
  {
    icon: FileText,
    title: 'Artículos',
    description: 'Contenidos especializados sobre aprendizaje, capacitación y desarrollo de competencias.',
  },
  {
    icon: BookOpen,
    title: 'Guías',
    description: 'Material práctico para implementar programas formativos en organizaciones.',
  },
  {
    icon: Download,
    title: 'Plantillas',
    description: 'Recursos descargables para planificar y ejecutar iniciativas de formación.',
  },
  {
    icon: Lightbulb,
    title: 'Materiales gratuitos',
    description: 'Contenido de valor para conocer nuestra propuesta antes de contratar un programa.',
  },
]

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
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            {resourceTypes.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    padding: '2rem 1.75rem',
                    border: '1.5px solid hsl(214, 20%, 92%)',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(var(--web-primary-rgb, 37, 99, 235), 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <item.icon size={22} color="var(--web-primary, #2563EB)" />
                  </div>
                  <h3 style={{ ...cardTitle, fontSize: '1.0625rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={cardBody}>{item.description}</p>
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
