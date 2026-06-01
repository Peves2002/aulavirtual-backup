'use client'

import { useMemo, useState } from 'react'

import Image from 'next/image'

import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  CircularProgress,
  IconButton,
  MenuItem,
  Switch,
  TablePagination,
  Typography
} from '@mui/material'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import classnames from 'classnames'

import tableStyles from '@core/styles/table.module.css'
import CustomTextField from '@core/components/mui/TextField'
import type { ThemeColor } from '@core/types'

import type { Receta } from '../entity/Receta'
import { useRecetas, useToggleRecetaStatus } from '../hooks/useRecetas'
import { RecetasActions } from '../components/RecetasActions'
import { DebouncedInput } from '@/utils/components/others/DebouncedInput'
import TablePaginationComponent from '@/utils/components/others/TablePaginationComponent'

const statusObj: Record<string, ThemeColor> = {
  activo: 'success',
  inactivo: 'secondary'
}

const columnHelper = createColumnHelper<Receta>()

interface RecetasPageProps {
  initialDataRecetas?: Receta[]
  initialTotal?: number
}

export function RecetasPage({ initialDataRecetas, initialTotal = 0 }: RecetasPageProps) {
  const [recetaToDelete, setRecetaToDelete] = useState<Receta | null>(null)
  const [recetaToEdit, setRecetaToEdit] = useState<Receta | null>(null)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const toggleStatus = useToggleRecetaStatus()

  const { data: recetasData, isFetching, isPlaceholderData, refetch } = useRecetas({
    page: (pagination.pageIndex + 1).toString(),
    limit: pagination.pageSize.toString(),
    buscar: globalFilter,
    esta_activo: statusFilter === 'all' ? undefined : statusFilter === 'activo'
  }, initialDataRecetas, initialTotal)

  const recetas = useMemo(() => recetasData?.recetas ?? initialDataRecetas ?? [], [recetasData, initialDataRecetas])
  const totalRecetas = useMemo(() => recetasData?.paginacion?.total ?? initialTotal, [recetasData, initialTotal])

  const columns = useMemo<ColumnDef<Receta, any>[]>(() => [
    columnHelper.display({
      id: 'numero',
      header: '#',
      cell: ({ row }) => (
        <Typography color='text.secondary' variant='body2'>
          {pagination.pageIndex * pagination.pageSize + row.index + 1}
        </Typography>
      )
    }),
    columnHelper.display({
      id: 'imagen',
      header: 'Imagen',
      cell: ({ row }) => row.original.imagen ? (
        <Box sx={{ width: 56, height: 56, borderRadius: 1, overflow: 'hidden', position: 'relative' }}>
          <Image src={row.original.imagen} alt={row.original.nombre} fill style={{ objectFit: 'cover' }} />
        </Box>
      ) : (
        <Box sx={{ width: 56, height: 56, borderRadius: 1, bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className='tabler-photo text-2xl text-textDisabled' />
        </Box>
      )
    }),
    columnHelper.accessor('nombre', {
      header: 'Receta',
      cell: ({ row }) => (
        <Box>
          <Typography color='text.primary' className='font-medium'>{row.original.nombre}</Typography>
          <Typography variant='caption' color='text.secondary' sx={{ fontFamily: 'monospace' }}>{row.original.slug}</Typography>
        </Box>
      )
    }),
    columnHelper.accessor('descripcion', {
      header: 'Descripción',
      cell: ({ row }) => (
        <Typography variant='body2' color='text.secondary' sx={{ maxWidth: 220 }} noWrap>
          {row.original.descripcion || '—'}
        </Typography>
      )
    }),
    columnHelper.accessor('esta_activo', {
      header: 'Estado',
      cell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Switch
            size='small'
            checked={row.original.esta_activo}
            onChange={() => toggleStatus.mutate({ id: row.original.id, esta_activo: !row.original.esta_activo })}
          />
          <Chip
            variant='tonal'
            label={row.original.esta_activo ? 'Activo' : 'Inactivo'}
            color={statusObj[row.original.esta_activo ? 'activo' : 'inactivo']}
            size='small'
          />
        </Box>
      )
    }),
    columnHelper.display({
      id: 'acciones',
      header: () => <div className='w-full text-right'>Acciones</div>,
      cell: ({ row }) => (
        <div className='flex items-center justify-end gap-1'>
          <IconButton onClick={() => { setRecetaToEdit(row.original); setOpenUpdateModal(true) }} title='Editar'>
            <i className='tabler-edit text-[22px] text-textSecondary' />
          </IconButton>
          <IconButton onClick={() => { setRecetaToDelete(row.original); setOpenDeleteModal(true) }} title='Eliminar'>
            <i className='tabler-trash text-[22px] text-textSecondary' />
          </IconButton>
        </div>
      )
    })
  ], [pagination.pageIndex, pagination.pageSize])

  const table = useReactTable({
    data: recetas,
    columns,
    state: { globalFilter, pagination },
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount: totalRecetas,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <Card>
        <CardHeader title='Gestión de Recetas' className='pbe-4' />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField select value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))} className='is-[70px]'>
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <CustomTextField select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className='is-full sm:is-[200px]'>
              <MenuItem value='all'>Todos los estados</MenuItem>
              <MenuItem value='activo'>Activo</MenuItem>
              <MenuItem value='inactivo'>Inactivo</MenuItem>
            </CustomTextField>
            <DebouncedInput value={globalFilter ?? ''} onChange={v => setGlobalFilter(String(v))} placeholder='Buscar receta' className='is-full sm:is-auto' />
            <Button variant='contained' startIcon={<i className='tabler-plus' />} onClick={() => setOpenCreateModal(true)} className='is-full sm:is-auto'>
              Añadir Receta
            </Button>
          </div>
        </div>

        <div className='overflow-x-auto relative'>
          {(isFetching && !isPlaceholderData) && (
            <Box sx={{ position: 'absolute', inset: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(2px)' }}>
              <CircularProgress />
            </Box>
          )}
          <table className={tableStyles.table} style={{ opacity: isFetching ? 0.6 : 1, transition: 'opacity 0.2s' }}>
            <thead>
              {table.getHeaderGroups().map(hg => (
                <tr key={hg.id}>
                  {hg.headers.map(h => (
                    <th key={h.id}>{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}</th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody><tr><td colSpan={table.getVisibleFlatColumns().length} className='text-center'>No hay recetas disponibles</td></tr></tbody>
            ) : (
              <tbody>
                {table.getCoreRowModel().rows.map(row => (
                  <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                    {row.getVisibleCells().map(cell => <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        <TablePagination
          component={() => <TablePaginationComponent table={table as any} />}
          count={totalRecetas}
          rowsPerPage={pagination.pageSize}
          page={pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </Card>

      <RecetasActions
        recetaClicked={recetaToEdit || recetaToDelete}
        addReceta={{ isOpen: openCreateModal, closeHandler: () => setOpenCreateModal(false) }}
        editReceta={{ isOpen: openUpdateModal, closeHandler: () => { setOpenUpdateModal(false); setRecetaToEdit(null) } }}
        deleteReceta={{ isOpen: openDeleteModal, closeHandler: () => { setOpenDeleteModal(false); setRecetaToDelete(null) } }}
        onSuccess={() => refetch()}
      />
    </>
  )
}
