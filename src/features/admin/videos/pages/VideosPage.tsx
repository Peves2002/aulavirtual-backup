'use client'

import { useCallback, useMemo, useState } from 'react'

import {
  Button,
  Card,
  CardHeader,
  IconButton,
  Typography,
  Box,
  Avatar,
  Tooltip,
  TablePagination,
  MenuItem,
  Link as MuiLink,
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

import tableStyles from '@core/styles/table.module.css'
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@/utils/components/others/TablePaginationComponent'
import { DebouncedInput } from '@/utils/components/others/DebouncedInput'

import type { Video } from '../entity/Video'
import { useAdminVideos, useDeleteVideo } from '../hooks/useVideos'
import { VideoFormModal } from '../components/VideoFormModal'
import { getYouTubeVideoId } from '../utils/video'

const columnHelper = createColumnHelper<Video>()

export const VideosPage = () => {
  const { data: videos = [], isLoading } = useAdminVideos()
  const deleteVideo = useDeleteVideo()

  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState<Video | null>(null)
  const [globalFilter, setGlobalFilter] = useState('')

  const handleEdit = useCallback((video: Video) => {
    setSelected(video)
    setOpenModal(true)
  }, [])

  const handleDelete = useCallback(
    async (id: string) => {
      const result = await Swal.fire({
        title: '¿Eliminar video?',
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
          await deleteVideo.mutateAsync(id)
          Swal.fire({ title: 'Eliminado', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 })
        } catch {
          Swal.fire({ title: 'Error', text: 'No se pudo eliminar el video', icon: 'error' })
        }
      }
    },
    [deleteVideo],
  )

  const columns = useMemo<ColumnDef<Video, any>[]>(
    () => [
      columnHelper.accessor('titulo', {
        header: 'Video',
        cell: ({ row }) => {
          const videoId = getYouTubeVideoId(row.original.url)
          const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : ''

          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                variant='rounded'
                src={thumbnail}
                sx={{ width: 80, height: 45, bgcolor: 'action.hover' }}
              >
                <i className='tabler-video text-xl' />
              </Avatar>
              <Box>
                <Typography variant='body2' fontWeight={600} noWrap sx={{ maxWidth: 260 }}>
                  {row.original.titulo || 'Video de YouTube'}
                </Typography>
                <MuiLink
                  href={row.original.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='caption'
                  color='primary'
                  sx={{ display: 'block', maxWidth: 260, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                  {row.original.url}
                </MuiLink>
              </Box>
            </Box>
          )
        },
      }),
      columnHelper.accessor('creado_en', {
        header: 'Fecha de creación',
        cell: ({ row }) => (
          <Typography variant='body2' color='text.secondary'>
            {new Date(row.original.creado_en).toLocaleDateString('es-PE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        ),
      }),
      columnHelper.display({
        id: 'acciones',
        header: () => <div className='w-full text-right'>Acciones</div>,
        cell: ({ row }) => (
          <div className='flex items-center justify-end gap-1'>
            <Tooltip title='Editar'>
              <IconButton size='small' onClick={() => handleEdit(row.original)}>
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
    [handleDelete, handleEdit],
  )

  const table = useReactTable({
    data: videos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
    state: { globalFilter },
    initialState: { pagination: { pageSize: 10 } },
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <>
      <Card>
        <CardHeader title='Gestión de Videos de YouTube' className='pbe-4' />
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
              placeholder='Buscar video'
              className='is-full sm:is-auto'
            />
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => {
                setSelected(null)
                setOpenModal(true)
              }}
              className='is-full sm:is-auto'
            >
              Nuevo Video
            </Button>
          </div>
        </div>

        <div className='overflow-x-auto relative min-h-[200px]'>
          {isLoading && (
            <div className='absolute inset-0 bg-white/50 z-10 flex items-center justify-center'>
              <Typography variant='body2'>Cargando videos...</Typography>
            </div>
          )}
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(hg => (
                <tr key={hg.id}>
                  {hg.headers.map(h => (
                    <th key={h.id}>{flexRender(h.column.columnDef.header, h.getContext())}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getFilteredRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No hay videos registrados
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                     {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <TablePagination
          component={() => <TablePaginationComponent table={table as any} />}
          count={videos.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
        />
      </Card>

      <VideoFormModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        video={selected}
      />
    </>
  )
}
