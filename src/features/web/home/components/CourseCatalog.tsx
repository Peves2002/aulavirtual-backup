'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CourseCardCatalog from './CourseCardCatalog'
import type { TipoPrograma } from '@/utils/configs/tipoPrograma'

interface Category {
  id: string
  nombre: string
  slug: string
}

interface Course {
  id: string
  titulo: string
  slug: string
  miniatura?: string
  precio: number
  precio_usd?: number | null
  moneda: string
  es_gratis: boolean
  categoria?: { nombre: string; slug: string }
  tipo?: string
  creado_en: string | Date
}

interface CourseCatalogProps {
  courses: Course[]
  categories: Category[]
  tipo?: TipoPrograma
}

export default function CourseCatalog({ courses, categories, tipo = 'CURSO' }: CourseCatalogProps) {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState('recent')
  const [priceRange, setPriceRange] = useState(250) // dummy state for slider max

  useEffect(() => {
    const catId = searchParams.get('categoria')
    if (catId) {
      setSelectedCategory(catId)
    } else {
      setSelectedCategory('all')
    }
  }, [searchParams])

  // Count categories
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'all': courses.length }
    courses.forEach(c => {
      if (c.categoria?.slug) {
        counts[c.categoria.slug] = (counts[c.categoria.slug] || 0) + 1
      }
    })
    return counts
  }, [courses])

  const filteredAndSortedCourses = useMemo(() => {
    const filtered = courses.filter(course => {
      const matchesCategory = selectedCategory === 'all' || course.categoria?.slug === selectedCategory
      // En un caso real, filtraríamos por priceRange aquí
      return matchesCategory
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime()
      } else if (sortBy === 'alphabetical') {
        return a.titulo.localeCompare(b.titulo)
      }
      return 0
    })
  }, [courses, selectedCategory, sortBy])

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar (Filtros) */}
      <aside className="w-full md:w-[280px] flex-shrink-0">
        
        {/* Precio Filter */}
        <div className="mb-8">
          <h3 className="text-gray-500 font-medium mb-4 uppercase text-sm tracking-wide">
            Filtrar productos por precio
          </h3>
          <div className="px-2">
            <input 
              type="range" 
              min="0" 
              max="1000" 
              value={priceRange} 
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#e60000]" 
            />
            <div className="flex justify-between items-center mt-4">
              <button className="bg-[#e60000] text-white text-xs font-bold px-4 py-1.5 rounded">
                FILTRAR
              </button>
              <span className="text-sm text-gray-600">
                Precio: S/ 0 — S/ {priceRange}
              </span>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div>
          <h3 className="text-gray-500 font-medium mb-4 uppercase text-sm tracking-wide">
            Categorías
          </h3>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full flex justify-between items-center text-sm ${
                    selectedCategory === cat.slug ? 'text-[#e60000] font-bold' : 'text-gray-700 hover:text-[#e60000]'
                  } transition-colors`}
                >
                  <span>{cat.nombre}</span>
                  <span className="text-gray-400">({categoryCounts[cat.slug] || 0})</span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full flex justify-between items-center text-sm ${
                  selectedCategory === 'all' ? 'text-[#e60000] font-bold' : 'text-gray-700 hover:text-[#e60000]'
                } transition-colors mt-2`}
              >
                <span>Todos</span>
                <span className="text-gray-400">({categoryCounts['all'] || 0})</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content (Grid) */}
      <div className="flex-1">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <p className="text-gray-500 text-sm">
            Mostrando 1–{Math.min(9, filteredAndSortedCourses.length)} de {filteredAndSortedCourses.length} resultados
          </p>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border-none bg-transparent text-gray-700 focus:ring-0 cursor-pointer outline-none font-medium"
          >
            <option value="recent">Orden predeterminado</option>
            <option value="alphabetical">Alfabéticamente</option>
          </select>
        </div>

        {/* Grid */}
        {filteredAndSortedCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCourses.map((course) => (
              <CourseCardCatalog key={course.id} {...course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No se encontraron cursos con estos filtros.
          </div>
        )}

        {/* Pagination Dummy */}
        {filteredAndSortedCourses.length > 0 && (
          <div className="flex justify-center md:justify-start gap-2 mt-12">
            {[1, 2, 3, 4, '...', 6, 7, 8].map((page, idx) => (
              <button 
                key={idx}
                className={`w-8 h-8 flex items-center justify-center text-sm border ${
                  page === 1 ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="w-8 h-8 flex items-center justify-center text-sm border bg-white text-gray-600 border-gray-300 hover:border-gray-400">
              →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
