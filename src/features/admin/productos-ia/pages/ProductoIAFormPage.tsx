'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box, Button, Card, CardContent, Chip, Divider, FormControlLabel,
  Grid, Stack, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography, CircularProgress
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useProductoIA, useCrearProductoIA, useEditarProductoIA, useCambiarEstadoProductoIA } from '../hooks/useProductosIA'
import AppModal from '@/utils/components/AppModal'
import MediaLibrary from '@/features/admin/cursos/components/MediaLibrary'
import type { EstadoProductoIA } from '../entity/ProductoIA'

interface FormValues {
  titulo: string
  descripcion: string
  categoria: string
  url_acceso: string
  url_regalo: string
  precio: number
  precio_falso: number
  moneda: string
  es_gratis: boolean
}

const CATEGORIAS = ['Jurídico', 'Educación', 'Finanzas', 'Salud', 'Comercial', 'Marketing', 'RRHH', 'Pública', 'Tecnología', 'Otro']

interface Props {
  mode: 'create' | 'edit'
  productoId?: string
}

export default function ProductoIAFormPage({ mode, productoId }: Props) {
  const router = useRouter()
  const { data: producto, isLoading } = useProductoIA(productoId || '')
  const crear = useCrearProductoIA()
  const editar = useEditarProductoIA(productoId || '')
  const cambiarEstado = useCambiarEstadoProductoIA()

  const [miniatura, setMiniatura] = useState<string>('')
  const [mediaOpen, setMediaOpen] = useState(false)

  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: { titulo: '', descripcion: '', categoria: '', url_acceso: '', url_regalo: '', precio: 0, precio_falso: 0, moneda: 'USD', es_gratis: false }
  })
  const esGratis = watch('es_gratis')

  useEffect(() => {
    if (producto && mode === 'edit') {
      reset({
        titulo: producto.titulo,
        descripcion: producto.descripcion || '',
        categoria: producto.categoria || '',
        url_acceso: (producto as any).url_acceso || '',
        url_regalo: (producto as any).url_regalo || '',
        precio: producto.precio,
        precio_falso: producto.precio_falso || 0,
        moneda: producto.moneda,
        es_gratis: producto.es_gratis
      })
      setMiniatura(producto.miniatura || '')
    }
  }, [producto, mode, reset])

  const onSubmit = async (values: FormValues) => {
    const payload = { ...values, miniatura, precio: Number(values.precio), precio_falso: Number(values.precio_falso) || 0 }
    if (mode === 'create') {
      await (crear.mutateAsync as any)(payload)
      router.push('/admin/productos-ia')
    } else {
      await (editar.mutateAsync as any)(payload)
    }
  }

  const estadoColor: Record<EstadoProductoIA, 'default' | 'success' | 'warning'> = {
    BORRADOR: 'default', PUBLICADO: 'success', ARCHIVADO: 'warning'
  }
  const estadoSig: Record<EstadoProductoIA, { label: string; value: EstadoProductoIA }> = {
    BORRADOR: { label: 'Publicar', value: 'PUBLICADO' },
    PUBLICADO: { label: 'Archivar', value: 'ARCHIVADO' },
    ARCHIVADO: { label: 'Volver a Borrador', value: 'BORRADOR' }
  }

  if (isLoading && mode === 'edit') return <Box sx={{ p: 4, textAlign: 'center' }}><CircularProgress /></Box>

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h4" fontWeight={800}>{mode === 'create' ? 'Nuevo Producto IA' : 'Editar Producto IA'}</Typography>
          {producto && <Chip label={producto.estado} color={estadoColor[producto.estado as EstadoProductoIA]} size="small" sx={{ mt: 1 }} />}
        </Box>
        <Stack direction="row" gap={2}>
          <Button variant="outlined" onClick={() => router.push('/admin/productos-ia')}>Volver</Button>
          {mode === 'edit' && producto && (
            <Button variant="outlined" color="secondary"
              onClick={() => cambiarEstado.mutate({ id: productoId!, estado: estadoSig[producto.estado as EstadoProductoIA].value })}>
              {estadoSig[producto.estado as EstadoProductoIA].label}
            </Button>
          )}
          <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={crear.isPending || editar.isPending}>
            {crear.isPending || editar.isPending ? 'Guardando...' : 'Guardar'}
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {/* Columna principal */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} mb={2}>Información General</Typography>
              <Stack spacing={2}>
                <Controller name="titulo" control={control} rules={{ required: true }} render={({ field }) => (
                  <TextField {...field} label="Título *" fullWidth />
                )} />
                <Controller name="descripcion" control={control} render={({ field }) => (
                  <TextField {...field} label="Descripción" multiline rows={4} fullWidth />
                )} />
                <Controller name="categoria" control={control} render={({ field }) => (
                  <TextField {...field} label="Categoría" fullWidth select SelectProps={{ native: true }}>
                    <option value="">-- Seleccionar --</option>
                    {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
                  </TextField>
                )} />
                <Controller name="url_acceso" control={control} render={({ field }) => (
                  <TextField {...field} label="URL de acceso al GPT" fullWidth placeholder="https://chatgpt.com/g/..." />
                )} />
                <Controller name="url_regalo" control={control} render={({ field }) => (
                  <TextField {...field} label="URL de contenido de regalo (opcional)" fullWidth placeholder="https://drive.google.com/..." helperText="Este enlace se muestra al estudiante junto al acceso al GPT" />
                )} />
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} mb={2}>Precio</Typography>
              <Stack spacing={2}>
                <Controller name="es_gratis" control={control} render={({ field }) => (
                  <FormControlLabel control={<Switch checked={field.value} onChange={e => field.onChange(e.target.checked)} />} label="Producto gratuito" />
                )} />
                {!esGratis && (
                  <>
                    <Controller name="moneda" control={control} render={({ field }) => (
                      <ToggleButtonGroup exclusive value={field.value} onChange={(_, v) => v && field.onChange(v)} size="small">
                        <ToggleButton value="USD">USD</ToggleButton>
                        <ToggleButton value="PEN">PEN</ToggleButton>
                      </ToggleButtonGroup>
                    )} />
                    <Stack direction="row" spacing={2}>
                      <Controller name="precio" control={control} render={({ field }) => (
                        <TextField {...field} type="number" label="Precio" fullWidth inputProps={{ min: 0, step: 0.01 }} />
                      )} />
                      <Controller name="precio_falso" control={control} render={({ field }) => (
                        <TextField {...field} type="number" label="Precio tachado (opcional)" fullWidth inputProps={{ min: 0, step: 0.01 }} />
                      )} />
                    </Stack>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} mb={2}>Miniatura</Typography>
              {miniatura ? (
                <Box>
                  <Box component="img" src={miniatura} sx={{ width: '100%', borderRadius: 2, mb: 1, maxHeight: 180, objectFit: 'cover' }} />
                  <Stack direction="row" gap={1}>
                    <Button size="small" variant="outlined" fullWidth onClick={() => setMediaOpen(true)}>Cambiar</Button>
                    <Button size="small" color="error" variant="outlined" onClick={() => setMiniatura('')}>Quitar</Button>
                  </Stack>
                </Box>
              ) : (
                <Box
                  onClick={() => setMediaOpen(true)}
                  sx={{ border: '2px dashed', borderColor: 'divider', borderRadius: 2, p: 4, textAlign: 'center', cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}
                >
                  <i className="tabler-photo text-[32px] text-muted" />
                  <Typography variant="caption" display="block" mt={1} color="text.secondary">Click para seleccionar imagen</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <MediaLibrary open={mediaOpen} onClose={() => setMediaOpen(false)} onSelect={url => { setMiniatura(url); setMediaOpen(false) }} />
    </Box>
  )
}
