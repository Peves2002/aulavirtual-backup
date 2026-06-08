'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Box, Card, CardActionArea, CardContent, Chip, Grid,
  InputAdornment, Typography, Button, Stack, Alert
} from '@mui/material'
import { Bot, ArrowRight, ExternalLink, Gift, Search } from 'lucide-react'
import CustomTextField from '@core/components/mui/TextField'

interface GptItem {
  id: string
  titulo: string
  descripcion?: string | null
  miniatura?: string | null
  categoria?: string | null
  url_acceso?: string | null
  url_regalo?: string | null
  moneda: string
  inscrito_en: string
}

interface Props {
  gpts: GptItem[]
  success?: boolean
}

export default function MisGptsPage({ gpts, success }: Props) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return gpts.filter(g =>
      !q || g.titulo.toLowerCase().includes(q) || g.categoria?.toLowerCase().includes(q)
    )
  }, [gpts, search])

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" gap={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>Mis GPTs</Typography>
          <Typography color="text.secondary" mt={0.5}>
            {gpts.length === 0
              ? 'Aún no tienes asistentes IA adquiridos'
              : `${gpts.length} asistente${gpts.length !== 1 ? 's' : ''} IA disponible${gpts.length !== 1 ? 's' : ''}`}
          </Typography>
        </Box>
        <Button variant="outlined" component={Link} href="/marketplace" size="small" sx={{ flexShrink: 0 }}>
          Explorar Marketplace
        </Button>
      </Stack>

      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          ¡Acceso concedido! Tu GPT ya está disponible aquí.
        </Alert>
      )}

      {gpts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 12, px: 2 }}>
          <Box sx={{ width: 96, height: 96, borderRadius: '50%', bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <Bot size={48} strokeWidth={1} style={{ color: 'var(--mui-palette-text-disabled)' }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="text.secondary">Aún no tienes GPTs</Typography>
          <Typography color="text.disabled" mt={1} mb={3}>
            Explora el Marketplace y adquiere tu primer asistente IA.
          </Typography>
          <Button variant="contained" component={Link} href="/marketplace">
            Ir al Marketplace
          </Button>
        </Box>
      ) : (
        <>
          {/* Buscador */}
          <Box sx={{ mb: 4, maxWidth: 400 }}>
            <CustomTextField
              fullWidth
              placeholder="Buscar GPT..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} style={{ color: 'var(--mui-palette-text-disabled)' }} />
                  </InputAdornment>
                ),
                endAdornment: search ? (
                  <InputAdornment position="end">
                    <i className="tabler-x text-[20px] cursor-pointer" onClick={() => setSearch('')} />
                  </InputAdornment>
                ) : null
              }}
            />
          </Box>

          {filtered.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography color="text.secondary">No se encontraron GPTs con "{search}"</Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filtered.map(gpt => (
                <Grid item xs={12} sm={6} md={4} key={gpt.id}>
                  <GptCard gpt={gpt} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  )
}

function GptCard({ gpt }: { gpt: GptItem }) {
  const fecha = (() => {
    try { return new Date(gpt.inscrito_en).toLocaleDateString('es-PE', { year: 'numeric', month: 'short', day: 'numeric' }) }
    catch { return '' }
  })()

  return (
    <Card sx={{
      height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3,
      transition: 'all 0.22s ease', border: '1px solid', borderColor: 'divider',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: 6, borderColor: 'primary.light' }
    }}>
      <CardActionArea
        component={Link}
        href={`/estudiante/mis-gpts/${gpt.id}`}
        sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        {/* Imagen / placeholder */}
        {gpt.miniatura ? (
          <Box
            component="img"
            src={gpt.miniatura}
            alt={gpt.titulo}
            sx={{ width: '100%', height: 160, objectFit: 'cover' }}
          />
        ) : (
          <Box sx={{
            height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a2e 60%, #16213e 100%)',
            position: 'relative', overflow: 'hidden'
          }}>
            <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <Bot size={52} color="rgba(167,139,250,0.7)" strokeWidth={1} style={{ position: 'relative' }} />
          </Box>
        )}

        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
          {/* Badges */}
          <Stack direction="row" gap={0.75} flexWrap="wrap" mb={1.5}>
            {gpt.categoria && (
              <Chip label={gpt.categoria} size="small" sx={{ fontSize: '0.65rem', height: 20 }} />
            )}
            <Chip
              label="Activo"
              size="small"
              sx={{ fontSize: '0.65rem', height: 20, bgcolor: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}
            />
            {gpt.url_regalo && (
              <Chip
                icon={<Gift size={10} />}
                label="Incluye regalo"
                size="small"
                sx={{ fontSize: '0.65rem', height: 20, bgcolor: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)', '& .MuiChip-icon': { color: '#a78bfa', ml: '6px' } }}
              />
            )}
          </Stack>

          {/* Título */}
          <Typography variant="h6" fontWeight={700} mb={1} sx={{
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.35
          }}>
            {gpt.titulo}
          </Typography>

          {/* Descripción */}
          {gpt.descripcion && (
            <Typography variant="body2" color="text.secondary" mb={2} sx={{
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5, flex: 1
            }}>
              {gpt.descripcion}
            </Typography>
          )}

          {/* Footer */}
          <Stack sx={{ mt: 'auto' }} spacing={1.5}>
            <Typography variant="caption" color="text.disabled">
              Adquirido el {fecha}
            </Typography>

            {/* Quick action links (non-clickable area for direct access) */}
            <Stack direction="row" gap={1} flexWrap="wrap">
              {gpt.url_acceso && (
                <Chip
                  icon={<ExternalLink size={10} />}
                  label="Usar GPT"
                  size="small"
                  clickable
                  component="a"
                  href={gpt.url_acceso}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  sx={{
                    fontSize: '0.68rem', height: 22, bgcolor: '#10b981', color: 'white',
                    '& .MuiChip-icon': { color: 'white', ml: '6px' },
                    '&:hover': { bgcolor: '#059669' }
                  }}
                />
              )}
              {gpt.url_regalo && (
                <Chip
                  icon={<Gift size={10} />}
                  label="Regalo"
                  size="small"
                  clickable
                  component="a"
                  href={gpt.url_regalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  sx={{
                    fontSize: '0.68rem', height: 22, bgcolor: 'rgba(139,92,246,0.15)', color: '#a78bfa',
                    border: '1px solid rgba(139,92,246,0.3)', '& .MuiChip-icon': { color: '#a78bfa', ml: '6px' },
                    '&:hover': { bgcolor: 'rgba(139,92,246,0.25)' }
                  }}
                />
              )}
            </Stack>

            {/* Ver detalle CTA */}
            <Stack direction="row" alignItems="center" justifyContent="flex-end" gap={0.5}
              sx={{ color: 'primary.main', '& svg': { transition: 'transform 0.2s' }, '.MuiCard-root:hover & svg': { transform: 'translateX(3px)' } }}>
              <Typography variant="caption" fontWeight={700} color="primary.main">Ver detalles</Typography>
              <ArrowRight size={14} />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
