import { Sparkles } from 'lucide-react'
import { notFound } from 'next/navigation'

import { Container, Box } from '@mui/material'

import prisma from '@/utils/libs/prisma'
import { getConfig } from '@/utils/libs/config'
import RutasCatalog from '@/features/web/rutas/components/RutasCatalog'

async function getRutas() {
  try {
    const rutas = await prisma.rutaAprendizaje.findMany({
      where: { esta_activo: true },
      include: {
        cursos: {
          orderBy: { orden: 'asc' },
          include: {
            curso: {
              select: {
                id: true,
                titulo: true,
                miniatura: true,
                slug: true,
                precio: true,
                moneda: true,
                es_gratis: true
              }
            }
          }
        },
        _count: {
          select: { cursos: true }
        }
      },
      orderBy: { creado_en: 'desc' }
    })

    const mappedRutas = rutas.map(ruta => ({
      ...ruta,
      precio: Number(ruta.precio),
      precio_falso: Number(ruta.precio_falso),
      total_cursos: ruta._count.cursos,
      cursos: ruta.cursos.map(rc => rc.curso)
    })) as any[]

    return JSON.parse(JSON.stringify(mappedRutas))
  } catch (err) {
    console.error('Error fetching routes:', err)

    return []
  }
}

export default async function RutasIndexPage() {
  const habilitado = await getConfig('WEB_RUTAS_HABILITADO', 'true')

  if (habilitado !== 'true') notFound()

  const rutas = await getRutas()

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-edu-pattern py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
              Catálogo Completo
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
              Nuestros <span className="text-brand-orange">Paquetes</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-white/80">
              Explora nuestros paquetes especializados, conjuntos de cursos diseñados para potenciar tus habilidades y brindarte acceso integral a diversas temáticas.
            </p>
          </div>
        </div>
      </section>

      {/* COLOR STRIPE */}
      <div className="grid h-3 grid-cols-4">
        <div className="bg-brand-teal" />
        <div className="bg-brand-navy" />
        <div className="bg-brand-lime" />
        <div className="bg-brand-orange" />
      </div>

      {/* ── 2. CONTENIDO / CATÁLOGO ─────────────────────── */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: '#f8fafc', flexGrow: 1, minHeight: '60vh' }}>
        <Container maxWidth="lg">
          <RutasCatalog initialRutas={rutas} />
        </Container>
      </Box>
    </>
  )
}
