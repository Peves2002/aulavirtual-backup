'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Box, Container, Grid, Typography, Paper, Stack, Divider, Chip, Button, CircularProgress, Alert } from '@mui/material'
import { ChevronRight, ShoppingCart, ShieldCheck, Bot, Gift, CheckCircle } from 'lucide-react'

import ProductoIAPaymentForm from './ProductoIAPaymentForm'

const FONT = 'Poppins, sans-serif'

interface Producto {
  id: string
  titulo: string
  slug: string
  descripcion?: string | null
  miniatura?: string | null
  precio: number
  precio_falso?: number | null
  moneda: string
  es_gratis: boolean
  categoria?: string | null
}

// ── Inscripción gratuita ──────────────────────────────────────────────────────
function FreeEnrollSection({ producto }: { producto: Producto }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const handleEnroll = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout/producto-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productoId: producto.id, gateway: 'GRATIS' })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data?.error || 'No se pudo agregar el GPT')
      setDone(true)
      setTimeout(() => router.push('/estudiante/mis-gpts?success=1'), 1800)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper elevation={0} sx={{
      p: { xs: 3, md: 5 }, borderRadius: '24px', bgcolor: 'white',
      border: '1.5px solid hsl(214,20%,91%)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      textAlign: 'center'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Box sx={{ width: 72, height: 72, borderRadius: '20px', bgcolor: 'rgba(124,58,237,0.08)', border: '1.5px solid rgba(124,58,237,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Gift size={32} color="#7c3aed" />
        </Box>
      </Box>
      <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: '1.5rem', color: '#0A0A0A', mb: 1 }}>
        Este GPT es <span style={{ color: '#7c3aed' }}>100% Gratis</span>
      </Typography>
      <Typography sx={{ fontFamily: FONT, fontSize: '0.9375rem', color: '#64748b', mb: 4, maxWidth: 400, mx: 'auto' }}>
        Haz clic para agregar este asistente IA a tu panel y acceder de inmediato.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2, textAlign: 'left' }}>{error}</Alert>}

      {done ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
          <CheckCircle size={40} color="#16a34a" />
          <Typography sx={{ fontFamily: FONT, fontWeight: 700, color: '#16a34a', fontSize: '1.1rem' }}>
            ¡GPT agregado! Redirigiendo a tu panel...
          </Typography>
        </Box>
      ) : (
        <Button variant="contained" size="large" fullWidth
          startIcon={loading ? <CircularProgress size={18} sx={{ color: 'white' }} /> : <Gift size={18} />}
          onClick={handleEnroll} disabled={loading}
          sx={{ fontFamily: FONT, fontWeight: 700, fontSize: '1rem', bgcolor: '#7c3aed', '&:hover': { bgcolor: '#6d28d9' }, borderRadius: '14px', py: 1.8, textTransform: 'none', boxShadow: '0 4px 16px rgba(124,58,237,0.35)' }}>
          {loading ? 'Procesando...' : 'Obtener gratis ahora'}
        </Button>
      )}

      <Typography sx={{ fontFamily: FONT, fontSize: '0.75rem', color: '#94a3b8', mt: 3 }}>
        Sin tarjeta de crédito. Sin cargos ocultos.
      </Typography>
    </Paper>
  )
}

