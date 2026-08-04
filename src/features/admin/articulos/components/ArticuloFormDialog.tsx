'use client'

import { useState, useEffect } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  FormControlLabel,
  Switch,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  Box,
  Typography,
  CircularProgress
} from '@mui/material'
import { useSnackbar } from 'notistack'

import RichTextEditor from '@/utils/components/RichTextEditor'

interface ArticuloFormDialogProps {
  open: boolean
  onClose: () => void
  articuloId: string | null
  onSaved: () => void
  defaultTipo?: string
  isNewsModule?: boolean
  isBlogModule?: boolean
}

export default function ArticuloFormDialog({ open, onClose, articuloId, onSaved, defaultTipo, isNewsModule, isBlogModule }: ArticuloFormDialogProps) {
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [categoriasDB, setCategoriasDB] = useState<any[]>([])
  const [etiquetasDB, setEtiquetasDB] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    setUploading(true)

    const uploadData = new FormData()

    uploadData.append('file', file)

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: uploadData
      })

      if (res.ok) {
        const result = await res.json()
        const url = result.result?.url

        if (url) {
          handleChange('miniatura', url)
          enqueueSnackbar('Imagen subida con éxito', { variant: 'success' })
        } else {
          enqueueSnackbar('Error en la respuesta del servidor', { variant: 'error' })
        }
      } else {
        const errorData = await res.json()

        enqueueSnackbar(errorData.error || 'Error al subir la imagen', { variant: 'error' })
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      enqueueSnackbar('Error de conexión al subir el archivo', { variant: 'error' })
    } finally {
      setUploading(false)
    }
  }
  
  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
    resumen: '',
    contenido: '',
    miniatura: '',
    tipo: defaultTipo || (isBlogModule ? 'BLOG' : 'NOTICIA'),
    estado: 'BORRADOR',
    autor: '',
    es_destacado: false,
    enlace_externo: '',
    fecha_publicacion: new Date().toISOString().split('T')[0],
    categorias: [] as string[],
    etiquetas: [] as string[],
    fecha_evento: '',
    hora_evento: '',
    modalidad_evento: '',
    expositor: '',
    link_registro: ''
  })

  useEffect(() => {
    fetchCategorias()
    fetchEtiquetas()

    if (articuloId) {
      fetchArticulo()
    } else {
      setFormData(prev => ({
        ...prev,
        tipo: defaultTipo || (isBlogModule ? 'BLOG' : 'NOTICIA')
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articuloId, defaultTipo, isBlogModule])

  const fetchCategorias = async () => {
    try {
      const res = await fetch('/api/admin/categorias-articulos')

      if (res.ok) {
        const data = await res.json()

        setCategoriasDB(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  
  const fetchEtiquetas = async () => {
    try {
      const res = await fetch('/api/admin/etiquetas-articulos')

      if (res.ok) {
        const data = await res.json()

        setEtiquetasDB(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchArticulo = async () => {
    try {
      const res = await fetch(`/api/admin/articulos/${articuloId}`)

      if (res.ok) {
        const data = await res.json()

        setFormData({
          ...data,
          fecha_publicacion: new Date(data.fecha_publicacion).toISOString().split('T')[0],
          categorias: data.categorias?.map((c: any) => c.id) || [],
          etiquetas: data.etiquetas?.map((e: any) => e.id) || [],
          fecha_evento: data.fecha_evento ? new Date(data.fecha_evento).toISOString().split('T')[0] : '',
          hora_evento: data.hora_evento || '',
          modalidad_evento: data.modalidad_evento || '',
          expositor: data.expositor || '',
          link_registro: data.link_registro || ''
        })
      }
    } catch (error) {
      enqueueSnackbar('Error al cargar datos del artículo', { variant: 'error' })
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!formData.titulo.trim()) {
      enqueueSnackbar('El título es obligatorio', { variant: 'warning' })
      
return
    }

    setLoading(true)

    try {
      const url = articuloId ? `/api/admin/articulos/${articuloId}` : '/api/admin/articulos'
      const method = articuloId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        enqueueSnackbar(`Artículo ${articuloId ? 'actualizado' : 'creado'} correctamente`, { variant: 'success' })
        onSaved()
        onClose()
      } else {
        enqueueSnackbar('Error al guardar', { variant: 'error' })
      }
    } catch (error) {
      enqueueSnackbar('Error de conexión', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        {isBlogModule 
          ? (articuloId ? 'Editar Blog' : 'Nuevo Blog') 
          : isNewsModule 
            ? (articuloId ? 'Editar Noticia' : 'Nueva Noticia') 
            : (articuloId ? 'Editar Artículo' : 'Nuevo Artículo')}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={isBlogModule ? 12 : 8}>
            <TextField
              fullWidth
              label="Título"
              value={formData.titulo}
              onChange={(e) => handleChange('titulo', e.target.value)}
              required
            />
          </Grid>
          {!isBlogModule && (
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Tipo"
                value={formData.tipo}
                onChange={(e) => handleChange('tipo', e.target.value)}
              >
                <MenuItem value="NOTICIA">Noticia</MenuItem>
                <MenuItem value="EVENTO">Evento</MenuItem>
                {!isNewsModule && <MenuItem value="EXPERTO">Experto</MenuItem>}
                {!isNewsModule && <MenuItem value="BLOG">Blog</MenuItem>}
              </TextField>
            </Grid>
          )}

          {formData.tipo === 'EVENTO' && (
            <>
              <Grid item xs={12}>
                <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1, border: '1px solid #e2e8f0' }}>
                  <h4 style={{ marginTop: 0, marginBottom: '16px', color: '#0f172a' }}>Configuración de Evento</h4>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        type="date"
                        label="Fecha del Evento"
                        InputLabelProps={{ shrink: true }}
                        value={formData.fecha_evento}
                        onChange={(e) => handleChange('fecha_evento', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        type="time"
                        label="Hora (Ej. 18:00)"
                        InputLabelProps={{ shrink: true }}
                        value={formData.hora_evento}
                        onChange={(e) => handleChange('hora_evento', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Modalidad (Online / Presencial)"
                        value={formData.modalidad_evento}
                        onChange={(e) => handleChange('modalidad_evento', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Expositor / Speaker"
                        value={formData.expositor}
                        onChange={(e) => handleChange('expositor', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </>
          )}


          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Slug (URL amigable)"
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              helperText="Dejar en blanco para auto-generar"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Publicación"
              InputLabelProps={{ shrink: true }}
              value={formData.fecha_publicacion}
              onChange={(e) => handleChange('fecha_publicacion', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              label="Estado"
              value={formData.estado}
              onChange={(e) => handleChange('estado', e.target.value)}
            >
              <MenuItem value="BORRADOR">Borrador</MenuItem>
              <MenuItem value="PUBLICADO">Publicado</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Categorías</InputLabel>
              <Select
                multiple
                value={formData.categorias}
                onChange={(e) => handleChange('categorias', e.target.value)}
                input={<OutlinedInput label="Categorías" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const cat = categoriasDB.find(c => c.id === value)

                      
return <Chip key={value} label={cat?.nombre || value} size="small" />
                    })}
                  </Box>
                )}
              >
                {categoriasDB.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Etiquetas</InputLabel>
              <Select
                multiple
                value={formData.etiquetas}
                onChange={(e) => handleChange('etiquetas', e.target.value)}
                input={<OutlinedInput label="Etiquetas" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const eti = etiquetasDB.find(e => e.id === value)

                      
return <Chip key={value} label={eti?.nombre || value} size="small" color="primary" variant="outlined" />
                    })}
                  </Box>
                )}
              >
                {etiquetasDB.map((eti) => (
                  <MenuItem key={eti.id} value={eti.id}>
                    {eti.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Autor"
              value={formData.autor}
              onChange={(e) => handleChange('autor', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ border: '1px dashed #ccc', p: 2, borderRadius: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Imagen de Miniatura / Portada</Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                {formData.miniatura && (
                  <Box 
                    component="img" 
                    src={formData.miniatura} 
                    alt="Vista previa" 
                    sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1, border: '1px solid #ddd' }} 
                  />
                )}
                <Box sx={{ flex: 1, minWidth: 250 }}>
                  <TextField
                    fullWidth
                    label="URL de Miniatura (Imagen)"
                    value={formData.miniatura}
                    onChange={(e) => handleChange('miniatura', e.target.value)}
                    helperText="Puedes pegar una URL o subir un archivo local"
                    size="small"
                  />
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    component="label"
                    disabled={uploading}
                    startIcon={uploading ? <CircularProgress size={16} /> : <i className="tabler-upload" />}
                  >
                    {uploading ? 'Subiendo...' : 'Subir Archivo'}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Resumen (Texto corto para tarjeta)"
              value={formData.resumen}
              onChange={(e) => handleChange('resumen', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <RichTextEditor
              label="Contenido Completo"
              value={formData.contenido}
              onChange={(val) => handleChange('contenido', val)}
              minHeight={400}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Enlace Externo (Opcional)"
              value={formData.enlace_externo}
              onChange={(e) => handleChange('enlace_externo', e.target.value)}
              helperText="Si se llena, redirigirá aquí en lugar de abrir el artículo"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.es_destacado}
                  onChange={(e) => handleChange('es_destacado', e.target.checked)}
                />
              }
              label="Marcar como Destacado"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
