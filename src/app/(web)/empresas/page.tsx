import { notFound } from 'next/navigation'

import ProblemSection from '@/features/web/home/components/ProblemSection'
import SolutionSection from '@/features/web/home/components/SolutionSection'
import ServicesSection from '@/features/web/home/components/ServicesSection'
import WorkModelsSection from '@/features/web/home/components/WorkModelsSection'
import ResultsSection from '@/features/web/home/components/ResultsSection'
import TargetAudienceSection from '@/features/web/home/components/TargetAudienceSection'
import DiferencialSection from '@/features/web/home/components/DiferencialSection'
import FinalCTASection from '@/features/web/home/components/FinalCTASection'
import { getConfig } from '@/utils/libs/config'

export const metadata = {
  title: 'Soluciones Corporativas - Aula Virtual',
  description: 'Descubre nuestros planes corporativos y capacita a tu equipo con los mejores profesionales del sector.',
}

export default async function EmpresasPage() {
  const habilitado = await getConfig('WEB_EMPRESAS_HABILITADO', 'true')

  if (habilitado !== 'true') notFound()

  return (
    <>
      {/* ── 1. HERO EMPRESAS ─────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 45%, var(--web-dark-mid, #0f4438) 100%)',
          padding: '6rem 1.5rem 5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Glow */}
        <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--web-primary-rgb, 37, 146, 127),0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1.5rem',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(var(--web-light-rgb, 189, 217, 98),0.12)',
                border: '1px solid rgba(var(--web-light-rgb, 189, 217, 98),0.25)',
                borderRadius: '999px',
                padding: '0.375rem 1rem',
                marginBottom: '0.5rem',
              }}
            >
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--web-light, #BDD962)', boxShadow: '0 0 6px var(--web-light, #BDD962)' }} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'var(--web-light, #BDD962)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ENFOQUE EN RESULTADOS
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              Capacita a tu equipo y lleva tu empresa turística al <span style={{ color: 'var(--web-light, #BDD962)' }}>siguiente nivel</span>
            </h1>

            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.125rem',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.75,
                marginBottom: '1rem',
              }}
            >
              Programas de formación diseñados para agencias de viaje, operadores turísticos y empresas del sector que buscan vender más, mejorar su servicio y crecer de forma sostenible.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
              <a
                href="#form"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  backgroundColor: 'var(--web-light, #BDD962)',
                  color: 'var(--web-dark, #025E44)',
                  borderRadius: '12px',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(189, 217, 98, 0.3)',
                }}
              >
                Solicitar asesoría
              </a>
              <a
                href="https://wa.me/51928510125?text=Hola,%20me%20gustar%C3%ADa%20hablar%20sobre%20programas%20para%20empresas."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SECCIONES CORRESPONDIENTES ─────────────── */}
      <ProblemSection />
      <SolutionSection />
      <ServicesSection />
      <WorkModelsSection />
      <ResultsSection />
      <TargetAudienceSection />
      <DiferencialSection />
      <FinalCTASection />
    </>
  )
}
