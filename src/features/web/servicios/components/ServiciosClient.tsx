'use client'

import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import {
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  Search,
  CheckCircle2,
} from 'lucide-react'

import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { SERVICES_DATA } from '../data/servicesData'

interface ServiciosClientProps {
  waNumero: string
}

export default function ServiciosClient({ waNumero }: ServiciosClientProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredServices = SERVICES_DATA.filter(service => {
    return (
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.subServicios && service.subServicios.some(s => s.title.toLowerCase().includes(searchTerm.toLowerCase())))
    )
  })

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* ── HERO DE SERVICIOS ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden text-white">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#25927F]/20 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BDD962]/15 border border-[#BDD962]/30 text-[#BDD962] text-xs font-bold uppercase tracking-wider mb-6">
                <ShieldCheck size={16} />
                MS&M CONSULTING — Soluciones Especializadas
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Nuestros <span className="text-[#BDD962]">Servicios</span>
              </h1>
              <p
                className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8 max-w-2xl mx-auto"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Explora nuestras 6 líneas de servicios especializados en Seguridad y Salud en el Trabajo, Salud Ocupacional, Monitoreos, Capacitaciones, ITSE y Hostigamiento Sexual Laboral.
              </p>

              {/* Buscador */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar servicio o sub-servicio..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#BDD962] transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── RETÍCULA DE TARJETAS DE SERVICIO ──────────────────────── */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => {
            const waUrl = `https://wa.me/${waNumero}?text=${encodeURIComponent(
              `Hola, me gustaría cotizar el servicio: ${service.shortTitle}`
            )}`

            return (
              <ScrollReveal key={service.id}>
                <div
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Imagen de referencia o Placeholder como enlace a ver más */}
                    <Link
                      href={`/servicios/${service.slug}`}
                      className="relative block w-full overflow-hidden bg-gradient-to-br from-[#02115C] via-[#25927F] to-slate-900 cursor-pointer group"
                      style={{ paddingTop: '56.25%' }}
                    >
                      {service.image ? (
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white/90">
                          <ShieldCheck size={40} className="text-[#BDD962] mb-2 opacity-80 transition-transform duration-300 group-hover:scale-110" />
                          <span className="text-xs font-semibold tracking-wide uppercase text-slate-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            MS&M Consulting
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                      {/* Badge superior */}
                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#25927F] text-white shadow-sm"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {service.badgeText}
                        </span>
                      </div>
                    </Link>

                    {/* Contenido descriptivo corto */}
                    <div className="p-5 flex flex-col gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#25927F]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {service.category}
                      </span>
                      <Link href={`/servicios/${service.slug}`} className="no-underline text-slate-900 hover:text-[#25927F] transition-colors">
                        <h2
                          className="text-base font-extrabold leading-snug line-clamp-2 min-h-[44px]"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {service.shortTitle}
                        </h2>
                      </Link>
                      <p
                        className="text-xs text-slate-600 leading-relaxed line-clamp-3 min-h-[40px]"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {service.shortDescription}
                      </p>

                      {/* Lista de sub-servicios incluidos */}
                      {service.subServicios && service.subServicios.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                          {service.subServicios.map((sub, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-700">
                              <CheckCircle2 size={12} className="text-[#25927F] shrink-0" />
                              {sub.title}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2 Botones: Cotizar y Ver más */}
                  <div
                    className="p-5 pt-3 border-t border-slate-100 flex items-center gap-2"
                  >
                    {/* Botón Cotizar */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-xs bg-[#BDD962] text-slate-950 hover:bg-[#a7c64b] transition-all shadow-sm"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <PhoneCall size={14} />
                      Cotizar
                    </a>

                    {/* Botón Ver más */}
                    <Link
                      href={`/servicios/${service.slug}`}
                      className="no-underline flex-1 inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl font-semibold text-xs bg-slate-100 text-slate-800 hover:bg-[#25927F] hover:text-white transition-all border border-slate-200 hover:border-[#25927F]"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Ver más <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p className="text-base font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              No se encontraron servicios que coincidan con la búsqueda.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
