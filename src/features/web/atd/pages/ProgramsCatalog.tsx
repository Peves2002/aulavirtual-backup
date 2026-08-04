'use client'

import { useState, useMemo, useEffect } from 'react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Search, X, RotateCcw, Clock, Calendar, ShoppingCart, Check } from 'lucide-react'

import PageHeader from '@/features/web/atd/PageHeader'
import { Card } from '@/features/web/atd/ui/card'
import { Button } from '@/features/web/atd/ui/button'
import { Input } from '@/features/web/atd/ui/input'
import { cn } from '@/features/web/atd/lib/utils'
import CourseThumbnail from '@/utils/components/CourseThumbnail'
import UserAvatar from '@/utils/components/UserAvatar'
import HydratedDate from '@/utils/components/HydratedDate'
import { useCart } from '@/features/web/cart/context/CartContext'

interface Category {
  id: string
  nombre: string
  slug: string
}

interface ProgramsCatalogProps {
  courses: any[]
  categories: Category[]
}

const selectClass =
  'h-10 rounded-full border bg-muted px-3.5 text-sm font-semibold text-muted-foreground outline-none transition-colors cursor-pointer shrink-0'

function FilterSelect({
  value,
  onChange,
  active,
  children
}: {
  value: string
  onChange: (v: string) => void
  active: boolean
  children: React.ReactNode
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={cn(selectClass, active ? 'border-primary/40 bg-primary/10 text-primary' : 'border-white/5')}
    >
      {children}
    </select>
  )
}

const nivelLabel: Record<string, string> = { BASICO: 'Básico', INTERMEDIO: 'Intermedio', AVANZADO: 'Avanzado' }
const modalidadLabel: Record<string, string> = { SINCRONO: 'En Vivo', MIXTO: 'Mixto', ASINCRONO: 'Grabado' }

