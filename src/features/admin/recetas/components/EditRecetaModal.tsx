'use client'

import { useState } from 'react'

import { Box, Button, Grid, IconButton, InputAdornment, Typography } from '@mui/material'
import { Formik, type FormikHelpers } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useSnackbar } from 'notistack'

import AppModal from '@/utils/components/AppModal'
import CustomTextField from '@core/components/mui/TextField'
import MediaLibrary from '@/features/admin/cursos/components/MediaLibrary'
import { crearRecetaSchema, type CrearRecetaDto } from '@/schemas/receta.schema'
import { useEditReceta, useReceta } from '../hooks/useRecetas'
import type { GrupoInsumos, SeccionProcedimiento } from '../entity/Receta'

type Props = {
  open: boolean
  handleClose: () => void
  recetaId: string | null
  onSuccess?: () => void
}

export const EditRecetaModal = ({ open, handleClose, recetaId, onSuccess }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const editMutation = useEditReceta()
  const { data: receta, isLoading } = useReceta(recetaId ?? '')
  const [openMedia, setOpenMedia] = useState(false)

  const initialValues: CrearRecetaDto = receta
    ? {
      nombre: receta.nombre,
      imagen: receta.imagen,
      descripcion: receta.descripcion,
      insumos: receta.insumos,
      procedimiento: receta.procedimiento,
      observaciones: receta.observaciones,
      esta_activo: receta.esta_activo
    }
    : {
      nombre: '',
      imagen: null,
      descripcion: null,
      insumos: [{ grupo: '', items: [{ insumo: '', cantidad: '' }] }],
      procedimiento: [{ seccion: '', pasos: [''] }],
      observaciones: null,
      esta_activo: true
    }

  const handleSubmit = async (values: CrearRecetaDto, { setSubmitting }: FormikHelpers<CrearRecetaDto>) => {
    if (!recetaId) return

    try {
      await editMutation.mutateAsync({ id: recetaId, data: values })
      enqueueSnackbar('Receta actualizada exitosamente', { variant: 'success' })
      handleClose()
      onSuccess?.()
    } catch (error: any) {
      enqueueSnackbar(error?.message || error?.error || 'Error al actualizar receta', { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  if (!open || !recetaId) return null

  if (isLoading) {
    return (
      <AppModal open={open} handleClose={handleClose}>
        <Typography>Cargando...</Typography>
      </AppModal>
    )
  }

  return (
    <AppModal open={open} handleClose={handleClose}>
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant='h4' fontWeight={600}>Editar Receta</Typography>
        <Typography variant='body2' color='text.secondary'>Modifica los datos de la receta</Typography>
      </Box>

      <Formik initialValues={initialValues} enableReinitialize validationSchema={toFormikValidationSchema(crearRecetaSchema)} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit: submit, isSubmitting, setFieldValue }) => (
          <form onSubmit={submit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CustomTextField fullWidth label='Nombre' name='nombre' value={values.nombre}
                  onChange={handleChange} onBlur={handleBlur}
                  error={touched.nombre && Boolean(errors.nombre)} helperText={touched.nombre && errors.nombre}
                  InputProps={{ startAdornment: <InputAdornment position='start'><i className='tabler-tools-kitchen-2 text-xl text-textSecondary' /></InputAdornment> }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle2' fontWeight={600} sx={{ mb: 1 }}>Imagen (Opcional)</Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  {values.imagen && (
                    <Box sx={{ position: 'relative', width: 100, height: 100, borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
                      <img src={values.imagen} alt='imagen receta' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <IconButton size='small' color='error'
                        onClick={() => setFieldValue('imagen', null)}
                        sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'rgba(255,255,255,0.85)', '&:hover': { bgcolor: 'error.main', color: 'common.white' } }}>
                        <i className='tabler-x text-sm' />
                      </IconButton>
                    </Box>
                  )}
                  <Button variant='tonal' startIcon={<i className='tabler-photo' />} onClick={() => setOpenMedia(true)}>
                    {values.imagen ? 'Cambiar imagen' : 'Seleccionar imagen'}
                  </Button>
                </Box>
                <MediaLibrary open={openMedia} onClose={() => setOpenMedia(false)} folder='recetas'
                  onSelect={url => { setFieldValue('imagen', url); setOpenMedia(false) }} />
              </Grid>

              <Grid item xs={12}>
                <CustomTextField fullWidth multiline rows={2} label='Descripción (Opcional)' name='descripcion'
                  value={values.descripcion ?? ''} onChange={e => setFieldValue('descripcion', e.target.value || null)} onBlur={handleBlur}
                />
              </Grid>

              {/* Insumos */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant='subtitle2' fontWeight={600}>Insumos</Typography>
                  <Button size='small' startIcon={<i className='tabler-plus' />}
                    onClick={() => setFieldValue('insumos', [...(values.insumos ?? []), { grupo: '', items: [{ insumo: '', cantidad: '' }] }])}>
                    Añadir grupo
                  </Button>
                </Box>
                {(values.insumos ?? []).map((grupo: GrupoInsumos, gi: number) => (
                  <Box key={gi} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                      <CustomTextField fullWidth size='small' label={`Nombre del grupo ${gi + 1}`}
                        value={grupo.grupo} onChange={e => { const g = [...values.insumos]; g[gi] = { ...g[gi], grupo: e.target.value }; setFieldValue('insumos', g) }}
                      />
                      {values.insumos.length > 1 && (
                        <IconButton size='small' color='error' onClick={() => setFieldValue('insumos', values.insumos.filter((_: GrupoInsumos, i: number) => i !== gi))}>
                          <i className='tabler-trash text-lg' />
                        </IconButton>
                      )}
                    </Box>
                    {grupo.items.map((item, ii) => (
                      <Box key={ii} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                        <CustomTextField size='small' label='Insumo' value={item.insumo} sx={{ flex: 2 }}
                          onChange={e => { const g = [...values.insumos]; g[gi].items[ii] = { ...g[gi].items[ii], insumo: e.target.value }; setFieldValue('insumos', g) }}
                        />
                        <CustomTextField size='small' label='Cantidad (kg)' value={item.cantidad} sx={{ flex: 1 }}
                          onChange={e => { const g = [...values.insumos]; g[gi].items[ii] = { ...g[gi].items[ii], cantidad: e.target.value }; setFieldValue('insumos', g) }}
                        />
                        {grupo.items.length > 1 && (
                          <IconButton size='small' color='error' onClick={() => { const g = [...values.insumos]; g[gi].items = g[gi].items.filter((_: any, i: number) => i !== ii); setFieldValue('insumos', g) }}>
                            <i className='tabler-x text-sm' />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                    <Button size='small' variant='text' startIcon={<i className='tabler-plus' />}
                      onClick={() => { const g = [...values.insumos]; g[gi].items = [...g[gi].items, { insumo: '', cantidad: '' }]; setFieldValue('insumos', g) }}>
                      Añadir insumo
                    </Button>
                  </Box>
                ))}
              </Grid>

              {/* Procedimiento */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant='subtitle2' fontWeight={600}>Procedimiento</Typography>
                  <Button size='small' startIcon={<i className='tabler-plus' />}

                    onClick={() => setFieldValue('procedimiento', [...(values.procedimiento ?? []), { seccion: '', pasos: [''] }])}>
                    Añadir sección
                  </Button>
                </Box>
                {(values.procedimiento ?? []).map((sec: SeccionProcedimiento, si: number) => (
                  <Box key={si} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                      <CustomTextField fullWidth size='small' label={`Nombre de sección ${si + 1}`}
                        value={sec.seccion} onChange={e => { const p = [...values.procedimiento]; p[si] = { ...p[si], seccion: e.target.value }; setFieldValue('procedimiento', p) }}
                      />
                      {values.procedimiento.length > 1 && (
                        <IconButton size='small' color='error' onClick={() => setFieldValue('procedimiento', values.procedimiento.filter((_: SeccionProcedimiento, i: number) => i !== si))}>
                          <i className='tabler-trash text-lg' />
                        </IconButton>
                      )}
                    </Box>
                    {sec.pasos.map((paso: string, pi: number) => (
                      <Box key={pi} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'flex-start' }}>
                        <Typography variant='caption' sx={{ pt: 1.5, minWidth: 20, color: 'text.secondary' }}>{pi + 1}.</Typography>
                        <CustomTextField fullWidth size='small' multiline label={`Paso ${pi + 1}`} value={paso}
                          onChange={e => { const p = [...values.procedimiento]; p[si].pasos[pi] = e.target.value; setFieldValue('procedimiento', p) }}
                        />
                        {sec.pasos.length > 1 && (
                          <IconButton size='small' color='error' onClick={() => { const p = [...values.procedimiento]; p[si].pasos = p[si].pasos.filter((_: string, i: number) => i !== pi); setFieldValue('procedimiento', p) }}>
                            <i className='tabler-x text-sm' />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                    <Button size='small' variant='text' startIcon={<i className='tabler-plus' />}
                      onClick={() => { const p = [...values.procedimiento]; p[si].pasos = [...p[si].pasos, '']; setFieldValue('procedimiento', p) }}>
                      Añadir paso
                    </Button>
                  </Box>
                ))}
              </Grid>

              <Grid item xs={12}>
                <CustomTextField fullWidth multiline rows={2} label='Observaciones (Opcional)' name='observaciones'
                  value={values.observaciones ?? ''} onChange={e => setFieldValue('observaciones', e.target.value || null)} onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                  <Button variant='tonal' color='secondary' onClick={handleClose} disabled={isSubmitting} sx={{ px: 4 }}>Cancelar</Button>
                  <Button variant='contained' type='submit' disabled={isSubmitting} sx={{ px: 4 }} startIcon={<i className='tabler-device-floppy' />}>
                    {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </AppModal>
  )
}
