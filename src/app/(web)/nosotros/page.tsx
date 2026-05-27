import prisma from '@/utils/libs/prisma'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import ProfessorsCarousel from '@/features/web/nosotros/components/ProfessorsCarousel'
import { MisionVisionSection, ValoresSection } from '@/features/web/nosotros/components/NosotrosInteractive'
import DocumentosSection from '@/features/web/nosotros/components/DocumentosSection'

export const metadata = {
  title: 'Nosotros | Master Academy',
  description: 'Conoce quiénes somos. Master Academy nace para coadyuvar a los profesionales a progresar laboralmente mediante el fortalecimiento de competencias para afrontar pruebas de aptitud académica.',
}

async function getTeachers() {
  try {
    return await prisma.usuario.findMany({
      where: { rol: 'PROFESOR' },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        slug: true,
        avatar: true,
        cargo: true,
        biografia: true,
        _count: { select: { cursos_dictados: true } },
      },
      orderBy: { cursos_dictados: { _count: 'desc' } },
      take: 12,
    })
  } catch {
    return []
  }
}

export default async function NosotrosPage() {
  const teachers = await getTeachers()

  return (
    <>
      {/* ── ENCABEZADO ─────────────────────────────────── */}
      <section
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.48) 100%), url("/images/cursos.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '0 3rem',
          minHeight: '360px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(var(--web-light-rgb, 240, 208, 96),0.12)',
                border: '1px solid rgba(var(--web-light-rgb, 240, 208, 96),0.3)',
                borderRadius: '999px',
                padding: '0.375rem 1rem',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--web-light, #F0D060)', boxShadow: '0 0 6px var(--web-light, #F0D060)' }} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'var(--web-light, #F0D060)', fontWeight: 600 }}>
                Quiénes somos
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                marginBottom: '1rem',
                maxWidth: '600px',
              }}
            >
              Nuestra{' '}
              <span style={{ color: 'var(--web-light, #F0D060)' }}>Historia</span>
            </h1>

            <p
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.7,
                maxWidth: '560px',
              }}
            >
              Master Academy nace para coadyuvar a nuestros profesionales a progresar laboralmente, mediante el fortalecimiento de competencias y capacidades que les permitan afrontar satisfactoriamente una prueba de aptitud académica para acceder a nuevos puestos de trabajo.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ESTADÍSTICAS ───────────────────────────────── */}
      <section style={{ backgroundColor: '#0A0A0A', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {[
              { emoji: '🎓', value: '+1,200', label: 'Profesionales formados' },
              { emoji: '📋', value: '+80', label: 'Cursos especializados' },
              { emoji: '✅', value: '+500', label: 'Pruebas aprobadas exitosamente' },
              { emoji: '🏆', value: '98%', label: 'Tasa de satisfacción' },
            ].map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div
                  style={{
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '1.5rem 1.25rem',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: '1.75rem' }}>{s.emoji}</span>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.75rem', fontWeight: 800, color: 'var(--web-light, #F0D060)', lineHeight: 1, marginTop: '0.5rem' }}>{s.value}</div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', marginTop: '6px', lineHeight: 1.4 }}>{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISIÓN / VISIÓN ────────────────────────────── */}
      <MisionVisionSection />

      {/* ── VALORES ────────────────────────────────────── */}
      <ValoresSection />

      {/* ── ESPECIALISTAS ──────────────────────────────── */}
      <ProfessorsCarousel teachers={JSON.parse(JSON.stringify(teachers))} />

      {/* ── DOCUMENTOS ─────────────────────────────────── */}
      <DocumentosSection />
    </>
  )
}
