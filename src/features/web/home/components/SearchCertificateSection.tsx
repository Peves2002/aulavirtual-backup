'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Search, Award, ShieldCheck } from 'lucide-react'

import ScrollReveal from './ScrollReveal'
import { sectionH2, sectionDesc, smallText } from './typography'

export default function SearchCertificateSection() {
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

  return (
    <section style={{ backgroundColor: 'var(--web-dark, #025E44)', padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
        <ScrollReveal>
          <div
            className="rounded-[40px] relative overflow-hidden"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '4rem 2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            {/* Decorative background icon */}
            <div
              className="absolute top-0 right-0 pointer-events-none"
              style={{ opacity: 0.05, padding: '2rem' }}
            >
              <Award style={{ width: '16rem', height: '16rem', color: 'var(--web-primary, #25927F)', marginTop: '-3rem', marginRight: '-3rem' }} />
            </div>

            {/* Header */}
            <div className="relative z-10 text-center mb-10">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                style={{ backgroundColor: 'rgba(37, 146, 127, 0.1)', border: '1px solid rgba(37, 146, 127, 0.2)' }}
              >
                <ShieldCheck style={{ width: '2.5rem', height: '2.5rem', color: 'var(--web-primary, #25927F)' }} />
              </div>
              <h2 className="mb-4" style={{ ...sectionH2, color: 'var(--web-dark, #025E44)', fontWeight: 900, fontSize: '2.5rem' }}>
                Verificar Certificado
              </h2>
              <p style={{ ...sectionDesc, color: '#475569', maxWidth: '36rem', margin: '0 auto', fontSize: '1.125rem' }}>
                Ingresa el código único ubicado en la parte inferior de tu certificado
                para comprobar su validez y autenticidad.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative z-10">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Search style={{ width: '1.25rem', height: '1.25rem', color: '#94a3b8' }} />
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
                      paddingLeft: '3.5rem',
                      paddingRight: '1rem',
                      paddingTop: '1.25rem',
                      paddingBottom: '1.25rem',
                      backgroundColor: '#f8fafc',
                      border: '2px solid #e2e8f0',
                      borderRadius: '1rem',
                      color: '#0f172a',
                      fontSize: '1rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      outline: 'none',
                      transition: 'all 0.2s',
                    }}
                    onFocus={e => { 
                      e.currentTarget.style.borderColor = 'var(--web-primary, #25927F)'
                      e.currentTarget.style.backgroundColor = '#ffffff'
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(37, 146, 127, 0.1)'
                    }}
                    onBlur={e => { 
                      e.currentTarget.style.borderColor = '#e2e8f0'
                      e.currentTarget.style.backgroundColor = '#f8fafc'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!codigo.trim()}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    padding: '1rem 2.5rem',
                    borderRadius: '1rem',
                    backgroundColor: 'var(--web-primary, #25927F)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px -5px rgba(37, 146, 127, 0.4)',
                    opacity: !codigo.trim() ? 0.6 : 1,
                  }}
                  onMouseEnter={e => { if (codigo.trim()) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)' }}
                >
                  <Search size={20} strokeWidth={3} />
                  BUSCAR
                </button>
              </div>

              {error && (
                <p
                  className="mt-4 text-center text-sm font-bold"
                  style={{ fontFamily: 'Poppins, sans-serif', color: '#ef4444' }}
                >
                  {error}
                </p>
              )}

              <p
                className="mt-8 text-center"
                style={{ ...smallText, color: '#94a3b8', textAlign: 'center', fontWeight: 500 }}
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
