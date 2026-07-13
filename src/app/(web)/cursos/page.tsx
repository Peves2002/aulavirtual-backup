// Next Imports
import React from 'react'

import { PageHero } from '@/components/site/PageHero'
import { Catalog } from '@/components/site/Catalog'

// Http Client
import { getAuthSession } from '@/utils/libs/auth-helpers'
import { getProgramCatalogData } from '@/features/web/cursos/getProgramCatalogData'

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
  const { courses, categories } = await getProgramCatalogData('CURSO', token)

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
