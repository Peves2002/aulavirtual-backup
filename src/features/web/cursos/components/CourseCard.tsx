'use client'

import type { MouseEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Tooltip } from '@mui/material'
import { Clock, Calendar, User, Star, ShoppingCart, Check, ArrowRight } from "lucide-react";
import { useCart } from '../../cart/context/CartContext'
import HydratedDate from '@/utils/components/HydratedDate'
import UserAvatar from '@/utils/components/UserAvatar'
import CourseThumbnail from '@/utils/components/CourseThumbnail'

interface CourseCardProps {
  id: string
  titulo: string
  slug: string
  descripcion?: string
  miniatura?: string
  precio: number
  moneda: string
  es_gratis: boolean
  profesor: {
    id?: string
    slug?: string
    nombre: string
    apellido: string
    avatar?: string
  }
  categoria?: {
    nombre: string
  }
  nivel?: string
  tipo_emision?: string
  fecha_inicio?: string | Date | null
  creado_en?: string | Date
  duracion?: string | null
  es_comprado?: boolean
  video_presentacion?: string | null
}

export default function CourseCard({
  id,
  titulo,
  slug,
  miniatura,
  precio,
  moneda,
  es_gratis,
  profesor,
  categoria,
  nivel,
  tipo_emision,
  fecha_inicio,
  creado_en,
  duracion,
  es_comprado,
  video_presentacion
}: CourseCardProps) {
  const router = useRouter()
  const { addToCart, isInCart } = useCart()
  const inCart = isInCart(id)

  const handleAddToCart = (e: MouseEvent) => {
    e.stopPropagation()
    addToCart({ id, titulo, slug, miniatura, precio, moneda })
  }

  const getNivelLabel = (n?: string) => {
    if (n === 'BASICO') return 'Básico'
    if (n === 'INTERMEDIO') return 'Intermedio'
    if (n === 'AVANZADO') return 'Avanzado'
    return n || 'General'
  }

  const getDisplayDate = () => {
    const dateToUse = (tipo_emision === 'SINCRONO' || tipo_emision === 'MIXTO')
      ? fecha_inicio
      : creado_en
    if (!dateToUse) return null
    const date = new Date(dateToUse)
    return (
      <HydratedDate
        date={date}
        format="date"
        options={{ day: '2-digit', month: '2-digit', year: 'numeric' }}
      />
    )
  }

  const displayDate = getDisplayDate()

  return (
    <div className="elite-landing group h-full">
      <div
        className="h-full glass-modern rounded-[2.5rem] overflow-hidden bg-white/70 hover:-translate-y-4 hover:shadow-2xl transition-all duration-700 cursor-pointer flex flex-col"
        onClick={() => router.push(`/cursos/${slug}`)}
      >
        {/* Course Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <CourseThumbnail
            src={miniatura}
            title={titulo}
            videoUrl={video_presentacion}
            aspectRatio="16/10"
            sx={{
              display: 'block',
              width: '100%',
              height: '100%',
              '& img': { transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)' }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Category Badge on Image */}
          <div className="absolute top-6 left-6 flex gap-2">
            {categoria && (
              <div className="px-4 py-2 rounded-xl glass-frost border border-white/20">
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{categoria.nombre}</span>
              </div>
            )}
          </div>

          {/* Emission type badge */}
          {tipo_emision === 'SINCRONO' && (
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                En Vivo
              </span>
            </div>
          )}

          {es_comprado && (
            <div className="absolute top-6 right-6">
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                <Check className="w-3 h-3" /> TU CURSO
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 flex-1 flex flex-col">
          {/* Instructor */}
          <div className="flex items-center gap-2 mb-4 text-xs font-black text-slate-400 uppercase tracking-widest">
            <User className="w-4 h-4 text-[var(--primary-main)]" />
            {profesor.nombre} {profesor.apellido}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-black text-[var(--primary-main)] mb-0 line-clamp-3 h-16 group-hover:text-accent transition-colors leading-tight">
            {titulo}
          </h3>

          {/* Stats Row */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
              {duracion && (
                <div className="flex items-center gap-1">
                  <Clock className="w-6 h-6 text-[var(--primary-main)]" />
                  {duracion}
                </div>
              )}
              {displayDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-6 h-6 text-[var(--primary-main)]" />
                  {displayDate}
                </div>
              )}
            </div>
          </div>

          {/* Price + Action Footer */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[var(--primary-main)]">
                {es_comprado ? 'Acceso Total' : (es_gratis ? 'Gratis' : `${moneda} ${precio}`)}
              </span>
            </div>

            <div className="flex gap-2">
              {!es_comprado && !es_gratis && (
                <Tooltip title={inCart ? 'Ya en carrito' : 'Añadir al carrito'}>
                  <button
                    onClick={handleAddToCart}
                    disabled={inCart}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${inCart ? 'bg-green-50 text-green-500 border border-green-200' : 'bg-slate-50 text-[var(--primary-main)] border border-slate-100 hover:bg-[var(--primary-main)] hover:text-white'}`}
                  >
                    {inCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                  </button>
                </Tooltip>
              )}

              <button
                className={`h-12 cursor-pointer px-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${es_comprado ? 'bg-green-500 text-white shadow-lg' : 'bg-[var(--primary-main)] text-white hover:bg-accent shadow-xl shadow-[var(--primary-main)]/20'}`}
              >
                {es_comprado ? 'Aprender' : 'INSCRIBIRSE'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
