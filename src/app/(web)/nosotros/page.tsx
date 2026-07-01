import Image from 'next/image'

import { Eye, Target, History } from 'lucide-react'

import PageHero from '@/features/web/ace/PageHero'

export const metadata = {
  title: 'Nosotros — ACE Consulting PERÚ',
  description: 'Conoce la historia, misión y visión de ACE Consulting PERÚ.',
}

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        badge="NOSOTROS"
        title="Quiénes somos"
        description="Una academia de capacitación ejecutiva nacida del emprendimiento real, comprometida con el desarrollo profesional y empresarial."
        image="/others/nosotros.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-6 md:grid-cols-3">
        {[
          {
            icon: History,
            title: 'Nuestra historia',
            body: 'ACE Consulting PERÚ nace como un emprendimiento para la Asesoría y Consultoría de Empresas. En pandemia se redefinió como Academia de Capacitación Ejecutiva virtual y asincrónica, creando más de 30 cursos y eBooks en torno a tres ejes: emprendimiento, mundo corporativo, y ventas y comercio.',
          },
          {
            icon: Target,
            title: 'Misión',
            body: 'Brindar capacitación y consultoría de alto impacto para potenciar el talento humano y el desarrollo empresarial. Formar profesionales competitivos y líderes comprometidos con resultados, acompañando a las organizaciones en su mejora continua mediante conocimiento, innovación y excelencia.',
          },
          {
            icon: Eye,
            title: 'Visión',
            body: 'Impulsar el crecimiento personal y empresarial a través de la capacitación continua. Fortalecer empresas con talento de alto desempeño y cultura de mejora constante, convirtiéndonos en la mejor opción para la capacitación ejecutiva en el entorno digital.',
          },
        ].map((c) => (
          <div key={c.title} className="p-8 rounded-2xl bg-card border border-border">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'var(--gradient-brand)' }}>
              <c.icon className="text-white" size={22} />
            </div>
            <h2 className="text-xl font-semibold mb-3">{c.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
          </div>
        ))}
      </section>

      {/* ── Fundador ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Liderazgo</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Nuestro fundador</h2>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Foto — card de perfil */}
          <div className="md:col-span-2 rounded-3xl overflow-hidden shadow-2xl border border-border bg-card">
            <div className="relative">
              <Image
                src="/others/manuel-perfil.jpg"
                alt="Manuel Nieto Courrejolles"
                width={600}
                height={750}
                className="w-full h-auto block object-cover object-top"
                priority
              />
              {/* Gradiente inferior */}
              <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 100%)' }} />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xl font-bold text-white leading-tight">Manuel Nieto Courrejolles</p>
                <p className="text-sm font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.78)' }}>
                  Fundador &amp; CEO — ACE Consulting PERÚ
                </p>
              </div>
            </div>
            {/* Franja con +30 años */}
            <div className="flex items-center justify-center gap-3 py-4 px-6"
              style={{ background: 'var(--gradient-brand)' }}>
              <span className="text-2xl font-extrabold text-white">+30</span>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.8)' }}>años de experiencia ejecutiva</span>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-3 flex flex-col gap-5 text-muted-foreground text-base leading-relaxed">
            <p>
              Ejecutivo con más de treinta años de experiencia y especial habilidad en la administración
              y organización de empresas líderes en el mercado.
            </p>
            <p>
              Amplio dominio en la formación de equipos de alto rendimiento, planeamiento y supervisión
              integral de procesos. Responsable directo del manejo global de estrategias de mercado,
              campañas de servicio, calidad total de servicio brindado a los clientes, productividad
              y rentabilidad.
            </p>
            <p>
              Con estudios de Ingeniería Industrial en la <strong className="text-foreground">Universidad de Lima</strong>,
              cuenta con el Primer Programa de Especialización para Ejecutivos (PEE) en Administración de{' '}
              <strong className="text-foreground">ESAN</strong>, así como un Management Ejecutivo Gerencial en{' '}
              <strong className="text-foreground">CENTRUM Business School</strong> de la Universidad Católica del Perú.
            </p>
            <p>
              Ha participado en el Curso Gerencial <em>Train The Trainer</em> (TTT) en Sao Paulo, Brasil.
              Cuenta con Cursos de Sistemas de Gestión en Mapeo de Procesos e Indicadores dictado por el{' '}
              <strong className="text-foreground">TÜV Rheinland de Argentina</strong>, además de haber participado
              como Trainee en el Programa de Coaching Inteligente Personalizado con el{' '}
              <strong className="text-foreground">Instituto de Liderazgo Gandhi</strong>.
            </p>

            {/* Credenciales destacadas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {[
                { label: 'Ingeniería Industrial', sub: 'Universidad de Lima' },
                { label: 'PEE en Administración', sub: 'ESAN' },
                { label: 'Management Ejecutivo Gerencial', sub: 'CENTRUM — PUCP' },
                { label: 'Train The Trainer (TTT)', sub: 'Sao Paulo, Brasil' },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border">
                  <span className="mt-0.5 flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-snug">{c.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl p-10 text-center" style={{ background: 'var(--gradient-brand)' }}>
          <p className="text-xl md:text-2xl font-semibold text-white italic">
            &ldquo;Más capacitación, mejores personas, mejores empresas, mejores resultados.&rdquo;
          </p>
        </div>
      </section>
    </>
  )
}
