'use client'

import { Box, Grid, Skeleton, Typography } from '@mui/material'

import type { DashboardKpis } from '@/features/estudiante/dashboard/entity/Dashboard'

interface Props {
  kpis?: DashboardKpis
  loading?: boolean
}

const METRICS = [
  { key: 'avanceGeneral' as const, label: 'Avance general', suffix: '%' },
  { key: 'programasActivos' as const, label: 'Programas activos', suffix: '' },
  { key: 'totalCertificados' as const, label: 'Certificados obtenidos', suffix: '' },
]

export default function CampusAvanceGeneral({ kpis, loading }: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: '0.8125rem',
          color: 'text.secondary',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          mb: 2,
        }}
      >
        Avance general
      </Typography>
      <Grid container spacing={2}>
        {METRICS.map(metric => (
          <Grid item xs={12} sm={4} key={metric.key}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: '16px',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {loading ? (
                <>
                  <Skeleton width={80} height={36} />
                  <Skeleton width={120} height={18} sx={{ mt: 0.5 }} />
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 800,
                      fontSize: '1.75rem',
                      color: 'primary.main',
                      lineHeight: 1,
                    }}
                  >
                    {kpis?.[metric.key] ?? 0}{metric.suffix}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.8125rem',
                      color: 'text.secondary',
                      fontWeight: 600,
                      mt: 0.75,
                    }}
                  >
                    {metric.label}
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
