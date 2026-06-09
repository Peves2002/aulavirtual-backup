import React from 'react'

import { notFound } from 'next/navigation'

import { Box } from '@mui/material'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import { AxiosWebCursos } from '@/features/web/cursos/http/axiosWebCursos'
import CourseDetail from '@/features/web/courses/components/CourseDetail'

const BASE = 'https://incubacocina.com'

async function getCourseData(slug: string, token: string | null) {
  try {
    const axiosWebCursos = new AxiosWebCursos({ getAuthToken: () => token })

    return await axiosWebCursos.getCourseBySlug(slug)
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const course = await getCourseData(params.slug, null)

  if (!course) return { title: 'Curso no encontrado' }

  const url = `${BASE}/cursos/${course.slug}`
  const description = course.resumen || course.descripcion || `Aprende ${course.titulo} con Incuba Cocina`
  const image = course.miniatura || `${BASE}/og-default.jpg`

  return {
    title: course.titulo,
    description,
    keywords: [course.titulo, course.categoria?.nombre, 'cocina', 'curso online', 'Incuba Cocina'].filter(Boolean).join(', '),
    alternates: { canonical: url },
    openGraph: {
      title: course.titulo,
      description,
      url,
      type: 'article',
      images: [{ url: image, width: 1200, height: 630, alt: course.titulo }],
    },
    twitter: {
      card: 'summary_large_image',
      title: course.titulo,
      description,
      images: [image],
    },
  }
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const session = await getAuthSession()
  const token = session?.user?.accessToken ?? null
  const course = await getCourseData(params.slug, token)

  if (!course) notFound()

  const url = `${BASE}/cursos/${course.slug}`
  const description = course.resumen || course.descripcion || `Aprende ${course.titulo} con Incuba Cocina`

  // Schema.org Course — mejora la presentación en Google y ayuda al rich snippet
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.titulo,
    description,
    url,
    image: course.miniatura,
    provider: {
      '@type': 'Organization',
      name: 'Incuba Cocina',
      sameAs: BASE,
    },
    ...(course.precio && Number(course.precio) > 0
      ? {
          offers: {
            '@type': 'Offer',
            price: Number(course.precio),
            priceCurrency: course.moneda || 'PEN',
            availability: 'https://schema.org/InStock',
            url,
          },
        }
      : { isAccessibleForFree: true }),
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <CourseDetail course={course} />
      </Box>
    </>
  )
}
