'use client'

import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { ShieldCheck, ArrowRight, PhoneCall, Search, ChevronsRight } from 'lucide-react'

import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import HeroCarouselSection from '@/features/web/home/components/HeroCarouselSection'
import { SERVICES_DATA } from '../data/servicesData'

interface ServiciosClientProps {
  waNumero: string
}

const normalizeSearch = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

const searchableServices = SERVICES_DATA.map(service => ({
  service,
  text: normalizeSearch(
    [
      service.title,
      service.shortTitle,
      service.category,
      service.shortDescription,
      service.description,
      service.badgeText,
      ...service.entregables,
      ...service.subServicios.map(sub => sub.title + ' ' + (sub.desc ?? ''))
    ].join(' ')
  )
}))

export default function ServiciosClient({ waNumero }: ServiciosClientProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const query = normalizeSearch(searchTerm)
  const filteredServices = searchableServices.filter(item => item.text.includes(query)).map(item => item.service)

  return (
    <div className='bg-slate-50 min-h-screen pb-24'>
      {/* ── HERO DE SERVICIOS (Carrusel trasladado) ───────────────────────── */}
      <HeroCarouselSection waNumber={waNumero} />

      {/* ── RETÍCULA DE TARJETAS DE SERVICIO ──────────────────────── */}
      <section
        className='py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
        style={{
          backgroundColor: '#f8faf9',
          backgroundImage:
            'radial-gradient(#dce9e4 1px, transparent 1px), radial-gradient(#dce9e4 1px, transparent 1px)',
          backgroundPosition: '0 0, 12px 12px',
          backgroundSize: '24px 24px'
        }}
      >
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8'>
          <div className='relative w-full max-w-md'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
            <input
              type='text'
              aria-label='Buscar servicios'
              placeholder='Busca SST, químicos, ISO, recursos humanos...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#FFB600] focus:ring-1 focus:ring-[#FFB600] transition-all shadow-sm'
              style={{ fontFamily: 'Poppins, sans-serif' }}
            />
          </div>
          
          <div className='flex items-center gap-4'>
            <p role='status' aria-live='polite' className='text-sm text-slate-600 whitespace-nowrap'>
              {filteredServices.length} de {SERVICES_DATA.length} servicios
            </p>
          {searchTerm && (
            <button
              type='button'
              onClick={() => setSearchTerm('')}
              className='text-sm font-semibold text-[#FFB600] underline underline-offset-4'
            >
              Limpiar búsqueda
            </button>
          )}
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredServices.map(service => {
            const waUrl = `https://wa.me/${waNumero}?text=${encodeURIComponent(
              `Hola, me gustaría cotizar el servicio: ${service.shortTitle}`
            )}`

            return (
              <ScrollReveal key={service.id} className='h-full'>
                <div className='bg-white rounded-sm overflow-hidden border border-slate-200 shadow-[0_3px_10px_rgba(15,45,65,0.12)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full'>
                  <div>
                    {/* Imagen de referencia o Placeholder como enlace a ver más */}
                    <Link
                      href={`/servicios/${service.slug}`}
                      className='relative block w-full overflow-hidden bg-gradient-to-br from-black via-[#4D4D4D] to-black cursor-pointer group'
                      style={{ paddingTop: '56.25%' }}
                    >
                      {service.image ? (
                        <Image
                          src={service.image}
                          alt={service.imageAlt || service.title}
                          fill
                          sizes='(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'
                          className='object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                      ) : (
                        <div className='absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white/90'>
                          <ShieldCheck
                            size={40}
                            className='text-[#FFB600] mb-2 opacity-80 transition-transform duration-300 group-hover:scale-110'
                          />
                          <span
                            className='text-xs font-semibold tracking-wide uppercase text-slate-200'
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            MS&M Consulting
                          </span>
                        </div>
                      )}
                      <div className='absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none' />

                    </Link>

                    <div className='px-6 pt-5 pb-4 flex flex-col'>
                      <Link
                        href={`/servicios/${service.slug}`}
                        className='no-underline text-slate-900 hover:text-[#FFB600] transition-colors'
                      >
                        <h2
                          className='text-xl font-extrabold text-center leading-tight line-clamp-2 min-h-[50px]'
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {service.shortTitle}
                        </h2>
                      </Link>

                      {service.subServicios && service.subServicios.length > 0 && (
                        <ul className='mt-4 min-h-[118px] space-y-2.5'>
                          {service.subServicios.slice(0, 3).map((sub, idx) => (
                            <li
                              key={idx}
                              className='flex items-start gap-1 text-sm leading-snug text-slate-700'
                            >
                              <ChevronsRight size={19} strokeWidth={3} className='text-[#FFB600] shrink-0 -ml-1' />
                              {sub.title}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className='mt-auto px-6 pb-6 pt-2 flex flex-col items-center gap-3'>
                    <Link
                      href={`/servicios/${service.slug}`}
                      className='no-underline inline-flex items-center justify-center gap-2 min-w-[80%] px-4 py-3 rounded-sm font-bold text-sm bg-[#FFB600] text-black hover:bg-black hover:text-[#FFB600] transition-all shadow-sm'
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Ver servicio <ArrowRight size={15} />
                    </Link>

                    <a
                      href={waUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='no-underline inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:text-[#FFB600] transition-colors'
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <PhoneCall size={15} />
                      Solicitar asesoría
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className='text-center py-16 text-slate-500'>
            <p className='text-base font-semibold' style={{ fontFamily: 'Poppins, sans-serif' }}>
              No se encontraron servicios que coincidan con la búsqueda.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
