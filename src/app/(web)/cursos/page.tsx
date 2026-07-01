import { Box } from '@mui/material'

import prisma from '@/utils/libs/prisma'
import { getAuthSession } from '@/utils/libs/auth-helpers'
import CourseCatalog from '@/features/web/home/components/CourseCatalog'
import PageHero from '@/features/web/ace/PageHero'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Cursos — ACE Consulting PERÚ',
  description: 'Explora nuestra amplia variedad de cursos y comienza a aprender hoy mismo.',
}

async function getData(userId: string | null) {
  const [coursesRaw, categories] = await Promise.all([
    prisma.curso.findMany({
      where: { estado: 'PUBLICADO' },
      include: {
        profesor: { select: { id: true, nombre: true, apellido: true, avatar: true } },
        categoria: { select: { id: true, nombre: true, slug: true } },
        _count: { select: { inscripciones: true } },
      },
      orderBy: { creado_en: 'desc' },
    }),
    prisma.categoria.findMany({
      where: { esta_activo: true },
      select: { id: true, nombre: true, slug: true },
      orderBy: { nombre: 'asc' },
    }),
  ])

  let userCourseIds = new Set<string>()

  if (userId) {
    const inscripciones = await prisma.inscripcion.findMany({
      where: { usuario_id: userId, estado: 'ACTIVO' },
      select: { curso_id: true },
    })

    userCourseIds = new Set(inscripciones.map(i => i.curso_id))
  }

  const courses = await Promise.all(
    coursesRaw.map(async course => {
      const lecciones = await prisma.leccion.count({
        where: { modulo: { curso_id: course.id } },
      })

      return {
        ...course,
        precio: Number(course.precio),
        precio_oferta: course.precio_oferta ? Number(course.precio_oferta) : null,
        es_comprado: userId ? userCourseIds.has(course.id) : false,
        _count: { ...course._count, lecciones },
      }
    })
  )

  return { courses: JSON.parse(JSON.stringify(courses)), categories }
}

export default async function CursosPage() {
  const session = await getAuthSession()
  const userId = session?.user?.id ?? null
  const { courses, categories } = await getData(userId)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <PageHero
        badge="CURSOS"
        title="Capacitación ejecutiva 100% virtual"
        description="Programas asincrónicos diseñados para profesionales y empresas que buscan resultados reales."
        image="/others/curso.jpg"
      />
      <CourseCatalog courses={courses} categories={categories} />
    </Box>
  )
}
