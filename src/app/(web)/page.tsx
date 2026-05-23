import Link from 'next/link'

import { Hero } from '@/components/site/Hero'
import { Services } from '@/components/site/Services'
import { TestimonialsCta } from '@/components/site/TestimonialsCta'
import { Recetas } from '@/components/site/Recetas'
import { SubscriptionSection } from '@/components/site/SubscriptionSection'
import HomeCoursesSection from '@/features/web/home/components/HomeCoursesSection'

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
      
      {/* Latest Courses Section */}
      <section className="py-24 relative" style={{ backgroundColor: "#F7FBF0", backgroundImage: "radial-gradient(#d9f99d 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F7FBF0]/90 pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-64 h-64 bg-[#A8E060] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-[#5A9020] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mx-auto max-w-3xl mb-16 reveal">
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-[#1A3A0A] mb-4">
              Nuestros <span className="text-[#5A9020]">Últimos Cursos</span>
            </h2>
            <p className="text-[#4A7018] text-lg">
              Aprende las mejores técnicas y recetas rentables paso a paso.
            </p>
          </div>
          
          <HomeCoursesSection courses={mappedCourses} />
          
          <div className="mt-12 text-center">
            <Link 
              href="/cursos"
              className="inline-flex items-center gap-2 font-bold text-[15px] rounded-full px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              style={{ border: "2px solid #5A9020", color: "#5A9020" }}
            >
              VER TODOS LOS CURSOS
            </Link>
          </div>
        </div>
      </section>

      <SubscriptionSection />
      
      <TestimonialsCta />
      <Recetas />
    </div>
  )
}
