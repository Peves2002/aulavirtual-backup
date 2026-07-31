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
import RichTextEditor from '@/utils/components/RichTextEditor'

interface Blog {
  id: string
  title: string
  category: string
  readTime: string
  date: string
  desc: string
  image: string
  author: string
  role: string
  tags: string[]
  contentHtml?: string
  enlaceExterno?: string
  imagenesSecundarias?: string[]
}

interface BlogsSettingsProps {
  config: { [key: string]: string }
  onInputChange: (clave: string, valor: string) => void
}

const DEFAULT_BLOGS: Blog[] = [
  {
    id: 'tendencias-seleccion-2026',
    title: 'Tendencias en Selección y Reclutamiento de Personal para el 2026',
    category: 'Reclutamiento & ATS',
    readTime: '5 min lectura',
    date: '15 de Mayo, 2026',
    desc: 'Descubre cómo la inteligencia artificial predictiva y los embudos automatizados están redefiniendo la captación del talento idóneo.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    author: 'Mag. Roberto Castillo',
    role: 'Director de Gestión Humana',
    tags: ['Reclutamiento', 'Inteligencia Artificial', 'ATS']
  },
  {
    id: 'importancia-clima-laboral',
    title: 'El Impacto Real del Clima Laboral en la Retención del Talento',
    category: 'Clima Organizacional',
    readTime: '7 min lectura',
    date: '28 de Abril, 2026',
    desc: 'Métricas y estrategias clave para medir la satisfacción de tus colaboradores y reducir la rotación no deseada de forma medible.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    author: 'Mag. Sofía Luna',
    role: 'Consultora de Clima & Cultura',
    tags: ['Clima Laboral', 'Cultura', 'Felicidad Laboral']
  },
  {
    id: 'evaluacion-psicosocial-sunafil',
    title: 'Guía Completa para el Monitoreo de Factores de Riesgo Psicosocial',
    category: 'Salud Ocupacional',
    readTime: '10 min lectura',
    date: '10 de Abril, 2026',
    desc: 'Cumplimiento legal y metodología paso a paso para la evaluación psicosocial según las normativas vigentes de fiscalización en la región.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    author: 'Dr. Alberto Varela',
    role: 'Auditor ISO 45001',
    tags: ['Salud Ocupacional', 'Riesgos Psicosociales', 'Normativa']
  }
]

