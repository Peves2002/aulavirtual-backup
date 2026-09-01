import React from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Flag, Target, Users } from 'lucide-react'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'

export const metadata = {
  title: 'Nuestra Historia - SELAH',
  description: 'Conoce la historia y trayectoria de SELAH.',
}

export default function HistoriaPage() {
  const milestones = [
    {
      year: '2026',
      title: 'El Nacimiento de SELAH',
      description: 'SELAH nace como un emprendimiento con la misión de ofrecer formación innovadora en psicología. Surgimos como respuesta a la creciente necesidad de espacios académicos más accesibles y orientados a la práctica.',
      icon: <Calendar className="w-6 h-6 text-white" />,
      color: 'var(--web-primary, #25927F)'
    },
    {
      year: '2026',
      title: 'Primera Sede en Lince',
      description: 'Establecimos nuestra sede física en Lince, Lima - Perú, consolidando nuestro primer espacio para conectar directamente con nuestros estudiantes y docentes.',
      icon: <Flag className="w-6 h-6 text-white" />,
      color: '#E3004F'
    },
    {
      year: '2027',
      title: 'Expansión Nacional e Internacional',
      description: 'Lanzamiento de nuestra Aula Virtual, permitiéndonos romper las fronteras geográficas y llegar a estudiantes de todo el Perú y otros países de Latinoamérica.',
      icon: <Target className="w-6 h-6 text-white" />,
      color: 'var(--web-light, #BDD962)'
    },
    {
      year: '2028',
      title: 'Comunidad SELAH',
      description: 'Más de 1,200 alumnos egresados de nuestros diferentes cursos y diplomados, conformando una comunidad vibrante de profesionales comprometidos con la salud mental y el bienestar.',
      icon: <Users className="w-6 h-6 text-white" />,
      color: 'var(--web-dark, #025E44)'
    }
  ]

  return (
    <>
      {/* ── 1. HERO HISTORIA ─────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 45%, var(--web-dark-mid, #0f4438) 100%)',
          padding: '6rem 1.5rem 5rem',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
           <ScrollReveal>
             <div
               style={{
                 display: 'inline-flex',
                 alignItems: 'center',
                 gap: '0.5rem',
                 backgroundColor: 'rgba(var(--web-light-rgb, 189, 217, 98),0.12)',
                 border: '1px solid rgba(var(--web-light-rgb, 189, 217, 98),0.25)',
                 borderRadius: '999px',
                 padding: '0.375rem 1rem',
                 marginBottom: '1.5rem',
               }}
             >
               <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'var(--web-light, #BDD962)', fontWeight: 600 }}>
                 Nuestras Raíces
               </span>
             </div>

             <h1
               style={{
                 fontFamily: 'Poppins, sans-serif',
                 fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                 fontWeight: 800,
                 color: '#ffffff',
                 letterSpacing: '-0.025em',
                 lineHeight: 1.15,
                 marginBottom: '1.25rem',
               }}
             >
               Nuestra Historia
             </h1>

             <p
               style={{
                 fontFamily: 'Poppins, sans-serif',
                 fontSize: '1.125rem',
                 color: 'rgba(255,255,255,0.7)',
                 lineHeight: 1.75,
               }}
             >
               Descubre cómo comenzó nuestro camino y cómo hemos evolucionado para brindarte la mejor educación especializada en psicología.
             </p>
           </ScrollReveal>
        </div>
      </section>

      {/* ── 2. TIMELINE ─────────────────────── */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          
          <div className="space-y-12">
            {milestones.map((item, index) => (
              <ScrollReveal key={index} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Icon & Year Mobile */}
                  <div className="md:hidden flex items-center gap-4 mb-4">
                     <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                        style={{ backgroundColor: item.color }}
                     >
                        {item.icon}
                     </div>
                     <span className="text-2xl font-black text-gray-800">{item.year}</span>
                  </div>

                  {/* Content Box */}
                  <div className={`flex-1 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                     <h3 className="text-xl font-bold text-[#1A2035] mb-3">{item.title}</h3>
                     <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>

                  {/* Center Timeline Element (Desktop) */}
                  <div className="hidden md:flex flex-col items-center justify-center relative w-32">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-32 bg-gray-200 -z-10"></div>
                     <span className="text-2xl font-black mb-2" style={{ color: item.color }}>{item.year}</span>
                     <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative z-10 border-4 border-white"
                        style={{ backgroundColor: item.color }}
                     >
                        {item.icon}
                     </div>
                  </div>

                  {/* Empty space for balance */}
                  <div className="hidden md:block flex-1"></div>

                </div>
              </ScrollReveal>
            ))}
          </div>
          
        </div>
      </section>
      
      {/* ── 3. CTA ─────────────────────── */}
      <section className="bg-white py-16 text-center border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-[#1A2035] font-extrabold text-3xl mb-6">Sé parte de nuestra historia</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Únete a nuestros cursos y diplomados para comenzar a potenciar tus habilidades profesionales hoy mismo.
            </p>
            <Link
              href="/cursos"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--web-primary, #25927F)' }}
            >
              Explorar Oferta Académica <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
