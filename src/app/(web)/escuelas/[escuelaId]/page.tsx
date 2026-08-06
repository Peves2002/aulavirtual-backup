import Link from 'next/link'


import {
  Play, ChevronRight, GraduationCap, Award, Briefcase, Users, Star, CheckCircle,
  Heart, Lightbulb, TrendingUp, ShieldCheck, Target, Rocket, BookOpen,
  type LucideIcon
} from 'lucide-react'


import AdphHeroForm from '@/features/web/adph/components/AdphHeroForm'
import { ESCUELAS, getEscuela, getEscuelaBrochureUrls } from '@/features/web/adph/data/escuelas'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { getConfigs } from '@/utils/libs/config'
import prisma from '@/utils/libs/prisma'



export const dynamic = 'force-dynamic'

// Defaults compartidos — deben coincidir con los placeholders/fallbacks en
// src/features/admin/edicion-web/components/EdicionWebView.tsx (pestaña Escuelas)
const DEFAULT_SEC1_TITLE = 'Formamos líderes para los <br/><span style="color:#08479b">retos del mañana</span>'
const DEFAULT_SEC1_IMAGE = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80'
const DEFAULT_SEC2_EYEBROW = 'Líneas de Especialización'
const DEFAULT_SEC2_HEADING = 'Certificaciones y Áreas'
const DEFAULT_SEC2_DESC = 'Programas diseñados por expertos para potenciar tu perfil profesional con certificaciones de reconocimiento regional.'
const DEFAULT_SEC2_ESP_IMAGE = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80'
const DEFAULT_SEC2_ESP_TITLE = 'Conviértete en un Experto Certificado'
const DEFAULT_SEC2_ESP_DESC = 'Domina las competencias más demandadas por las organizaciones líderes de Latinoamérica.'
const DEFAULT_SEC2_CONS_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80'
const DEFAULT_SEC2_CONS_TITLE = 'Lidera el Cambio Organizacional'
const DEFAULT_SEC2_CONS_DESC = 'Desarrolla capacidades de consultoría de alto nivel para acompañar a organizaciones en su transformación.'

// Debe coincidir con ICON_OPTIONS en src/features/admin/configuracion/components/ValoresSettings.tsx
const ICON_MAP: Record<string, LucideIcon> = {
  Heart, Lightbulb, Users, TrendingUp, ShieldCheck, Award, Target, Star,
  CheckCircle, Rocket, BookOpen, Briefcase, GraduationCap
}

