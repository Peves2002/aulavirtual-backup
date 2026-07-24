'use client'

import { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import { getSession } from 'next-auth/react'

import {
  Card,
  CardHeader,
  Typography,
  Box,
  TablePagination,
  Button,
  MenuItem,
  IconButton,
  Tooltip,
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
import { getDetalleInfo } from '../entity/Pedido'

import { usePedidosAgrupados } from '../hooks/usePedidos'
import { AxiosPedido } from '../http/axiosPedido'
import TablePaginationComponent from '@/utils/components/others/TablePaginationComponent'
import { ubigeoPeru, departamentos } from '@/utils/constants/ubigeo'

interface UsuarioAgrupado {
  usuario_id: string
  nombre: string
  apellido: string
  correo: string
  departamento: string | null
  provincia: string | null
  total_pagado: number
  moneda: string
  cantidad_pedidos_pagados: number
}

const columnHelper = createColumnHelper<UsuarioAgrupado>()

interface PedidosPageProps {
  initialData?: any[]
  initialTotal?: number
}

export function PedidosPage({ initialData, initialTotal = 0 }: PedidosPageProps) {
  const router = useRouter()
  // Filtros aplicados a la consulta
  const [nombre, setNombre] = useState('')
  const [departamentoFiltro, setDepartamentoFiltro] = useState('')
  const [provinciaFiltro, setProvinciaFiltro] = useState('')

  // Estados locales para los inputs
  const [nombreInput, setNombreInput] = useState('')
  const [departamentoInput, setDepartamentoInput] = useState('')
  const [provinciaInput, setProvinciaInput] = useState('')

  const handleBuscar = () => {
    setNombre(nombreInput)
    setDepartamentoFiltro(departamentoInput)
    setProvinciaFiltro(provinciaInput)
    table.setPageIndex(0)
  }

  const handleLimpiar = () => {
    setNombreInput('')
    setDepartamentoInput('')
    setProvinciaInput('')
    setNombre('')
    setDepartamentoFiltro('')
    setProvinciaFiltro('')
    table.setPageIndex(0)
  }

  const [isExporting, setIsExporting] = useState(false)

  const handleExportarExcel = async () => {
    setIsExporting(true)

    try {
      const session = await getSession()
      const token = session?.user?.accessToken ?? null
      const axiosPedido = new AxiosPedido({ getAuthToken: () => token })
      
      // Para exportar más detallado, traemos los pedidos individuales que coincidan con estos filtros
      const res = await axiosPedido.getAll({ 
        nombre, 
        departamento: departamentoFiltro,
        provincia: provinciaFiltro,
        limit: '5000' 
      })
      const todos = res?.pedidos ?? []

      const filas = todos.map(p => ({
        '# Pedido': `#${String(p.numero_pedido).padStart(6, '0')}`,
        Estudiante: `${p.usuario?.nombre ?? ''} ${p.usuario?.apellido ?? ''}`.trim(),
        Correo: p.usuario?.correo ?? '',
        Departamento: (p.usuario as any)?.departamento ?? '-',
        Provincia: (p.usuario as any)?.provincia ?? '-',
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

      XLSX.utils.book_append_sheet(wb, ws, 'Pedidos (Detallado)')
      XLSX.writeFile(wb, `pedidos_detallado_${new Date().toISOString().slice(0, 10)}.xlsx`)
    } catch {
      toast.error('Error al exportar los pedidos')
    } finally {
      setIsExporting(false)
    }
  }

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const { data: agrupadosData, isFetching, isPlaceholderData } = usePedidosAgrupados(
    {
      nombre,
      departamento: departamentoFiltro,
      provincia: provinciaFiltro,
      page: String(pagination.pageIndex + 1),
      limit: String(pagination.pageSize)
    },
    initialData,
    initialTotal
  )

  const agrupados = useMemo(() => {
    if (agrupadosData?.agrupados) return agrupadosData.agrupados

    if (pagination.pageIndex === 0 && initialData) return initialData

    return []
  }, [agrupadosData, initialData, pagination.pageIndex])

  const total = useMemo(() => {
    if (agrupadosData?.paginacion?.total !== undefined) return agrupadosData.paginacion.total

    if (pagination.pageIndex === 0) return initialTotal

    return 0
  }, [agrupadosData, initialTotal, pagination.pageIndex])

  const columns = useMemo<ColumnDef<UsuarioAgrupado, any>[]>(
    () => [
      columnHelper.accessor('nombre', {
        header: 'Estudiante',
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {row.original.nombre} {row.original.apellido}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {row.original.correo}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('departamento', {
        id: 'ubicacion',
        header: 'Ubicación',
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium capitalize'>
              {row.original.departamento?.toLowerCase() || '-'}
            </Typography>
            <Typography variant='caption' color='text.secondary' className='capitalize'>
              {row.original.provincia?.toLowerCase() || '-'}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('total_pagado', {
        header: 'Total Pagado',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.moneda} {Number(row.original.total_pagado).toFixed(2)}
          </Typography>
        )
      }),
      columnHelper.display({
        id: 'acciones',
        header: () => <div className='w-full text-right'>Acciones</div>,
        cell: ({ row }) => (
          <div className='flex items-center justify-end w-full gap-1'>
            <Tooltip title='Inspeccionar pedidos del estudiante'>
              <IconButton onClick={() => router.push(`/admin/pedidos/usuario/${row.original.usuario_id}`)}>
                <i className='tabler-search text-[22px] text-primary' />
              </IconButton>
            </Tooltip>
          </div>
        )
      })
    ],
    [router]
  )

  const table = useReactTable({
    data: agrupados,
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
      <CardHeader title='Gestión de Pedidos' className='pbe-4' />
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
            fullWidth
            value={nombreInput}
            onChange={e => setNombreInput(e.target.value)}
            label='Estudiante'
            placeholder='Buscar nombre o correo...'
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <CustomTextField
            select
            fullWidth
            label="Departamento"
            value={departamentoInput}
            onChange={e => {
              setDepartamentoInput(e.target.value)
              setProvinciaInput('')
            }}
          >
            <MenuItem value=''>Todos</MenuItem>
            {departamentos.map(dep => <MenuItem key={dep} value={dep}>{dep}</MenuItem>)}
          </CustomTextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <CustomTextField
            select
            fullWidth
            label="Provincia"
            value={provinciaInput}
            onChange={e => setProvinciaInput(e.target.value)}
            disabled={!departamentoInput}
          >
            <MenuItem value=''>Todas</MenuItem>
            {departamentoInput && ubigeoPeru[departamentoInput]?.map(prov => (
              <MenuItem key={prov} value={prov}>{prov}</MenuItem>
            ))}
          </CustomTextField>
        </Grid>

        <Grid item xs={12} md={5}>
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
                  No se encontraron estudiantes
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
    </Card>
  )
}
