'use client'
/* eslint-disable padding-line-between-statements, newline-before-return, import/order */

import { useState } from 'react'

import { 
  Box, 
  Button, 
  Card, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip
} from '@mui/material'
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2'

import ViewLeadModal from './components/ViewLeadModal'
import EditLeadModal from './components/EditLeadModal'

export default function LeadsTable({ leads, isEventTab, onUpdateLead, onDeleteLead }: { leads: any[], isEventTab: boolean, onUpdateLead: (lead: any) => void, onDeleteLead: (id: string) => void }) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('ALL')

  // Modals state
  const [viewLead, setViewLead] = useState<any>(null)
  const [editLead, setEditLead] = useState<any>(null)

  const parseDetalle = (detalle: string | null) => {
    if (!detalle) return { lugarTrabajo: '-', eventName: '-' }
    const lugarMatch = detalle.match(/Lugar de trabajo:\s*([^|]+)/)
    const eventMatch = detalle.match(/Registro al evento:\s*(.+)/)
    return {
      lugarTrabajo: lugarMatch ? lugarMatch[1].trim() : '-',
      eventName: eventMatch ? eventMatch[1].trim() : '-'
    }
  }

  const getEventOrProgram = (lead: any) => {
    if (lead.escuela === 'Registro de Evento') {
      return parseDetalle(lead.detalle).eventName
    }
    return lead.escuela || '-'
  }

  const uniqueTypes = Array.from(new Set(leads.map(getEventOrProgram))).filter(t => t && t !== '-')

  const filteredLeads = leads.filter(lead => {
    const term = search.toLowerCase().trim()
    const matchesFilter = filterType === 'ALL' || getEventOrProgram(lead) === filterType

    if (!term) return matchesFilter

    const nombres = (lead.nombres || '').toLowerCase()
    const apellidos = (lead.apellidos || '').toLowerCase()
    const nombreCompleto = `${nombres} ${apellidos}`.trim()
    const dni = (lead.dni || '').toLowerCase()
    const email = (lead.email || '').toLowerCase()

    const matchesSearch = nombreCompleto.includes(term) || dni.includes(term) || email.includes(term)

    return matchesSearch && matchesFilter
  })

  const getCompanyOrDetail = (lead: any) => {
    if (lead.escuela === 'Registro de Evento') {
      return parseDetalle(lead.detalle).lugarTrabajo
    }
    return lead.detalle || '-'
  }

  const handleDelete = (id: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto! El registro se eliminará de forma permanente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' })

          if (res.ok) {
            Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success')
            onDeleteLead(id)
          } else {
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error')
          }
        } catch (error) {
          Swal.fire('Error', 'Ocurrió un error de red.', 'error')
        }
      }
    })
  }

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage)

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (val: string) => {
    setSearch(val)
    setPage(0)
  }

  const handleExportExcel = () => {
    if (!filteredLeads.length) return

    const exportData = filteredLeads.map(l => {
      return {
        'Fecha': new Date(l.creado_en).toLocaleString('es-PE'),
        'Nombres': l.nombres || '',
        'Apellidos': l.apellidos || '',
        'DNI': l.dni || '',
        'Email': l.email || '',
        'Celular': l.celular || '',
        'Cargo/Profesion': l.profesion || '',
        'Empresa/Lugar de Trabajo': getCompanyOrDetail(l),
        'Programa/Evento': getEventOrProgram(l),
        'Detalle Completo': l.detalle || ''
      }
    })

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, isEventTab ? 'Eventos' : 'Programas')
    XLSX.writeFile(workbook, `leads_${isEventTab ? 'eventos' : 'programas'}_${new Date().getTime()}.xlsx`)
  }

  return (
    <Card>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', flexGrow: 1 }}>
          <TextField
            size="small"
            placeholder="Buscar por DNI, Nombre o Email..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            sx={{ minWidth: 280 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <i className="tabler-search text-textSecondary text-xl" />
                </InputAdornment>
              )
            }}
          />
          <TextField
            select
            size="small"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value)
              setPage(0)
            }}
            SelectProps={{ native: true }}
            sx={{ minWidth: 220 }}
          >
            <option value="ALL">Todos los {isEventTab ? 'Eventos' : 'Programas'}</option>
            {uniqueTypes.map((t, idx) => (
              <option key={idx} value={t as string}>{t}</option>
            ))}
          </TextField>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Total: {filteredLeads.length}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleExportExcel}
            startIcon={<i className="tabler-file-spreadsheet" />}
          >
            Exportar Excel
          </Button>
        </Box>
      </Box>
      
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>{isEventTab ? 'Empresa' : 'Detalle / Edad'}</TableCell>
              <TableCell>{isEventTab ? 'Evento' : 'Programa'}</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((lead) => (
                <TableRow key={lead.id} hover>
                  <TableCell>
                    <Typography variant="body2" suppressHydrationWarning>{new Date(lead.creado_en).toLocaleDateString('es-PE')}</Typography>
                    <Typography variant="caption" color="text.secondary" suppressHydrationWarning>{new Date(lead.creado_en).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit'})}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>{lead.nombres} {lead.apellidos}</Typography>
                    {lead.dni && <Typography variant="caption" color="text.secondary">DNI: {lead.dni}</Typography>}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{lead.email}</Typography>
                    <Typography variant="caption" color="text.secondary">{lead.celular}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{getCompanyOrDetail(lead)}</Typography>
                    {lead.profesion && <Typography variant="caption" color="text.secondary">{lead.profesion}</Typography>}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="primary">{getEventOrProgram(lead)}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Tooltip title="Ver detalles">
                        <IconButton size="small" color="info" onClick={() => setViewLead(lead)}>
                          <i className="tabler-eye" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton size="small" color="primary" onClick={() => setEditLead(lead)}>
                          <i className="tabler-edit" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton size="small" color="error" onClick={() => handleDelete(lead.id)}>
                          <i className="tabler-trash" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            {filteredLeads.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">No se encontraron registros</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredLeads.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
      />

      <ViewLeadModal open={!!viewLead} handleClose={() => setViewLead(null)} lead={viewLead} />
      <EditLeadModal 
        open={!!editLead} 
        handleClose={() => setEditLead(null)} 
        lead={editLead} 
        onUpdated={onUpdateLead} 
      />
    </Card>
  )
}