const DEFAULT_SEC3_STATS = [
  { icon: Users, value: '+10,000', label: 'Egresados' },
  { icon: Briefcase, value: '95%', label: 'Tasa de Empleabilidad' },
  { icon: Star, value: '4.8/5', label: 'Satisfacción Estudiantil' },
  { icon: GraduationCap, value: '100%', label: 'Programas Actualizados' }
]

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
  
  const dbName = configs[`${keyPrefix}_NAME`]?.replace(/<[^>]*>?/gm, '').trim()
  const dbDesc = configs[`${keyPrefix}_DESC`]?.replace(/<[^>]*>?/gm, '').trim()
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

  const brochureUrls = getEscuelaBrochureUrls(configs)

  // Botón CTA de la sección Presentación
  const ctaLabel = configs[`${keyPrefix}_CTA_LABEL`]?.trim() || 'Ver Programas'
  const ctaUrl = configs[`${keyPrefix}_CTA_URL`]?.trim() || '#programas'

  // Título e imagen de la sección Presentación
  const sec1Title = configs[`${keyPrefix}_SEC1_TITLE`]?.trim() || DEFAULT_SEC1_TITLE
  const sec1VideoUrl = configs[`${keyPrefix}_SEC1_VIDEO_URL`]?.trim() || ''
  const sec1Image = configs[`${keyPrefix}_SEC1_IMAGE`]?.trim() || DEFAULT_SEC1_IMAGE

  // Encabezado de la sección "Certificaciones y Áreas"
  const sec2Eyebrow = configs[`${keyPrefix}_SEC2_EYEBROW`]?.trim() || DEFAULT_SEC2_EYEBROW
  const sec2Heading = configs[`${keyPrefix}_SEC2_HEADING`]?.trim() || DEFAULT_SEC2_HEADING
  const sec2Desc = configs[`${keyPrefix}_SEC2_DESC`]?.trim() || DEFAULT_SEC2_DESC

  // Bloques de Certificaciones (imagen + título + descripción)
  const sec2EspImage = configs[`${keyPrefix}_SEC2_ESP_IMAGE`]?.trim() || DEFAULT_SEC2_ESP_IMAGE
  const sec2EspTitle = configs[`${keyPrefix}_SEC2_ESP_TITLE`]?.trim() || DEFAULT_SEC2_ESP_TITLE
  const sec2EspDesc = configs[`${keyPrefix}_SEC2_ESP_DESC`]?.trim() || DEFAULT_SEC2_ESP_DESC
  const sec2ConsImage = configs[`${keyPrefix}_SEC2_CONS_IMAGE`]?.trim() || DEFAULT_SEC2_CONS_IMAGE
  const sec2ConsTitle = configs[`${keyPrefix}_SEC2_CONS_TITLE`]?.trim() || DEFAULT_SEC2_CONS_TITLE
  const sec2ConsDesc = configs[`${keyPrefix}_SEC2_CONS_DESC`]?.trim() || DEFAULT_SEC2_CONS_DESC

  // Estadísticas Generales (4 tarjetas, ícono fijo por posición)
  const statsGenerales = DEFAULT_SEC3_STATS.map((defaultStat, i) => {
    const iconName = configs[`${keyPrefix}_SEC3_STAT${i + 1}_ICON`]?.trim()


return {
      icon: (iconName && ICON_MAP[iconName]) || defaultStat.icon,
      value: configs[`${keyPrefix}_SEC3_STAT${i + 1}_VALUE`]?.trim() || defaultStat.value,
      label: configs[`${keyPrefix}_SEC3_STAT${i + 1}_LABEL`]?.trim() || defaultStat.label
    }
  })

  // "¿Por qué elegir esta escuela?" (3 estadísticas) — el default del stat 2 se calcula dinámicamente
  const statsPorQueElegir = [
    {
      value: configs[`${keyPrefix}_STAT1_VALUE`]?.trim() || '#1',
      label: configs[`${keyPrefix}_STAT1_LABEL`]?.trim() || 'En Calidad Educativa',
      desc: configs[`${keyPrefix}_STAT1_DESC`]?.trim() || 'Respaldado por las mejores instituciones y expertos del sector corporativo.'
    },
    {
      value: configs[`${keyPrefix}_STAT2_VALUE`]?.trim() || `+${new Date().getFullYear() - 2012}`,
      label: configs[`${keyPrefix}_STAT2_LABEL`]?.trim() || 'Años de Experiencia',
      desc: configs[`${keyPrefix}_STAT2_DESC`]?.trim() || 'Transformando la carrera de miles de profesionales en toda Latam.'
    },
    {
      value: configs[`${keyPrefix}_STAT3_VALUE`]?.trim() || '100%',
      label: configs[`${keyPrefix}_STAT3_LABEL`]?.trim() || 'Metodología Práctica',
      desc: configs[`${keyPrefix}_STAT3_DESC`]?.trim() || 'Casos reales de empresas top, diseñados para aplicación inmediata.'
    }
  ]

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
    ctaLabel,
    ctaUrl,
    sec1Title,
    sec1VideoUrl,
    sec1Image,
    sec2Eyebrow,
    sec2Heading,
    sec2Desc,
    sec2EspImage,
    sec2EspTitle,
    sec2EspDesc,
    sec2ConsImage,
    sec2ConsTitle,
    sec2ConsDesc,
    statsGenerales,
    statsPorQueElegir,
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

  // Si hay URL de video, la imagen de Presentación se vuelve un enlace clickeable
  
  const PresentationMediaTag = escuela.sec1VideoUrl ? 'a' : 'div'

  const presentationMediaProps = escuela.sec1VideoUrl
    ? { href: escuela.sec1VideoUrl, target: '_blank', rel: 'noopener noreferrer' }
    : {}

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
        mobileBackgroundImage={escuela.image}
        defaultSchool={escuelaStatic.name}
        brochureUrls={brochureUrls}
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
                <h3
                  className="text-slate-900 font-black text-4xl md:text-5xl leading-tight mb-8 [&>p]:m-0"
                  dangerouslySetInnerHTML={{ __html: escuela.sec1Title }}
                />
                <div className="text-slate-600 text-lg leading-relaxed space-y-6 text-justify">
                  <div dangerouslySetInnerHTML={{ __html: escuela.about ?? '' }} />
                </div>
                <div className="mt-10">
                  <Link href={escuela.ctaUrl} className="bg-[#08479b] hover:bg-[#06316b] text-white px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 transition-all hover:-translate-y-1 hover:shadow-lg">
                    {escuela.ctaLabel} <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <PresentationMediaTag
                {...presentationMediaProps}
                className="relative rounded-none overflow-hidden shadow-2xl group cursor-pointer aspect-video block"
              >
                <img
                  src={escuela.sec1Image}
                  alt="Presentación"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#08479b] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(8,71,155,0.5)] group-hover:bg-[#fcd116] group-hover:text-slate-900 group-hover:scale-110 transition-all duration-300">
                    <Play className="w-8 h-8 ml-1" fill="currentColor" />
                  </div>
                </div>
              </PresentationMediaTag>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Áreas y Certificaciones */}
      <section className="border-b border-slate-200 relative overflow-hidden bg-gray-200">

        {/* Decoración de fondo */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '36px 36px' }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #fcd116 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #fcd116 0%, transparent 70%)' }} />
        </div>

        {/* Encabezado de sección */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-24 pb-16 relative text-center">
          <ScrollReveal>
            <span
              className="inline-flex items-center gap-2 text-[#08479b] font-bold text-xs tracking-[0.2em] uppercase mb-5 px-5 py-2 rounded-full bg-[#08479b]/10 border border-[#08479b]/20"
            >
              <Award className="w-3.5 h-3.5" />
              {escuela.sec2Eyebrow}
            </span>
            <h2
              className="text-slate-900 font-black text-4xl md:text-6xl tracking-tight drop-shadow-sm mb-4 [&>p]:m-0"
              dangerouslySetInnerHTML={{ __html: escuela.sec2Heading }}
            />
            <div
              className="text-slate-600 text-lg max-w-2xl mx-auto [&>p]:m-0"
              dangerouslySetInnerHTML={{ __html: escuela.sec2Desc }}
            />
            {escuela.areas && escuela.areas.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mt-8">
                {escuela.areas.map((area, i) => (
                  <span
                    key={i}
                    className="text-slate-700 text-xs font-semibold px-4 py-2 rounded-full bg-white border border-slate-200"
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}
            <div className="w-20 h-1 mx-auto mt-6 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #fcd116, transparent)' }} />
          </ScrollReveal>
        </div>

        {/* Fila 1 — Especialista: imagen izquierda, contenido derecha */}
        {escuela.certificationsEsp && escuela.certificationsEsp.length > 0 && (
          <ScrollReveal>
            <div className="relative">
              {/* Separador superior */}
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)' }} />
              <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

                {/* Panel imagen */}
                <div className="relative overflow-hidden min-h-[320px] lg:min-h-0 group">
                  <img
                    src={escuela.sec2EspImage}
                    alt="Certificaciones de Especialista"
                    className="w-full h-full object-cover absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105"
                  />

                  {/* Badge flotante */}
                  <div className="absolute top-8 left-8">
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: 'rgba(6,49,107,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(252,209,22,0.3)' }}
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#fcd116' }}>
                        <Award className="w-5 h-5 text-slate-900" />
                      </div>
                      <div>
                        <p className="text-[#fcd116] text-[10px] font-bold uppercase tracking-widest">Línea 01</p>
                        <p className="text-white font-bold text-sm">Especialista</p>
                      </div>
                    </div>
                  </div>

                  {/* Número grande decorativo */}
                  <div className="absolute bottom-8 right-8 text-white/40 font-black text-[120px] leading-none select-none hidden lg:block mix-blend-overlay">01</div>
                </div>

                {/* Panel contenido */}
                <div className="flex flex-col justify-center px-8 lg:px-14 py-14 relative bg-gray-200">
                  {/* Línea vertical decorativa */}
                  <div className="absolute left-0 top-16 bottom-16 w-px hidden lg:block" style={{ background: 'linear-gradient(to bottom, transparent, rgba(252,209,22,0.4), transparent)' }} />

                  <p className="text-[#08479b] text-xs font-bold uppercase tracking-[0.2em] mb-3">Certificaciones de Especialista</p>
                  <h3 className="text-slate-900 font-black text-2xl md:text-3xl leading-tight mb-2">
                    {escuela.sec2EspTitle}
                  </h3>
                  <p className="text-slate-600 text-sm mb-8">{escuela.sec2EspDesc}</p>

                  {/* Lista de certificados */}
                  <div className="space-y-3 mb-8">
                    {escuela.certificationsEsp.map((cert, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group/item bg-white border border-slate-200 hover:shadow-md hover:border-[#08479b]/30"
                      >
                        <span
                          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black text-slate-900 transition-transform duration-300 group-hover/item:scale-110 bg-[#fcd116]"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-slate-700 text-sm font-medium group-hover/item:text-[#08479b] transition-colors">{cert}</span>
                        <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover/item:text-[#fcd116] group-hover/item:translate-x-1 transition-all duration-300" />
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-3 pt-6 border-t border-slate-200">
                    <CheckCircle className="w-4 h-4 text-[#fcd116]" />
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                      {escuela.certificationsEsp.length} certificaciones disponibles
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)' }} />
            </div>
          </ScrollReveal>
        )}

        {/* Fila 2 — Consultor: contenido izquierda, imagen derecha */}
        {escuela.certificationsCons && escuela.certificationsCons.length > 0 && (
          <ScrollReveal delay={0.1}>
            <div className="relative">
              <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

                {/* Panel contenido (izquierda) */}
                <div className="flex flex-col justify-center px-8 lg:px-14 py-14 order-2 lg:order-1 relative bg-gray-200">
                  {/* Línea vertical decorativa */}
                  <div className="absolute right-0 top-16 bottom-16 w-px hidden lg:block" style={{ background: 'linear-gradient(to bottom, transparent, rgba(252,209,22,0.4), transparent)' }} />

                  <p className="text-[#08479b] text-xs font-bold uppercase tracking-[0.2em] mb-3">Certificaciones de Consultor</p>
                  <h3 className="text-slate-900 font-black text-2xl md:text-3xl leading-tight mb-2">
                    {escuela.sec2ConsTitle}
                  </h3>
                  <p className="text-slate-600 text-sm mb-8">{escuela.sec2ConsDesc}</p>

                  {/* Lista de certificados */}
                  <div className="space-y-3 mb-8">
                    {escuela.certificationsCons.map((cert, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group/item bg-white border border-slate-200 hover:shadow-md hover:border-[#08479b]/30"
                      >
                        <span
                          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black text-slate-900 transition-transform duration-300 group-hover/item:scale-110 bg-[#fcd116]"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-slate-700 text-sm font-medium group-hover/item:text-[#08479b] transition-colors">{cert}</span>
                        <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover/item:text-[#fcd116] group-hover/item:translate-x-1 transition-all duration-300" />
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-3 pt-6 border-t border-slate-200">
                    <CheckCircle className="w-4 h-4 text-[#fcd116]" />
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                      {escuela.certificationsCons.length} certificaciones disponibles
                    </span>
                  </div>
                </div>

                {/* Panel imagen (derecha) */}
                <div className="relative overflow-hidden min-h-[320px] lg:min-h-0 order-1 lg:order-2 group">
                  <img
                    src={escuela.sec2ConsImage}
                    alt="Certificaciones de Consultor"
                    className="w-full h-full object-cover absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105"
                  />

                  {/* Badge flotante */}
                  <div className="absolute top-8 right-8">
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: 'rgba(6,49,107,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(252,209,22,0.3)' }}
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#fcd116' }}>
                        <Briefcase className="w-5 h-5 text-slate-900" />
                      </div>
                      <div>
                        <p className="text-[#fcd116] text-[10px] font-bold uppercase tracking-widest">Línea 02</p>
                        <p className="text-white font-bold text-sm">Consultor</p>
                      </div>
                    </div>
                  </div>

                  {/* Número grande decorativo */}
                  <div className="absolute bottom-8 left-8 text-white/40 font-black text-[120px] leading-none select-none hidden lg:block mix-blend-overlay">02</div>
                </div>
              </div>
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)' }} />
            </div>
          </ScrollReveal>
        )}

        {/* Padding inferior */}
        <div className="pb-12" />
      </section>

      {/* 3. Estadísticas Generales (4 White Cards) */}
      <section className="py-20 bg-[#F4F7FC] relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[#F4F7FC]"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {escuela.statsGenerales.map((stat, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)] text-center group hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ backgroundColor: '#08479b15', color: '#08479b' }}>
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
            {escuela.statsPorQueElegir.map((stat, i) => {
              const accentChar = /^[#+]/.test(stat.value) ? stat.value[0] : ''
              const rest = accentChar ? stat.value.slice(1) : stat.value

              return (
                <ScrollReveal key={i} delay={0.1 * (i + 1)}>
                  <div className="px-8 py-6 md:py-0">
                    <div className="text-5xl md:text-7xl font-black text-white mb-4 flex justify-center items-end gap-2">
                      {accentChar && <span className="text-[#3BA8C5]">{accentChar}</span>}{rest}
                    </div>
                    <h4 className="text-white/90 font-bold text-xl mb-3">{stat.label}</h4>
                    <p className="text-white/60 text-sm">{stat.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Programas (Experiencia Internacional Grid Style) */}
      <section id="programas" className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-[#08479b] font-bold text-sm tracking-widest uppercase mb-4">
                Experiencia Educativa
              </h2>
              <h3 className="text-slate-900 font-black text-3xl md:text-5xl tracking-tight">
                Programas Especializados
              </h3>
            </div>
          </ScrollReveal>

          {programasEscuela.length > 0 ? (
            <>
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
              <ScrollReveal delay={0.2}>
                <div className="mt-16 text-center">
                  <Link href="/programas" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-[#08479b] rounded-full hover:bg-[#06316b] hover:shadow-lg hover:-translate-y-1 gap-2">
                    Ver todos los programas <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </ScrollReveal>
            </>
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
