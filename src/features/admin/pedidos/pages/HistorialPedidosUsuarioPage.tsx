'use client'

import { useMemo, useState, useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { getSession } from 'next-auth/react'

import {
  Card,
  CardHeader,
  Chip,
  Typography,
  Box,
  TablePagination,
  Button,
  MenuItem,
  IconButton,
  Tooltip,
  Stack,
  CircularProgress,
  Grid
} from '@mui/material'
import { toast } from 'react-toastify'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel
} from '@tanstack/react-table'
import * as XLSX from 'xlsx'

import classnames from 'classnames'

import type { ColumnDef } from '@tanstack/react-table'

import tableStyles from '@core/styles/table.module.css'

import CustomTextField from '@core/components/mui/TextField'


import type { ThemeColor } from '@/@core/types'
import type { Pedido } from '../entity/Pedido'
import { getDetalleInfo } from '../entity/Pedido'
import { usePedidos, useDeletePedido } from '../hooks/usePedidos'
import { AxiosPedido } from '../http/axiosPedido'
import TablePaginationComponent from '@/utils/components/others/TablePaginationComponent'
import HydratedDate from '@/utils/components/HydratedDate'
import CustomAlertDialog from '@/components/CustomAlertDialog'

type StatusType = {
  [key: string]: ThemeColor
}

const statusObj: StatusType = {
  PENDIENTE: 'warning',
  PROCESANDO: 'info',
  COMPLETADO: 'success',
  CANCELADO: 'secondary',
  REEMBOLSADO: 'error'
}

const columnHelper = createColumnHelper<Pedido>()

interface HistorialPedidosUsuarioPageProps {
  usuarioId: string
  initialData?: Pedido[]
  initialTotal?: number
}

