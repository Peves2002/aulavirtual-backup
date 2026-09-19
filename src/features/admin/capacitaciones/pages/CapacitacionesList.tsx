'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Button,
  Card,
  CardHeader,
  Chip,
  IconButton,
  Typography,
  Box,
  Avatar,
  Tooltip,
  TablePagination,
  MenuItem,
} from '@mui/material'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import Swal from 'sweetalert2'
import classnames from 'classnames'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import tableStyles from '@core/styles/table.module.css'
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@/utils/components/others/TablePaginationComponent'
import { DebouncedInput } from '@/utils/components/others/DebouncedInput'

import type { Capacitacion } from '../entity'
import { useCapacitaciones, useDeleteCapacitacion, useUpdateCapacitacion, useReordenarCapacitaciones } from '../hooks'

function SortableRow({
  id,
  children,
  isDragDisabled,
  isSelected
}: {
  id: string
  children: (dragHandleProps: any) => React.ReactNode
  isDragDisabled: boolean
  isSelected: boolean
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: isDragDisabled
  })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.6 : 1,
    position: isDragging ? 'relative' : undefined,
    backgroundColor: isDragging ? '#fff' : undefined,
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={classnames({ selected: isSelected })}
    >
      {children({ attributes, listeners })}
    </tr>
  )
}

const columnHelper = createColumnHelper<Capacitacion>()

const ESTADO_COLORS: Record<string, 'warning' | 'success' | 'default'> = {
  BORRADOR: 'warning',
  PUBLICADO: 'success',
  ARCHIVADO: 'default',
}

