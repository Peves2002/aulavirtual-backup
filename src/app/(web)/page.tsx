import Link from 'next/link'

import { ArrowRight, ChevronRight, BookOpen, Quote, Building2 } from 'lucide-react'

import AdphHeroForm from '@/features/web/adph/components/AdphHeroForm'
import { ESCUELAS } from '@/features/web/adph/data/escuelas'
import { PROGRAMAS } from '@/features/web/adph/data/programas'

const TESTIMONIOS = [
  { id: 1, name: 'María Fernández', role: 'Gerente de RRHH en TechLatam', quote: 'Los programas de ADPH me dieron las herramientas prácticas que necesitaba para reestructurar todo nuestro departamento. Excelente nivel.', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&q=80' },
  { id: 2, name: 'Carlos Ramírez', role: 'Director de Operaciones', quote: 'La metodología de casos de la Escuela de Liderazgo superó mis expectativas. Pude aplicar lo aprendido desde la primera semana.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80' },
  { id: 3, name: 'Lucía Vargas', role: 'Analista de Cultura Org.', quote: 'Destaco la calidad de los docentes. Profesionales con trayectoria real que comparten su experiencia y te guían paso a paso.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80' },
]

const BLOGS = [
  { id: 1, title: 'El futuro del liderazgo en la era digital y remota', date: '15 Oct, 2023', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80' },
  { id: 2, title: 'Salud Mental y Prevención en el Entorno Laboral', date: '02 Nov, 2023', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80' },
  { id: 3, title: 'Gamificación: El secreto del aprendizaje corporativo', date: '20 Nov, 2023', image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?w=400&q=80' },
]

export default function HomePage() {
  return (
    <>
      {/* 2. PORTADA INICIAL (HeroForm) */}
      <AdphHeroForm
        title={<>Desarrolla tu potencial <br />con ADPH Group</>}
        subtitle="Educación ejecutiva especializada para líderes que buscan transformar la cultura y productividad de sus organizaciones."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
        formTitle="REGÍSTRATE A NUESTRO VIVE DPA"
      />

      {/* 3. SECCIÓN 'ESCUELAS' */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <span className="text-[#3BA8C5] font-extrabold text-xs uppercase tracking-widest block mb-4">Nuestra Oferta Académica</span>
            <h2 className="text-slate-900 font-black text-3xl md:text-4xl tracking-tight">Escuelas Especializadas</h2>
            <div className="w-16 h-1.5 bg-[#3BA8C5] mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ESCUELAS.map(escuela => (
              <div key={escuela.id} className="group cursor-pointer bg-slate-50 border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full rounded-none">
                <div className="h-48 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={escuela.image} alt={escuela.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight">{escuela.name}</h3>
                  <p className="text-sm text-slate-600 font-semibold line-clamp-3 mb-6 flex-grow">{escuela.desc}</p>
                  <Link href={`/escuelas/${escuela.id}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3BA8C5] uppercase tracking-widest hover:text-[#0083B0] transition-colors mt-auto">
                    Conocer más <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN 'PROGRAMAS RECIENTES' */}
      <section className="py-24 bg-[#FBFCFD] border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-16 text-center">
            <h2 className="text-slate-900 font-black text-3xl md:text-4xl tracking-tight">Programas Recientes</h2>
            <div className="w-16 h-1.5 bg-[#3BA8C5] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMAS.map(prog => (
              <div key={prog.id} className="bg-white border border-slate-200 hover:shadow-lg transition-all duration-300 rounded-none overflow-hidden group flex flex-col">
                <div className="h-56 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={prog.image} alt={prog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-slate-900 uppercase tracking-wider rounded-none">
                    {prog.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-[10px] font-extrabold text-[#3BA8C5] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> {prog.duration}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 leading-tight mb-4">{prog.title}</h3>
                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <Link href={`/programas`} className="text-sm font-bold text-slate-700 hover:text-[#3BA8C5] inline-flex items-center gap-2 transition-colors">
                      Ver detalle <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/programas" className="inline-flex items-center justify-center bg-slate-900 hover:bg-[#3BA8C5] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-none transition-colors shadow-lg">
              Ver más Programas
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN 'SOLUCIONES CORPORATIVAS' */}
      <section className="py-32 bg-slate-900 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10 text-center">
          <span className="text-[#3BA8C5] font-extrabold text-xs uppercase tracking-widest block mb-4">Empresas B2B</span>
          <h2 className="text-white font-black text-3xl md:text-5xl tracking-tight mb-6">Soluciones Corporativas</h2>
          <p className="max-w-2xl mx-auto text-slate-300 font-semibold leading-relaxed mb-10">
            Diseñamos programas a medida para potenciar el talento de tu organización: capacitación in-company, consultoría y tecnología de gestión humana.
          </p>
          <Link
            href="/empresas"
            className="inline-flex items-center gap-2 bg-[#3BA8C5] hover:bg-[#0083B0] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-none transition-colors shadow-lg"
          >
            <Building2 className="w-4 h-4" /> Conocer Soluciones Corporativas
          </Link>
        </div>
      </section>

      {/* 6. SECCIÓN 'NOSOTROS' */}
      <section className="py-24 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-[#3BA8C5] font-extrabold text-xs uppercase tracking-widest block">Sobre Nosotros</span>
              <h2 className="text-slate-900 font-black text-3xl md:text-4xl tracking-tight">Expertos en formación ejecutiva</h2>
              <p className="text-slate-600 text-base md:text-lg font-semibold leading-relaxed">
                ADPH Group es una institución líder dedicada a transformar el talento de los profesionales de Latinoamérica. Mediante programas de alta exigencia, una plana docente de primer nivel y metodologías centradas en la acción, garantizamos un aprendizaje orientado a resultados corporativos tangibles.
              </p>
              <div className="pt-4">
                <Link href="/nosotros" className="inline-flex items-center gap-2 text-[#3BA8C5] font-extrabold uppercase text-xs tracking-widest hover:text-[#0083B0] transition-colors">
                  Conoce nuestra historia <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden border border-slate-100 shadow-xl rounded-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" alt="Nosotros ADPH Group" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 z-0 rounded-none -rotate-6" style={{ backgroundColor: 'rgba(59,168,197,0.1)', border: '1px solid rgba(59,168,197,0.2)' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECCIÓN 'TESTIMONIOS' */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-16 text-center">
            <h2 className="text-slate-900 font-black text-3xl md:text-4xl tracking-tight">Lo que dicen nuestros alumnos</h2>
            <div className="w-16 h-1.5 bg-[#3BA8C5] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIOS.map(testimonio => (
              <div key={testimonio.id} className="bg-white p-8 border border-slate-200 rounded-none relative flex flex-col shadow-sm hover:shadow-md transition-shadow">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100" />
                <p className="text-slate-600 font-semibold text-sm leading-relaxed mb-8 flex-grow relative z-10 italic">
                  &quot;{testimonio.quote}&quot;
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={testimonio.image} alt={testimonio.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm leading-tight">{testimonio.name}</h4>
                    <span className="text-slate-500 text-xs font-semibold">{testimonio.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SECCIÓN 'BLOGS' */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-[#3BA8C5] font-extrabold text-xs uppercase tracking-widest block mb-4">Actualidad</span>
              <h2 className="text-slate-900 font-black text-3xl tracking-tight">Nuestro Blog</h2>
              <div className="w-16 h-1.5 bg-[#3BA8C5] mt-4"></div>
            </div>
            <Link href="/blog" className="inline-flex text-xs font-extrabold uppercase tracking-widest text-[#3BA8C5] hover:text-[#0083B0] items-center gap-2 transition-colors">
              Ver todos los artículos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOGS.map(blog => (
              <div key={blog.id} className="group cursor-pointer flex flex-col">
                <div className="h-56 overflow-hidden rounded-none mb-6 border border-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">{blog.date}</span>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-[#3BA8C5] transition-colors leading-tight">{blog.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA FINAL ADPH */}
      <AdphHeroForm
        title={<>Inicia tu proceso de <br /><span style={{ color: '#3BA8C5' }}>Admisión</span></>}
        subtitle="Únete a nuestra exclusiva red de profesionales. Completa el formulario y un asesor académico se pondrá en contacto contigo a la brevedad."
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80"
        formTitle="REGÍSTRATE A NUESTRO PROGRAMA"
      />
    </>
  )
}
