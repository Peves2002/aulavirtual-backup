'use client'

import { Box, Typography, Divider, Chip, CircularProgress } from '@mui/material'

import AppModal from '@/utils/components/AppModal'
import HydratedDate from '@/utils/components/HydratedDate'
import { usePagosSuscripcionAdmin } from '../hooks/useSuscripcionesAdmin'
import type { SuscripcionAdmin, EstadoPagoSuscripcion } from '../entity/Suscripcion'

const ESTADO_PAGO_CONFIG: Record<EstadoPagoSuscripcion, { label: string; color: 'success' | 'error' | 'warning' | 'secondary' }> = {
  COMPLETADO:  { label: 'Completado', color: 'success' },
  PENDIENTE:   { label: 'Pendiente', color: 'warning' },
  FALLIDO:     { label: 'Fallido', color: 'error' },
  REEMBOLSADO: { label: 'Reembolsado', color: 'secondary' }
}

interface Props {
  open: boolean
  suscripcion: SuscripcionAdmin | null
  handleClose: () => void
}

export function HistorialPagosModal({ open, suscripcion, handleClose }: Props) {
  const { data, isLoading, isError } = usePagosSuscripcionAdmin(open ? suscripcion?.id ?? null : null)

  if (!suscripcion) return null

  const pagos = data?.pagos ?? []

  return (
    <AppModal open={open} handleClose={handleClose}>
      <Box sx={{ p: 1 }}>
        <Typography variant='h6' sx={{ fontWeight: 700, mb: 0.5 }}>
          Historial de pagos
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
          {suscripcion.usuario.nombre} {suscripcion.usuario.apellido} — {suscripcion.plan.nombre}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={28} />
          </Box>
        )}

        {isError && (
          <Typography color='error' variant='body2'>
            Error al cargar el historial de pagos
          </Typography>
        )}

        {!isLoading && !isError && pagos.length === 0 && (
          <Typography variant='body2' color='text.secondary'>
            Esta suscripción todavía no tiene pagos registrados.
          </Typography>
        )}

        {pagos.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxHeight: 420, overflowY: 'auto', pr: 0.5 }}>
            {pagos.map(pago => {
              const cfg = ESTADO_PAGO_CONFIG[pago.estado] ?? { label: pago.estado, color: 'secondary' as const }

              return (
                <Box
                  key={pago.id}
                  sx={{
                    p: 2,
                    borderRadius: '12px',
                    border: '1px solid #f1f5f9',
                    bgcolor: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    flexWrap: 'wrap'
                  }}
                >
                  <Box>
                    <Typography variant='body2' sx={{ fontWeight: 700 }}>
                      {pago.moneda === 'PEN' ? 'S/' : '$'} {Number(pago.monto).toFixed(2)}
                    </Typography>
                    <Typography variant='caption' color='text.secondary' sx={{ display: 'block' }}>
                      <HydratedDate date={pago.creado_en} format='date' />
                      {pago.intentos > 0 && ` · intento ${pago.intentos}`}
                    </Typography>
                    {pago.culqi_cargo_id && (
                      <Typography variant='caption' color='text.secondary' sx={{ display: 'block', fontFamily: 'monospace' }}>
                        {pago.culqi_cargo_id}
                      </Typography>
                    )}
                  </Box>
                  <Chip label={cfg.label} color={cfg.color} size='small' sx={{ fontWeight: 700, fontSize: '0.7rem' }} />
                </Box>
              )
            })}
          </Box>
        )}
      </Box>
    </AppModal>
  )
}
