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

const CATEGORY_STYLES: Record<string, { img: string, bgImage: string }> = {
  'programacion': { img: '/images/iconos/Ingenieria.png', bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600' },
  'marketing-digital': { img: '/images/iconos/Psicologia.png', bgImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600' },
  'diseno': { img: '/images/iconos/Docencia.png', bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600' },
  'docencia': { img: '/images/iconos/Docencia.png', bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600' },
  'psicologia': { img: '/images/iconos/Psicologia.png', bgImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600' },
  'salud': { img: '/images/iconos/Salud.png', bgImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600' },
  'ingenieria': { img: '/images/iconos/Ingenieria.png', bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600' },
  'gestion-publica': { img: '/images/iconos/gestion_publica.png', bgImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600' }
}

const DEFAULT_BG_IMAGES = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600'
]

const DEFAULT_ICONS = [
  '/images/iconos/Docencia.png',
  '/images/iconos/Psicologia.png',
  '/images/iconos/Salud.png',
  '/images/iconos/Ingenieria.png',
  '/images/iconos/gestion_publica.png'
]

function getStylesForId(slug: string) {
  if (CATEGORY_STYLES[slug]) {
    return CATEGORY_STYLES[slug]
  }
  
  let hash = 0;

  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }

  hash = Math.abs(hash);

  return { 
    img: DEFAULT_ICONS[hash % DEFAULT_ICONS.length], 
    bgImage: DEFAULT_BG_IMAGES[hash % DEFAULT_BG_IMAGES.length] 
  }
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

        {/* Contenedor Carrusel Nativo transformado en Marquee */}
        <div style={{ position: 'relative', padding: '0 0.5rem', overflow: 'hidden' }}>
          
          <style dangerouslySetInnerHTML={{
            __html: `
            .marquee-container {
              display: flex;
              gap: 1.5rem;
              width: max-content;
              animation: scrollCategories 40s linear infinite;
              padding-top: 1rem;
              padding-bottom: 2rem;
            }
            .marquee-container:hover {
              animation-play-state: paused;
            }
            @keyframes scrollCategories {
              from { transform: translateX(0); }
              to { transform: translateX(calc(-50% - 0.75rem)); }
            }
            .cat-card-wrapper {
              width: 320px;
              flex-shrink: 0;
              display: flex;
              flex-direction: column;
            }
            @media (max-width: 768px) {
              .cat-card-wrapper {
                width: 280px;
              }
            }
          `}} />

          <div className="marquee-container">
            {/* Primer set de categorías */}
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {categorias.map(cat => {
                const { img, bgImage } = getStylesForId(cat.slug)

                
return <CategoryCard key={`cat-1-${cat.id}`} cat={cat} img={img} bgImage={bgImage} />
              })}
            </div>
            {/* Segundo set de categorías para el loop */}
            <div aria-hidden="true" style={{ display: 'flex', gap: '1.5rem' }}>
              {categorias.map(cat => {
                const { img, bgImage } = getStylesForId(cat.slug)

                
return <CategoryCard key={`cat-2-${cat.id}`} cat={cat} img={img} bgImage={bgImage} />
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function CategoryCard({ cat, img, bgImage }: { cat: CategoryData, img: string, bgImage: string }) {
  return (
    <div className="cat-card-wrapper">
      <div
        className="cat-card-inner"
        style={{
          height: '360px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          border: '1.5px solid hsl(214,20%,91%)',
          transition: 'all 0.4s ease',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement

          el.style.transform = 'translateY(-6px)'
          el.style.boxShadow = '0 16px 40px rgba(37, 146, 127, 0.14)'
          el.style.borderColor = 'transparent'
          
          const titleCenter = el.querySelector('.title-center') as HTMLDivElement

          if (titleCenter) {
             titleCenter.style.transform = 'translateY(-20px)'
          }

          const content = el.querySelector('.hover-content') as HTMLDivElement

          if (content) {
            content.style.opacity = '1'
            content.style.transform = 'translateY(0)'
            content.style.transitionDelay = '0.1s'
          }
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement

          el.style.transform = 'translateY(0)'
          el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)'
          el.style.borderColor = 'hsl(214, 20%, 92%)'

          const titleCenter = el.querySelector('.title-center') as HTMLDivElement

          if (titleCenter) {
             titleCenter.style.transform = 'translateY(0)'
          }

          const content = el.querySelector('.hover-content') as HTMLDivElement

          if (content) {
            content.style.opacity = '0'
            content.style.transform = 'translateY(20px)'
            content.style.transitionDelay = '0s'
          }
        }}
      >
        {/* Contenedor de la Imagen Fija */}
        <div
          className="img-container"
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            backgroundColor: '#025E44',
            zIndex: -1
          }}
        >
          <img 
            src={bgImage} 
            alt={cat.nombre} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              opacity: 0.85 
            }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))' }} />
        </div>

        {/* Título e Icono centrados */}
        <div 
          className="title-center"
          style={{ 
            flexGrow: 1,
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            transition: 'transform 0.4s ease',
            padding: '1.5rem',
            zIndex: 2
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <img src={cat.icono || img} alt={cat.nombre} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '16px' }} />
          </div>
          <h3 style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#fff', 
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>
            {cat.nombre}
          </h3>
        </div>

        {/* Contenido en Hover (Botones) - Overlay en la parte inferior */}
        <div 
          className="hover-content"
          style={{ 
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1.5rem',
            opacity: 0, 
            transform: 'translateY(20px)',
            transition: 'all 0.4s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            zIndex: 3,
            height: '35%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)'
        }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
            {cat.cursosCount > 0 && (
              <Link
                href={`/cursos?categoria=${cat.slug}`}
                style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 600,
                  backgroundColor: 'var(--web-primary, #25927F)', color: '#ffffff',
                  padding: '0.75rem 1rem', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(37, 146, 127, 0.2)'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
              >
                Ver {cat.cursosCount} {cat.cursosCount === 1 ? 'Curso' : 'Cursos'}
              </Link>
            )}

            {cat.diplomadosCount > 0 && (
              <Link
                href={`/diplomados?categoria=${cat.slug}`}
                style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 600,
                  backgroundColor: 'var(--web-dark, #025E44)', color: '#ffffff',
                  padding: '0.75rem 1rem', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(2, 94, 68, 0.2)'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
              >
                Ver {cat.diplomadosCount} {cat.diplomadosCount === 1 ? 'Diplomado' : 'Diplomados'}
              </Link>
            )}

            {cat.cursosCount === 0 && cat.diplomadosCount === 0 && (
              <span
                style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 600,
                  backgroundColor: 'rgba(0, 0, 0, 0.2)', color: 'rgba(255,255,255,0.7)',
                  padding: '0.75rem 1rem', borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                Próximamente
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
