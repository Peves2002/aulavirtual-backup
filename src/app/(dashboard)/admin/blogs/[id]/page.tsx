'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, Button, TextField, Grid, MenuItem, Typography, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import MediaLibrary from '@/features/admin/cursos/components/MediaLibrary'

export default function EditarBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false)

  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
    extracto: '',
    contenido: '',
    estado: 'PUBLICADO',
    miniatura: '',
    autor: '',
    fecha_publicacion: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/admin/blogs/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setFormData({
            titulo: data.titulo || '',
            slug: data.slug || '',
            extracto: data.extracto || '',
            contenido: data.contenido || '',
            estado: data.estado || 'PUBLICADO',
            miniatura: data.miniatura || '',
            autor: data.autor || '',
            fecha_publicacion: data.fecha_publicacion ? new Date(data.fecha_publicacion).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
          })
        }
      } catch (error) {
        console.error('Error fetching blog:', error)
      } finally {
        setFetching(false)
      }
    }
    fetchBlog()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectImage = (url: string) => {
    setFormData({ ...formData, miniatura: url })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`/api/admin/blogs/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        router.push('/admin/blogs')
      } else {
        const errorData = await res.json()
        alert('Error: ' + errorData.error)
      }
    } catch (error) {
      console.error(error)
      alert('Error guardando el artículo')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return <Typography sx={{p:3}}>Cargando artículo...</Typography>

  return (
    <>
      <Card>
        <CardHeader title="Editar Noticia / Blog" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título del Artículo"
                  name="titulo"
                  required
                  value={formData.titulo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Slug (URL amigable - Opcional)"
                  name="slug"
                  placeholder="ejemplo-de-articulo"
                  value={formData.slug}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Extracto (Resumen corto)"
                  name="extracto"
                  multiline
                  rows={2}
                  value={formData.extracto}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Imagen Miniatura</Typography>
                {formData.miniatura ? (
                  <Box sx={{ position: 'relative', width: '100%', maxWidth: 400, borderRadius: 2, overflow: 'hidden', mb: 3, bgcolor: '#f4f4f4', border: '1px solid', borderColor: 'divider' }}>
                    <img
                      src={formData.miniatura}
                      alt='Vista previa'
                      style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block', maxHeight: 280 }}
                    />
                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ minWidth: 0, width: 32, height: 32, p: 0, borderRadius: '50%' }}
                        onClick={() => setFormData({ ...formData, miniatura: '' })}
                      >
                        <i className='tabler-trash' />
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    onClick={() => setIsMediaLibraryOpen(true)}
                    sx={{
                      width: '100%',
                      maxWidth: 400,
                      height: 200,
                      borderRadius: 2,
                      border: '2px dashed',
                      borderColor: 'divider',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      bgcolor: 'action.hover',
                      mb: 3,
                      '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.lightOpacity' }
                    }}
                  >
                    <i className='tabler-photo-plus text-4xl text-textDisabled' />
                    <Typography color='text.secondary' sx={{ mt: 2 }}>Click para seleccionar imagen</Typography>
                  </Box>
                )}
                <Button
                  variant='outlined'
                  size='small'
                  startIcon={<i className='tabler-photo' />}
                  onClick={() => setIsMediaLibraryOpen(true)}
                >
                  {formData.miniatura ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Contenido Principal</Typography>
                <TextField
                  fullWidth
                  name="contenido"
                  required
                  multiline
                  rows={8}
                  placeholder="Escribe aquí el cuerpo de la noticia..."
                  value={formData.contenido}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Nombre del Autor"
                  name="autor"
                  value={formData.autor}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha de Publicación"
                  name="fecha_publicacion"
                  value={formData.fecha_publicacion}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  select
                  label="Estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                >
                  <MenuItem value="PUBLICADO">Publicado</MenuItem>
                  <MenuItem value="BORRADOR">Borrador</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? 'Guardando...' : 'Actualizar Artículo'}
                </Button>
                <Button variant="outlined" onClick={() => router.push('/admin/blogs')}>
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <MediaLibrary
        open={isMediaLibraryOpen}
        onClose={() => setIsMediaLibraryOpen(false)}
        onSelect={handleSelectImage}
        acceptType="IMAGEN"
        title="Seleccionar Imagen de Blog"
      />
    </>
  )
}
