'use client'

import { useState, useEffect } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Divider,
  Autocomplete,
  TextField,
  Tooltip,
  Paper
} from '@mui/material'

import { useSnackbar } from 'notistack'

import { useManageRutaCursos, useRuta } from '../hooks/useRutas'
import { useCursos } from '@/features/admin/cursos/hooks/useCursos'
import type { Curso } from '@/features/admin/cursos/entity/Curso'
import CourseThumbnail from '@/utils/components/CourseThumbnail'

interface CourseItemProps {
  curso: any
  onRemove: (id: string) => void
}

const CourseItem = ({ curso, onRemove }: CourseItemProps) => {
  return (
    <>
      <ListItem sx={{ px: 2, py: 3 }}>
        <CourseThumbnail
          src={curso.miniatura}
          title={curso.titulo}
          variant='simple'
          sx={{ mr: 3, width: 44, height: 32, border: '1px solid var(--mui-palette-divider)', borderRadius: '4px' }}
        />
        
        <ListItemText 
          primary={curso.titulo} 
          primaryTypographyProps={{ variant: 'body2', fontWeight: 600, noWrap: true }}
          sx={{ flex: '1 1 auto', overflow: 'hidden', pr: 6 }}
        />

        <ListItemSecondaryAction>
          <Tooltip title="Quitar del paquete">
            <IconButton size='small' color='error' onClick={() => onRemove(curso.id)}>
              <i className='tabler-x' />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  )
}

interface RutaCursosDialogProps {
  open: boolean
  onClose: () => void
  rutaId: string | null
}

export const RutaCursosDialog = ({ open, onClose, rutaId }: RutaCursosDialogProps) => {
  const { data: ruta, isLoading: isLoadingRuta } = useRuta(rutaId)
  const { data: cursosData } = useCursos({ limit: '100' })
  const manageCursos = useManageRutaCursos()

  const { enqueueSnackbar } = useSnackbar()
  const [selectedCursos, setSelectedCursos] = useState<any[]>([])

  useEffect(() => {
    if (ruta) {
      setSelectedCursos(ruta.cursos || [])
    } else {
      setSelectedCursos([])
    }
  }, [ruta])

  const handleAddCurso = (curso: Curso | null) => {
    if (!curso) return

    if (selectedCursos.some(c => c.id === curso.id)) {
      enqueueSnackbar('Este programa ya está en el paquete', { variant: 'warning' })

      return
    }

    setSelectedCursos([...selectedCursos, { 
      id: curso.id, 
      titulo: curso.titulo, 
      miniatura: curso.miniatura,
      seccion_id: null 
    }])
  }

  const handleRemoveCurso = (id: string) => {
    setSelectedCursos(selectedCursos.filter(c => c.id !== id))
  }

  const handleSave = async () => {
    if (!rutaId) return

    try {
      await manageCursos.mutateAsync({
        id: rutaId,
        cursos: selectedCursos.map(c => ({ id: c.id, seccion_id: null })),
        secciones: [] // No sections for packages
      })

      enqueueSnackbar('Paquete actualizado correctamente', { variant: 'success' })

      onClose()
    } catch (err) {
      enqueueSnackbar('Error al salvar el paquete', { variant: 'error' })
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant='h5'>Gestionar Paquete</Typography>
          <Typography variant='caption' color='text.secondary'>{ruta?.titulo}</Typography>
        </Box>
        <IconButton onClick={onClose} size='small'><i className='tabler-x' /></IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 0, bgcolor: 'action.hover' }}>
        <Box sx={{ p: 6 }}>
          <Paper sx={{ p: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            {/* Search for courses */}
            <Box sx={{ mb: 4 }}>
              <Autocomplete
                key={selectedCursos.length}
                options={cursosData?.cursos || []}
                getOptionLabel={(option) => option.titulo}
                onChange={(_, val) => handleAddCurso(val)}
                value={null}
                renderInput={(params) => (
                  <TextField {...params} label='Añadir programa al paquete...' variant='outlined' fullWidth size='small' />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 50,
                          borderRadius: '10px',
                          overflow: 'hidden',
                          flexShrink: 0,
                          border: '1px solid',
                          borderColor: 'divider'
                        }}
                      >
                        <CourseThumbnail
                          src={option.miniatura}
                          title={option.titulo}
                          variant='simple'
                        />
                      </Box>
                      <Typography variant='body2'>{option.titulo}</Typography>
                    </Box>
                  </li>
                )}
              />
            </Box>

            {/* Simple list of added courses */}
            <List sx={{ p: 0 }}>
              {selectedCursos.map((curso) => (
                <CourseItem 
                  key={curso.id} 
                  curso={curso} 
                  onRemove={handleRemoveCurso}
                />
              ))}
            </List>

            {selectedCursos.length === 0 && (
              <Box sx={{ py: 4, textAlign: 'center', bgcolor: 'action.disabledBackground', borderRadius: 1, border: '1px dashed', borderColor: 'divider' }}>
                <Typography variant='caption' color='text.disabled'>Aún no hay programas en este paquete.</Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 6, pt: '24px !important' }}>
        <Button onClick={onClose} color='secondary'>Cancelar</Button>
        <Button variant='contained' onClick={handleSave} disabled={manageCursos.isPending || isLoadingRuta} startIcon={<i className='tabler-device-floppy' />}>
          Guardar Paquete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
