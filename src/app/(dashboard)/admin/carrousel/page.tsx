import { redirect } from 'next/navigation'

import type { Metadata } from 'next'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import { prisma } from '@/lib/prisma'
import CarrouselClientPage from './CarrouselClientPage'

export const metadata: Metadata = {
  title: 'Gestión de Carrusel de Portada',
  description: 'Administra las diapositivas (slides) del carrusel de la portada'
}

export default async function Page() {
  const session = await getAuthSession()

  if (!session) {
    redirect('/login')
  }

  // Verificar si es ADMIN
  if (session.user?.rol !== 'ADMIN') {
    redirect('/')
  }

  // Obtener todas las diapositivas ordenadas por orden de aparición
  const slides = await prisma.heroSlide.findMany({
    orderBy: { orden: 'asc' }
  })

  return <CarrouselClientPage initialSlides={slides} />
}
