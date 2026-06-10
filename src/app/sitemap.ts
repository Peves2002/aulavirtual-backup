import type { MetadataRoute } from 'next'

import prisma from '@/utils/libs/prisma'

// Evita que Next.js intente generar el sitemap en build time.
// La DB no está disponible durante el build de Docker — se genera en cada request.
export const dynamic = 'force-dynamic'

const BASE = 'https://incubacocina.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas con su prioridad y frecuencia de cambio estimada
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                               lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/cursos`,                   lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/recetas`,                  lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/rutas`,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/plan`,                     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/suscripciones`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/nosotros`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contacto`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/consultoria`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/verificar-certificado`,    lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/terminos-y-condiciones`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/politica-de-cambios-y-devoluciones`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Cursos publicados
  const cursos = await prisma.curso.findMany({
    where: { estado: 'PUBLICADO' },
    select: { slug: true, actualizado_en: true },
  })

  const cursosUrls: MetadataRoute.Sitemap = cursos.map(c => ({
    url: `${BASE}/cursos/${c.slug}`,
    lastModified: c.actualizado_en,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Recetas
  const recetas = await prisma.receta.findMany({
    select: { slug: true, actualizado_en: true },
  }).catch(() => [])

  const recetasUrls: MetadataRoute.Sitemap = recetas.map((r: any) => ({
    url: `${BASE}/recetas/${r.slug}`,
    lastModified: r.actualizado_en,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Rutas de aprendizaje activas
  const rutas = await prisma.rutaAprendizaje.findMany({
    where: { esta_activo: true },
    select: { slug: true, actualizado_en: true },
  }).catch(() => [])

  const rutasUrls: MetadataRoute.Sitemap = rutas.map((r: any) => ({
    url: `${BASE}/rutas/${r.slug}`,
    lastModified: r.actualizado_en,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...cursosUrls, ...recetasUrls, ...rutasUrls]
}
