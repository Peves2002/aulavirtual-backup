'use client'

import Link from 'next/link'
import { Box, Container, Grid, Typography, Chip, Button, Stack, Divider, Paper } from '@mui/material'
import { Bot, ShoppingCart, CheckCircle, ArrowLeft, Tag, Globe, Gift, ExternalLink } from 'lucide-react'

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
  url_acceso?: string | null
  url_regalo?: string | null
}

interface Props {
  producto: Producto
  yaAdquirido: boolean
}

export default function ProductoIADetailView({ producto, yaAdquirido }: Props) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0f' }}>
      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)',
        pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 10 },
        position: 'relative', overflow: 'hidden'
      }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Button component={Link} href="/marketplace" startIcon={<ArrowLeft size={16} />} sx={{ color: 'rgba(255,255,255,0.6)', mb: 3, textTransform: 'none', '&:hover': { color: 'white' } }}>
            Volver al Marketplace
          </Button>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Stack direction="row" gap={1} mb={2} flexWrap="wrap">
                {producto.categoria && (
                  <Chip label={producto.categoria} size="small" icon={<Tag size={12} />} sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '0.7rem', '& .MuiChip-icon': { color: 'rgba(255,255,255,0.7)' } }} />
                )}
                <Chip label="GPT Profesional" size="small" icon={<Bot size={12} />} sx={{ bgcolor: 'rgba(139,92,246,0.3)', color: '#c4b5fd', fontSize: '0.7rem', borderColor: 'rgba(139,92,246,0.4)', border: '1px solid', '& .MuiChip-icon': { color: '#c4b5fd' } }} />
                <Chip label="Acceso permanente" size="small" icon={<Globe size={12} />} sx={{ bgcolor: 'rgba(16,185,129,0.2)', color: '#6ee7b7', fontSize: '0.7rem', '& .MuiChip-icon': { color: '#6ee7b7' } }} />
              </Stack>

              <Typography variant="h3" fontWeight={800} color="white" sx={{ lineHeight: 1.15, mb: 3, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                {producto.titulo}
              </Typography>

              {producto.descripcion && (
                <Typography color="rgba(255,255,255,0.75)" sx={{ fontSize: '1.05rem', lineHeight: 1.7, mb: 4 }}>
                  {producto.descripcion}
                </Typography>
              )}

              {/* Precio + CTA (mobile) */}
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <PriceAndCta producto={producto} yaAdquirido={yaAdquirido} />
              </Box>
            </Grid>

            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'relative' }}>
                <Box sx={{ position: 'absolute', inset: -16, borderRadius: 4, background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)', filter: 'blur(24px)' }} />
                {producto.miniatura ? (
                  <Box component="img" src={producto.miniatura} alt={producto.titulo} sx={{ width: '100%', borderRadius: 3, boxShadow: '0 24px 64px rgba(0,0,0,0.5)', position: 'relative', maxHeight: 340, objectFit: 'cover' }} />
                ) : (
                  <Box sx={{ width: '100%', height: 300, borderRadius: 3, background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(16,185,129,0.1) 100%)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <Bot size={80} color="rgba(139,92,246,0.6)" strokeWidth={1} />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contenido */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4}>
          {/* Descripción detallada */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Typography variant="h5" fontWeight={700} color="white" mb={3}>¿Qué incluye este GPT?</Typography>
              <Stack spacing={2}>
                {[
                  'Acceso permanente al asistente IA configurado y entrenado',
                  'Disponible 24/7 desde cualquier dispositivo con acceso a ChatGPT',
                  'Respuestas especializadas en el área de ' + (producto.categoria || 'tu industria'),
                  'Actualizaciones y mejoras del modelo incluidas',
                  ...(producto.url_regalo ? ['Contenido de regalo y recursos adicionales exclusivos'] : [])
                ].map((item, i) => (
                  <Stack key={i} direction="row" gap={1.5} alignItems="flex-start">
                    <CheckCircle size={18} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
                    <Typography color="rgba(255,255,255,0.8)" fontSize="0.95rem">{item}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>

            {yaAdquirido && (
              <Paper sx={{ p: 4, mt: 3, borderRadius: 3, bgcolor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <Typography variant="h6" fontWeight={700} color="#6ee7b7" mb={1}>Ya tienes acceso a este GPT</Typography>
                <Typography color="rgba(255,255,255,0.7)" mb={3} fontSize="0.9rem">Puedes usar tu asistente IA en cualquier momento.</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                  {producto.url_acceso && (
                    <Button variant="contained" href={producto.url_acceso} target="_blank" rel="noopener noreferrer" endIcon={<ExternalLink size={16} />}
                      sx={{ bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' }, fontWeight: 700, borderRadius: 2 }}>
                      Usar GPT ahora
                    </Button>
                  )}
                  {producto.url_regalo && (
                    <Button variant="outlined" href={producto.url_regalo} target="_blank" rel="noopener noreferrer" endIcon={<Gift size={16} />}
                      sx={{ borderColor: 'rgba(16,185,129,0.5)', color: '#6ee7b7', '&:hover': { borderColor: '#10b981', bgcolor: 'rgba(16,185,129,0.08)' }, fontWeight: 700, borderRadius: 2 }}>
                      Contenido de regalo
                    </Button>
                  )}
                </Stack>
              </Paper>
            )}
          </Grid>

          {/* Sidebar con precio - desktop */}
          <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <PriceAndCta producto={producto} yaAdquirido={yaAdquirido} />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

function PriceAndCta({ producto, yaAdquirido }: { producto: Producto; yaAdquirido: boolean }) {
  return (
    <Stack spacing={2}>
      <Box>
        {producto.es_gratis ? (
          <Typography variant="h4" fontWeight={800} color="#10b981">GRATIS</Typography>
        ) : (
          <Stack direction="row" alignItems="baseline" gap={1.5}>
            <Typography variant="h4" fontWeight={800} color="white">{producto.moneda} {producto.precio.toFixed(2)}</Typography>
            {producto.precio_falso && producto.precio_falso > producto.precio && (
              <Typography variant="h6" color="rgba(255,255,255,0.35)" sx={{ textDecoration: 'line-through' }}>{producto.moneda} {producto.precio_falso.toFixed(2)}</Typography>
            )}
          </Stack>
        )}
        <Typography variant="caption" color="rgba(255,255,255,0.5)">Pago único · Acceso permanente</Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {yaAdquirido ? (
        <>
          <Button component={Link} href="/estudiante/mis-gpts" fullWidth variant="contained"
            sx={{ py: 1.5, fontWeight: 700, bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' }, borderRadius: 2 }}
            startIcon={<CheckCircle size={18} />}>
            Ir a Mis GPTs
          </Button>
          {producto.url_acceso && (
            <Button component="a" href={producto.url_acceso} target="_blank" rel="noopener noreferrer"
              fullWidth variant="outlined"
              sx={{ py: 1.5, fontWeight: 700, borderColor: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: 2 }}
              endIcon={<ExternalLink size={16} />}>
              Usar GPT
            </Button>
          )}
        </>
      ) : (
        <Button component={Link} href={`/checkout/productos-ia/${producto.slug}`} fullWidth variant="contained"
          sx={{ py: 1.5, fontWeight: 700, fontSize: '1rem', borderRadius: 2, background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', '&:hover': { opacity: 0.9 } }}
          startIcon={<ShoppingCart size={18} />}>
          {producto.es_gratis ? 'Obtener gratis' : 'Comprar ahora'}
        </Button>
      )}

      <Stack spacing={1} sx={{ pt: 1 }}>
        {['✔ Acceso permanente', '✔ Sin mensualidades', '✔ Disponible 24/7', '✔ Soporte incluido'].map(t => (
          <Typography key={t} variant="caption" color="rgba(255,255,255,0.55)" fontSize="0.8rem">{t}</Typography>
        ))}
      </Stack>
    </Stack>
  )
}
