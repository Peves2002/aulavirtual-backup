'use client'

import { CheckCircle2, Star, Briefcase, GraduationCap, Video, Users, TrendingUp, Mic, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { eyebrow, sectionH2, sectionDesc, cardTitle, cardBody } from '@/features/web/home/components/typography'

export default function BeTeacherSection() {
  const formLink = 'https://forms.gle/YtiThzjW9uUziux79'

  return (
    <section id="convocatoria-docente" style={{ backgroundColor: '#ffffff', padding: '6rem 1.5rem', borderTop: '1px solid #f1f5f9' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={eyebrow}>CONVOCATORIA ABIERTA</p>
          <h2 style={{ ...sectionH2, fontSize: 'clamp(2.25rem, 5vw, 3rem)' }}>CONVIÉRTETE EN DOCENTE DE CEPAV</h2>
          <p style={{ ...sectionDesc, fontSize: '1.25rem', color: 'var(--web-primary, #25927F)', fontWeight: 600, marginTop: '0.5rem' }}>
            Inspira. Enseña. Trasciende en el sector turismo.
          </p>
        </div>

        {/* Intro */}
        <div style={{ maxWidth: '900px', margin: '0 auto 5rem', textAlign: 'center' }}>
          <p style={{ ...cardBody, fontSize: '1.125rem', lineHeight: 1.8 }}>
            En CEPAV estamos formando la mejor comunidad educativa especializada en turismo del Perú y Latinoamérica. 
            Buscamos docentes, especialistas y profesionales en activo que deseen compartir su experiencia real, 
            inspirar a miles de agentes de viaje y dejar huella en la industria.
          </p>
          <p style={{ ...cardBody, fontSize: '1.125rem', fontWeight: 600, marginTop: '1.5rem', color: 'var(--web-dark, #025E44)' }}>
            Si dominas un tema, te apasiona enseñar y quieres potenciar tu marca personal, esta convocatoria es para ti.
          </p>
        </div>

        {/* Grid Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          
          {/* Perfil */}
          <ScrollReveal direction="up">
            <div style={{ padding: '2.5rem', borderRadius: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', height: '100%' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(37, 146, 127, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Users size={24} color="var(--web-primary, #25927F)" />
              </div>
              <h3 style={{ ...cardTitle, fontSize: '1.25rem', marginBottom: '1.5rem' }}>Perfil del Docente</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Agentes de viaje con experiencia comprobada', 'Gerentes, jefes o profesionales del sector', 'Especialistas en áreas clave del turismo', 'Emprendedores turísticos', 'Consultores o conferencistas'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9375rem', color: '#475569' }}>
                    <CheckCircle2 size={18} color="var(--web-primary, #25927F)" style={{ flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Temas */}
          <ScrollReveal direction="up" delay={0.1}>
            <div style={{ padding: '2.5rem', borderRadius: '24px', backgroundColor: 'var(--web-dark, #025E44)', border: '1px solid rgba(255,255,255,0.1)', height: '100%' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(189, 217, 98, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Star size={24} color="var(--web-light, #BDD962)" />
              </div>
              <h3 style={{ ...cardTitle, fontSize: '1.25rem', marginBottom: '1.5rem', color: '#ffffff' }}>Temas Prioritarios</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                {['Ventas y cierre comercial', 'Marketing digital turístico', 'Servicio y experiencia del cliente', 'Cotizaciones y rentabilidad', 'OTAs, GDS e IA en turismo', 'Marca personal y liderazgo'].map((item, i) => (
                  <div key={i} style={{ padding: '0.5rem 1rem', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>
                    • {item}
                  </div>
                ))}
              </div>
              <p style={{ marginTop: '1.5rem', fontSize: '0.8125rem', color: 'var(--web-light, #BDD962)', fontStyle: 'italic' }}>* Puedes proponer otros temas relevantes.</p>
            </div>
          </ScrollReveal>

          {/* Requisitos */}
          <ScrollReveal direction="up" delay={0.2}>
            <div style={{ padding: '2.5rem', borderRadius: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', height: '100%' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(37, 146, 127, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Briefcase size={24} color="var(--web-primary, #25927F)" />
              </div>
              <h3 style={{ ...cardTitle, fontSize: '1.25rem', marginBottom: '1.5rem' }}>Requisitos</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Mínimo 3 años de experiencia en el tema', 'Experiencia laboral real y actualizada', 'Habilidad para comunicar conceptos claros', 'Compromiso con la calidad educativa', 'Disponibilidad para grabación'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9375rem', color: '#475569' }}>
                    <CheckCircle2 size={18} color="var(--web-primary, #25927F)" style={{ flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Beneficios */}
        <div style={{ backgroundColor: 'hsl(167, 30%, 98%)', borderRadius: '32px', padding: '4rem 3rem', marginBottom: '5rem', border: '1px solid hsl(167, 30%, 94%)' }}>
          <h3 style={{ ...sectionH2, fontSize: '1.75rem', marginBottom: '3rem', textAlign: 'center' }}>Beneficios de ser Docente CEPAV</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              { icon: TrendingUp, text: 'Monetización de tu conocimiento' },
              { icon: Video, text: 'Producción profesional de tus cursos' },
              { icon: Star, text: 'Impulso de tu marca personal' },
              { icon: Globe, text: 'Alcance nacional e internacional' },
              { icon: Users, text: 'Comunidad de expertos del sector' },
              { icon: Mic, text: 'Capacitación docente continua' },
            ].map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                  <b.icon size={20} color="var(--web-primary, #25927F)" />
                </div>
                <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1e293b' }}>{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Postular */}
        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', padding: '4rem', borderRadius: '32px', background: 'linear-gradient(135deg, var(--web-dark, #025E44) 0%, var(--web-primary, #25927F) 100%)', color: '#ffffff' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>¿CÓMO POSTULAR?</h3>
            <p style={{ fontSize: '1.125rem', marginBottom: '2.5rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Completa el formulario y cuéntanos sobre ti, tu experiencia y los temas que te apasiona enseñar.
            </p>
            <a 
              href={formLink} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '0.75rem', 
                padding: '1.25rem 2.5rem', backgroundColor: 'var(--web-light, #BDD962)', 
                color: 'var(--web-dark, #025E44)', borderRadius: '14px', textDecoration: 'none', 
                fontWeight: 800, fontSize: '1.125rem', transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(189, 217, 98, 0.3)'
              }}
            >
              Formulario de postulación <ArrowRight size={20} />
            </a>
            <p style={{ marginTop: '2.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
              ENTRENA · INNOVA · TRASCIENDE
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

const Globe = ({ size, color }: { size: number, color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
)
