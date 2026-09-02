'use client'

import React, { useState, useRef, useEffect } from 'react'

import { usePathname } from 'next/navigation'

import { useConfig } from '@/contexts/ConfigContext'

const HIDDEN_PATH_PREFIXES = [
  '/cursos',
  '/checkout',
  '/plataforma/cursos',
  '/plataforma/checkout',
  '/estudiante/aprender',
  '/admin',
  '/profesor',
  '/simulacros',
  '/ebooks',
]

const WhatsAppIcon = ({ size = 28, className = '' }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default function WhatsAppFloatingChat() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  
  const configs = useConfig()
  const waNumber = configs.WHATSAPP_NUMERO || configs.EMPRESA_TELEFONO || '51965052858'

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Ocultar en /cursos, checkout, simulacros, ebooks, aula de estudio y paneles
  const shouldHide = !!pathname && HIDDEN_PATH_PREFIXES.some(prefix => 
    pathname === prefix || pathname.startsWith(`${prefix}/`)
  )

  if (shouldHide) {
    return null
  }

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    const textToSend = message.trim() || '¡Hola! Quisiera más información.'
    const cleanNumber = waNumber.replace(/[^0-9]/g, '')
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(textToSend)}`
    
    window.open(url, '_blank', 'noopener,noreferrer')
    setMessage('')
    setIsOpen(false)
  }

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999, fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      
      {/* ── CHAT POPUP ── */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '76px',
            right: '0',
            width: '340px',
            maxWidth: 'calc(100vw - 36px)',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            animation: 'waFadeSlideUp 0.25s ease-out forwards',
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#075E54',
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* WhatsApp / Support Avatar */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#25D366',
                  flexShrink: 0,
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                }}
              >
                <WhatsAppIcon size={24} />
              </div>

              {/* Title & Status */}
              <div>
                <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>
                  Equipo de soporte
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#25D366',
                      display: 'inline-block',
                      boxShadow: '0 0 6px #25D366',
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                    En línea
                  </span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)' }}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Chat Body (Beige Canvas) */}
          <div
            style={{
              backgroundColor: '#e5ddd5',
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              padding: '24px 16px',
              minHeight: '190px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            {/* Message Bubble */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '0 16px 16px 16px',
                padding: '12px 16px',
                maxWidth: '88%',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                position: 'relative',
              }}
            >
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#1f2937', lineHeight: 1.45, fontWeight: 400 }}>
                ¡Hola! 👋 ¿Tienes alguna duda? Escríbenos y te ayudamos al instante.
              </p>
            </div>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSendMessage}
            style={{
              backgroundColor: '#ffffff',
              padding: '12px 14px',
              borderTop: '1px solid #f0f0f0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '9999px',
                border: '1.5px solid #22c55e',
                fontSize: '0.875rem',
                outline: 'none',
                backgroundColor: '#ffffff',
                color: '#111827',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#16a34a'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.15)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#22c55e'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />

            <button
              type="submit"
              aria-label="Enviar mensaje"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: message.trim() ? '#25D366' : '#cbd5e1',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background-color 0.2s, transform 0.1s',
                transform: message.trim() ? 'scale(1.05)' : 'scale(1)',
              }}
              onMouseEnter={(e) => {
                if (message.trim()) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1ebc59'
              }}
              onMouseLeave={(e) => {
                if (message.trim()) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#25D366'
              }}
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}

      {/* ── FLOATING TRIGGER BUTTON ── */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp'}
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#ffffff',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 6px 24px rgba(37, 211, 102, 0.5), 0 2px 8px rgba(0,0,0,0.15)',
          position: 'relative',
          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = isOpen ? 'rotate(90deg) scale(1.06)' : 'rotate(0deg) scale(1.08)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
        }}
      >
        {isOpen ? (
          <CloseIcon />
        ) : (
          <>
            <WhatsAppIcon size={32} />
            {/* Notification Badge Dot */}
            <span
              style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '2.5px solid #25D366',
                display: 'block',
              }}
            />
          </>
        )}
      </button>

      <style jsx global>{`
        @keyframes waFadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
