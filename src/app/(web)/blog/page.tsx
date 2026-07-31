import Link from 'next/link'

import {  BookOpen,   } from 'lucide-react'

import { getConfigs } from '@/utils/libs/config'
import BlogGrid from '@/features/web/blog/components/BlogGrid'


export const metadata = {
  title: 'Nuestro Blog | Artículos y Tendencias de RRHH | ADPH Group',
  description:
    'Explora nuestros artículos, guías y tendencias en recursos humanos, psicología ocupacional y consultoría organizacional.',
}

const ARTICLES = [
  {
    id: 'pad-articulo-prueba',
    title: 'Centros de datos: la decisión de directorio detrás de su infraestructura digital crítica',
    category: 'Tecnología',
    readTime: '15 min lectura',
    date: '10 de Noviembre, 2024',
    desc: 'Construir, coubicar, migrar a la nube o combinar. Por qué elegir dónde vive y quién controla la información crítica dejó de ser un asunto de tecnología.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    author: 'Fernando Pérez Lizano',
    role: 'Director Académico Adjunto, PAD',
    tags: ['Data Center', 'Infraestructura', 'Soberanía de Datos'],
  },
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
    tags: ['Reclutamiento', 'RRHH', '2026'],
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
    tags: ['Clima', 'Talento'],
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
    tags: ['Salud', 'Legal'],
  },
]

export default async function BlogPage() {
  const configs = await getConfigs()
  let dynamicBlogs = ARTICLES
  const dbBlogsStr = configs.WEB_BLOGS

  if (dbBlogsStr?.trim()) {
    try {
      const parsed = JSON.parse(dbBlogsStr)

      if (parsed.length > 0) {
        const hasMock = parsed.find((b: any) => b.id === 'pad-articulo-prueba')

        if (!hasMock) {
          dynamicBlogs = [ARTICLES[0], ...parsed]
        } else {
          dynamicBlogs = parsed
        }
      }
    } catch (e) {
      console.error('Error parsing dynamic blogs in blog page:', e)
    }
  }

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
          <BlogGrid blogs={dynamicBlogs} />
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
