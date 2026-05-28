import { Award, Sparkles } from 'lucide-react'

import type { Metadata } from 'next'

import SearchCertificateSection from '@/features/web/home/components/SearchCertificateSection'

export const metadata: Metadata = {
  title: 'Verificar Certificado — Aula Virtual',
  description: 'Verifica la autenticidad de tu certificado ingresando el código único.',
}

export default function VerificarCertificadoPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-edu-pattern py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
              Certificaciones
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
              Verifica tu <span className="text-brand-orange">certificado</span>.
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-white/80">
              Ingresa el código único de tu certificado para comprobar su autenticidad de forma rápida y segura.
            </p>
          </div>
        </div>
      </section>

      {/* COLOR STRIPE */}
      <div className="grid h-3 grid-cols-4">
        <div className="bg-brand-teal" />
        <div className="bg-brand-navy" />
        <div className="bg-brand-lime" />
        <div className="bg-brand-orange" />
      </div>

      {/* BUSCADOR */}
      <div className="cert-section-light">
        <SearchCertificateSection />
      </div>
    </>
  )
}
