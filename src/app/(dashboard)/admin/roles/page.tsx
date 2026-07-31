import { redirect } from 'next/navigation'

import type { Metadata } from 'next'

import RolesView from '@/features/admin/roles/components/RolesView'
import { getAuthSession } from '@/utils/libs/auth-helpers'

export const metadata: Metadata = {
  title: 'Roles y Permisos - Admin',
  description: 'Administra los roles personalizados del sistema'
}

export default async function Page() {
  const session = await getAuthSession()

  if (!session) {
    redirect('/login')
  }

  // Verificar que sea ADMIN o tenga acceso a gestionar usuarios (permiso VER_USUARIOS)
  const rol = session.user?.rol
  const permisos = session.user?.permisos || []

  if (rol !== 'ADMIN' && !permisos.includes('VER_USUARIOS')) {
    redirect('/unauthorized')
  }

  return <RolesView />
}
