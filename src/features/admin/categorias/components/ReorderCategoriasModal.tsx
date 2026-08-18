'use client'

import { useState, useEffect } from 'react'

import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  CircularProgress
} from '@mui/material'
import { useSnackbar } from 'notistack'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core'

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'

import { CSS } from '@dnd-kit/utilities'

import AppModal from '@/utils/components/AppModal'
import { useCategorias, useReordenarCategoriasPrincipales } from '../hooks/useCategorias'
import type { Categoria } from '../entity/Categoria'

interface SortableCategoryItemProps {
  categoria: Categoria
  index: number
}

const SortableCategoryItem = ({ categoria, index }: SortableCategoryItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: categoria.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? 'var(--mui-palette-action-hover)' : 'transparent',
    borderRadius: '8px',
    marginBottom: '8px',
    border: isDragging ? '1px dashed var(--mui-palette-primary-main)' : '1px solid transparent'
  }

  return (
    <div ref={setNodeRef} style={style}>
      <ListItem sx={{ px: 2, py: 2 }}>
        <Box 
          {...attributes} 
          {...listeners} 
          sx={{ mr: 3, display: 'flex', cursor: 'grab', '&:active': { cursor: 'grabbing' } }}
        >
          <i className='tabler-grip-vertical text-xl text-textDisabled' />
        </Box>
        
        <Box sx={{ mr: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 24 }}>
          <Typography variant='body2' color='text.disabled' sx={{ fontWeight: 'bold' }}>{index + 1}</Typography>
        </Box>

        <ListItemText 
          primary={categoria.nombre} 
          secondary={categoria.slug}
          primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
          sx={{ flex: '1 1 auto' }}
        />
      </ListItem>
      <Divider />
    </div>
  )
}

interface ReorderCategoriasModalProps {
  open: boolean
  handleClose: () => void
  onSuccess?: () => void
}

export const ReorderCategoriasModal = ({ open, handleClose, onSuccess }: ReorderCategoriasModalProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const { data, isLoading } = useCategorias({ limit: '100' })
  const reordenarMutation = useReordenarCategoriasPrincipales()

  const [items, setItems] = useState<Categoria[]>([])
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (data?.categorias) {
      // Sort items by orden just to be safe
      const sorted = [...data.categorias].sort((a, b) => a.orden - b.orden)

      setItems(sorted)
      setHasChanges(false)
    }
  }, [data])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over?.id)
        
        return arrayMove(items, oldIndex, newIndex)
      })
      setHasChanges(true)
    }
  }

  const handleSave = async () => {
    try {
      const reorderedItems = items.map((cat, index) => ({ id: cat.id, orden: index + 1 }))

      await reordenarMutation.mutateAsync({ items: reorderedItems })
      enqueueSnackbar('Orden de categorías guardado exitosamente', { variant: 'success' })
      handleClose()
      onSuccess?.()
    } catch (error) {
      enqueueSnackbar('Error al reordenar las categorías', { variant: 'error' })
    }
  }

  return (
    <AppModal open={open} handleClose={handleClose} maxWidth='sm'>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant='h4' sx={{ mb: 1, fontWeight: 600 }}>
          Reordenar Categorías Principales
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Arrastra y suelta las categorías para cambiar su orden de visualización.
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ maxHeight: '60vh', overflowY: 'auto', px: 1 }}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <List sx={{ width: '100%', p: 0 }}>
                {items.map((categoria, index) => (
                  <SortableCategoryItem
                    key={categoria.id}
                    categoria={categoria}
                    index={index}
                  />
                ))}
              </List>
            </SortableContext>
          </DndContext>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
        <Button
          variant='tonal'
          color='secondary'
          onClick={handleClose}
          disabled={reordenarMutation.isPending}
          sx={{ px: 4 }}
        >
          Cancelar
        </Button>
        <Button
          variant='contained'
          onClick={handleSave}
          disabled={!hasChanges || reordenarMutation.isPending}
          sx={{ px: 4 }}
          startIcon={<i className='tabler-device-floppy' />}
        >
          {reordenarMutation.isPending ? 'Guardando...' : 'Guardar Orden'}
        </Button>
      </Box>
    </AppModal>
  )
}
