import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, Languages, MonitorPlay, Users, Hourglass, ArrowRight, Check, Play, BookOpen, Presentation, Code, Briefcase, ChevronRight, Award } from 'lucide-react'
import prisma from '@/utils/libs/prisma'
import AccordionModules from './components/AccordionModules'
import AdvancedSpecializationsTabs from './components/AdvancedSpecializationsTabs'
import ProgramStickyNav from './components/ProgramStickyNav'
import CourseScholarships from '@/features/web/courses/components/CourseScholarships'
import CourseFAQ from '@/features/web/courses/components/CourseFAQ'
import CourseRelatedPrograms from '@/features/web/courses/components/CourseRelatedPrograms'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const curso = await prisma.curso.findUnique({ where: { slug: params.slug } })
  if (!curso) return { title: 'Programa no encontrado' }
  return {
    title: `${curso.titulo} | ADPH Group`,
    description: curso.descripcion || 'Especialízate con nuestro programa.'
  }
}

export default async function ProgramPage({ params }: { params: { slug: string } }) {
  const curso = await prisma.curso.findUnique({
    where: { slug: params.slug },
    include: {
      categoria: true,
      modulos: {
        orderBy: { orden: 'asc' },
        include: {
          lecciones: { orderBy: { orden: 'asc' } }
        }
      }
    }
  })

  if (!curso) {
    redirect('/programas')
  }

  const beneficios = Array.isArray(curso.beneficios) ? curso.beneficios as any[] : []
  const objetivos = Array.isArray(curso.objetivos) ? curso.objetivos as string[] : []

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800 pb-24">
      
      {/* 1. HERO SECTION (EAE Style but with ADPH Colors) */}
      <section className="relative w-full h-[70vh] min-h-[500px] lg:h-[650px] bg-[#111] overflow-hidden flex flex-col justify-end pt-[80px]">
        {curso.miniatura ? (
          <img src={curso.miniatura} alt={curso.titulo} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-slate-800 to-slate-900 opacity-80" />
        )}
        
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-10 pb-16">
          <h1 className="text-white font-black text-5xl md:text-7xl tracking-tight mb-8 drop-shadow-lg">
            {curso.titulo.toUpperCase()}
          </h1>
          
          <div className="flex items-center gap-3 mb-12">
            <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-[#fcd116] flex items-center justify-center backdrop-blur-sm">
              <Award className="w-8 h-8 text-[#fcd116]" />
            </div>
            <div className="text-white font-medium text-sm md:text-base leading-tight drop-shadow-md">
              Formación de Excelencia<br />
              <b>Acreditación Profesional</b>
            </div>
          </div>

          {/* Info Blocks (Blue instead of Red) */}
          <div className="flex flex-wrap shadow-2xl relative">
            <div className="bg-[#08479b] text-white p-4 md:p-6 flex flex-col items-center justify-center text-center w-28 md:w-32 border-r border-white/20">
              <Calendar className="w-6 h-6 mb-2 text-[#fcd116]" />
              <span className="text-xs font-bold">Inicio</span>
              <span className="text-sm">Próximo Mes</span>
            </div>
            <div className="bg-[#08479b] text-white p-4 md:p-6 flex flex-col items-center justify-center text-center w-28 md:w-32 border-r border-white/20">
              <Clock className="w-6 h-6 mb-2 text-[#fcd116]" />
              <span className="text-xs font-bold">{curso.duracion || '6 Meses'}</span>
            </div>
            <div className="bg-[#08479b] text-white p-4 md:p-6 flex flex-col items-center justify-center text-center w-28 md:w-32 border-r border-white/20">
              <Languages className="w-6 h-6 mb-2 text-[#fcd116]" />
              <span className="text-xs font-bold">Español</span>
            </div>
            <div className="bg-[#08479b] text-white p-4 md:p-6 flex flex-col items-center justify-center text-center w-28 md:w-32">
              <MonitorPlay className="w-6 h-6 mb-2 text-[#fcd116]" />
              <span className="text-xs font-bold">{curso.tipo_emision || 'Online'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUBMENU BAR (Blue) */}
      <div className="bg-[#08479b] w-full text-white text-[13px] md:text-[15px] font-bold flex overflow-x-auto whitespace-nowrap sticky z-40 shadow-md" style={{ top: 'var(--adph-navbar-height, 80px)' }}>
        <div className="max-w-[1200px] w-full mx-auto px-6 lg:px-10 flex gap-6 md:gap-10 py-5">
          <Link href="#programa" className="hover:text-[#fcd116] transition-colors">Programa</Link>
          <Link href="#certificaciones" className="hover:text-[#fcd116] transition-colors">Certificaciones y Herramientas</Link>
          <Link href="#plan-de-estudios" className="hover:text-[#fcd116] transition-colors">Plan de Estudios</Link>
          <Link href="#salidas-profesionales" className="hover:text-[#fcd116] transition-colors">Salidas Profesionales</Link>
          <Link href="#admision" className="hover:text-[#fcd116] transition-colors">Admisión</Link>
        </div>
      </div>

      {/* 3. BREADCRUMBS */}
      <div className="bg-[#f4f5f7] w-full border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-3 text-xs text-gray-500 flex items-center gap-2">
          <span>ADPH Group</span> <ChevronRight className="w-3 h-3" /> <span className="font-bold text-gray-800">{curso.titulo}</span>
        </div>
      </div>

      {/* 4. MAIN LAYOUT (2 COLUMNS) */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 relative">
        
        {/* LEFT COLUMN: CONTENT */}
        <div>
          
          {/* Availability Banner */}
          <div className="flex bg-[#08479b] text-white p-4 rounded text-sm font-bold mb-10 shadow-sm">
            <div className="flex-1 flex items-center gap-2"> <Users className="w-5 h-5 text-[#fcd116]"/> 75% de plazas reservadas</div>
            <div className="flex-1 flex items-center gap-2 justify-end"> <Hourglass className="w-5 h-5 text-[#fcd116]"/> 6 plazas disponibles</div>
          </div>
          
          {/* Main Description */}
          <div id="programa" className="text-[15px] text-gray-700 space-y-6 mb-16 leading-relaxed whitespace-pre-wrap scroll-mt-40">
            {(curso as any).titulo_programa || curso.descripcion || `El ${curso.titulo} es un programa que te prepara para liderar con visión global y estratégico.`}
          </div>

          {/* Benefits Icons Grid (Matches Image 1 exactly) */}
          {(curso as any).mostrar_beneficios && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {(beneficios.length > 0 ? beneficios : [
                { icon: BookOpen, title: 'Visión global de negocio', desc: 'Comprende cómo interactúan estrategia, marketing, finanzas y operaciones' },
                { icon: Code, title: 'IA aplicada a la gestión', desc: 'Usa inteligencia artificial para mejorar decisiones, procesos y análisis' },
                { icon: Play, title: 'Aprendizaje práctico', desc: 'Trabaja con casos reales, simulaciones y proyectos empresariales' },
                { icon: Briefcase, title: 'Conexión directa con empresas', desc: 'Interactúa con directivos y amplía tu red de networking profesional' },
                { icon: Presentation, title: 'Impulso a tu carrera', desc: 'Diseña tu plan profesional y acelera tu crecimiento corporativo' },
                { icon: Users, title: 'Mentalidad emprendedora', desc: 'Desarrolla proyectos e ideas dentro del ecosistema de innovación' },
              ]).map((item: any, i: number) => {
                // If the item comes from DB, it has .title and .desc. We can fallback the icon to a default if not mapped.
                const IconComponent = item.icon || BookOpen
                
                return (
                  <div key={i} className="bg-[#f4f5f7] rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 mx-auto flex items-center justify-center mb-4 text-[#08479b]">
                      {typeof IconComponent === 'string' ? (
                         <i className={`tabler-${IconComponent}`} style={{ fontSize: '2.5rem' }} />
                      ) : (
                         <IconComponent className="w-10 h-10" strokeWidth={1.2} />
                      )}
                    </div>
                    <h3 className="font-bold text-[15px] text-gray-900 mb-3 leading-tight px-2">{item.title}</h3>
                    <p className="text-[13px] text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          )}

          {/* ¿Es este programa para ti? (Matches Image 2 exactly) */}
          {(curso as any).mostrar_perfil && (
            <div className="mb-24">
              <h2 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-8 tracking-tight">¿Es este programa para ti?</h2>
              <p className="text-[15px] text-gray-600 mb-12 leading-relaxed">
                Este {curso.tipo} está pensado para profesionales que quieren tomar decisiones estratégicas en empresas cada vez más digitales. Si te reconoces en varias de estas situaciones, probablemente estás en el momento adecuado para dar el siguiente paso.
              </p>
              
              <div className="flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-5/12 bg-gray-100 rounded overflow-hidden aspect-[4/5] relative">
                   {/* Professional Image */}
                   <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="Profesional" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-7/12 flex flex-col justify-start pt-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-8 leading-tight">Este {curso.tipo} está pensado para profesionales que:</h3>
                  
                  <ul className="space-y-6">
                    {(curso.perfil_estudiante ? curso.perfil_estudiante.split('\n').filter(Boolean) : [
                      'Lideran o participan en iniciativas de transformación o innovación en su empresa.',
                      'Quieren avanzar hacia roles estratégicos donde las decisiones se basen en datos, tecnología y visión de negocio.',
                      'Necesitan entender cómo aplicar herramientas de gestión en procesos o decisiones empresariales.',
                      'Provienen de áreas como negocio, ingeniería, tecnología, recursos humanos o administración.',
                      'Buscan consolidar su perfil directivo con una visión global de la empresa: estrategia, finanzas y operaciones.',
                      'Quieren fortalecer su capacidad de liderazgo para asumir mayores responsabilidades en su organización.'
                    ]).map((text: string, i: number) => (
                       <li key={i} className="flex gap-4 items-start">
                          <Check className="w-5 h-5 text-[#08479b] shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span className="text-[15px] text-gray-600 leading-relaxed">{text}</span>
                       </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ¿Por qué estudiar aquí? */}
          {(curso as any).mostrar_por_que_estudiar && (
            <div className="mb-24">
              <h2 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-8 tracking-tight">¿Por qué estudiar el {curso.titulo}?</h2>
              
              <div className="w-full aspect-[21/9] bg-gray-200 mb-12 rounded overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop" alt="Clase" className="w-full h-full object-cover" />
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {((curso as any).por_que_estudiar?.length ? (curso as any).por_que_estudiar : [
                  { titulo: 'Visión Global', descripcion: 'Comprender cómo interactúan estrategia, marketing, finanzas y operaciones.' },
                  { titulo: 'Toma de Decisiones', descripcion: 'Tomar decisiones estratégicas en entornos digitales, complejos y cambiantes.' },
                  { titulo: 'Liderazgo', descripcion: 'Liderar equipos y proyectos con visión directiva.' },
                  { titulo: 'Crecimiento', descripcion: 'Avanzar hacia posiciones de mayor responsabilidad dentro de tu organización.' }
                ]).map((item: any, i: number) => (
                  <div key={i} className="mb-8">
                    <h3 className="text-[22px] font-normal text-gray-800 mb-4">{item.titulo}</h3>
                    <div className="flex gap-4 items-start">
                       <Check className="w-5 h-5 text-[#08479b] shrink-0 mt-0.5" strokeWidth={2.5} />
                       <span className="text-[15px] text-gray-600 leading-relaxed">{item.descripcion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ¿Por qué ADPH Group? (Matches Image 3 exactly) */}
          {/* ¿Por qué ADPH Group? */}
          {(curso as any).mostrar_por_que_nosotros && (
            <div className="mb-24">
              <h2 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-8 tracking-tight">¿Por qué ADPH Group?</h2>
              <p className="text-[15px] text-gray-600 mb-14 leading-relaxed">
                 {(curso as any).por_que_nosotros?.texto || 'ADPH Group es una institución que impulsa el progreso profesional a través de una formación conectada con la realidad empresarial. Nuestro enfoque combina rigor académico, visión global y una metodología diseñada para convertir el aprendizaje en impacto.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                 <div>
                    <div className="text-[54px] font-bold text-[#08479b] mb-4 leading-none tracking-tighter">01</div>
                    <h4 className="font-bold text-[15px] text-gray-900 mb-3">Aprendizaje aplicado</h4>
                    <p className="text-[14px] text-gray-600 leading-relaxed">Una metodología práctica basada en retos reales que prepara a los profesionales para tomar decisiones que transforman el negocio.</p>
                 </div>
                 <div>
                    <div className="text-[54px] font-bold text-[#08479b] mb-4 leading-none tracking-tighter">02</div>
                    <h4 className="font-bold text-[15px] text-gray-900 mb-3">Conexión con la industria</h4>
                    <p className="text-[14px] text-gray-600 leading-relaxed">Colaboración constante con empresas líderes en tecnología, consultoría e innovación.</p>
                 </div>
                 <div>
                    <div className="text-[54px] font-bold text-[#08479b] mb-4 leading-none tracking-tighter">03</div>
                    <h4 className="font-bold text-[15px] text-gray-900 mb-3">Ecosistema dinámico</h4>
                    <p className="text-[14px] text-gray-600 leading-relaxed">Uno de los hubs más dinámicos en digitalización, emprendimiento e innovación.</p>
                 </div>
                 <div>
                    <div className="text-[54px] font-bold text-[#08479b] mb-4 leading-none tracking-tighter">04</div>
                    <h4 className="font-bold text-[15px] text-gray-900 mb-3">Comunidad internacional</h4>
                    <p className="text-[14px] text-gray-600 leading-relaxed">Estudiantes y profesionales que amplían la mirada y enriquecen cada proyecto.</p>
                 </div>
              </div>

              <div className="bg-[#08479b] text-white p-8 mt-16 text-center font-bold text-xl md:text-2xl tracking-tight shadow-md">
                 ¡ADPH Group es una institución diseñada para profesionales que lideran, no que solo aprenden!
              </div>
            </div>
          )}

          {/* Certificaciones */}
          {/* Certificaciones */}
          {(curso as any).mostrar_certificaciones && (
            <div id="certificaciones" className="bg-[#f4f5f7] rounded-sm p-10 mb-24 scroll-mt-40 border border-gray-200">
              <h2 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-10 tracking-tight leading-tight max-w-lg">
                {(curso as any).titulo_certificaciones || 'Prepárate para certificaciones profesionales'}
              </h2>
              
              {((curso as any).certificaciones?.length ? (curso as any).certificaciones : [{
                titulo: 'Scrum Master I',
                descripcion1: 'Durante el programa trabajarás metodologías ágiles utilizadas por empresas de todo el mundo para gestionar proyectos, equipos y procesos de innovación. El programa te prepara para presentarte a la certificación Scrum Master I, una acreditación reconocida internacionalmente.',
                puntos: [
                  'Principios y fundamentos de metodologías ágiles',
                  'Gestión de proyectos con Scrum',
                  'Liderazgo de equipos en entornos ágiles',
                  'Planificación, iteración y mejora continua en proyectos empresariales'
                ],
                entidad: 'Scrum.org',
                siglas: 'PSM I'
              }]).map((cert: any, i: number) => (
                <div key={i} className="flex flex-col md:flex-row gap-12 mb-12">
                   <div className="flex-1">
                     <h4 className="font-bold text-gray-900 text-[18px] mb-4">{cert.titulo}</h4>
                     <p className="text-[14px] text-gray-600 mb-5 leading-relaxed">{cert.descripcion1}</p>
                     
                     {cert.puntos && cert.puntos.length > 0 && (
                       <>
                         <p className="text-[14px] text-gray-600 mb-5">A lo largo del programa desarrollarás conocimientos clave como:</p>
                         <ul className="space-y-4 mb-8">
                           {cert.puntos.map((punto: string, idx: number) => (
                             <li key={idx} className="flex gap-4 items-start"><Check className="w-5 h-5 text-[#08479b] shrink-0 mt-0.5" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">{punto}</span></li>
                           ))}
                         </ul>
                       </>
                     )}
                   </div>
                   <div className="w-full md:w-1/3 flex items-start justify-center pt-8">
                      <div className="w-56 h-56 rounded-full border-[12px] border-[#317997] bg-white flex flex-col items-center justify-center shadow-lg relative">
                         <div className="absolute top-8 -left-5 bg-[#317997] text-white p-2 rounded-sm shadow"><BookOpen className="w-4 h-4"/></div>
                         <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-2 mb-1 flex items-center gap-1 z-10">
                            <Award className="w-3 h-3 text-[#317997]" /> {cert.entidad}
                         </span>
                         <span className="text-[40px] font-black text-[#317997] my-0 leading-none z-10 text-center px-4">{cert.siglas}</span>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          )}

          {/* Tools */}
          {(curso as any).mostrar_herramientas && (
            <div className="mb-24">
              <h2 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-8 tracking-tight leading-tight max-w-2xl">Domina herramientas claves para toma de decisiones empresariales</h2>
              <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">A lo largo del programa trabajarás con herramientas y plataformas utilizadas por empresas para analizar datos, planificar estrategias y gestionar proyectos en entornos empresariales complejos.</p>
              <p className="text-[15px] text-gray-600 mb-12 leading-relaxed">Estas herramientas te permitirán transformar información en decisiones y conectar la estrategia con la ejecución.</p>
              
              <div className="flex flex-wrap gap-4">
                 {((curso as any).herramientas?.length ? (curso as any).herramientas : [
                   { name: 'Power BI', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
                   { name: 'Excel', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg' },
                   { name: 'Microsoft Azure', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg' },
                   { name: 'Keras', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg' },
                   { name: 'PyTorch', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg' }
                 ]).map((tool: any, i: number) => (
                   <div key={i} className="bg-[#f8f9fa] rounded-xl border border-gray-100 flex flex-col items-center justify-center w-36 h-36 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 flex items-center justify-center mb-4">
                         <img src={tool.icon} alt={tool.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <span className="text-[13px] font-bold text-gray-800 text-center">{tool.name}</span>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {/* Plan de Estudios */}
          <div id="plan-de-estudios" className="mb-24 scroll-mt-40">
            <h2 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-12 tracking-tight">
              {(curso as any).titulo_plan_estudios || 'Plan de estudios'}
            </h2>
            
            <div className="flex flex-wrap justify-between items-center mb-16 px-4 md:px-12 text-center gap-8">
               <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-bold text-[#08479b] mb-2">{curso.duracion || '6 Meses'}</span>
                  <span className="text-[13px] text-gray-500">Duración</span>
               </div>
               <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-bold text-[#08479b] mb-2">24 ECTS</span>
                  <span className="text-[13px] text-gray-500">Créditos</span>
               </div>
               <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-bold text-[#08479b] mb-2">Próximo<br/>Mes</span>
                  <span className="text-[13px] text-gray-500">Inicio</span>
               </div>
               <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-bold text-[#08479b] mb-2">{curso.tipo_emision || 'Online'}</span>
                  <span className="text-[13px] text-gray-500">Modalidad</span>
               </div>
            </div>

            <AccordionModules modulos={curso.modulos} />

            {/* Titulación */}
            <div className="mt-16 flex flex-col md:flex-row gap-10 items-center">
               <div className="w-24 h-32 md:w-32 md:h-32 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full text-gray-900">
                     <path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>
                     <circle cx="12" cy="11" r="8" />
                     <path d="m8.5 17.5-1.5 5.5 5-2.5 5 2.5-1.5-5.5"/>
                     <path d="M10 10h4"/>
                     <path d="M10 12h4"/>
                  </svg>
               </div>
               <div className="flex-1">
                  <h4 className="font-bold text-[20px] text-gray-900 mb-6">Titulación:</h4>
                  <ul className="space-y-6">
                    <li className="flex gap-4 items-start">
                       <Check className="w-5 h-5 text-[#08479b] shrink-0 mt-0.5" strokeWidth={2.5}/>
                       <span className="text-[15px] text-gray-600 leading-relaxed">Título oficial de {curso.titulo} expedido por ADPH Group.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                       <Check className="w-5 h-5 text-[#08479b] shrink-0 mt-0.5" strokeWidth={2.5}/>
                       <span className="text-[15px] text-gray-600 leading-relaxed">Certificado propio de Especialización Permanente, añadiendo valor competitivo en el mercado laboral y fortaleciendo tu currículum.</span>
                    </li>
                  </ul>
               </div>
            </div>
          </div>

          {/* Advanced Specializations */}
          <div className="bg-[#f4f5f7] -mx-6 lg:-mx-10 px-6 lg:px-10 py-16 mb-24 border-t border-b border-gray-200">
             <h2 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-10 tracking-tight">Advanced Specializations</h2>
             <h4 className="font-bold text-[18px] text-gray-900 mb-4">Impulsa tu formación. Define tu camino.</h4>
             <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">Las Advanced Specializations son especializaciones certificadas que te permiten personalizar tu programa e incorporar competencias profesionales que hoy marcan la diferencia en el mercado. Diseña un perfil flexible, conectado con las profesiones más demandadas.</p>
             <p className="text-[14px] text-gray-600 mb-6">Elige entre dos focos:</p>
             <h5 className="font-bold text-[14px] text-gray-900 mb-8">Aquí eliges tu camino. ADPH Group lo multiplica</h5>

             <AdvancedSpecializationsTabs />
          </div>

          {/* Valor Añadido */}
          <div className="mb-24 flex flex-col md:flex-row gap-12 items-center">
             <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-6 tracking-tight leading-tight">Un valor añadido gracias a nuestros partners institucionales</h2>
                <p className="text-[15px] text-gray-600 leading-relaxed">Como partner oficial, tus especializaciones se imparten con una orientación real al ecosistema tecnológico y empresarial de la región, reforzando tu visibilidad profesional y tu conexión con el sector.</p>
             </div>
             <div className="w-full md:w-1/3 flex items-center justify-center gap-6">
                <div className="h-16 flex items-center"><img src="https://via.placeholder.com/150x50/ffffff/08479b?text=ADPH+Group" alt="ADPH" className="max-h-full border border-gray-200 p-2" /></div>
                <div className="h-12 w-[1px] bg-gray-300"></div>
                <div className="h-16 flex items-center"><img src="https://via.placeholder.com/150x50/ffffff/08479b?text=Tech+Partner" alt="Partner" className="max-h-full border border-gray-200 p-2" /></div>
             </div>
          </div>

          {/* Rankings y Acreditaciones */}
          {(curso as any).mostrar_rankings && (
            <div className="mb-24">
               <h2 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-16 tracking-tight">Rankings y Acreditaciones</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                 {((curso as any).rankings?.length ? (curso as any).rankings : [
                   { logo: 'https://via.placeholder.com/200x80/ffffff/fcd116?text=QS+Stars', titulo: 'QS Stars', descripcion: 'QS Stars es un sistema internacional que evalúa calidad académica, empleabilidad e internacionalización.' },
                   { logo: 'https://via.placeholder.com/120x80/ffffff/fcd116?text=Eduniversal', titulo: 'Eduniversal', descripcion: 'Clasifica los mejores programas a nivel global basándose en reputación y empleabilidad.' },
                   { logo: 'https://via.placeholder.com/200x80/ffffff/08479b?text=Bloomberg', titulo: 'Bloomberg Businessweek', descripcion: 'Figuramos en el ranking Bloomberg Businessweek Best B-Schools, que reconoce a las escuelas líderes a nivel global.' },
                   { logo: 'https://via.placeholder.com/120x60/08479b/ffffff?text=ADPH+Rank', titulo: 'Ranking Regional', descripcion: 'Clasifica los mejores programas de formación continua con foco en su calidad y posicionamiento en el mercado.' }
                 ]).map((rank: any, i: number) => (
                    <div key={i} className="flex flex-col items-center text-center">
                       <div className="h-20 flex items-center justify-center mb-6">
                          <img src={rank.logo} alt={rank.titulo} className="max-h-full object-contain" />
                       </div>
                       <h4 className="font-bold text-[15px] text-gray-900 mb-4">{rank.titulo}</h4>
                       <p className="text-[14px] text-gray-600 leading-relaxed">{rank.descripcion}</p>
                    </div>
                 ))}
               </div>
            </div>
          )}

          {/* Salidas Profesionales */}
          {(curso as any).mostrar_salidas && (
            <div id="salidas-profesionales" className="mb-24 scroll-mt-40">
               <h2 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-12 tracking-tight">
                 {(curso as any).titulo_salidas || 'Salidas profesionales'}
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {((curso as any).salidas_profesionales?.length ? (curso as any).salidas_profesionales : [
                    'Director de estrategia',
                    'Director de operaciones',
                    'Consultor de negocio',
                    'Senior Product Manager',
                    'Director de innovación',
                    'Chief AI Officer'
                  ]).map((salida: string, i: number) => (
                    <div key={i} className="bg-[#f4f5f7] rounded-lg p-10 flex items-center justify-center text-center h-32 hover:bg-gray-200 transition-colors">
                       <span className="font-bold text-[15px] text-gray-900 leading-tight">{salida}</span>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* Dónde trabajan nuestros estudiantes */}
          {(curso as any).mostrar_empresas && (
            <div className="mb-24">
               <h2 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-12 tracking-tight">Donde trabajan nuestros estudiantes</h2>
               <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-12 items-center flex-wrap">
                    {((curso as any).empresas_alumnos?.length ? (curso as any).empresas_alumnos : [
                      { nombre: 'TikTok', logo: 'https://via.placeholder.com/150x50/ffffff/000000?text=TikTok' },
                      { nombre: 'Heineken', logo: 'https://via.placeholder.com/150x50/ffffff/ff0000?text=Heineken' },
                      { nombre: 'HP', logo: 'https://via.placeholder.com/80x80/ffffff/0073e6?text=HP' }
                    ]).map((emp: any, i: number) => (
                       <div key={i} className="h-12"><img src={emp.logo} alt={emp.nombre} className="max-h-full opacity-80 mix-blend-multiply" /></div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-[#08479b] border border-[#08479b] px-4 py-2 shrink-0">
                     <button className="p-2 hover:bg-blue-50 transition-colors"><ChevronRight className="w-5 h-5 rotate-180" /></button>
                     <span className="text-gray-300">|</span>
                     <button className="p-2 hover:bg-blue-50 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                  </div>
               </div>
            </div>
          )}

          {/* Dirección del programa */}
          {(curso as any).mostrar_director && (
            <div className="mb-24">
               <h2 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-12 tracking-tight">Dirección del máster</h2>
               <div className="max-w-xs">
                  <div className="aspect-[4/5] w-full bg-gradient-to-t from-gray-800 to-gray-400 mb-6 overflow-hidden">
                     <img src={(curso as any).director?.foto || 'https://via.placeholder.com/400x500/cccccc/666666?text=Foto+Director'} alt="Director" className="w-full h-full object-cover mix-blend-overlay" />
                  </div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                     <div>
                        <h4 className="font-bold text-[18px] text-[#08479b] mb-1">{(curso as any).director?.nombre || 'Joaquín Azcue Castillón'}</h4>
                        <p className="text-[14px] text-gray-500">Director del programa</p>
                     </div>
                     <a href="#" className="text-[#08479b] bg-blue-50 p-1.5 rounded hover:bg-blue-100 transition-colors mt-1 shrink-0">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                     </a>
                  </div>
                  <p className="text-[14px] text-gray-700 leading-relaxed font-medium">{(curso as any).director?.descripcion || 'Profesor experimentado con una trayectoria demostrada en la industria de las telecomunicaciones. Experto en Gestión de Talento, E-Learning, Estrategia, Coaching Ejecutivo y Formación. Profesional con una sólida formación académica.'}</p>
               </div>
            </div>
          )}

          {/* Acompañamiento al alumno */}
          {(curso as any).mostrar_acompanamiento && (
            <div className="bg-[#f4f5f7] -mx-6 lg:-mx-10 px-6 lg:px-10 py-16 mb-24 border-t border-b border-gray-200">
               <h2 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-12 tracking-tight">Acompañamiento al alumno</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {((curso as any).acompanamiento?.length ? (curso as any).acompanamiento : [
                    { titulo: 'Career Development Center', descripcion: 'Plan profesional, CV, entrevistas y acceso a ofertas profesionales.', icono: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />' },
                    { titulo: 'Networking empresarial', descripcion: 'Eventos con empresas, visitas corporativas y masterclasses.', icono: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
                    { titulo: 'ADPH Emprende', descripcion: 'Mentoring, incubación de startups y acceso a inversores.', icono: '<circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>' }
                  ]).map((acomp: any, i: number) => (
                    <div key={i} className="bg-white rounded-lg p-8 text-center flex flex-col items-center border border-gray-100 shadow-sm">
                       <div className="w-16 h-16 text-[#08479b] mb-4">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" dangerouslySetInnerHTML={{ __html: acomp.icono }} />
                       </div>
                       <h4 className="font-bold text-[16px] text-gray-900 mb-4">{acomp.titulo}</h4>
                       <p className="text-[14px] text-gray-600">{acomp.descripcion}</p>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* Proceso de Admisión */}
          <div id="admision" className="mb-24 scroll-mt-40">
             {(curso as any).mostrar_admision && (
               <>
                 <h2 className="text-3xl lg:text-4xl font-normal text-gray-800 mb-16 tracking-tight">
                   {(curso as any).titulo_admision || 'Proceso de admisión'}
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    {((curso as any).proceso_admision?.length ? (curso as any).proceso_admision : [
                      { numero: '01', titulo: 'Solicita información', descripcion: 'Completa el formulario y recibe el correo de confirmación' },
                      { numero: '02', titulo: 'Entrevista personal', descripcion: 'Conoce el programa y resuelve tus dudas con nuestro equipo' },
                      { numero: '03', titulo: 'Evaluación de admisión', descripcion: 'Revisión de tu perfil académico y profesional' },
                      { numero: '04', titulo: 'Matriculación', descripcion: 'Formaliza tu plaza y comienza tu experiencia' }
                    ]).map((paso: any, i: number) => (
                      <div key={i} className="text-center">
                         <div className="text-[60px] font-bold text-[#08479b] leading-none mb-4">{paso.numero}</div>
                         <h4 className="font-bold text-[15px] text-gray-900 mb-2">{paso.titulo}</h4>
                         <p className="text-[14px] text-gray-600">{paso.descripcion}</p>
                      </div>
                    ))}
                 </div>

                 {/* Requisitos */}
                 <div className="mb-24">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">Requisitos</h3>
                    <div className="space-y-8">
                       <div>
                          <h4 className="font-bold text-[15px] text-gray-900 mb-1">Normativa y procedimiento general de acceso</h4>
                          <p className="text-[14px] text-gray-600 mb-2">La Normativa y procedimiento de acceso a los programas queda detallada en el siguiente enlace:</p>
                          <a href="#" className="text-[#08479b] font-bold text-[14px] flex items-center gap-1 hover:underline">Más información <ArrowRight className="w-4 h-4" /></a>
                       </div>
                       <div>
                          <h4 className="font-bold text-[15px] text-gray-900 mb-1">Criterios y procedimiento de admisión a la titulación</h4>
                          <p className="text-[14px] text-gray-600 mb-2">Los requisitos generales de acceso y admisión a este programa están establecidos en la Normativa de acceso, admisión y matrícula:</p>
                          <a href="#" className="text-[#08479b] font-bold text-[14px] flex items-center gap-1 hover:underline">Más información <ArrowRight className="w-4 h-4" /></a>
                       </div>
                    </div>
                 </div>
               </>
             )}

             {(curso as any).mostrar_becas && (
                <CourseScholarships scholarships={(curso as any).ayudas_becas} />
             )}
              
             {(curso as any).mostrar_faqs && (
               <div className="mt-12">
                 <CourseFAQ faqs={(curso as any).faqs} />
               </div>
             )}
          </div>

        </div>

        {/* RIGHT COLUMN: STICKY FORM (Matches Image 1 & 2 exactly) */}
        <div className="relative">
          {/* Overlapping Promo Box */}
          <div className="absolute -top-32 left-0 right-0 bg-white border border-gray-200 p-5 shadow-xl z-40">
             <h4 className="font-bold text-gray-900 text-[15px] mb-1">Ahorra hasta 30% en tu matrícula</h4>
             <p className="text-gray-500 text-[13px]">Promoción válida por tiempo limitado</p>
          </div>

          <div className="sticky top-[160px] bg-[#f4f5f7] p-8 shadow-lg border border-gray-100 z-20">
            <h3 className="text-2xl font-normal mb-3 text-center text-gray-800 tracking-tight">Solicita información</h3>
            <p className="text-[13px] text-center text-gray-600 mb-8 px-2">
              Un asesor académico <b>contactará contigo</b> en un plazo máximo de <b>24 horas.</b>
            </p>
            
            <form className="space-y-4">
              <div className="bg-white border border-gray-300 relative">
                <select className="w-full p-3 text-[14px] text-gray-600 bg-transparent focus:outline-none appearance-none cursor-pointer">
                  <option value="" disabled selected>Especialidad *</option>
                  <option>{curso.categoria?.nombre || 'Especialización'}</option>
                </select>
                <div className="absolute right-3 top-4 pointer-events-none text-gray-400 text-xs">▼</div>
              </div>
              
              <div className="text-[12px] font-bold text-[#08479b] cursor-pointer flex items-center gap-1 pl-1">
                 ▶ Más
              </div>

              <div>
                <input type="text" placeholder="Nombre y apellidos *" className="w-full bg-white border border-gray-300 p-3 text-[14px] text-gray-600 focus:outline-none placeholder-gray-400" />
              </div>

              <div>
                <input type="email" placeholder="Email *" className="w-full bg-white border border-gray-300 p-3 text-[14px] text-gray-600 focus:outline-none placeholder-gray-400" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-300 relative">
                  <select className="w-full p-3 text-[14px] text-gray-600 bg-transparent focus:outline-none appearance-none cursor-pointer">
                    <option value="" disabled selected>Edad *</option>
                    <option>18 - 25</option>
                    <option>26 - 35</option>
                    <option>36+</option>
                  </select>
                  <div className="absolute right-3 top-4 pointer-events-none text-gray-400 text-xs">▼</div>
                </div>
                <div className="bg-white border border-gray-300 relative">
                  <select className="w-full p-3 text-[14px] text-gray-600 bg-transparent focus:outline-none appearance-none cursor-pointer">
                    <option value="" disabled selected>País *</option>
                    <option>Perú</option>
                    <option>Colombia</option>
                    <option>México</option>
                  </select>
                  <div className="absolute right-3 top-4 pointer-events-none text-gray-400 text-xs">▼</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pb-2">
                <div>
                  <input type="text" placeholder="Teléfono *" className="w-full bg-white border border-gray-300 p-3 text-[14px] text-gray-600 focus:outline-none placeholder-gray-400" />
                </div>
                <div className="bg-white border border-gray-300 relative">
                  <select className="w-full p-3 text-[14px] text-gray-600 bg-transparent focus:outline-none appearance-none cursor-pointer">
                    <option value="" disabled selected>Nivel de estudios</option>
                    <option>Bachiller</option>
                    <option>Titulado</option>
                  </select>
                  <div className="absolute right-3 top-4 pointer-events-none text-gray-400 text-xs">▼</div>
                </div>
              </div>

              <div className="text-[10px] text-gray-400 text-justify leading-tight mb-4 h-12 overflow-y-auto pr-2">
                 ADPH Institución Superior tratará sus datos personales para contactarle e informarle del programa seleccionado de cara a las próximas convocatorias del mismo, pudiendo ejercer sus derechos de privacidad en cualquier momento.
              </div>

              <a 
                href={`https://wa.me/51959436827?text=${encodeURIComponent('Hola, quisiera solicitar información sobre el programa: ' + curso.titulo)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full bg-[#fcd116] hover:bg-yellow-400 text-slate-900 font-bold py-4 text-[13px] tracking-wide uppercase transition-colors flex justify-center items-center shadow-md"
              >
                Solicitar Información
              </a>
            </form>
          </div>
        </div>

      </div>

      {/* Programas Relacionados */}
      {(curso as any).mostrar_relacionados && (
         <CourseRelatedPrograms programs={(curso as any).programas_relacionados} />
      )}

    </div>
  )
}
