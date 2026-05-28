import Link from 'next/link'
import {
  ArrowRight, Award, BookOpen, CheckCircle2,
  GraduationCap, HeartPulse, Hammer, Scale, Sparkles, Users,
} from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'

export const metadata = {
  title: 'Aula Virtual — Despierta tu talento, impulsa tu futuro',
  description: 'Diplomados, especializaciones y programas online. Formación de alto nivel.',
}

const audiences = [
  { icon: GraduationCap, label: 'Docentes',   color: 'text-brand-teal'   },
  { icon: Scale,         label: 'Abogados',   color: 'text-brand-orange' },
  { icon: Hammer,        label: 'Ingenieros', color: 'text-brand-lime'   },
  { icon: HeartPulse,    label: 'Salud',      color: 'text-brand-teal'   },
]

const pillars = [
  { icon: BookOpen, title: 'Conocimiento profundo',  text: 'Programas diseñados para dominar tu campo, no solo aprobarlo. Contenido riguroso, actualizado y aplicable.' },
  { icon: Users,    title: 'Atención cercana',       text: 'Acompañamos cada consulta con compromiso real. No eres un número: eres un profesional que merece superar sus expectativas.' },
  { icon: Award,    title: 'Certificación que pesa', text: 'Diplomados y especializaciones que respaldan tu hoja de vida y abren puertas en el mercado peruano y la región.' },
]

async function getHomeData() {
  try {
    const configs = await getConfigs()
    const heroImg = configs.HOME_HERO_IMAGE || '/images/pagina/banner.png'
    const waNumber = configs.WHATSAPP_NUMERO || ''
    const waLink = waNumber ? `https://wa.me/${waNumber}` : '#'

    return { heroImg, waLink }
  } catch {
    return {
      heroImg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1536&q=80',
      waLink: '#',
    }
  }
}

export default async function HomePage() {
  const { heroImg, waLink } = await getHomeData()

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

      {/* AREAS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-6 md:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
                Áreas de formación
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-balance text-foreground sm:text-5xl">
                Programas para cada vocación profesional
              </h2>
            </div>
            <p className="text-lg text-muted-foreground md:text-right">
              Diplomados y especializaciones diseñados con docentes expertos del
              Perú y la región.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: GraduationCap, title: 'Educación',  desc: 'Innovación pedagógica, evaluación por competencias y gestión escolar.',      bg: 'bg-teal-gradient' },
              { icon: Scale,         title: 'Derecho',    desc: 'Penal, civil, laboral y administrativo con casuística actualizada.',          bg: 'bg-orange-gradient' },
              { icon: Hammer,        title: 'Ingeniería', desc: 'Gestión de proyectos, seguridad y especialidades técnicas.',                  bg: 'bg-hero-gradient' },
              { icon: HeartPulse,    title: 'Salud',      desc: 'Atención clínica, gestión hospitalaria y especialidades médicas.',            bg: 'bg-teal-gradient' },
            ].map(({ icon: Icon, title, desc, bg }) => (
              <article key={title} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 hover-lift">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-soft ${bg}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <Link href="/cursos" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-orange story-link no-underline">
                  Ver programas
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

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

      {/* MARQUEE */}
      <section className="overflow-hidden border-y border-border bg-background py-10">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center gap-12 px-6">
              {['Excelencia académica', 'Crecimiento profesional', 'Compromiso real', 'Impacto social', 'Conocimiento profundo', 'Atención cercana', 'Liderazgo formativo'].map(w => (
                <span key={`${k}-${w}`} className="font-display text-3xl font-extrabold uppercase tracking-tight text-foreground/15">
                  {w} <span className="text-brand-orange">●</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-edu-pattern p-12 text-white shadow-soft sm:p-16">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand-orange/40 blur-3xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="font-display text-3xl font-extrabold leading-tight text-balance sm:text-4xl">
                  ¿Listo para dar el siguiente paso en tu carrera?
                </h2>
                <p className="mt-3 text-white/75">
                  Escríbenos por WhatsApp y un asesor te orientará sobre el
                  programa ideal para ti.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 rounded-full bg-orange-gradient px-7 py-4 text-sm font-bold text-white shadow-glow transition-base hover:scale-[1.03] no-underline"
                >
                  Hablar ahora
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
