import Image from 'next/image'

import { notFound } from 'next/navigation'

import { Users, BookOpen, Award, BarChart3 } from 'lucide-react'

import CompaniesSection from '@/features/web/home/components/CompaniesSection'
import EnterpriseCTASection from '@/features/web/home/components/EnterpriseCTASection'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { getConfig } from '@/utils/libs/config'

export const metadata = {
  title: 'Soluciones Corporativas',
  description: 'Descubre nuestros planes corporativos y capacita a tu equipo con los mejores profesionales del sector.',
}

const PROCESS_STEPS = [
  {
    number: '01',
    icon: Users,
    title: 'Diagnóstico',
    description: 'Analizamos las necesidades de capacitación de tu equipo y definimos los objetivos de aprendizaje.',
  },
  {
    number: '02',
    icon: BookOpen,
    title: 'Plan Personalizado',
    description: 'Diseñamos un programa formativo a medida con contenidos relevantes para tu industria.',
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'Implementación',
    description: 'Ejecutamos la capacitación con acceso a nuestra plataforma, seguimiento y soporte continuo.',
  },
  {
    number: '04',
    icon: Award,
    title: 'Certificación',
    description: 'Tu equipo obtiene certificados válidos que respaldan las competencias adquiridas.',
  },
]

export default async function EmpresasPage() {
  const habilitado = await getConfig('WEB_EMPRESAS_HABILITADO', 'true')

  if (habilitado !== 'true') notFound()

  return (
    <>
      {/* ── 1. HERO EMPRESAS con imagen de fondo ─────────────────────── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '7rem 1.5rem 6rem',
          minHeight: '480px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background Image */}
        <Image
          src="/images/empresas-hero.jpg"
          alt="Equipo empresarial en capacitación"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />

        {/* Dark overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(1,45,34,0.92) 0%, rgba(2,94,68,0.88) 45%, rgba(15,68,56,0.85) 100%)',
            zIndex: 1,
          }}
        />

        {/* Grid pattern */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Glow effects */}
        <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--web-primary-rgb, 37, 146, 127),0.25) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 2 }} />
        <div aria-hidden style={{ position: 'absolute', bottom: '-30%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--web-light-rgb, 189, 217, 98),0.1) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 2 }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 3, width: '100%' }}>
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
                backgroundColor: 'rgba(var(--web-light-rgb, 189, 217, 98),0.15)',
                border: '1px solid rgba(var(--web-light-rgb, 189, 217, 98),0.3)',
                borderRadius: '999px',
                padding: '0.5rem 1.25rem',
                marginBottom: '0.5rem',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--web-light, #BDD962)', boxShadow: '0 0 8px var(--web-light, #BDD962)' }} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: 'var(--web-light, #BDD962)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Para Empresas
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}
            >
              Lleva a tu equipo al{' '}
              <span style={{ color: 'var(--web-light, #BDD962)' }}>
                siguiente nivel
              </span>
            </h1>

            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.125rem',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.75,
                maxWidth: '640px',
                marginBottom: '1rem',
              }}
            >
              Descubre nuestras soluciones corporativas diseñadas para potenciar las habilidades de tus colaboradores y aumentar la competitividad técnica de tu empresa en el mercado actual.
            </p>

            {/* Stats badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              {[
                { icon: '🏢', label: 'Empresas atendidas', value: '+50' },
                { icon: '👥', label: 'Colaboradores capacitados', value: '+2,000' },
                { icon: '⭐', label: 'Satisfacción', value: '98%' },
              ].map(stat => (
                <div
                  key={stat.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '16px',
                    padding: '0.75rem 1.25rem',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{stat.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.125rem', fontWeight: 800, color: 'var(--web-light, #BDD962)', lineHeight: 1 }}>
                      {stat.value}
                    </div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PROCESO ─────────────────────── */}
      <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: 'var(--web-primary, #25927F)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Nuestro proceso
              </p>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#0A0A0A', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '1rem' }}>
                Cómo capacitamos a tu{' '}
                <span style={{ color: 'var(--web-primary, #25927F)' }}>equipo</span>
              </h2>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', color: '#64748b', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
                Un proceso simple y efectivo para llevar el talento de tu organización al siguiente nivel.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  style={{
                    position: 'relative',
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    padding: '2.5rem 2rem',
                    border: '1.5px solid hsl(167, 25%, 92%)',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', fontFamily: 'Poppins, sans-serif', fontSize: '0.6875rem', fontWeight: 800, color: '#ffffff', backgroundColor: 'var(--web-primary, #25927F)', borderRadius: '999px', padding: '0.25rem 1rem', letterSpacing: '0.1em' }}>
                    PASO {step.number}
                  </div>
                  <div style={{ width: '72px', height: '72px', borderRadius: '20px', backgroundColor: 'rgba(var(--web-primary-rgb, 37, 146, 127), 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <step.icon size={32} color="var(--web-primary, #25927F)" />
                  </div>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.125rem', fontWeight: 800, color: '#0A0A0A', marginBottom: '0.75rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Imagen destacada con cita ─────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '100%', height: 'clamp(250px, 30vw, 400px)' }}>
          <Image
            src="/images/empresas-team.jpg"
            alt="Equipo corporativo en capacitación"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(2, 94, 68,0.85) 0%, rgba(2, 94, 68,0.4) 60%, rgba(2, 94, 68,0.7) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 2rem' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
              <ScrollReveal direction="left">
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 800, color: '#ffffff', maxWidth: '500px', lineHeight: 1.4, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                  &ldquo;Invertir en capacitación es invertir en el futuro de tu empresa&rdquo;
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SECCIONES CORRESPONDIENTES ─────────────── */}
      <CompaniesSection />

      <EnterpriseCTASection />
    </>
  )
}