const ProgramsCatalog = ({ courses, categories }: ProgramsCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [selectedModality, setSelectedModality] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const searchParams = useSearchParams()

  useEffect(() => {
    const catId = searchParams.get('categoria')

    setSelectedCategory(catId ?? 'all')
  }, [searchParams])

  const filtered = useMemo(() => {
    const result = courses.filter(course => {
      const matchesSearch =
        course.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.descripcion && course.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === 'all' || course.categoria?.slug === selectedCategory

      const matchesLevel =
        selectedLevel === 'all' || (selectedLevel === 'none' ? !course.nivel : course.nivel === selectedLevel)

      const matchesPrice = selectedPrice === 'all' || (selectedPrice === 'free' ? course.es_gratis : !course.es_gratis)

      const matchesModality = selectedModality === 'all' || course.tipo_emision === selectedModality

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice && matchesModality
    })

    return [...result].sort((a, b) => {
      if (sortBy === 'alphabetical') return a.titulo.localeCompare(b.titulo)

      return new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime()
    })
  }, [courses, searchTerm, selectedCategory, selectedLevel, selectedPrice, selectedModality, sortBy])

  const hasFilters =
    searchTerm !== '' ||
    selectedCategory !== 'all' ||
    selectedLevel !== 'all' ||
    selectedPrice !== 'all' ||
    selectedModality !== 'all' ||
    sortBy !== 'recent'

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedLevel('all')
    setSelectedPrice('all')
    setSelectedModality('all')
    setSortBy('recent')
  }

  return (
    <>
      <PageHeader
        eyebrow="Programas de Formación"
        title={<>Encuentra tu <span className="text-gradient-primary">programa ideal</span></>}
        subtitle="Cursos especializados, prácticos y aplicables desde el primer día."
      />

      <section className="container py-12">
        {/* Búsqueda */}
        <div className="relative max-w-2xl mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar programas por título o descripción..."
            className="h-12 rounded-full pl-11 pr-11 bg-card/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 justify-center items-center mb-10">
          <FilterSelect value={selectedCategory} onChange={setSelectedCategory} active={selectedCategory !== 'all'}>
            <option value="all">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.slug}>{cat.nombre}</option>
            ))}
          </FilterSelect>

          <FilterSelect value={selectedLevel} onChange={setSelectedLevel} active={selectedLevel !== 'all'}>
            <option value="all">Todos los niveles</option>
            <option value="BASICO">Básico</option>
            <option value="INTERMEDIO">Intermedio</option>
            <option value="AVANZADO">Avanzado</option>
            <option value="none">Sin nivel</option>
          </FilterSelect>

          <FilterSelect value={selectedPrice} onChange={setSelectedPrice} active={selectedPrice !== 'all'}>
            <option value="all">Tipo / Precio</option>
            <option value="free">Gratuito</option>
            <option value="premium">Premium</option>
          </FilterSelect>

          <FilterSelect value={selectedModality} onChange={setSelectedModality} active={selectedModality !== 'all'}>
            <option value="all">Cualquier modalidad</option>
            <option value="ASINCRONO">Asincrónico</option>
            <option value="SINCRONO">En Vivo</option>
            <option value="MIXTO">Mixto</option>
          </FilterSelect>

          <FilterSelect value={sortBy} onChange={setSortBy} active={false}>
            <option value="recent">Recientes primero</option>
            <option value="alphabetical">A - Z</option>
          </FilterSelect>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors shrink-0"
              aria-label="Limpiar filtros"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-6">{filtered.length} programas disponibles</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg font-medium mb-1">No encontramos programas que coincidan con tu búsqueda.</p>
            <p className="text-sm">Prueba con otras palabras clave o categorías.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(course => (
              <ProgramCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

function ProgramCard({ course }: { course: any }) {
  const router = useRouter()
  const { addToCart, isInCart } = useCart()
  const inCart = isInCart(course.id)

  const displayDateValue = (course.tipo_emision === 'SINCRONO' || course.tipo_emision === 'MIXTO')
    ? course.fecha_inicio
    : course.creado_en

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart({
      id: course.id,
      type: 'CURSO',
      titulo: course.titulo,
      slug: course.slug,
      miniatura: course.miniatura,
      precio: Number(course.precio),
      moneda: course.moneda
    })
  }

  return (
    <Card
      onClick={() => router.push(`/cursos/${course.slug}`)}
      className="overflow-hidden bg-card/50 border-white/5 hover:border-primary/40 hover:-translate-y-1 transition-all group cursor-pointer flex flex-col"
    >
      <div className="h-44 relative overflow-hidden">
        <CourseThumbnail
          src={course.miniatura}
          title={course.titulo}
          videoUrl={course.video_presentacion}
          aspectRatio="auto"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" style={{ zIndex: 2 }} />
        {course.categoria && (
          <div className="absolute top-4 left-4 text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10" style={{ zIndex: 3 }}>
            {course.categoria.nombre}
          </div>
        )}
        <div className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10" style={{ zIndex: 3 }}>
          {course.es_comprado ? 'Tu curso' : (nivelLabel[course.nivel] ?? modalidadLabel[course.tipo_emision] ?? 'General')}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <Link
          href={`/cursos/${course.slug}`}
          onClick={e => e.stopPropagation()}
          className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors"
        >
          {course.titulo}
        </Link>

        <div
          className="flex items-center gap-2 mb-4"
          onClick={e => {
            e.stopPropagation()
            if (course.profesor?.slug) router.push(`/docentes/${course.profesor.slug}`)
          }}
        >
          <UserAvatar src={course.profesor?.avatar} name={course.profesor?.nombre} apellido={course.profesor?.apellido} size={22} />
          <span className="text-xs text-muted-foreground font-medium">Por {course.profesor?.nombre} {course.profesor?.apellido}</span>
        </div>

        <div className="flex gap-4 text-xs text-muted-foreground mb-5">
          {displayDateValue && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <HydratedDate date={new Date(displayDateValue)} format="date" options={{ day: '2-digit', month: '2-digit', year: 'numeric' }} />
            </span>
          )}
          {course.duracion && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {course.duracion}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className={cn('text-xl font-bold', course.es_comprado ? 'text-secondary' : 'text-primary')}>
            {course.es_comprado ? 'Adquirido' : course.es_gratis ? 'Gratis' : `${course.moneda} ${Number(course.precio).toFixed(2)}`}
          </span>

          {!course.es_comprado && (
            <button
              onClick={handleAddToCart}
              disabled={inCart}
              aria-label={inCart ? 'En el carrito' : 'Añadir al carrito'}
              className={cn(
                'h-10 w-10 rounded-xl flex items-center justify-center transition-all shrink-0 border',
                inCart ? 'bg-secondary/10 border-secondary/30 text-secondary' : 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20'
              )}
            >
              {inCart ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            </button>
          )}
        </div>

        <Button size="sm" variant="outline" className="w-full mt-3" asChild>
          <Link href={course.es_comprado ? `/estudiante/aprender/${course.slug}` : `/cursos/${course.slug}`} onClick={e => e.stopPropagation()}>
            {course.es_comprado ? 'Seguir aprendiendo' : 'Ver curso'}
          </Link>
        </Button>
      </div>
    </Card>
  )
}

export default ProgramsCatalog
