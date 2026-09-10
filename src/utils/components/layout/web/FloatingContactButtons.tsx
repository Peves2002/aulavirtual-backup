'use client'

import { type FormEvent, useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import { ArrowUpRight, MessageCircle, Send, Sparkles, X } from 'lucide-react'

import { useConfig } from '@/contexts/ConfigContext'

export default function FloatingContactButtons() {
  const [greetingOpen, setGreetingOpen] = useState(false)
  const [whatsappOpen, setWhatsappOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState(false)
  const [greetingDismissed, setGreetingDismissed] = useState(false)
  const configs = useConfig()
  const pathname = usePathname()
  const waNumber = configs.WHATSAPP_NUMERO || '51959436827'

  const hideFloatingContact = pathname === '/cursos' || pathname.startsWith('/cursos/') || pathname === '/checkout' || pathname.startsWith('/checkout/')

  const handlePanelClose = () => {
    setGreetingOpen(false)
    setWhatsappOpen(false)
    setGreetingDismissed(true)
    setMessageError(false)
  }

  useEffect(() => {
    if (greetingDismissed) return

    let hideTimer: ReturnType<typeof setTimeout> | undefined

    const showGreeting = () => {
      setGreetingOpen(true)
      hideTimer = setTimeout(() => setGreetingOpen(false), 5000)
    }

    const initialTimer = setTimeout(showGreeting, 1200)
    const repeatTimer = setInterval(showGreeting, 10000)

    return () => {
      clearTimeout(initialTimer)
      if (hideTimer) clearTimeout(hideTimer)
      clearInterval(repeatTimer)
    }
  }, [greetingDismissed])

  if (hideFloatingContact) return null

  const handleWhatsAppSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
      setMessageError(true)

      return
    }

    const whatsappMessage = `Hola, MCY Consulting. ${trimmedMessage}`
    const whatsappUrl = `https://wa.me/${waNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setMessage('')
    setMessageError(false)
    setWhatsappOpen(false)
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '40px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
        {(greetingOpen || whatsappOpen) && (
          <div
            role={whatsappOpen ? 'dialog' : 'status'}
            aria-live={whatsappOpen ? undefined : 'polite'}
            style={{
              width: 'min(360px, calc(100vw - 40px))',
              padding: '1rem',
              borderRadius: '18px 18px 5px 18px',
              backgroundColor: '#ffffff',
              color: '#02115C',
              boxShadow: '0 14px 35px rgba(2, 17, 92, 0.2)',
              border: '1px solid #dbe7e1',
              animation: 'mcyContactIn 0.25s ease-out',
              position: 'relative',
            }}
          >
            <button
              type='button'
              aria-label='Cerrar mensaje de contacto'
              onClick={handlePanelClose}
              style={{
                position: 'absolute',
                top: 8,
                right: 10,
                border: 0,
                background: 'transparent',
                color: '#64748B',
                padding: 3,
                cursor: 'pointer',
                display: 'flex',
              }}
            >
              <X size={16} />
            </button>
            {whatsappOpen ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', paddingBottom: '0.8rem', borderBottom: '1px solid #edf1ee' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#25D366', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.88rem' }}>MS&M CONSULTING</strong>
                    <span style={{ color: '#16a34a', fontSize: '0.7rem' }}>En línea</span>
                  </div>
                </div>
                <div style={{ margin: '0.9rem 0', display: 'flex', justifyContent: 'flex-start' }}>
                  <p style={{ margin: 0, maxWidth: '88%', padding: '0.7rem 0.85rem', borderRadius: '4px 14px 14px 14px', backgroundColor: '#edf5f1', color: '#173d32', fontSize: '0.82rem', lineHeight: 1.45 }}>
                    Hola, ¿cómo podemos ayudarte? Escríbenos tu consulta.
                  </p>
                </div>
                <form onSubmit={handleWhatsAppSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  <label htmlFor='floating-whatsapp-message' style={{ color: '#64748B', fontSize: '0.72rem', fontWeight: 700 }}>Tu mensaje</label>
                  <textarea
                    id='floating-whatsapp-message'
                    value={message}
                    onChange={event => {
                      setMessage(event.target.value)
                      if (event.target.value.trim()) setMessageError(false)
                    }}
                    placeholder='Escribe tu consulta...'
                    rows={3}
                    autoFocus
                    style={{ width: '100%', resize: 'none', minHeight: 72, border: `1px solid ${messageError ? '#DC2626' : '#CBD5E1'}`, borderRadius: 10, padding: '0.7rem 0.8rem', color: '#0F172A', font: 'inherit', fontSize: '0.82rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                  {messageError && <span style={{ color: '#DC2626', fontSize: '0.72rem' }}>Escribe un mensaje para continuar.</span>}
                  <button type='submit' style={{ border: 0, borderRadius: 10, padding: '0.7rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#ffffff', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer' }}>
                    <Send size={16} /> Continuar en WhatsApp
                  </button>
                </form>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <Sparkles size={18} color='#A8C74B' style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.45, fontWeight: 700 }}>Bienvenido, MS&M CONSULTING. ¿Cómo le podemos ayudar?</p>
                </div>
                <button type='button' onClick={() => { setGreetingOpen(false); setWhatsappOpen(true) }} style={{ border: 0, background: 'none', color: '#176958', padding: '0.8rem 0 0 1.65rem', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  Escribir consulta <ArrowUpRight size={14} />
                </button>
              </>
            )}
          </div>
        )}

        <button
          type='button'
          aria-label={greetingOpen ? 'Abrir formulario de contacto' : 'Contactar a MCY Consulting'}
          style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            color: '#02115C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'none',
            cursor: 'pointer',
            position: 'relative',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onClick={() => {
            setGreetingOpen(false)
            setWhatsappOpen(true)
          }}
        >
          <img
            src='/images/avatars/usuario.png'
            alt='Contactar a MCY Consulting'
            style={{ width: 84, height: 84, borderRadius: '50%', objectFit: 'cover' }}
          />
        </button>
      </div>

      <style>{`@keyframes mcyContactIn { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
    </div>
  )
}
