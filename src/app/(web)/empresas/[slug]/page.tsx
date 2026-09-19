import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cap = await prisma.capacitacion.findUnique({ where: { slug: params.slug } })
  if (!cap) return { title: 'Capacitación no encontrada' }
  return {
    title: `${cap.titulo} | Capacitaciones`,
    description: cap.descripcion,
  }
}

export default async function CapacitacionDetailPage({ params }: { params: { slug: string } }) {
  const capacitacion = await prisma.capacitacion.findUnique({
    where: { slug: params.slug },
    include: { categoria: true }
  })

  if (!capacitacion || capacitacion.estado !== 'PUBLICADO') {
    notFound()
  }

  const configs = await getConfigs()
  const waNumber = (configs.WHATSAPP_NUMERO || '51959436827').replace(/\D/g, '')

  // Fetch "capacitaciones relacionadas de la misma categoria"
  let capacitacionesRelacionadas: any[] = []
  if (capacitacion.categoria_id) {
    capacitacionesRelacionadas = await prisma.capacitacion.findMany({
      where: { 
        categoria_id: capacitacion.categoria_id,
        estado: 'PUBLICADO',
        id: { not: capacitacion.id }
      },
      take: 3,
      orderBy: { creado_en: 'desc' }
    })
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Regresar */}
        <div className="mb-8">
          <Link href="/empresas" className="text-[#000000] font-semibold hover:underline flex items-center gap-2">
            <i className="tabler-arrow-left" /> Regresar a Capacitaciones
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content (Left) */}
          <div className="lg:w-2/3">
            
            {/* Header / Titulo */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 mb-8 border border-slate-100">
              {capacitacion.miniatura && (
                <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden mb-8 relative">
                  <img 
                    src={capacitacion.miniatura} 
                    alt={capacitacion.titulo} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#000000] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {capacitacion.titulo}
              </h1>
              
              {capacitacion.proximas_fechas && (
                <div className="inline-block bg-[#D32F2F]/10 rounded-lg px-4 py-2 mt-2 border border-[#D32F2F]/20">
                  <span className="text-[#D32F2F] font-bold text-sm tracking-wide uppercase block">Próximas Fechas:</span>
                  <span className="text-[#000000] font-semibold text-lg">{capacitacion.proximas_fechas}</span>
                </div>
              )}
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-8">
              
              {capacitacion.descripcion && (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 border border-slate-100">
                  <h2 className="text-xl font-bold text-[#000000] mb-6 flex items-center gap-3 border-b border-slate-100 pb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <span className="bg-[#D32F2F] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                    ¿DE QUÉ TRATA EL TEMA?
                  </h2>
                  <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">
                    {capacitacion.descripcion}
                  </div>
                </div>
              )}

              {capacitacion.dirigido_a && (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 border border-slate-100">
                  <h2 className="text-xl font-bold text-[#000000] mb-6 flex items-center gap-3 border-b border-slate-100 pb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <span className="bg-[#D32F2F] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                    ¿A QUIÉNES ESTÁ DIRIGIDO?
                  </h2>
                  <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">
                    {capacitacion.dirigido_a}
                  </div>
                </div>
              )}

              {capacitacion.temario && (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 border border-slate-100">
                  <h2 className="text-xl font-bold text-[#000000] mb-6 flex items-center gap-3 border-b border-slate-100 pb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <span className="bg-[#D32F2F] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                    TEMARIO
                  </h2>
                  <div className="flex flex-col gap-3 mt-2">
                    {capacitacion.temario.split('\n').filter(Boolean).map((line, index) => {
                      const text = line.replace(/^[-•*]\s*/, '').trim();
                      if (!text) return null;
                      return (
                        <div key={index} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-[#D32F2F]/30 hover:shadow-sm transition-all group">
                          <div className="bg-white p-1.5 rounded-full shadow-sm text-[#D32F2F] flex-shrink-0 mt-0.5 group-hover:bg-[#D32F2F] group-hover:text-white transition-colors">
                            <i className="tabler-check text-base font-bold" />
                          </div>
                          <span className="text-slate-700 font-medium leading-relaxed pt-0.5">{text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* CTA Button Bottom */}
            <div className="mt-10 mb-10 text-center">
              <Link 
                href={`https://wa.me/${waNumber}?text=Hola,%20deseo%20más%20información%20sobre%20la%20capacitación:%20${encodeURIComponent(capacitacion.titulo)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-lg font-bold py-4 px-12 rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                CONTACTA AHORA
              </Link>
            </div>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
              <h3 className="text-lg font-extrabold text-[#000000] mb-6 uppercase tracking-wider border-b border-slate-100 pb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Capacitaciones relacionadas
              </h3>
              
              {capacitacionesRelacionadas.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {capacitacionesRelacionadas.map((capa) => (
                    <Link href={`/empresas/${capa.slug}`} key={capa.id} className="group flex flex-col sm:flex-row lg:flex-col gap-4">
                      {capa.miniatura ? (
                        <div className="w-full sm:w-32 lg:w-full aspect-video rounded-lg overflow-hidden relative flex-shrink-0">
                          <img 
                            src={capa.miniatura} 
                            alt={capa.titulo}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                        </div>
                      ) : (
                        <div className="w-full sm:w-32 lg:w-full aspect-video rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <i className="tabler-book text-slate-400 text-2xl" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-[#000000] text-sm group-hover:text-[#D32F2F] transition-colors line-clamp-2">
                          {capa.titulo}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {capa.descripcion || 'Ver más detalles de esta capacitación...'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">No hay capacitaciones relacionadas por el momento.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
