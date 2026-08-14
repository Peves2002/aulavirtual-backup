export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'

import prisma from '@/utils/libs/prisma'
import { generarExtracto } from '@/utils/functions/generarExtracto'
import ArticuloDetail from '@/features/web/articulos/components/ArticuloDetail'

interface Props {
  params: { slug: string }
}

const articuloSelect = {
  id: true,
  titulo: true,
  slug: true,
  descripcion: true,
  imagen_portada: true,
  archivo_pdf: true,
  categoria: true,
  creado_en: true,
  autor: { select: { id: true, nombre: true, apellido: true, avatar: true } }
} as const

export async function generateMetadata({ params }: Props) {
  const articulo = await prisma.articulo.findFirst({
    where: { slug: params.slug, estado: 'PUBLICADO' },
    select: { titulo: true, descripcion: true }
  })

  if (!articulo) return { title: 'Artículo | Aula Virtual' }

  return {
    title: `${articulo.titulo} | Artículos`,
    description: articulo.descripcion ? generarExtracto(articulo.descripcion, 160) : undefined
  }
}

export default async function ArticuloDetailPage({ params }: Props) {
  const articulo = await prisma.articulo.findFirst({
    where: { slug: params.slug, estado: 'PUBLICADO' },
    select: articuloSelect
  })

  if (!articulo) notFound()

  let relacionados = await prisma.articulo.findMany({
    where: { estado: 'PUBLICADO', id: { not: articulo.id }, categoria: articulo.categoria ?? undefined },
    orderBy: { creado_en: 'desc' },
    take: 3,
    select: { id: true, titulo: true, slug: true, imagen_portada: true, descripcion: true, categoria: true, creado_en: true }
  })

  if (relacionados.length < 3) {
    const excludeIds = [articulo.id, ...relacionados.map(r => r.id)]

    const relleno = await prisma.articulo.findMany({
      where: { estado: 'PUBLICADO', id: { notIn: excludeIds } },
      orderBy: { creado_en: 'desc' },
      take: 3 - relacionados.length,
      select: { id: true, titulo: true, slug: true, imagen_portada: true, descripcion: true, categoria: true, creado_en: true }
    })

    relacionados = [...relacionados, ...relleno]
  }

  return (
    <ArticuloDetail
      articulo={{ ...articulo, creado_en: articulo.creado_en.toISOString() }}
      relacionados={relacionados.map(r => ({ ...r, creado_en: r.creado_en.toISOString() }))}
    />
  )
}
