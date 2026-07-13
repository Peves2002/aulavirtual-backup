import { notFound } from 'next/navigation'

import CompaniesSection from '@/features/web/home/components/CompaniesSection'
import EnterpriseCTASection from '@/features/web/home/components/EnterpriseCTASection'
import { getConfig, getConfigs } from '@/utils/libs/config'

export const metadata = {
  title: 'Soluciones Corporativas - ADPH Group',
  description: 'Descubre nuestros planes corporativos y capacita a tu equipo con los mejores profesionales del sector.',
}

export default async function EmpresasPage() {
  const habilitado = await getConfig('WEB_EMPRESAS_HABILITADO', 'true')

  if (habilitado !== 'true') notFound()

  const configs = await getConfigs()
  const heroTitle = configs['EMPRESAS_HERO_TITLE']?.trim() || 'Lleva a tu equipo al siguiente nivel'
  const heroDesc = configs['EMPRESAS_HERO_DESC']?.trim() || 'Descubre nuestras soluciones corporativas diseñadas para potenciar las habilidades de tus colaboradores y aumentar la competitividad técnica de tu empresa en el mercado actual.'

  const heroBg = configs['EMPRESAS_HERO_IMAGE']?.trim()
  const heroStyle = {
    background: heroBg ? `url(${heroBg}) center/cover no-repeat` : 'linear-gradient(135deg, #13294D 0%, #1B3A6B 45%, #1B3A6B 100%)',
    padding: '6rem 1.5rem 5rem',
    position: 'relative' as any,
    overflow: 'hidden',
  };

  return (
    <>
      {/* ── 1. HERO EMPRESAS ─────────────────────── */}
      <section style={{ ...heroStyle }}>
        {/* Overlay si hay imagen */}
        {heroBg && <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(19, 41, 77, 0.85)' }} />}
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
        <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,168,197,0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />

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
                backgroundColor: 'rgba(59,168,197,0.12)',
                border: '1px solid rgba(59,168,197,0.25)',
                borderRadius: '999px',
                padding: '0.375rem 1rem',
                marginBottom: '0.5rem',
              }}
            >
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#3BA8C5', boxShadow: '0 0 6px #3BA8C5' }} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#3BA8C5', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Para Empresas
              </span>
            </div>

            <div
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
              className="[&>p]:m-0"
              dangerouslySetInnerHTML={{ __html: heroTitle }}
            />

            <div
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.125rem',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.75,
                marginBottom: '1rem',
              }}
              dangerouslySetInnerHTML={{ __html: heroDesc }}
            />
          </div>
        </div>
      </section>

      {/* ── 2. SECCIONES CORRESPONDIENTES ─────────────── */}
      <CompaniesSection />

      <EnterpriseCTASection />
    </>
  )
}
