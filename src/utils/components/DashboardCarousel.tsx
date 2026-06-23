'use client'

import { useEffect, useState } from 'react'

import { Box, IconButton, Paper, Typography } from '@mui/material'

import { useConfig } from '@/contexts/ConfigContext'

interface CarruselImagen {
  label: string
  url: string
}

const AUTO_ADVANCE_MS = 6000

export default function DashboardCarousel() {
  const configs = useConfig()

  const imagenes: CarruselImagen[] = (() => {
    try {
      return JSON.parse(configs.DASHBOARD_CARRUSEL_IMAGENES || '[]')
    } catch {
      return []
    }
  })()

  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (imagenes.length <= 1) return

    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % imagenes.length)
    }, AUTO_ADVANCE_MS)

    return () => clearInterval(timer)
  }, [imagenes.length])

  if (imagenes.length === 0) return null

  const actual = imagenes[index]

  const goTo = (i: number) => setIndex((i + imagenes.length) % imagenes.length)

  return (
    <Paper sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2, height: { xs: 180, sm: 240, md: 280 } }}>
      <Box
        component='img'
        src={actual.url}
        alt={actual.label || 'Carrusel'}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {actual.label && (
        <Box
          sx={{
            position: 'absolute',
            insetInlineStart: 0,
            insetBlockEnd: 0,
            insetInlineEnd: 0,
            pt: 3,
            pb: imagenes.length > 1 ? 4.5 : 2,
            px: 3,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)'
          }}
        >
          <Typography variant='subtitle1' sx={{ color: '#fff', fontWeight: 600 }}>
            {actual.label}
          </Typography>
        </Box>
      )}

      {imagenes.length > 1 && (
        <>
          <IconButton
            size='small'
            onClick={() => goTo(index - 1)}
            sx={{
              position: 'absolute', insetBlockStart: '50%', insetInlineStart: 8, transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.4)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }
            }}
          >
            <i className='tabler-chevron-left' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => goTo(index + 1)}
            sx={{
              position: 'absolute', insetBlockStart: '50%', insetInlineEnd: 8, transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.4)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }
            }}
          >
            <i className='tabler-chevron-right' />
          </IconButton>

          <Box sx={{ position: 'absolute', insetBlockEnd: 10, insetInlineStart: 0, insetInlineEnd: 0, display: 'flex', justifyContent: 'center', gap: 1 }}>
            {imagenes.map((_, i) => (
              <Box
                key={i}
                onClick={() => goTo(i)}
                sx={{
                  width: i === index ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: i === index ? '#fff' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Paper>
  )
}
