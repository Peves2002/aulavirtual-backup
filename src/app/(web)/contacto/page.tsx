import Image from 'next/image'

import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { eyebrow, sectionDesc } from '@/features/web/home/components/typography'

import { ContactList, ContactActions, ScheduleSection, FAQSection } from './components/ContactoClient'

export const metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto con nosotros',
}

export default function ContactoPage() {
  return (
    <>
      {/* Hero con imagen de fondo */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '6rem 1.5rem 5rem',
          minHeight: '380px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background Image */}
        <Image
          src="/images/contacto-hero.jpg"
          alt="Centro de atención al cliente"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />

        {/* Dark overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(1,45,34,0.93) 0%, rgba(2,94,68,0.9) 45%, rgba(15,68,56,0.88) 100%)',
            zIndex: 1,
          }}
        />

        {/* Grid pattern */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* Glow */}
        <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--web-primary-rgb, 37, 146, 127),0.22) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 2 }} />

        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 3, textAlign: 'center' }}>
          <ScrollReveal>
            <p style={{ ...eyebrow, display: 'block', textAlign: 'center', color: 'var(--web-light, #BDD962)', marginBottom: '1rem' }}>
              Estamos aquí para ayudarte
            </p>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.1, marginBottom: '1.25rem', textShadow: '0 2px 16px rgba(0,0,0,0.2)' }}>
              Ponte en{' '}
              <span style={{ color: 'var(--web-light, #BDD962)' }}>Contacto</span>
            </h1>
            <p style={{ ...sectionDesc, color: 'rgba(255,255,255,0.8)', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
              Contáctanos por cualquiera de estos medios y te responderemos a la brevedad.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Cards + Horario + FAQ + CTA */}
      <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <ContactList />
          <ScheduleSection />
          <FAQSection />
          <ContactActions />
        </div>
      </section>
    </>
  )
}
