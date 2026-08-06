/* eslint-disable padding-line-between-statements, newline-before-return, import/order */
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import prisma from '@/utils/libs/prisma'
import { getAuthOptions } from '@/utils/configs/auth'
import LeadsClient from './LeadsClient'

export const metadata = {
  title: 'Leads y Registros | Aula Virtual'
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

  const cursos = await prisma.curso.findMany({
    select: { id: true, titulo: true, escuela: true }
  })

  return <LeadsClient initialLeads={leads} cursos={cursos} />
}
