import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { eyebrow, sectionDesc } from '@/features/web/home/components/typography'

import { ContactList, ContactActions } from './components/ContactoClient'

export const metadata = {
  title: 'Contacto - ARM',
  description: 'Ponte en contacto con nosotros',
}

export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.45) 100%), url("/images/cursos.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '0 3rem',
          minHeight: '360px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <p style={{ ...eyebrow, display: 'block', color: 'var(--web-light, #F0D060)', marginBottom: '1rem' }}>
              Estamos aquí para ayudarte
            </p>
            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.15, marginBottom: '1rem', maxWidth: '560px' }}>
              Contáctanos
            </h1>
            <p style={{ ...sectionDesc, color: 'rgba(255,255,255,0.75)', maxWidth: '500px' }}>
              Nuestro equipo está disponible para atender tus consultas sobre cursos, proceso de selección, concursos públicos y asesoría para postular al sector público.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Cards + CTA */}
      <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          <ContactList />

          <ContactActions />
        </div>
      </section>
    </>
  )
}
