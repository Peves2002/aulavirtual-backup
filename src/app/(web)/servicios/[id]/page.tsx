import React from 'react'

import { notFound } from 'next/navigation'
import Link from 'next/link'

import { ArrowLeft, CheckCircle2 } from 'lucide-react'

import { SERVICIOS } from '@/utils/data/servicios'

export const metadata = {
  title: 'Detalle del Servicio | GRIDEXA ENERGY ACADEMY',
}

interface PageProps {
  params: { id: string }
}

export default function ServicioDetailPage({ params }: PageProps) {
  const service = SERVICIOS.find((s) => s.id === params.id)

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header Banner */}
      <div className="bg-[#02115C] text-white py-16 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/servicios"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors font-inter text-sm"
          >
            <ArrowLeft size={16} />
            Volver a Servicios
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold font-poppins mb-4 text-[#BDD962] leading-tight">
            {service.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 mt-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div 
            className="w-full h-64 md:h-96 bg-gray-200"
            style={{
              backgroundImage: `url(${service.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-[#BDD962] mt-1 flex-shrink-0">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-2xl font-semibold text-[#02115C] font-poppins">
                Descripción del Servicio
              </h2>
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed font-inter whitespace-pre-line mb-10">
              {service.desc}
            </p>

            <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold text-[#02115C] font-poppins mb-2">
                  ¿Te interesa este servicio?
                </h3>
                <p className="text-gray-600 font-inter text-sm">
                  Ponte en contacto con nosotros para recibir más información y una cotización personalizada.
                </p>
              </div>
              <a
                href={`https://wa.me/51999999999?text=${encodeURIComponent(`Hola, quisiera cotizar el servicio: ${service.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <i className="tabler-brand-whatsapp text-xl" />
                Cotizar ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