export const CapacitacionesList = () => {
  const router = useRouter()
  const { data, isLoading } = useCapacitaciones({ limit: 100 })
  const capacitaciones = data?.data || []
  
  const deleteCapacitacion = useDeleteCapacitacion()
  const updateCapacitacion = useUpdateCapacitacion()
  const reordenarCapacitaciones = useReordenarCapacitaciones()

  const [globalFilter, setGlobalFilter] = useState('')
  const [orderedCapacitaciones, setOrderedCapacitaciones] = useState<Capacitacion[]>([])

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  useEffect(() => {
    setOrderedCapacitaciones(capacitaciones)
  }, [capacitaciones])

  const isDragDisabled = globalFilter.trim().length > 0

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = orderedCapacitaciones.findIndex(c => c.id === active.id)
    const newIndex = orderedCapacitaciones.findIndex(c => c.id === over.id)
    const reordered = arrayMove(orderedCapacitaciones, oldIndex, newIndex)

    setOrderedCapacitaciones(reordered)

    const baseIndex = pagination.pageIndex * pagination.pageSize
    const items = reordered.map((c, i) => ({ id: c.id, orden: baseIndex + i + 1 }))

    await reordenarCapacitaciones.mutateAsync(items)
  }

  const handleEdit = useCallback((id: string) => {
    router.push(`/admin/capacitaciones/${id}/editar`)
  }, [router])

  const handleDelete = useCallback(
    async (id: string) => {
      const result = await Swal.fire({
        title: '¿Eliminar capacitación?',
        text: 'Esta acción no se puede revertir.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      })

      if (result.isConfirmed) {
        try {
          await deleteCapacitacion.mutateAsync(id)
          Swal.fire({ title: 'Eliminado', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 })
        } catch {
          Swal.fire({ title: 'Error', text: 'No se pudo eliminar la capacitación', icon: 'error' })
        }
      }
    },
    [deleteCapacitacion],
  )

  const handleToggleEstado = useCallback(async (cap: Capacitacion) => {
    const nuevoEstado = cap.estado === 'PUBLICADO' ? 'BORRADOR' : 'PUBLICADO'

    try {
      await updateCapacitacion.mutateAsync({ id: cap.id, estado: nuevoEstado })
      Swal.fire({ title: `Capacitación ${nuevoEstado === 'PUBLICADO' ? 'publicada' : 'pasada a borrador'}`, icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2500 })
    } catch {
      Swal.fire({ title: 'Error', text: 'No se pudo cambiar el estado', icon: 'error' })
    }
  }, [updateCapacitacion])

  const columns = useMemo<ColumnDef<Capacitacion, any>[]>(
    () => [
      columnHelper.display({
        id: 'drag-handle',
        header: () => null,
        cell: () => null
      }),
      columnHelper.display({
        id: 'numero',
        header: 'Orden',
        cell: ({ row }) => (
          <Typography color='text.secondary' variant='body2'>
            {pagination.pageIndex * pagination.pageSize + row.index + 1}
          </Typography>
        )
      }),
      columnHelper.accessor('titulo', {
        header: 'Capacitación',
        cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              variant='rounded'
              src={row.original.miniatura ?? ''}
              sx={{ width: 64, height: 36, bgcolor: 'action.hover' }}
            >
              <i className='tabler-presentation text-xl' />
            </Avatar>
            <Box>
              <Typography variant='body2' fontWeight={600} noWrap sx={{ maxWidth: 300 }}>
                {row.original.titulo}
              </Typography>
            </Box>
          </Box>
        ),
      }),
      columnHelper.display({
        id: 'categoria',
        header: 'Categoría',
        cell: ({ row }) => (
          <Typography variant='body2' color='text.secondary'>
            {row.original.categoria?.nombre ?? 'Sin categoría'}
          </Typography>
        ),
      }),
      columnHelper.accessor('estado', {
        header: 'Estado',
        cell: ({ row }) => (
          <Chip
            label={row.original.estado}
            color={ESTADO_COLORS[row.original.estado] ?? 'default'}
            size='small'
            variant='tonal'
          />
        ),
      }),
      columnHelper.display({
        id: 'acciones',
        header: () => <div className='w-full text-right'>Acciones</div>,
        cell: ({ row }) => (
          <div className='flex items-center justify-end gap-1'>
            <Tooltip title={row.original.estado === 'PUBLICADO' ? 'Pasar a borrador' : 'Publicar'}>
              <IconButton size='small' onClick={() => handleToggleEstado(row.original)}>
                <i className={`tabler-${row.original.estado === 'PUBLICADO' ? 'eye-off' : 'eye'} text-[20px] text-textSecondary`} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Editar'>
              <IconButton size='small' onClick={() => handleEdit(row.original.id)}>
                <i className='tabler-edit text-[20px] text-textSecondary' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Eliminar'>
              <IconButton size='small' onClick={() => handleDelete(row.original.id)}>
                <i className='tabler-trash text-[20px] text-textSecondary' />
              </IconButton>
            </Tooltip>
          </div>
        ),
      }),
    ],
    [handleDelete, handleEdit, handleToggleEstado, pagination.pageIndex, pagination.pageSize],
  )

  const table = useReactTable({
    data: orderedCapacitaciones,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
    state: { globalFilter, pagination },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <Card>
      <CardHeader title='Gestión de Capacitaciones' className='pbe-4' />
      <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
        <CustomTextField
          select
          value={table.getState().pagination.pageSize}
          onChange={e => table.setPageSize(Number(e.target.value))}
          className='is-[70px]'
        >
          <MenuItem value='10'>10</MenuItem>
          <MenuItem value='25'>25</MenuItem>
          <MenuItem value='50'>50</MenuItem>
        </CustomTextField>
        <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Buscar capacitación'
            className='is-full sm:is-auto'
          />
          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={() => router.push('/admin/capacitaciones/nuevo')}
            className='is-full sm:is-auto'
          >
            Nueva Capacitación
          </Button>
        </div>
      </div>

      <div className='overflow-x-auto relative min-h-[200px]'>
        {isLoading && (
          <div className='absolute inset-0 bg-white/50 z-10 flex items-center justify-center'>
            <Typography variant='body2'>Cargando capacitaciones...</Typography>
          </div>
        )}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={table.getRowModel().rows.map(r => r.original.id || r.id)}
            strategy={verticalListSortingStrategy}
          >
            <table className={tableStyles.table}>
              <thead>
                {table.getHeaderGroups().map(hg => (
                  <tr key={hg.id}>
                    {hg.headers.map(h => (
                      <th key={h.id} style={h.id === 'drag-handle' ? { width: 40, padding: '0 8px' } : undefined}>
                        {flexRender(h.column.columnDef.header, h.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getFilteredRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={table.getVisibleFlatColumns().length} className='text-center py-4'>
                      No hay capacitaciones registradas
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map(row => (
                    <SortableRow
                      key={row.id}
                      id={row.original.id || row.id}
                      isDragDisabled={isDragDisabled}
                      isSelected={row.getIsSelected()}
                    >
                      {(dragHandleProps) => (
                        <>
                          <td style={{ width: 40, padding: '0 8px', textAlign: 'center' }}>
                            {!isDragDisabled && (
                              <span
                                {...dragHandleProps.attributes}
                                {...dragHandleProps.listeners}
                                style={{ cursor: 'grab', touchAction: 'none', display: 'inline-flex', alignItems: 'center' }}
                              >
                                <i className='tabler-grip-vertical text-[20px] text-textDisabled' />
                              </span>
                            )}
                          </td>
                          {row.getVisibleCells().filter(c => c.column.id !== 'drag-handle').map(cell => (
                            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                          ))}
                        </>
                      )}
                    </SortableRow>
                  ))
                )}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      </div>

      <TablePaginationComponent table={table as any} />
    </Card>
  )
}
