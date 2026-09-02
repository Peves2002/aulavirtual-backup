import React from 'react'

import type { Metadata } from 'next'

import { Award, CheckCircle2, Clock, FileCheck2, Fingerprint, ShieldCheck } from 'lucide-react'

import SearchCertificateSection from '@/features/web/home/components/SearchCertificateSection'

export const metadata: Metadata = {
  title: 'Verificar Certificado | IFSEC Group',
  description: 'Verifica la autenticidad de tu certificado emitido por IFSEC Group ingresando su código único.',
}

export default function VerificarCertificadoPublicPage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(165deg, #020817 0%, #0c1a2e 40%, #0a2540 70%, #071320 100%)' }}>

      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Gradient orbs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(37,146,127,0.12) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(37,146,127,0.08) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-20 right-1/4 w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)' }} />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 pt-28 sm:pt-32 pb-20 px-4 sm:px-6">

        {/* Hero Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 border" style={{ background: 'rgba(37,146,127,0.1)', borderColor: 'rgba(37,146,127,0.25)', boxShadow: '0 0 30px rgba(37,146,127,0.15)' }}>
            <ShieldCheck size={32} style={{ color: 'var(--web-primary)' }} />
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.12em]" style={{ background: 'rgba(37,146,127,0.15)', color: 'var(--web-primary)', border: '1px solid rgba(37,146,127,0.25)' }}>
              <Fingerprint size={13} />
              Autenticidad Garantizada
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            Verificar Certificado
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            Ingresa el código único ubicado en la parte inferior de tu certificado para comprobar su validez y autenticidad.
          </p>
        </div>

        {/* ── Search Card ── */}
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-2xl p-6 sm:p-10 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Decorative glow top-left */}
            <div className="absolute -top-16 -left-16 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,146,127,0.12) 0%, transparent 70%)' }} />

            {/* Decorative Award icon */}
            <div className="absolute -bottom-6 -right-6 pointer-events-none opacity-[0.03]">
              <Award style={{ width: '10rem', height: '10rem', color: '#fff' }} />
            </div>

            <SearchCertificateSection />
          </div>
        </div>

        {/* ── Feature badges ── */}
        <div className="max-w-2xl mx-auto mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: <ShieldCheck size={16} />, label: 'Verificación oficial' },
            { icon: <CheckCircle2 size={16} />, label: 'Resultados al instante' },
            { icon: <FileCheck2 size={16} />, label: 'Registros auditados' },
            { icon: <Clock size={16} />, label: 'Disponible 24/7' },
          ].map((feat) => (
            <div
              key={feat.label}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              <span style={{ color: 'var(--web-primary)', flexShrink: 0 }}>{feat.icon}</span>
              {feat.label}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
