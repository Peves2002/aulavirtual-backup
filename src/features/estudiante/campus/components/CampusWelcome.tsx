'use client'

import { Box, Skeleton, Typography } from '@mui/material'

interface Props {
  nombre: string
  loading?: boolean
}

export default function CampusWelcome({ nombre, loading }: Props) {
  return (
    <Box
      sx={{
        mb: 4,
        p: { xs: 3, md: 4 },
        borderRadius: '20px',
        background: 'linear-gradient(135deg, var(--web-dark, #1E40AF) 0%, var(--web-primary, #2563EB) 100%)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0.85,
            mb: 1,
          }}
        >
          Campus Digital Azul
        </Typography>
        {loading ? (
          <>
            <Skeleton variant='text' width={280} height={40} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            <Skeleton variant='text' width={220} height={24} sx={{ bgcolor: 'rgba(255,255,255,0.15)', mt: 1 }} />
          </>
        ) : (
          <>
            <Typography
              variant='h4'
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: { xs: '1.5rem', md: '1.875rem' },
                lineHeight: 1.2,
                mb: 0.75,
              }}
            >
              Bienvenido, {nombre.split(' ')[0]}.
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1rem',
                opacity: 0.9,
                fontWeight: 500,
              }}
            >
              Continúa desarrollando tus capacidades.
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}
