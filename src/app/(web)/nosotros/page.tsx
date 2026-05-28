import { Compass, Target, Heart, Award, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Nosotros — Aula Virtual',
  description: 'Conoce la visión y misión: formación profesional online de alto nivel.',
}

export default function NosotrosPage() {
  const aboutImg = '/images/pagina/presenta.png'

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-edu-pattern py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
              Sobre nosotros
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
              Formamos a quienes están
              <br />
              <span className="text-brand-orange">decididos</span> a ir más lejos.
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-white/80">
              Desde nuestra sede para todo el Perú: una institución comprometida
              con el crecimiento real de los profesionales que mueven al país.
            </p>
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

      {/* INTRO IMAGE + TEXT */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={aboutImg}
                alt="Profesionales aprendiendo online"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-3xl bg-orange-gradient p-6 text-white shadow-glow lg:block">
              <div className="font-display text-4xl font-extrabold leading-none">10+</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wider">Áreas profesionales</div>
            </div>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
              Quiénes somos
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-balance text-foreground sm:text-5xl">
              Una institución que cree en el poder del conocimiento profundo
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Nacemos para acompañar a docentes, abogados,
              ingenieros, profesionales de la salud y de diversas áreas en su
              proceso continuo de actualización y crecimiento.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Nuestra propuesta combina rigor académico, atención cercana y una
              modalidad online flexible que respeta el tiempo de quienes ya están
              ejerciendo su profesión.
            </p>
          </div>
        </div>
      </section>

      {/* VISION / MISION */}
      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="group relative overflow-hidden rounded-[2rem] bg-hero-gradient p-10 text-white shadow-soft transition-base hover:shadow-glow">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-teal/30 blur-3xl" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <Compass className="h-7 w-7 text-brand-teal" />
                </div>
                <h3 className="mt-6 font-display text-3xl font-extrabold">Visión</h3>
                <p className="mt-5 leading-relaxed text-white/85">
                  Ser la institución líder en el Perú en formación y desarrollo
                  profesional online, reconocida por impulsar la excelencia, el
                  crecimiento y la superación de docentes, abogados, ingenieros,
                  profesionales de la salud y de diversas áreas profesionales, a
                  través de diplomados, especializaciones y programas de
                  actualización orientados al profundo conocimiento, formando
                  líderes preparados para transformar su futuro, generar impacto
                  en la sociedad y contribuir al desarrollo del país.
                </p>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-10 shadow-soft transition-base hover:shadow-glow">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-gradient text-white">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-display text-3xl font-extrabold text-foreground">Misión</h3>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Brindar formación y actualización profesional online de alto
                nivel, mediante diplomados, especializaciones y programas
                académicos orientados al profundo conocimiento, contribuyendo al
                crecimiento y desarrollo de docentes, abogados, ingenieros,
                profesionales de la salud y de diversas áreas profesionales,
                caracterizándonos por una atención cercana, responsable y
                comprometida en resolver cada consulta, orientación o
                requerimiento de nuestros estudiantes, con el propósito de
                superar sus expectativas y acompañarlos en su desarrollo
                profesional.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
              Nuestros valores
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-balance text-foreground sm:text-5xl">
              Lo que nos mueve cada día
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: Award,    title: 'Excelencia', text: 'Estándares altos en cada programa, contenido y experiencia formativa.' },
              { icon: Heart,    title: 'Compromiso', text: 'Atención cercana, responsable y comprometida con cada estudiante.' },
              { icon: Sparkles, title: 'Superación',  text: 'Acompañamos el crecimiento profesional con propósito real.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="hover-lift rounded-3xl border border-border bg-card p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-hero-gradient text-white shadow-soft">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-foreground">{title}</h3>
                <p className="mt-3 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIG SLOGAN */}
      <section className="bg-hero-gradient py-24 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="font-display text-5xl font-extrabold leading-[0.95] text-balance sm:text-6xl">
            Detrás de cada título hay
            <br />
            una <span className="text-brand-orange">historia que vale</span> formar.
          </h2>
        </div>
      </section>
    </>
  )
}
