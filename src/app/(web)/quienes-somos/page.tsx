import React from 'react'

import type { Metadata } from 'next'
import { Box } from '@mui/material'
import { PlayCircle, Target, Eye, Gem } from 'lucide-react'

export const metadata: Metadata = {
  title: '¿Quiénes Somos? | SELAH',
  description: 'Conoce sobre nuestra asociación, objetivos y compromiso educativo.',
}

export default function QuienesSomosPage() {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f8fafc', minHeight: '100vh', pb: 0, display: 'flex', flexDirection: 'column' }}>
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
            ¿Quiénes somos?
          </Box>
        </Box>
      </Box>

      {/* Contenido Principal */}
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: 4, py: 10, width: '100%', flex: 1 }}>
        <h1 
          className="text-center font-extrabold italic text-2xl md:text-3xl text-[#1A2035] mb-10 uppercase tracking-tight"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          ¿QUIÉNES SOMOS?
        </h1>

        <div className="text-gray-600 space-y-6 text-[14px] leading-relaxed max-w-5xl mx-auto mb-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <p>
            <span className="font-bold text-[#289EA4]">«SELAH»</span> es una Asociación Civil sin fines de lucro patrocinada por la <span className="font-semibold text-[#289EA4]">Congregación Católica &quot;Los Siervos de Cristo Pobre&quot;</span>, y auspiciada por diversas Universidades e Instituciones que luchan por un tratamiento más humano a las personas, ya sea en el ámbito personal, familiar y empresarial.
          </p>

          <p>
            Nuestro objetivo es capacitar a profesionales en temas de la salud mental y organizacional, intervención en el ámbito pedagógico y social, proporcionándoles las habilidades y conocimientos necesarios para que puedan desempeñarse de manera eficiente y efectiva, siendo considerados un factor humano valioso, tanto en su espacio laboral, como en la sociedad en general.
          </p>

          <p>
            Ofrecemos Diplomados de Especialización, significativos y alineados con las necesidades del mercado laboral, garantizando que nuestros usuarios adquieran conocimientos y habilidades de alto nivel.
          </p>

          <p>
            Contamos con recursos y herramientas de aprendizaje, como una plataforma virtual de última generación, un staff de docentes con experiencia en el campo y comprometidos con la educación, brindamos seguimiento académico y orientación profesional para asegurar que cada uno de nuestros usuarios alcance su máximo potencial y logre sus metas educativas y profesionales.
          </p>
        </div>

        {/* Video Placeholder */}
        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden relative shadow-lg bg-[#1A2035] aspect-video flex flex-col items-center justify-center group cursor-pointer border border-gray-100 mb-16">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
          <PlayCircle size={64} className="text-white z-20 mb-4 opacity-90 group-hover:scale-110 transition-transform" />
          <span className="text-white z-20 font-bold tracking-widest text-lg md:text-2xl">VIDEO INSTITUCIONAL</span>
          
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent z-20 flex items-center px-4 gap-4">
             <PlayCircle size={16} className="text-white" />
             <span className="text-white text-xs font-mono">0:00 / 1:10</span>
             <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
               <div className="w-1/4 h-full bg-[#E3004F]" />
             </div>
             <div className="flex gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-white" />
                <div className="w-4 h-4 border-2 border-white" />
             </div>
          </div>
        </div>

        {/* Tarjetas de Misión, Visión, Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full pb-10">
          {/* MISIÓN */}
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <Target className="text-[#E3004F]" size={36} />
              <h3 className="text-[#1A2035] font-extrabold italic text-xl">NUESTRA MISIÓN</h3>
            </div>
            <p className="text-gray-600 text-[13px] leading-relaxed text-justify">
              Brindar formación y capacitación a profesionales, dentro del país, como en el extranjero. Nos comprometemos con las organizaciones e instituciones públicas y privadas, ofreciendo diplomados actualizados e innovadores, contribuyendo a potenciar las habilidades y capacidades de nuestros usuarios, preparándolos para enfrentar los desafíos del mercado laboral y contribuir al bienestar de la sociedad.
            </p>
          </div>

          {/* VISIÓN */}
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <Eye className="text-[#E3004F]" size={36} />
              <h3 className="text-[#1A2035] font-extrabold italic text-xl">NUESTRA VISIÓN</h3>
            </div>
            <p className="text-gray-600 text-[13px] leading-relaxed text-justify">
              Buscamos la satisfacción de nuestros usuarios; trabajando de forma armónica con las instituciones públicas y privadas de la comunidad, siendo reconocidos como un referente en la formación profesional. Queremos ser agentes de cambio en la educación, promoviendo el aprendizaje continuo y el desarrollo integral de las personas.
            </p>
          </div>

          {/* VALORES */}
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <Gem className="text-[#E3004F]" size={36} />
              <h3 className="text-[#1A2035] font-extrabold italic text-xl">VALORES</h3>
            </div>
            <ul className="text-gray-600 text-[13px] flex flex-col gap-2 mt-2 w-full">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E3004F]" /> Responsabilidad
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E3004F]" /> Respeto
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E3004F]" /> Solidaridad
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E3004F]" /> Integración
              </li>
            </ul>
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
