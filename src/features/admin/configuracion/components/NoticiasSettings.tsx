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
  Grid,
  Chip
} from '@mui/material'
import { useSnackbar } from 'notistack'
import MediaLibrary from '../../cursos/components/MediaLibrary'

interface Noticia {
  id: string
  tag: string
  title: string
  date: string
  image: string
  url?: string
  enlaceExterno?: string
  imagenesSecundarias?: string[]
}

interface NoticiasSettingsProps {
  config: { [key: string]: string }
  onInputChange: (clave: string, valor: string) => void
}

const DEFAULT_NOTICIAS: Noticia[] = [
  {
    id: '1',
    tag: 'TENDENCIAS',
    title: 'ADPH Group presenta el estudio de Clima Laboral 2026',
    date: 'Julio 05, 2026',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    url: '/blog'
  },
  {
    id: '2',
    tag: 'INNOVACIÓN',
    title: 'Nuevas metodologías experienciales en alianza internacional',
    date: 'Junio 28, 2026',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
    url: '/blog'
  }
]

export default function NoticiasSettings({ config, onInputChange }: NoticiasSettingsProps) {
  const { enqueueSnackbar } = useSnackbar()
  const [openModal, setOpenModal] = useState(false)
  const [openMedia, setOpenMedia] = useState(false)
  const [editingItem, setEditingItem] = useState<Noticia | null>(null)

  // Form states
  const [formTag, setFormTag] = useState('')
  const [formTitle, setFormTitle] = useState('')
  const [formDate, setFormDate] = useState('')
  const [formImage, setFormImage] = useState('')
  const [formUrl, setFormUrl] = useState('')
  const [formEnlaceExterno, setFormEnlaceExterno] = useState('')
  const [formImagenesSecundarias, setFormImagenesSecundarias] = useState<string[]>([])
  const [mediaTarget, setMediaTarget] = useState<'main' | { index: number } | 'new_secondary'>('main')

  const noticiasList: Noticia[] = (() => {
    try {
      const dataStr = config.WEB_NOTICIAS
      if (!dataStr) return DEFAULT_NOTICIAS
      return JSON.parse(dataStr)
    } catch {
      return DEFAULT_NOTICIAS
    }
  })()

  const handleOpenAdd = () => {
    setEditingItem(null)
    setFormTag('TENDENCIAS')
    setFormTitle('')
    const today = new Date()
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' }
    const formattedDate = today.toLocaleDateString('es-ES', options)
    setFormDate(formattedDate)
    setFormImage('')
    setFormUrl('/blog')
    setFormEnlaceExterno('')
    setFormImagenesSecundarias([])
    setOpenModal(true)
  }

  const handleOpenEdit = (item: Noticia) => {
    setEditingItem(item)
    setFormTag(item.tag)
    setFormTitle(item.title)
    setFormDate(item.date)
    setFormImage(item.image)
    setFormUrl(item.url ?? '/blog')
    setFormEnlaceExterno(item.enlaceExterno || '')
    setFormImagenesSecundarias(item.imagenesSecundarias || [])
    setOpenModal(true)
  }

  const handleSave = () => {
    if (!formTitle.trim() || !formTag.trim() || !formDate.trim()) {
      enqueueSnackbar('Título, Categoría/Etiqueta y Fecha son obligatorios', { variant: 'warning' })
      return
    }

    let newList: Noticia[]
    if (editingItem) {
      // Edit
      newList = noticiasList.map(n =>
        n.id === editingItem.id
          ? {
              ...n,
              tag: formTag.toUpperCase(),
              title: formTitle,
              date: formDate,
              image: formImage,
              url: formUrl,
              enlaceExterno: formEnlaceExterno,
              imagenesSecundarias: formImagenesSecundarias
            }
          : n
      )
      enqueueSnackbar('Noticia modificada — recuerda guardar cambios generales', { variant: 'info' })
    } else {
      // Add new
      const newItem: Noticia = {
        id: Date.now().toString(),
        tag: formTag.toUpperCase(),
        title: formTitle,
        date: formDate,
        image: formImage || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
        url: formUrl || '/blog',
        enlaceExterno: formEnlaceExterno,
        imagenesSecundarias: formImagenesSecundarias
      }
      newList = [...noticiasList, newItem]
      enqueueSnackbar('Noticia añadida — recuerda guardar cambios generales', { variant: 'info' })
    }

    onInputChange('WEB_NOTICIAS', JSON.stringify(newList))
    setOpenModal(false)
  }

  const handleDelete = (id: string) => {
    const newList = noticiasList.filter(n => n.id !== id)
    onInputChange('WEB_NOTICIAS', JSON.stringify(newList))
    enqueueSnackbar('Noticia eliminada — recuerda guardar cambios generales', { variant: 'info' })
  }

  return (
    <Stack spacing={4}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant='h6' gutterBottom>Noticias Destacadas</Typography>
          <Typography variant='body2' color='text.secondary'>
            Administra las noticias destacadas que se visualizan en la sección inferior de la página de inicio pública.
          </Typography>
        </Box>
        <Button
          variant='contained'
          startIcon={<i className='tabler-plus' />}
          onClick={handleOpenAdd}
        >
          Agregar Noticia
        </Button>
      </Box>

      <Grid container spacing={3}>
        {noticiasList.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Paper variant='outlined' sx={{ p: 3, borderRadius: 2, height: '100%' }}>
              <Grid container spacing={2} alignItems='center' sx={{ height: '100%' }}>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      width: '100%',
                      aspectRatio: '16/10',
                      borderRadius: 1,
                      overflow: 'hidden',
                      bgcolor: 'action.hover',
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <Box>
                    <Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }} flexWrap='wrap' gap={0.5}>
                      <Chip label={item.tag} size='small' color='secondary' variant='tonal' />
                      <Typography variant='caption' color='text.secondary'>{item.date}</Typography>
                      {item.enlaceExterno && (
                        <Chip
                          icon={<i className='tabler-link' style={{ fontSize: 11 }} />}
                          label='Externo'
                          size='small'
                          color='success'
                          variant='outlined'
                          sx={{ height: 18, fontSize: 9, px: 0.5 }}
                        />
                      )}
                      {item.imagenesSecundarias && item.imagenesSecundarias.length > 0 && (
                        <Chip
                          icon={<i className='tabler-photo-copy' style={{ fontSize: 11 }} />}
                          label={`${item.imagenesSecundarias.length} fotos`}
                          size='small'
                          color='info'
                          variant='outlined'
                          sx={{ height: 18, fontSize: 9, px: 0.5 }}
                        />
                      )}
                    </Stack>
                    <Typography variant='subtitle2' sx={{ fontWeight: 700, mb: 1, lineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.title}
                    </Typography>
                    {item.url && (
                      <Typography variant='caption' color='primary' sx={{ display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        Enlace: {item.url}
                      </Typography>
                    )}
                  </Box>
                  <Stack direction='row' spacing={1} justifyContent='flex-end' sx={{ mt: 2 }}>
                    <IconButton size='small' color='primary' onClick={() => handleOpenEdit(item)}>
                      <i className='tabler-edit' style={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton size='small' color='error' onClick={() => handleDelete(item.id)}>
                      <i className='tabler-trash' style={{ fontSize: 18 }} />
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* dialog for add/edit */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth='sm' fullWidth>
        <DialogTitle>{editingItem ? 'Editar Noticia' : 'Agregar Noticia'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label='Categoría / Etiqueta'
              fullWidth
              value={formTag}
              placeholder='Ej: TENDENCIAS, INNOVACIÓN'
              onChange={(e) => setFormTag(e.target.value)}
            />
            <TextField
              label='Título de la Noticia'
              fullWidth
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
            <TextField
              label='Fecha / Mes de Publicación'
              fullWidth
              value={formDate}
              placeholder='Ej: Julio 05, 2026'
              onChange={(e) => setFormDate(e.target.value)}
            />
            <TextField
              label='Enlace / URL de Destino'
              fullWidth
              value={formUrl}
              placeholder='Ej: /blog o https://...'
              onChange={(e) => setFormUrl(e.target.value)}
              helperText='Dirección web a la que redirigirá al hacer clic.'
            />
            <TextField
              label='Enlace Externo (LinkedIn, Facebook, etc.)'
              fullWidth
              value={formEnlaceExterno}
              placeholder='Ej: https://linkedin.com/posts/...'
              onChange={(e) => setFormEnlaceExterno(e.target.value)}
              helperText='Redirige a una publicación externa al hacer clic (opcional)'
            />

            <Box>
              <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                Imagen de Portada
              </Typography>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Box
                  sx={{
                    width: 120,
                    aspectRatio: '16/10',
                    borderRadius: 1,
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
                    <Typography variant='caption' color='text.disabled'>Sin portada</Typography>
                  )}
                </Box>
                <Button
                  variant='outlined'
                  size='small'
                  startIcon={<i className='tabler-photo' />}
                  onClick={() => {
                    setMediaTarget('main')
                    setOpenMedia(true)
                  }}
                >
                  Seleccionar Portada
                </Button>
              </Stack>
            </Box>

            <Box>
              <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                Galería de Imágenes Secundarias
              </Typography>
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {formImagenesSecundarias.map((url, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 64,
                        height: 40,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <img src={url} alt={`Secundaria ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <IconButton
                        size='small'
                        color='error'
                        onClick={() => {
                          setFormImagenesSecundarias(prev => prev.filter((_, i) => i !== index))
                        }}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: 'rgba(255,255,255,0.85)',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' },
                          p: 0.2
                        }}
                      >
                        <i className='tabler-x' style={{ fontSize: 10 }} />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    variant='outlined'
                    sx={{ width: 64, height: 40, borderStyle: 'dashed', borderRadius: 1 }}
                    onClick={() => {
                      setMediaTarget('new_secondary')
                      setOpenMedia(true)
                    }}
                  >
                    <i className='tabler-plus' style={{ fontSize: 14 }} />
                  </Button>
                </Box>
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
          if (mediaTarget === 'main') {
            setFormImage(url)
            enqueueSnackbar('Portada seleccionada', { variant: 'success' })
          } else if (mediaTarget === 'new_secondary') {
            setFormImagenesSecundarias(prev => [...prev, url])
            enqueueSnackbar('Imagen secundaria añadida', { variant: 'success' })
          } else {
            const idx = mediaTarget.index
            setFormImagenesSecundarias(prev => prev.map((item, i) => i === idx ? url : item))
            enqueueSnackbar('Imagen secundaria actualizada', { variant: 'success' })
          }
          setOpenMedia(false)
        }}
        title='Seleccionar Imagen'
        acceptType='IMAGEN'
      />
    </Stack>
  )
}
