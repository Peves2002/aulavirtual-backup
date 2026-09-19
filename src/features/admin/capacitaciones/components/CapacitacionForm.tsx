'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Button,
  Grid,
  MenuItem,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import Swal from 'sweetalert2'
import { Trash, Plus, ArrowUp, ArrowDown } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import CustomTextField from '@core/components/mui/TextField'
import MediaLibrary from '@/features/admin/cursos/components/MediaLibrary'
import { useCategorias } from '@/features/admin/categorias/hooks/useCategorias'

import type { Capacitacion, CreateCapacitacionDTO } from '../entity'
import { useCreateCapacitacion, useUpdateCapacitacion } from '../hooks'

interface Props {
  capacitacion?: Capacitacion | null
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Grid item xs={12}>
      <Typography variant='subtitle1' fontWeight={700}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant='caption' color='text.secondary' display='block' sx={{ mt: 0.25 }}>
          {subtitle}
        </Typography>
      )}
      <Divider sx={{ mt: 1.5 }} />
    </Grid>
  )
}

function SortableTemarioItem({ id, text, onRemove, isLast }: { id: string, text: string, onRemove: () => void, isLast: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: '#fff',
    zIndex: transform ? 1 : 0,
    position: transform ? 'relative' : undefined,
  } as React.CSSProperties

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      divider={!isLast}
      secondaryAction={
        <IconButton edge="end" onClick={onRemove} color='error' size='small'>
          <Trash size={18} />
        </IconButton>
      }
    >
      <Box {...attributes} {...listeners} sx={{ cursor: 'grab', mr: 2, display: 'flex', alignItems: 'center' }}>
        <i className='tabler-grip-vertical text-slate-400' />
      </Box>
      <ListItemText primary={text} sx={{ m: 0 }} />
    </ListItem>
  )
}

