'use client'

import {
  Box,
  Button,
  Grid,
  Typography,
  Autocomplete,
  InputAdornment
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSnackbar } from 'notistack'

import AppModal from '@/utils/components/AppModal'
import CustomTextField from '@core/components/mui/TextField'
import { crearCertificadoManualSchema, type CrearCertificadoManualDto } from '@/schemas/certificado.schema'
import { useCreateCertificadoManual } from '../hooks/useCertificados'
import { useUsuariosLista } from '@/features/admin/usuarios/hooks/useUsuarios'
import { useCursosLista } from '@/features/admin/cursos/hooks/useCursos'

type CreateCertificadoModalProps = {
  open: boolean
  handleClose: () => void
  onSuccess?: () => void
}

const defaultValues: CrearCertificadoManualDto = {
  usuario_id: '',
  curso_id: '',
  fecha_emision: '',
  fecha_inicio_curso: '',
  fecha_culminacion: '',
  nota_final: undefined,
  duracion: ''
}

const CreateCertificadoModal = ({ open, handleClose, onSuccess }: CreateCertificadoModalProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const createMutation = useCreateCertificadoManual()

  const { data: estudiantes = [], isLoading: isLoadingEstudiantes } = useUsuariosLista({
    rol: 'ESTUDIANTE',
    esta_activo: 'true'
  })

  const { data: cursosData = [], isLoading: isLoadingCursos } = useCursosLista()
  const cursos = cursosData.filter(c => c.estado === 'PUBLICADO')

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CrearCertificadoManualDto>({
    resolver: zodResolver(crearCertificadoManualSchema) as any,
    defaultValues
  })

  const handleModalClose = () => {
    reset(defaultValues)
    handleClose()
  }

  const onSubmit = async (data: CrearCertificadoManualDto) => {
    try {
      await createMutation.mutateAsync(data)
      enqueueSnackbar('Certificado creado exitosamente', { variant: 'success' })
      reset(defaultValues)
      handleClose()
      onSuccess?.()
    } catch (error: any) {
      enqueueSnackbar(error?.message || 'Error al crear el certificado', { variant: 'error' })
    }
  }

  return (
    <AppModal open={open} handleClose={handleModalClose}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant='h4' sx={{ mb: 1, fontWeight: 600 }}>
          Crear Certificado Manual
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Emite un certificado sin requerir inscripción ni progreso previos en la plataforma.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='overline' color='text.disabled' sx={{ mb: 1, display: 'block' }}>
              Datos Obligatorios
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='usuario_id'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  fullWidth
                  options={estudiantes}
                  getOptionLabel={(option) => `${option.nombre} ${option.apellido} (${option.correo})`}
                  loading={isLoadingEstudiantes}
                  value={estudiantes.find(u => u.id === value) || null}
                  onChange={(_, newValue) => onChange(newValue?.id || '')}
                  isOptionEqualToValue={(option, val) => option.id === val.id}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      label='Estudiante'
                      placeholder='Busca por nombre o correo'
                      error={!!errors.usuario_id}
                      helperText={errors.usuario_id?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='curso_id'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  fullWidth
                  options={cursos}
                  getOptionLabel={(option) => option.titulo}
                  loading={isLoadingCursos}
                  value={cursos.find(c => c.id === value) || null}
                  onChange={(_, newValue) => onChange(newValue?.id || '')}
                  isOptionEqualToValue={(option, val) => option.id === val.id}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      label='Curso'
                      placeholder='Busca cursos publicados'
                      error={!!errors.curso_id}
                      helperText={errors.curso_id?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant='overline' color='text.disabled' sx={{ mb: 1, display: 'block' }}>
              Datos Opcionales
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name='fecha_emision'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  type='date'
                  label='Fecha de Emisión'
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.fecha_emision}
                  helperText={errors.fecha_emision?.message || 'Si se deja en blanco, se usa la fecha actual'}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name='fecha_inicio_curso'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  type='date'
                  label='Fecha de Inicio del Curso'
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.fecha_inicio_curso}
                  helperText={errors.fecha_inicio_curso?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name='fecha_culminacion'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  type='date'
                  label='Fecha de Culminación'
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.fecha_culminacion}
                  helperText={errors.fecha_culminacion?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='nota_final'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value ?? ''}
                  fullWidth
                  type='number'
                  label='Nota Final'
                  placeholder='Ej: 18'
                  error={!!errors.nota_final}
                  helperText={errors.nota_final?.message}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'><i className='tabler-star text-xl text-textSecondary' /></InputAdornment>
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='duracion'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  label='Duración del Curso'
                  placeholder='Ej: 12 horas'
                  error={!!errors.duracion}
                  helperText={errors.duracion?.message}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'><i className='tabler-clock text-xl text-textSecondary' /></InputAdornment>
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 5 }}>
          <Button
            variant='tonal'
            color='secondary'
            onClick={handleModalClose}
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
            startIcon={<i className='tabler-certificate' />}
          >
            {isSubmitting ? 'Creando...' : 'Crear Certificado'}
          </Button>
        </Box>
      </form>
    </AppModal>
  )
}

export default CreateCertificadoModal
