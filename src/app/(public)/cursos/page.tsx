import React from 'react'
import Link from 'next/link'
import prisma from '@/utils/libs/prisma'

export const metadata = {
  title: 'Catálogo de Cursos | IFSEC Group',
}

export default async function CursosPage() {
  const cursos = await prisma.curso.findMany({
    where: { estado: 'PUBLICADO' },
    include: {
      categoria: true,
    },
    orderBy: { creado_en: 'desc' },
  })

  // Destacar el primer curso si existe
  const featuredCourse = cursos.length > 0 ? cursos[0] : null
  const regularCourses = cursos.length > 1 ? cursos.slice(1) : []

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* ── HEADER DE PÁGINA ── */}
      <section className="bg-[#020817] pt-36 pb-24 px-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--web-primary)]/15 blur-[150px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1f7d6d]/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none translate-y-1/2 -translate-x-1/3"></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-[var(--web-light)] rounded-full font-semibold text-xs mb-6 uppercase tracking-widest backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[var(--web-light)] animate-pulse"></span>
              Plataforma Educativa
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Formación de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--web-light)] to-[var(--web-primary)]">Alto Nivel</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl font-light leading-relaxed mb-10">
              Desarrolla competencias reales y prepara a tu equipo para operaciones seguras con nuestros programas especializados bajo normativas internacionales.
            </p>
            
            {/* Buscador visual (mockup) */}
            <div className="relative max-w-md">
              <input 
                type="text" 
                placeholder="¿Qué deseas aprender hoy?" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-12 text-white focus:outline-none focus:border-[var(--web-primary)] focus:bg-white/10 transition-all placeholder:text-gray-500 backdrop-blur-sm shadow-xl"
                disabled
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--web-primary)] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 hidden lg:block">
             <div className="relative w-full aspect-square bg-gradient-to-tr from-white/5 to-white/10 rounded-[3rem] border border-white/10 backdrop-blur-sm p-6 flex flex-col justify-end shadow-2xl">
               <div className="absolute inset-0 bg-[url('/images/servicios/entrenamientos-vivenciales/armado-de-andamios/whatsapp-image-2025-05-19-at-2.32.02-pm.jpeg')] bg-cover bg-center opacity-40 rounded-[3rem] mix-blend-overlay"></div>
               <div className="relative z-10 bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                 <div className="text-[var(--web-light)] text-xs font-bold uppercase tracking-wider mb-2">Estadísticas</div>
                 <div className="flex justify-between items-end">
                   <div>
                     <div className="text-4xl font-extrabold text-white mb-1">98%</div>
                     <div className="text-gray-400 text-sm">Tasa de Aprobación</div>
                   </div>
                   <div className="w-12 h-12 rounded-full bg-[var(--web-primary)]/20 flex items-center justify-center border border-[var(--web-primary)]/50">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--web-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>



      {/* ── CATÁLOGO DE CURSOS ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {cursos.length > 0 ? (
            <div className="flex flex-col gap-16">
              
              {/* CURSO DESTACADO */}
              {featuredCourse && (
                <div>
                  <h3 className="text-xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
                    <span className="text-[var(--web-primary)]">★</span> Programa Destacado
                  </h3>
                  <Link href={`/plataforma/cursos/${featuredCourse.slug}`} className="group grid md:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 no-underline">
                    <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                      {featuredCourse.miniatura ? (
                        <img src={featuredCourse.miniatura} alt={featuredCourse.titulo} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 font-bold">SIN IMAGEN</span>
                        </div>
                      )}
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-[var(--web-dark)] text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                        {featuredCourse.categoria?.nombre || 'Especializado'}
                      </div>
                    </div>
                    <div className="p-10 md:p-14 flex flex-col justify-center bg-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--web-primary)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                      
                      <div className="flex gap-4 mb-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <span className="flex items-center gap-1"><svg className="w-4 h-4 text-[var(--web-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Práctico</span>
                        <span className="flex items-center gap-1"><svg className="w-4 h-4 text-[var(--web-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Certificado</span>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-6 leading-tight group-hover:text-[var(--web-primary)] transition-colors">
                        {featuredCourse.titulo}
                      </h2>
                      <p className="text-gray-500 mb-10 text-lg leading-relaxed font-light">
                        Capacitación intensiva diseñada para profesionales de alto rendimiento. Mejora tus habilidades operativas con instructores certificados internacionalmente.
                      </p>
                      
                      <div className="mt-auto flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[var(--web-dark)] flex items-center justify-center text-[var(--web-light)] shadow-lg group-hover:bg-[var(--web-primary)] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </div>
                        <span className="font-bold text-[#0f172a] uppercase tracking-widest text-sm">Ver Detalles</span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              
              {/* RESTO DE CURSOS */}
              {regularCourses.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-[#0f172a] mb-6">Todos los programas</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {regularCourses.map(curso => (
                      <Link href={`/plataforma/cursos/${curso.slug}`} key={curso.slug} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 no-underline relative">
                        <div className="w-full aspect-[4/3] bg-gray-100 relative overflow-hidden">
                          <div className="absolute inset-0 bg-black/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          {curso.miniatura ? (
                            <img src={curso.miniatura} alt={curso.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <span className="text-gray-400 font-bold tracking-widest text-xs">SIN IMAGEN</span>
                            </div>
                          )}
                          {curso.categoria && (
                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[var(--web-dark)] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full z-20 shadow-sm">
                              {curso.categoria.nombre}
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col relative z-20 bg-white">
                          <div className="flex gap-3 mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1"><svg className="w-3 h-3 text-[var(--web-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Presencial</span>
                          </div>
                          
                          <h3 className="text-lg md:text-xl font-bold text-[#0f172a] leading-tight mb-4 group-hover:text-[var(--web-primary)] transition-colors line-clamp-2">
                            {curso.titulo}
                          </h3>
                          
                          <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-[var(--web-primary)]">
                            <span className="uppercase tracking-wider text-xs font-bold text-gray-500">Saber más</span>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[var(--web-primary)] group-hover:text-white transition-colors">
                              <span className="transform group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-3xl font-extrabold text-[#0f172a] mb-4">Aún no hay programas publicados</h3>
              <p className="text-gray-500 text-lg">Estamos preparando nuevos entrenamientos. ¡Vuelve pronto!</p>
            </div>
          )}
        </div>
      </section>


    </div>
  )
}
