import React from 'react'

import type { Metadata } from 'next'

import { Award } from 'lucide-react'

import SearchCertificateSection from '@/features/web/home/components/SearchCertificateSection'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Verificar Certificado | Aula Virtual',
  description: 'Verifica la autenticidad de tu certificado de formación en control gubernamental, contratación estatal y derecho administrativo ingresando tu código único.',
}

export default function VerificarCertificadoPage() {
  return (
    <>
      {/* ── ENCABEZADO ─────────────────────────────────── */}
      <section
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.48) 100%), url("/images/cursos.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '0 3rem',
          minHeight: '360px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(var(--web-light-rgb, 240, 208, 96),0.12)',
                border: '1px solid rgba(var(--web-light-rgb, 240, 208, 96),0.3)',
                borderRadius: '999px',
                padding: '0.375rem 1rem',
                marginBottom: '1.25rem',
              }}
            >
              <Award size={14} color="var(--web-light, #F0D060)" />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'var(--web-light, #F0D060)', fontWeight: 600 }}>
                Certificados verificables
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                marginBottom: '1rem',
                maxWidth: '600px',
              }}
            >
              Verifica tu{' '}
              <span style={{ color: 'var(--web-light, #F0D060)' }}>Certificado</span>
            </h1>

            <p
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.7,
                maxWidth: '520px',
              }}
            >
              Nuestros certificados de formación en control gubernamental, contratación estatal y derecho administrativo son verificables en línea mediante un código QR único. Ingresa el código de tu certificado para confirmar su autenticidad.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── BUSCADOR DE CERTIFICADO ─────────────────────── */}
      <SearchCertificateSection light />
    </>
  )
}
