'use client'

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
  InputAdornment
} from '@mui/material'
import * as XLSX from 'xlsx'

export default function LeadsTable({ leads }: { leads: any[] }) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch] = useState('')

  const filteredLeads = leads.filter(lead => {
    const term = search.toLowerCase().trim()

    if (!term) return true

    const nombres = (lead.nombres || '').toLowerCase()
    const apellidos = (lead.apellidos || '').toLowerCase()
    const nombreCompleto = `${nombres} ${apellidos}`.trim()
    const dni = (lead.dni || '').toLowerCase()

    return nombreCompleto.includes(term) || dni.includes(term)
  })

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (val: string) => {
    setSearch(val)
    setPage(0)
  }

  // Analizar el campo detalle para extraer el lugar de trabajo y el nombre del evento
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
      const parsed = parseDetalle(lead.detalle)

      return parsed.eventName
    }

    return lead.escuela || '-'
  }

  const getCompanyOrDetail = (lead: any) => {
    if (lead.escuela === 'Registro de Evento') {
      const parsed = parseDetalle(lead.detalle)

      return parsed.lugarTrabajo
    }

    return lead.detalle || '-'
  }

  const handleExportExcel = () => {
    if (!filteredLeads.length) return

    const exportData = filteredLeads.map(l => {
      const eventOrProg = getEventOrProgram(l)
      const companyOrDet = getCompanyOrDetail(l)
      
      return {
        'Fecha': new Date(l.creado_en).toLocaleString('es-PE'),
        'Nombres': l.nombres || '',
        'Apellidos': l.apellidos || '',
        'DNI': l.dni || '',
        'Email': l.email || '',
        'Celular': l.celular || '',
        'Cargo/Profesion': l.profesion || '',
        'Empresa/Lugar de Trabajo': companyOrDet,
        'Programa/Evento': eventOrProg,
        'Detalle Completo': l.detalle || ''
      }
    })

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registros de Eventos')
    XLSX.writeFile(workbook, `registros_eventos_${new Date().getTime()}.xlsx`)
  }

  return (
    <Card>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          placeholder="Buscar por DNI o Nombre..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          sx={{ minWidth: 260 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <i className="tabler-search text-textSecondary text-xl" />
              </InputAdornment>
            )
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Total de registros: {filteredLeads.length}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleExportExcel}
            startIcon={<i className="tabler-file-spreadsheet" />}
          >
            Exportar a Excel
          </Button>
        </Box>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Celular</TableCell>
              <TableCell>Cargo/Profesión</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Programa/Evento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{new Date(lead.creado_en).toLocaleDateString('es-PE')}</TableCell>
                  <TableCell>{lead.nombres} {lead.apellidos}</TableCell>
                  <TableCell>{lead.dni || '-'}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.celular}</TableCell>
                  <TableCell>{lead.profesion || '-'}</TableCell>
                  <TableCell>{getCompanyOrDetail(lead)}</TableCell>
                  <TableCell>{getEventOrProgram(lead)}</TableCell>
                </TableRow>
              ))}
            {filteredLeads.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">No hay registros cargados</TableCell>
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
      />
    </Card>
  )
}
