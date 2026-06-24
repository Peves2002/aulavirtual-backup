import type { Curso, TipoEmision } from '@prisma/client'

import prisma from '@/utils/libs/prisma'

export type CursoPublico = {
  id: string
  slug: string
  title: string
  image: string | null
  price: number
  oldPrice: number | null
  description: string
  duracion: string | null
  modulos: number
  esGratis: boolean
  categoria: string
  fechaInicio: string | null
  tipoEmision: TipoEmision
}

type CursoConRelaciones = Curso & {
  categoria: { nombre: string } | null
  _count: { modulos: number }
}

function mapCursoPublico(c: CursoConRelaciones): CursoPublico {
  const precio = Number(c.precio)
  const precioFalso = Number(c.precio_falso)

  return {
    id: c.id,
    slug: c.slug,
    title: c.titulo,
    image: c.miniatura,
    price: precio,
    oldPrice: precioFalso > precio ? precioFalso : null,
    description: c.descripcion || '',
    duracion: c.duracion,
    modulos: c._count.modulos,
    esGratis: c.es_gratis,
    categoria: c.categoria?.nombre || 'Otros Cursos',
    fechaInicio: c.fecha_inicio ? c.fecha_inicio.toISOString() : null,
    tipoEmision: c.tipo_emision
  }
}

/** Cursos publicados (no privados) de un tipo de emisión, para las páginas públicas de marketing */
export async function getCursosPorTipoEmision(tipo: TipoEmision): Promise<CursoPublico[]> {
  const cursos = await prisma.curso.findMany({
    where: { estado: 'PUBLICADO', es_privado: false, tipo_emision: tipo },
    include: {
      categoria: { select: { nombre: true } },
      _count: { select: { modulos: true } }
    },
    orderBy: { orden: 'asc' }
  })

  return cursos.map(mapCursoPublico)
}

/** Todos los cursos publicados (no privados), sin filtrar por tipo de emisión — para el campus virtual */
export async function getCursosPublicos(): Promise<CursoPublico[]> {
  const cursos = await prisma.curso.findMany({
    where: { estado: 'PUBLICADO', es_privado: false },
    include: {
      categoria: { select: { nombre: true } },
      _count: { select: { modulos: true } }
    },
    orderBy: { orden: 'asc' }
  })

  return cursos.map(mapCursoPublico)
}
