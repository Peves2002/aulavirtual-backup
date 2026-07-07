'use client'

import { useRouter } from 'next/navigation'

import {
  Box,
  Button,
  Chip,
  Grid,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'

import CourseThumbnail from '@/utils/components/CourseThumbnail'
import type { DashboardCurso } from '@/features/estudiante/dashboard/entity/Dashboard'

const ESTADO_LABEL: Record<DashboardCurso['estado'], string> = {
  sin_iniciar: 'Sin iniciar',
  en_progreso: 'En progreso',
  completado: 'Completado',
}

const ESTADO_COLOR: Record<DashboardCurso['estado'], 'default' | 'warning' | 'success'> = {
  sin_iniciar: 'default',
  en_progreso: 'warning',
  completado: 'success',
}

interface Props {
  programas: DashboardCurso[]
  loading?: boolean
}

function ProgramaCard({ programa }: { programa: DashboardCurso }) {
  const router = useRouter()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.08)' },
      }}
    >
      <Box sx={{ width: { xs: '100%', sm: 200 }, flexShrink: 0 }}>
        <CourseThumbnail
          src={programa.miniatura}
          title={programa.titulo}
          aspectRatio='16/9'
          sx={{ height: { xs: 140, sm: '100%' }, minHeight: { sm: 140 } }}
        />
      </Box>

      <Box sx={{ flex: 1, p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Stack direction='row' alignItems='flex-start' justifyContent='space-between' gap={1}>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              lineHeight: 1.35,
              color: 'text.primary',
            }}
          >
            {programa.titulo}
          </Typography>
          <Chip
            label={ESTADO_LABEL[programa.estado]}
            size='small'
            color={ESTADO_COLOR[programa.estado]}
            sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.6875rem', flexShrink: 0 }}
          />
        </Stack>

        <Box sx={{ mt: 'auto' }}>
          <Stack direction='row' justifyContent='space-between' sx={{ mb: 0.75 }}>
            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: 'text.secondary' }}>
              Avance
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 800, color: 'primary.main' }}>
              {Math.round(programa.progreso)}%
            </Typography>
          </Stack>
          <LinearProgress
            variant='determinate'
            value={programa.progreso}
            sx={{
              height: 8,
              borderRadius: 4,
              mb: 2,
              bgcolor: 'action.hover',
              '& .MuiLinearProgress-bar': { borderRadius: 4 },
            }}
          />
          <Button
            variant='contained'
            fullWidth
            onClick={() => router.push(`/estudiante/aprender/${programa.slug}`)}
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: '0.8125rem',
              borderRadius: '10px',
              textTransform: 'none',
              py: 1.25,
            }}
          >
            CONTINUAR
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default function CampusMisProgramas({ programas, loading }: Props) {
  if (!loading && programas.length === 0) {
    return (
      <Box sx={{ mb: 5 }}>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem', mb: 2 }}>
          Mis programas
        </Typography>
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            px: 3,
            borderRadius: '16px',
            border: '2px dashed',
            borderColor: 'divider',
          }}
        >
          <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: 'text.secondary' }}>
            Aún no tienes programas activos
          </Typography>
          <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: 'text.secondary', mt: 1, mb: 2.5 }}>
            Explora el catálogo y comienza tu formación.
          </Typography>
          <Button variant='contained' href='/cursos' sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, textTransform: 'none', borderRadius: '10px' }}>
            Ver capacitaciones
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ mb: 5 }}>
      <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem', mb: 0.5 }}>
        Mis programas
      </Typography>
      <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: 'text.secondary', mb: 3 }}>
        Retoma donde quedaste con un solo clic.
      </Typography>

      <Grid container spacing={2.5}>
        {loading
          ? [1, 2].map(i => (
              <Grid item xs={12} key={i}>
                <Skeleton variant='rounded' height={160} sx={{ borderRadius: '16px' }} />
              </Grid>
            ))
          : programas.map(programa => (
              <Grid item xs={12} key={programa.id}>
                <ProgramaCard programa={programa} />
              </Grid>
            ))}
      </Grid>
    </Box>
  )
}
