import { Construction } from 'lucide-react'

export const metadata = {
  title: 'Simulacros | Aula Virtual',
  description: 'Simulacros de exámenes para concursos públicos y selección de personal del Estado.',
}

export default function SimulacrosPage() {
  return (
    <>
      {/* Header */}
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
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <a href="/" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Inicio</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>/</span>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'var(--web-light, #F0D060)', fontWeight: 600 }}>Simulacros</span>
          </div>

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
              Próximamente disponible
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
            Simulacros para{' '}
            <span style={{ color: 'var(--web-light, #F0D060)' }}>Concursos Públicos</span>
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
            Practica con exámenes de aptitud académica y simulacros de entrevistas técnicas diseñados por especialistas en el sector público.
          </p>
        </div>
      </section>

      {/* Coming soon */}
      <section style={{ backgroundColor: '#ffffff', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(var(--web-primary-rgb, 212, 175, 55), 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Construction size={40} style={{ color: 'var(--web-primary, #D4AF37)' }} />
            </div>
          </div>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.75rem', fontWeight: 800, color: '#0A0A0A', marginBottom: '1rem' }}>
            Estamos trabajando en ello
          </h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', color: '#64748b', lineHeight: 1.7, marginBottom: '2rem' }}>
            Pronto tendrás acceso a simulacros de exámenes de aptitud académica, derecho administrativo, contrataciones del Estado y más.
          </p>
          <a
            href="/cursos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: '0.9375rem',
              backgroundColor: 'var(--web-primary, #D4AF37)',
              color: '#ffffff',
              padding: '0.875rem 1.75rem',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(var(--web-primary-rgb, 212, 175, 55),0.4)',
            }}
          >
            Ver cursos disponibles
          </a>
        </div>
      </section>
    </>
  )
}
