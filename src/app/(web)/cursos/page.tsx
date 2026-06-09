// Next Imports
import React from 'react'

import { PageHero } from '@/components/site/PageHero'
import { Catalog } from '@/components/site/Catalog'

// Http Client
import { AxiosWebCursos } from '@/features/web/cursos/http/axiosWebCursos'
import { getAuthSession } from '@/utils/libs/auth-helpers'

// Server Action / Data Fetching
async function getData(token: string | null) {
  try {
    const axiosWebCursos = new AxiosWebCursos({
      getAuthToken: () => token
    })

    const data = await axiosWebCursos.getCatalog()

    // Serialización manual y mapeo a formato de Catalog
    if (data.courses) {
      data.courses = data.courses.map((c: any) => ({
        id: c.id,
        slug: c.slug,
        title: c.titulo,
        image: c.miniatura,
        desc: c.resumen || c.descripcion || '',
        price: c.precio ? Number(c.precio) : 0,
        oldPrice: c.precio_oferta ? Number(c.precio_oferta) : null,
        duration: c.duracion || 'Intensivo',
        level: c.nivel === 'BASICO' ? 'Básico' : c.nivel === 'INTERMEDIO' ? 'Intermedio' : c.nivel === 'AVANZADO' ? 'Avanzado' : '',
        category: c.categoria?.nombre || 'General',
        creado_en: c.creado_en
      }))
    }

    // Categorías como strings (para los tabs)
    const uniqueCategories = ["Todos"]

    if (data.categories) {
      data.categories.forEach((cat: any) => {
        uniqueCategories.push(cat.nombre)
      })
    }

    return { courses: data.courses || [], categories: uniqueCategories }
  } catch (error) {
    console.error('Error fetching data in CursosPage via API:', error)

    return { courses: [], categories: ["Todos"] }
  }
}

export const metadata = {
  title: 'Cursos',
  description: 'Explora nuestra amplia variedad de cursos de cocina profesional y comienza a aprender hoy mismo.',
  keywords: 'cursos de cocina, cocina profesional, aprender cocina online, Incuba Cocina, gastronomía',
  alternates: { canonical: 'https://incubacocina.com/cursos' },
  openGraph: {
    title: 'Catálogo de Cursos — Incuba Cocina',
    description: 'Explora nuestra amplia variedad de cursos de cocina profesional y comienza a aprender hoy mismo.',
    url: 'https://incubacocina.com/cursos',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catálogo de Cursos — Incuba Cocina',
    description: 'Explora nuestra amplia variedad de cursos de cocina profesional y comienza a aprender hoy mismo.',
  },
}

export default async function CursosPage() {
  const session = await getAuthSession()
  const token = session?.user?.accessToken ?? null

  const { courses, categories } = await getData(token)

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Catálogo de Cursos"
        subtitle="Aprende técnicas, costea tus recetas y empieza a vender."
        imageSrc="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop"
      />
      <Catalog courses={courses} categories={categories} />
    </div>
  )
}
