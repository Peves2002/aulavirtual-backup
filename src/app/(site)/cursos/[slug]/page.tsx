import { notFound } from 'next/navigation'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import { AxiosWebCursos } from '@/features/web/cursos/http/axiosWebCursos'
import CursoDetalle from '@/marketing/pages/CursoDetalle'

export const dynamic = 'force-dynamic'

async function getCourseData(slug: string, token: string | null) {
  try {
    const axiosWebCursos = new AxiosWebCursos({ getAuthToken: () => token })

    return await axiosWebCursos.getCourseBySlug(slug)
  } catch (error) {
    console.error('Error fetching course detail via API:', error)

    return null
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getAuthSession()
  const token = session?.user?.accessToken ?? null

  const course = await getCourseData(params.slug, token)

  if (!course) {
    notFound()
  }

  return <CursoDetalle course={course} />
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const course = await getCourseData(params.slug, null)

  if (!course) return { title: 'Curso no encontrado' }

  return {
    title: `${course.titulo} | Grupo Corpus`,
    description: course.descripcion || 'Detalles del curso en Grupo Corpus.'
  }
}
