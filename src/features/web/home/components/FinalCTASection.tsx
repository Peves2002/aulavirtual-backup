'use client'

import { Calendar, MessageCircle, FileText } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { sectionH2, sectionDesc } from './typography'
import EnterpriseContactForm from './EnterpriseContactForm'

const WHATSAPP_NUMBER = '51906741327'

export default function FinalCTASection() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, me gustaría solicitar una propuesta personalizada para mi empresa.')}`

  return (
    <section style={{ backgroundColor: 'hsl(167, 30%, 96%)', padding: '6rem 1rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center' }}>
          <ScrollReveal direction="left">
            <div>
              <p 
                style={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  fontSize: '0.875rem', 
                  fontWeight: 700, 
                  color: 'var(--web-primary, #25927F)', 
                  letterSpacing: '0.1em', 
                  textTransform: 'uppercase', 
                  marginBottom: '1rem' 
                }}
              >
                SECCIÓN: CTA FINAL
              </p>
              <h2 style={{ ...sectionH2, fontSize: 'clamp(2rem, 4vw, 2.75rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Potencia tu equipo y haz <br />
                <span style={{ color: 'var(--web-primary, #25927F)' }}>crecer tu empresa.</span>
              </h2>
              <p style={{ ...sectionDesc, fontSize: '1.125rem', marginBottom: '3rem', maxWidth: '540px' }}>
                Estamos listos para ayudarte a construir un equipo más profesional, competitivo y preparado para los retos del sector turismo.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a 
                  href="#form"
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.75rem', 
                    padding: '1.25rem 2rem', backgroundColor: 'var(--web-dark, #025E44)', 
                    color: '#ffffff', borderRadius: '14px', textDecoration: 'none', 
                    fontWeight: 700, fontFamily: 'Poppins, sans-serif', boxShadow: '0 10px 25px rgba(2, 94, 68, 0.2)'
                  }}
                >
                  <FileText size={20} /> Solicitar propuesta personalizada
                </a>
                
                <a 
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.75rem', 
                    padding: '1.25rem 2rem', backgroundColor: '#ffffff', 
                    color: '#02115C', borderRadius: '14px', textDecoration: 'none', 
                    fontWeight: 700, fontFamily: 'Poppins, sans-serif', border: '1.5px solid #e2e8f0'
                  }}
                >
                  <Calendar size={20} /> Agendar reunión
                </a>

                <a 
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.75rem', 
                    padding: '1.25rem 2rem', backgroundColor: '#25D366', 
                    color: '#ffffff', borderRadius: '14px', textDecoration: 'none', 
                    fontWeight: 700, fontFamily: 'Poppins, sans-serif', boxShadow: '0 10px 25px rgba(37, 211, 102, 0.2)'
                  }}
                >
                  <MessageCircle size={20} /> Hablar por WhatsApp
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div id="form">
              <EnterpriseContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
