import { redirect } from 'next/navigation'

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
