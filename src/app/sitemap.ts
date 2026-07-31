import type { MetadataRoute } from 'next'

import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'
import { ESCUELAS } from '@/features/web/adph/data/escuelas'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const configs = await getConfigs()
  const siteUrl = configs.SEO_SITE_URL?.trim() || 'https://adphgroup.com'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`,                        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${siteUrl}/cursos`,                  lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${siteUrl}/programas`,               lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${siteUrl}/diplomados`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${siteUrl}/especializaciones`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${siteUrl}/noticias`,                lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${siteUrl}/nosotros`,                lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/contacto`,                lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/empresas`,                lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/consultoria`,             lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/ficha-de-inscripcion`,    lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/verificar-certificado`,   lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const escuelaPages: MetadataRoute.Sitemap = ESCUELAS.map(e => ({
    url: `${siteUrl}/escuelas/${e.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const cursos = await prisma.curso.findMany({
    where: { estado: 'PUBLICADO' },
    select: { slug: true, actualizado_en: true },
  })

  const cursoPages: MetadataRoute.Sitemap = cursos.map(c => ({
    url: `${siteUrl}/cursos/${c.slug}`,
    lastModified: c.actualizado_en,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...escuelaPages, ...cursoPages]
}
