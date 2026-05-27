'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Search, Award, ShieldCheck } from 'lucide-react'

import ScrollReveal from './ScrollReveal'
import { sectionH2Dark, sectionDescDark, smallText } from './typography'

export default function SearchCertificateSection({ light = false }: { light?: boolean }) {
  const router = useRouter()
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedCodigo = codigo.trim()

    if (!trimmedCodigo) {
      setError('Por favor, ingresa un código de certificado')

      return
    }

    if (trimmedCodigo.length < 5) {
      setError('El código parece ser demasiado corto')

      return
    }

    router.push(`/verificar-certificado/${encodeURIComponent(trimmedCodigo)}`)
  }

  const isDark = !light

  return (
    <section style={{ backgroundColor: light ? '#ffffff' : '#0A0A0A', padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
        <ScrollReveal>
          <div
            className="rounded-3xl relative overflow-hidden"
            style={{
              backgroundColor: light ? '#ffffff' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${light ? '#e5e7eb' : 'rgba(255,255,255,0.1)'}`,
              padding: '3rem 2rem',
              backdropFilter: isDark ? 'blur(10px)' : 'none',
              boxShadow: light ? '0 4px 32px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            {/* Decorative background icon */}
            <div
              className="absolute top-0 right-0 pointer-events-none"
              style={{ opacity: 0.04, padding: '2rem' }}
            >
              <Award style={{ width: '16rem', height: '16rem', color: 'var(--web-primary, #D4AF37)', marginTop: '-3rem', marginRight: '-3rem' }} />
            </div>

            {/* Header */}
            <div className="relative z-10 text-center mb-10">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                style={{ backgroundColor: 'rgba(var(--web-primary-rgb, 212, 175, 55),0.12)', border: '1px solid rgba(var(--web-primary-rgb, 212, 175, 55),0.2)' }}
              >
                <ShieldCheck style={{ width: '2rem', height: '2rem', color: 'var(--web-primary, #D4AF37)' }} />
              </div>
              <h2 className="mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2rem)', fontWeight: 800, color: light ? '#0A0A0A' : '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                Verificar Certificado
              </h2>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', fontWeight: 400, color: light ? '#64748b' : 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '36rem', margin: '0 auto' }}>
                Ingresa el código único ubicado en la parte inferior de tu certificado
                para comprobar su validez y autenticidad.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative z-10">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search style={{ width: '1.25rem', height: '1.25rem', color: light ? '#94a3b8' : 'rgba(255,255,255,0.4)' }} />
                  </div>
                  <input
                    type="text"
                    value={codigo}
                    onChange={e => {
                      setCodigo(e.target.value.toUpperCase())
                      setError('')
                    }}
                    placeholder="Ej. CER-2026-X8F9A"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      display: 'block',
                      width: '100%',
                      paddingLeft: '3rem',
                      paddingRight: '1rem',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                      backgroundColor: light ? '#f8fafc' : 'rgba(255,255,255,0.08)',
                      border: `1.5px solid ${light ? '#e2e8f0' : 'rgba(255,255,255,0.15)'}`,
                      borderRadius: '0.75rem',
                      color: light ? '#0A0A0A' : '#ffffff',
                      fontSize: '1rem',
                      letterSpacing: '0.05em',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--web-primary, #D4AF37)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = light ? '#e2e8f0' : 'rgba(255,255,255,0.15)' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!codigo.trim()}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    padding: '1rem 2rem',
                    borderRadius: '0.75rem',
                    backgroundColor: 'var(--web-primary, #D4AF37)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(var(--web-primary-rgb, 212, 175, 55),0.3)',
                    opacity: !codigo.trim() ? 0.5 : 1,
                  }}
                  onMouseEnter={e => { if (codigo.trim()) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#b8960c' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--web-primary, #D4AF37)' }}
                >
                  <Search size={18} />
                  Buscar
                </button>
              </div>

              {error && (
                <p
                  className="mt-3 text-center text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--web-primary, #D4AF37)' }}
                >
                  {error}
                </p>
              )}

              <p
                className="mt-5 text-center text-sm"
                style={{ ...smallText, color: light ? '#94a3b8' : 'rgba(255,255,255,0.4)', textAlign: 'center' }}
              >
                Nuestro sistema garantiza la autenticidad de todos los certificados emitidos.
              </p>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
