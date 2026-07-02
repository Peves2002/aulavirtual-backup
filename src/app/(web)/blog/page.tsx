import Link from 'next/link'

import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react'

export const metadata = {
  title: 'Nuestro Blog | Artículos y Tendencias de RRHH | ADPH Group',
  description:
    'Explora nuestros artículos, guías y tendencias en recursos humanos, psicología ocupacional y consultoría organizacional.',
}

const ARTICLES = [
  {
    id: 'tendencias-seleccion-2026',
    title: 'Tendencias en Selección y Reclutamiento de Personal para el 2026',
    category: 'Reclutamiento & ATS',
    readTime: '5 min lectura',
    date: '15 de Mayo, 2026',
    desc: 'Descubre cómo la inteligencia artificial predictiva y los embudos automatizados están redefiniendo la captación del talento idóneo.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    author: 'Mag. Roberto Castillo',
    role: 'Director de Gestión Humana',
  },
  {
    id: 'importancia-clima-laboral',
    title: 'El Impacto Real del Clima Laboral en la Retención del Talento',
    category: 'Clima Organizacional',
    readTime: '7 min lectura',
    date: '28 de Abril, 2026',
    desc: 'Métricas y estrategias clave para medir la satisfacción de tus colaboradores y reducir la rotación no deseada de forma medible.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    author: 'Mag. Sofía Luna',
    role: 'Consultora de Clima & Cultura',
  },
  {
    id: 'evaluacion-psicosocial-sunafil',
    title: 'Guía Completa para el Monitoreo de Factores de Riesgo Psicosocial',
    category: 'Salud Ocupacional',
    readTime: '10 min lectura',
    date: '10 de Abril, 2026',
    desc: 'Cumplimiento legal y metodología paso a paso para la evaluación psicosocial según las normativas vigentes de fiscalización en la región.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    author: 'Dr. Alberto Varela',
    role: 'Auditor ISO 45001',
  },
]

export default function BlogPage() {
  return (
    <>
      {/* 1. HERO */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <span className="text-[#3BA8C5] font-extrabold text-xs uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
            <BookOpen className="w-3.5 h-3.5" /> Conocimiento y Aprendizaje
          </span>
          <h1 className="text-slate-900 font-black text-4xl md:text-6xl tracking-tight max-w-4xl mx-auto leading-tight">
            Nuestro <span className="text-[#3BA8C5]">Blog Organizacional</span>
          </h1>
          <div className="w-16 h-1.5 bg-[#3BA8C5] mx-auto mt-6 mb-8"></div>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
            Tendencias, herramientas estratégicas e investigación en Gestión de Personas, Seguridad &amp; Salud en el
            Trabajo y Soluciones Tecnológicas de RRHH.
          </p>
        </div>
      </section>

      {/* 2. GRID DE ARTÍCULOS */}
      <section className="py-24 bg-[#FBFCFD] border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map(art => (
              <article
                key={art.id}
                className="bg-white border border-slate-200 hover:shadow-lg transition-all duration-300 rounded-none overflow-hidden group flex flex-col"
              >
                <div className="aspect-[16/10] w-full overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-slate-900 uppercase tracking-wider rounded-none">
                    {art.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#3BA8C5]" /> {art.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#3BA8C5]" /> {art.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight group-hover:text-[#3BA8C5] transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-semibold leading-relaxed mb-6 flex-grow">{art.desc}</p>
                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-slate-800 text-[11px] font-extrabold block leading-tight">{art.author}</span>
                      <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider block mt-0.5">
                        {art.role}
                      </span>
                    </div>
                    <Link
                      href="/contacto"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3BA8C5] uppercase tracking-widest hover:text-[#0083B0] transition-colors flex-shrink-0"
                    >
                      Leer <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEWSLETTER */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>
        <div className="max-w-2xl mx-auto px-6 relative z-10 text-center">
          <span className="text-[#3BA8C5] font-extrabold text-xs uppercase tracking-widest block mb-4">
            Newsletter Informativa
          </span>
          <h2 className="text-white font-black text-3xl tracking-tight mb-6">
            Mantente al día con las mejores prácticas
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-semibold max-w-xl mx-auto leading-relaxed mb-10">
            Suscríbete para recibir mensualmente nuestras últimas publicaciones, tendencias del sector y herramientas
            prácticas de gestión.
          </p>
          <div className="flex flex-wrap gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ingresa tu correo profesional"
              className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-slate-400 px-4 py-3.5 text-sm focus:outline-none focus:border-[#3BA8C5] focus:ring-1 focus:ring-[#3BA8C5] transition-colors rounded-none"
            />
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center bg-[#3BA8C5] hover:bg-[#0083B0] text-white font-extrabold px-6 py-3.5 transition-colors text-xs uppercase tracking-widest rounded-none"
            >
              Suscribirme
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
