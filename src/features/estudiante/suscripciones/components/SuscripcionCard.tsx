'use client'

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  Divider,
  Grid,
  CircularProgress
} from '@mui/material'

import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

import HydratedDate from '@/utils/components/HydratedDate'
import { useCancelarSuscripcion, useSincronizarSuscripcion } from '../hooks/useSuscripcion'
import type { Suscripcion } from '../entity/Suscripcion'
import { INTERVALO_LABELS } from '../entity/Suscripcion'

const ESTADO_CONFIG: Record<string, { label: string; color: 'success' | 'error' | 'warning' | 'secondary' | 'info' }> = {
  ACTIVA:    { label: 'Activa', color: 'success' },
  EN_PRUEBA: { label: 'En Prueba', color: 'info' },
  PENDIENTE: { label: 'Pendiente', color: 'warning' },
  VENCIDA:   { label: 'Vencida', color: 'error' },
  CANCELADA: { label: 'Cancelada', color: 'secondary' }
}

const ESTADO_PAGO_CONFIG: Record<string, { label: string; color: 'success' | 'error' | 'warning' | 'secondary' }> = {
  COMPLETADO: { label: 'Completado', color: 'success' },
  PENDIENTE:  { label: 'Pendiente', color: 'warning' },
  FALLIDO:    { label: 'Fallido', color: 'error' },
  REEMBOLSADO: { label: 'Reembolsado', color: 'secondary' }
}

interface SuscripcionCardProps {
  suscripcion: Suscripcion
}