export const CapacitacionForm = ({ capacitacion }: Props) => {
  const router = useRouter()
  const createCapacitacion = useCreateCapacitacion()
  const updateCapacitacion = useUpdateCapacitacion()
  const { data: respCategorias } = useCategorias({ limit: 100 })
  const categorias = respCategorias?.categorias || []

  const [openMedia, setOpenMedia] = useState(false)
  const [temarioItems, setTemarioItems] = useState<{ id: string; text: string }[]>([])
  const [nuevoTemario, setNuevoTemario] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const { control, handleSubmit, reset, setValue, watch } = useForm<CreateCapacitacionDTO>({
    defaultValues: {
      titulo: '',
      descripcion: '',
      dirigido_a: '',
      temario: '',
      proximas_fechas: '',
      miniatura: '',
      orden: 0,
      estado: 'BORRADOR',
      categoria_id: '',
    },
  })

  const miniatura = watch('miniatura')

  useEffect(() => {
    if (capacitacion) {
      reset({
        titulo: capacitacion.titulo,
        descripcion: capacitacion.descripcion ?? '',
        dirigido_a: capacitacion.dirigido_a ?? '',
        temario: capacitacion.temario ?? '',
        proximas_fechas: capacitacion.proximas_fechas ?? '',
        miniatura: capacitacion.miniatura ?? '',
        orden: capacitacion.orden ?? 0,
        estado: capacitacion.estado,
        categoria_id: capacitacion.categoria_id ?? '',
      })
      if (capacitacion.temario) {
        setTemarioItems(
          capacitacion.temario
            .split('\n')
            .filter(Boolean)
            .map(item => ({ id: crypto.randomUUID(), text: item.replace(/^- /, '').trim() }))
        )
      }
    }
  }, [capacitacion, reset])

  const handleAddTemario = () => {
    if (nuevoTemario.trim()) {
      const newItems = [...temarioItems, { id: crypto.randomUUID(), text: nuevoTemario.trim() }]
      setTemarioItems(newItems)
      setValue('temario', newItems.map(item => '- ' + item.text).join('\n'))
      setNuevoTemario('')
    }
  }

  const handleRemoveTemario = (id: string) => {
    const newItems = temarioItems.filter(item => item.id !== id)
    setTemarioItems(newItems)
    setValue('temario', newItems.map(item => '- ' + item.text).join('\n'))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setTemarioItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        const newItems = arrayMove(items, oldIndex, newIndex)
        setValue('temario', newItems.map(item => '- ' + item.text).join('\n'))
        return newItems
      })
    }
  }

  const onSubmit = async (values: CreateCapacitacionDTO) => {
    try {
      if (capacitacion) {
        await updateCapacitacion.mutateAsync({ id: capacitacion.id, ...values })
      } else {
        await createCapacitacion.mutateAsync(values)
      }

      Swal.fire({
        title: capacitacion ? 'Capacitación actualizada' : 'Capacitación creada',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      })

      router.push('/admin/capacitaciones')
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.message || 'Error al guardar'
      Swal.fire({ title: 'Error', text: msg, icon: 'error' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4} sx={{ maxWidth: 900, mx: 'auto', bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
        
        <SectionHeader title='Información General' />

        <Grid item xs={12}>
          <Controller
            name='titulo'
            control={control}
            rules={{ required: 'El título es requerido' }}
            render={({ field, fieldState }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Título'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='categoria_id'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} select fullWidth label='Categoría'>
                <MenuItem value=''>Sin categoría</MenuItem>
                {categorias.map(c => (
                  <MenuItem key={c.id} value={c.id}>{c.nombre}</MenuItem>
                ))}
              </CustomTextField>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='estado'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} select fullWidth label='Estado'>
                <MenuItem value='BORRADOR'>Borrador</MenuItem>
                <MenuItem value='PUBLICADO'>Publicado</MenuItem>
                <MenuItem value='ARCHIVADO'>Archivado</MenuItem>
              </CustomTextField>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='proximas_fechas'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Próximas fechas' placeholder='Ej: 15 y 22 de Noviembre' />
            )}
          />
        </Grid>



        <SectionHeader title='Contenido' />

        <Grid item xs={12}>
          <Controller
            name='descripcion'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                rows={4}
                label='De qué trata el tema (Descripción)'
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name='dirigido_a'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                rows={3}
                label='¿A quiénes está dirigido?'
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='subtitle2' fontWeight={600} mb={1}>
            Temario
          </Typography>
          <Box display='flex' gap={2} mb={2}>
            <CustomTextField
              fullWidth
              placeholder='Ej: Módulo 1: Introducción...'
              value={nuevoTemario}
              onChange={e => setNuevoTemario(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddTemario()
                }
              }}
            />
            <Button
              variant='contained'
              onClick={handleAddTemario}
              startIcon={<Plus size={18} />}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Añadir
            </Button>
          </Box>

          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            {temarioItems.length > 0 ? (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={temarioItems.map(i => i.id)} strategy={verticalListSortingStrategy}>
                  <List disablePadding>
                    {temarioItems.map((item, idx) => (
                      <SortableTemarioItem 
                        key={item.id} 
                        id={item.id} 
                        text={item.text} 
                        onRemove={() => handleRemoveTemario(item.id)}
                        isLast={idx === temarioItems.length - 1} 
                      />
                    ))}
                  </List>
                </SortableContext>
              </DndContext>
            ) : (
              <Box p={4} textAlign='center'>
                <Typography variant='body2' color='text.secondary'>
                  Sin elementos. Usa el campo de arriba para añadir el primer tema.
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>

        <SectionHeader title='Imagen' />

        <Grid item xs={12}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Box
              sx={{
                width: 200,
                aspectRatio: '16/9',
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'action.hover'
              }}
            >
              {miniatura ? (
                <img src={miniatura} alt='miniatura' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Typography variant='caption' color='text.disabled'>Sin imagen</Typography>
              )}
            </Box>
            <Box>
              <Button variant='outlined' onClick={() => setOpenMedia(true)}>
                {miniatura ? 'Cambiar imagen' : 'Seleccionar imagen'}
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} display='flex' justifyContent='flex-end' gap={2} mt={2}>
          <Button variant='outlined' color='secondary' onClick={() => router.push('/admin/capacitaciones')}>
            Cancelar
          </Button>
          <Button
            type='submit'
            variant='contained'
            disabled={createCapacitacion.isPending || updateCapacitacion.isPending}
          >
            {capacitacion ? 'Guardar cambios' : 'Crear capacitación'}
          </Button>
        </Grid>
      </Grid>

      <MediaLibrary
        open={openMedia}
        onClose={() => setOpenMedia(false)}
        onSelect={url => {
          setValue('miniatura', url)
          setOpenMedia(false)
        }}
        acceptType='IMAGEN'
        title='Seleccionar Imagen'
      />
    </form>
  )
}
