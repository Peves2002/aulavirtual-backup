'use client'
/* eslint-disable padding-line-between-statements, newline-before-return, import/order */

import { useState } from 'react'

import { Box, Typography, Tabs, Tab, Paper } from '@mui/material'

import LeadsTable from './LeadsTable'

export default function LeadsClient({ initialLeads }: { initialLeads: any[] }) {
  const [leads, setLeads] = useState(initialLeads)
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleUpdateLead = (updatedLead: any) => {
    setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l))
  }

  const handleDeleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id))
  }

  // Filter leads based on Tab
  const eventsLeads = leads.filter(l => l.escuela === 'Registro de Evento')
  const programsLeads = leads.filter(l => l.escuela !== 'Registro de Evento')

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Typography variant='h4' sx={{ fontWeight: 600 }}>
          Leads y Registros
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          indicatorColor="primary" 
          textColor="primary"
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            label={`Programas (${programsLeads.length})`} 
            icon={<i className="tabler-book text-xl mb-1" />} 
          />
          <Tab 
            label={`Noticias y Eventos (${eventsLeads.length})`} 
            icon={<i className="tabler-calendar-event text-xl mb-1" />} 
          />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <LeadsTable 
          leads={programsLeads} 
          isEventTab={false} 
          onUpdateLead={handleUpdateLead} 
          onDeleteLead={handleDeleteLead} 
        />
      )}
      
      {tabValue === 1 && (
        <LeadsTable 
          leads={eventsLeads} 
          isEventTab={true} 
          onUpdateLead={handleUpdateLead} 
          onDeleteLead={handleDeleteLead} 
        />
      )}
    </Box>
  )
}
