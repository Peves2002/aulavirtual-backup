import { getProgramCatalogData } from '@/features/web/cursos/getProgramCatalogData'
import { getAuthSession } from '@/utils/libs/auth-helpers'
import CourseCatalog from '@/features/web/home/components/CourseCatalog'

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} | Cursos`,
  description: 'Explora nuestra amplia variedad de cursos y comienza a aprender hoy mismo.'
}

export default async function CursosPage() {
  const session = await getAuthSession()
  const token = session?.user?.accessToken ?? null
  const { courses, categories } = await getProgramCatalogData('CURSO', token)

  return (
    <div style={{ flexGrow: 1 }}>
      {/* Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 100%)',
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', backgroundColor: 'rgba(189,217,98,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, right: 80, width: 300, height: 300, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
            <a href="/" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
              Inicio
            </a>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>/</span>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'var(--web-light, #BDD962)', fontWeight: 600 }}>
              Cursos
            </span>
          </div>

          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 4, lineHeight: 1.2 }}>
            Catálogo de Cursos
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', maxWidth: 520, lineHeight: 1.6 }}>
            Explora nuestra selección de cursos y comienza a aprender hoy.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            {[
              { label: `${courses.length} cursos disponibles`, icon: '📚' },
              { label: `${categories.length} categorías`, icon: '🗂️' },
            ].map(chip => (
              <div
                key={chip.label}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px',
                  borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                  fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: '#ffffff', fontWeight: 500,
                }}
              >
                <span>{chip.icon}</span>
                {chip.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <CourseCatalog courses={courses} categories={categories} type="curso" />
    </div>
  )
}
