import { redirect } from 'next/navigation'

import type { Metadata } from 'next'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import { RecetasPage } from '@/features/admin/recetas/pages/RecetasPage'
import type { Receta } from '@/features/admin/recetas/entity/Receta'
import { AxiosReceta } from '@/features/admin/recetas/http/axiosReceta'

export const metadata: Metadata = {
  title: 'Gestión de Recetas',
  description: 'Administra las recetas del aula virtual'
}

export default async function Page() {
  const session = await getAuthSession()

  if (!session) redirect('/login')

  const token = session.user?.accessToken ?? null
  const axiosReceta = new AxiosReceta({ getAuthToken: () => token })

  let initialData: Receta[] = []
  let total = 0

  try {
    const response = await axiosReceta.searchAll()

    initialData = response.recetas
    total = response.paginacion.total
  } catch (error) {
    console.error('Error fetching recetas:', error)
  }

  return <RecetasPage initialDataRecetas={initialData} initialTotal={total} />
}
