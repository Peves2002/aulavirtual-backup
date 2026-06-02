import Link from 'next/link'

import { TrendingUp, Briefcase, Target, ArrowRight, CheckCircle2, Users, BookOpen, Award } from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import HeroCarousel from '@/features/web/ace/HeroCarousel'
import HomeCoursesSection from '@/features/web/home/components/HomeCoursesSection'

export const metadata = {
  title: 'ACE Consulting PERÚ — Academia de Capacitación Ejecutiva',
  description: 'Cursos, eBooks y capacitación ejecutiva en emprendimiento, mundo corporativo y ventas.',
}

async function getFeaturedCourses() {
  try {
    const coursesRaw = await prisma.curso.findMany({
      where: { estado: 'PUBLICADO' },
      include: {
        profesor: { select: { nombre: true, apellido: true, avatar: true } },
        categoria: { select: { nombre: true } },
        _count: { select: { inscripciones: true } },
      },
      orderBy: { creado_en: 'desc' },
      take: 6,
    })

    const courses = await Promise.all(
      coursesRaw.map(async (c) => {
        const lecciones = await prisma.leccion.count({ where: { modulo: { curso_id: c.id } } })

        return {
          ...c,
          precio: Number(c.precio),
          precio_oferta: c.precio_oferta ? Number(c.precio_oferta) : null,
          _count: { ...c._count, lecciones },
        }
      })
    )

    return JSON.parse(JSON.stringify(courses))
  } catch {
    return []
  }
}

export default async function HomePage() {
  const courses = await getFeaturedCourses()

  return (
    <>
      {/* ── 1. HERO CARRUSEL ── */}
      <HeroCarousel />

      {/* ── 2. POR QUÉ ELEGIR ACE ── */}
      <section className="bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Nuestra propuesta</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold mb-6">¿Por qué elegir ACE?</h2>
            <ul className="space-y-4">
              {[
                'Contenido diseñado por especialistas con experiencia real.',
                '100% virtual y asincrónico: aprende a tu ritmo.',
                'Más de 30 cursos y eBooks disponibles.',
                'Enfoque práctico orientado a resultados.',
                'Certificación al finalizar cada programa.',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: '30+', l: 'Cursos y eBooks' },
              { n: '100%', l: 'Virtual y asincrónico' },
              { n: '3', l: 'Ejes temáticos' },
              { n: '+1K', l: 'Profesionales capacitados' },
            ].map((s) => (
              <div key={s.l} className="p-6 rounded-xl bg-background border border-border text-center shadow-sm">
                <div className="text-3xl font-bold text-primary">{s.n}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CURSOS DESTACADOS ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Formación ejecutiva</span>
            <h2 className="mt-1 text-3xl md:text-4xl font-bold">Cursos destacados</h2>
            <p className="mt-2 text-muted-foreground">Programas diseñados por especialistas con experiencia real.</p>
          </div>
          <Link
            href="/cursos"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>
        <HomeCoursesSection courses={courses} />
        <div className="flex justify-center mt-8 sm:hidden">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Ver todos los cursos <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── 4. EJES TEMÁTICOS ── */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">Nuestros 3 ejes temáticos</h2>
            <p className="mt-3 text-muted-foreground">Un portafolio académico con más de 30 cursos y eBooks.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: TrendingUp, title: 'Emprendimiento', desc: 'Lanza, valida y escala tu negocio con herramientas prácticas.' },
              { icon: Briefcase, title: 'Mundo Corporativo', desc: 'Liderazgo, gestión y desarrollo profesional de alto desempeño.' },
              { icon: Target, title: 'Ventas y Comercio', desc: 'Técnicas modernas para cerrar más y mejor en cualquier mercado.' },
            ].map((f) => (
              <div key={f.title} className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all hover:shadow-[var(--shadow-elegant)]">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'var(--gradient-brand)' }}>
                  <f.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. NOSOTROS ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Quiénes somos</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold mb-5">
              Academia de Capacitación Ejecutiva
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              ACE Consulting PERÚ nace como un emprendimiento para la Asesoría y Consultoría de Empresas.
              En pandemia se redefinió como Academia de Capacitación Ejecutiva virtual y asincrónica,
              creando más de 30 cursos y eBooks en torno a tres ejes: emprendimiento, mundo corporativo,
              y ventas y comercio.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Nuestra misión: brindar capacitación de alto impacto para potenciar el talento humano
              y el desarrollo empresarial, formando líderes comprometidos con resultados.
            </p>
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Conocernos más <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: BookOpen, title: '+30', sub: 'Cursos y eBooks', desc: 'Contenido especializado en 3 ejes temáticos' },
              { icon: Users, title: '+1K', sub: 'Profesionales', desc: 'Formados a través de nuestros programas' },
              { icon: Award, title: '100%', sub: 'Certificados', desc: 'Al finalizar cada programa ejecutivo' },
              { icon: Target, title: '3', sub: 'Ejes temáticos', desc: 'Emprendimiento, corporativo y ventas' },
            ].map((s) => (
              <div key={s.sub} className="p-6 rounded-2xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'var(--gradient-brand)' }}>
                  <s.icon className="text-white" size={20} />
                </div>
                <div className="text-2xl font-bold text-primary">{s.title}</div>
                <div className="font-semibold text-sm mt-0.5">{s.sub}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA FINAL ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl p-10 md:p-14 text-center" style={{ background: 'var(--gradient-brand)' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white">¿Listo para empezar?</h2>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">
            Conversemos sobre el programa que mejor se adapte a tus objetivos.
          </p>
          <Link
            href="/contacto"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Contáctanos <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
