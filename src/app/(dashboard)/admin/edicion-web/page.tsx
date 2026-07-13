export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'

import { Box } from '@mui/material'

import { EdicionWebView } from '@/features/admin/edicion-web/components/EdicionWebView'
import { getAuthSession } from '@/utils/libs/auth-helpers'
import { hasPermission } from '@/utils/libs/permissions'
import prisma from '@/utils/libs/prisma'

export const metadata = {
  title: 'Edición Web | Panel Administrativo'
}

export default async function Page() {
  const session = await getAuthSession()

  if (!session) {
    redirect('/login')
  }

  // Verificar permiso: solo ADMIN o usuarios con EDITAR_CONTENIDO_WEB
  const canAccess = session.user?.rol === 'ADMIN' || hasPermission(session, 'EDITAR_CONTENIDO_WEB')

  if (!canAccess) {
    redirect('/admin/dashboard')
  }

  let initialData: any[] = []

  try {
    initialData = await prisma.configuracion.findMany({ orderBy: { clave: 'asc' } })
  } catch (error) {
    console.error('Error fetching config for edicion-web:', error)
  }

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <EdicionWebView initialData={initialData} />
      </Box>
    </Box>
  )
}
