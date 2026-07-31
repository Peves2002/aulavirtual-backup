'use client'

import { useState } from 'react'

import { Plus, Minus, PlayCircle, FileText } from 'lucide-react'

export default function AccordionModules({ modulos }: { modulos: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-0 border-t border-gray-300">
      {modulos.map((modulo, idx) => {
        const isOpen = openIndex === idx

        
return (
          <div key={modulo.id} className="border-b border-gray-300 bg-white overflow-hidden transition-all">
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full text-left py-6 flex items-center justify-between hover:bg-slate-50 transition-colors focus:outline-none"
            >
              <div className="pr-4 text-[18px] text-gray-800">
                 Módulo {idx + 1}: {modulo.titulo}
              </div>
              {isOpen ? (
                 <Minus className="w-6 h-6 text-[#08479b] shrink-0" strokeWidth={2} />
              ) : (
                 <Plus className="w-6 h-6 text-[#08479b] shrink-0" strokeWidth={2} />
              )}
            </button>
            
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pb-6 pt-2">
                {modulo.lecciones && modulo.lecciones.length > 0 ? (
                  <ul className="space-y-3">
                    {modulo.lecciones.map((leccion: any) => (
                      <li key={leccion.id} className="flex flex-col sm:flex-row sm:items-center gap-2 p-2 rounded-lg hover:bg-slate-50">
                        <div className="flex items-center gap-3">
                          {leccion.es_pdf ? (
                            <FileText className="w-5 h-5 text-gray-400" />
                          ) : (
                            <PlayCircle className="w-5 h-5 text-gray-400" />
                          )}
                          <span className="text-gray-600 font-medium text-[15px]">{leccion.titulo}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic mt-2 text-sm">Contenido próximamente.</p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
