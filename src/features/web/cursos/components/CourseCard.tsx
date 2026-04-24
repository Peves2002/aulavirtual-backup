'use client'

import type { MouseEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Box, 
  Typography, 
  Button, 
  Stack, 
  IconButton, 
  Chip, 
  Tooltip 
} from '@mui/material'
import { MessageCircle, Clock, Calendar, Users, ShoppingCart, Check, ArrowRight } from "lucide-react";
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
        className="relative h-full flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
        onClick={() => router.push(`/cursos/${slug}`)}
      >
        {/* Thumbnail Wrapper */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Badges on Image */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${tipo_emision === 'SINCRONO' ? 'bg-red-500' : 'bg-primary'}`}>
              {tipo_emision === 'SINCRONO' ? 'En Vivo' : 'Asíncrono'}
            </span>
          </div>

          {es_comprado && (
            <div className="absolute top-4 right-4">
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                <Check className="w-3 h-3" /> TU CURSO
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Category */}
          {categoria && (
            <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-3 opacity-60">
              {categoria.nombre}
            </span>
          )}

          {/* Title */}
          <h3 className="text-xl font-black text-primary leading-tight mb-4 line-clamp-2 min-h-[3rem] group-hover:text-accent transition-colors">
            {titulo}
          </h3>

          {/* Instructor & Info */}
          <div className="flex items-center gap-3 mb-6">
            <UserAvatar
              src={profesor.avatar}
              name={profesor.nombre}
              apellido={profesor.apellido}
              size={32}
              sx={{ border: '2px solid #f1f5f9' }}
            />
            <div className="flex flex-col">
               <span className="text-xs font-bold text-slate-400">Instructor</span>
               <span className="text-sm font-black text-primary">{profesor.nombre} {profesor.apellido}</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-50">
            {displayDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-slate-500">{displayDate}</span>
              </div>
            )}
            {duracion && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-slate-500">{duracion}</span>
              </div>
            )}
          </div>

          {/* Footer Card */}
          <div className="mt-auto flex items-center justify-between gap-4">
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Inversión</span>
               <span className="text-2xl font-black text-primary">
                 {es_comprado ? 'Acceso Total' : (es_gratis ? 'Gratis' : `${moneda} ${precio}`)}
               </span>
            </div>

            <div className="flex gap-2">
                {!es_comprado && (
                    <Tooltip title={inCart ? 'Ya en carrito' : 'Añadir'}>
                        <button 
                            onClick={handleAddToCart}
                            disabled={inCart}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${inCart ? 'bg-green-50 text-green-500 border border-green-200' : 'bg-slate-50 text-primary border border-slate-100 hover:bg-primary hover:text-white'}`}
                        >
                            {inCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                        </button>
                    </Tooltip>
                )}
                
                <button 
                    className={`h-12 px-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${es_comprado ? 'bg-green-500 text-white shadow-lg' : 'bg-primary text-white hover:bg-accent shadow-xl shadow-primary/20'}`}
                >
                    {es_comprado ? 'Aprender' : 'Detalles'}
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
