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
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?fit=crop&w=1920&h=640&q=80"
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
