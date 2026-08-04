export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'

import { Box } from '@mui/material'

import ArticulosClient from '@/features/admin/articulos/components/ArticulosClient'
import { getAuthSession } from '@/utils/libs/auth-helpers'
import { hasPermission } from '@/utils/libs/permissions'

export const metadata = {
  title: 'Blogs | Panel Administrativo'
}

export default async function Page() {
  const session = await getAuthSession()

  if (!session) redirect('/login')

  const canAccess = session.user?.rol === 'ADMIN' || hasPermission(session, 'EDITAR_CONTENIDO_WEB')

  if (!canAccess) redirect('/admin/dashboard')

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <ArticulosClient defaultTipo="BLOG" isBlogModule={true} />
    </Box>
  )
}