export default function BlogsSettings({ config, onInputChange }: BlogsSettingsProps) {
  const { enqueueSnackbar } = useSnackbar()
  const [openModal, setOpenModal] = useState(false)
  const [openMedia, setOpenMedia] = useState(false)
  const [editingItem, setEditingItem] = useState<Blog | null>(null)

  // Form states
  const [formTitle, setFormTitle] = useState('')
  const [formCategory, setFormCategory] = useState('')
  const [formReadTime, setFormReadTime] = useState('')
  const [formDate, setFormDate] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formImage, setFormImage] = useState('')
  const [formAuthor, setFormAuthor] = useState('')
  const [formRole, setFormRole] = useState('')
  const [formTagsInput, setFormTagsInput] = useState('')
  const [formEnlaceExterno, setFormEnlaceExterno] = useState('')
  const [formImagenesSecundarias, setFormImagenesSecundarias] = useState<string[]>([])
  const [formContentHtml, setFormContentHtml] = useState('')
  const [mediaTarget, setMediaTarget] = useState<'main' | { index: number } | 'new_secondary'>('main')

  const blogsList: Blog[] = (() => {
    try {
      const dataStr = config.WEB_BLOGS
      if (!dataStr) return DEFAULT_BLOGS
      return JSON.parse(dataStr)
    } catch {
      return DEFAULT_BLOGS
    }
  })()

  const handleOpenAdd = () => {
    setEditingItem(null)
    setFormTitle('')
    setFormCategory('')
    setFormReadTime('5 min lectura')
    // Get formatted current date in Spanish like "08 de Julio, 2026"
    const today = new Date()
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' }
    const formattedDate = today.toLocaleDateString('es-ES', options).replace(/ de /g, ' de ')
    // capitalize month
    const words = formattedDate.split(' ')
    if (words.length > 2) {
      words[2] = words[2].charAt(0).toUpperCase() + words[2].slice(1)
    }
    setFormDate(words.join(' '))

    setFormDesc('')
    setFormImage('')
    setFormAuthor('Académico ADPH')
    setFormRole('Consultor Senior')
    setFormTagsInput('')
    setFormEnlaceExterno('')
    setFormImagenesSecundarias([])
    setFormContentHtml('')
    setOpenModal(true)
  }

  const handleOpenEdit = (item: Blog) => {
    setEditingItem(item)
    setFormTitle(item.title)
    setFormCategory(item.category)
    setFormReadTime(item.readTime)
    setFormDate(item.date)
    setFormDesc(item.desc)
    setFormImage(item.image)
    setFormAuthor(item.author)
    setFormRole(item.role)
    setFormTagsInput((item.tags || []).join(', '))
    setFormEnlaceExterno(item.enlaceExterno || '')
    setFormImagenesSecundarias(item.imagenesSecundarias || [])
    setFormContentHtml(item.contentHtml || '')
    setOpenModal(true)
  }

  const handleSave = () => {
    if (!formTitle.trim() || !formCategory.trim() || !formDesc.trim() || !formAuthor.trim()) {
      enqueueSnackbar('Título, Categoría, Descripción y Autor son obligatorios', { variant: 'warning' })
      return
    }

    const parsedTags = formTagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)

    let newList: Blog[]
    if (editingItem) {
      // Edit
      newList = blogsList.map(b =>
        b.id === editingItem.id
          ? {
              ...b,
              title: formTitle,
              category: formCategory,
              readTime: formReadTime,
              date: formDate,
              desc: formDesc,
              image: formImage,
              author: formAuthor,
              role: formRole,
              tags: parsedTags,
              enlaceExterno: formEnlaceExterno,
              imagenesSecundarias: formImagenesSecundarias,
              contentHtml: formContentHtml
            }
          : b
      )
      enqueueSnackbar('Artículo de blog modificado — recuerda guardar cambios generales', { variant: 'info' })
    } else {
      // Add new
      const generatedId = formTitle
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')

      const newItem: Blog = {
        id: generatedId || Date.now().toString(),
        title: formTitle,
        category: formCategory,
        readTime: formReadTime,
        date: formDate,
        desc: formDesc,
        image: formImage || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
        author: formAuthor,
        role: formRole,
        tags: parsedTags,
        enlaceExterno: formEnlaceExterno,
        imagenesSecundarias: formImagenesSecundarias,
        contentHtml: formContentHtml
      }
      newList = [...blogsList, newItem]
      enqueueSnackbar('Artículo de blog añadido — recuerda guardar cambios generales', { variant: 'info' })
    }

    onInputChange('WEB_BLOGS', JSON.stringify(newList))
    setOpenModal(false)
  }

  const handleDelete = (id: string) => {
    const newList = blogsList.filter(b => b.id !== id)
    onInputChange('WEB_BLOGS', JSON.stringify(newList))
    enqueueSnackbar('Artículo de blog eliminado — recuerda guardar cambios generales', { variant: 'info' })
  }

  return (
    <Stack spacing={4}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant='h6' gutterBottom>Artículos de Blog</Typography>
          <Typography variant='body2' color='text.secondary'>
            Administra los artículos de blog con etiquetas que se muestran en el portal principal y la sección de artículos.
          </Typography>
        </Box>
        <Button
          variant='contained'
          startIcon={<i className='tabler-plus' />}
          onClick={handleOpenAdd}
        >
          Agregar Artículo
        </Button>
      </Box>

      <Grid container spacing={3}>
        {blogsList.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Paper variant='outlined' sx={{ p: 3, borderRadius: 2 }}>
              <Grid container spacing={3} alignItems='center'>
                <Grid item xs={12} md={3}>
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
                <Grid item xs={12} md={7}>
                  <Stack spacing={1.5}>
                    <Stack direction='row' spacing={1} alignItems='center' flexWrap='wrap' gap={1}>
                      <Chip label={item.category} size='small' color='primary' variant='tonal' />
                      <Typography variant='caption' color='text.secondary'>
                        {item.date} · {item.readTime}
                      </Typography>
                      {item.enlaceExterno && (
                        <Chip
                          icon={<i className='tabler-link' style={{ fontSize: 13 }} />}
                          label='Enlace Externo'
                          size='small'
                          color='success'
                          variant='outlined'
                          sx={{ height: 22 }}
                        />
                      )}
                      {item.imagenesSecundarias && item.imagenesSecundarias.length > 0 && (
                        <Chip
                          icon={<i className='tabler-photo-copy' style={{ fontSize: 13 }} />}
                          label={`Galería: ${item.imagenesSecundarias.length} fotos`}
                          size='small'
                          color='info'
                          variant='outlined'
                          sx={{ height: 22 }}
                        />
                      )}
                    </Stack>
                    <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                      {item.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary' sx={{ lineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.desc}
                    </Typography>
                    <Typography variant='caption' color='text.secondary' sx={{ fontWeight: 500 }}>
                      Por: {item.author} ({item.role})
                    </Typography>
                    {item.tags && item.tags.length > 0 && (
                      <Stack direction='row' spacing={1} flexWrap='wrap' gap={0.5} sx={{ pt: 0.5 }}>
                        {item.tags.map((tag, idx) => (
                          <Chip key={idx} label={tag} size='small' variant='outlined' sx={{ height: 20, fontSize: 10 }} />
                        ))}
                      </Stack>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={2} sx={{ textAlign: { md: 'right' } }}>
                  <Stack direction='row' spacing={1} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                    <Button
                      variant='outlined'
                      size='small'
                      startIcon={<i className='tabler-edit' />}
                      onClick={() => handleOpenEdit(item)}
                    >
                      Editar
                    </Button>
                    <IconButton color='error' size='small' onClick={() => handleDelete(item.id)}>
                      <i className='tabler-trash' style={{ fontSize: 18 }} />
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* modal dialog for add/edit */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth='md' fullWidth>
        <DialogTitle>{editingItem ? 'Editar Artículo de Blog' : 'Agregar Artículo de Blog'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                label='Título del Artículo'
                fullWidth
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label='Categoría / Tema'
                fullWidth
                value={formCategory}
                placeholder='Ej: Clima Organizacional'
                onChange={(e) => setFormCategory(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label='Tiempo de Lectura'
                fullWidth
                value={formReadTime}
                placeholder='Ej: 5 min lectura'
                onChange={(e) => setFormReadTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label='Fecha de Publicación'
                fullWidth
                value={formDate}
                placeholder='Ej: 15 de Mayo, 2026'
                onChange={(e) => setFormDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label='Autor'
                fullWidth
                value={formAuthor}
                placeholder='Ej: Mag. Sofía Luna'
                onChange={(e) => setFormAuthor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label='Cargo / Rol del Autor'
                fullWidth
                value={formRole}
                placeholder='Ej: Consultor de Clima & Cultura'
                onChange={(e) => setFormRole(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Enlace Externo (LinkedIn, Facebook, etc.)'
                fullWidth
                value={formEnlaceExterno}
                placeholder='Ej: https://linkedin.com/posts/...'
                onChange={(e) => setFormEnlaceExterno(e.target.value)}
                helperText='Redirige a una publicación externa al hacer clic (opcional)'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Etiquetas / Tags (separados por comas)'
                fullWidth
                value={formTagsInput}
                placeholder='Ej: Clima Laboral, Cultura, Felicidad Laboral'
                onChange={(e) => setFormTagsInput(e.target.value)}
                helperText='Escribe las etiquetas separadas por comas.'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Resumen / Descripción corta'
                fullWidth
                multiline
                rows={3}
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <RichTextEditor
                label='Contenido Completo (HTML/Rich Text)'
                value={formContentHtml}
                onChange={(value) => setFormContentHtml(value)}
                placeholder='Escribe el contenido completo aquí. Usa subtítulos, negritas y listas para organizar tu artículo.'
                minHeight={250}
              />
            </Grid>
            
            {/* Portada */}
            <Grid item xs={12} md={6}>
              <Typography variant='subtitle2' sx={{ mb: 1.5 }}>
                Imagen de Portada
              </Typography>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Box
                  sx={{
                    width: 140,
                    height: 84,
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
                  Seleccionar
                </Button>
              </Stack>
            </Grid>

            {/* Galería Secundaria */}
            <Grid item xs={12} md={6}>
              <Typography variant='subtitle2' sx={{ mb: 1.5 }}>
                Galería de Imágenes Secundarias
              </Typography>
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {formImagenesSecundarias.map((url, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 70,
                        height: 48,
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
                    sx={{ width: 70, height: 48, borderStyle: 'dashed', borderRadius: 1 }}
                    onClick={() => {
                      setMediaTarget('new_secondary')
                      setOpenMedia(true)
                    }}
                  >
                    <i className='tabler-plus' style={{ fontSize: 16 }} />
                  </Button>
                </Box>
                <Typography variant='caption' color='text.secondary'>
                  Añade fotos secundarias para mostrarlas en un carrusel dentro del detalle de la publicación.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
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
            enqueueSnackbar('Imagen de portada seleccionada', { variant: 'success' })
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
