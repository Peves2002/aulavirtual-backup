'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Search } from 'lucide-react'

import ScrollReveal from './ScrollReveal'

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
    <ScrollReveal>
      <div className="relative z-10">

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-slate-500" size={20} />
              </div>
              <input
                type="text"
                value={codigo}
                onChange={e => {
                  setCodigo(e.target.value.toUpperCase())
                  setError('')
                }}
                placeholder="Ej. CER-2026-X8F9A"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl font-medium tracking-wider focus:outline-none transition-all text-sm"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  color: '#ffffff',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = 'var(--web-primary)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,146,127,0.2), inset 0 1px 2px rgba(0,0,0,0.2)'
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.2)'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!codigo.trim()}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap py-3.5 px-7 rounded-xl font-bold text-sm transition-all duration-200 border-none cursor-pointer"
              style={{
                backgroundColor: codigo.trim() ? 'var(--web-primary)' : 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                boxShadow: codigo.trim() ? '0 6px 20px rgba(37,146,127,0.35)' : 'none',
              }}
            >
              <Search size={18} />
              Buscar
            </button>
          </div>

          {error && (
            <p className="mt-3 text-center text-sm font-medium text-red-400">
              {error}
            </p>
          )}

          <p className="mt-4 text-center text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Nuestro sistema garantiza la autenticidad de todos los certificados emitidos.
          </p>
        </form>
      </div>
    </ScrollReveal>
  )
}
