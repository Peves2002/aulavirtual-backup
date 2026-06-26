import { notFound, redirect } from 'next/navigation'

import { AxiosWebCursos } from '@/features/web/cursos/http/axiosWebCursos'
import Checkout from '@/marketing/pages/Checkout'

export const dynamic = 'force-dynamic'

async function getCourseData(slug: string) {
  try {
    const axiosWebCursos = new AxiosWebCursos()

    return await axiosWebCursos.getCourseBySlug(slug)
  } catch (error) {
    console.error('Error fetching course data for checkout via API:', error)

    return null
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const course = await getCourseData(params.slug)

  if (!course) {
    notFound()
  }

  if (course.es_gratis || Number(course.precio) === 0) {
    redirect(`/cursos/${params.slug}`)
  }

  return <Checkout course={course} />
}

export async function generateMetadata() {
  return {
    title: 'Checkout - Finalizar inscripción | Grupo Corpus',
    description: 'Finaliza tu inscripción y comienza a aprender hoy mismo.'
  }
}
