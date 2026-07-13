import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Clock, BookOpen, MapPin, MonitorPlay, Users, Briefcase, GraduationCap, ArrowRight, Download, Award } from 'lucide-react'
import prisma from '@/utils/libs/prisma'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import AccordionModules from './components/AccordionModules'
import ProgramStickyNav from './components/ProgramStickyNav'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const curso = await prisma.curso.findUnique({ where: { slug: params.slug } })
  if (!curso) return { title: 'Programa no encontrado' }
  return {
    title: `${curso.titulo} | ADPH Group`,
    description: curso.descripcion || 'Especialízate con nuestro programa.'
  }
}

export default async function ProgramPage({ params }: { params: { slug: string } }) {
  const curso = await prisma.curso.findUnique({
    where: { slug: params.slug },
    include: {
      categoria: true,
      modulos: {
        orderBy: { orden: 'asc' },
        include: {
          lecciones: { orderBy: { orden: 'asc' } }
        }
      }
    }
  })

  if (!curso) {
    redirect('/programas')
  }

  const beneficios = Array.isArray(curso.beneficios) ? curso.beneficios as any[] : []
  const metodologia = Array.isArray(curso.metodologia) ? curso.metodologia as any[] : []
  const objetivos = Array.isArray(curso.objetivos) ? curso.objetivos as string[] : []
  const incluye = Array.isArray(curso.incluye) ? curso.incluye as any[] : []
  const salidasProfesionales = Array.isArray(curso.salidas_profesionales) ? curso.salidas_profesionales as string[] : []

  return (
    <div className="bg-white pb-24">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-[#08479b]">
        {curso.miniatura && (
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={curso.miniatura} alt={curso.titulo} className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08479b] via-[#08479b]/90 to-transparent"></div>
          </div>
        )}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-widest uppercase mb-8">
                <span className="w-2 h-2 rounded-full bg-[#fcd116]"></span>
                {curso.categoria?.nombre || 'Programa Especializado'}
              </div>
              <h1 className="text-white font-black text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
                {curso.titulo}
              </h1>
              {curso.descripcion && (
                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
                  {curso.descripcion}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#admision" className="bg-[#fcd116] hover:bg-white text-slate-900 px-8 py-4 rounded-full font-bold inline-flex justify-center items-center gap-2 transition-all hover:shadow-xl">
                  Solicitar Admisión <ArrowRight className="w-5 h-5" />
                </Link>
                {curso.brochure && (
                  <a href={curso.brochure} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold inline-flex justify-center items-center gap-2 transition-all">
                    Descargar Brochure <Download className="w-5 h-5" />
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Highlights Bar */}
      <section className="bg-slate-900 border-b border-white/10 relative z-20 -mt-10 lg:-mt-16 mx-6 lg:mx-10 rounded-2xl shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          <div className="p-6 md:p-8 flex items-center gap-4">
            <Clock className="w-8 h-8 text-[#fcd116]" />
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Duración</p>
              <p className="text-white font-bold">{curso.duracion || 'Flexible'}</p>
            </div>
          </div>
          <div className="p-6 md:p-8 flex items-center gap-4">
            <MonitorPlay className="w-8 h-8 text-[#fcd116]" />
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Formato</p>
              <p className="text-white font-bold">{curso.tipo_emision}</p>
            </div>
          </div>
          <div className="p-6 md:p-8 flex items-center gap-4">
            <MapPin className="w-8 h-8 text-[#fcd116]" />
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Escuela</p>
              <p className="text-white font-bold">{curso.escuela || 'ADPH Group'}</p>
            </div>
          </div>
          <div className="p-6 md:p-8 flex items-center gap-4">
            <Award className="w-8 h-8 text-[#fcd116]" />
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Titulación</p>
              <p className="text-white font-bold">{curso.tipo}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <ProgramStickyNav />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mt-12 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Columna Principal */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Presentación (Added for navigation) */}
            <section id="presentacion" className="scroll-mt-32">
              <ScrollReveal>
                <h2 className="text-[#08479b] font-bold text-sm tracking-widest uppercase mb-4">Presentación</h2>
                <h3 className="text-slate-900 font-black text-3xl md:text-4xl mb-6">Sobre el Programa</h3>
                <p className="text-slate-600 leading-relaxed text-lg mb-6">
                  {curso.descripcion || 'Este programa está diseñado para potenciar tus habilidades y acelerar tu desarrollo profesional en un entorno dinámico y práctico.'}
                </p>
              </ScrollReveal>
            </section>
            
            {/* Beneficios / Por qué este programa */}
            {beneficios.length > 0 && (
              <section id="por-que" className="scroll-mt-32">
                <ScrollReveal>
                  <h2 className="text-[#08479b] font-bold text-sm tracking-widest uppercase mb-4">Razones para elegirnos</h2>
                  <h3 className="text-slate-900 font-black text-3xl md:text-4xl mb-10">¿Por qué este {curso.tipo}?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {beneficios.map((ben, i) => (
                      <div key={i} className="bg-[#F4F7FC] p-8 rounded-2xl border border-slate-200/60 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-[#08479b]">
                          <Award className="w-6 h-6" />
                        </div>
                        <h4 className="text-slate-900 font-bold text-xl mb-3">{ben.title}</h4>
                        <p className="text-slate-600 leading-relaxed">{ben.desc}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </section>
            )}

            {/* Objetivos */}
            {objetivos.length > 0 && (
              <section id="objetivos" className="scroll-mt-32">
                <ScrollReveal>
                  <h2 className="text-[#08479b] font-bold text-sm tracking-widest uppercase mb-4">El impacto en tu carrera</h2>
                  <h3 className="text-slate-900 font-black text-3xl md:text-4xl mb-10">¿Qué lograrás en este programa?</h3>
                  <div className="bg-slate-900 p-8 md:p-12 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#08479b]/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <ul className="space-y-6 relative z-10">
                      {objetivos.map((obj, i) => (
                        <li key={i} className="flex gap-4 items-start">
                          <CheckCircle className="w-6 h-6 text-[#fcd116] shrink-0 mt-1" />
                          <p className="text-white/90 text-lg leading-relaxed">{obj}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </section>
            )}

            {/* Plan de Estudios (Módulos y Lecciones) */}
            {curso.modulos.length > 0 && (
              <section id="plan-de-estudios" className="scroll-mt-32">
                <ScrollReveal>
                  <h2 className="text-[#08479b] font-bold text-sm tracking-widest uppercase mb-4">Estructura Académica</h2>
                  <h3 className="text-slate-900 font-black text-3xl md:text-4xl mb-10">Plan de Estudios</h3>
                  
                  <AccordionModules modulos={curso.modulos} />
                </ScrollReveal>
              </section>
            )}

            {/* Metodología */}
            {metodologia.length > 0 && (
              <section id="metodologia" className="scroll-mt-32">
                <ScrollReveal>
                  <h2 className="text-[#08479b] font-bold text-sm tracking-widest uppercase mb-4">Cómo aprenderás</h2>
                  <h3 className="text-slate-900 font-black text-3xl md:text-4xl mb-10">Metodología de Aprendizaje</h3>
                  <div className="space-y-8">
                    {metodologia.map((met, i) => (
                      <div key={i} className="flex flex-col md:flex-row gap-6 items-start bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                        <div className="w-16 h-16 shrink-0 bg-[#F4F7FC] rounded-2xl flex items-center justify-center text-[#08479b]">
                          <BookOpen className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="text-slate-900 font-bold text-2xl mb-3">{met.title}</h4>
                          <p className="text-slate-600 text-lg leading-relaxed">{met.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </section>
            )}

            {/* Perfil del Egresado y Salidas Profesionales */}
            {(curso.perfil_estudiante || salidasProfesionales.length > 0) && (
              <section id="perfil" className="scroll-mt-32">
                <ScrollReveal>
                  <h2 className="text-[#08479b] font-bold text-sm tracking-widest uppercase mb-4">Proyección</h2>
                  <h3 className="text-slate-900 font-black text-3xl md:text-4xl mb-10">Empleabilidad y Futuro</h3>
                  
                  {curso.perfil_estudiante && (
                    <div className="mb-12">
                      <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Users className="w-6 h-6 text-[#fcd116]" /> ¿A quién va dirigido?
                      </h4>
                      <p className="text-slate-600 text-lg leading-relaxed text-justify">
                        {curso.perfil_estudiante}
                      </p>
                    </div>
                  )}

                  {salidasProfesionales.length > 0 && (
                    <div>
                      <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-[#fcd116]" /> Salidas Profesionales
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {salidasProfesionales.map((salida, i) => (
                          <div key={i} className="bg-white border border-slate-200 px-6 py-4 rounded-xl flex items-center gap-3">
                            <div className="w-2 h-2 bg-[#08479b] rounded-full"></div>
                            <span className="text-slate-700 font-medium">{salida}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </ScrollReveal>
              </section>
            )}

          </div>

          {/* Columna Lateral (Sidebar) */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              
              {/* Card de Precios o Admisión */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-2xl">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Solicita Información</h3>
                <p className="text-slate-600 mb-8">Da el siguiente paso en tu carrera profesional. Déjanos tus datos y un asesor académico se contactará contigo para darte todos los detalles.</p>
                <Link href="/escuelas" className="w-full bg-[#08479b] hover:bg-[#06316b] text-white px-6 py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors">
                  Iniciar Proceso
                </Link>
                {curso.brochure && (
                   <a href={curso.brochure} target="_blank" rel="noopener noreferrer" className="w-full mt-4 bg-[#F4F7FC] hover:bg-slate-200 text-[#08479b] px-6 py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors">
                     Descargar Plan de Estudios
                   </a>
                )}
              </div>

              {/* Qué incluye el programa */}
              {incluye.length > 0 && (
                <div className="bg-[#F4F7FC] rounded-3xl p-8 border border-slate-200/60">
                  <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-[#08479b]" /> El programa incluye
                  </h3>
                  <ul className="space-y-4">
                    {incluye.map((inc, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {inc.active ? (
                          <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        ) : (
                          <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                          </div>
                        )}
                        <span className={`text-sm leading-snug ${inc.active ? 'text-slate-700 font-medium' : 'text-slate-400 line-through'}`}>
                          {inc.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
