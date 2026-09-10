'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Search, Fingerprint, ShieldCheck, UserRound } from 'lucide-react'

import ScrollReveal from './ScrollReveal'

export default function SearchCertificateSection() {
  const router = useRouter()
  const [dni, setDni] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedDni = dni.trim()

    if (!/^\d{8}$/.test(trimmedDni)) {
      setError('Ingresa los 8 dígitos de tu DNI, sin espacios ni guiones.')

      return
    }

    router.push(`/verificar-certificado?dni=${encodeURIComponent(trimmedDni)}`)
  }

  return (
    <section style={{ backgroundColor: '#f6f8f7', padding: '3.5rem 1rem' }}>
      <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
        <ScrollReveal>
          <div
            className="relative overflow-hidden rounded-[24px]"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2ebe6',
              padding: '2.5rem 3rem',
              boxShadow: '0 16px 48px rgba(6,61,36,0.08)',
            }}
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: '#edf5f1', color: '#173d32' }}>
                <Fingerprint size={34} strokeWidth={1.8} />
              </div>
              <div>
                <h2 className="m-0 text-[25px] font-semibold leading-tight text-[#173d32]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Encuentra tus certificados
                </h2>
                <p className="mt-1 text-[15px] text-[#63746c]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Ingresa el DNI de la persona que realizó el curso.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="home-certificate-dni" className="mb-2 block text-sm font-semibold text-[#173d32]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Documento Nacional de Identidad (DNI)
              </label>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-[#71847a]">
                    <UserRound size={21} />
                  </div>
                  <input
                    id="home-certificate-dni"
                    type="text"
                    value={dni}
                    onChange={e => {
                      setDni(e.target.value.replace(/\D/g, '').slice(0, 8))
                      setError('')
                    }}
                    placeholder="Ingresa 8 dígitos"
                    inputMode='numeric'
                    maxLength={8}
                    aria-label='DNI del titular del certificado'
                    aria-invalid={Boolean(error)}
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      display: 'block',
                      width: '100%',
                      paddingLeft: '3.75rem',
                      paddingRight: '1rem',
                      paddingTop: '1.125rem',
                      paddingBottom: '1.125rem',
                      backgroundColor: '#fcfdfc',
                      border: '1px solid #cbd8d1',
                      borderRadius: '0.75rem',
                      color: '#173d32',
                      fontSize: '0.9375rem',
                      letterSpacing: '0.05em',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#25927f' }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#cbd8d1' }}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl transition-all duration-200 sm:min-w-[250px]"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    padding: '1rem 1.75rem',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.12)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#173d32' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#000000' }}
                >
                  <Search size={18} />
                  Buscar certificados
                </button>
              </div>

              {error && (
                <p
                  className="mt-3 text-center text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif', color: '#a32a2a' }}
                >
                  {error}
                </p>
              )}

              <p className="mt-4 flex items-center gap-2 text-xs text-[#63746c]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <ShieldCheck size={16} /> Consulta los certificados emitidos en nuestra plataforma.
              </p>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
