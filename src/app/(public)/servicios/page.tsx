import React from 'react'
import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'Servicios | IFSEC Group',
  description: 'Conoce nuestros servicios corporativos.',
}

// Función para formatear de kebab-case a Sentence case (Modo oración)
const toSentenceCase = (str: string) => {
  const words = str.split('-').filter(Boolean).map(w => w.toLowerCase())
  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  }
  return words.join(' ')
}

function getFirstImage(dir: string): string | null {
  if (!fs.existsSync(dir)) return null
  const items = fs.readdirSync(dir)
  for (const item of items) {
    const fullPath = path.join(dir, item)
    if (fs.statSync(fullPath).isDirectory()) {
      const res = getFirstImage(fullPath)
      if (res) return res
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(item)) {
      return fullPath
    }
  }
  return null
}

export default function ServiciosPage() {
  const serviciosDir = path.join(process.cwd(), 'public', 'images', 'servicios')
  let servicios = []
  
  if (fs.existsSync(serviciosDir)) {
    const dirs = fs.readdirSync(serviciosDir).filter(d => fs.statSync(path.join(serviciosDir, d)).isDirectory())
    servicios = dirs.map(dir => {
      const imgPath = getFirstImage(path.join(serviciosDir, dir))
      const url = imgPath ? '/' + imgPath.replace(/\\/g, '/').split('/public/')[1] : null
      return {
        slug: dir,
        displayName: toSentenceCase(dir),
        image: url
      }
    })
  }

  return (
    <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-[var(--web-dark)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Nuestros Servicios
      </h1>
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-16">
        Ofrecemos soluciones integrales y personalizadas para potenciar el desarrollo de tu empresa y equipo de trabajo, asegurando operaciones seguras y productivas.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicios.map((servicio) => (
          <a href={`/servicios/${servicio.slug}`} key={servicio.slug} className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 transition-all hover:-translate-y-2 hover:shadow-xl group flex flex-col h-full no-underline">
            <div className="w-full aspect-video bg-gray-100 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
              {servicio.image ? (
                <img src={servicio.image} alt={servicio.displayName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <span className="text-gray-400 text-sm font-medium">SIN IMAGEN</span>
              )}
            </div>
            <h3 className="text-xl font-bold mb-4 text-[var(--web-dark)]">{servicio.displayName}</h3>
            <p className="text-gray-600 mb-6 flex-1">Solución especializada orientada a garantizar los más altos estándares de calidad y seguridad.</p>
            <span className="text-[var(--web-primary)] font-semibold flex items-center gap-2 mt-auto group-hover:underline">
              Ver detalles
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
