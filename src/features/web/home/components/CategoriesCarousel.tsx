'use client'


import Link from 'next/link'



import { eyebrow, sectionH2, sectionDesc } from '@/features/web/home/components/typography'

type CategoryData = {
  id: string
  nombre: string
  slug: string
  icono?: string | null
  cursosCount: number
  diplomadosCount: number
  total: number
}

const CATEGORY_STYLES: Record<string, { img: string, background: string }> = {
  'docencia': { img: '/images/iconos/Docencia.png', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
  'psicologia': { img: '/images/iconos/Psicologia.png', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' },
  'salud': { img: '/images/iconos/Salud.png', background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' },
  'ingenieria': { img: '/images/iconos/Ingenieria.png', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
  'gestion-publica': { img: '/images/iconos/gestion_publica.png', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }
}

function getStylesForId(slug: string) {
  return CATEGORY_STYLES[slug] || CATEGORY_STYLES['docencia']
}



export default function CategoriesCarousel({ categorias }: { categorias: CategoryData[] }) {

  if (categorias.length === 0) return null

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>

        {/* Encabezado */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ ...eyebrow, display: 'block', textAlign: 'center' }}>
            Explora por áreas
          </p>
          <h2 style={{ ...sectionH2, textAlign: 'center', marginBottom: '0.75rem' }}>
            Nuestras Categorías
          </h2>
          <p style={{ ...sectionDesc, textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
            Encuentra programas formativos especializados en el área de tu interés. Tenemos tanto cursos cortos como diplomados.
          </p>
        </div>

        {/* Contenedor Carrusel Nativo */}
        <div style={{ position: 'relative', padding: '0 0.5rem' }}>

          <div
            id="categories-scroll-container"
            style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              paddingTop: '1rem',
              paddingBottom: '2rem', // espacio para sombras
            }}
            className="hidden-scroll pb-4" // Asumiendo que usamos alguna clase o el style de arriba
          >
            <style dangerouslySetInnerHTML={{
              __html: `
              #categories-scroll-container::-webkit-scrollbar { display: none; }
              @media (max-width: 768px) {
                #categories-scroll-container { justify-content: flex-start !important; }
              }
            `}} />

            {categorias.map(cat => {
              const { img, background } = getStylesForId(cat.slug)

              return (
                <div
                  key={cat.id}
                  style={{
                    width: '320px',
                    maxWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      padding: '2rem 1.5rem',
                      borderRadius: '24px',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: '#ffffff',
                      border: '1px solid hsl(214, 20%, 92%)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                      transition: 'all 0.3s ease',
                      zIndex: 1,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement

                      el.style.transform = 'translateY(-8px)'
                      el.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'
                      el.style.borderColor = 'transparent'

                      const bgEl = el.querySelector('.bg-hover') as HTMLDivElement

                      if (bgEl) bgEl.style.opacity = '1'

                      const iconEl = el.querySelector('.icon-circle') as HTMLDivElement

                      if (iconEl) iconEl.style.transform = 'scale(1.1) rotate(5deg)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement

                      el.style.transform = 'translateY(0)'
                      el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)'
                      el.style.borderColor = 'hsl(214, 20%, 92%)'

                      const bgEl = el.querySelector('.bg-hover') as HTMLDivElement

                      if (bgEl) bgEl.style.opacity = '0'

                      const iconEl = el.querySelector('.icon-circle') as HTMLDivElement

                      if (iconEl) iconEl.style.transform = 'scale(1) rotate(0deg)'
                    }}
                  >
                    {/* Fondo hover sutil (glass glow) */}
                    <div
                      className="bg-hover"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: background,
                        opacity: 0,
                        zIndex: -1,
                        transition: 'opacity 0.4s ease',
                      }}
                    />
                    <div
                      className="bg-hover"
                      style={{
                        position: 'absolute',
                        inset: '2px',
                        backgroundColor: '#ffffff',
                        borderRadius: '22px',
                        zIndex: -1,
                      }}
                    />

                    {/* Icono */}
                    <div
                      className="icon-circle"
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: background,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        marginBottom: '1.5rem',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <img src={cat.icono || img} alt={cat.nombre} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '16px' }} />
                    </div>

                    <h3
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: '#0A0A0A',
                        lineHeight: 1.3,
                        marginBottom: '0.75rem',
                      }}
                    >
                      {cat.nombre}
                    </h3>

                    {/* Botones de acción específicos */}
                    <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
                      {cat.cursosCount > 0 && (
                        <Link
                          href={`/cursos?categoria=${cat.slug}`}
                          style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 600,
                            backgroundColor: 'rgba(37, 146, 127, 0.08)', color: 'var(--web-primary, #25927F)',
                            padding: '0.625rem 1rem', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s', border: '1px solid transparent'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--web-primary, #25927F)'; e.currentTarget.style.color = '#fff' }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(37, 146, 127, 0.08)'; e.currentTarget.style.color = 'var(--web-primary, #25927F)' }}
                        >
                          Ver {cat.cursosCount} {cat.cursosCount === 1 ? 'Curso' : 'Cursos'}
                        </Link>
                      )}

                      {cat.diplomadosCount > 0 && (
                        <Link
                          href={`/diplomados?categoria=${cat.slug}`}
                          style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 600,
                            backgroundColor: 'rgba(2, 94, 68, 0.08)', color: 'var(--web-dark, #025E44)',
                            padding: '0.625rem 1rem', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s', border: '1px solid transparent'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--web-dark, #025E44)'; e.currentTarget.style.color = '#fff' }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(2, 94, 68, 0.08)'; e.currentTarget.style.color = 'var(--web-dark, #025E44)' }}
                        >
                          Ver {cat.diplomadosCount} {cat.diplomadosCount === 1 ? 'Diplomado' : 'Diplomados'}
                        </Link>
                      )}

                      {cat.cursosCount === 0 && cat.diplomadosCount === 0 && (
                        <span
                          style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 600,
                            backgroundColor: 'rgba(0, 0, 0, 0.04)', color: 'rgba(0,0,0,0.4)',
                            padding: '0.625rem 1rem', borderRadius: '12px',
                          }}
                        >
                          Próximamente
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>


        </div>
      </div>
    </section>
  )
}
