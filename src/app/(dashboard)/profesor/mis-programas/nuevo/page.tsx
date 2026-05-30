import { redirect } from 'next/navigation'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import { CourseCreatePage } from '@/features/admin/cursos/pages/CourseCreatePage'

export const metadata = {
  title: 'Crear Nuevo Programa',
  description: 'Configura un nuevo programa para el aula virtual'
}

export default async function Page() {
  const session = await getAuthSession()

  if (!session) {
    redirect('/login')
  }

  const profesores = [{
    id: session.user.id,
    nombre: session.user.name || 'Yo',
    apellido: ''
  }]

  return <CourseCreatePage profesores={profesores} tipo="PROGRAMA" basePath="/profesor/mis-programas" />
}
