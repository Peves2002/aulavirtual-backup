'use client'

import Link from 'next/link'

import { Box, Grid, Typography } from '@mui/material'

import CourseThumbnail from '@/utils/components/CourseThumbnail'
import type { DashboardProgramaRecomendado } from '@/features/estudiante/dashboard/entity/Dashboard'

interface Props {
  programas: DashboardProgramaRecomendado[]
}

export default function CampusProgramasRecomendados({ programas }: Props) {
  if (programas.length === 0) return null

  return (
    <Box
      sx={{
        mb: 5,
        p: 2.5,
        borderRadius: '16px',
        bgcolor: 'action.hover',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: '0.9375rem',
          color: 'text.secondary',
          mb: 2,
        }}
      >
        Otros programas recomendados
      </Typography>

      <Grid container spacing={2}>
        {programas.map(p => (
          <Grid item xs={12} sm={6} md={3} key={p.id}>
            <Link href={`/cursos/${p.slug}`} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  opacity: 0.92,
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 1 },
                }}
              >
                <CourseThumbnail src={p.miniatura} title={p.titulo} aspectRatio='16/9' />
                <Typography
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'text.primary',
                    p: 1.25,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {p.titulo}
                </Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
