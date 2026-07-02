// Next Imports
import React from 'react'


// Component Imports
import CursosClient from './CursosClient'

// Http Client
import { getAuthSession } from '@/utils/libs/auth-helpers'
import { getProgramCatalogData } from '@/features/web/cursos/getProgramCatalogData'

export const metadata = {
  title: 'Programas de Especialización - CEPAV',
  description: 'Explora nuestros programas de capacitación especializada para el sector turismo y potencia tu equipo.'
}

export default async function CursosPage() {
  const session = await getAuthSession()
  const token = session?.user?.accessToken ?? null
  const { courses, categories } = await getProgramCatalogData('CURSO', token)

  return <CursosClient initialCourses={courses} initialCategories={categories} />
}
