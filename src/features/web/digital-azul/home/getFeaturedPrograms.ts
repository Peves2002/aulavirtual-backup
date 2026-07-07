import type { PrismaClient } from '@prisma/client'

import { homeProgramasFallbackImages, homeProgramasStatic } from './homeContent'

export type FeaturedProgram = {
  title: string
  description: string
  color: string
  href: string
  image: string
}

type CursoRow = {
  titulo: string
  slug: string
  miniatura: string | null
  categoria: { nombre: string } | null
}

function resolveProgramImage(miniatura: string | null | undefined, index: number): string {
  if (miniatura) return miniatura

  return homeProgramasFallbackImages[index % homeProgramasFallbackImages.length]
}

export async function getFeaturedPrograms(
  prisma: PrismaClient,
  featuredSlugsConfig?: string,
): Promise<FeaturedProgram[]> {
  const slugs = featuredSlugsConfig
    ?.split(',')
    .map(s => s.trim())
    .filter(Boolean)

  let courses: CursoRow[] = []

  if (slugs && slugs.length > 0) {
    const found = await prisma.curso.findMany({
      where: { slug: { in: slugs }, estado: 'PUBLICADO' },
      select: {
        titulo: true,
        slug: true,
        miniatura: true,
        categoria: { select: { nombre: true } },
      },
    })

    const bySlug = new Map(found.map(c => [c.slug, c]))

    courses = slugs.map(slug => bySlug.get(slug)).filter(Boolean) as CursoRow[]
  }

  if (courses.length === 0) {
    courses = await prisma.curso.findMany({
      where: { estado: 'PUBLICADO' },
      select: {
        titulo: true,
        slug: true,
        miniatura: true,
        categoria: { select: { nombre: true } },
      },
      orderBy: { creado_en: 'desc' },
      take: 4,
    })
  }

  if (courses.length >= 1) {
    return courses.slice(0, 4).map((c, i) => ({
      title: c.titulo,
      description: c.categoria?.nombre || 'Programa de formación Digital Azul',
      color: homeProgramasStatic[i]?.color || homeProgramasStatic[0].color,
      href: `/cursos/${c.slug}`,
      image: resolveProgramImage(c.miniatura, i),
    }))
  }

  return homeProgramasStatic
}
