'use client'

import { GraduationCap, Zap, Briefcase, Users, MessageCircle, BookOpen, Globe, LayoutGrid, Sparkles } from 'lucide-react'

import ScrollReveal from './ScrollReveal'
import { eyebrow, sectionH2, cardTitle, cardBody } from './typography'

const reasons = [
  {
    icon: GraduationCap,
    title: 'DOCENTES',
    desc: 'Contamos con docentes de Perú y del extranjero con amplia experiencia y conocimientos en su campo que te ayudarán a alcanzar tus objetivos. Nuestros docentes enseñan, motivan e inspiran.',
  },
  {
    icon: Zap,
    title: 'FLEXIBILIDAD',
    desc: 'Presencial o virtual, podrás acomodarte a la opción que mejor te favorezca para aprender. Así como los precios más competitivos para que nadie se quede fuera.',
  },
  {
    icon: Briefcase,
    title: 'BOLSA DE TRABAJO',
    desc: 'Contamos con convenios con Agencias de viaje de Lima y regiones que garantizan vacantes de empleo para los mejores estudiantes. Postula a las oportunidades que publicamos frecuentemente.',
  },
  {
    icon: Users,
    title: 'PERSONALIZACIÓN',
    desc: 'Nuestros cursos presenciales o en vivo son grupos pequeños que ayudarán al docente a compartir mejor sus conocimientos, asesorarte y brindarte una experiencia educativa de alto nivel.',
  },
  {
    icon: MessageCircle,
    title: 'ACOMPAÑAMIENTO',
    desc: 'Al finalizar el curso con CEPAV no termina nuestra relación. Seguiremos en comunicación para continuar siendo parte de tu crecimiento profesional y empresarial.',
  },
  {
    icon: BookOpen,
    title: 'BIBLIOTECA',
    desc: 'Accede a nuestra biblioteca digital de más de 3 mil libros en PDF y nuestra biblioteca física en Los Olivos, con libros sobre ventas, servicio al cliente, administración y marketing.',
  },
  {
    icon: Globe,
    title: 'COMUNIDAD',
    desc: 'Empiezas a ser parte de un grupo que busca hacer la diferencia. Participarás de reuniones de trabajo, negocios y confraternidad para incrementar tus contactos y aprendizaje.',
  },
  {
    icon: LayoutGrid,
    title: 'CURSOS VARIADOS',
    desc: 'Investigamos constantemente para brindarte cursos que te ayuden a emprender tu propio negocio o insertarte laboralmente en el menor tiempo posible.',
  },
  {
    icon: Sparkles,
    title: 'INSPIRAMOS',
    desc: 'Gracias a nuestros alumnos podemos llevar conocimiento gratuito a zonas alejadas y pequeños empresarios para que todos tengan las mismas oportunidades de aprender y crecer.',
  },
]

export default function WhyUsSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <p style={eyebrow}>Excelencia académica</p>
          <h2 style={{ ...sectionH2, fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>¿POR QUÉ ESTUDIAR CON NOSOTROS?</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          {reasons.map((r, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.05}>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <div 
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '12px', 
                    backgroundColor: 'rgba(37, 146, 127, 0.1)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <r.icon size={24} color="var(--web-primary, #25927F)" />
                </div>
                <div>
                  <h3 style={{ ...cardTitle, fontSize: '1.125rem', marginBottom: '0.5rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>{r.title}</h3>
                  <p style={{ ...cardBody, color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6 }}>{r.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
