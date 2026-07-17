import fs from 'fs'

import path from 'path'

import React from 'react'

import Link from 'next/link'

import prisma from '@/utils/libs/prisma'
import ClientLogosMarquee from '@/features/web/home/components/ClientLogosMarquee'
import HeroCarousel from '@/features/web/home/components/HeroCarousel'

// Función para formatear de kebab-case a Sentence case (Modo oración)
const toSentenceCase = (str: string) => {
  const words = str.split('-').filter(Boolean).map(w => w.toLowerCase())

  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  }

  
return words.join(' ')
}

function getFirstImage(dir: string): string | null {
  if (!fs.existsSync(dir)) return null
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)

    if (fs.statSync(fullPath).isDirectory()) {
      const res = getFirstImage(fullPath)

      if (res) return res
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(item)) {
      return fullPath
    }
  }

  
return null
}

export default async function LandingPage() {
  // Cargar clientes
  const clientesDir = path.join(process.cwd(), 'public', 'images', 'clientes')
  let logos: { label: string; url: string }[] = []

  if (fs.existsSync(clientesDir)) {
    const files = fs.readdirSync(clientesDir)

    logos = files
      .filter(f => /\.(jpg|jpeg|png|svg)$/i.test(f))
      .map(f => ({
        label: toSentenceCase(f.replace(/\.[^/.]+$/, '')),
        url: `/images/clientes/${f}`
      }))
  }

  // Cargar servicios
  const serviciosDir = path.join(process.cwd(), 'public', 'images', 'servicios')
  let servicios: { slug: string; displayName: string; image: string | null }[] = []

  if (fs.existsSync(serviciosDir)) {
    const dirs = fs.readdirSync(serviciosDir).filter(d => fs.statSync(path.join(serviciosDir, d)).isDirectory())

    servicios = dirs.map(dir => {
      const imgPath = getFirstImage(path.join(serviciosDir, dir))
      const url = imgPath ? '/' + imgPath.replace(/\\/g, '/').split('/public/')[1] : null

      
return {
        slug: dir,
        displayName: toSentenceCase(dir),
        image: url
      }
    })
  }

  // Cargar cursos de base de datos
  const cursos = await prisma.curso.findMany({
    where: { estado: 'PUBLICADO' },
    select: { id: true, titulo: true, miniatura: true, slug: true },
    orderBy: { creado_en: 'desc' },
    take: 6,
  })

  // Recopilar imágenes para el hero, omitiendo la imagen actual (la de andamios)
  const currentHeroImage = '/images/servicios/entrenamientos-vivenciales/armado-de-andamios/whatsapp-image-2025-05-19-at-2.32.01-pm-1.jpeg'
  const allImages = [
    ...(servicios.map((s) => s.image).filter(Boolean) as string[]),
    ...(cursos.map((c) => c.miniatura).filter(Boolean) as string[]),
    '/images/operativa.jpg'
  ]
  const heroImages = Array.from(new Set(allImages)).filter(img => img !== currentHeroImage).slice(0, 5) // max 5 images for performance

  return (
    <div className="flex flex-col relative bg-[#f8fafc] overflow-hidden">
      
      {/* ── HERO SECTION (DARK PREMIUM) ── */}
      <section className="relative mt-20 h-[calc(100vh-5rem)] flex items-center overflow-hidden bg-[#020817]">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[var(--web-primary)]/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1f7d6d]/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none translate-y-1/3"></div>
        </div>

        <div className="px-6 md:px-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 text-[var(--web-light)] rounded-full font-semibold text-xs mb-5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[var(--web-light)] animate-pulse shadow-[0_0_10px_rgba(189,217,98,0.8)]"></span>
              Operaciones de Alto Riesgo
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-[1.1] tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
              Lideres en gestión de <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--web-light)] to-[var(--web-primary)] text-2xl sm:text-3xl md:text-4xl">
                Transporte de Materiales Peligrosos, Gestión de Riesgo y Entrenamientos Vivenciales
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 mb-6 leading-relaxed max-w-lg font-light">
              Más de 19 años brindando soluciones integrales para minería, industria y transporte.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/cursos" className="inline-flex items-center justify-center bg-gradient-to-r from-[var(--web-primary)] to-[#1f7d6d] text-white font-bold py-3 px-8 rounded-full shadow-[0_8px_30px_rgba(37,146,127,0.4)] hover:shadow-[0_12px_40px_rgba(37,146,127,0.6)] hover:-translate-y-1 transition-all duration-300 no-underline group">
                Explorar Programas
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              <Link href="/contacto" className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-white font-bold py-3 px-8 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 no-underline">
                Contáctanos
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-8 text-white/60 text-sm font-medium">
              <div className="flex flex-col"><span className="text-xl font-bold text-white mb-0.5">17+</span> Años de Experiencia</div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="flex flex-col"><span className="text-xl font-bold text-white mb-0.5">2K+</span> Profesionales Capacitados</div>
            </div>
          </div>

          <div className="relative w-full aspect-square max-h-[55vh] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group" style={{ isolation: 'isolate' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent z-10 opacity-80 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--web-primary)]/20 to-transparent z-10 mix-blend-overlay pointer-events-none"></div>
            <HeroCarousel images={heroImages} />

            <div className="absolute bottom-8 left-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl shadow-xl max-w-xs transform -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
              <div className="w-9 h-9 bg-[var(--web-primary)] rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h4 className="text-white font-bold text-sm mb-1">Certificación Internacional</h4>
              <p className="text-white/70 text-xs">Acreditados bajo las normas más exigentes de la industria.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENTES MARQUEE ── */}
      {logos.length > 0 && (
        <div className="py-14 relative z-20" style={{ backgroundColor: '#f8fafc' }}>
          <ClientLogosMarquee logos={logos} />
        </div>
      )}

      {/* ── NOSOTROS (MODERN LIGHT) ── */}
      <section className="bg-[#fcfcfc] py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-full font-semibold text-xs mb-6 uppercase tracking-widest">Nuestra Historia</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-6 tracking-tight leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            Una historia construida sobre experiencia, compromiso y resultados.
          </h2>
          
          <div className="text-gray-500 mb-8 leading-relaxed font-light text-sm md:text-base">
            <div className="relative w-full md:w-1/2 lg:w-5/12 aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group float-none md:float-left mb-8 md:mb-6 md:mr-12 mt-4 md:mt-6 lg:mr-14">
              {/* Decorative offset border */}
              <div className="absolute inset-0 border-2 border-[var(--web-primary)]/20 rounded-[2.5rem] transform translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
              <img src="/images/operativa.jpg" alt="Nosotros IFSEC Group" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-[2.5rem] relative z-10" />
            </div>

            <div className="space-y-4">
              <p>Nuestra historia se ha construido superando cada desafío y transformando la experiencia en soluciones que generan valor para nuestros clientes.</p>
              <p>A lo largo de los años hemos evolucionado para brindar servicios integrales en seguridad operacional, gestión de riesgos, respuesta a emergencias y operaciones especializadas, manteniendo como pilares la excelencia, la innovación y la mejora continua.</p>
              <p>Este compromiso nos ha permitido desarrollar programas de capacitación altamente especializados, con metodologías teórico-prácticas y entrenamientos vivenciales que fortalecen las competencias de los participantes.</p>
              <p>Hoy hemos capacitado a más de 2,000 profesionales, contribuyendo al desarrollo de una cultura de seguridad, liderazgo y respuesta efectiva en organizaciones de diversos sectores productivos.</p>
              <p>Desde nuestros inicios, hemos acompañado a organizaciones de los sectores minero, industrial y energético, brindando soluciones especializadas en gestión de riesgos, respuesta a emergencias, capacitación y servicios operativos. Cada proyecto ejecutado ha fortalecido nuestro propósito de contribuir a operaciones más seguras, eficientes y sostenibles.</p>
            </div>
            
            <div className="mt-8 clear-both">
              <Link href="/nosotros" className="inline-flex items-center justify-center text-[var(--web-primary)] font-bold gap-2 hover:gap-4 transition-all uppercase tracking-wide text-sm no-underline group">
                Descubre nuestra trayectoria 
                <span className="w-8 h-8 rounded-full bg-[var(--web-primary)]/10 flex items-center justify-center text-[var(--web-primary)] group-hover:bg-[var(--web-primary)] group-hover:text-white transition-colors">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS (GRID PREMIUM) ── */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-[var(--web-primary)]/10 text-[var(--web-primary)] rounded-full font-semibold text-xs mb-6 uppercase tracking-widest">Soluciones</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-6 tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>Nuestros Servicios</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg font-light">Estrategias integrales diseñadas para garantizar la continuidad y seguridad de tus operaciones industriales.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-left">
            {servicios.map((servicio, index) => (
              <Link href={`/servicios/${servicio.slug}`} key={servicio.slug} className="group flex flex-col h-full no-underline relative bg-[#fcfcfc] rounded-3xl border border-gray-100 p-3 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-300">
                <div className="w-full aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {servicio.image ? (
                    <img src={servicio.image} alt={servicio.displayName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <span className="text-gray-400 text-xs text-center leading-tight">SIN<br/>IMAGEN</span>
                  )}
                  <div className="absolute bottom-4 right-4 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-[var(--web-primary)]">
                    &rarr;
                  </div>
                </div>
                <div className="px-3 pb-4 flex-1 flex flex-col">
                  <span className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">0{index + 1}</span>
                  <h3 className="text-xl font-bold text-[#0f172a] leading-tight group-hover:text-[var(--web-primary)] transition-colors">{servicio.displayName}</h3>
                </div>
              </Link>
            ))}
          </div>
          
          <Link href="/servicios" className="inline-flex items-center justify-center bg-[#0f172a] text-white font-bold py-4 px-10 rounded-full hover:bg-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300 no-underline">
            Ver Catálogo de Servicios
          </Link>
        </div>
      </section>

      {/* ── CURSOS ── */}
      <section className="bg-[#f8fafc] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[var(--web-primary)]/10 text-[var(--web-primary)] rounded-full font-semibold text-xs mb-6 uppercase tracking-widest">#TheHazmatCompany</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-6 tracking-tight leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
              Capacitación y Entrenamiento Especializado para <span className="text-[var(--web-primary)]">Operaciones Críticas, de Alto Riesgo y Seguridad Operacional</span>
            </h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-lg font-light leading-relaxed">
              Entrenamientos diseñados por especialistas con experiencia en operaciones mineras, transporte de materiales peligrosos, respuesta a emergencias y gestión de riesgos. Formación práctica orientada a la seguridad, productividad y cumplimiento normativo.
            </p>
          </div>

          {cursos.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {cursos.map(curso => (
                <Link href={`/plataforma/cursos/${curso.slug}`} key={curso.slug} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 no-underline flex flex-col">
                  <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {curso.miniatura ? (
                      <img src={curso.miniatura} alt={curso.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 font-bold text-xs tracking-widest">SIN IMAGEN</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-[#0f172a] leading-tight mb-4 group-hover:text-[var(--web-primary)] transition-colors line-clamp-2">{curso.titulo}</h3>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ver programa</span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[var(--web-primary)] group-hover:text-white transition-colors text-[var(--web-primary)]">
                        &rarr;
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-16">Próximamente habrá programas disponibles.</p>
          )}

          <div className="text-center">
            <Link href="/cursos" className="inline-flex items-center justify-center bg-[var(--web-primary)] text-white font-bold py-4 px-10 rounded-full hover:bg-[#1f7d6d] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 no-underline">
              Ver todos los programas
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
