'use client'

import { useRef, useState } from 'react'

import Link from 'next/link'

import {
  BookOpen,
  ChevronRight,
  Clock,
  Eye,
  Play,
  Search,
  Share2,
  Sparkles,
  Tag,
  Tv,
  User,
  Volume2,
} from 'lucide-react'

const CATEGORIES = ['Todos', 'Salud y Estrés', 'Cambio y Liderazgo', 'Atracción de Talento', 'Desarrollo y Bienestar']

const VIDEOS = [
  {
    id: 'xESDwun6IV4',
    title: 'Webinar: Gestión del Cambio Organizacional',
    speaker: 'Mg. Fernando Castillo',
    category: 'Cambio y Liderazgo',
    views: '1.4k vistas',
    duration: '45 min',
    desc: 'Aprende a estructurar un plan estratégico para guiar a tus colaboradores a través de procesos complejos de transformación corporativa, mitigando riesgos de rechazo y reforzando la cultura organizacional.',
  },
  {
    id: '67egtjiYLck',
    title: 'Actualización CENSOPAS COPSOQ Corto 2 - ISTAS',
    speaker: 'Psic. Javier Saenz',
    category: 'Salud y Estrés',
    views: '2.1k vistas',
    duration: '58 min',
    desc: 'Análisis profundo y metodológico de la aplicación práctica del cuestionario oficial COPSOQ ISTAS 21, indispensable para las auditorías de vigilancia de la salud psicosocial.',
  },
  {
    id: 'R1iBKf0LMbw',
    title: 'Workshop: Selección por Competencias',
    speaker: 'MBA. Elmer Requejo P.',
    category: 'Atracción de Talento',
    views: '980 vistas',
    duration: '1h 15m',
    desc: 'Claves y técnicas prácticas para guiar tus entrevistas laborales bajo el enfoque por competencias, permitiéndote predecir con exactitud el rendimiento óptimo de tus candidatos.',
  },
  {
    id: 'eGUmvnJtG28',
    title: 'Inbound Recruiting y su Aplicación',
    speaker: 'Mg. Lisbeth Suarez',
    category: 'Atracción de Talento',
    views: '750 vistas',
    duration: '52 min',
    desc: 'Cómo aplicar técnicas de marketing digital y Employer Branding para crear embudos de reclutamiento magnéticos que atraigan de forma automática al talento altamente calificado.',
  },
  {
    id: 'osHaYBkCqN4',
    title: 'Plan de Desarrollo Individual PDI',
    speaker: 'Mg. Jose Guevara',
    category: 'Desarrollo y Bienestar',
    views: '1.1k vistas',
    duration: '38 min',
    desc: 'Metodología detallada para elaborar Planes de Desarrollo Individual efectivos que retengan a tus talentos clave y los preparen para futuras promociones organizacionales.',
  },
  {
    id: 'CSNxK2j4cq0',
    title: 'Teletrabajo en las Organizaciones',
    speaker: 'Dr. Franklin Rios',
    category: 'Desarrollo y Bienestar',
    views: '1.2k vistas',
    duration: '48 min',
    desc: 'Aspectos clave de la implementación legal, ergonómica y metodológica del trabajo remoto en Latinoamérica, asegurando compliance y productividad del equipo.',
  },
  {
    id: 'rvsSHPYgxqk',
    title: 'Inteligencia Emocional en tiempos de crisis',
    speaker: 'Mg. Alvaro Romero',
    category: 'Desarrollo y Bienestar',
    views: '1.8k vistas',
    duration: '50 min',
    desc: 'Cómo desarrollar resiliencia emocional e interpersonal a nivel gerencial para mantener a los equipos motivados y cohesionados en entornos de alta incertidumbre laboral.',
  },
  {
    id: 'jkFze2dwlec',
    title: 'Gestión del Estrés en las Organizaciones - Edición 1',
    speaker: 'Mg. Javier Saenz',
    category: 'Salud y Estrés',
    views: '1.5k vistas',
    duration: '1h 05m',
    desc: 'Diagnósticos iniciales y herramientas preventivas para reducir el índice de estrés laboral y síndrome de burnout en empresas de alta exigencia.',
  },
  {
    id: 'zIwhFFyArgc',
    title: 'Herramientas para el Liderazgo Femenino',
    speaker: 'Mg. Jessica Delfino',
    category: 'Cambio y Liderazgo',
    views: '920 vistas',
    duration: '42 min',
    desc: 'Desarrollo de competencias de alto impacto directivo, negociación estratégica e inteligencia relacional para potenciar el rol de la mujer líder en las organizaciones.',
  },
  {
    id: 'R7UCCc5k8qg',
    title: 'Diseño de Juegos: Gamificación Empresarial',
    speaker: 'Dr. Seikei Cámara Yoshimoto',
    category: 'Desarrollo y Bienestar',
    views: '810 vistas',
    duration: '1h 10m',
    desc: 'Uso estratégico de Serious Play y dinámicas de juego aplicadas a la inducción (onboarding), aprendizaje interno y fidelización de colaboradores corporativos.',
  },
  {
    id: 'ARjWMsaXhOM',
    title: 'Selección de Personal centrado en las Personas',
    speaker: 'MBA. Elmer Requejo',
    category: 'Atracción de Talento',
    views: '1.3k vistas',
    duration: '55 min',
    desc: 'Cómo rediseñar el viaje del postulante (Candidate Journey) bajo un enfoque empático, brindando retroalimentación de valor y fortaleciendo la imagen de marca.',
  },
  {
    id: '04TfqCyxb1M',
    title: 'Gestión del Estrés en las Organizaciones - Edición 2',
    speaker: 'Mg. Javier Saenz',
    category: 'Salud y Estrés',
    views: '1.1k vistas',
    duration: '57 min',
    desc: 'Segunda sesión con planes de acción colectivos y dinámicas de bienestar para implantar climas laborales óptimos centrados en la salud integral.',
  },
  {
    id: 'cFTAngxAgEg',
    title: 'Diseña una Organización Eficiente',
    speaker: 'Mg. Pedro de la Fuente',
    category: 'Cambio y Liderazgo',
    views: '1.6k vistas',
    duration: '1h 02m',
    desc: 'Análisis técnico de estructuras organizativas, redefinición de jerarquías óptimas y alineación de funciones corporativas para reducir cuellos de botella.',
  },
]

