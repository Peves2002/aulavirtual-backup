'use client'

import { useState, useEffect } from 'react'

import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { useSnackbar } from 'notistack'

import ArticuloFormDialog from './ArticuloFormDialog'

interface Props {
  defaultTipo?: string
  isNewsModule?: boolean
  isBlogModule?: boolean
}

export default function ArticulosClient({ defaultTipo, isNewsModule, isBlogModule }: Props) {
  const { enqueueSnackbar } = useSnackbar()
  
  const [currentTab, setCurrentTab] = useState(0)
  
  // States for Articulos
  const [articulos, setArticulos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filtroTipo, setFiltroTipo] = useState<string>(defaultTipo || (isBlogModule ? 'BLOG' : 'TODOS'))

  // States for Categorias
  const [categorias, setCategorias] = useState<any[]>([])
  const [loadingCat, setLoadingCat] = useState(true)
  const [openCatModal, setOpenCatModal] = useState(false)
  const [editingCatId, setEditingCatId] = useState<string | null>(null)
  const [catNombre, setCatNombre] = useState('')

  const fetchArticulos = async () => {
    setLoading(true)

    try {
      let url = '/api/admin/articulos'

      if (filtroTipo !== 'TODOS') {
        url = `/api/admin/articulos?tipo=${filtroTipo}`
      } else if (isNewsModule) {
        url = '/api/admin/articulos?tipos=NOTICIA,EVENTO'
      } else if (isBlogModule) {
        url = '/api/admin/articulos?tipo=BLOG'
      }

      const res = await fetch(url)

      if (res.ok) {
        const data = await res.json()

        setArticulos(data)
      } else {
        enqueueSnackbar('Error al cargar los artículos', { variant: 'error' })
      }
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Error de conexión', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const fetchCategorias = async () => {
    setLoadingCat(true)

    try {
      const res = await fetch('/api/admin/categorias-articulos')

      if (res.ok) {
        const data = await res.json()

        setCategorias(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingCat(false)
    }
  }

  useEffect(() => {
    if (currentTab === 0) fetchArticulos()
    if (currentTab === 1) fetchCategorias()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab, filtroTipo])

  // --- Articulo Handlers ---
  const handleOpenAdd = () => {
    setEditingId(null)
    setOpenModal(true)
  }

  const handleOpenEdit = (id: string) => {
    setEditingId(id)
    setOpenModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este artículo?')) return
    
    try {
      const res = await fetch(`/api/admin/articulos/${id}`, { method: 'DELETE' })

      if (res.ok) {
        enqueueSnackbar('Artículo eliminado', { variant: 'success' })
        fetchArticulos()
      } else {
        enqueueSnackbar('Error al eliminar', { variant: 'error' })
      }
    } catch (error) {
      enqueueSnackbar('Error de conexión', { variant: 'error' })
    }
  }

  // --- Categoria Handlers ---
  const handleOpenCatAdd = () => {
    setEditingCatId(null)
    setCatNombre('')
    setOpenCatModal(true)
  }

  const handleOpenCatEdit = (cat: any) => {
    setEditingCatId(cat.id)
    setCatNombre(cat.nombre)
    setOpenCatModal(true)
  }

  const handleSaveCat = async () => {
    if (!catNombre.trim()) {
      enqueueSnackbar('El nombre es obligatorio', { variant: 'warning' })
      
return
    }
    
    try {
      const url = editingCatId ? `/api/admin/categorias-articulos/${editingCatId}` : '/api/admin/categorias-articulos'
      const method = editingCatId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: catNombre })
      })

      if (res.ok) {
        enqueueSnackbar(`Categoría ${editingCatId ? 'actualizada' : 'creada'}`, { variant: 'success' })
        setOpenCatModal(false)
        fetchCategorias()
      } else {
        const err = await res.json()

        enqueueSnackbar(err.error || 'Error al guardar', { variant: 'error' })
      }
    } catch (error) {
      enqueueSnackbar('Error de conexión', { variant: 'error' })
    }
  }

  const handleDeleteCat = async (id: string) => {
    if (!confirm('¿Eliminar categoría? Los artículos no se borrarán pero perderán esta categoría.')) return
    
    try {
      const res = await fetch(`/api/admin/categorias-articulos/${id}`, { method: 'DELETE' })

      if (res.ok) {
        enqueueSnackbar('Categoría eliminada', { variant: 'success' })
        fetchCategorias()
      } else {
        enqueueSnackbar('Error al eliminar', { variant: 'error' })
      }
    } catch (error) {
      enqueueSnackbar('Error de conexión', { variant: 'error' })
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant='h4'>
          {isBlogModule ? 'Blogs' : isNewsModule ? 'Noticias y Eventos' : 'Prensa y Blog'}
        </Typography>
        {currentTab === 0 ? (
          <Button variant='contained' onClick={handleOpenAdd} startIcon={<i className='tabler-plus' />}>
            {isBlogModule ? 'Nuevo Blog' : isNewsModule ? 'Nueva Noticia' : 'Nuevo Artículo'}
          </Button>
        ) : (
          <Button variant='contained' onClick={handleOpenCatAdd} startIcon={<i className='tabler-plus' />}>
            Nueva Categoría
          </Button>
        )}
      </Box>

      <Tabs value={currentTab} onChange={(e, val) => setCurrentTab(val)} sx={{ mb: 3 }}>
        <Tab label="Artículos" />
        <Tab label="Categorías" />
      </Tabs>

      {currentTab === 0 && (
        <>
          {!isBlogModule && (
            <Card sx={{ mb: 3, p: 2 }}>
              <FormControl size='small' sx={{ minWidth: 200 }}>
                <InputLabel>Filtrar por Tipo</InputLabel>
                <Select
                  value={filtroTipo}
                  label='Filtrar por Tipo'
                  onChange={(e) => setFiltroTipo(e.target.value)}
                >
                  <MenuItem value='TODOS'>Todos</MenuItem>
                  {isNewsModule ? (
                    <>
                      <MenuItem value='NOTICIA'>Noticias</MenuItem>
                      <MenuItem value='EVENTO'>Eventos</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem value='NOTICIA'>Noticias</MenuItem>
                      <MenuItem value='EVENTO'>Eventos</MenuItem>
                      <MenuItem value='EXPERTO'>Expertos</MenuItem>
                      <MenuItem value='BLOG'>Blogs</MenuItem>
                    </>
                  )}
                </Select>
              </FormControl>
            </Card>
          )}

          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Título</TableCell>
                    <TableCell>Tipo y Categorías</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Fecha Pub.</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align='center'>Cargando...</TableCell>
                    </TableRow>
                  ) : articulos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align='center'>No hay artículos registrados.</TableCell>
                    </TableRow>
                  ) : (
                    articulos.map((art) => (
                      <TableRow key={art.id}>
                        <TableCell>
                          <Typography variant='subtitle2'>{art.titulo}</Typography>
                          {art.es_destacado && <Chip size='small' label='Destacado' color='warning' sx={{ mt: 0.5 }} />}
                        </TableCell>
                        <TableCell>
                          <Chip size='small' label={art.tipo} sx={{ mb: 0.5 }} />
                          <br />
                          {art.categorias?.map((c: any) => (
                            <Chip key={c.id} size='small' variant='outlined' label={c.nombre} sx={{ mr: 0.5, mt: 0.5 }} />
                          ))}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            size='small' 
                            label={art.estado} 
                            color={art.estado === 'PUBLICADO' ? 'success' : 'default'} 
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(art.fecha_publicacion).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <IconButton color='primary' onClick={() => handleOpenEdit(art.id)}>
                            <i className='tabler-edit' />
                          </IconButton>
                          <IconButton color='error' onClick={() => handleDelete(art.id)}>
                            <i className='tabler-trash' />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </>
      )}

      {currentTab === 1 && (
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Slug</TableCell>
                  <TableCell>Artículos Relacionados</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingCat ? (
                  <TableRow>
                    <TableCell colSpan={4} align='center'>Cargando...</TableCell>
                  </TableRow>
                ) : categorias.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align='center'>No hay categorías registradas.</TableCell>
                  </TableRow>
                ) : (
                  categorias.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell><Typography variant='subtitle2'>{cat.nombre}</Typography></TableCell>
                      <TableCell>{cat.slug}</TableCell>
                      <TableCell>{cat._count?.articulos || 0}</TableCell>
                      <TableCell>
                        <IconButton color='primary' onClick={() => handleOpenCatEdit(cat)}>
                          <i className='tabler-edit' />
                        </IconButton>
                        <IconButton color='error' onClick={() => handleDeleteCat(cat.id)}>
                          <i className='tabler-trash' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {openModal && (
        <ArticuloFormDialog 
          open={openModal} 
          onClose={() => setOpenModal(false)} 
          articuloId={editingId}
          onSaved={fetchArticulos}
          defaultTipo={filtroTipo !== 'TODOS' ? filtroTipo : (isNewsModule ? 'NOTICIA' : isBlogModule ? 'BLOG' : undefined)}
          isNewsModule={isNewsModule}
          isBlogModule={isBlogModule}
        />
      )}

      <Dialog open={openCatModal} onClose={() => setOpenCatModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCatId ? 'Editar Categoría' : 'Nueva Categoría'}</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            fullWidth
            label="Nombre de la categoría"
            value={catNombre}
            onChange={(e) => setCatNombre(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCatModal(false)}>Cancelar</Button>
          <Button onClick={handleSaveCat} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

