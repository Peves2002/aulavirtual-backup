import type { Metadata } from 'next'

import { Toaster } from 'sonner'

import './grupo-corpus.css'

export const metadata: Metadata = {
  title: 'Grupo Corpus — Formación técnica eléctrica con AutoCAD Electrical y DIALux',
  description:
    'Domina el diseño eléctrico con AutoCAD Electrical, DIALux y software profesional. Certificación con valor curricular. 100% virtual.'
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='gc-site relative bg-white'>
      <link
        href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap'
        rel='stylesheet'
      />
      {children}
      <Toaster />
    </div>
  )
}
