import fs from 'fs'
import path from 'path'

import React from 'react'

import ClientLogosMarquee from '@/features/web/home/components/ClientLogosMarquee'

export const metadata = {
  title: 'Nosotros | IFSEC Group',
  description: 'Conoce más sobre nuestra historia, misión y visión.',
}

// Función para formatear de kebab-case a Sentence case (Modo oración)
const toSentenceCase = (str: string) => {
  const words = str.split('-').filter(Boolean).map(w => w.toLowerCase())

  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  }

  
return words.join(' ')
}

export default function NosotrosPage() {
  const clientesDir = path.join(process.cwd(), 'public', 'images', 'clientes')
  let logos: { label: string; url: string }[] = []

  if (fs.existsSync(clientesDir)) {
    const files = fs.readdirSync(clientesDir)

    logos = files
      .filter(f => /\.(jpg|jpeg|png|svg)$/i.test(f))
      .map(f => ({
        label: toSentenceCase(f.replace(/\.[^/.]+$/, '')),
        url: `/images/clientes/${f}`
      }))
  }

  return (
    <div className="flex flex-col gap-20 py-10">
      <div className="px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 mt-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--web-dark)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Sobre Nosotros
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nuestras capacitaciones combinan experiencia, necesidades del cliente y buenas prácticas, transformándose en experiencias vivenciales que desarrollan competencias reales.
          </p>
        </div>
        
        {/* Historia */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative aspect-video md:aspect-square w-full bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 flex items-center justify-center shadow-sm">
            <img src="/images/servicios/entrenamientos-vivenciales/1.png" alt="Historia IFSEC Group" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[var(--web-dark)]" style={{ fontFamily: 'Poppins, sans-serif' }}>Nuestra Historia</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                IFSEC Group nació en el Callao, Perú, en el 2006, fundado por profesionales expertos en Prevención de Riesgos, Control de Operaciones, Implementación de Sistemas de Gestión y en Verificación de condiciones de seguridad en instalaciones.
              </p>
              <p>
                Ante la necesidad de soluciones integrales y personalizadas en la industria, desarrollamos servicios enfocados en la gestión de Seguridad y Salud Ocupacional, respuesta a emergencias HAZMAT, capacitación en SSO, servicios industriales con químicos y evaluación de controles operacionales, asegurando operaciones seguras y productivas.
              </p>
              <p>
                IFSEC Group surge con la expansión de la empresa hacia IFSEC Chile y Ouray IFSEC Panamá (en alianza con Ouray Environmental Services LLC), para atender a socios estratégicos a nivel regional con la misma calidad y compromiso.
              </p>
              <p>
                Nuestras capacitaciones combinan experiencia, necesidades del cliente y buenas prácticas, transformándose en experiencias vivenciales que desarrollan competencias reales. Trabajamos con responsabilidad y enfoque en añadir valor a cada operación, entregando siempre el mejor servicio posible.
              </p>
            </div>
          </div>
        </div>

        {/* Misión y Visión */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 relative overflow-hidden">
            <div className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <span className="text-[var(--web-primary)] text-2xl font-bold">M</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[var(--web-dark)]" style={{ fontFamily: 'Poppins, sans-serif' }}>Nuestra Misión</h3>
            <p className="text-gray-700 leading-relaxed">
              Brindar soluciones integrales y especializadas en Seguridad, Operaciones, Respuesta a Emergencias y Proyectos de Gestión de Riesgos Químicos, satisfaciendo las necesidades y expectativas de nuestros socios estratégicos.
            </p>
          </div>
          
          <div className="bg-[var(--web-dark)] p-10 rounded-3xl relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="text-8xl font-black">V</span>
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                <span className="text-[var(--web-light)] text-2xl font-bold">V</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--web-light)]" style={{ fontFamily: 'Poppins, sans-serif' }}>Nuestra Visión</h3>
              <p className="text-gray-200 leading-relaxed">
                Ser reconocida como #TheHazmatCompany la compañía operativa más apreciada en el mercado Regional, siendo un referente internacional.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clientes */}
      {logos.length > 0 && (
        <ClientLogosMarquee logos={logos} />
      )}
    </div>
  )
}