export default function AdphEntrenamientoDigital() {
  const [activeVideo, setActiveVideo] = useState(VIDEOS[0])
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedLink, setCopiedLink] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)

  const filteredVideos = VIDEOS.filter(vid => {
    const matchesCategory = selectedCategory === 'Todos' || vid.category === selectedCategory
    const query = searchQuery.toLowerCase()
    const matchesSearch = vid.title.toLowerCase().includes(query) || vid.speaker.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })

  const handleVideoSelect = (video: (typeof VIDEOS)[0]) => {
    setActiveVideo(video)
    playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/entrenamiento-digital?v=${activeVideo.id}`)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  return (
    <>
      {/* 1. HERO */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <span className="text-[#3BA8C5] font-extrabold text-xs uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
            <Tv className="w-3.5 h-3.5" /> Entrenamiento Digital &amp; ADPH TV
          </span>
          <h1 className="text-slate-900 font-black text-4xl md:text-6xl tracking-tight max-w-4xl mx-auto leading-tight">
            Aula de <span className="text-[#3BA8C5]">Capacitación Ejecutiva</span>
          </h1>
          <div className="w-16 h-1.5 bg-[#3BA8C5] mx-auto mt-6 mb-8"></div>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
            Accede a nuestra exclusiva videoteca de masterclasses y seminarios web grabados, diseñados para formar a
            los mejores líderes en Talento y Seguridad Ocupacional.
          </p>
        </div>
      </section>

      {/* 2. REPRODUCTOR DESTACADO (estilo Netflix) */}
      <section className="py-16 bg-[#FBFCFD] border-b border-slate-100" ref={playerRef}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="bg-slate-900 rounded-none overflow-hidden border border-slate-800 shadow-2xl p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* Pantalla principal */}
            <div className="flex-1 space-y-4">
              <div className="relative aspect-video w-full overflow-hidden border border-white/5 shadow-2xl bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.id}?rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              <div className="flex items-center justify-between text-slate-400 text-xs px-2">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#3BA8C5]" /> {activeVideo.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#3BA8C5]" /> {activeVideo.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-[#3BA8C5]" /> Audio HD
                  </span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 hover:text-white transition-colors font-bold text-xs"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#3BA8C5]" />
                  {copiedLink ? '¡Copiado!' : 'Compartir'}
                </button>
              </div>
            </div>

            {/* Panel de detalles */}
            <div className="w-full lg:w-[380px] flex flex-col justify-between text-left space-y-6 lg:py-4">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#3BA8C5]/20 border border-[#3BA8C5]/30 text-[#3BA8C5] text-[9px] font-extrabold uppercase tracking-widest">
                  <Sparkles className="w-3 h-3" /> Reproduciendo ahora
                </div>

                <h2 className="text-white font-black text-2xl lg:text-3xl tracking-tight leading-tight">
                  {activeVideo.title}
                </h2>

                <div className="space-y-1 bg-white/5 p-4 border border-white/5">
                  <span className="text-slate-500 text-[9px] font-extrabold uppercase tracking-wider block">
                    Expositor / Facilitador
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-8 h-8 rounded-full bg-[#3BA8C5]/20 flex items-center justify-center text-[#3BA8C5]">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-white text-sm font-extrabold block leading-none">{activeVideo.speaker}</span>
                      <span className="text-slate-400 text-[10px] font-bold block mt-0.5">
                        Consultor Asociado - ADPH Group
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-semibold">{activeVideo.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-3.5">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">
                  Categoría del entrenamiento
                </span>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#3BA8C5]" />
                  <span className="text-slate-200 text-xs font-bold">{activeVideo.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FILTROS Y CATÁLOGO */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-slate-100 pb-6">
            {/* Chips de categoría */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all duration-300 rounded-none ${
                    selectedCategory === cat
                      ? 'bg-[#3BA8C5] text-white border-[#3BA8C5] shadow-md'
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Buscador */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Buscar webinar o facilitador..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#3BA8C5] focus:ring-1 focus:ring-[#3BA8C5] transition-colors font-semibold rounded-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* GRID DE VIDEOS */}
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map(vid => {
                const isActive = vid.id === activeVideo.id

                return (
                  <div
                    key={vid.id}
                    className={`bg-white border p-5 flex flex-col justify-between text-left transition-all duration-300 relative group overflow-hidden rounded-none ${
                      isActive ? 'border-[#3BA8C5] shadow-lg' : 'border-slate-200 hover:shadow-lg'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 right-0 bg-[#3BA8C5] text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1 rounded-none">
                        En pantalla
                      </div>
                    )}

                    <div>
                      <div
                        onClick={() => handleVideoSelect(vid)}
                        className="relative aspect-video w-full overflow-hidden mb-5 border border-slate-100 cursor-pointer"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                          alt={vid.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/45 transition-colors duration-300 flex items-center justify-center">
                          <div className="w-11 h-11 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-[#3BA8C5] group-hover:scale-110 transition-all duration-300">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-2.5 right-2.5 bg-slate-900/70 text-white text-[9px] font-black px-2 py-0.5">
                          {vid.duration}
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-[#3BA8C5] mb-2">
                        <Tag className="w-2.5 h-2.5" /> {vid.category}
                      </span>

                      <h3
                        onClick={() => handleVideoSelect(vid)}
                        className="text-slate-900 font-black text-base md:text-lg mb-2 line-clamp-2 hover:text-[#3BA8C5] transition-colors cursor-pointer leading-snug"
                      >
                        {vid.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-slate-500 mb-4 text-xs font-bold">
                        <User className="w-3.5 h-3.5 text-[#3BA8C5]" />
                        <span>{vid.speaker}</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 mt-3">
                      <button
                        onClick={() => handleVideoSelect(vid)}
                        className={`w-full font-extrabold py-3.5 uppercase text-[9px] tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 rounded-none ${
                          isActive
                            ? 'bg-[#3BA8C5] text-white'
                            : 'bg-slate-50 text-slate-700 hover:bg-[#3BA8C5] hover:text-white'
                        }`}
                      >
                        Ver Entrenamiento <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4 rounded-none">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Tv className="w-6 h-6" />
              </div>
              <h3 className="text-slate-900 font-black text-lg">No se encontraron webinars</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Prueba cambiando de categoría o utilizando otro término en la barra de búsqueda. Tenemos más de 10
                webinars oficiales listos para tu capacitación.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('Todos')
                    setSearchQuery('')
                  }}
                  className="px-4 py-2 bg-[#3BA8C5] text-white text-xs font-bold uppercase tracking-wider rounded-none"
                >
                  Restablecer Filtros
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CTA FINAL */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>
        <div className="max-w-2xl mx-auto px-6 relative z-10 text-center">
          <span className="text-[#3BA8C5] font-extrabold text-xs uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
            <BookOpen className="w-3.5 h-3.5" /> Capacitación Completa &amp; Campus
          </span>
          <h2 className="text-white font-black text-3xl md:text-4xl tracking-tight mb-6 mt-4">
            ¿Buscas certificar tus conocimientos en gestión humana?
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-semibold max-w-xl mx-auto leading-relaxed mb-10">
            Nuestros webinars de Entrenamiento Digital son excelentes introducciones. Llévate el aprendizaje al
            siguiente nivel matriculándote en nuestros Diplomados y Programas con Certificación Oficial avalada por
            ADPH Group.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/programas"
              className="inline-flex items-center gap-2 bg-[#3BA8C5] hover:bg-[#0083B0] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-none transition-colors shadow-lg"
            >
              Explorar Programas <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ficha-de-inscripcion"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-none transition-colors"
            >
              Ficha de Inscripción <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
