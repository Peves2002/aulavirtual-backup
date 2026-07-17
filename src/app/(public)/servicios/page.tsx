import fs from 'fs'
import path from 'path'

import React from 'react'

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
  let servicios: { slug: string; displayName: string; image: string | null }[] = []
  
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
    <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto pt-28">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-[var(--web-dark)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Nuestros Servicios
      </h1>
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-16">
        Acompañamos a nuestros clientes con servicios de consultoría, gestión de riesgos, capacitación, respuesta a emergencias y remediación ambiental, garantizando seguridad, cumplimiento y continuidad operativa.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicios.map((servicio) => {
          const waMsg = encodeURIComponent(`Hola, me interesa el servicio: ${servicio.displayName}. ¿Podrían brindarme más información?`)
          const waLink = `https://wa.me/51965052858?text=${waMsg}`

          
return (
            <div key={servicio.slug} className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 transition-all hover:-translate-y-2 hover:shadow-xl group flex flex-col h-full">
              <div className="w-full aspect-video bg-gray-100 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                {servicio.image ? (
                  <img src={servicio.image} alt={servicio.displayName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <span className="text-gray-400 text-sm font-medium">SIN IMAGEN</span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-4 text-[var(--web-dark)]">{servicio.displayName}</h3>
              <p className="text-gray-600 mb-6 flex-1">Solución especializada orientada a garantizar los más altos estándares de calidad y seguridad.</p>
              <div className="flex gap-3 mt-auto">
                <a href={`/servicios/${servicio.slug}`} className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-[var(--web-primary)] text-[var(--web-primary)] font-semibold text-sm no-underline hover:bg-[var(--web-primary)] hover:text-white transition-all">
                  Ver detalles
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm no-underline hover:bg-[#1aab52] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  Contactar
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
