'use client'

import { useState, useRef } from 'react'

import { useRouter } from 'next/navigation'

import {
  Card,
  CardHeader,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
  Box
} from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'

import CustomTextField from '@/@core/components/mui/TextField'

interface Slide {
  id: string
  titulo: string
  subtitulo: string | null
  imagen_url: string
  boton_texto: string
  boton_url: string
  orden: number
  esta_activo: boolean
}

interface CarrouselClientPageProps {
  initialSlides: Slide[]
}

export default function CarrouselClientPage({ initialSlides }: CarrouselClientPageProps) {
  const router = useRouter()
  const [slides, setSlides] = useState<Slide[]>(initialSlides)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null)
  
  // Confirmation states
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [slideToDelete, setSlideToDelete] = useState<string | null>(null)

  // Uploading states
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form states
  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    imagen_url: '',
    boton_texto: 'Más información',
    boton_url: '',
    orden: 0,
    esta_activo: true
  })

  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleOpenAdd = () => {
    setEditingSlide(null)
    setFormData({
      titulo: '',
      subtitulo: '',
      imagen_url: '',
      boton_texto: 'Más información',
      boton_url: '',
      orden: slides.length,
      esta_activo: true
    })
    setOpenDialog(true)
  }

  const handleOpenEdit = (slide: Slide) => {
    setEditingSlide(slide)
    setFormData({
      titulo: slide.titulo,
      subtitulo: slide.subtitulo || '',
      imagen_url: slide.imagen_url,
      boton_texto: slide.boton_texto,
      boton_url: slide.boton_url,
      orden: slide.orden,
      esta_activo: slide.esta_activo
    })
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingSlide(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  // Handle image upload using /api/media
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      
      setUploading(true)
      const mediaData = new FormData()
      
      mediaData.append('file', file)

      try {
        const res = await axios.post('/api/media', mediaData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })

        if (res.data.status) {
          setFormData(prev => ({
            ...prev,
            imagen_url: res.data.result.url
          }))
          toast.success('Imagen subida correctamente')
        } else {
          toast.error('Error al subir imagen')
        }
      } catch (error) {
        console.error('Error uploading image:', error)
        toast.error('Error de servidor al subir imagen')
      } finally {
        setUploading(false)
      }
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.titulo || !formData.imagen_url || !formData.boton_url) {
      toast.error('Por favor complete todos los campos obligatorios (*)')
      
      return
    }

    setSaving(true)
    
    try {
      if (editingSlide) {
        // Edit existing slide
        const res = await axios.put(`/api/web/slides/${editingSlide.id}`, formData)
        
        if (res.data.success) {
          setSlides(prev => prev.map(s => s.id === editingSlide.id ? res.data.data : s))
          toast.success('Diapositiva actualizada correctamente')
          handleCloseDialog()
          router.refresh()
        }
      } else {
        // Create new slide
        const res = await axios.post('/api/web/slides', formData)
        
        if (res.data.success) {
          setSlides(prev => [...prev, res.data.data].sort((a, b) => a.orden - b.orden))
          toast.success('Diapositiva creada correctamente')
          handleCloseDialog()
          router.refresh()
        }
      }
    } catch (error: any) {
      console.error('Error saving slide:', error)
      toast.error(error.response?.data?.error || 'Error al guardar la diapositiva')
    } finally {
      setSaving(false)
    }
  }

  const handleOpenDelete = (id: string) => {
    setSlideToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const handleCloseDelete = () => {
    setSlideToDelete(null)
    setDeleteConfirmOpen(false)
  }

  const handleDelete = async () => {
    if (!slideToDelete) return
    setDeleting(true)
    
    try {
      const res = await axios.delete(`/api/web/slides/${slideToDelete}`)
      
      if (res.data.success) {
        setSlides(prev => prev.filter(s => s.id !== slideToDelete))
        toast.success('Diapositiva eliminada correctamente')
        handleCloseDelete()
        router.refresh()
      }
    } catch (error) {
      console.error('Error deleting slide:', error)
      toast.error('Error al eliminar la diapositiva')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      <Card sx={{ p: 4, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <CardHeader 
            title='Gestión del Carrusel de Portada' 
            subheader='Administra las diapositivas que se muestran en el carrusel de la página de inicio'
            sx={{ p: 0 }}
          />
          <Button
            variant='contained'
            color='primary'
            startIcon={<i className='tabler-plus' />}
            onClick={handleOpenAdd}
          >
            Agregar Diapositiva
          </Button>
        </Box>

        <TableContainer component={Paper} variant='outlined' sx={{ borderRadius: '8px' }}>
          <Table sx={{ minWidth: 650 }} aria-label='carrusel table'>
            <TableHead sx={{ bgcolor: 'action.hover' }}>
              <TableRow>
                <TableCell width={60} align='center'>Orden</TableCell>
                <TableCell width={120}>Imagen</TableCell>
                <TableCell>Título y Descripción</TableCell>
                <TableCell width={200}>Botón</TableCell>
                <TableCell width={100} align='center'>Estado</TableCell>
                <TableCell width={120} align='center'>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slides.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align='center' sx={{ py: 10 }}>
                    <Typography color='text.secondary'>No hay diapositivas configuradas en la base de datos. Se están mostrando las diapositivas por defecto.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                slides.map((slide) => (
                  <TableRow key={slide.id} hover>
                    <TableCell align='center'>
                      <Typography className='font-bold'>{slide.orden}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box 
                        component='img' 
                        src={slide.imagen_url} 
                        alt={slide.titulo} 
                        sx={{ width: 100, height: 60, objectFit: 'cover', borderRadius: '4px', border: '1px solid', borderColor: 'divider' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant='subtitle2' className='font-bold' color='text.primary' sx={{ mb: 1 }}>
                        {slide.titulo}
                      </Typography>
                      <Typography variant='body2' color='text.secondary' sx={{ lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {slide.subtitulo || '(Sin descripción)'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' className='font-bold' color='text.primary'>
                        {slide.boton_texto}
                      </Typography>
                      <Typography variant='caption' color='text.secondary' sx={{ wordBreak: 'break-all' }}>
                        {slide.boton_url}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography variant='body2' color={slide.esta_activo ? 'success.main' : 'text.disabled'} className='font-semibold'>
                        {slide.esta_activo ? 'Activo' : 'Inactivo'}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Tooltip title='Editar'>
                        <IconButton size='small' onClick={() => handleOpenEdit(slide)} color='primary'>
                          <i className='tabler-edit text-lg' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Eliminar'>
                        <IconButton size='small' onClick={() => handleOpenDelete(slide.id)} color='error'>
                          <i className='tabler-trash text-lg' />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add/Edit Slide Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth='md' keepMounted={false}>
        <DialogTitle>{editingSlide ? 'Editar Diapositiva' : 'Nueva Diapositiva'}</DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 4, pt: 2 }}>
            <CustomTextField
              fullWidth
              label='Título *'
              name='titulo'
              value={formData.titulo}
              onChange={handleInputChange}
              required
              placeholder='Ingrese el título principal de la diapositiva'
            />
            
            <CustomTextField
              fullWidth
              multiline
              rows={3}
              label='Descripción'
              name='subtitulo'
              value={formData.subtitulo}
              onChange={handleInputChange}
              placeholder='Ingrese la descripción secundaria'
            />

            <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
              <CustomTextField
                fullWidth
                label='Imagen URL *'
                name='imagen_url'
                value={formData.imagen_url}
                onChange={handleInputChange}
                required
                placeholder='Pegue la URL de la imagen o suba un archivo'
              />
              <input
                type='file'
                ref={fileInputRef}
                hidden
                accept='image/*'
                onChange={handleImageUpload}
              />
              <Button
                variant='outlined'
                color='primary'
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                sx={{ height: '40px', minWidth: '150px' }}
                startIcon={uploading ? <CircularProgress size={16} /> : <i className='tabler-upload' />}
              >
                {uploading ? 'Subiendo...' : 'Subir Imagen'}
              </Button>
            </Box>

            {formData.imagen_url && (
              <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px', p: 2, display: 'flex', justifyContent: 'center', bgcolor: 'action.hover' }}>
                <Box
                  component='img'
                  src={formData.imagen_url}
                  alt='Vista previa'
                  sx={{ maxHeight: 200, maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }}
                />
              </Box>
            )}

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 4 }}>
              <CustomTextField
                fullWidth
                label='Texto del Botón *'
                name='boton_texto'
                value={formData.boton_texto}
                onChange={handleInputChange}
                required
                placeholder='Ej. Conocer más'
              />
              <CustomTextField
                fullWidth
                label='URL de destino del Botón *'
                name='boton_url'
                value={formData.boton_url}
                onChange={handleInputChange}
                required
                placeholder='Ej. /programas o #escuelas'
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
              <CustomTextField
                fullWidth
                type='number'
                label='Orden de aparición'
                name='orden'
                value={formData.orden}
                onChange={handleInputChange}
                placeholder='Ej. 0, 1, 2'
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.esta_activo}
                    onChange={handleSwitchChange}
                    name='esta_activo'
                    color='primary'
                  />
                }
                label='Publicar inmediatamente (Activo)'
                sx={{ ml: 0 }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 4, pt: 0 }}>
            <Button onClick={handleCloseDialog} color='secondary'>Cancelar</Button>
            <Button type='submit' variant='contained' color='primary' disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={handleCloseDelete}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Está seguro de que desea eliminar esta diapositiva? Esta acción no se puede deshacer.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 4, pt: 0 }}>
          <Button onClick={handleCloseDelete} color='secondary'>Cancelar</Button>
          <Button onClick={handleDelete} variant='contained' color='error' disabled={deleting}>
            {deleting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
