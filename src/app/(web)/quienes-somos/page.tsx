import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import prisma from '@/utils/libs/prisma'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import ProfessorsCarousel from '@/features/web/nosotros/components/ProfessorsCarousel'
import { MisionVisionSection, ValoresSection } from '@/features/web/nosotros/components/NosotrosInteractive'

export const metadata = {
  title: 'Quiénes Somos - SELAH',
  description: 'Conoce quiénes somos, nuestra misión, visión y los valores que guían nuestra plataforma educativa.',
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

export default async function QuienesSomosPage() {
  const teachers = await getTeachers()

  return (
    <>
      {/* ── 1. HERO QUIÉNES SOMOS ─────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 45%, var(--web-dark-mid, #0f4438) 100%)',
          padding: '6rem 1.5rem 5rem',
          position: 'relative',
          overflow: 'hidden',
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
        <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--web-primary-rgb, 37, 146, 127),0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            
            {/* Text Content */}
            <ScrollReveal direction="left">
              <div>
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
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--web-light, #BDD962)', boxShadow: '0 0 6px var(--web-light, #BDD962)' }} />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'var(--web-light, #BDD962)', fontWeight: 600 }}>
                    Nuestra Identidad
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
                  Somos <span style={{ color: 'var(--web-light, #BDD962)' }}>SELAH</span>, <br />
                  tu aliado estratégico.
                </h1>

                <p
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.125rem',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.75,
                    maxWidth: '480px',
                    marginBottom: '2.5rem',
                  }}
                >
                  Selah es un emprendimiento enfocado en la formación innovadora en psicología y áreas afines, ofreciendo espacios académicos accesibles, prácticos y transformadores a nivel nacional e internacional.
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                    <CheckCircle className="text-[var(--web-light)]" size={20} />
                    <span className="font-semibold text-sm">Expertos</span>
                  </div>
                  <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                    <CheckCircle className="text-[var(--web-light)]" size={20} />
                    <span className="font-semibold text-sm">Calidad</span>
                  </div>
                  <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                    <CheckCircle className="text-[var(--web-light)]" size={20} />
                    <span className="font-semibold text-sm">Innovación</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Visual */}
            <ScrollReveal direction="right" delay={0.2}>
               <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{ minHeight: '400px' }}>
                  <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" alt="Equipo Selah" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#025E44]/90 to-transparent flex items-end p-8">
                     <p className="text-white text-lg font-bold font-sans">Forjando el futuro de la educación.</p>
                  </div>
               </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 2. MISIÓN / VISIÓN (client component) ─────── */}
      <MisionVisionSection />

      {/* ── 3. VALORES (client component) ─────────────── */}
      <ValoresSection />

      {/* ── 4. NUESTRO EQUIPO DOCENTE ─────────────────────────────── */}
      <section className="bg-gray-50 py-16">
         <div className="max-w-7xl mx-auto px-4 mb-10">
            <h2 className="text-[#1A2035] font-extrabold text-3xl italic text-center">NUESTRO EQUIPO DOCENTE</h2>
            <p className="text-gray-500 text-center mt-2">Expertos comprometidos con tu aprendizaje</p>
         </div>
         <ProfessorsCarousel teachers={JSON.parse(JSON.stringify(teachers))} />
      </section>
    </>
  )
}
