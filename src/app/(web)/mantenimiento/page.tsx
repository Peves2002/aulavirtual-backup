import Link from 'next/link'
import Image from 'next/image'

import { CheckCircle2 } from 'lucide-react'

import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { getConfigs } from '@/utils/libs/config'

export const metadata = {
  title: 'Mantenimiento - MS&M CONSULTING',
  description: 'Soluciones de mantenimiento predictivo y proactivo',
}

export default async function MantenimientoPage() {
  const configs = await getConfigs()
  const waNumero = configs.WHATSAPP_NUMERO || '51900281578'

  const sections = [
    {
      title: 'Mantenimiento Predictivo',
      images: [
        '/assets/services/mantenimiento/mantenimiento-predictivo.jpg',
      ],
      items: [
        'Programas integrales PdM',
        'Análisis vibracional',
        'Análisis termográfico',
      ],
    },
    {
      title: 'Mantenimiento Proactivo',
      images: [
        '/assets/services/mantenimiento/mantenimiento-proactivo.jpg',
      ],
      items: [
        'Alineamiento Laser de ejes',
        'Balanceo Dinámico In Situ',
        'Balanceo Computarizado',
      ],
    },
    {
      title: 'Gestión de Mantenimiento',
      images: [
        '/assets/services/mantenimiento/gestion-de-mantenimiento.jpeg',
      ],
      items: [
        'Gestión de la lubricación',
        'Mantenimiento Integral',
      ],
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/services/mantenimiento/mantenimiento-predictivo.jpg"
            alt="Mantenimiento MS&M CONSULTING"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#000000]/88" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/70 to-transparent" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="inline-block text-[#E2231A] text-[10px] font-display font-black uppercase tracking-[0.35em] mb-6 border border-[#E2231A]/50 px-4 py-2 rounded-sm">
              Servicio MS&M CONSULTING
            </span>
            <h1 className="text-5xl lg:text-7xl font-display font-black text-white mb-8 uppercase leading-[1.1] tracking-tighter">
              Mantenimiento Predictivo e{' '}
              <span className="text-[#E2231A]">Ingeniería de Confiabilidad</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-3xl font-sans font-medium">
              Ofrecemos soluciones avanzadas de mantenimiento predictivo y confiabilidad para maximizar la disponibilidad, reducir fallas y optimizar el ciclo de vida de los activos.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Sections */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          {sections.map((section, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="mb-20 last:mb-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                  <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="flex flex-col gap-3 h-full min-h-[380px]">
                      <div className="relative overflow-hidden rounded-2xl shadow-lg flex-1">
                        <Image src={section.images[0]} alt={section.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                      </div>
                      {section.images[1] && (
                        <div className="relative overflow-hidden rounded-2xl shadow-lg h-[150px] shrink-0">
                          <Image src={section.images[1]} alt={section.title} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                    <div className="bg-white rounded-2xl p-8 shadow-sm h-full flex flex-col justify-center">
                      <span className="text-[10px] font-display font-black text-[#E2231A] uppercase tracking-[0.35em] mb-3 block">
                        {String(idx + 1).padStart(2, '0')} — Mantenimiento
                      </span>
                      <h3 className="text-3xl font-display font-black text-slate-900 mb-8 uppercase">{section.title}</h3>
                      <ul className="space-y-4">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#E2231A] flex-shrink-0 mt-1" />
                            <span className="text-slate-600 font-sans font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-5xl font-display font-black text-slate-900 mb-8 uppercase">
              Maximiza la disponibilidad de tus activos
            </h2>
            <p className="text-lg text-slate-600 mb-12 font-sans font-medium">
              Implementa estrategias de mantenimiento predictivo basadas en datos para optimizar el desempeño de tu operación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`https://wa.me/${waNumero}?text=Estoy%20interesado%20en%20el%20servicio%20de%20Mantenimiento%20Predictivo%20e%20Ingenier%C3%ADa%20de%20Confiabilidad%20de%20MS%26M%20CONSULTING`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#FFB600] text-[#000000] font-sans font-bold uppercase tracking-wider hover:bg-[#E5A300] transition-all duration-300 text-sm"
              >
                Solicitar Asesoría
              </a>
              <Link href="/" className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#000000] text-[#000000] font-sans font-bold uppercase tracking-wider hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-300 text-sm">
                Volver al inicio
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
