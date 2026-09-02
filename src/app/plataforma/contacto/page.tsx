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
          background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 45%, var(--web-dark-mid, #0f4438) 100%)',
          padding: '6rem 1.5rem 5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--web-primary-rgb, 37, 146, 127),0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <ScrollReveal>
            <p style={{ ...eyebrow, display: 'block', textAlign: 'center', color: 'var(--web-light, #BDD962)', marginBottom: '1rem' }}>
              Estamos aquí para ayudarte
            </p>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Ponte en Contacto
            </h1>
            <p style={{ ...sectionDesc, color: 'rgba(255,255,255,0.75)', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
              Contáctanos por cualquiera de estos medios y te responderemos a la brevedad.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Cards + CTA */}
      <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          <ContactList />

          <ContactActions />
        </div>
      </section>

      {/* Mapa de Ubicación */}
      <section style={{ width: '100%', height: '450px', backgroundColor: '#ffffff' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.7346473026973!2d-77.13512390789616!3d-12.061769625260231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105cb9137d697bb%3A0x31f3897fd77458d1!2sFrancisco%20Pizarro%20312%2C%20Bellavista%2007016!5e0!3m2!1ses-419!2spe!4v1788296548615!5m2!1ses-419!2spe"
          width="100%"
          height="100%"
          style={{ border: 0, width: '100%', height: '100%', display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Ubicación IFSEC PERÚ S.A.C."
        />
      </section>
    </>
  )
}
