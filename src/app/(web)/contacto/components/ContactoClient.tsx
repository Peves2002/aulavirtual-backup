'use client'

import { useState } from 'react'

import Link from 'next/link'

import { Phone, Mail, MapPin, Clock, ChevronDown } from 'lucide-react'

import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { useConfig } from '@/contexts/ConfigContext'
import { buildWhatsAppUrl, normalizeWhatsAppNumber } from '@/utils/functions/whatsapp'

export function ContactList() {
  const configs = useConfig()
  const waNumber = normalizeWhatsAppNumber(configs.WHATSAPP_NUMERO) || '51928510125'
  const waHref = buildWhatsAppUrl(configs.WHATSAPP_NUMERO)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
      {[
        { icon: MapPin, title: 'Ubicación', info: 'Arequipa, Perú', color: '#ef4444' },
        { icon: Phone, title: 'WhatsApp', info: `+${waNumber}`, href: waHref, color: '#25D366' },
        { icon: Mail, title: 'Email', info: configs.SMTP_USER || 'info@ejemplo.com', href: `mailto:${configs.SMTP_USER || 'info@ejemplo.com'}`, color: '#3b82f6' },
      ].map((item, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '20px',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              border: '1.5px solid rgba(255,255,255,0.6)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget

              el.style.transform = 'translateY(-8px)'
              el.style.boxShadow = '0 20px 48px rgba(var(--web-primary-rgb, 37, 146, 127),0.15), 0 1px 3px rgba(0,0,0,0.04)'
              el.style.borderColor = 'var(--web-primary, #25927F)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget

              el.style.transform = 'translateY(0)'
              el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)'
              el.style.borderColor = 'rgba(255,255,255,0.6)'
            }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: `linear-gradient(135deg, ${item.color}15, ${item.color}25)`,
              marginBottom: '1.5rem',
              transition: 'transform 0.3s ease',
            }}>
              <item.icon style={{ width: '36px', height: '36px', color: item.color }} />
            </div>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
              {item.title}
            </h3>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--web-dark, #025E44)', textDecoration: 'none', transition: 'color 0.2s' }}>
                {item.info}
              </a>
            ) : (
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                {item.info}
              </p>
            )}
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}

export function ScheduleSection() {
  return (
    <ScrollReveal>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '2.5rem',
        marginBottom: '3rem',
        border: '1.5px solid hsl(167, 25%, 92%)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            backgroundColor: 'rgba(var(--web-primary-rgb, 37, 146, 127), 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Clock size={24} color="var(--web-primary, #25927F)" />
          </div>
          <div>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.125rem', fontWeight: 800, color: '#0A0A0A', margin: 0 }}>
              Horario de Atención
            </h3>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: '#64748b', margin: 0 }}>
              Estamos disponibles para atenderte
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {[
            { day: 'Lunes a Viernes', hours: '9:00 AM - 6:00 PM', active: true },
            { day: 'Sábados', hours: '9:00 AM - 1:00 PM', active: false },
            { day: 'Domingos', hours: 'Cerrado', active: false },
          ].map((schedule, i) => (
            <div
              key={i}
              style={{
                backgroundColor: schedule.active ? 'rgba(var(--web-primary-rgb, 37, 146, 127), 0.06)' : '#f8fafc',
                borderRadius: '14px',
                padding: '1.25rem 1.5rem',
                border: schedule.active ? '1.5px solid rgba(var(--web-primary-rgb, 37, 146, 127), 0.15)' : '1.5px solid #f1f5f9',
              }}
            >
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 700, color: schedule.active ? 'var(--web-primary, #25927F)' : '#64748b', marginBottom: '0.25rem' }}>
                {schedule.day}
              </div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 800, color: schedule.hours === 'Cerrado' ? '#94a3b8' : '#0A0A0A' }}>
                {schedule.hours}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { q: '¿Cuánto tiempo tardan en responder?', a: 'Respondemos en un máximo de 24 horas hábiles. Para consultas urgentes, te recomendamos contactarnos por WhatsApp.' },
    { q: '¿Ofrecen soporte técnico?', a: 'Sí, contamos con soporte técnico para todos nuestros estudiantes activos. Puedes contactarnos por cualquiera de nuestros canales.' },
    { q: '¿Puedo solicitar una factura?', a: 'Sí, emitimos facturas y boletas electrónicas. Solo necesitas proporcionarnos tus datos fiscales al momento de la compra o solicitarlo por correo.' },
  ]

  return (
    <ScrollReveal>
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.25rem', fontWeight: 800, color: '#0A0A0A', textAlign: 'center', marginBottom: '2rem' }}>
          Preguntas Frecuentes
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: openIndex === i ? '1.5px solid var(--web-primary, #25927F)' : '1.5px solid hsl(214, 20%, 93%)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: openIndex === i ? '0 4px 20px rgba(var(--web-primary-rgb, 37, 146, 127),0.08)' : '0 1px 4px rgba(0,0,0,0.03)',
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem', fontWeight: 700, color: openIndex === i ? 'var(--web-primary, #25927F)' : '#1e293b', transition: 'color 0.2s' }}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={20}
                  color={openIndex === i ? 'var(--web-primary, #25927F)' : '#94a3b8'}
                  style={{
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    flexShrink: 0,
                    marginLeft: '1rem',
                  }}
                />
              </button>
              <div style={{
                maxHeight: openIndex === i ? '200px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}>
                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.875rem',
                  color: '#64748b',
                  lineHeight: 1.7,
                  padding: '0 1.5rem 1.25rem',
                  margin: 0,
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}

export function ContactActions() {
  const configs = useConfig()
  const waHref = buildWhatsAppUrl(configs.WHATSAPP_NUMERO)

  return (
    <ScrollReveal>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.625rem', padding: '1rem 2.5rem', borderRadius: '16px',
            backgroundColor: 'var(--web-primary, #25927F)', color: '#ffffff', fontFamily: 'Poppins, sans-serif',
            fontSize: '0.9375rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(var(--web-primary-rgb, 37, 146, 127),0.3)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'var(--web-dark, #025E44)'
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(var(--web-primary-rgb, 37, 146, 127),0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'var(--web-primary, #25927F)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(var(--web-primary-rgb, 37, 146, 127),0.3)'
          }}
        >
          <Phone size={18} />
          Enviar WhatsApp
        </a>
        <Link
          href="/"
          style={{
            display: 'inline-flex', alignItems: 'center', padding: '1rem 2.5rem', borderRadius: '16px',
            border: '2px solid var(--web-primary, #25927F)', color: 'var(--web-primary, #25927F)',
            fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s ease',
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
