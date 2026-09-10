'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Card, CardContent, CardHeader, Button, TextField, Grid, MenuItem, Typography, Box } from '@mui/material'
import { useSession } from 'next-auth/react'

import MediaLibrary from '@/features/admin/cursos/components/MediaLibrary'

export default function CrearBlogPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false)

  const [formData, setFormData] = useState({
    titulo: '',
    extracto: '',
    contenido: '',
    estado: 'PUBLICADO',
    miniatura: '',
    autor: '',
    fecha_publicacion: new Date().toISOString().split('T')[0]
  })

  React.useEffect(() => {
    // Si hay sesión y el autor está vacío, poner el nombre del usuario actual por defecto
    if (session?.user?.nombre && !formData.autor) {
      setFormData(prev => ({ ...prev, autor: `${session.user.nombre} ${session.user.apellido || ''}`.trim() }))
    }
  }, [session?.user])

  // Se eliminó la carga de autores desde API

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
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          autor_id: session?.user?.id
        })
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

  return (
    <>
      <Card>
        <CardHeader title="Escribir Nueva Noticia / Blog" />
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
                  {loading ? 'Guardando...' : 'Publicar Artículo'}
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
