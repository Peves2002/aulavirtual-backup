'use client'

import Link from 'next/link'

import { Facebook, Globe, Instagram, Linkedin, MapPin, Phone, Youtube } from 'lucide-react'

import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { useConfig } from '@/contexts/ConfigContext'

const CONTACT_ADDRESS = 'Lima-San Martin de Porres-Lima - Residencial Montecarlo Mz N Lt 42 - I Etapa'
const CONTACT_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_ADDRESS)}`
const CONTACT_SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: Linkedin },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: Youtube },
]


export function ContactList() {
  const configs = useConfig()
  const waNumber = configs.WHATSAPP_NUMERO || '51900281578'

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
      {[
        { icon: MapPin, title: 'Ubicación', info: CONTACT_ADDRESS, href: CONTACT_MAP_URL },
        { icon: Phone, title: 'WhatsApp / Teléfono 1', info: '+51 900 281 578', href: 'https://wa.me/51900281578' },
        { icon: Phone, title: 'WhatsApp / Teléfono 2', info: '+51 997 407 026', href: 'https://wa.me/51997407026' },
        { icon: Globe, title: 'Sitio Web', info: 'msymconsulting.com', href: 'https://msymconsulting.com/' },
      ].map((item, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
              border: '1.5px solid hsl(214,20%,91%)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onMouseEnter={e => {
              const el = e.currentTarget

              el.style.transform = 'translateY(-4px)'
              el.style.boxShadow = '0 12px 32px rgba(var(--web-primary-rgb, 37, 146, 127),0.12)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget

              el.style.transform = 'translateY(0)'
              el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(var(--web-primary-rgb, 37, 146, 127), 0.1)', marginBottom: '1.25rem' }}>
              <item.icon style={{ width: '28px', height: '28px', color: 'var(--web-primary, #25927F)' }} />
            </div>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              {item.title}
            </h3>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--web-dark, #025E44)', textDecoration: 'none' }}>
                {item.info}
              </a>
            ) : (
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                {item.info}
              </p>
            )}
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}

export function ContactActions() {
  const configs = useConfig()
  const waNumber = configs.WHATSAPP_NUMERO || '51959436827'

  return (
    <ScrollReveal>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        <a
          href={`https://wa.me/${waNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', borderRadius: '9999px',
            backgroundColor: 'var(--web-primary, #25927F)', color: '#ffffff', fontFamily: 'Poppins, sans-serif',
            fontSize: '0.9375rem', fontWeight: 700, textDecoration: 'none', transition: 'background-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--web-dark, #025E44)' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--web-primary, #25927F)' }}
        >
          <Phone size={18} />
          Enviar WhatsApp
        </a>
        <Link
          href="/"
          style={{
            display: 'inline-flex', alignItems: 'center', padding: '0.875rem 2rem', borderRadius: '9999px',
            border: '2px solid var(--web-primary, #25927F)', color: 'var(--web-primary, #25927F)',
            fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'var(--web-primary, #25927F)'
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = 'var(--web-primary, #25927F)'
          }}
        >
          Volver al inicio
        </Link>
      </div>
    </ScrollReveal>
  )
}

export function ContactSocials() {
  return (
    <ScrollReveal>
      <div style={{ margin: '0 auto 4rem', maxWidth: '760px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.35rem', fontWeight: 800, color: '#02115C', marginBottom: '0.5rem' }}>
          Síguenos en nuestras redes sociales
        </h2>
        <p style={{ fontFamily: 'Poppins, sans-serif', color: '#64748b', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
          Conoce nuestras novedades, servicios y contenido especializado.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          {CONTACT_SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.7rem 1rem',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                color: '#02115C',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.82rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={event => {
                event.currentTarget.style.backgroundColor = '#BDD962'
                event.currentTarget.style.borderColor = '#BDD962'
              }}
              onMouseLeave={event => {
                event.currentTarget.style.backgroundColor = '#ffffff'
                event.currentTarget.style.borderColor = '#e2e8f0'
              }}
            >
              <Icon size={17} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}

export function ContactMap() {
  return (
    <ScrollReveal>
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.35rem', fontWeight: 800, color: '#02115C', marginBottom: '0.5rem' }}>
            Encuéntranos
          </h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{CONTACT_ADDRESS}</p>
        </div>
        <div style={{ overflow: 'hidden', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(2,17,92,0.1)', backgroundColor: '#e2e8f0' }}>
          <iframe
            title='Mapa de ubicación de MCY Consulting'
            src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT_ADDRESS)}&output=embed`}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            style={{ display: 'block', width: '100%', minHeight: '340px', border: 0 }}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a href={CONTACT_MAP_URL} target='_blank' rel='noopener noreferrer' style={{ color: '#176958', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none' }}>
            Abrir ubicación en Google Maps
          </a>
        </div>
      </div>
    </ScrollReveal>
  )
}
