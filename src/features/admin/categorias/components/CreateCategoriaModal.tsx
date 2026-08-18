'use client'


import { useState } from 'react'

import { Box, Button, Grid, styled, Typography, InputAdornment, IconButton } from '@mui/material'
import { Formik, type FormikHelpers } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useSnackbar } from 'notistack'

import AppModal from '@/utils/components/AppModal'
import CustomTextField from '@core/components/mui/TextField'
import { crearCategoriaSchema, type CrearCategoriaDto } from '@/schemas/categoria.schema'
import { useCreateCategoria } from '../hooks/useCategorias'
import MediaLibrary from '@/features/admin/cursos/components/MediaLibrary'
import CourseThumbnail from '@/utils/components/CourseThumbnail'

type CreateCategoriaModalProps = {
  open: boolean
  handleClose: () => void
  onSuccess?: () => void
}

const FormWrapper = styled(Box)(() => ({
  padding: '16px 0'
}))

export const CreateCategoriaModal = ({ open, handleClose, onSuccess }: CreateCategoriaModalProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const createCategoriaMutation = useCreateCategoria()
  const [openMedia, setOpenMedia] = useState(false)

  const initialValues: CrearCategoriaDto = {
    nombre: '',
    descripcion: '',
    icono: ''
  }

  const handleSubmit = async (values: CrearCategoriaDto, { setSubmitting, resetForm }: FormikHelpers<CrearCategoriaDto>) => {
    try {
      await createCategoriaMutation.mutateAsync(values)

      enqueueSnackbar('Categoría creada exitosamente', { variant: 'success' })
      resetForm()
      handleClose()
      onSuccess?.()
    } catch (error: any) {
      const errorMessage = error?.message || error?.error || 'Error al crear categoría'

      enqueueSnackbar(errorMessage, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AppModal open={open} handleClose={handleClose}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant='h4' sx={{ mb: 1, fontWeight: 600 }}>
          Nueva Categoría
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Crea una nueva categoría padre para organizar los cursos.
        </Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(crearCategoriaSchema)}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <FormWrapper>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant='overline' color='text.disabled' sx={{ mb: 1, display: 'block' }}>
                    Información General
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Nombre de la Categoría'
                    name='nombre'
                    placeholder='Ej: Desarrollo Web'
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.nombre && Boolean(errors.nombre)}
                    helperText={touched.nombre && errors.nombre}
                    disabled={isSubmitting}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <i className='tabler-category text-xl text-textSecondary' />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Orden (Posición)'
                    name='orden'
                    type='number'
                    placeholder='Ej: 1'
                    value={values.orden ?? ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.orden && Boolean(errors.orden)}
                    helperText={(touched.orden && errors.orden) || 'Deja vacío para agregar al final'}
                    disabled={isSubmitting}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <i className='tabler-sort-ascending-numbers text-xl text-textSecondary' />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    multiline
                    rows={3}
                    label='Descripción (Opcional)'
                    name='descripcion'
                    placeholder='Describe brevemente de qué trata esta categoría...'
                    value={values.descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.descripcion && Boolean(errors.descripcion)}
                    helperText={touched.descripcion && errors.descripcion}
                    disabled={isSubmitting}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start' sx={{ alignSelf: 'flex-start' }}>
                          <i className='tabler-file-description text-xl text-textSecondary' style={{ marginTop: '22px' }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='overline' color='text.disabled' sx={{ mb: 1, display: 'block' }}>
                    Icono de la Categoría
                  </Typography>
                  {values.icono ? (
                    <Box sx={{ position: 'relative', width: '100%', borderRadius: 2, overflow: 'hidden', mb: 2, bgcolor: '#f4f4f4', border: '1px solid', borderColor: 'divider', aspectRatio: '16/9' }}>
                      <CourseThumbnail
                        src={values.icono}
                        title='Vista previa'
                        variant='simple'
                      />
                      <Box sx={{ position: 'absolute', top: 4, right: 4, zIndex: 2 }}>
                        <IconButton
                          size='small'
                          sx={{ bgcolor: 'background.paper', boxShadow: 1, '&:hover': { bgcolor: 'error.main', color: 'common.white' } }}
                          onClick={() => handleChange({ target: { name: 'icono', value: '' } })}
                        >
                          <i className='tabler-trash text-sm' />
                        </IconButton>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      onClick={() => setOpenMedia(true)}
                      sx={{
                        width: '100%',
                        height: 120,
                        borderRadius: 2,
                        border: '1px dashed',
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        bgcolor: 'action.hover',
                        mb: 2,
                        '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.lightOpacity' }
                      }}
                    >
                      <i className='tabler-photo-plus text-2xl text-textDisabled' />
                      <Typography variant='caption' color='text.secondary' sx={{ mt: 1 }}>Click para seleccionar</Typography>
                    </Box>
                  )}

                  <Button
                    variant='outlined'
                    size='small'
                    fullWidth
                    startIcon={<i className='tabler-photo' />}
                    onClick={() => setOpenMedia(true)}
                  >
                    {values.icono ? 'Cambiar Icono' : 'Seleccionar Icono'}
                  </Button>

                  <MediaLibrary
                    open={openMedia}
                    onClose={() => setOpenMedia(false)}
                    onSelect={(url) => {
                      handleChange({ target: { name: 'icono', value: url } })
                    }}
                  />
                  {touched.icono && errors.icono && (
                    <Typography variant='caption' color='error' sx={{ display: 'block', mt: 1 }}>
                      {errors.icono}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 5 }}>
                <Button
                  variant='tonal'
                  color='secondary'
                  onClick={handleClose}
                  disabled={isSubmitting}
                  sx={{ px: 4 }}
                >
                  Cancelar
                </Button>
                <Button
                  variant='contained'
                  type='submit'
                  disabled={isSubmitting}
                  sx={{ px: 4 }}
                  startIcon={<i className='tabler-plus' />}
                >
                  {isSubmitting ? 'Creando...' : 'Crear Categoría'}
                </Button>
              </Box>
            </FormWrapper>
          </form>
        )}
      </Formik>
    </AppModal>
  )
}

