'use client'

import Image from 'next/image'
import Link from 'next/link'

import type { GrupoInsumos, SeccionProcedimiento } from '@/features/admin/recetas/entity/Receta'

type RecetaDetalleProps = {
  nombre: string
  imagen: string | null
  descripcion: string | null
  insumos: GrupoInsumos[]
  procedimiento: SeccionProcedimiento[]
  observaciones: string | null
}

export function RecetaDetalle({ nombre, imagen, descripcion, insumos, procedimiento, observaciones }: RecetaDetalleProps) {
  return (
    <article className='max-w-4xl mx-auto px-5 lg:px-8 py-12'>
      {/* Volver */}
      <div className='mb-8'>
        <Link href='/recetas' className='inline-flex items-center gap-2 text-sm font-medium text-[#4A7018] hover:text-[#2D5010] transition-colors'>
          <i className='tabler-arrow-left text-base' />
          Volver a Recetas
        </Link>
      </div>

      {/* Header */}
      <div className='mb-10 text-center'>
        <div className='inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#EAF7D0] border border-[#A8E060]/30'>
          <span className='w-1.5 h-1.5 rounded-full bg-[#5A9020]' />
          <p className='text-[11px] font-bold uppercase tracking-[2px]' style={{ color: '#2D5010' }}>Receta</p>
        </div>
        <h1 className='font-bold text-4xl lg:text-5xl text-[#1A3A0A] mb-4'>{nombre}</h1>
        {descripcion && <p className='text-[#4A7018] text-lg max-w-2xl mx-auto'>{descripcion}</p>}
      </div>

      {/* Imagen */}
      {imagen && (
        <div className='relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-xl'>
          <Image src={imagen} alt={nombre} fill sizes='(max-width: 1024px) 100vw, 896px' className='object-cover' />
        </div>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        {/* Insumos */}
        <section>
          <h2 className='font-bold text-2xl text-[#1A3A0A] mb-6 flex items-center gap-2'>
            <i className='tabler-list-check text-[#5A9020]' />
            Insumos
          </h2>
          <div className='space-y-6'>
            {insumos.map((grupo, gi) => (
              <div key={gi}>
                <h3 className='font-semibold text-[#2D5010] mb-3 text-sm uppercase tracking-wide'>{grupo.grupo}</h3>
                <div className='rounded-xl overflow-hidden border border-[#A8E060]/30'>
                  <table className='w-full text-sm'>
                    <thead>
                      <tr className='bg-[#EAF7D0]'>
                        <th className='text-left px-4 py-2 text-[#2D5010] font-semibold'>Insumo</th>
                        <th className='text-right px-4 py-2 text-[#2D5010] font-semibold'>Kilos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grupo.items.map((item, ii) => (
                        <tr key={ii} className={ii % 2 === 0 ? 'bg-white' : 'bg-[#F7FBF0]'}>
                          <td className='px-4 py-2 text-[#1A3A0A]'>{item.insumo}</td>
                          <td className='px-4 py-2 text-right text-[#4A7018] font-mono'>{item.cantidad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {observaciones && (
            <div className='mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200'>
              <p className='text-sm font-semibold text-amber-800 mb-1 flex items-center gap-1'>
                <i className='tabler-info-circle' /> Observación
              </p>
              <p className='text-sm text-amber-700'>{observaciones}</p>
            </div>
          )}
        </section>

        {/* Procedimiento */}
        <section>
          <h2 className='font-bold text-2xl text-[#1A3A0A] mb-6 flex items-center gap-2'>
            <i className='tabler-chef-hat text-[#5A9020]' />
            Procedimiento
          </h2>
          <div className='space-y-8'>
            {procedimiento.map((sec, si) => (
              <div key={si}>
                <h3 className='font-semibold text-[#2D5010] mb-3 text-sm uppercase tracking-wide'>{sec.seccion}</h3>
                <ol className='space-y-3'>
                  {sec.pasos.map((paso, pi) => (
                    <li key={pi} className='flex gap-3'>
                      <span className='flex-shrink-0 w-6 h-6 rounded-full bg-[#5A9020] text-white text-xs font-bold flex items-center justify-center mt-0.5'>
                        {pi + 1}
                      </span>
                      <p className='text-[#1A3A0A] text-sm leading-relaxed'>{paso}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}
