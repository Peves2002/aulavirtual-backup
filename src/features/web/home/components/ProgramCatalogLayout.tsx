import React from 'react'
import { Sparkles } from 'lucide-react'

import { Box } from '@mui/material'

import CourseCatalog from '@/features/web/home/components/CourseCatalog'
import type { TipoPrograma } from '@/utils/configs/tipoPrograma'
import { getTipoProgramaConfig } from '@/utils/configs/tipoPrograma'

type ProgramCatalogLayoutProps = {
  tipo: TipoPrograma
  courses: any[]
  categories: { id: string; nombre: string; slug: string }[]
}

export default function ProgramCatalogLayout({ tipo, courses, categories }: ProgramCatalogLayoutProps) {
  const config = getTipoProgramaConfig(tipo) as any

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-edu-pattern py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
              Catálogo Completo
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
              Nuestros <span className="text-brand-orange">{config.labelPlural}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-white/80">
              {config.catalogDescription || `Explora todos nuestros ${config.labelPlural.toLowerCase()} disponibles para tu formación profesional.`}
            </p>
            
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { label: `${courses.length} ${config.labelPlural.toLowerCase()} disponibles`, icon: '📚' },
                { label: `${categories.length} categorías`, icon: '🗂️' }
              ].map(chip => (
                <div
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white"
                >
                  <span>{chip.icon}</span>
                  {chip.label}
                </div>
              ))}
            </div>
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


      <CourseCatalog courses={courses} categories={categories} tipo={tipo} />
    </Box>
  )
}
