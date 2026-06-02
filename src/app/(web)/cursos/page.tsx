import React from 'react'

import { Box } from '@mui/material'

import CourseCatalog from '@/features/web/home/components/CourseCatalog'
import PageHero from '@/features/web/ace/PageHero'
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
  } catch {
    return { courses: [], categories: [] }
  }
}

export const metadata = {
  title: 'Cursos — ACE Consulting PERÚ',
  description: 'Explora nuestra amplia variedad de cursos y comienza a aprender hoy mismo.',
}

export default async function CursosPage() {
  const session = await getAuthSession()
  const token = session?.user?.accessToken ?? null
  const { courses, categories } = await getData(token)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <PageHero
        badge="CURSOS"
        title="Capacitación ejecutiva 100% virtual"
        description="Programas asincrónicos diseñados para profesionales y empresas que buscan resultados reales."
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?fit=crop&w=1920&h=640&q=80"
      />
      <CourseCatalog courses={courses} categories={categories} />
    </Box>
  )
}
