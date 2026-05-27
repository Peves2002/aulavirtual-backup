'use client'

import { GraduationCap, Zap, Briefcase, Users, MessageCircle, BookOpen, Globe, LayoutGrid, Sparkles } from 'lucide-react'

import ScrollReveal from './ScrollReveal'
import { eyebrowDark, sectionH2Dark } from './typography'

// Alterna entre los dos colores de marca: light (lima) y primary (teal)
const ACCENTS = [
  { color: 'var(--web-light, #BDD962)',   bg: 'rgba(var(--web-light-rgb,   189,217,98),  0.13)', border: 'rgba(var(--web-light-rgb,   189,217,98),  0.25)' },
  { color: 'var(--web-primary, #25927F)', bg: 'rgba(var(--web-primary-rgb, 37,146,127),  0.18)', border: 'rgba(var(--web-primary-rgb, 37,146,127),  0.3)'  },
  { color: 'var(--web-light, #BDD962)',   bg: 'rgba(var(--web-light-rgb,   189,217,98),  0.13)', border: 'rgba(var(--web-light-rgb,   189,217,98),  0.25)' },
  { color: 'var(--web-primary, #25927F)', bg: 'rgba(var(--web-primary-rgb, 37,146,127),  0.18)', border: 'rgba(var(--web-primary-rgb, 37,146,127),  0.3)'  },
  { color: 'var(--web-light, #BDD962)',   bg: 'rgba(var(--web-light-rgb,   189,217,98),  0.13)', border: 'rgba(var(--web-light-rgb,   189,217,98),  0.25)' },
  { color: 'var(--web-primary, #25927F)', bg: 'rgba(var(--web-primary-rgb, 37,146,127),  0.18)', border: 'rgba(var(--web-primary-rgb, 37,146,127),  0.3)'  },
  { color: 'var(--web-light, #BDD962)',   bg: 'rgba(var(--web-light-rgb,   189,217,98),  0.13)', border: 'rgba(var(--web-light-rgb,   189,217,98),  0.25)' },
  { color: 'var(--web-primary, #25927F)', bg: 'rgba(var(--web-primary-rgb, 37,146,127),  0.18)', border: 'rgba(var(--web-primary-rgb, 37,146,127),  0.3)'  },
  { color: 'var(--web-light, #BDD962)',   bg: 'rgba(var(--web-light-rgb,   189,217,98),  0.13)', border: 'rgba(var(--web-light-rgb,   189,217,98),  0.25)' },
]

const reasons = [
  { icon: GraduationCap, title: 'DOCENTES',        desc: 'Contamos con docentes de Perú y del extranjero con amplia experiencia y conocimientos en su campo que te ayudarán a alcanzar tus objetivos. Nuestros docentes enseñan, motivan e inspiran.' },
  { icon: Zap,           title: 'FLEXIBILIDAD',    desc: 'Presencial o virtual, podrás acomodarte a la opción que mejor te favorezca para aprender. Así como los precios más competitivos para que nadie se quede fuera.' },
  { icon: Briefcase,     title: 'BOLSA DE TRABAJO',desc: 'Contamos con convenios con Agencias de viaje de Lima y regiones que garantizan vacantes de empleo para los mejores estudiantes. Postula a las oportunidades que publicamos frecuentemente.' },
  { icon: Users,         title: 'PERSONALIZACIÓN', desc: 'Nuestros cursos presenciales o en vivo son grupos pequeños que ayudarán al docente a compartir mejor sus conocimientos, asesorarte y brindarte una experiencia educativa de alto nivel.' },
  { icon: MessageCircle, title: 'ACOMPAÑAMIENTO',  desc: 'Al finalizar el curso con CEPAV no termina nuestra relación. Seguiremos en comunicación para continuar siendo parte de tu crecimiento profesional y empresarial.' },
  { icon: BookOpen,      title: 'BIBLIOTECA',      desc: 'Accede a nuestra biblioteca digital de más de 3 mil libros en PDF y nuestra biblioteca física en Los Olivos, con libros sobre ventas, servicio al cliente, administración y marketing.' },
  { icon: Globe,         title: 'COMUNIDAD',       desc: 'Empiezas a ser parte de un grupo que busca hacer la diferencia. Participarás de reuniones de trabajo, negocios y confraternidad para incrementar tus contactos y aprendizaje.' },
  { icon: LayoutGrid,    title: 'CURSOS VARIADOS', desc: 'Investigamos constantemente para brindarte cursos que te ayuden a emprender tu propio negocio o insertarte laboralmente en el menor tiempo posible.' },
  { icon: Sparkles,      title: 'INSPIRAMOS',      desc: 'Gracias a nuestros alumnos podemos llevar conocimiento gratuito a zonas alejadas y pequeños empresarios para que todos tengan las mismas oportunidades de aprender y crecer.' },
]

export default function WhyUsSection() {
  return (
    <section style={{
      background: 'linear-gradient(145deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 60%, var(--web-primary, #25927F) 100%)',
      padding: '6rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Blobs decorativos con colores de config */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '450px', height: '450px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(var(--web-light-rgb, 189,217,98), 0.1) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '380px', height: '380px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(var(--web-primary-rgb, 37,146,127), 0.15) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(var(--web-light-rgb, 189,217,98), 0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={eyebrowDark}>Excelencia académica</p>
          <h2 style={{ ...sectionH2Dark, fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
            ¿POR QUÉ ESTUDIAR CON{' '}
            <span style={{ color: 'var(--web-light, #BDD962)' }}>NOSOTROS?</span>
          </h2>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {reasons.map((r, i) => {
            const accent = ACCENTS[i]

            return (
              <ScrollReveal key={i} direction="up" delay={i * 0.05}>
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '20px',
                    padding: '1.75rem',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    gap: '1.25rem',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.25s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.09)'
                    e.currentTarget.style.borderColor = accent.color
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.25)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Icono */}
                  <div style={{
                    width: '48px', height: '48px',
                    borderRadius: '13px',
                    backgroundColor: accent.bg,
                    border: `1px solid ${accent.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <r.icon size={22} color={accent.color} strokeWidth={1.75} />
                  </div>

                  {/* Texto */}
                  <div>
                    <h3 style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.8125rem', fontWeight: 800,
                      color: accent.color,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      marginBottom: '0.5rem',
                    }}>
                      {r.title}
                    </h3>
                    <p style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.62)',
                      lineHeight: 1.65, margin: 0,
                    }}>
                      {r.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
