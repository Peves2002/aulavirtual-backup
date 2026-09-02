import React from 'react'

import type { Metadata } from 'next'

import SearchCertificateSection from '@/features/web/home/components/SearchCertificateSection'

export const metadata: Metadata = {
  title: 'Verificar Certificado | IFSEC Group',
  description: 'Verifique la autenticidad de su certificado emitido por IFSEC Group ingresando su código único.',
}

export default function VerificarCertificadoPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--web-dark, #025E44)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '56rem', margin: '0 auto', width: '100%' }}>
        <div
          className="rounded-3xl relative overflow-hidden"
          style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '3rem 2rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="relative z-10 text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
              Verificar Certificado
            </h1>
            <p className="text-white/60 max-w-md mx-auto text-sm">
              Ingresa el código único de tu certificado para comprobar su validez y autenticidad.
            </p>
          </div>
          <SearchCertificateSection />
        </div>
      </div>
    </div>
  )
}