const SuscripcionCard = ({ suscripcion }: SuscripcionCardProps) => {
  const cancelar = useCancelarSuscripcion()
  const sincronizar = useSincronizarSuscripcion()
  const estadoConfig = ESTADO_CONFIG[suscripcion.estado] ?? { label: suscripcion.estado, color: 'secondary' as const }

  const handleCancelar = async () => {
    const result = await Swal.fire({
      title: '¿Cancelar suscripción?',
      text: 'Perderás el acceso a los cursos del plan al finalizar el período actual. Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Mantener suscripción'
    })

    if (result.isConfirmed) {
      try {
        await cancelar.mutateAsync(suscripcion.id)
        toast.success('Suscripción cancelada')
      } catch (error: any) {
        toast.error(error?.message || 'Error al cancelar la suscripción')
      }
    }
  }

  return (
    <Card sx={{
      borderRadius: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.01)',
      overflow: 'hidden'
    }}>
      {/* Indicador superior estético */}
      <Box sx={{ height: 6, bg: 'linear-gradient(90deg, var(--web-primary,#25927F) 0%, var(--web-dark,#025E44) 100%)' }} />

      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant='h6' sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em', mb: 0.5 }}>
              {suscripcion.plan.nombre}
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 500 }}>
              Plan recurrente de la plataforma
            </Typography>
          </Box>
          <Chip
            label={estadoConfig.label}
            color={estadoConfig.color}
            size='small'
            sx={{
              fontWeight: 700,
              fontSize: '0.75rem',
              borderRadius: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              px: 1,
              py: 0.5,
              height: 'auto'
            }}
          />
        </Box>

        {/* Métricas clave en Grid */}
        <Grid container spacing={2} sx={{ mb: 3.5 }}>
          {suscripcion.fecha_inicio && (
            <Grid item xs={12} sm={4}>
              <Box sx={{
                p: 2,
                borderRadius: '16px',
                border: '1px solid #f1f5f9',
                bgcolor: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                height: '100%'
              }}>
                <Box sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '10px',
                  bgcolor: 'rgba(37,146,127,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <i className='tabler-calendar' style={{ color: 'var(--web-primary,#25927F)', fontSize: 16 }} />
                </Box>
                <Box>
                  <Typography variant='caption' color='text.secondary' display='block' sx={{ lineHeight: 1.2, fontWeight: 500 }}>
                    Fecha Inicio
                  </Typography>
                  <Typography variant='body2' sx={{ fontWeight: 700, color: '#334155' }}>
                    <HydratedDate date={suscripcion.fecha_inicio} format='date' />
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {suscripcion.fecha_proximo_cobro && ['ACTIVA', 'EN_PRUEBA'].includes(suscripcion.estado) && (
            <Grid item xs={12} sm={4}>
              <Box sx={{
                p: 2,
                borderRadius: '16px',
                border: '1px solid #f1f5f9',
                bgcolor: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                height: '100%'
              }}>
                <Box sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '10px',
                  bgcolor: 'rgba(37,146,127,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <i className='tabler-credit-card' style={{ color: 'var(--web-primary,#25927F)', fontSize: 16 }} />
                </Box>
                <Box>
                  <Typography variant='caption' color='text.secondary' display='block' sx={{ lineHeight: 1.2, fontWeight: 500 }}>
                    Próximo Cobro
                  </Typography>
                  <Typography variant='body2' sx={{ fontWeight: 700, color: '#334155' }}>
                    <HydratedDate date={suscripcion.fecha_proximo_cobro} format='date' />
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {suscripcion.fecha_cancelacion && (
            <Grid item xs={12} sm={4}>
              <Box sx={{
                p: 2,
                borderRadius: '16px',
                border: '1px solid #fee2e2',
                bgcolor: '#fff5f5',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                height: '100%'
              }}>
                <Box sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '10px',
                  bgcolor: 'rgba(239,68,68,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <i className='tabler-calendar-off' style={{ color: '#ef4444', fontSize: 16 }} />
                </Box>
                <Box>
                  <Typography variant='caption' color='error' display='block' sx={{ lineHeight: 1.2, fontWeight: 500 }}>
                    Cancelación
                  </Typography>
                  <Typography variant='body2' sx={{ fontWeight: 700, color: '#b91c1c' }}>
                    <HydratedDate date={suscripcion.fecha_cancelacion} format='date' />
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}

          <Grid item xs={12} sm={4}>
            <Box sx={{
              p: 2,
              borderRadius: '16px',
              border: '1px solid #f1f5f9',
              bgcolor: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              height: '100%'
            }}>
              <Box sx={{
                width: 32,
                height: 32,
                borderRadius: '10px',
                bgcolor: 'rgba(37,146,127,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <i className='tabler-coin' style={{ color: 'var(--web-primary,#25927F)', fontSize: 16 }} />
              </Box>
              <Box>
                <Typography variant='caption' color='text.secondary' display='block' sx={{ lineHeight: 1.2, fontWeight: 500 }}>
                  Costo de Plan
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 700, color: '#334155' }}>
                  {suscripcion.plan.moneda === 'PEN' ? 'S/' : '$'} {Number(suscripcion.plan.precio).toFixed(2)} / {INTERVALO_LABELS[suscripcion.plan.intervalo]?.toLowerCase()}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {suscripcion.estado === 'PENDIENTE' && (
          <Box sx={{
            mb: 3, p: 2, borderRadius: '14px',
            bgcolor: '#fffbeb', border: '1px solid #fde68a',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <i className='tabler-clock' style={{ color: '#d97706', fontSize: 20, flexShrink: 0 }} />
              <Typography variant='body2' sx={{ color: '#92400e', fontWeight: 500, lineHeight: 1.4 }}>
                Tu pago está siendo verificado. Esto puede tardar unos segundos.
              </Typography>
            </Box>
            <Button
              size='small'
              variant='outlined'
              onClick={() => sincronizar.mutate()}
              disabled={sincronizar.isPending}
              startIcon={sincronizar.isPending
                ? <CircularProgress size={14} color='inherit' />
                : <i className='tabler-refresh' style={{ fontSize: 14 }} />
              }
              sx={{
                borderRadius: '10px', textTransform: 'none', fontWeight: 600,
                borderColor: '#fbbf24', color: '#d97706', bgcolor: '#fff',
                whiteSpace: 'nowrap', flexShrink: 0,
                '&:hover': { borderColor: '#f59e0b', bgcolor: '#fef3c7' }
              }}
            >
              {sincronizar.isPending ? 'Verificando...' : 'Verificar ahora'}
            </Button>
          </Box>
        )}

        <Divider sx={{ my: 3, borderColor: '#f1f5f9' }} />

        {/* Beneficios */}
        <Box sx={{ mb: 3.5 }}>
          {(() => {
            const beneficios: string[] = Array.isArray(suscripcion.plan.beneficios) ? suscripcion.plan.beneficios : []
            const tieneBeneficios = beneficios.length > 0
            const tieneExclusiones = suscripcion.plan.cursos.length > 0

            return (
              <>
                {tieneBeneficios && (
                  <>
                    <Typography variant='subtitle2' sx={{ fontWeight: 700, color: '#475569', mb: 2, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                      Beneficios de tu membresía:
                    </Typography>
                    <Grid container spacing={1.5}>
                      {beneficios.map((beneficio, idx) => (
                        <Grid item xs={12} sm={6} key={idx}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                            <Box sx={{
                              width: 18, height: 18, borderRadius: '50%',
                              bgcolor: 'rgba(37,146,127,0.08)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0, mt: 0.2
                            }}>
                              <i className='tabler-check' style={{ color: 'var(--web-primary,#25927F)', fontSize: 12, fontWeight: 900 }} />
                            </Box>
                            <Typography variant='body2' color='text.secondary' sx={{ lineHeight: 1.4, fontWeight: 500 }}>
                              {beneficio}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}

                <Box sx={{
                  mt: tieneBeneficios ? 3 : 0, display: 'inline-flex', alignItems: 'center', gap: 1,
                  bgcolor: '#f8fafc', border: '1px solid #e2e8f0',
                  px: 2, py: 1, borderRadius: '12px'
                }}>
                  <i className='tabler-book-2' style={{ color: '#64748b', fontSize: 16 }} />
                  <Typography variant='caption' fontWeight={700} color='text.secondary'>
                    {tieneExclusiones
                      ? `Acceso a todos los cursos, excepto ${suscripcion.plan.cursos.length}`
                      : 'Acceso a todos los cursos de la plataforma'}
                  </Typography>
                </Box>

                {tieneExclusiones && (
                  <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mt: 1, lineHeight: 1.4 }}>
                    No incluye: {suscripcion.plan.cursos.slice(0, 3).map(c => c.curso.titulo).join(', ')}
                    {suscripcion.plan.cursos.length > 3 && ` y ${suscripcion.plan.cursos.length - 3} más`}
                  </Typography>
                )}
              </>
            )
          })()}
        </Box>

        {suscripcion.pagos.length > 0 && (
          <>
            <Divider sx={{ my: 3, borderColor: '#f1f5f9' }} />

            <Box>
              <Typography variant='subtitle2' sx={{ fontWeight: 700, color: '#475569', mb: 2, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                Últimos pagos
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {suscripcion.pagos.map(pago => {
                  const cfgPago = ESTADO_PAGO_CONFIG[pago.estado] ?? { label: pago.estado, color: 'secondary' as const }

                  return (
                    <Box
                      key={pago.id}
                      sx={{
                        p: 1.75,
                        borderRadius: '14px',
                        border: '1px solid #f1f5f9',
                        bgcolor: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1.5,
                        flexWrap: 'wrap'
                      }}
                    >
                      <Box>
                        <Typography variant='body2' sx={{ fontWeight: 700, color: '#334155' }}>
                          {pago.moneda === 'PEN' ? 'S/' : '$'} {Number(pago.monto).toFixed(2)}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          <HydratedDate date={pago.creado_en} format='date' />
                        </Typography>
                      </Box>
                      <Chip
                        label={cfgPago.label}
                        color={cfgPago.color}
                        size='small'
                        sx={{ fontWeight: 700, fontSize: '0.7rem' }}
                      />
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </>
        )}

        {suscripcion.estado === 'ACTIVA' && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button
              variant='outlined'
              color='error'
              size='small'
              startIcon={<i className='tabler-circle-x' style={{ fontSize: 16 }} />}
              onClick={handleCancelar}
              disabled={cancelar.isPending}
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 600,
                borderColor: '#fee2e2',
                color: '#ef4444',
                bgcolor: '#fff',
                py: 0.8,
                px: 2,
                '&:hover': {
                  borderColor: '#fca5a5',
                  bgcolor: '#fef2f2'
                }
              }}
            >
              Cancelar suscripción
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default SuscripcionCard
