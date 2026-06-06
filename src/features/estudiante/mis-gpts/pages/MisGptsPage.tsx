'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Box, Card, CardContent, Chip, Grid, InputAdornment, Typography, Button, Stack, Alert, CardActionArea
} from '@mui/material'
import { Bot, ArrowRight } from 'lucide-react'
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
    return gpts.filter(g => !q || g.titulo.toLowerCase().includes(q) || g.categoria?.toLowerCase().includes(q))
  }, [gpts, search])

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800}>Mis GPTs</Typography>
        <Typography color="text.secondary">Tus productos de inteligencia artificial adquiridos</Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          ¡Acceso concedido! Tu GPT ya está disponible aquí.
        </Alert>
      )}

      {gpts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 12 }}>
          <Bot size={64} color="var(--mui-palette-text-disabled)" strokeWidth={1} />
          <Typography variant="h5" fontWeight={700} mt={3} color="text.secondary">Aún no tienes GPTs</Typography>
          <Typography color="text.secondary" mt={1}>Explora el Marketplace y adquiere tu primer asistente IA.</Typography>
          <Button variant="contained" href="/marketplace" sx={{ mt: 3 }}>Ir al Marketplace</Button>
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 4, maxWidth: 400 }}>
            <CustomTextField
              fullWidth placeholder="Buscar GPT..."
              value={search} onChange={e => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><i className="tabler-search text-[22px]" /></InputAdornment>,
                endAdornment: search ? (
                  <InputAdornment position="end">
                    <i className="tabler-x text-[22px] cursor-pointer" onClick={() => setSearch('')} />
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
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, transition: 'all 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
                    <CardActionArea component={Link} href={`/estudiante/mis-gpts/${gpt.id}`} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                      {gpt.miniatura ? (
                        <Box component="img" src={gpt.miniatura} alt={gpt.titulo} sx={{ width: '100%', height: 160, objectFit: 'cover' }} />
                      ) : (
                        <Box sx={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
                          <Bot size={56} color="rgba(255,255,255,0.5)" strokeWidth={1} />
                        </Box>
                      )}
                      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {gpt.categoria && (
                          <Chip label={gpt.categoria} size="small" sx={{ alignSelf: 'flex-start', mb: 1, fontSize: '0.65rem' }} />
                        )}
                        <Typography variant="h6" fontWeight={700} mb={1} sx={{ lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {gpt.titulo}
                        </Typography>
                        {gpt.descripcion && (
                          <Typography variant="body2" color="text.secondary" mb={2} sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {gpt.descripcion}
                          </Typography>
                        )}
                        <Stack sx={{ mt: 'auto' }} gap={1}>
                          <Typography variant="caption" color="text.secondary">
                            Adquirido el {new Date(gpt.inscrito_en).toLocaleDateString('es-PE')}
                          </Typography>
                          <Button
                            fullWidth variant="contained" size="medium" component="span"
                            endIcon={<ArrowRight size={16} />}
                            sx={{ borderRadius: 2, fontWeight: 700 }}
                          >
                            Ver mi GPT
                          </Button>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  )
}
