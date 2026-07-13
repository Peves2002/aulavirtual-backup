import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { eyebrow, sectionDesc } from '@/features/web/home/components/typography'
import { getConfigs } from '@/utils/libs/config'

import { ContactList, ContactActions } from './components/ContactoClient'

export const metadata = {
  title: 'Contacto - ADPH Group',
  description: 'Ponte en contacto con nosotros',
}

export default async function ContactoPage() {
  const configs = await getConfigs()
  const heroTitle = configs['CONTACTO_HERO_TITLE']?.trim() || 'Ponte en Contacto'
  const heroDesc = configs['CONTACTO_HERO_DESC']?.trim() || 'Contáctanos por cualquiera de estos medios y te responderemos a la brevedad.'
  const heroEyebrow = configs['CONTACTO_HERO_EYEBROW']?.trim() || 'Estamos aquí para ayudarte'

  const heroBg = configs['CONTACTO_HERO_IMAGE']?.trim()
  const heroStyle = {
    background: heroBg ? `url(${heroBg}) center/cover no-repeat` : 'linear-gradient(135deg, #13294D 0%, #1B3A6B 45%, #1B3A6B 100%)',
    padding: '6rem 1.5rem 5rem',
    position: 'relative' as any,
    overflow: 'hidden',
  };

  return (
    <>
      {/* Hero */}
      <section style={{ ...heroStyle }}>
        {/* Overlay si hay imagen */}
        {heroBg && <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(19, 41, 77, 0.85)' }} />}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,168,197,0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <ScrollReveal>
            <p style={{ ...eyebrow, display: 'block', textAlign: 'center', color: '#3BA8C5', marginBottom: '1rem' }}>
              {heroEyebrow}
            </p>
            <div
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.1, marginBottom: '1.25rem' }}
              className="[&>p]:m-0"
              dangerouslySetInnerHTML={{ __html: heroTitle }}
            />
            <div
              style={{ ...sectionDesc as any, color: 'rgba(255,255,255,0.75)', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}
              dangerouslySetInnerHTML={{ __html: heroDesc }}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Cards + CTA */}
      <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          <ContactList />

          <ContactActions />
        </div>
      </section>
    </>
  )
}

