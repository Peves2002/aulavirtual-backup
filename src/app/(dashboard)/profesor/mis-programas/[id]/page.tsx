import { redirect } from 'next/navigation'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import { CourseBuilderPage } from '@/features/admin/cursos/pages/CourseBuilderPage'

export const metadata = {
  title: 'Editor de Programa | Profesor',
  description: 'Edita el contenido de tu programa'
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getAuthSession()

  if (!session) {
    redirect('/login')
  }

  const profesores = [{
    id: session.user.id,
    nombre: session.user.name || 'Yo',
    apellido: ''
  }]

  return <CourseBuilderPage cursoId={params.id} profesores={profesores} basePath="/profesor/mis-programas" />
}
