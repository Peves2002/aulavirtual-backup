import { Hero } from '@/components/site/Hero'
import { Services } from '@/components/site/Services'
import { TestimonialsCta } from '@/components/site/TestimonialsCta'
import { Recetas } from '@/components/site/Recetas'
import prisma from '@/utils/libs/prisma'

export const metadata = {
  title: 'Incuba Cocina - Escuela de Cocina y Emprendimiento',
  description: 'Cursos cortos de cocina y emprendimiento gastronómico. Aprende recetas profesionales, costea y vende.',
}

export default async function HomePage() {
  let mappedCourses: any[] = [];

  try {
    const latestCourses = await prisma.curso.findMany({
      where: { estado: 'PUBLICADO' },
      orderBy: { creado_en: 'desc' },
      take: 6,
      select: {
        id: true,
        titulo: true,
        slug: true,
        miniatura: true,
        precio: true,
        moneda: true,
        es_gratis: true,
        nivel: true,
        tipo_emision: true,
        profesor: {
          select: { nombre: true, apellido: true, avatar: true }
        },
        categoria: {
          select: { nombre: true }
        },
        _count: {
          select: { inscripciones: true }
        }
      }
    });

    mappedCourses = latestCourses.map(c => ({
      id: c.id,
      titulo: c.titulo,
      slug: c.slug,
      miniatura: c.miniatura || undefined,
      precio: Number(c.precio),
      moneda: c.moneda,
      es_gratis: c.es_gratis,
      nivel: c.nivel,
      tipo_emision: c.tipo_emision,
      profesor: {
        nombre: c.profesor.nombre,
        apellido: c.profesor.apellido,
        avatar: c.profesor.avatar || undefined,
      },
      categoria: c.categoria ? { nombre: c.categoria.nombre } : undefined,
      _count: c._count
    }));
  } catch (error) {
    console.error('Error fetching latest courses via Prisma:', error);
    mappedCourses = [];
  }
  return (
    <div className="bg-transparent">
      <Hero />
      <Services />
      <TestimonialsCta />
      <Recetas />
    </div>
  )
}
