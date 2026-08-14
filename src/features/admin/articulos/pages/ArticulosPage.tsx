'use client'

import { useState, useEffect, useMemo } from 'react'

import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
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
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import RichTextEditor from '@/utils/components/RichTextEditor'
import { generateSlug } from '@/utils/libs/slug'
import ArticuloUpload from '../components/ArticuloUpload'
import ArticuloImageUpload from '../components/ArticuloImageUpload'

interface AutorOption {
  id: string
  nombre: string
  apellido: string
}

export function ArticulosPage() {
  const [articulos, setArticulos] = useState<Articulo[]>([])
  const [autores, setAutores] = useState<AutorOption[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Form state
  const [titulo, setTitulo] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTocadoManualmente, setSlugTocadoManualmente] = useState(false)
  const [descripcion, setDescripcion] = useState('')
  const [imagenPortada, setImagenPortada] = useState('')
  const [archivoUrl, setArchivoUrl] = useState('')
  const [categoria, setCategoria] = useState('')
  const [autorId, setAutorId] = useState('')
  const [estado, setEstado] = useState<'BORRADOR' | 'PUBLICADO'>('BORRADOR')

  const categoriasExistentes = useMemo(
    () => [...new Set(articulos.map(a => a.categoria).filter((c): c is string => !!c))],
    [articulos]
  )

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

  const fetchAutores = async () => {
    try {
      const [resAdmin, resProfesor] = await Promise.all([
        fetch('/api/usuarios?rol=ADMIN&limit=200'),
        fetch('/api/usuarios?rol=PROFESOR&limit=200')
      ])

      const [jsonAdmin, jsonProfesor] = await Promise.all([resAdmin.json(), resProfesor.json()])

      const lista: AutorOption[] = [
        ...(jsonAdmin?.status ? jsonAdmin.result.usuarios : []),
        ...(jsonProfesor?.status ? jsonProfesor.result.usuarios : [])
      ]

      setAutores(lista)
    } catch (error) {
      // No es crítico: el select de autor simplemente queda vacío
    }
  }

  useEffect(() => {
    fetchArticulos()
    fetchAutores()
  }, [])

  const handleOpenNew = () => {
    setEditingId(null)
    setTitulo('')
    setSlug('')
    setSlugTocadoManualmente(false)
    setDescripcion('')
    setImagenPortada('')
    setArchivoUrl('')
    setCategoria('')
    setAutorId('')
    setEstado('BORRADOR')
    setDialogOpen(true)
  }

  const handleOpenEdit = (articulo: Articulo) => {
    setEditingId(articulo.id)
    setTitulo(articulo.titulo)
    setSlug(articulo.slug)
    setSlugTocadoManualmente(true)
    setDescripcion(articulo.descripcion || '')
    setImagenPortada(articulo.imagen_portada || '')
    setArchivoUrl(articulo.archivo_pdf || '')
    setCategoria(articulo.categoria || '')
    setAutorId(articulo.autor_id || '')
    setEstado(articulo.estado)
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  const handleTituloChange = (nuevoTitulo: string) => {
    setTitulo(nuevoTitulo)

    if (!slugTocadoManualmente) {
      setSlug(generateSlug(nuevoTitulo))
    }
  }

  const handleSave = async () => {
    if (!titulo.trim()) {
      toast.error('El título es obligatorio')

      return
    }

    const payload = {
      titulo,
      slug: slug || undefined,
      descripcion: descripcion || null,
      imagen_portada: imagenPortada || null,
      archivo_pdf: archivoUrl || null,
      categoria: categoria || null,
      autor_id: autorId || null,
      estado
    }

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
                  <TableCell>Slug</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Archivo</TableCell>
                  <TableCell align='right'>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articulos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align='center'>
                      No hay artículos creados.
                    </TableCell>
                  </TableRow>
                ) : (
                  articulos.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.titulo}</TableCell>
                      <TableCell>
                        <Typography variant='caption' sx={{ fontFamily: 'monospace' }}>
                          {item.slug}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size='small'
                          label={item.estado === 'PUBLICADO' ? 'Publicado' : 'Borrador'}
                          color={item.estado === 'PUBLICADO' ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell>
                        {item.archivo_pdf ? (
                          <a
                            href={item.archivo_pdf}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-primary hover:underline'
                          >
                            Ver PDF
                          </a>
                        ) : (
                          '—'
                        )}
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

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth='md' fullWidth>
        <DialogTitle>{editingId ? 'Editar Artículo' : 'Nuevo Artículo'}</DialogTitle>
        <DialogContent className='flex flex-col gap-4 pt-4'>
          <CustomTextField
            fullWidth
            label='Título'
            value={titulo}
            onChange={e => handleTituloChange(e.target.value)}
            placeholder='Ej. Novedades 2026'
            sx={{ mt: 2 }}
          />

          <CustomTextField
            fullWidth
            label='Slug (URL)'
            value={slug}
            onChange={e => {
              setSlug(generateSlug(e.target.value))
              setSlugTocadoManualmente(true)
            }}
            helperText={`Se verá en: /articulo/${slug || '...'}`}
            InputProps={{
              endAdornment: (
                <IconButton
                  size='small'
                  title='Regenerar desde el título'
                  onClick={() => {
                    setSlug(generateSlug(titulo))
                    setSlugTocadoManualmente(false)
                  }}
                >
                  <i className='tabler-refresh' style={{ fontSize: 16 }} />
                </IconButton>
              )
            }}
          />

          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <CustomAutocomplete
              freeSolo
              options={categoriasExistentes}
              value={categoria}
              onInputChange={(_, nuevoValor) => setCategoria(nuevoValor)}
              sx={{ flex: 1, minWidth: 220 }}
              renderInput={params => <CustomTextField {...params} label='Categoría (opcional)' />}
            />

            <CustomTextField
              select
              label='Autor (opcional)'
              value={autorId}
              onChange={e => setAutorId(e.target.value)}
              sx={{ flex: 1, minWidth: 220 }}
            >
              <MenuItem value=''>
                <em>Sin autor asignado</em>
              </MenuItem>
              {autores.map(a => (
                <MenuItem key={a.id} value={a.id}>
                  {a.nombre} {a.apellido}
                </MenuItem>
              ))}
            </CustomTextField>

            <CustomTextField
              select
              label='Estado'
              value={estado}
              onChange={e => setEstado(e.target.value as 'BORRADOR' | 'PUBLICADO')}
              sx={{ width: 180 }}
            >
              <MenuItem value='BORRADOR'>Borrador</MenuItem>
              <MenuItem value='PUBLICADO'>Publicado</MenuItem>
            </CustomTextField>
          </Box>

          <Box>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
              Contenido del artículo
            </Typography>
            <RichTextEditor key={editingId ?? 'new'} value={descripcion} onChange={setDescripcion} />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
              Imagen de Portada (Opcional)
            </Typography>
            <ArticuloImageUpload value={imagenPortada} onChange={(url: string) => setImagenPortada(url)} />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
              Archivo PDF adjunto (Opcional)
            </Typography>
            <ArticuloUpload value={archivoUrl} onChange={(url: string) => setArchivoUrl(url)} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancelar
          </Button>
          <Button onClick={handleSave} variant='contained' disabled={!titulo.trim()}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
