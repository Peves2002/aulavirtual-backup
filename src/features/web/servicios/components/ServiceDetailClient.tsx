'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  PhoneCall,
  BookOpen,
  Award,
  Clock,
  Building2,
  Check,
  Layers,
  Maximize2,
  X,
} from 'lucide-react'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { ServiceItem } from '../data/servicesData'

interface ServiceDetailClientProps {
  service: ServiceItem
  waNumero: string
}

export default function ServiceDetailClient({ service, waNumero }: ServiceDetailClientProps) {
  const [activeImage, setActiveImage] = useState<{ src: string; title: string } | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImage(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const waUrl = `https://wa.me/${waNumero}?text=${encodeURIComponent(
    `Hola, me gustaría solicitar información y cotización sobre el servicio: ${service.title}`
  )}`

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-8 bg-slate-950/90 backdrop-blur-md cursor-zoom-out"
          onClick={() => setActiveImage(null)}
        >
          <button
            className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-all border border-white/20 cursor-pointer"
            onClick={() => setActiveImage(null)}
            aria-label="Cerrar vista ampliada"
          >
            <X size={22} />
          </button>
          
          <div
            className="relative max-w-4xl w-full bg-slate-900 border border-white/15 rounded-2xl overflow-hidden shadow-2xl cursor-default flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full h-[65vh] sm:h-[75vh] bg-slate-950 flex items-center justify-center p-2">
              <Image
                src={activeImage.src}
                alt={activeImage.title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="p-4 bg-slate-900 border-t border-white/10 flex items-center justify-between">
              <span className="font-bold text-sm text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {activeImage.title}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Presiona la X, ESC o clic fuera para cerrar
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ESPECÍFICO DEL SERVICIO ────────────────────────────── */}
      <section className="relative pt-32 pb-20 bg-slate-950 text-white overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#25927F]/20 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            {/* Volver a servicios */}
            <Link
              href="/servicios"
              className="no-underline inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-[#BDD962] transition-colors mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <ArrowLeft size={16} /> Volver a todos los servicios
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BDD962]/15 border border-[#BDD962]/30 text-[#BDD962] text-xs font-bold uppercase tracking-wider mb-4">
                  <ShieldCheck size={15} />
                  {service.category}
                </div>
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {service.title}
                </h1>
                <p
                  className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-[#BDD962] text-slate-950 hover:bg-[#a8c74b] transition-all shadow-lg text-sm"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <PhoneCall size={18} />
                    Cotizar este Servicio
                  </a>
                  <Link
                    href="/contacto"
                    className="no-underline inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all text-sm"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Formulario de Contacto
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div 
                  onClick={() => service.image && setActiveImage({ src: service.image, title: service.title })}
                  className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-[#02115C] via-[#25927F] to-slate-900 cursor-pointer group/hero" 
                  style={{ paddingTop: '65%' }}
                >
                  {service.image ? (
                    <>
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover/hero:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-full bg-slate-900/80 text-white text-xs font-semibold shadow-lg border border-white/20 flex items-center gap-1.5">
                          <Maximize2 size={14} /> Ampliar Imagen
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white/90">
                      <ShieldCheck size={56} className="text-[#BDD962] mb-3 opacity-90" />
                      <span className="text-sm font-bold tracking-wider uppercase text-slate-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        MS&M Consulting
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CONTENIDO DETALLADO DEL SERVICIO ────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Columna Principal */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Sub-servicios incluidos */}
            {service.subServicios && service.subServicios.length > 0 && (
              <ScrollReveal>
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Layers size={22} className="text-[#25927F]" />
                    Líneas y Sub-servicios Especializados
                  </h2>
                  <div className="grid grid-cols-1 gap-5">
                    {service.subServicios.map((sub, idx) => (
                      <div
                        key={idx}
                        className="group p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#25927F]/40 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                      >
                        {/* Imagen del sub-servicio */}
                        {sub.image ? (
                          <div 
                            onClick={() => setActiveImage({ src: sub.image!, title: sub.title })}
                            className="relative w-full sm:w-44 h-36 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-200 cursor-pointer group/img"
                          >
                            <Image
                              src={sub.image}
                              alt={sub.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                            />
                            <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <span className="p-2 rounded-full bg-slate-900/80 text-white shadow-lg border border-white/20">
                                <Maximize2 size={16} />
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-lg bg-[#25927F]/10 text-[#25927F] shrink-0 self-start mt-0.5">
                            <CheckCircle2 size={20} />
                          </div>
                        )}

                        {/* Contenido textual del sub-servicio */}
                        <div className="flex-1 flex flex-col justify-center gap-1">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#25927F] shrink-0" />
                            <h3 className="font-bold text-base text-slate-900 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {sub.title}
                            </h3>
                          </div>
                          {sub.desc && (
                            <p className="text-xs text-slate-600 leading-relaxed sm:pl-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {sub.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
            {/* Normativas legales (si aplican) */}
            {service.normativas && service.normativas.length > 0 && (
              <ScrollReveal>
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <BookOpen size={22} className="text-[#25927F]" />
                    Marco Legal & Normativas Aplicables
                  </h2>
                  <div className="flex flex-col gap-3">
                    {service.normativas.map((norma, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                        <Award size={20} className="text-[#25927F] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-sm text-slate-900 block" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {norma.code}
                          </span>
                          <span className="text-xs text-slate-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {norma.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Ejes temáticos (si aplican) */}
            {service.ejes && service.ejes.length > 0 && (
              <ScrollReveal>
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <ShieldCheck size={22} className="text-[#25927F]" />
                    Ejes Principales de Acción
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {service.ejes.map((eje, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-center">
                        <span className="font-extrabold text-[#25927F] text-base block mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {eje.title}
                        </span>
                        <span className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {eje.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Entregables y Alcance */}
            <ScrollReveal>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <CheckCircle2 size={22} className="text-[#25927F]" />
                  Entregables y Alcance Operativo
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.entregables.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#25927F] shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-slate-800 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Planes informáticos (si aplican) */}
            {service.planes && service.planes.length > 0 && (
              <ScrollReveal>
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Clock size={22} className="text-[#25927F]" />
                    Planes & Módulos Disponibles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.planes.map((plan, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-extrabold text-slate-900 text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {plan.name}
                            </span>
                            <span className="text-[11px] font-bold text-[#25927F] bg-[#25927F]/10 px-2.5 py-1 rounded-md">
                              {plan.time}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {plan.desc}
                          </p>
                          <ul className="space-y-2 mb-4 text-xs text-slate-700">
                            {plan.features.map((f, fi) => (
                              <li key={fi} className="flex items-center gap-2">
                                <Check size={14} className="text-[#25927F]" /> {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Casos de Éxito / Testimonios */}
            {service.casos && service.casos.length > 0 && (
              <ScrollReveal>
                <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800">
                  <h2 className="text-xl font-extrabold text-[#BDD962] mb-6 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Building2 size={22} />
                    Casos de Éxito & Experiencia de Clientes
                  </h2>
                  <div className="flex flex-col gap-4">
                    {service.casos.map((caso, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#BDD962] block mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {caso.client}
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed italic" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          &quot;{caso.text}&quot;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Columna Lateral (Resumen & Cotización) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#25927F] block mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Cotización Rápida
                </span>
                <h3 className="text-lg font-extrabold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  ¿Necesitas este servicio?
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Habla directamente con nuestros ingenieros y especialistas para recibir una cotización a medida según las necesidades de tu empresa.
              </p>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline w-full py-3.5 px-4 rounded-xl font-bold bg-[#BDD962] text-slate-950 hover:bg-[#a8c74b] transition-all text-xs text-center flex items-center justify-center gap-2 shadow-sm"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <PhoneCall size={16} /> Cotizar por WhatsApp
              </a>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#25927F]" /> Atendemos en Lima y todo el Perú
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#25927F]" /> Garantía de cumplimiento normativo
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#25927F]" /> Equipo técnico experimentado
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
