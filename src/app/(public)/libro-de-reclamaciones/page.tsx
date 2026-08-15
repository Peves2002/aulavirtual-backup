import React from 'react'

import LibroReclamacionesForm from '@/features/web/legal/components/LibroReclamacionesForm'

export const metadata = {
  title: 'Libro de Reclamaciones | IFSEC Group',
  description: 'Libro de reclamaciones virtual para el registro de quejas y reclamos conforme a la ley peruana.',
}

export default function LibroReclamacionesPage() {
  return (
    <div className="min-h-screen bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <LibroReclamacionesForm />
      </div>
    </div>
  )
}
