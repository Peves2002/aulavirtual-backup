'use client'

import { useState } from 'react'

import { X } from 'lucide-react'

import SolicitaInfoForm from './SolicitaInfoForm'

export default function MobileStickyForm({ cursoTitulo, categoriaNombre, cursoSlug }: { cursoTitulo: string, categoriaNombre: string, cursoSlug?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Sticky Bottom Bar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex h-[60px] shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full bg-[#fcd116] text-slate-900 font-bold text-[15px] flex items-center justify-center tracking-wide"
        >
          SOLICITA INFORMACIÓN
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded shadow-2xl relative max-h-[90vh] flex flex-col">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute 0 top-0 right-0 w-12 h-12 bg-[#08479b] text-white flex items-center justify-center shadow-md z-10 hover:bg-[#063375] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-8 pt-10 overflow-y-auto custom-scrollbar">
              <h3 className="text-[22px] font-bold mb-6 text-gray-800 tracking-tight">Solicitar información</h3>
              <SolicitaInfoForm cursoTitulo={cursoTitulo} categoriaNombre={categoriaNombre} cursoSlug={cursoSlug} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
