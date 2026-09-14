import React from 'react'

import Image from 'next/image'

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
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 5, md: 8 },
          px: { xs: 3, md: 6 },
          minHeight: { xs: '280px', md: '340px' },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background image */}
        <Image
          src={tipo === 'DIPLOMADO' ? '/images/contenido/diplomados-hero.jpg' : tipo === 'ESPECIALIZACION' ? '/images/contenido/especializaciones-hero.jpg' : '/images/cursos.jpg'}
          alt="Cursos"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />

        {/* Dark gradient overlay ON TOP of image */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(1,45,34,0.93) 0%, rgba(2,94,68,0.9) 50%, rgba(37,146,127,0.85) 100%)',
            zIndex: 1,
          }}
        />

        {/* Grid pattern */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 2,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Glow decoration */}
        <Box sx={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', backgroundColor: 'rgba(var(--web-light-rgb, 189, 217, 98),0.08)', pointerEvents: 'none', zIndex: 2 }} />
        <Box sx={{ position: 'absolute', bottom: -80, left: -40, width: 400, height: 400, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.03)', pointerEvents: 'none', zIndex: 2 }} />

        <Box sx={{ maxWidth: 1280, mx: 'auto', position: 'relative', zIndex: 3, width: '100%' }}>
          {/* Breadcrumb with background pill */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                backgroundColor: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                borderRadius: '999px',
                px: 2,
                py: 0.5,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Box
                component="a"
                href="/"
                sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: 'var(--web-light, #BDD962)' }, transition: 'color 0.2s' }}
              >
                Inicio
              </Box>
              <Box component="span" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>/</Box>
              <Box component="span" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'var(--web-light, #BDD962)', fontWeight: 600 }}>
                {config.labelPlural}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.025em',
              mb: 1.5,
              lineHeight: 1.15,
              textShadow: '0 2px 16px rgba(0,0,0,0.2)',
            }}
            component="h1"
          >
            {config.catalogTitle}
          </Box>
          <Box
            sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.0625rem', color: 'rgba(255,255,255,0.8)', maxWidth: 560, lineHeight: 1.7 }}
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
                  px: 2.5,
                  py: 1,
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(8px)',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.8125rem',
                  color: '#ffffff',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.18)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <span>{chip.icon}</span>
                {chip.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <CourseCatalog courses={courses} categories={categories} tipo={tipo} />
    </Box>
  )
}
