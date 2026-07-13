import { redirect } from 'next/navigation'

import type { Metadata } from 'next'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import { prisma } from '@/lib/prisma'
import InscripcionesClientPage from './InscripcionesClientPage'

export const metadata: Metadata = {
  title: 'Gestión de Inscripciones',
  description: 'Administra las inscripciones recibidas desde las portadas'
}

export default async function Page() {
  const session = await getAuthSession()

  if (!session) {
    redirect('/login')
  }

  // Verificar si es ADMIN (puedes ajustar la logica según tu proyecto)
  if (session.user?.rol !== 'ADMIN' && session.user?.rol !== 'ASESOR') {
    redirect('/')
  }

  // Obtener todas las inscripciones (luego puedes agregar paginación si deseas)
  const inscripciones = await prisma.leadPortada.findMany({
    orderBy: { creado_en: 'desc' }
  })

  return <InscripcionesClientPage inscripciones={inscripciones} />
}
