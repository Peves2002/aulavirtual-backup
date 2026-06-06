'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box, Button, Chip, Typography, TextField, InputAdornment,
  Card, CardContent, Avatar, Stack, LinearProgress
} from '@mui/material'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useProductosIA } from '../hooks/useProductosIA'
import ProductoIAActions from '../components/ProductoIAActions'
import type { ProductoIAListaItem, EstadoProductoIA } from '../entity/ProductoIA'

const ESTADO_COLORS: Record<EstadoProductoIA, 'default' | 'success' | 'warning'> = {
  BORRADOR: 'default',
  PUBLICADO: 'success',
  ARCHIVADO: 'warning'
}

const helper = createColumnHelper<ProductoIAListaItem>()

export default function ProductosIAPage({ initialData }: { initialData?: ProductoIAListaItem[] }) {
  const router = useRouter()
  const { data = initialData ?? [], isLoading } = useProductosIA()
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo(() => [
    helper.accessor('miniatura', {
      header: '',
      cell: info => (
        <Avatar src={info.getValue() || ''} variant="rounded" sx={{ width: 48, height: 48, bgcolor: 'primary.light' }}>
          <i className="tabler-robot text-[22px]" />
        </Avatar>
      ),
      enableSorting: false
    }),
    helper.accessor('titulo', {
      header: 'Producto',
      cell: info => (
        <Box>
          <Typography fontWeight={700} fontSize="0.875rem">{info.getValue()}</Typography>
          {info.row.original.categoria && (
            <Typography variant="caption" color="text.secondary">{info.row.original.categoria}</Typography>
          )}
        </Box>
      )
    }),
    helper.accessor('precio', {
      header: 'Precio',
      cell: info => (
        <Typography fontWeight={600} color="primary.main">
          {info.row.original.es_gratis ? 'Gratis' : `${info.row.original.moneda} ${Number(info.getValue()).toFixed(2)}`}
        </Typography>
      )
    }),
    helper.accessor('estado', {
      header: 'Estado',
      cell: info => <Chip label={info.getValue()} size="small" color={ESTADO_COLORS[info.getValue()]} />
    }),
    helper.display({
      id: 'acciones',
      header: 'Acciones',
      cell: info => <ProductoIAActions row={info.row.original} />
    })
  ], [])

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  })

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h4" fontWeight={800}>Productos IA (GPTs)</Typography>
          <Typography color="text.secondary">Gestiona los GPTs del Marketplace</Typography>
        </Box>
        <Button variant="contained" startIcon={<i className="tabler-plus" />} onClick={() => router.push('/admin/productos-ia/nuevo')}>
          Nuevo Producto IA
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3, maxWidth: 400 }}>
            <TextField
              fullWidth size="small" placeholder="Buscar..."
              value={globalFilter} onChange={e => setGlobalFilter(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><i className="tabler-search" /></InputAdornment> }}
            />
          </Box>

          {isLoading && <LinearProgress sx={{ mb: 2 }} />}

          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                {table.getHeaderGroups().map(hg => (
                  <tr key={hg.id}>
                    {hg.headers.map(h => (
                      <th key={h.id} style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,0.1)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>
                        {flexRender(h.column.columnDef.header, h.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} style={{ padding: '12px 16px' }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>

          {data.length === 0 && !isLoading && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography color="text.secondary">No hay productos IA creados aún.</Typography>
              <Button sx={{ mt: 2 }} variant="outlined" onClick={() => router.push('/admin/productos-ia/nuevo')}>
                Crear el primero
              </Button>
            </Box>
          )}

          <Stack direction="row" justifyContent="flex-end" alignItems="center" gap={1} mt={3}>
            <Button size="small" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Anterior</Button>
            <Typography variant="caption">{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}</Typography>
            <Button size="small" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Siguiente</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
