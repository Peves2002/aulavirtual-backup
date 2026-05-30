import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import CrecimientoSection from '@/features/web/nosotros/components/CrecimientoSection'
import EquipoSection from '@/features/web/nosotros/components/EquipoSection'
import IsosSection from '@/features/web/nosotros/components/IsosSection'
import { MisionVisionSection, ValoresSection } from '@/features/web/nosotros/components/NosotrosInteractive'

export const metadata = {
  title: 'Nosotros - Aula Virtual',
  description: 'Conoce quiénes somos, nuestra misión, visión y los valores que guían nuestra plataforma educativa.',
}


export default async function NosotrosPage() {
  return (
    <>
      {/* ── 1. HERO SOBRE NOSOTROS ─────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 45%, var(--web-dark-mid, #0f4438) 100%)',
          minHeight: 'calc(100vh - var(--navbar-height))',
          padding: '2rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
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

        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              alignItems: 'stretch',
            }}
          >
            {/* Left: stats visual */}
            <ScrollReveal direction="left">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', minHeight: 'clamp(400px, calc(100vh - var(--navbar-height) - 4rem), 800px)' }}>

                {/* Card principal */}
                <div
                  style={{
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1.5px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(16px)',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg,var(--web-dark, #025E44),var(--web-primary, #25927F))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.75rem' }}>
                    🎓
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Plataforma educativa</div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>Formación profesional</div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'var(--web-light, #BDD962)', fontWeight: 600 }}>especializada y certificada</div>
                  </div>
                </div>

                {/* Video en lugar de las 4 stats */}
                <div
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1.5px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                    flex: 1,
                    minHeight: 0,
                  }}
                >
                  <iframe
                    src="https://www.youtube.com/embed/BMb2s8hBaio?autoplay=1&mute=1&rel=0&modestbranding=1"
                    title="Video Grupo Ollarves"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ display: 'block', width: '100%', height: '100%', border: 'none' }}
                  />
                </div>

                {/* Certificado badge */}
                <div
                  style={{
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(var(--web-light-rgb, 189, 217, 98),0.12) 0%, rgba(var(--web-primary-rgb, 37, 146, 127),0.12) 100%)',
                    border: '1.5px solid rgba(var(--web-light-rgb, 189, 217, 98),0.25)',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                  }}
                >
                  <div style={{ fontSize: '1.75rem', flexShrink: 0 }}>📜</div>
                  <div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 700, color: 'var(--web-light, #BDD962)', lineHeight: 1 }}>Certificados válidos para el sector privado y público</div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>Reconocidos por las principales entidades del país</div>
                  </div>
                </div>

              </div>
            </ScrollReveal>

            {/* Right: text */}
            <ScrollReveal direction="right" delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 'clamp(400px, calc(100vh - var(--navbar-height) - 4rem), 800px)' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'rgba(var(--web-light-rgb, 189, 217, 98),0.12)',
                    border: '1px solid rgba(var(--web-light-rgb, 189, 217, 98),0.25)',
                    borderRadius: '999px',
                    padding: '0.375rem 1rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--web-light, #BDD962)', boxShadow: '0 0 6px var(--web-light, #BDD962)' }} />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'var(--web-light, #BDD962)', fontWeight: 600 }}>
                    Sobre nosotros
                  </span>
                </div>

                <h1
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.15,
                    marginBottom: '1.25rem',
                  }}
                >
                  Somos calidad y{' '}
                  <span style={{ color: 'var(--web-light, #BDD962)' }}>responsabilidad</span>{' '}
                  a tu servicio
                </h1>

                <p
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.75,
                    maxWidth: '480px',
                    marginBottom: '2.5rem',
                  }}
                >
                  Empresa con más de 10 años de experiencia en investigación, construcción y minería. En 2021 inició su expansión nacional abriendo sedes en las principales ciudades del Perú.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link
                    href="/cursos"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.875rem 1.75rem',
                      borderRadius: '12px',
                      backgroundColor: 'var(--web-light, #BDD962)',
                      color: '#0A0A0A',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      textDecoration: 'none',
                      boxShadow: '0 4px 20px rgba(var(--web-light-rgb, 189, 217, 98),0.35)',
                    }}
                  >
                    Ver cursos <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/contacto"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.875rem 1.75rem',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      color: '#ffffff',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      textDecoration: 'none',
                      border: '1.5px solid rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    Trabaja con nosotros
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 2. BANNER ISO ─────────────────────────────── */}
      {/* <section
        style={{
          backgroundColor: '#0A0A0A',
          padding: '2.5rem 1.5rem',
          borderTop: '1px solid rgba(var(--web-primary-rgb, 37, 146, 127),0.2)',
          borderBottom: '1px solid rgba(var(--web-primary-rgb, 37, 146, 127),0.2)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: 'rgba(var(--web-primary-rgb, 37, 146, 127),0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1.5px solid rgba(var(--web-primary-rgb, 37, 146, 127),0.3)', flexShrink: 0,
            }}
          >
            <Award size={28} color="var(--web-primary, #25927F)" />
          </div>
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
              Calidad certificada:{' '}
              <span style={{ color: 'var(--web-light, #BDD962)' }}>ISO 9001:2015</span> e{' '}
              <span style={{ color: 'var(--web-light, #BDD962)' }}>ISO 21001:2018</span>
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
              Comprometidos con los más altos estándares de calidad educativa y de gestión
            </div>
          </div>
        </div>
      </section> */}

      {/* ── 3. MISIÓN / VISIÓN (client component) ─────── */}
      <MisionVisionSection />

      {/* ── 4. VALORES (client component) ─────────────── */}
      <ValoresSection />

      {/* ── 5. ISOS ───────────────────────────────────── */}
      <IsosSection />

      {/* ── 6. CRECIMIENTO ────────────────────────────── */}
      <CrecimientoSection />

      {/* ── 7. EQUIPO ─────────────────────────────────── */}
      <EquipoSection />
    </>
  )
}