export function HistorialPedidosUsuarioPage({ usuarioId, initialData, initialTotal = 0 }: HistorialPedidosUsuarioPageProps) {
  const router = useRouter()

  // Filtros aplicados a la consulta
  const [estadoFiltro, setEstadoFiltro] = useState('TODOS')
  const [nroPedido, setNroPedido] = useState('')
  const [mesFiltro, setMesFiltro] = useState('')
  const [anioFiltro, setAnioFiltro] = useState('')

  // Estados locales para los inputs
  const [estadoInput, setEstadoInput] = useState('TODOS')
  const [nroPedidoInput, setNroPedidoInput] = useState('')
  const [mesInput, setMesInput] = useState('')
  const [anioInput, setAnioInput] = useState('')

  const handleBuscar = () => {
    setEstadoFiltro(estadoInput)
    setNroPedido(nroPedidoInput)
    setMesFiltro(mesInput)
    setAnioFiltro(anioInput)
    table.setPageIndex(0)
  }

  const handleLimpiar = () => {
    setEstadoInput('TODOS')
    setNroPedidoInput('')
    setMesInput('')
    setAnioInput('')
    setEstadoFiltro('TODOS')
    setNroPedido('')
    setMesFiltro('')
    setAnioFiltro('')
    table.setPageIndex(0)
  }

  const { mutateAsync: deletePedido, isPending: isDeleting } = useDeletePedido()
  const [deleteInfo, setDeleteInfo] = useState<{ open: boolean, id: string | null }>({ open: false, id: null })
  const [isExporting, setIsExporting] = useState(false)

  const handleExportarExcel = async () => {
    setIsExporting(true)

    try {
      const session = await getSession()
      const token = session?.user?.accessToken ?? null
      const axiosPedido = new AxiosPedido({ getAuthToken: () => token })

      const res = await axiosPedido.getAll({ 
        usuario_id: usuarioId,
        estado: estadoFiltro, 
        nro_pedido: nroPedido, 
        mes: mesFiltro,
        anio: anioFiltro,
        limit: '5000' 
      })

      const todos: Pedido[] = res?.pedidos ?? []

      const filas = todos.map(p => ({
        '# Pedido': `#${String(p.numero_pedido).padStart(6, '0')}`,
        'Ítem(s)': p.detalles?.map(d => {
          const { titulo, esEbook } = getDetalleInfo(d)

          return esEbook ? `${titulo} (Paquete)` : titulo
        }).join(' | ') ?? '',
        Total: `${p.moneda} ${Number(p.total).toFixed(2)}`,
        Cupón: p.cupon?.codigo ?? '',
        'Método de pago': p.metodo_pago?.toLowerCase().replace('_', ' ') ?? '',
        Estado: p.estado,
        Fecha: p.creado_en ? new Date(p.creado_en).toLocaleDateString('es-PE') : ''
      }))

      const ws = XLSX.utils.json_to_sheet(filas)
      const wb = XLSX.utils.book_new()

      XLSX.utils.book_append_sheet(wb, ws, 'Pedidos')
      XLSX.writeFile(wb, `pedidos_${new Date().toISOString().slice(0, 10)}.xlsx`)
    } catch {
      toast.error('Error al exportar los pedidos')
    } finally {
      setIsExporting(false)
    }
  }

  const handleDelete = useCallback(async () => {
    if (!deleteInfo.id) return

    try {
      await deletePedido(deleteInfo.id)
      toast.success('Pedido eliminado correctamente')
      setDeleteInfo({ open: false, id: null })
      router.refresh() // Refresca los datos del servidor (initialData)
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar pedido')
    }
  }, [deletePedido, deleteInfo.id, router])

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const { data: pedidosData, isFetching, isPlaceholderData } = usePedidos(
    {
      usuario_id: usuarioId,
      estado: estadoFiltro,
      nro_pedido: nroPedido,
      mes: mesFiltro,
      anio: anioFiltro,
      page: String(pagination.pageIndex + 1),
      limit: String(pagination.pageSize)
    },
    initialData,
    initialTotal
  )

  const pedidos = useMemo(() => {
    if (pedidosData?.pedidos) return pedidosData.pedidos

    if (pagination.pageIndex === 0 && initialData) return initialData

    return []
  }, [pedidosData, initialData, pagination.pageIndex])

  const total = useMemo(() => {
    if (pedidosData?.paginacion?.total !== undefined) return pedidosData.paginacion.total

    if (pagination.pageIndex === 0) return initialTotal

    return 0
  }, [pedidosData, initialTotal, pagination.pageIndex])

  const columns = useMemo<ColumnDef<Pedido, any>[]>(
    () => [
      columnHelper.accessor('numero_pedido', {
        header: '# Pedido',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            #{String(row.original.numero_pedido).padStart(6, '0')}
          </Typography>
        )
      }),
      columnHelper.accessor('detalles', {
        header: 'Ítem(s)',
        cell: ({ row }) => (
          <div className='flex flex-col gap-1'>
            {row.original.detalles?.map((detalle, index) => {
              const { titulo, esEbook } = getDetalleInfo(detalle)

              return (
                <div key={index} className='flex items-center gap-2'>
                  <Typography variant='body2' color='text.primary' sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {titulo}
                  </Typography>
                  <Chip
                    label={esEbook ? 'Paquete' : 'Programa'}
                    size='small'
                    color={esEbook ? 'info' : 'default'}
                    variant='tonal'
                    sx={{ height: 20, fontSize: '0.65rem' }}
                  />
                </div>
              )
            })}
          </div>
        )
      }),
      columnHelper.accessor('total', {
        header: 'Precio',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.moneda} {Number(row.original.total).toFixed(2)}
          </Typography>
        )
      }),
      columnHelper.accessor('cupon', {
        header: 'Cupón',
        cell: ({ row }) => (
          <Typography variant='body2' color='text.secondary'>
            {row.original.cupon?.codigo ? (
              <Chip
                label={row.original.cupon.codigo}
                size='small'
                variant='outlined'
                color='primary'
                sx={{ fontWeight: 600 }}
              />
            ) : (
              '-'
            )}
          </Typography>
        )
      }),
      columnHelper.accessor('metodo_pago', {
        header: 'Método',
        cell: ({ row }) => (
          <Typography variant='body2' className='capitalize'>
            {row.original.metodo_pago?.toLowerCase().replace('_', ' ') || '-'}
          </Typography>
        )
      }),
      columnHelper.accessor('estado', {
        header: 'Estado',
        cell: ({ row }) => (
          <Stack direction='column' spacing={0.5} alignItems='flex-start'>
            <Chip
              variant='tonal'
              label={row.original.estado}
              color={statusObj[row.original.estado] || 'default'}
              size='small'
              className='font-medium'
            />
            {(row.original as any).comprobante_url && row.original.estado === 'PENDIENTE' && (
              <Chip
                icon={<i className='tabler-photo' style={{ fontSize: 12 }} />}
                label='Voucher adjunto'
                size='small'
                color='info'
                variant='outlined'
                sx={{ fontSize: 10, height: 20 }}
              />
            )}
          </Stack>
        )
      }),
      columnHelper.accessor('creado_en', {
        header: 'Fecha',
        cell: ({ row }) => (
          <Typography variant='body2'>
            <HydratedDate
              date={row.original.creado_en}
              format="date"
              options={{
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              }}
            />
          </Typography>
        )
      }),
      columnHelper.display({
        id: 'acciones',
        header: () => <div className='w-full text-right'>Acciones</div>,
        cell: ({ row }) => (
          <div className='flex items-center justify-end w-full gap-1'>
            <Tooltip title='Ver Detalle'>
              <IconButton onClick={() => router.push(`/admin/pedidos/detalle/${row.original.id}`)}>
                <i className='tabler-eye text-[22px] text-primary' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Editar'>
              <IconButton onClick={() => router.push(`/admin/pedidos/editar/${row.original.id}`)}>
                <i className='tabler-edit text-[22px] text-textSecondary' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Eliminar'>
              <IconButton onClick={() => setDeleteInfo({ open: true, id: row.original.id })}>
                <i className='tabler-trash text-[22px] text-error' />
              </IconButton>
            </Tooltip>
          </div>
        )
      })
    ],
    [router]
  )

  const table = useReactTable({
    data: pedidos,
    columns,
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    rowCount: total
  })



  return (
    <Card>
      <CardHeader 
        title='Historial de Pedidos del Estudiante' 
        className='pbe-4' 
        action={
          <Button 
            variant="text" 
            color="secondary" 
            startIcon={<i className='tabler-arrow-left' />} 
            onClick={() => router.push('/admin/pedidos')}
          >
            Volver a pedidos
          </Button>
        }
      />
      <Grid container spacing={4} className='p-6 border-bs' alignItems="flex-end">
        {/* Fila 1 */}
        <Grid item xs={12} sm={4} md={1}>
          <CustomTextField
            select
            fullWidth
            label="Mostrar"
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
        </Grid>

        <Grid item xs={12} sm={8} md={2}>
          <CustomTextField
            select
            fullWidth
            label="Estado"
            value={estadoInput}
            onChange={e => setEstadoInput(e.target.value)}
          >
            <MenuItem value='TODOS'>Todos</MenuItem>
            <MenuItem value='COMPLETADO'>Pagados (Completados)</MenuItem>
            <MenuItem value='PENDIENTE'>Pendientes</MenuItem>
            <MenuItem value='CANCELADO'>Cancelados</MenuItem>
          </CustomTextField>
        </Grid>

        <Grid item xs={12} sm={4} md={2}>
          <CustomTextField
            fullWidth
            value={nroPedidoInput}
            onChange={e => setNroPedidoInput(e.target.value)}
            label='Nº Pedido'
            placeholder='Buscar...'
          />
        </Grid>

        <Grid item xs={12} sm={4} md={2}>
          <CustomTextField
            select
            fullWidth
            label="Mes"
            value={mesInput}
            onChange={e => setMesInput(e.target.value)}
          >
            <MenuItem value=''>Todos</MenuItem>
            <MenuItem value='1'>Enero</MenuItem>
            <MenuItem value='2'>Febrero</MenuItem>
            <MenuItem value='3'>Marzo</MenuItem>
            <MenuItem value='4'>Abril</MenuItem>
            <MenuItem value='5'>Mayo</MenuItem>
            <MenuItem value='6'>Junio</MenuItem>
            <MenuItem value='7'>Julio</MenuItem>
            <MenuItem value='8'>Agosto</MenuItem>
            <MenuItem value='9'>Septiembre</MenuItem>
            <MenuItem value='10'>Octubre</MenuItem>
            <MenuItem value='11'>Noviembre</MenuItem>
            <MenuItem value='12'>Diciembre</MenuItem>
          </CustomTextField>
        </Grid>

        <Grid item xs={12} sm={4} md={2}>
          <CustomTextField
            select
            fullWidth
            label="Año"
            value={anioInput}
            onChange={e => setAnioInput(e.target.value)}
          >
            <MenuItem value=''>Todos</MenuItem>
            {Array.from({ length: new Date().getFullYear() - 2024 + 1 }, (_, i) => 2024 + i).map(year => (
              <MenuItem key={year} value={String(year)}>{year}</MenuItem>
            ))}
          </CustomTextField>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant='body2' sx={{ mb: 1, visibility: 'hidden' }}>
            Acciones
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant='contained'
              color='primary'
              startIcon={<i className='tabler-search' />}
              onClick={handleBuscar}
            >
              Buscar
            </Button>
            <Button
              variant='tonal'
              color='secondary'
              startIcon={<i className='tabler-trash' />}
              onClick={handleLimpiar}
            >
              Limpiar
            </Button>
          </Box>
        </Grid>

        {/* Fila 2 - Botones */}
        <Grid item xs={12} display="flex" justifyContent={{ xs: 'center', sm: 'flex-end' }} gap={2} flexWrap="wrap">
          <Button
            variant='contained'
            color='success'
            startIcon={isExporting ? <CircularProgress size={16} color='inherit' /> : <i className='tabler-file-spreadsheet' />}
            onClick={handleExportarExcel}
            disabled={isExporting}
          >
            {isExporting ? 'Exportando...' : 'Exportar Excel'}
          </Button>
          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={() => router.push('/admin/pedidos/nuevo')}
          >
            Nuevo Pedido
          </Button>
        </Grid>
      </Grid>

      <div className='overflow-x-auto relative'>
        {(isFetching && !isPlaceholderData) && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(2px)',
              transition: 'opacity 0.2s'
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <table className={tableStyles.table} style={{ opacity: isFetching ? 0.6 : 1, transition: 'opacity 0.2s' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <i className='tabler-chevron-up text-xl ml-1' />,
                          desc: <i className='tabler-chevron-down text-xl ml-1' />
                        }[header.column.getIsSorted() as 'asc' | 'desc']}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getCoreRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className='text-center p-6'>
                  No se encontraron pedidos
                </td>
              </tr>
            ) : (
              table.getCoreRowModel().rows.map(row => (
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
        count={total}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => table.setPageIndex(page)}
      />

      <CustomAlertDialog
        open={deleteInfo.open}
        title="Eliminar Pedido"
        description="¿Estás seguro de que deseas eliminar este pedido permanentemente y revocar sus inscripciones asociadas?"
        confirmText="Eliminar"
        onConfirm={handleDelete}
        onClose={() => setDeleteInfo({ open: false, id: null })}
        loading={isDeleting}
        color="error"
      />
    </Card>
  )
}
