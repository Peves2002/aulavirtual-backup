'use client'

import { useState } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { CheckCircle, ChevronRight, Download, Play, XCircle, Clock, Loader2 } from 'lucide-react'

import { useSession } from 'next-auth/react'

import CourseThumbnail from '@/utils/components/CourseThumbnail'
import HydratedDate from '@/utils/components/HydratedDate'
import UserAvatar from '@/utils/components/UserAvatar'
import PdfViewer from '@/features/estudiante/player/components/PdfViewer'
import VideoPlayer from '@/features/estudiante/player/components/VideoPlayer'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { Card } from '@/features/web/atd/ui/card'
import { Button } from '@/features/web/atd/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/features/web/atd/ui/accordion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/features/web/atd/ui/dialog'
import { cn } from '@/features/web/atd/lib/utils'

interface Leccion {
  id: string
  titulo: string
  duracion?: number
}

interface Modulo {
  id: string
  titulo: string
  lecciones: Leccion[]
}

interface CourseDetailProps {
  course: {
    id: string
    titulo: string
    slug: string
    descripcion?: string
    miniatura?: string
    precio: number
    precio_falso: number
    moneda: string
    es_gratis: boolean
    es_comprado?: boolean
    nivel: string
    tipo_emision: string
    profesor: {
      id: string
      slug: string
      nombre: string
      apellido: string
      avatar?: string
      cargo?: string
      biografia?: string
    }
    categoria?: { nombre: string }
    video_presentacion?: string | null
    duracion?: string | null
    fecha_inicio?: string | Date | null
    fecha_fin?: string | Date | null
    creado_en?: string | Date
    modulos: Modulo[]
    objetivos?: string[]
    metodologia?: any[]
    beneficios?: any[]
    incluye?: any[]
    brochure?: string | null
  }
}

