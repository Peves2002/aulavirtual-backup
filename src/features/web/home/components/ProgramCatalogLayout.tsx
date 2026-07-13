import React from 'react'

import { Box } from '@mui/material'

import CourseCatalog from '@/features/web/home/components/CourseCatalog'
import type { TipoPrograma } from '@/utils/configs/tipoPrograma'
import { getTipoProgramaConfig } from '@/utils/configs/tipoPrograma'

type ProgramCatalogLayoutProps = {
  tipo: TipoPrograma
  courses: any[]
  categories: { id: string; nombre: string; slug: string }[]
  hideHero?: boolean
}

export default function ProgramCatalogLayout({ tipo, courses, categories, hideHero = false }: ProgramCatalogLayoutProps) {
  const config = getTipoProgramaConfig(tipo)

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
      {!hideHero && (
        <Box
          sx={{
            background: 'linear-gradient(135deg, #13294D 0%, #1B3A6B 100%)',
            py: { xs: 5, md: 7 },
            px: { xs: 3, md: 6 },
            position: 'relative',
            overflow: 'hidden'
          }}
        >
        <Box sx={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', backgroundColor: 'rgba(59,168,197,0.10)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: -60, right: 80, width: 300, height: 300, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <Box sx={{ maxWidth: 1280, mx: 'auto', position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box
              component="a"
              href="/"
              sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', '&:hover': { color: '#3BA8C5' }, transition: 'color 0.2s' }}
            >
              Inicio
            </Box>
            <Box component="span" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>/</Box>
            <Box component="span" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: '#3BA8C5', fontWeight: 600 }}>
              {config.labelPlural}
            </Box>
          </Box>

          <Box
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              mb: 1,
              lineHeight: 1.2
            }}
            component="h1"
          >
            {config.catalogTitle}
          </Box>
          <Box
            sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', maxWidth: 520, lineHeight: 1.6 }}
            component="p"
          >
            {config.catalogDescription}
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3 }}>
            {[
              { label: `${courses.length} ${config.labelPlural.toLowerCase()} disponibles`, icon: '📚' },
              { label: `${categories.length} categorías`, icon: '🗂️' }
            ].map(chip => (
              <Box
                key={chip.label}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  px: 2,
                  py: 0.75,
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.8125rem',
                  color: '#ffffff',
                  fontWeight: 500
                }}
              >
                <span>{chip.icon}</span>
                {chip.label}
              </Box>
            ))}
          </Box>
        </Box>
        </Box>
      )}

      <CourseCatalog courses={courses} categories={categories} tipo={tipo} />
    </Box>
  )
}
