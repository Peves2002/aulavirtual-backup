'use client'

import { BookOpen } from 'lucide-react'
import CourseCardRed from './CourseCardRed'

interface Course {
  id: string
  titulo: string
  slug: string
  miniatura?: string
  precio: number
  precio_usd?: number | null
  moneda: string
  es_gratis: boolean
  profesor: { nombre: string; apellido: string; avatar?: string }
}

interface Props {
  courses: Course[]
  emptyMessage?: string
}

export default function HomeCoursesSectionRed({
  courses,
  emptyMessage = 'Próximamente habrá cursos disponibles.'
}: Props) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <BookOpen size={48} className="mx-auto mb-4 opacity-40" />
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map(course => (
        <CourseCardRed key={course.id} {...course} />
      ))}
    </div>
  )
}
