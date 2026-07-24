import Link from 'next/link'

import {
  ArrowRight, Award, BookOpen, CheckCircle, CheckCircle2,
  Clock, GraduationCap, HeartPulse, Hammer, Scale, Sparkles, Users,
} from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'
import { getTipoProgramaConfig } from '@/utils/configs/tipoPrograma'
import { isFeatureEnabled } from '@/utils/configs/projectFeatures'
import SearchCertificateSection from '@/features/web/home/components/SearchCertificateSection'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import ClassFeaturesSection from '@/features/web/home/components/ClassFeaturesSection'
import HomeEbooksSection from '@/features/web/home/components/HomeEbooksSection'
import ClientLogosMarquee from '@/features/web/home/components/ClientLogosMarquee'
import RutasSection from '@/features/web/home/components/RutasSection'

export const metadata = {
  title: 'Aula Virtual — Despierta tu talento, impulsa tu futuro',
  description: 'Diplomados, especializaciones y programas online. Formación de alto nivel.',
}

const audiences = [
  { icon: GraduationCap, label: 'Docentes', color: 'text-brand-teal' },
  { icon: Scale, label: 'Abogados', color: 'text-brand-orange' },
  { icon: Hammer, label: 'Ingenieros', color: 'text-brand-lime' },
  { icon: HeartPulse, label: 'Salud', color: 'text-brand-teal' },
]

const pillars = [
  { icon: BookOpen, title: 'Conocimiento profundo', text: 'Programas diseñados para dominar tu campo, no solo aprobarlo. Contenido riguroso, actualizado y aplicable.' },
  { icon: Users, title: 'Atención cercana', text: 'Acompañamos cada consulta con compromiso real. No eres un número: eres un profesional que merece superar sus expectativas.' },
  { icon: Award, title: 'Certificación que pesa', text: 'Diplomados y especializaciones que respaldan tu hoja de vida y abren puertas en el mercado peruano y la región.' },
]

async function getHomeData() {
  try {
    const courseInclude = {
      profesor: { select: { nombre: true, apellido: true, avatar: true } },
      categoria: { select: { id: true, nombre: true } },
      _count: { select: { modulos: true, inscripciones: true } }
    }

    const [coursesRaw, diplomadosRaw, especializacionesRaw, teachersRaw, configs, ebooksRaw, rutasRaw] = await Promise.all([
      prisma.curso.findMany({
        where: { estado: 'PUBLICADO', tipo: 'CURSO' },
        include: courseInclude,
        orderBy: { creado_en: 'desc' },
        take: 6
      }),
      prisma.curso.findMany({
        where: { estado: 'PUBLICADO', tipo: 'DIPLOMADO' },
        include: courseInclude,
        orderBy: { creado_en: 'desc' },
        take: 6
      }),
      prisma.curso.findMany({
        where: { estado: 'PUBLICADO', tipo: 'ESPECIALIZACION' },
        include: courseInclude,
        orderBy: { creado_en: 'desc' },
        take: 6
      }),

      // Profesores
      prisma.usuario.findMany({
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
        take: 8,
      }),
      getConfigs(),

      // Ebooks destacados
      isFeatureEnabled('ebooks')
        ? prisma.ebook.findMany({
          where: { estado: 'PUBLICADO' },
          select: {
            id: true, titulo: true, slug: true, miniatura: true,
            autor: true, precio: true, precio_falso: true, moneda: true,
            es_gratis: true, paginas: true, genero: true,
            categoria: { select: { nombre: true } },
          },
          orderBy: { creado_en: 'desc' },
          take: 5,
        })
        : Promise.resolve([]),
        
      // Rutas (Paquetes) destacados
      isFeatureEnabled('rutas')
        ? prisma.rutaAprendizaje.findMany({
            where: { esta_activo: true },
            include: {
              cursos: {
                orderBy: { orden: 'asc' },
                include: {
                  curso: {
                    select: {
                      id: true, titulo: true, miniatura: true, slug: true, precio: true, moneda: true, es_gratis: true
                    }
                  }
                }
              },
              _count: { select: { cursos: true } }
            },
            orderBy: { creado_en: 'desc' },
            take: 3
          })
        : Promise.resolve([]),
    ])

    const courses = await Promise.all(
      coursesRaw.map(async course => {
        const leccionesCount = await prisma.leccion.count({ where: { modulo: { curso_id: course.id } } })

        return { ...course, _count: { ...course._count, lecciones: leccionesCount } }
      })
    )

    const diplomados = await Promise.all(
      diplomadosRaw.map(async course => {
        const leccionesCount = await prisma.leccion.count({ where: { modulo: { curso_id: course.id } } })

        return { ...course, _count: { ...course._count, lecciones: leccionesCount } }
      })
    )

    const especializaciones = await Promise.all(
      especializacionesRaw.map(async course => {
        const leccionesCount = await prisma.leccion.count({ where: { modulo: { curso_id: course.id } } })

        return { ...course, _count: { ...course._count, lecciones: leccionesCount } }
      })
    )

    const heroImg = configs.HOME_HERO_IMAGE || '/images/pagina/banner.png'
    const waNumber = configs.WHATSAPP_NUMERO || ''
    const waLink = waNumber ? `https://wa.me/${waNumber}` : '#'

    const ebooks = ebooksRaw.map(e => ({
      ...e,
      precio: Number(e.precio),
      precio_falso: Number(e.precio_falso),
    }))

    const rutas = rutasRaw ? rutasRaw.map((ruta: any) => ({
      ...ruta,
      total_cursos: ruta._count.cursos,
      cursos: ruta.cursos.map((rc: any) => rc.curso)
    })) : []

    return {
      courses: JSON.parse(JSON.stringify(courses)),
      diplomados: JSON.parse(JSON.stringify(diplomados)),
      especializaciones: JSON.parse(JSON.stringify(especializaciones)),
      teachers: JSON.parse(JSON.stringify(teachersRaw)),
      ebooks: JSON.parse(JSON.stringify(ebooks)),
      rutas: JSON.parse(JSON.stringify(rutas)),
      heroImg,
      waLink,
      logos: [],
    }
  } catch {
    return {
      courses: [], diplomados: [], especializaciones: [], teachers: [], ebooks: [], rutas: [],
      heroImg: '/images/pagina/banner.png',
      waLink: '#',
      logos: [],
    }
  }
}

