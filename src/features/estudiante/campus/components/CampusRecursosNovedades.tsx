'use client'

import Link from 'next/link'

import { Box, Stack, Typography } from '@mui/material'
import { FileText, BookOpen, Download, Newspaper } from 'lucide-react'

import type { DashboardRecursoNovedad } from '@/features/estudiante/dashboard/entity/Dashboard'

const TIPO_ICON = {
  articulo: FileText,
  guia: BookOpen,
  plantilla: Download,
  noticia: Newspaper,
} as const

const TIPO_LABEL = {
  articulo: 'Artículo',
  guia: 'Guía',
  plantilla: 'Plantilla',
  noticia: 'Noticia',
} as const

interface Props {
  items: DashboardRecursoNovedad[]
}

export default function CampusRecursosNovedades({ items }: Props) {
  if (items.length === 0) return null

  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.125rem', mb: 0.5 }}>
        Recursos y novedades
      </Typography>
      <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: 'text.secondary', mb: 2.5 }}>
        Mantente al día con el ecosistema Digital Azul.
      </Typography>

      <Stack spacing={1.5}>
        {items.map(item => {
          const Icon = TIPO_ICON[item.tipo]

          return (
            <Link key={item.id} href={item.href} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color='var(--mui-palette-primary-main)' />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: 'primary.main',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {TIPO_LABEL[item.tipo]}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'text.primary',
                    }}
                  >
                    {item.titulo}
                  </Typography>
                </Box>
              </Box>
            </Link>
          )
        })}
      </Stack>

      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Link href='/recursos' style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--mui-palette-primary-main)', textDecoration: 'none' }}>
          Ver todos los recursos →
        </Link>
      </Box>
    </Box>
  )
}
