const fs = require('fs');
const path = require('path');

const leadsDir = path.join(__dirname, 'src', 'app', '(dashboard)', 'admin', 'leads');
if (!fs.existsSync(leadsDir)) {
  fs.mkdirSync(leadsDir, { recursive: true });
}

const pageCode = `import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { Typography, Box } from '@mui/material'
import prisma from '@/utils/libs/prisma'
import { getAuthOptions } from '@/utils/configs/auth'
import LeadsTable from './LeadsTable'

export const metadata = {
  title: 'Leads (Formularios) | Aula Virtual'
}

export default async function LeadsPage() {
  const options = await getAuthOptions()
  const session = await getServerSession(options)

  if (!session) {
    redirect('/login')
  }

  const leads = await prisma.leadPortada.findMany({
    orderBy: { creado_en: 'desc' }
  })

  return (
    <Box>
      <Typography variant='h4' sx={{ mb: 6, fontWeight: 600 }}>
        Leads Recibidos
      </Typography>
      <LeadsTable leads={leads} />
    </Box>
  )
}
`;

fs.writeFileSync(path.join(leadsDir, 'page.tsx'), pageCode, 'utf8');

const tableCode = `'use client'

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
  TablePagination
} from '@mui/material'

export default function LeadsTable({ leads }: { leads: any[] }) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleExportCSV = () => {
    if (!leads.length) return

    const headers = [
      'Nombres', 'Apellidos', 'DNI', 'Celular', 'Email', 
      'Escuela', 'Modalidad', 'Acepta Datos', 'Autoriza Publicidad',
      'Pais', 'Ciudad', 'Profesion', 'Fecha'
    ]

    const csvContent = [
      headers.join(','),
      ...leads.map(l => [
        \`"\${l.nombres || ''}"\`,
        \`"\${l.apellidos || ''}"\`,
        \`"\${l.dni || ''}"\`,
        \`"\${l.celular || ''}"\`,
        \`"\${l.email || ''}"\`,
        \`"\${l.escuela || ''}"\`,
        \`"\${l.modalidad || ''}"\`,
        l.aceptaDatos ? 'SI' : 'NO',
        l.autorizaPublicidad ? 'SI' : 'NO',
        \`"\${l.pais || ''}"\`,
        \`"\${l.ciudad || ''}"\`,
        \`"\${l.profesion || ''}"\`,
        \`"\${new Date(l.creado_en).toLocaleString()}"\`
      ].join(','))
    ].join('\\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', \`leads_\${new Date().getTime()}.csv\`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleExportCSV}
          startIcon={<i className="tabler-download" />}
        >
          Exportar a CSV
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Celular</TableCell>
              <TableCell>Programa/Escuela</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{new Date(lead.creado_en).toLocaleDateString()}</TableCell>
                  <TableCell>{lead.nombres} {lead.apellidos}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.celular}</TableCell>
                  <TableCell>{lead.escuela || '-'}</TableCell>
                </TableRow>
              ))}
            {leads.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No hay leads registrados</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={leads.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  )
}
`;

fs.writeFileSync(path.join(leadsDir, 'LeadsTable.tsx'), tableCode, 'utf8');
console.log('Leads page created');
