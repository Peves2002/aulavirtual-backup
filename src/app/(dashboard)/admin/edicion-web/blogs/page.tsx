export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { Box } from '@mui/material'

import { BlogsClient } from '@/features/admin/edicion-web/components/BlogsClient'
import { getAuthSession } from '@/utils/libs/auth-helpers'
import { hasPermission } from '@/utils/libs/permissions'
import prisma from '@/utils/libs/prisma'

export const metadata = {
  title: 'Blogs | Panel Administrativo'
}

export default async function Page() {
  const session = await getAuthSession()
  if (!session) redirect('/login')

  const canAccess = session.user?.rol === 'ADMIN' || hasPermission(session, 'EDITAR_CONTENIDO_WEB')
  if (!canAccess) redirect('/admin/dashboard')

  let initialData: any[] = []
  try {
    initialData = await prisma.configuracion.findMany({ where: { clave: 'WEB_BLOGS' } })
  } catch (error) {
    console.error('Error fetching config for blogs:', error)
  }

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <BlogsClient initialData={initialData} />
    </Box>
  )
}
