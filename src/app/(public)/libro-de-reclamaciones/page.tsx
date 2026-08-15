import React from 'react'

import { getConfigs } from '@/utils/libs/config'
import LibroReclamacionesForm from '@/features/web/legal/components/LibroReclamacionesForm'

export const metadata = {
  title: 'Libro de Reclamaciones | IFSEC Group',
  description: 'Libro de reclamaciones virtual para el registro de quejas y reclamos conforme a la ley peruana.',
}

export default async function LibroReclamacionesPage() {
  const config = await getConfigs()

  return (
    <div className="min-h-screen bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <LibroReclamacionesForm
          empresaNombre={config.EMPRESA_RAZON_SOCIAL || undefined}
          empresaRuc={config.EMPRESA_RUC || undefined}
          empresaDireccion={config.EMPRESA_DIRECCION || undefined}
        />
      </div>
    </div>
  )
}
