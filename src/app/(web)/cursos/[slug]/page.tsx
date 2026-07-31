// Next Imports
import React from 'react'

import { notFound } from 'next/navigation'

import type { Metadata } from 'next'


import { Box } from '@mui/material'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import { getConfigs } from '@/utils/libs/config'
import { AxiosWebCursos } from '@/features/web/cursos/http/axiosWebCursos'

// Component Imports
import CourseDetail from '@/features/web/courses/components/CourseDetail'

// Server Action / Data Fetching
async function getCourseData(slug: string, token: string | null) {
    try {
        const axiosWebCursos = new AxiosWebCursos({
            getAuthToken: () => token
        })

        const data = await axiosWebCursos.getCourseBySlug(slug)

        return data
    } catch (error) {
        console.error('Error fetching course data via API:', error)

        return null
    }
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
    const session = await getAuthSession()
    const token = session?.user?.accessToken ?? null
    
    const course = await getCourseData(params.slug, token)

    if (!course) {
        notFound()
    }

    const configs = await getConfigs()
    const siteName = configs.TEMPLATE_NAME?.trim() || 'ADPH Group'
    const siteUrl  = configs.SEO_SITE_URL?.trim()  || ''
    const ogImage  = course.miniatura || configs.SEO_OG_IMAGE?.trim() || ''

    // JSON-LD: Datos estructurados para Google (esquema Course)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.titulo,
        description: course.descripcion || '',
        provider: {
            '@type': 'Organization',
            name: siteName,
            url: siteUrl || undefined,
        },
        offers: {
            '@type': 'Offer',
            price: course.es_gratis ? '0' : String(course.precio ?? 0),
            priceCurrency: course.moneda || 'PEN',
            availability: 'https://schema.org/InStock',
        },
        ...(ogImage ? { image: ogImage } : {}),
        ...(siteUrl ? { url: `${siteUrl}/cursos/${params.slug}` } : {}),
        ...(course.duracion ? { timeRequired: course.duracion } : {}),
        ...(course.nivel ? { educationalLevel: course.nivel } : {}),
        inLanguage: 'es',
    }

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
            {/* JSON-LD para Google */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CourseDetail course={course} />
        </Box>
    )
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const [course, configs] = await Promise.all([
        getCourseData(params.slug, null),
        getConfigs(),
    ])

    if (!course) return { title: 'Curso no encontrado' }

    const siteName = configs.TEMPLATE_NAME?.trim() || 'ADPH Group'
    const siteUrl  = configs.SEO_SITE_URL?.trim()  || ''
    const ogImage  = course.miniatura || configs.SEO_OG_IMAGE?.trim() || ''
    const desc     = course.descripcion || `Aprende ${course.titulo} en ${siteName}.`

    return {
        title: `${course.titulo} | ${siteName}`,
        description: desc,
        openGraph: {
            title: `${course.titulo} | ${siteName}`,
            description: desc,
            type: 'article',
            locale: 'es_PE',
            siteName,
            ...(siteUrl ? { url: `${siteUrl}/cursos/${params.slug}` } : {}),
            ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: course.titulo }] } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title: `${course.titulo} | ${siteName}`,
            description: desc,
            ...(ogImage ? { images: [ogImage] } : {}),
        },
        ...(siteUrl ? { alternates: { canonical: `${siteUrl}/cursos/${params.slug}` } } : {}),
    }
}

