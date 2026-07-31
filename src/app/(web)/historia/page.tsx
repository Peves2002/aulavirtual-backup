import React from 'react'

import type { Metadata } from 'next'
import { Box } from '@mui/material'
import { PlayCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nuestra Historia | SELAH',
  description: 'Conoce los inicios y la trayectoria de SELAH.',
}

export default function HistoriaPage() {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#ffffff', minHeight: '100vh', pb: 0, display: 'flex', flexDirection: 'column' }}>
      {/* Barra superior de 4 colores */}
      <Box sx={{ display: 'flex', height: '12px', width: '100%' }}>
        <Box sx={{ flex: 4, bgcolor: '#289EA4' }} />
        <Box sx={{ flex: 1, bgcolor: '#FF8C00' }} />
        <Box sx={{ flex: 1, bgcolor: '#E3004F' }} />
        <Box sx={{ flex: 1, bgcolor: '#1A2035' }} />
      </Box>

      {/* Breadcrumb franja gris */}
      <Box sx={{ bgcolor: '#e2e8f0', py: 1.5, px: { xs: 3, md: 6 } }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
          <a
            href="/"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#E3004F', fontWeight: 600, textDecoration: 'none' }}
            className="hover:text-[#c20042]"
          >
            Inicio
          </a>
          <Box component="span" sx={{ color: '#E3004F', fontSize: '0.8rem', fontWeight: 600 }}>»</Box>
          <Box component="span" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#1A2035', fontWeight: 700 }}>
            Historia
          </Box>
        </Box>
      </Box>

      {/* Contenido Principal */}
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: 4, py: 10, width: '100%', flex: 1 }}>
        <h1 
          className="text-center font-extrabold italic text-2xl md:text-3xl text-[#1A2035] mb-10 uppercase tracking-tight"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          NUESTRA HISTORIA
        </h1>

        <div className="text-gray-600 space-y-6 text-[14px] leading-relaxed max-w-5xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <p>
            <strong>SELAH</strong> tiene sus inicios en 1989, inspirados en la labor pastoral del <span className="font-semibold text-[#289EA4]">Padre Luciano Ciciarelli y la madre Emma</span>, quienes orientaron su carisma y vocación a la población de jóvenes con problemas de drogodependencia. Posteriormente, quien asume el liderazgo de la obra es el <span className="font-semibold text-[#289EA4]">Padre Serafino Di Sanzo</span>, quien promueve e impulsa el desarrollo de SELAH, ampliando nuestro trabajo a la capacitación de profesionales en problemas de la drogodependencia y la intervención de poblaciones vulnerables.
          </p>

          <p>
            Somos los gestores de la <span className="font-bold text-[#289EA4]">&quot;LEY 29768 - LEY QUE REGULA EL ESTABLECIMIENTO Y EJERCICIO DE LOS CENTROS DE ATENCIÓN, PARA DEPENDIENTES QUE OPERAN BAJO LA MODALIDAD DE COMUNIDADES TERAPÉUTICAS. PROMULGADA EL 23/07/2011&quot;</span>, presentada al Congreso de la República en el mes de Febrero del 2011.
          </p>

          <p>
            Con el paso del tiempo, fuimos evolucionando y adaptándonos a las necesidades del mercado laboral, desarrollando nuevos diplomados, con un sistema de enseñanza innovador que permite potenciar las habilidades y conocimientos de los usuarios. Actualmente SELAH, ofrece un abanico de opciones, en la capacitación de profesionales que laboran el campo educativo y de la salud mental.
          </p>

          <p>
            <span className="font-bold text-[#289EA4]">¿Qué logramos?</span> Más profesionales capacitados que asisten y atienden a las poblaciones vulnerables y que marcan la diferencia. A través de plataformas virtuales, aulas y herramientas digitales, SELAH garantiza una experiencia de aprendizaje dinámica, personalizada y accesible para todos.
          </p>
        </div>

        {/* Video Placeholder */}
        <div className="mt-12 max-w-4xl mx-auto rounded-lg overflow-hidden relative shadow-lg bg-[#1A2035] aspect-video flex flex-col items-center justify-center group cursor-pointer border border-gray-100">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
          <PlayCircle size={64} className="text-white z-20 mb-4 opacity-90 group-hover:scale-110 transition-transform" />
          <span className="text-white z-20 font-bold tracking-widest text-lg md:text-2xl">VIDEO INSTITUCIONAL</span>
          
          {/* Falso reproductor bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent z-20 flex items-center px-4 gap-4">
             <PlayCircle size={16} className="text-white" />
             <span className="text-white text-xs font-mono">0:00 / 1:18</span>
             <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
               <div className="w-1/4 h-full bg-[#E3004F]" />
             </div>
             <div className="flex gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-white" />
                <div className="w-4 h-4 border-2 border-white" />
             </div>
          </div>
        </div>

      </Box>

      {/* ── PAGO SEGURO ──────────────────────────── */}
      <section className="py-10 bg-[#289EA4] text-white w-full mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="font-extrabold text-xl italic mb-6 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>PAGO SEGURO MEDIANTE IZIPAY - PAYPAL</h3>
          <div className="flex justify-center flex-wrap gap-4 items-center opacity-90">
            <div className="bg-white px-4 py-2 rounded text-[#1A2035] font-bold">VISA</div>
            <div className="bg-white px-4 py-2 rounded text-[#1A2035] font-bold">MasterCard</div>
            <div className="bg-white px-4 py-2 rounded text-[#1A2035] font-bold">American Express</div>
            <div className="bg-white px-4 py-2 rounded text-[#1A2035] font-bold">PayPal</div>
          </div>
        </div>
      </section>
    </Box>
  )
}
