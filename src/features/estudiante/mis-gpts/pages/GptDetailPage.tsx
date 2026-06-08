'use client'

import Link from 'next/link'
import { Box, Button, Container, Divider, Paper, Stack, Typography, Chip } from '@mui/material'
import { ArrowLeft, Bot, CheckCircle, ExternalLink, Gift, Tag } from 'lucide-react'

interface GptItem {
  id: string
  titulo: string
  descripcion?: string | null
  miniatura?: string | null
  categoria?: string | null
  url_acceso?: string | null
  url_regalo?: string | null
  precio: number
  moneda: string
  inscrito_en: string
}

export default function GptDetailPage({ gpt }: { gpt: GptItem }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a2e 60%, #16213e 100%)',
        pt: { xs: 5, md: 8 }, pb: { xs: 5, md: 8 }, position: 'relative', overflow: 'hidden'
      }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Button component={Link} href="/estudiante/mis-gpts" startIcon={<ArrowLeft size={16} />}
            sx={{ color: 'rgba(255,255,255,0.6)', mb: 3, textTransform: 'none', '&:hover': { color: 'white' } }}>
            Mis GPTs
          </Button>

          <Stack direction={{ xs: 'column', sm: 'row' }} gap={3} alignItems="flex-start">
            {gpt.miniatura ? (
              <Box component="img" src={gpt.miniatura} alt={gpt.titulo} sx={{ width: { xs: '100%', sm: 160 }, height: { xs: 180, sm: 160 }, objectFit: 'cover', borderRadius: 3, flexShrink: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }} />
            ) : (
              <Box sx={{ width: 120, height: 120, borderRadius: 3, background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(16,185,129,0.2) 100%)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={48} color="rgba(139,92,246,0.8)" strokeWidth={1} />
              </Box>
            )}

            <Box>
              <Stack direction="row" gap={1} mb={1.5} flexWrap="wrap">
                {gpt.categoria && (
                  <Chip label={gpt.categoria} size="small" icon={<Tag size={11} />} sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '0.65rem', '& .MuiChip-icon': { color: 'rgba(255,255,255,0.7)' } }} />
                )}
                <Chip label="Acceso activo" size="small" icon={<CheckCircle size={11} />} sx={{ bgcolor: 'rgba(16,185,129,0.2)', color: '#6ee7b7', fontSize: '0.65rem', '& .MuiChip-icon': { color: '#6ee7b7' } }} />
              </Stack>
              <Typography variant="h4" fontWeight={800} color="white" sx={{ lineHeight: 1.2, mb: 1, fontSize: { xs: '1.6rem', md: '2rem' } }}>
                {gpt.titulo}
              </Typography>
              <Typography variant="caption" color="rgba(255,255,255,0.45)">
                Adquirido el {new Date(gpt.inscrito_en).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Contenido */}
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 5 } }}>
        {gpt.descripcion && (
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight={700} mb={1.5}>Descripción</Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>{gpt.descripcion}</Typography>
          </Paper>
        )}

        {/* Acciones principales */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Tu acceso</Typography>
          <Stack spacing={2}>
            {gpt.url_acceso ? (
              <Box sx={{ p: 2.5, borderRadius: 2, bgcolor: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <Stack direction="row" gap={1} alignItems="center" mb={1}>
                  <Typography fontWeight={700}>Asistente GPT</Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                  Accede directamente a tu asistente IA configurado
                </Typography>
                <Button variant="contained" href={gpt.url_acceso} target="_blank" rel="noopener noreferrer"
                  fullWidth endIcon={<ExternalLink size={16} />}
                  sx={{ bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' }, fontWeight: 700, borderRadius: 2, py: 1.8, fontSize: '1rem' }}>
                  Usar GPT
                </Button>
              </Box>
            ) : (
              <Box sx={{ p: 2.5, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.04)', border: '1px dashed', borderColor: 'divider' }}>
                <Typography color="text.secondary" fontSize="0.9rem">El acceso al GPT estará disponible pronto.</Typography>
              </Box>
            )}

            {gpt.url_regalo && (
              <>
                <Divider />
                <Box sx={{ p: 2.5, borderRadius: 2, bgcolor: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <Stack direction="row" gap={1} alignItems="center" mb={1}>
                    <Gift size={16} color="#a78bfa" />
                    <Typography fontWeight={700}>Contenido de regalo</Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                    Recursos y materiales adicionales exclusivos para ti
                  </Typography>
                  <Button variant="outlined" href={gpt.url_regalo} target="_blank" rel="noopener noreferrer"
                    fullWidth endIcon={<ExternalLink size={16} />}
                    sx={{ borderColor: 'rgba(139,92,246,0.5)', color: '#a78bfa', '&:hover': { borderColor: '#7c3aed', bgcolor: 'rgba(139,92,246,0.08)' }, fontWeight: 700, borderRadius: 2, py: 1.8, fontSize: '1rem' }}>
                    Ver contenido de regalo
                  </Button>
                </Box>
              </>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
