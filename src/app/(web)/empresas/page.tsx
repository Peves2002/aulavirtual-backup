import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Building2, Laptop, GraduationCap, Users, Star, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { getConfig, getConfigs } from '@/utils/libs/config'
import prisma from '@/utils/libs/prisma'

export const metadata = {
  title: 'Capacitaciones y Entrenamiento - MS&M Consulting',
  description: 'Desarrollamos el talento de tu organización, a través de servicios de capacitación, entrenamiento y consultoría.',
}

export default async function EmpresasPage() {
  const habilitado = await getConfig('WEB_EMPRESAS_HABILITADO', 'true')
  if (habilitado !== 'true') notFound()

  const configs = await getConfigs()
  const waNumber = (configs.WHATSAPP_NUMERO || '51959436827').replace(/\D/g, '')

  const capacitaciones = await prisma.capacitacion.findMany({
    where: { estado: 'PUBLICADO' },
    orderBy: { orden: 'asc' }
  })

  return (
    <div className="bg-white min-h-screen pb-10">
      {/* ── 1. HERO EMPRESAS ─────────────────────── */}
      <section 
        className="relative w-full h-[550px] flex items-center"
        style={{
          backgroundImage: "url('/servicios/gestion-empresarial/gestion-empresarial.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay oscuro sutil para que resalte la tarjeta */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full relative z-10">
          <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 max-w-[500px]">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#000000] mb-5 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Capacitación y entrenamiento
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Desarrollamos el talento de tu organización, a través de servicios de capacitación, entrenamiento y consultoría, potenciando las herramientas de gestión humana de tu empresa y formando a los equipos de trabajo.
            </p>
            <Link 
              href={`https://wa.me/${waNumber}?text=Hola,%20deseo%20cotizar%20un%20servicio%20de%20capacitación%20in-house.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-sm font-bold py-3 px-8 rounded transition-transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              COTIZA AQUÍ
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. BARRA DE ESTADÍSTICAS ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-3rem] relative z-20">
        <div className="bg-[#FFFDF4] border border-[#FDE68A] rounded-[2rem] p-8 sm:p-10 flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4 shadow-md">
          
          {/* Item 1 */}
          <div className="flex-1 md:border-r border-slate-200 px-2 lg:px-6 flex gap-4 lg:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FEF08A] flex items-center justify-center shrink-0">
              <Users size={28} className="text-[#0F172A]" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Hemos capacitado a <br className="hidden lg:block"/>
                <span className="text-[#D32F2F]">más de 50 empresas</span>
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                En distintos sectores, impulsando el crecimiento de sus equipos y resultados.
              </p>
            </div>
          </div>
          
          {/* Item 2 */}
          <div className="flex-1 md:border-r border-slate-200 px-2 lg:px-6 flex gap-4 lg:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FEF08A] flex items-center justify-center shrink-0">
              <Star size={28} className="text-[#EAB308]" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Más de <span className="text-[#D32F2F]">7 años de<br className="hidden lg:block"/>experiencia</span>
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Diseñando programas efectivos y a la medida de cada organización.
              </p>
            </div>
          </div>
          
          {/* Item 3 */}
          <div className="flex-1 px-2 lg:px-6 flex gap-4 lg:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FEF08A] flex items-center justify-center shrink-0">
              <ShieldCheck size={28} className="text-[#0F172A]" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Profesionales especialistas con <span className="text-[#D32F2F]">más de 10 años de experiencia</span>
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Expertos en gestión, liderazgo, ventas y desarrollo organizacional.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. MODALIDADES ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-20 relative">
        
        {/* Elementos decorativos de fondo */}
        <div className="absolute -right-12 sm:-right-24 top-20 w-48 h-48 bg-[#FEF08A] rounded-full opacity-40 blur-2xl z-0 pointer-events-none" />
        <div className="absolute -left-12 sm:-left-24 bottom-0 w-64 h-64 bg-slate-100 rounded-full opacity-60 blur-3xl z-0 pointer-events-none" />
        
        {/* Texto decorativo */}
        <div className="hidden lg:block absolute -right-4 bottom-0 z-0 opacity-80 rotate-[-5deg]">
          <span className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: "'Caveat', cursive", fontStyle: 'italic' }}>
            Tu crecimiento<br/>es nuestra meta
          </span>
        </div>

        <div className="text-center relative z-10 max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4 uppercase tracking-widest" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Modalidades que contamos
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            Flexibilidad y enfoque práctico para que tu equipo aprenda y aplique desde el primer día.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
          
          {/* Card 1: In House */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col relative group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="h-56 relative overflow-hidden bg-slate-200">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#D32F2F] rounded-br-full z-10 opacity-90" />
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop" alt="In House" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="px-8 pb-10 pt-12 flex flex-col flex-1 items-center text-center relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#D32F2F] rounded-full flex items-center justify-center border-[6px] border-white shadow-sm z-20">
                <Building2 size={36} className="text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4 uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>In House</h3>
              <p className="text-sm text-slate-500 mb-8 flex-1 leading-relaxed">
                Llevamos la capacitación a tu empresa, con contenido personalizado según tus objetivos.
              </p>
              <div className="bg-red-50 text-[#D32F2F] text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2">
                <CheckCircle2 size={16} />
                Ideal para equipos
              </div>
            </div>
          </div>

          {/* Card 2: Virtual */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col relative group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="h-56 relative overflow-hidden bg-slate-200">
              <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600&auto=format&fit=crop" alt="Virtual" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="px-8 pb-10 pt-12 flex flex-col flex-1 items-center text-center relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#D32F2F] rounded-full flex items-center justify-center border-[6px] border-white shadow-sm z-20">
                <Laptop size={36} className="text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4 uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>Virtual</h3>
              <p className="text-sm text-slate-500 mb-8 flex-1 leading-relaxed">
                Capacitación desde cualquier lugar, con la misma calidad y acompañamiento que nos caracteriza.
              </p>
              <div className="bg-red-50 text-[#D32F2F] text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2">
                <CheckCircle2 size={16} />
                Flexible y accesible
              </div>
            </div>
          </div>

          {/* Card 3: Presencial */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col relative group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="h-56 relative overflow-hidden bg-slate-200">
              <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-[#0F172A]/80 to-transparent z-10" />
              <img src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=600&auto=format&fit=crop" alt="Presencial" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="px-8 pb-10 pt-12 flex flex-col flex-1 items-center text-center relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#D32F2F] rounded-full flex items-center justify-center border-[6px] border-white shadow-sm z-20">
                <GraduationCap size={40} className="text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4 uppercase tracking-wide leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Presencial <br className="hidden sm:block"/>(En centro de entrenamiento)
              </h3>
              <p className="text-sm text-slate-500 mb-8 flex-1 leading-relaxed">
                Vive la experiencia de aprender en nuestras modernas instalaciones, con dinámicas prácticas y networking.
              </p>
              <div className="bg-red-50 text-[#D32F2F] text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2">
                <CheckCircle2 size={16} />
                Ambiente profesional
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. CAPACITACIONES (NUEVAS) ─────────────────────── */}
      {capacitaciones.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000000] mb-12 tracking-tight border-b-2 border-slate-100 pb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Nuestras Capacitaciones
          </h2>

          <div className="flex flex-col gap-8">
            {capacitaciones.map((cap) => (
              <div key={cap.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col md:flex-row border border-slate-100">
                
                {/* Imagen izquierda */}
                <div className="md:w-[40%] xl:w-[35%] relative aspect-[4/3] md:aspect-auto">
                  {cap.miniatura ? (
                    <img 
                      src={cap.miniatura} 
                      alt={cap.titulo} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-slate-200 flex items-center justify-center">
                      <span className="text-slate-400 font-medium">Sin imagen</span>
                    </div>
                  )}
                </div>

                {/* Contenido derecha */}
                <div className="md:w-[60%] xl:w-[65%] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#000000] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {cap.titulo}
                    </h3>
                    {cap.descripcion && (
                      <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                        {cap.descripcion}
                      </p>
                    )}
                    
                    {cap.proximas_fechas && (
                      <div className="mb-6 inline-block bg-slate-50 border border-slate-100 rounded-md px-3 py-2">
                        <span className="text-sm font-bold text-slate-800 uppercase tracking-wider block mb-1">Próximas Fechas:</span>
                        <span className="text-[#D32F2F] font-semibold">{cap.proximas_fechas}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Link 
                      href={`https://wa.me/${waNumber}?text=Hola,%20deseo%20más%20información%20sobre%20la%20capacitación:%20${encodeURIComponent(cap.titulo)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-sm font-bold py-3 px-6 rounded transition-colors shadow-sm hover:shadow-md"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      CONTACTAR AHORA
                    </Link>
                    <Link 
                      href={`/empresas/${cap.slug}`}
                      className="flex-1 text-center bg-white border-2 border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] text-sm font-bold py-3 px-6 rounded transition-colors"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      VER MÁS
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
