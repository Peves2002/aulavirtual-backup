import React, { Suspense } from 'react'

import prisma from '@/utils/libs/prisma'
import CourseCatalog from '@/features/web/home/components/CourseCatalog'

export const metadata = {
  title: 'Catálogo de Cursos | IFSEC Group',
}

export default async function CursosPage() {
  const [cursos, categorias] = await Promise.all([
    prisma.curso.findMany({
      where: { estado: 'PUBLICADO' },
      include: {
        categoria: true,
        profesor: { select: { nombre: true, apellido: true, avatar: true } },
        _count: { select: { inscripciones: true } },
      },
      orderBy: { creado_en: 'desc' },
    }),
    prisma.categoria.findMany({
      where: { esta_activo: true },
      select: { id: true, nombre: true, slug: true },
      orderBy: { orden: 'asc' },
    }),
  ])

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* ── ENCABEZADO ── */}
      <section className="bg-[#020817] mt-20 min-h-[calc(100vh-5rem)] px-6 relative overflow-hidden flex items-center">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--web-primary)]/15 blur-[150px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1f7d6d]/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-12 items-center py-16">
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Formación de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--web-light)] to-[var(--web-primary)]">Alto Nivel</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl font-light leading-relaxed mb-10">
              Desarrolla competencias reales y prepara a tu equipo para operaciones seguras con nuestros programas especializados bajo normativas internacionales.
            </p>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative w-full aspect-square bg-gradient-to-tr from-white/5 to-white/10 rounded-[3rem] border border-white/10 backdrop-blur-sm p-6 flex flex-col justify-end shadow-2xl">
              <div className="absolute inset-0 bg-[url('/images/servicios/entrenamientos-vivenciales/lucha-contra-incendios/whatsapp-image-2025-05-25-at-3.26.04-pm-1.jpeg')] bg-cover bg-center opacity-40 rounded-[3rem] mix-blend-overlay"></div>
              <div className="relative z-10 bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                <div className="text-[var(--web-light)] text-xs font-bold uppercase tracking-wider mb-2">Estadísticas</div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-4xl font-extrabold text-white mb-1">98%</div>
                    <div className="text-gray-400 text-sm">Tasa de Aprobación</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[var(--web-primary)]/20 flex items-center justify-center border border-[var(--web-primary)]/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--web-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATÁLOGO ── */}
      <Suspense>
        <CourseCatalog courses={cursos} categories={categorias} />
      </Suspense>
    </div>
  )
}
