'use client'

import { RecetaDetalle } from '../components/RecetaDetalle'
import type { GrupoInsumos, SeccionProcedimiento } from '@/features/admin/recetas/entity/Receta'

type Props = {
  receta: {
    nombre: string
    imagen: string | null
    descripcion: string | null
    insumos: GrupoInsumos[]
    procedimiento: SeccionProcedimiento[]
    observaciones: string | null
    video_url: string | null
  }
}

export function RecetaDetallePage({ receta }: Props) {
  return <RecetaDetalle {...receta} />
}