// ── Vista principal ───────────────────────────────────────────────────────────
export default function ProductoIACheckoutView({ producto }: { producto: Producto }) {
  const renderMainSection = () => {
    if (producto.es_gratis) return <FreeEnrollSection producto={producto} />
    
return <ProductoIAPaymentForm producto={producto} />
  }

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: 'calc(100vh - 64px)', fontFamily: FONT }}>
      {/* ── Mini hero ── */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)',
        py: { xs: 4, md: 5 }, px: { xs: 3, md: 8, lg: 12 },
        position: 'relative', overflow: 'hidden'
      }}>
        <Box aria-hidden sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap', mb: 2 }}>
            {[
              { label: 'Inicio', href: '/' },
              { label: 'Marketplace', href: '/marketplace' },
              { label: producto.titulo, href: `/marketplace/${producto.slug}` },
            ].map((item, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Link href={item.href} style={{ fontFamily: FONT, fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                  {item.label}
                </Link>
                <ChevronRight size={12} color="rgba(255,255,255,0.3)" />
              </Box>
            ))}
            <span style={{ fontFamily: FONT, fontSize: '0.8125rem', fontWeight: 700, color: '#a78bfa' }}>
              {producto.es_gratis ? 'Obtener gratis' : 'Checkout'}
            </span>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {producto.es_gratis ? <Gift size={22} color="#a78bfa" /> : <ShoppingCart size={22} color="#a78bfa" />}
            </Box>
            <Box>
              <Typography sx={{ fontFamily: FONT, fontWeight: 900, fontSize: { xs: '1.5rem', md: '2rem' }, color: '#fff', lineHeight: 1.1 }}>
                {producto.es_gratis ? 'Obtener Gratis' : 'Finalizar Compra'}
              </Typography>
              <Typography sx={{ fontFamily: FONT, fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', fontWeight: 400, mt: 0.25 }}>
                {producto.es_gratis
                  ? 'Accede a este asistente IA sin costo alguno.'
                  : 'Estás a un paso de acceder a tu asistente IA.'}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Content ── */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4}>
          {/* Resumen (sidebar) */}
          <Grid item xs={12} lg={4} sx={{ order: { xs: 1, lg: 2 } }}>
            <Paper elevation={0} sx={{
              p: { xs: 3, md: 4 }, borderRadius: '24px', bgcolor: 'white',
              border: '1.5px solid hsl(214,20%,91%)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              position: { lg: 'sticky' }, top: { lg: 100 }
            }}>
              <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: '1.25rem', color: '#0A0A0A', mb: 3 }}>
                Resumen del <span style={{ color: '#7c3aed' }}>Pedido</span>
              </Typography>

              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ width: 80, height: 60, borderRadius: '10px', overflow: 'hidden', flexShrink: 0, border: '1px solid', borderColor: 'divider', bgcolor: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {producto.miniatura
                      ? <Box component="img" src={producto.miniatura} alt={producto.titulo} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <Bot size={28} color="rgba(167,139,250,0.7)" strokeWidth={1.5} />}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography noWrap sx={{ fontFamily: FONT, fontWeight: 700, fontSize: '0.8125rem', lineHeight: 1.2, mb: 0.25, color: '#0A0A0A' }}>
                      {producto.titulo}
                    </Typography>
                    {producto.categoria && (
                      <Chip label={producto.categoria} size="small" sx={{ fontSize: '0.65rem', height: 18 }} />
                    )}
                    <Typography sx={{ fontFamily: FONT, fontSize: '0.75rem', color: '#64748b', display: 'block', mt: 0.5 }}>
                      {producto.es_gratis ? 'Gratis' : `${producto.moneda} ${producto.precio.toFixed(2)}`}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack spacing={1.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontFamily: FONT, fontSize: '0.875rem', color: '#64748b' }}>Subtotal</Typography>
                    <Typography sx={{ fontFamily: FONT, fontSize: '0.875rem', fontWeight: 600, color: '#0A0A0A' }}>
                      {producto.es_gratis ? 'Gratis' : `${producto.moneda} ${producto.precio.toFixed(2)}`}
                    </Typography>
                  </Stack>
                  {producto.precio_falso && producto.precio_falso > producto.precio && (
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ fontFamily: FONT, fontSize: '0.875rem', color: '#64748b' }}>Ahorro</Typography>
                      <Typography sx={{ fontFamily: FONT, fontSize: '0.875rem', fontWeight: 600, color: '#16a34a' }}>
                        - {producto.moneda} {(producto.precio_falso - producto.precio).toFixed(2)}
                      </Typography>
                    </Stack>
                  )}
                </Stack>

                <Divider />

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: '1rem', color: '#0A0A0A' }}>Total</Typography>
                  <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: '1.375rem', color: '#7c3aed' }}>
                    {producto.es_gratis ? 'GRATIS' : `${producto.moneda} ${producto.precio.toFixed(2)}`}
                  </Typography>
                </Stack>

                <Box sx={{ p: 2, backgroundColor: 'rgba(124,58,237,0.06)', borderRadius: '16px', border: '1px solid rgba(124,58,237,0.15)' }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', backgroundColor: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShieldCheck size={16} color="#ffffff" />
                    </Box>
                    <Typography sx={{ fontFamily: FONT, fontSize: '0.75rem', fontWeight: 600, color: '#4c1d95', lineHeight: 1.35 }}>
                      {producto.es_gratis
                        ? 'Acceso inmediato y gratuito. Sin compromisos.'
                        : 'Compra 100% segura. Acceso inmediato tras confirmar el pago.'}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Sección principal */}
          <Grid item xs={12} lg={8} sx={{ order: { xs: 2, lg: 1 } }}>
            {renderMainSection()}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
