import React from 'react'

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
  const config = getTipoProgramaConfig(tipo)

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#ffffff' }}>
      {/* Light gray header for catalog */}
      <div className="w-full bg-[#f1f1f1] py-4 border-b border-gray-200 mt-16 md:mt-20">
        <h1 className="text-center text-3xl font-bold text-black" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Todos
        </h1>
      </div>

      <CourseCatalog courses={courses} categories={categories} tipo={tipo} />
    </Box>
  )
}