const CourseDetail = ({ course }: CourseDetailProps) => {
  const [previewLesson, setPreviewLesson] = useState<any>(null)
  const [enrolling, setEnrolling] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { openLogin } = useAuthModal()

  const handleFreeEnroll = async () => {
    if (!session) {
      openLogin(undefined, handleFreeEnroll)

      return
    }

    setEnrolling(true)

    try {
      const res = await fetch('/api/estudiante/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cursoId: course.id })
      })

      const data = await res.json()

      if (res.ok) {
        router.push(`/estudiante/aprender/${course.slug}`)
      } else {
        // Si ya está inscrito, igualmente redirigir
        if (res.status === 400 && data.message?.includes('Ya estás inscrito')) {
          router.push(`/estudiante/aprender/${course.slug}`)
        }
      }
    } finally {
      setEnrolling(false)
    }
  }

  const handleEnroll = () => {
    if (!session) {
      openLogin(undefined, () => router.push(`/checkout/${course.slug}`))

      return
    }

    router.push(`/checkout/${course.slug}`)
  }

  // Helper para obtener el ID de video y la URL de embebido
  const getEmbedUrl = (url?: string | null) => {
    if (!url) return null
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)

    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=0&rel=0`

    const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/)

    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=0`

    return null
  }

  const embedUrl = getEmbedUrl(course.video_presentacion)

  const isLive = course.tipo_emision === 'SINCRONO' || course.tipo_emision === 'MIXTO'

  const displayDate = isLive
    ? {
      label: 'Inicio',
      value: course.fecha_inicio
        ? <HydratedDate date={course.fecha_inicio} format="date" options={{ day: '2-digit', month: '2-digit', year: 'numeric' }} />
        : 'Próximamente'
    }
    : null

  const defaultBeneficios = [
    { title: 'Clase en vivo', desc: 'Clases 100% en vivo por Zoom.', icon: 'tabler-video' },
    { title: 'Seguimiento personalizado', desc: 'Apoyo y soporte de la coordinadora.', icon: 'tabler-headset' },
    { title: 'Plataforma virtual', desc: 'Acceso 24/7 durante el programa.', icon: 'tabler-device-laptop' },
    { title: 'Certificado Opcional', desc: 'Solicítalo al finalizar el curso.', icon: 'tabler-certificate' },
  ]

  const defaultMetodologia = [
    { title: 'Presentación de clase', icon: 'tabler-presentation' },
    { title: 'Material de clases y adicionales', icon: 'tabler-folder' },
    { title: 'Resolución de casos reales', icon: 'tabler-messages' },
  ]

  const defaultObjetivos = [
    'Aplicar metodologías avanzadas para transformar procesos reales.',
    'Aprender flujos de trabajo eficientes desde el inicio hasta el despliegue.',
    'Identificar causas raíz y optimizar el rendimiento con herramientas modernas.',
  ]

  const defaultIncluye = [
    { text: 'Clases en vivo', active: true },
    { text: 'Clases grabadas', active: true },
    { text: 'Comunidad del curso', active: true },
    { text: 'Materiales y adicionales', active: true },
    { text: 'Seguimiento académico', active: true },
    { text: 'Evaluación programada', active: true },
    { text: 'Recuperación de evaluación', active: false },
    { text: 'Certificación', active: false },
  ]

  const modulosPublicados = course.modulos.filter(m => m.lecciones.some(l => (l as any).estado !== 'BORRADOR'))

  const precioTachado = Number(course.precio_falso) !== 0
    ? Number(course.precio_falso)
    : (course.precio * 1.5).toFixed(2)

  return (
    <div className="pb-20">
      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/5 pt-8 pb-14 md:pb-20">
        <div className="absolute inset-0 bg-mesh opacity-60" />
        {course.miniatura && (
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: `url(${course.miniatura})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(60px)', transform: 'scale(1.2)' }}
          />
        )}

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 flex-wrap mb-8 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Inicio</Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
            <Link href="/cursos" className="text-muted-foreground hover:text-foreground transition-colors">Cursos</Link>
            {course.categoria && (
              <>
                <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
                <span className="text-muted-foreground">{course.categoria.nombre}</span>
              </>
            )}
            <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
            <span className="text-primary font-semibold">{course.titulo}</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* Miniatura / Video */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video shadow-2xl">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  title={course.titulo}
                />
              ) : (
                <CourseThumbnail src={course.miniatura} title={course.titulo} aspectRatio="16/9" />
              )}
              {course.es_gratis && (
                <span className="absolute top-4 right-4 z-10 text-xs font-extrabold px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">
                  GRATUITO
                </span>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {course.es_comprado ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground">
                    <CheckCircle className="h-3.5 w-3.5" /> Tu curso
                  </span>
                ) : (
                  <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/25 text-primary">
                    {course.nivel === 'BASICO' ? 'Básico' : course.nivel === 'INTERMEDIO' ? 'Intermedio' : 'Avanzado'}
                  </span>
                )}
                <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-muted text-muted-foreground border border-white/5">
                  {course.tipo_emision === 'SINCRONO' ? 'Sincrónico' : course.tipo_emision === 'MIXTO' ? 'Mixto' : 'Grabado'}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-[1.1] tracking-tight">{course.titulo}</h1>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
                  <UserAvatar src={course.profesor.avatar} name={course.profesor.nombre} apellido={course.profesor.apellido} size={44} />
                  <div>
                    <p className="text-xs text-muted-foreground">Docente</p>
                    {course.profesor.slug ? (
                      <Link href={`/docentes/${course.profesor.slug}`} className="font-bold text-primary hover:underline">
                        {course.profesor.nombre} {course.profesor.apellido}
                      </Link>
                    ) : (
                      <p className="font-bold text-primary">{course.profesor.nombre} {course.profesor.apellido}</p>
                    )}
                  </div>
                </div>

                {displayDate && (
                  <div className="rounded-xl bg-muted p-3 border border-white/5">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">{displayDate.label}</p>
                    <p className="font-bold mt-0.5">{displayDate.value}</p>
                  </div>
                )}

                {course.duracion && (
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Duración</p>
                      <p className="font-bold">{course.duracion}</p>
                    </div>
                  </div>
                )}

                {isLive && course.fecha_fin && (
                  <div className="rounded-xl bg-muted p-3 border border-white/5">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">Fin</p>
                    <p className="font-bold mt-0.5">
                      <HydratedDate date={course.fecha_fin} format="date" options={{ day: '2-digit', month: '2-digit', year: 'numeric' }} />
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  {course.es_comprado ? 'Adquirido' : course.es_gratis ? 'Gratis' : `${course.moneda} ${course.precio}`}
                </span>
                {!course.es_gratis && !course.es_comprado && (
                  <span className="text-muted-foreground line-through">{course.moneda} {precioTachado}</span>
                )}
              </div>

              {course.es_comprado ? (
                <Button variant="hero" size="xl" className="w-full" asChild>
                  <Link href={`/estudiante/aprender/${course.slug}`}>Seguir aprendiendo</Link>
                </Button>
              ) : course.es_gratis ? (
                <Button variant="hero" size="xl" className="w-full" onClick={handleFreeEnroll} disabled={enrolling}>
                  {enrolling ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Inscribirme gratis'}
                </Button>
              ) : (
                <Button variant="hero" size="xl" className="w-full" onClick={handleEnroll}>
                  Matricúlate
                </Button>
              )}
            </div>
          </div>

          {/* Beneficios */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-14">
            {(course.beneficios?.length ? course.beneficios : defaultBeneficios).map((item, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center hover:bg-white/[0.07] transition-colors">
                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  <i className={item.icon?.startsWith('tabler-') ? item.icon : `tabler-${item.icon}`} style={{ fontSize: '1.375rem' }} />
                </div>
                <p className="font-bold text-sm mb-1">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTENIDO ─────────────────────────────────────────────────────── */}
      <section className="container py-12">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-10">

            {course.descripcion && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Acerca del curso</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{course.descripcion}</p>
              </div>
            )}

            <Card className="p-6 md:p-10 bg-card/50 border-white/5">
              <h2 className="text-2xl font-bold text-center mb-1">Metodología de Aprendizaje</h2>
              <p className="text-sm text-muted-foreground text-center mb-8">Basado en la experiencia del profesional</p>
              <div className="grid gap-4 md:grid-cols-3">
                {(course.metodologia?.length ? course.metodologia : defaultMetodologia).map((m, i) => (
                  <div key={i} className="rounded-xl bg-muted p-6 text-center flex flex-col items-center gap-3 border border-white/5">
                    <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <i className={m.icon?.startsWith('tabler-') ? m.icon : `tabler-${m.icon}`} style={{ fontSize: '1.75rem' }} />
                    </div>
                    <p className="font-semibold text-sm leading-snug">{m.title}</p>
                    {m.desc && <p className="text-xs text-muted-foreground">{m.desc}</p>}
                  </div>
                ))}
              </div>
            </Card>

            <div>
              <h2 className="text-2xl font-bold mb-4">Objetivos del curso</h2>
              <div className="space-y-3">
                {(course.objetivos?.length ? course.objetivos : defaultObjetivos).map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                <h2 className="text-2xl font-bold">Contenido del curso</h2>
                {course.brochure && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={course.brochure} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" /> Descargar Brochure
                    </a>
                  </Button>
                )}
              </div>

              {modulosPublicados.length > 0 ? (
                <Accordion type="multiple" defaultValue={[modulosPublicados[0].id]} className="space-y-3">
                  {modulosPublicados.map((modulo, idx) => (
                    <AccordionItem key={modulo.id} value={modulo.id}>
                      <AccordionTrigger>
                        <span className="flex items-center gap-3">
                          <span className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-foreground">{modulo.titulo}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1">
                          {modulo.lecciones
                            .filter(l => (l as any).estado !== 'BORRADOR')
                            .map(leccion => (
                              <div
                                key={leccion.id}
                                onClick={() => { if ((leccion as any).es_vista_previa) setPreviewLesson(leccion) }}
                                className={cn(
                                  'flex items-center gap-3 py-2.5 px-2 rounded-lg transition-colors',
                                  (leccion as any).es_vista_previa && 'cursor-pointer hover:bg-white/5'
                                )}
                              >
                                <Play className={cn('h-4 w-4 shrink-0', (leccion as any).es_vista_previa ? 'text-primary' : 'text-muted-foreground/30')} />
                                <span className="text-sm flex-1 text-foreground">{leccion.titulo}</span>
                                {(leccion as any).es_vista_previa && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">Vista previa</span>
                                )}
                                {leccion.duracion && <span className="text-xs text-muted-foreground/70">{leccion.duracion} min</span>}
                              </div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-muted-foreground italic text-sm">
                  Aún no hay módulos publicados.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden bg-card/50 border-white/5 lg:sticky lg:top-24">
              <div className="p-6 text-center bg-gradient-to-br from-primary/15 to-secondary/15 border-b border-white/5">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
                  Programa {course.es_gratis ? 'Gratuito' : 'Premium'}
                </p>
                <p className="text-3xl font-bold text-primary">
                  {course.es_comprado ? 'Adquirido' : course.es_gratis ? 'Gratis' : `${course.moneda} ${course.precio}`}
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-2.5 mb-6">
                  {(course.incluye?.length ? course.incluye : defaultIncluye).map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      {item.active
                        ? <CheckCircle className="h-[18px] w-[18px] text-primary shrink-0" />
                        : <XCircle className="h-[18px] w-[18px] text-muted-foreground/30 shrink-0" />}
                      <span className={cn('text-sm', item.active ? 'font-semibold' : 'text-muted-foreground')}>{item.text}</span>
                    </div>
                  ))}
                </div>

                {course.es_comprado ? (
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <Link href={`/estudiante/aprender/${course.slug}`}>Seguir aprendiendo</Link>
                  </Button>
                ) : course.es_gratis ? (
                  <Button variant="hero" size="lg" className="w-full" onClick={handleFreeEnroll} disabled={enrolling}>
                    {enrolling ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Inscribirme gratis'}
                  </Button>
                ) : (
                  <Button variant="hero" size="lg" className="w-full" onClick={handleEnroll}>
                    Matricúlate
                  </Button>
                )}
              </div>
            </Card>
          </div>

        </div>
      </section>

      {/* Dialog para la Vista Previa */}
      <Dialog open={Boolean(previewLesson)} onOpenChange={(open) => { if (!open) setPreviewLesson(null) }}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background">
          <DialogHeader className="p-4 border-b border-white/5">
            <DialogTitle>Vista Previa: {previewLesson?.titulo}</DialogTitle>
          </DialogHeader>
          <div className="bg-black">
            {previewLesson && ((previewLesson as any).es_pdf
              ? <PdfViewer url={(previewLesson as any).video_url} />
              : <VideoPlayer url={(previewLesson as any).video_url} tipo="VIDEO" />)}
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CourseDetail
