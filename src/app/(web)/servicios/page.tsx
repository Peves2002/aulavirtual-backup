import React from 'react'

import Link from 'next/link'

import { CheckCircle2 } from 'lucide-react'

import { SERVICIOS } from '@/utils/data/servicios'

export const metadata = {
  title: 'Servicios | GRIDEXA ENERGY ACADEMY',
  description: 'Nuestros servicios de consultoría, ingeniería y capacitación en el sector energético.',
}

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header Banner */}
      <div className="bg-[#02115C] text-white py-16 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4 text-[#BDD962]">
            Nuestros Servicios
          </h1>
          <p className="text-lg md:text-xl font-light font-poppins max-w-2xl mx-auto text-gray-200">
            Brindamos soluciones integrales de consultoría, ingeniería y gestión en el sector eléctrico.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICIOS.map((srv, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div 
                className="w-full h-48 bg-gray-200"
                style={{
                  backgroundImage: `url(${srv.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-[#BDD962] mt-1 flex-shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#02115C] font-poppins leading-tight">
                    {srv.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed font-inter flex-1">
                  {srv.desc}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/51999999999?text=${encodeURIComponent(`Hola, quisiera cotizar el servicio: ${srv.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white text-center py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <i className="tabler-brand-whatsapp text-lg" />
                    Cotizar
                  </a>
                  <Link
                    href={`/servicios/${srv.id}`}
                    className="flex-1 bg-[#02115C] hover:bg-[#031d99] text-white text-center py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center text-sm"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
