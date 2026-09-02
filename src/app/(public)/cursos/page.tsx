import React, { Suspense } from 'react'

import prisma from '@/utils/libs/prisma'
import CourseCatalog from '@/features/web/home/components/CourseCatalog'

export const metadata = {
  title: 'Catálogo de Cursos | IFSEC Group',
}

export default async function CursosPage() {
  const [cursos, categorias] = await Promise.all([
    prisma.curso.findMany({
      where: { estado: 'PUBLICADO', tipo: 'CURSO' },
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
      {/* ── ENCABEZADO COMPACTO ── */}
      <section className="bg-[#020817] mt-16 md:mt-20 px-6 relative overflow-hidden flex items-center border-b border-white/10">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--web-primary)]/15 blur-[120px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1f7d6d]/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-6 lg:gap-10 items-center py-8 sm:py-10 md:py-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[var(--web-light)] rounded-full font-semibold text-xs mb-3 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--web-light)] animate-pulse"></span>
              Catálogo Oficial de Programas
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2.5 tracking-tight leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
              Formación de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--web-light)] to-[var(--web-primary)]">Alto Nivel</span>
            </h1>
            <p className="text-sm md:text-base text-gray-400 max-w-xl font-light leading-relaxed">
              Programas especializados con certificación para minería, transporte de materiales peligrosos y operaciones críticas.
            </p>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative w-full h-56 rounded-[2rem] overflow-hidden border border-white/15 shadow-2xl group">
              <img
                src="/images/servicios/entrenamientos-vivenciales/1.png"
                alt="Formación Especializada IFSEC"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 bg-black/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 flex items-center justify-between">
                <div>
                  <div className="text-[var(--web-light)] text-[10px] font-bold uppercase tracking-wider mb-0.5">Acreditación Oficial</div>
                  <div className="text-lg font-extrabold text-white leading-tight">
                    98% <span className="text-xs font-normal text-white/70">Tasa de Aprobación</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[var(--web-primary)]/30 flex items-center justify-center border border-[var(--web-primary)]/50 text-[var(--web-light)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--web-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
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
