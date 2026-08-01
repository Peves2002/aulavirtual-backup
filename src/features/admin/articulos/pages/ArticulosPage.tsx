'use client'

import { useState, useEffect } from 'react'

import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

import { toast } from 'react-toastify'

import type { Articulo } from '../entity/Articulo'
import CustomTextField from '@/@core/components/mui/TextField'
import ArticuloUpload from '../components/ArticuloUpload'
import ArticuloImageUpload from '../components/ArticuloImageUpload'

export function ArticulosPage() {
  const [articulos, setArticulos] = useState<Articulo[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form state
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [imagenPortada, setImagenPortada] = useState('')
  const [archivoUrl, setArchivoUrl] = useState('')

  const fetchArticulos = async () => {
    setLoading(true)

    try {
      const res = await fetch('/api/admin/articulos')
      const json = await res.json()

      if (json.status) {
        setArticulos(json.result)
      } else {
        toast.error(json.message || 'Error al cargar artículos')
      }
    } catch (error) {
      toast.error('Error de conexión')
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchArticulos()
  }, [])

  const handleOpenNew = () => {
    setEditingId(null)
    setTitulo('')
    setDescripcion('')
    setImagenPortada('')
    setArchivoUrl('')
    setDialogOpen(true)
  }

  const handleOpenEdit = (articulo: Articulo) => {
    setEditingId(articulo.id)
    setTitulo(articulo.titulo)
    setDescripcion(articulo.descripcion || '')
    setImagenPortada(articulo.imagen_portada || '')
    setArchivoUrl(articulo.archivo_pdf)
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  const handleSave = async () => {
    if (!titulo || !archivoUrl) {
      toast.error('El título y el archivo PDF son obligatorios')
      
return
    }

    const payload = { titulo, descripcion, imagen_portada: imagenPortada, archivo_pdf: archivoUrl }
    
    try {
      const url = editingId ? `/api/admin/articulos/${editingId}` : '/api/admin/articulos'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const json = await res.json()

      if (json.status) {
        toast.success(editingId ? 'Artículo actualizado' : 'Artículo creado')
        setDialogOpen(false)
        fetchArticulos()
      } else {
        toast.error(json.message || 'Error al guardar')
      }
    } catch (error) {
      toast.error('Error de conexión')
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este artículo?')) return

    try {
      const res = await fetch(`/api/admin/articulos/${id}`, { method: 'DELETE' })
      const json = await res.json()
      
      if (json.status) {
        toast.success('Artículo eliminado')
        fetchArticulos()
      } else {
        toast.error(json.message || 'Error al eliminar')
      }
    } catch (error) {
      toast.error('Error de conexión')
    }
  }

  return (
    <>
      <Card>
        <CardHeader 
          title='Gestión de Artículos y Noticias' 
          action={
            <Button variant='contained' startIcon={<i className='tabler-plus' />} onClick={handleOpenNew}>
              Nuevo Artículo
            </Button>
          }
        />
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Archivo</TableCell>
                  <TableCell align='right'>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articulos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No hay artículos creados.</TableCell>
                  </TableRow>
                ) : (
                  articulos.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.titulo}</TableCell>
                      <TableCell>{item.descripcion || '—'}</TableCell>
                      <TableCell>
                        <a href={item.archivo_pdf} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Ver PDF
                        </a>
                      </TableCell>
                      <TableCell align='right'>
                        <IconButton onClick={() => handleOpenEdit(item)} title='Editar'>
                          <i className='tabler-edit text-textSecondary' />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(item.id)} title='Eliminar'>
                          <i className='tabler-trash text-textSecondary' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Editar Artículo' : 'Nuevo Artículo'}</DialogTitle>
        <DialogContent className="flex flex-col gap-4 pt-4">
          <CustomTextField
            fullWidth
            label="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej. Novedades 2026"
            sx={{ mt: 2 }}
          />
          <CustomTextField
            fullWidth
            multiline
            rows={3}
            label="Descripción (Opcional)"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Imagen de Portada (Opcional)</Typography>
            <ArticuloImageUpload
              value={imagenPortada}
              onChange={(url: string) => setImagenPortada(url)}
            />
          </Box>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Archivo PDF</Typography>
            <ArticuloUpload
              value={archivoUrl}
              onChange={(url: string) => setArchivoUrl(url)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancelar</Button>
          <Button onClick={handleSave} variant="contained" disabled={!titulo || !archivoUrl}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
