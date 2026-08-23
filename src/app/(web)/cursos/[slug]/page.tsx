// Next Imports
import React from 'react'

import { notFound } from 'next/navigation'

import { Box } from '@mui/material'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import { AxiosWebCursos } from '@/features/web/cursos/http/axiosWebCursos'

// Component Imports
import CourseDetail from '@/features/web/courses/components/CourseDetail'

import prisma from '@/utils/libs/prisma'

// Server Action / Data Fetching
async function getCourseData(slug: string, userId: string | null) {
    console.log("getCourseData CALLED WITH SLUG:", slug);

    try {
        const course = await prisma.curso.findUnique({
            where: {
                slug,
                estado: 'PUBLICADO',
                es_privado: false
            },
            include: {
                profesor: {
                    select: { id: true, slug: true, nombre: true, apellido: true, avatar: true, biografia: true, cargo: true }
                },
                categoria: {
                    select: { id: true, nombre: true }
                },
                modulos: {
                    include: {
                        lecciones: {
                            where: { estado: 'PUBLICADO' },
                            orderBy: { orden: 'asc' }
                        }
                    },
                    orderBy: { orden: 'asc' }
                }
            }
        })

        if (!course) return null;

        let es_comprado = false

        if (userId) {
            const inscripcion = await prisma.inscripcion.findFirst({
                where: {
                    usuario_id: userId,
                    curso_id: course.id,
                    estado: 'ACTIVO'
                }
            })

            if (inscripcion) {
                es_comprado = true
            }
        }

        const safeParseJson = (data: any) => {
            if (typeof data === 'string') {
                try {
                    return JSON.parse(data)
                } catch {
                    return []
                }
            }

            
return Array.isArray(data) ? data : []
        }

        const safeDecimal = (val: any) => val ? Number(val.toString()) : null

        const sanitizedCourse = {
            ...course,
            es_comprado,
            precio: safeDecimal(course.precio),
            precio_falso: safeDecimal(course.precio_falso),
            precio_certificado: safeDecimal(course.precio_certificado),
            precio_oferta: safeDecimal(course.precio_oferta),
            beneficios: safeParseJson(course.beneficios),
            incluye: safeParseJson(course.incluye),
            metodologia: safeParseJson(course.metodologia),
            objetivos: safeParseJson(course.objetivos)
        }

        return sanitizedCourse
    } catch (error) {
        console.error('Error fetching course data via DB:', error)
        
return null
    }
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
    const session = await getAuthSession()
    const userId = session?.user?.id ?? null
    
    const course = await getCourseData(params.slug, userId)

    if (!course) {
        notFound()
    }

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
            <CourseDetail course={course as any} />
        </Box>
    )
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const course = await getCourseData(params.slug, null)

    if (!course) return { title: 'Curso no encontrado' }

    return {
        title: `${course.titulo} | Aula Virtual`,
        description: course.descripcion || 'Detalles del curso en nuestra plataforma EdTech.'
    }
}