export default async function HomePage() {
  const { courses, ebooks, rutas, heroImg, waLink, logos } = await getHomeData()

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-edu-pattern text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:px-8 lg:py-28">
          <div className="lg:col-span-7">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
                Educación profesional online
              </span>
            </div>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
              Despierta tu{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-brand-orange">talento</span>
                <span className="absolute inset-x-0 bottom-2 -z-0 h-3 bg-white/10" />
              </span>
              ,<br />
              impulsa tu <span className="text-brand-teal">futuro</span>.
            </h1>
            <p className="mt-7 max-w-xl text-lg text-white/80">
              Diplomados, especializaciones y programas de actualización para
              docentes, abogados, ingenieros y profesionales de la salud.
              Aprende online sin perder el rigor.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/cursos"
                className="group inline-flex items-center gap-2 rounded-full bg-orange-gradient px-7 py-3.5 text-sm font-bold text-white shadow-glow transition-base hover:scale-[1.03] no-underline"
              >
                Explorar cursos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition-base hover:bg-white/15 no-underline"
              >
                Hablar por WhatsApp
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {audiences.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur transition-base hover:bg-white/10"
                >
                  <Icon className={`h-6 w-6 ${color}`} />
                  <div className="mt-3 text-sm font-semibold">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-brand-teal/40 blur-3xl" />
            <div className="absolute -bottom-10 right-0 h-52 w-52 rounded-full bg-brand-orange/30 blur-3xl" />
            <div className="relative animate-float overflow-hidden rounded-3xl border border-white/20 shadow-glow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImg}
                alt="Profesionales"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-white p-4 text-foreground shadow-soft">
              <div className="text-3xl font-extrabold text-brand-navy">+1.2k</div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Profesionales formados
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLOR STRIPE */}
      <div className="grid h-3 grid-cols-4">
        <div className="bg-brand-teal" />
        <div className="bg-brand-navy" />
        <div className="bg-brand-lime" />
        <div className="bg-brand-orange" />
      </div>

      {/* PILLARS */}
      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
              ¿Por qué elegirnos?
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-balance text-foreground sm:text-5xl">
              Conocimiento que transforma carreras
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              No formamos por formar. Cada programa está pensado para que vuelvas
              al trabajo con herramientas reales y una versión más sólida de ti.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div key={title} className="group hover-lift rounded-3xl border border-border bg-card p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-hero-gradient text-white shadow-soft">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-foreground">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIG CTA SLOGAN */}
      <section className="relative overflow-hidden bg-hero-gradient py-24 text-white">
        <div className="absolute inset-0 opacity-30 bg-edu-pattern" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="font-display text-5xl font-extrabold leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
            La distancia entre dónde estás
            <br />
            y dónde quieres llegar
            <br />
            <span className="text-brand-orange">se llama formación.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/80">
            Únete a la comunidad de profesionales que decidieron no esperar a
            que la oportunidad llegue.
          </p>
          <Link
            href="/cursos"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-brand-navy shadow-glow transition-base hover:scale-[1.03] no-underline"
          >
            Ver programas disponibles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CURSOS DESTACADOS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-14 lg:grid-cols-5">

            {/* Izquierda: texto */}
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
                Programas destacados
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-balance text-foreground sm:text-5xl">
                Empieza a aprender hoy
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Accede a programas diseñados por expertos del sector. Aprende a tu
                ritmo, obtén certificación y transforma tu carrera profesional
                desde cualquier lugar del Perú.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  'Contenido actualizado y riguroso',
                  'Certificados con validez profesional',
                  'Soporte y acompañamiento personalizado',
                  'Acceso de por vida al material',
                ].map(t => (
                  <li key={t} className="flex items-center gap-3 text-sm text-foreground/80">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-teal" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href="/cursos"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-orange-gradient px-7 py-3.5 text-sm font-bold text-white shadow-soft transition-base hover:shadow-glow no-underline"
              >
                Ver todos los programas <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Derecha: cursos */}
            <div className="lg:col-span-3">
              {courses.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {courses.map((c: any) => (
                    <article key={c.id} className="group hover-lift relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card">
                      <div className="relative flex h-28 items-end justify-between p-5 text-white bg-hero-gradient">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        {c.categoria && (
                          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur">
                            {c.categoria.nombre}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-display text-base font-bold leading-snug text-foreground">
                          {c.titulo}
                        </h3>
                        {c.descripcion && (
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                            {c.descripcion}
                          </p>
                        )}
                        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {c._count?.modulos || 0} módulos
                          </span>
                          <Link href={`/cursos/${c.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-brand-navy transition-base group-hover:text-brand-orange no-underline">
                            Ver curso <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center rounded-3xl border border-border bg-secondary">
                  <div className="text-center">
                    <GraduationCap className="mx-auto h-12 w-12 mb-3 text-foreground/20" />
                    <p className="text-muted-foreground">Próximamente habrá cursos disponibles.</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── PAQUETES (RUTAS) ─────────────────────────── */}
      {isFeatureEnabled('rutas') && (
        <RutasSection rutas={rutas} />
      )}

      {/* ── 2. LOGO MARQUEE ─────────────────────────── */}
      <ClientLogosMarquee logos={logos} />

      {/* WHY CHOOSE */}
      <section className="bg-secondary py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/pagina/cl.png"
                alt="Lo que nos distingue"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -right-4 -top-4 hidden h-32 w-32 rounded-3xl bg-orange-gradient shadow-glow lg:block" />
            <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-2xl bg-brand-lime shadow-soft lg:block" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
              Lo que nos distingue
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-balance text-foreground sm:text-5xl">
              Una institución pensada para que tú llegues más lejos
            </h2>
            <ul className="mt-10 space-y-5">
              {[
                'Diplomados con sustento académico y enfoque práctico.',
                'Docentes con experiencia real en su campo profesional.',
                'Acompañamiento personalizado durante todo el programa.',
                'Plataforma flexible: estudia a tu ritmo, sin perder calidad.',
                'Certificación que respalda tu hoja de vida.',
              ].map(t => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-brand-teal" />
                  <span className="text-base text-foreground/85">{t}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/nosotros"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-hero-gradient px-7 py-3.5 text-sm font-bold text-white shadow-soft transition-base hover:shadow-glow no-underline"
            >
              Conoce más sobre nosotros
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. EBOOKS DESTACADOS ────────────────────── */}
      {isFeatureEnabled('ebooks') && ebooks.length > 0 && (
        <HomeEbooksSection ebooks={ebooks} />
      )}

      {/* ── 5. CARACTERÍSTICAS DE CLASES ────────────── */}
      <ClassFeaturesSection />

      {/* ── 9. VERIFICAR CERTIFICADO ────────────────── */}
      <SearchCertificateSection />

      {/* ── 10. CTA INSCRIPCIÓN ─────────────────────── */}
      <section className="bg-white py-16 text-center" style={{ borderTop: '1px solid hsl(214, 20%, 88%)' }}>
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(var(--web-primary-rgb, 37, 146, 127),0.08)', color: 'var(--web-dark, #025E44)' }}
            >
              <CheckCircle size={16} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 600 }}>
                Únete a miles de estudiantes
              </span>
            </div>
            <h2
              className="mb-4"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.02em' }}
            >
              ¿Listo para transformar tu carrera?
            </h2>
            <p
              className="mb-8 max-w-xl mx-auto"
              style={{ fontFamily: 'Poppins, sans-serif', color: 'hsl(215, 16%, 47%)', lineHeight: 1.7 }}
            >
              Inscríbete hoy y comienza a aprender con los mejores profesionales del sector.
            </p>
            <Link
              href="/cursos"
              className="no-underline inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'var(--web-primary, #25927F)', boxShadow: '0 6px 20px rgba(var(--web-primary-rgb, 37, 146, 127),0.35)' }}
            >
              Inscribirse ahora <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
