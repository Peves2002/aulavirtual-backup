'use client'

import { useState } from 'react'
import { ChevronDown, PlayCircle, FileText, FileSpreadsheet } from 'lucide-react'

export default function AccordionModules({ modulos }: { modulos: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {modulos.map((modulo, idx) => {
        const isOpen = openIndex === idx
        return (
          <div key={modulo.id} className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm transition-all">
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors focus:outline-none"
            >
              <div className="flex items-center gap-4 pr-4">
                <div className="w-10 h-10 shrink-0 bg-[#08479b]/10 text-[#08479b] rounded-full flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">{modulo.titulo}</h4>
                  {modulo.descripcion && <p className="text-sm text-slate-500 mt-1 line-clamp-1">{modulo.descripcion}</p>}
                </div>
              </div>
              <ChevronDown className={`w-6 h-6 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-6 pb-6 pt-2 border-t border-slate-100">
                {modulo.lecciones && modulo.lecciones.length > 0 ? (
                  <ul className="space-y-3 mt-4">
                    {modulo.lecciones.map((leccion: any, lIdx: number) => (
                      <li key={leccion.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg hover:bg-slate-50">
                        <div className="flex items-center gap-3">
                          {leccion.es_pdf ? (
                            <FileText className="w-5 h-5 text-red-500" />
                          ) : (
                            <PlayCircle className="w-5 h-5 text-[#08479b]" />
                          )}
                          <span className="text-slate-700 font-medium">{leccion.titulo}</span>
                        </div>
                        {leccion.duracion && (
                          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full whitespace-nowrap">
                            {leccion.duracion} min
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 italic mt-4 text-sm">Contenido próximamente.</p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
