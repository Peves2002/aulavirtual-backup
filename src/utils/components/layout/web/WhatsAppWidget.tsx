'use client'

import { useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { Send, X } from 'lucide-react'

import { useConfig } from '@/contexts/ConfigContext'

const WhatsAppIcon = ({ size = 28 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

const GREETING = '¡Hola! 👋 ¿Tienes alguna duda? Escríbenos y te ayudamos al instante.'

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const configs = useConfig()
  const waNumber = configs.WHATSAPP_NUMERO || '51936032964'

  useEffect(() => {
    if (!open) return

    inputRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleSend = () => {
    const text = message.trim() || GREETING
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`

    window.open(url, '_blank', 'noopener,noreferrer')
    setMessage('')
  }

  return (
    <div style={{ position: 'fixed', right: '20px', bottom: '24px', zIndex: 9999 }} ref={panelRef}>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat de WhatsApp"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              bottom: '76px',
              right: 0,
              width: 'min(340px, calc(100vw - 40px))',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              backgroundColor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              transformOrigin: 'bottom right',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, var(--web-dark, #025E44) 0%, var(--web-primary, #25927F) 100%)',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '2px solid rgba(255,255,255,0.25)',
                }}
              >
                <WhatsAppIcon size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0, color: '#ffffff' }}>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.9375rem', margin: 0, lineHeight: 1.3 }}>
                  Equipo de soporte
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#3AB079', display: 'inline-block' }} />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', opacity: 0.9 }}>En línea</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar chat"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div
              style={{
                backgroundColor: '#e9e3d9',
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.035) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
                padding: '18px 16px',
                minHeight: '150px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  borderTopLeftRadius: '4px',
                  padding: '12px 14px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  maxWidth: '88%',
                }}
              >
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#1f2937', margin: 0, lineHeight: 1.55 }}>
                  {GREETING}
                </p>
              </motion.div>
            </div>

            {/* Footer / input */}
            <div style={{ padding: '12px', backgroundColor: '#ffffff', borderTop: '1px solid hsl(214,20%,92%)', display: 'flex', gap: '8px' }}>
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSend()
                }}
                placeholder="Escribe un mensaje..."
                style={{
                  flex: 1,
                  minWidth: 0,
                  borderRadius: '999px',
                  border: '1.5px solid var(--web-primary, #25927F)',
                  padding: '10px 16px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.875rem',
                  outline: 'none',
                  color: '#0A0A0A',
                }}
              />
              <button
                onClick={handleSend}
                aria-label="Enviar mensaje por WhatsApp"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'var(--web-primary, #25927F)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'transform 0.15s ease, background-color 0.15s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
                }}
              >
                <Send size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <div style={{ position: 'relative', width: '58px', height: '58px' }}>
        {!open && (
          <motion.span
            aria-hidden="true"
            animate={{ scale: [1, 1.7], opacity: [0.55, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              backgroundColor: '#25D366',
              pointerEvents: 'none',
            }}
          />
        )}
        <motion.button
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp'}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'relative',
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#25D366',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
            cursor: 'pointer',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'chat'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ display: 'flex' }}
            >
              {open ? <X size={26} /> : <WhatsAppIcon size={28} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  )
}
