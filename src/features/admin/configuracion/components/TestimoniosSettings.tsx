'use client'

import { useState } from 'react'

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Stack,
  Paper,
  Grid
} from '@mui/material'
import { useSnackbar } from 'notistack'

import MediaLibrary from '../../cursos/components/MediaLibrary'

interface Testimonio {
  id: string
  name: string
  role: string
  company?: string
  quote: string
  image: string
}

interface TestimoniosSettingsProps {
  config: { [key: string]: string }
  onInputChange: (clave: string, valor: string) => void
}

const DEFAULT_TESTIMONIOS: Testimonio[] = [
  {
    id: '1',
    name: 'María Fernández',
    role: 'Gerente de RRHH',
    company: 'TechLatam',
    quote: 'Los programas de ADPH me dieron las herramientas prácticas que necesitaba para reestructurar todo nuestro departamento. Excelente nivel.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&q=80'
  },
  {
    id: '2',
    name: 'Carlos Ramírez',
    role: 'Director de Operaciones',
    company: 'ADPH Group',
    quote: 'La metodología de casos de la Escuela de Liderazgo superó mis expectativas. Pude aplicar lo aprendido desde la primera semana.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80'
  },
  {
    id: '3',
    name: 'Lucía Vargas',
    role: 'Analista de Cultura Org.',
    company: 'Consultora',
    quote: 'Destaco la calidad de los docentes. Profesionales con trayectoria real que comparten su experiencia y te guían paso a paso.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80'
  }
]

export default function TestimoniosSettings({ config, onInputChange }: TestimoniosSettingsProps) {
  const { enqueueSnackbar } = useSnackbar()
  const [openModal, setOpenModal] = useState(false)
  const [openMedia, setOpenMedia] = useState(false)
  const [editingItem, setEditingItem] = useState<Testimonio | null>(null)

  // Form states
  const [formName, setFormName] = useState('')
  const [formRole, setFormRole] = useState('')
  const [formCompany, setFormCompany] = useState('')
  const [formQuote, setFormQuote] = useState('')
  const [formImage, setFormImage] = useState('')

  const testimoniosList: Testimonio[] = (() => {
    try {
      const dataStr = config.WEB_TESTIMONIOS

      if (!dataStr) return DEFAULT_TESTIMONIOS
      
return JSON.parse(dataStr)
    } catch {
      return DEFAULT_TESTIMONIOS
    }
  })()

  const handleOpenAdd = () => {
    setEditingItem(null)
    setFormName('')
    setFormRole('')
    setFormCompany('')
    setFormQuote('')
    setFormImage('')
    setOpenModal(true)
  }

  const handleOpenEdit = (item: Testimonio) => {
    setEditingItem(item)
    setFormName(item.name)
    setFormRole(item.role)
    setFormCompany(item.company ?? '')
    setFormQuote(item.quote)
    setFormImage(item.image)
    setOpenModal(true)
  }

  const handleSave = () => {
    if (!formName.trim() || !formRole.trim() || !formQuote.trim()) {
      enqueueSnackbar('Nombre, Cargo y Comentario son obligatorios', { variant: 'warning' })
      
return
    }

    let newList: Testimonio[]

    if (editingItem) {
      // Edit
      newList = testimoniosList.map(t =>
        t.id === editingItem.id
          ? { ...t, name: formName, role: formRole, company: formCompany, quote: formQuote, image: formImage }
          : t
      )
      enqueueSnackbar('Testimonio modificado — recuerda guardar cambios generales', { variant: 'info' })
    } else {
      // Add new
      const newItem: Testimonio = {
        id: Date.now().toString(),
        name: formName,
        role: formRole,
        company: formCompany,
        quote: formQuote,
        image: formImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80'
      }

      newList = [...testimoniosList, newItem]
      enqueueSnackbar('Testimonio añadido — recuerda guardar cambios generales', { variant: 'info' })
    }

    onInputChange('WEB_TESTIMONIOS', JSON.stringify(newList))
    setOpenModal(false)
  }

  const handleDelete = (id: string) => {
    const newList = testimoniosList.filter(t => t.id !== id)

    onInputChange('WEB_TESTIMONIOS', JSON.stringify(newList))
    enqueueSnackbar('Testimonio eliminado — recuerda guardar cambios generales', { variant: 'info' })
  }

  return (
    <Stack spacing={4}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant='h6' gutterBottom>Testimonios de Alumnos</Typography>
          <Typography variant='body2' color='text.secondary'>
            Administra los testimonios de alumnos que se visualizan en la página de inicio y en la sección de consultoría.
          </Typography>
        </Box>
        <Button
          variant='contained'
          startIcon={<i className='tabler-plus' />}
          onClick={handleOpenAdd}
        >
          Agregar Testimonio
        </Button>
      </Box>

      <Grid container spacing={3}>
        {testimoniosList.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Paper variant='outlined' sx={{ p: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant='body2' sx={{ fontStyle: 'italic', mb: 2, color: 'text.secondary' }}>
                  &quot;{item.quote}&quot;
                </Typography>
              </Box>
              <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between' sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Stack direction='row' spacing={1.5} alignItems='center'>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      bgcolor: 'action.hover'
                    }}
                  >
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Box>
                    <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>{item.name}</Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {item.role}{item.company ? ` @ ${item.company}` : ''}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction='row' spacing={1}>
                  <IconButton size='small' color='primary' onClick={() => handleOpenEdit(item)}>
                    <i className='tabler-edit' style={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton size='small' color='error' onClick={() => handleDelete(item.id)}>
                    <i className='tabler-trash' style={{ fontSize: 18 }} />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* dialog for add/edit */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth='sm' fullWidth>
        <DialogTitle>{editingItem ? 'Editar Testimonio' : 'Agregar Testimonio'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label='Nombre Completo'
              fullWidth
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Cargo / Rol'
                  fullWidth
                  value={formRole}
                  placeholder='Ej: Gerente de RRHH'
                  onChange={(e) => setFormRole(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Empresa / Organización'
                  fullWidth
                  value={formCompany}
                  placeholder='Ej: TechLatam'
                  onChange={(e) => setFormCompany(e.target.value)}
                />
              </Grid>
            </Grid>
            <TextField
              label='Testimonio / Comentario'
              fullWidth
              multiline
              rows={4}
              value={formQuote}
              onChange={(e) => setFormQuote(e.target.value)}
            />

            <Box>
              <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                Foto del Alumno
              </Typography>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {formImage ? (
                    <img src={formImage} alt='Previa' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <i className='tabler-user' style={{ fontSize: 24, color: '#ccc' }} />
                  )}
                </Box>
                <Button
                  variant='outlined'
                  size='small'
                  startIcon={<i className='tabler-photo' />}
                  onClick={() => setOpenMedia(true)}
                >
                  Seleccionar Foto
                </Button>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button variant='contained' onClick={handleSave}>Aceptar</Button>
        </DialogActions>
      </Dialog>

      <MediaLibrary
        open={openMedia}
        onClose={() => setOpenMedia(false)}
        onSelect={(url) => {
          setFormImage(url)
          enqueueSnackbar('Foto seleccionada', { variant: 'success' })
        }}
        title='Seleccionar Foto del Alumno'
      />
    </Stack>
  )
}
