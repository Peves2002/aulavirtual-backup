import fs from 'fs'
import path from 'path'

import React from 'react'

import { notFound } from 'next/navigation'
import Link from 'next/link'

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

export default function ServicioDetallePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const serviciosDir = path.join(process.cwd(), 'public', 'images', 'servicios', slug)
  
  if (!fs.existsSync(serviciosDir)) {
    notFound()
  }

  // Si hay carpetas dentro, son subservicios. Si hay imágenes, es galería.
  const items = fs.readdirSync(serviciosDir)
  const subFolders = items.filter(i => fs.statSync(path.join(serviciosDir, i)).isDirectory())
  const images = items.filter(i => /\.(jpg|jpeg|png|webp|gif)$/i.test(i))

  const displayName = toSentenceCase(slug)

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* ── HEADER BÁSICO ── */}
      <section className="bg-[#020817] pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--web-primary)]/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-6 text-sm text-[var(--web-primary)] font-bold flex items-center gap-2">
            <Link href="/servicios" className="hover:text-white transition-colors no-underline">Servicios</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">{displayName}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            {displayName}
          </h1>
        </div>
      </section>

      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* ── COLUMNA IZQUIERDA: DESCRIPCIÓN Y CTA (STICKY) ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Sobre el servicio</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                En IFSEC Group, diseñamos e implementamos estrategias integrales para <strong>{displayName.toLowerCase()}</strong>. Nuestro objetivo es garantizar la continuidad, eficiencia y máxima seguridad de tus operaciones mediante estándares internacionales y personal altamente capacitado.
              </p>
              <a href="https://wa.me/51965052858" target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-[#25D366] text-white font-bold py-4 px-6 rounded-xl hover:bg-[#128C7E] hover:-translate-y-1 transition-all shadow-[0_4px_15px_rgba(37,211,102,0.3)] no-underline gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Contactar Asesor
              </a>
            </div>
          </div>

          {/* ── COLUMNA DERECHA: CONTENIDO ── */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            
            {subFolders.length > 0 && (
              <div>
                <div className="inline-block px-4 py-2 bg-[var(--web-primary)]/10 text-[var(--web-primary)] rounded-full font-semibold text-xs mb-4 uppercase tracking-widest">Especialidades</div>
                <h2 className="text-3xl font-bold mb-8 text-[#0f172a]" style={{ fontFamily: 'Inter, sans-serif' }}>Áreas de Intervención</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {subFolders.map(folder => {
                    const imgPath = getFirstImage(path.join(serviciosDir, folder))
                    const url = imgPath ? '/' + imgPath.replace(/\\/g, '/').split('/public/')[1] : null

                    
return (
                      <div key={folder} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                        <div className="w-full aspect-video bg-gray-100 flex items-center justify-center overflow-hidden relative">
                          {url ? (
                            <img src={url} alt={toSentenceCase(folder)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          ) : (
                            <span className="text-gray-400 text-xs font-bold tracking-widest">SIN IMAGEN</span>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[var(--web-primary)] transition-colors leading-tight">{toSentenceCase(folder)}</h3>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {images.length > 0 && (
              <div>
                <div className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold text-xs mb-4 uppercase tracking-widest">Multimedia</div>
                <h2 className="text-3xl font-bold mb-8 text-[#0f172a]" style={{ fontFamily: 'Inter, sans-serif' }}>Galería de Operaciones</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map(img => (
                    <div key={img} className="bg-gray-100 aspect-square rounded-2xl overflow-hidden border border-gray-200 group shadow-sm">
                      <img src={`/images/servicios/${slug}/${img}`} alt={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {subFolders.length === 0 && images.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                <p className="text-gray-500">Aún no hay información adicional para este servicio.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
