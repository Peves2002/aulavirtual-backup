import Link from 'next/link'

import { Play, ChevronRight, GraduationCap, Award, Briefcase, Users, Star, CheckCircle } from 'lucide-react'

import AdphHeroForm from '@/features/web/adph/components/AdphHeroForm'
import { ESCUELAS, getEscuela } from '@/features/web/adph/data/escuelas'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { getConfigs } from '@/utils/libs/config'
import prisma from '@/utils/libs/prisma'

export function generateStaticParams() {
  return ESCUELAS.map(e => ({ escuelaId: e.id }))
}

export function generateMetadata({ params }: { params: { escuelaId: string } }) {
  const escuela = getEscuela(params.escuelaId)

  return {
    title: `${escuela.name} - ADPH Group`,
    description: escuela.desc
  }
}

export default async function EscuelaPage({ params }: { params: { escuelaId: string } }) {
  const escuelaStatic = getEscuela(params.escuelaId)
  const configs = await getConfigs()
  
  const keyPrefix = `ESCUELA_${params.escuelaId.toUpperCase().replace(/-/g, '_')}`
  
  const dbName = configs[`${keyPrefix}_NAME`]?.trim()
  const dbDesc = configs[`${keyPrefix}_DESC`]?.trim()
  const dbAbout = configs[`${keyPrefix}_ABOUT`]?.trim()
  const dbImage = configs[`${keyPrefix}_IMAGE`]?.trim()
  const dbHeroBg = configs[`${keyPrefix}_HEROBG`]?.trim()
  
  // Areas: stored as newline-separated text
  const dbAreasStr = configs[`${keyPrefix}_AREAS`]?.trim()
  const dbAreas = dbAreasStr ? dbAreasStr.split('\n').map(s => s.trim()).filter(Boolean) : undefined
  
  // Certs: stored as newline-separated text
  const dbCertsEspStr = configs[`${keyPrefix}_CERTS_ESP`]?.trim()
  const dbCertsEsp = dbCertsEspStr ? dbCertsEspStr.split('\n').map(s => s.trim()).filter(Boolean) : undefined
  
  const dbCertsConsStr = configs[`${keyPrefix}_CERTS_CONS`]?.trim()
  const dbCertsCons = dbCertsConsStr ? dbCertsConsStr.split('\n').map(s => s.trim()).filter(Boolean) : undefined

  const escuela = {
    ...escuelaStatic,
    name: dbName || escuelaStatic.name,
    desc: dbDesc || escuelaStatic.desc,
    about: dbAbout || escuelaStatic.about,
    image: dbImage || escuelaStatic.image,
    heroBg: dbHeroBg || escuelaStatic.heroBg,
    areas: dbAreas || escuelaStatic.areas,
    certificationsEsp: dbCertsEsp || escuelaStatic.certificationsEsp,
    certificationsCons: dbCertsCons || escuelaStatic.certificationsCons,
  }
  
  const cursosDB = await prisma.curso.findMany({
    where: {
      estado: 'PUBLICADO',
      escuela: { in: [escuela.name, escuelaStatic.name] }
    },
    select: {
      id: true,
      slug: true,
      titulo: true,
      duracion: true,
      miniatura: true,
      categoria: { select: { nombre: true } }
    },
    orderBy: { orden: 'asc' }
  })

  const programasEscuela = cursosDB.map(c => ({
    id: c.id,
    slug: c.slug,
    title: c.titulo,
    category: c.categoria?.nombre || escuela.name,
    duration: c.duracion || 'Flexible',
    image: c.miniatura || '/images/default-course.jpg'
  }))

  return (
    <>
      <AdphHeroForm
        title={escuela.name}
        subtitle={escuela.desc}
        backgroundImage={escuela.heroBg}
        defaultSchool={escuela.name}
      />

      {/* 1. Presentación (Sobre la Escuela) */}
      <section className="py-24 bg-[#F4F7FC] border-b border-slate-200/60">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <h2 className="text-[#08479b] font-bold text-sm tracking-widest uppercase mb-4">
                  Presentación de la Escuela
                </h2>
                <h3 className="text-slate-900 font-black text-4xl md:text-5xl leading-tight mb-8">
                  Formamos líderes para los <br />
                  <span className="text-[#08479b]">retos del mañana</span>
                </h3>
                <div className="text-slate-600 text-lg leading-relaxed space-y-6 text-justify">
                  <div dangerouslySetInnerHTML={{ __html: escuela.about }} />
                  <p>
                    Nuestra metodología combina el rigor académico con la aplicación práctica 
                    en entornos reales de negocio, preparándote para destacar en el mercado actual.
                  </p>
                </div>
                <div className="mt-10">
                  <Link href="#programas" className="bg-[#08479b] hover:bg-[#06316b] text-white px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 transition-all hover:-translate-y-1 hover:shadow-lg">
                    Ver Programas <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="relative rounded-none overflow-hidden shadow-2xl group cursor-pointer aspect-video">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80" 
                  alt="Presentación" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#08479b] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(8,71,155,0.5)] group-hover:bg-[#fcd116] group-hover:text-slate-900 group-hover:scale-110 transition-all duration-300">
                    <Play className="w-8 h-8 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Áreas y Certificaciones (Cards) */}
      <section className="py-24 bg-[#08479b] border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-[#fcd116] font-bold text-sm tracking-widest uppercase mb-4">
                Líneas de Especialización
              </h2>
              <h3 className="text-white font-black text-3xl md:text-5xl tracking-tight">
                Certificaciones y Áreas
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {escuela.certificationsEsp && escuela.certificationsEsp.length > 0 && (
              <ScrollReveal delay={0.1}>
                <div className="relative rounded-3xl overflow-hidden h-[400px] group shadow-lg">
                  <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" alt="Especialista" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08479b] via-[#08479b]/70 to-transparent"></div>
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="w-14 h-14 bg-[#fcd116] rounded-2xl flex items-center justify-center mb-6 text-slate-900">
                      <Award className="w-7 h-7" />
                    </div>
                    <h4 className="text-white font-black text-2xl mb-4">Certificaciones de Especialista</h4>
                    <ul className="space-y-3">
                      {escuela.certificationsEsp.map((cert, i) => (
                        <li key={i} className="text-white/80 font-medium flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[#fcd116]" /> {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {escuela.certificationsCons && escuela.certificationsCons.length > 0 && (
              <ScrollReveal delay={0.2}>
                <div className="relative rounded-3xl overflow-hidden h-[400px] group shadow-lg">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" alt="Consultor" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08479b] via-[#08479b]/70 to-transparent"></div>
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="w-14 h-14 bg-[#fcd116] rounded-2xl flex items-center justify-center mb-6 text-slate-900">
                      <Briefcase className="w-7 h-7" />
                    </div>
                    <h4 className="text-white font-black text-2xl mb-4">Certificaciones de Consultor</h4>
                    <ul className="space-y-3">
                      {escuela.certificationsCons.map((cert, i) => (
                        <li key={i} className="text-white/80 font-medium flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[#fcd116]" /> {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* 3. Estadísticas Generales (4 White Cards) */}
      <section className="py-20 bg-[#F4F7FC] relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[#F4F7FC]"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, label: "Egresados", value: "+10,000", color: "#08479b" },
              { icon: Briefcase, label: "Tasa de Empleabilidad", value: "95%", color: "#08479b" },
              { icon: Star, label: "Satisfacción Estudiantil", value: "4.8/5", color: "#08479b" },
              { icon: GraduationCap, label: "Programas Actualizados", value: "100%", color: "#08479b" }
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)] text-center group hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-slate-900 font-black text-3xl mb-2">{stat.value}</h4>
                  <p className="text-slate-500 font-medium uppercase tracking-wider text-xs">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Por qué elegir ADPH (Sección Oscura) */}
      <section className="py-24 bg-[#13294D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-white font-black text-3xl md:text-5xl tracking-tight uppercase">
                ¿Por qué elegir {escuela.name}?
              </h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            <ScrollReveal delay={0.1}>
              <div className="px-8 py-6 md:py-0">
                <div className="text-5xl md:text-7xl font-black text-white mb-4 flex justify-center items-end gap-2">
                  <span className="text-[#3BA8C5]">#</span>1
                </div>
                <h4 className="text-white/90 font-bold text-xl mb-3">En Calidad Educativa</h4>
                <p className="text-white/60 text-sm">Respaldado por las mejores instituciones y expertos del sector corporativo.</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="px-8 py-6 md:py-0">
                <div className="text-5xl md:text-7xl font-black text-white mb-4 flex justify-center items-end gap-2">
                  <span className="text-[#3BA8C5]">+</span>{new Date().getFullYear() - 2012}
                </div>
                <h4 className="text-white/90 font-bold text-xl mb-3">Años de Experiencia</h4>
                <p className="text-white/60 text-sm">Transformando la carrera de miles de profesionales en toda Latam.</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div className="px-8 py-6 md:py-0">
                <div className="text-5xl md:text-7xl font-black text-white mb-4 flex justify-center items-end gap-2">
                  <span className="text-[#3BA8C5]">100</span><span className="text-4xl">%</span>
                </div>
                <h4 className="text-white/90 font-bold text-xl mb-3">Metodología Práctica</h4>
                <p className="text-white/60 text-sm">Casos reales de empresas top, diseñados para aplicación inmediata.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Programas (Experiencia Internacional Grid Style) */}
      <section id="programas" className="py-24 bg-[#08479b]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-[#fcd116] font-bold text-sm tracking-widest uppercase mb-4">
                Experiencia Educativa
              </h2>
              <h3 className="text-white font-black text-3xl md:text-5xl tracking-tight">
                Programas Especializados
              </h3>
            </div>
          </ScrollReveal>

          {programasEscuela.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programasEscuela.map((prog, index) => (
                <ScrollReveal key={prog.id} delay={0.1 * (index % 3)}>
                  <Link href={`/programas/${prog.slug}`} className="block relative h-[450px] rounded-[2rem] overflow-hidden group shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={prog.image} alt={prog.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90"></div>
                    
                    {/* Top Tag */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                      <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                        {prog.duration}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-[#08479b] group-hover:border-[#08479b] transition-colors">
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Content Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="w-12 h-1 bg-[#fcd116] mb-6 rounded-full transform origin-left transition-all duration-300 group-hover:w-20"></div>
                      <h3 className="text-white font-black text-2xl leading-tight mb-3">
                        {prog.title}
                      </h3>
                      <p className="text-white/70 text-sm font-medium">
                        {prog.category}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal delay={0.1}>
              <div className="text-center py-24 bg-white border border-dashed border-slate-300 rounded-3xl">
                <p className="text-slate-500 font-medium text-lg">Próximamente abriremos nuevos programas para esta escuela.</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  )
}
