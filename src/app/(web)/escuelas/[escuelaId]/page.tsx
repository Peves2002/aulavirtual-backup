import Link from 'next/link'

import { BookOpen, ChevronRight } from 'lucide-react'

import AdphHeroForm from '@/features/web/adph/components/AdphHeroForm'
import { ESCUELAS, getEscuela } from '@/features/web/adph/data/escuelas'
import { PROGRAMAS } from '@/features/web/adph/data/programas'

export function generateStaticParams() {
  return ESCUELAS.map(e => ({ escuelaId: e.id }))
}

export function generateMetadata({ params }: { params: { escuelaId: string } }) {
  const escuela = getEscuela(params.escuelaId)

  return {
    title: `${escuela.name} - ADPH Group`,
    description: escuela.desc
  }
}

export default function EscuelaPage({ params }: { params: { escuelaId: string } }) {
  const escuela = getEscuela(params.escuelaId)
  const programasEscuela = PROGRAMAS.filter(p => p.category === escuela.name)

  return (
    <>
      <AdphHeroForm
        title={escuela.name}
        subtitle={escuela.desc}
        backgroundImage={escuela.heroBg}
        defaultSchool={escuela.name}
      />

      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <h2 className="text-slate-900 font-black text-3xl md:text-4xl tracking-tight">
              Programas Especializados
            </h2>
            <div className="w-16 h-1.5 bg-[#3BA8C5] mt-6"></div>
          </div>

          {programasEscuela.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programasEscuela.map(prog => (
                <div key={prog.id} className="bg-white border border-slate-200 hover:shadow-lg transition-all duration-300 rounded-none overflow-hidden group flex flex-col">
                  <div className="h-56 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={prog.image} alt={prog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-slate-900 uppercase tracking-wider">
                      {prog.category}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <span className="text-[10px] font-extrabold text-[#3BA8C5] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> {prog.duration}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 leading-tight mb-4">{prog.title}</h3>
                    <div className="mt-auto pt-6 border-t border-slate-100">
                      <Link href="/programas" className="text-sm font-bold text-slate-700 hover:text-[#3BA8C5] inline-flex items-center gap-2 transition-colors">
                        Ver detalle <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200">
              <p className="text-slate-500 font-semibold">Próximamente abriremos nuevos programas para esta escuela.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
