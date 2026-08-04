import React from 'react'

import ProgramsCatalog from '@/features/web/atd/pages/ProgramsCatalog'
import { AxiosWebCursos } from '@/features/web/cursos/http/axiosWebCursos'
import { getAuthSession } from '@/utils/libs/auth-helpers'

async function getData(token: string | null) {
  try {
    const axiosWebCursos = new AxiosWebCursos({ getAuthToken: () => token })
    const data = await axiosWebCursos.getCatalog()

    if (data.courses) {
      data.courses = data.courses.map((c: any) => ({
        ...c,
        precio: c.precio ? Number(c.precio) : 0,
        precio_oferta: c.precio_oferta ? Number(c.precio_oferta) : null,
      }))
    }

    return data
  } catch (error) {
    console.error('Error fetching cursos in /programas:', error)

    return { courses: [], categories: [] }
  }
}

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} | Programas`,
  description: 'Explora nuestra amplia variedad de programas y comienza a aprender hoy mismo.',
}

export default async function ProgramasPage() {
  const session = await getAuthSession()
  const token = session?.user?.accessToken ?? null
  const { courses, categories } = await getData(token)

  return <ProgramsCatalog courses={courses} categories={categories} />
}
