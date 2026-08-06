'use client'

import { useMemo, useState } from 'react'

// MUI Imports
import {
  Button,
  Card,
  CardHeader,
  Chip,
  MenuItem,
  TablePagination,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material'

// Table & Utils Imports
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'

import classnames from 'classnames'
import * as XLSX from 'xlsx'

// Core & Custom Components
import type { LeadPortada } from '@prisma/client'

import tableStyles from '@core/styles/table.module.css'
import CustomTextField from '@/@core/components/mui/TextField'
import { DebouncedInput } from '@/utils/components/others/DebouncedInput'
import TablePaginationComponent from '@/utils/components/others/TablePaginationComponent'


// Custom filter for global search (Nombre o DNI)
const globalSearchFilter: FilterFn<any> = (row, columnId, value) => {
  const searchVal = (value || '').toLowerCase()

  if (!searchVal) return true
  
  const nombres = (row.original.nombres || '').toLowerCase()
  const apellidos = (row.original.apellidos || '').toLowerCase()
  const dni = (row.original.dni || '').toLowerCase()
  
  return (
    nombres.includes(searchVal) ||
    apellidos.includes(searchVal) ||
    dni.includes(searchVal) ||
    `${nombres} ${apellidos}`.includes(searchVal)
  )
}

const columnHelper = createColumnHelper<LeadPortada>()

interface InscripcionesClientPageProps {
  inscripciones: LeadPortada[]
}

export default function InscripcionesClientPage({ inscripciones }: InscripcionesClientPageProps) {
  const [globalFilter, setGlobalFilter] = useState('')
  const [escuelaFilter, setEscuelaFilter] = useState<string>('all')

  // Obtener listas únicas para los selectores
  const escuelasUnicas = useMemo(() => {
    const escuelas = inscripciones.map(i => i.escuela).filter((e): e is string => !!e)

    return Array.from(new Set(escuelas)).sort()
  }, [inscripciones])

  // Filtrado de datos
  const filteredData = useMemo(() => {
    let data = inscripciones

    if (escuelaFilter !== 'all') {
      data = data.filter(i => i.escuela === escuelaFilter)
    }

    return data
  }, [inscripciones, escuelaFilter])

  const columns = useMemo<ColumnDef<LeadPortada, any>[]>(
    () => [
      columnHelper.display({
        id: 'nombres_apellidos',
        header: 'Nombres y Apellidos',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.nombres} {row.original.apellidos}
          </Typography>
        )
      }),
      columnHelper.accessor('dni', {
        header: 'DNI',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.dni}</Typography>
      }),
      columnHelper.accessor('celular', {
        header: 'Celular',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.celular}</Typography>
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.email}</Typography>
      }),
      columnHelper.accessor('escuela', {
        header: 'Escuela',
        cell: ({ row }) => (
          <Chip label={row.original.escuela} color="primary" variant="outlined" size="small" />
        )
      }),
      columnHelper.accessor('creado_en', {
        header: 'Fecha',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {new Date(row.original.creado_en).toLocaleDateString('es-PE', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Typography>
        )
      }),
      columnHelper.display({
        id: 'acciones',
        header: 'Acciones',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Tooltip title='Ver'>
              <IconButton size='small' onClick={() => console.log('View', row.original.id)}>
                <i className='tabler-eye text-textSecondary' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Editar'>
              <IconButton size='small' onClick={() => console.log('Edit', row.original.id)}>
                <i className='tabler-edit text-textSecondary' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Eliminar'>
              <IconButton size='small' onClick={() => console.log('Delete', row.original.id)}>
                <i className='tabler-trash text-textSecondary' />
              </IconButton>
            </Tooltip>
          </div>
        )
      })
    ],
    []
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      globalSearch: globalSearchFilter
    },
    state: {
      globalFilter
    },
    globalFilterFn: globalSearchFilter,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10
      }
    }
  })

  // Exportar a Excel
  const handleExportExcel = () => {
    // Obtener los datos actuales de la tabla (después de aplicar todos los filtros)
    const currentData = table.getFilteredRowModel().rows.map(row => row.original)

    if (currentData.length === 0) {
      alert("No hay datos para exportar")
      
return
    }

    const dataToExport = currentData.map(item => ({
      'Nombres': item.nombres,
      'Apellidos': item.apellidos,
      'Email': item.email,
      'WhatsApp': item.celular,
      'Escuela': item.escuela,
      'País': item.pais,
      'Ciudad': item.ciudad,
      'Profesión': item.profesion,
      'Detalle': item.detalle
    }))

    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inscripciones')

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `Inscripciones_${new Date().getTime()}.xlsx`)
  }

  return (
    <Card>
      <CardHeader title='Gestión de Inscripciones (Portadas)' className='pbe-4' />
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
          <CustomTextField
            select
            value={escuelaFilter}
            onChange={e => {
              setEscuelaFilter(e.target.value)
              table.setPageIndex(0)
            }}
            className='is-full sm:is-[200px]'
          >
            <MenuItem value='all'>Todas las Escuelas</MenuItem>
            {escuelasUnicas.map(escuela => (
              <MenuItem key={escuela} value={escuela}>{escuela}</MenuItem>
            ))}
          </CustomTextField>

          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => {
              setGlobalFilter(String(value))
              table.setPageIndex(0)
            }}
            placeholder='Buscar por Nombre o DNI'
            className='is-full sm:is-auto'
          />
          
          <Button
            variant='contained'
            color='success'
            startIcon={<i className='tabler-file-spreadsheet' />}
            onClick={handleExportExcel}
            className='is-full sm:is-auto'
          >
            Exportar Excel
          </Button>
        </div>
      </div>

      <div className='overflow-x-auto relative'>
        <table className={tableStyles.table}>
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
                        {
                          {
                            asc: <i className='tabler-chevron-up text-xl' />,
                            desc: <i className='tabler-chevron-down text-xl' />
                          }[header.column.getIsSorted() as 'asc' | 'desc']
                        }
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center py-10'>
                  No hay inscripciones registradas.
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponent table={table as any} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => table.setPageIndex(page)}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Card>
  )
}
