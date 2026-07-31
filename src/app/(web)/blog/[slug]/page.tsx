import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Facebook, Linkedin, Twitter } from 'lucide-react'
import { getConfigs } from '@/utils/libs/config'

interface Blog {
  id: string
  title: string
  category: string
  readTime: string
  date: string
  desc: string
  contentHtml?: string // New field for rich HTML content
  image: string
  author: string
  role: string
  tags: string[]
  enlaceExterno?: string
  imagenesSecundarias?: string[]
}

const PAD_ARTICLE_HTML = `
<p class="mb-4">
  <strong>Por Fernando Pérez Lizano</strong><br>
  <em>Director Académico Adjunto y Director del área de Operaciones, Transformación Digital y Emprendimiento, PAD – Escuela de Dirección.</em>
</p>
<p class="mb-6 text-xl text-gray-600 leading-relaxed font-medium">
  <em>Construir, coubicar, migrar a la nube o combinar. Por qué elegir dónde vive y quién controla la información crítica dejó de ser un asunto de tecnología para volverse una decisión de directorio que la energía y la soberanía de los datos vuelven urgente.</em>
</p>
<h2 class="text-[#08479b] text-2xl font-black mt-10 mb-4 border-b border-[#08479b] pb-2">Una pregunta que dejó a un directorio en silencio</h2>
<p class="mb-4">
  En una sesión de directorio reciente, un colega me relató una escena que se repite con inquietante frecuencia. El área de tecnología pedía autorización para un contrato plurianual de infraestructura por varios millones de dólares. El presidente hizo una pregunta simple: <strong>“¿Dónde van a estar exactamente nuestros datos y quién podrá acceder a ellos?”</strong>. Silencio. Nadie en la sala —ni el directorio ni la gerencia— tenía una respuesta clara.
</p>
<p class="mb-4">
  Lo confieso: en más de un directorio en el que me ha tocado sentarme, esa misma pregunta nos habría encontrado sin respuesta. La decisión sobre dónde vive la información crítica de la empresa se había tomado por omisión, delegada años atrás a un proveedor y a un contrato que nadie había vuelto a revisar. Esa escena resume el punto de partida de este artículo: el centro de datos dejó de ser un asunto técnico de la sala de servidores y se convirtió en una decisión de gobierno corporativo que un directorio no puede seguir delegando a ciegas.
</p>
<h2 class="text-[#08479b] text-2xl font-black mt-10 mb-4 border-b border-[#08479b] pb-2">Qué es —de verdad— y por qué es decisión de directorio</h2>
<p class="mb-4">
  Conviene despejar el término. Un centro de datos es la instalación física donde residen los servidores, el almacenamiento y las redes que sostienen las operaciones digitales de una organización. Pero, para un directorio, la definición útil no es física sino estratégica: es el lugar donde vive, y desde donde se controla, la infraestructura digital crítica del negocio. Y aquí la pregunta relevante no es “qué es”, sino “bajo qué modelo lo operamos”.
</p>
<p class="mb-4">
  Existen esencialmente cuatro opciones. La primera es el <strong>centro propio</strong>: la empresa construye y opera su propia instalación. La segunda es la <strong>coubicación</strong> (en inglés, <em>colocation</em>). La tercera es la <strong>nube pública</strong>, en la que no se posee equipo propio alguno. La cuarta —hoy la más común en grandes organizaciones— es el <strong>modelo híbrido</strong>.
</p>
<h2 class="text-[#08479b] text-2xl font-black mt-10 mb-4 border-b border-[#08479b] pb-2">Por qué esto llegó ahora al directorio: IA, energía y soberanía</h2>
<p class="mb-4">
  Si esta decisión escaló hasta el directorio, fue por la convergencia de tres fuerzas. La primera es la <strong>inteligencia artificial</strong>, que disparó la demanda de cómputo a una escala inédita. La segunda fuerza es la <strong>energía</strong>, que se ha vuelto la restricción vinculante. La tercera fuerza es la <strong>soberanía de datos</strong>, y aquí conviene una distinción que muchos directorios pasan por alto. La residencia de datos indica en qué país están físicamente alojados; la soberanía indica bajo qué jurisdicción y qué leyes quedan sujetos.
</p>
<h2 class="text-[#08479b] text-2xl font-black mt-10 mb-4 border-b border-[#08479b] pb-2">El punto de inflexión peruano</h2>
<p class="mb-4">
  El Perú vive un momento particular en esta materia. Según el reporte de la consultora Binswanger, Lima ya concentra catorce centros de datos en operación que superan los 68 000 metros cuadrados, con una potencia instalada cercana a los 33 megavatios. El sur de la capital, en particular Lurín, se consolidó como el nuevo polo de gran escala.
</p>
<div class="bg-teal-50 p-6 my-8 border-l-4 border-teal-600 rounded-r-lg shadow-sm">
  <h3 class="text-teal-700 font-bold text-lg mb-2">Dos decisiones, dos caminos</h3>
  <p class="text-sm text-teal-900 leading-relaxed">
    En la práctica de directorios, los patrones se repiten. Uno de los principales bancos del país descubrió, en plena expansión de sus servicios digitales, que su contrato de nube le dificultaba cumplir exigencias regulatorias de localización sin renegociar condiciones costosas. Una empresa minera de gran escala, en cambio, mantuvo cómputo crítico en instalación propia por razones de continuidad operativa en zona remota.
  </p>
</div>
<h2 class="text-[#08479b] text-2xl font-black mt-10 mb-4 border-b border-[#08479b] pb-2">Seis errores frecuentes del directivo</h2>
<ul class="list-disc pl-6 space-y-2 mb-6">
  <li>Tratar la elección como una decisión de una sola vez.</li>
  <li>Tratar la decisión como un asunto puramente técnico.</li>
  <li>Confundir residencia con soberanía de datos.</li>
  <li>Sobreinvertir en resiliencia (pagar por un Tier IV innecesario).</li>
  <li>Ignorar la dependencia de proveedor.</li>
  <li>No cuantificar el costo real de la indisponibilidad.</li>
</ul>
<h2 class="text-[#08479b] text-2xl font-black mt-10 mb-4 border-b border-[#08479b] pb-2">Cómo ordenar la decisión: criterios y hoja de ruta</h2>
<div class="overflow-x-auto my-8">
  <table class="w-full text-sm border-collapse border border-gray-300 shadow-sm rounded-lg hidden md:table">
    <thead>
      <tr class="bg-[#08479b] text-white">
        <th class="p-3 text-left border border-gray-300 font-bold">Modelo</th>
        <th class="p-3 text-left border border-gray-300 font-bold">Control</th>
        <th class="p-3 text-left border border-gray-300 font-bold">Despliegue</th>
        <th class="p-3 text-left border border-gray-300 font-bold">Estructura de costo</th>
        <th class="p-3 text-left border border-gray-300 font-bold">Cuándo conviene</th>
      </tr>
    </thead>
    <tbody class="text-gray-700">
      <tr class="bg-white">
        <td class="p-3 border border-gray-300 font-bold text-gray-900">Instalación propia</td>
        <td class="p-3 border border-gray-300">Total</td>
        <td class="p-3 border border-gray-300">Lento (6 meses a 2 años)</td>
        <td class="p-3 border border-gray-300">Inversión de capital alta</td>
        <td class="p-3 border border-gray-300">Cargas muy sensibles, sistemas heredados</td>
      </tr>
      <tr class="bg-gray-50">
        <td class="p-3 border border-gray-300 font-bold text-gray-900">Coubicación</td>
        <td class="p-3 border border-gray-300">Alto</td>
        <td class="p-3 border border-gray-300">Rápido (semanas)</td>
        <td class="p-3 border border-gray-300">Gasto operativo más equipos propios</td>
        <td class="p-3 border border-gray-300">Control físico y cumplimiento sin construir</td>
      </tr>
      <tr class="bg-white">
        <td class="p-3 border border-gray-300 font-bold text-gray-900">Nube pública</td>
        <td class="p-3 border border-gray-300">Compartido</td>
        <td class="p-3 border border-gray-300">Inmediato</td>
        <td class="p-3 border border-gray-300">Gasto operativo variable</td>
        <td class="p-3 border border-gray-300">Demanda variable, escalar rápido</td>
      </tr>
      <tr class="bg-gray-50">
        <td class="p-3 border border-gray-300 font-bold text-gray-900">Híbrido</td>
        <td class="p-3 border border-gray-300">Selectivo por carga</td>
        <td class="p-3 border border-gray-300">Variable</td>
        <td class="p-3 border border-gray-300">Mixto</td>
        <td class="p-3 border border-gray-300">Combinar los anteriores según la carga</td>
      </tr>
    </tbody>
  </table>
</div>
<h2 class="text-[#08479b] text-2xl font-black mt-10 mb-4 border-b border-[#08479b] pb-2">Ideas fuerza</h2>
<p class="mb-4">
  Tres ideas fuerza sintetizan el mensaje. Primera: la decisión sobre el centro de datos es, en el fondo, una decisión sobre dónde vive y quién controla la infraestructura digital crítica; por eso pertenece al directorio. Segunda: el debate no es nube contra instalación propia, sino cómo gobernar un modelo híbrido en el que el riesgo siempre es compartido. Y tercera: ante el aumento exponencial del consumo energético que impone la inteligencia artificial, elegir tempranamente dónde residirán las cargas críticas será, cada vez más, la diferencia entre operar o esperar en la fila.
</p>
`

const ARTICLES: Blog[] = [
  {
    id: 'pad-articulo-prueba',
    title: 'Centros de datos: la decisión de directorio detrás de su infraestructura digital crítica',
    category: 'Tecnología',
    readTime: '15 min lectura',
    date: '10 de Noviembre, 2024',
    desc: 'Construir, coubicar, migrar a la nube o combinar. Por qué elegir dónde vive y quién controla la información crítica dejó de ser un asunto de tecnología.',
    contentHtml: PAD_ARTICLE_HTML,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    author: 'Fernando Pérez Lizano',
    role: 'Director Académico Adjunto, PAD',
    tags: ['Data Center', 'Infraestructura', 'Soberanía de Datos'],
  },
  {
    id: 'tendencias-seleccion-2026',
    title: 'Tendencias en Selección y Reclutamiento de Personal para el 2026',
    category: 'Reclutamiento & ATS',
    readTime: '5 min lectura',
    date: '15 de Mayo, 2026',
    desc: 'Descubre cómo la inteligencia artificial predictiva y los embudos automatizados están redefiniendo la captación del talento idóneo.\n\nLa infraestructura digital dejó de ser un asunto técnico para convertirse en una decisión estratégica. Este artículo analiza cómo la IA, la energía y la soberanía de datos están redefiniendo la elección en las organizaciones.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    author: 'Mag. Roberto Castillo',
    role: 'Director de Gestión Humana',
    tags: ['Reclutamiento', 'RRHH', '2026'],
  },
  {
    id: 'importancia-clima-laboral',
    title: 'El Impacto Real del Clima Laboral en la Retención del Talento',
    category: 'Clima Organizacional',
    readTime: '7 min lectura',
    date: '28 de Abril, 2026',
    desc: 'Métricas y estrategias clave para medir la satisfacción de tus colaboradores y reducir la rotación no deseada de forma medible.\n\nLa infraestructura digital dejó de ser un asunto técnico para convertirse en una decisión estratégica.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    author: 'Mag. Sofía Luna',
    role: 'Consultora de Clima & Cultura',
    tags: ['Clima', 'Talento'],
  },
  {
    id: 'evaluacion-psicosocial-sunafil',
    title: 'Guía Completa para el Monitoreo de Factores de Riesgo Psicosocial',
    category: 'Salud Ocupacional',
    readTime: '10 min lectura',
    date: '10 de Abril, 2026',
    desc: 'Cumplimiento legal y metodología paso a paso para la evaluación psicosocial según las normativas vigentes de fiscalización en la región.\n\nLa infraestructura digital dejó de ser un asunto técnico para convertirse en una decisión estratégica.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    author: 'Dr. Alberto Varela',
    role: 'Auditor ISO 45001',
    tags: ['Salud', 'Legal'],
  },
]

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const configs = await getConfigs()
  let blogs = ARTICLES
  const dbBlogsStr = configs.WEB_BLOGS
  if (dbBlogsStr?.trim()) {
    try {
      // Si la base de datos no tiene el mock, podemos mergear o simplemente usar dbBlogs si es que el usuario los guardó
      const parsed = JSON.parse(dbBlogsStr)
      if (parsed.length > 0) {
        // En un caso real priorizamos BD, pero por motivos de demo aseguramos que esté el mock
        const hasMock = parsed.find((b: any) => b.id === 'pad-articulo-prueba')
        if (!hasMock) {
          blogs = [ARTICLES[0], ...parsed]
        } else {
          blogs = parsed
        }
      }
    } catch {}
  }
  const blog = blogs.find((b) => b.id === params.slug)
  return {
    title: `${blog ? blog.title : 'Artículo'} | ADPH Group`,
    description: blog ? blog.desc.substring(0, 150) : 'Artículo del blog de ADPH Group.',
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const configs = await getConfigs()
  let blogs = ARTICLES
  const dbBlogsStr = configs.WEB_BLOGS
  
  if (dbBlogsStr?.trim()) {
    try {
      const parsed = JSON.parse(dbBlogsStr)
      if (parsed.length > 0) {
        const hasMock = parsed.find((b: any) => b.id === 'pad-articulo-prueba')
        if (!hasMock) {
          blogs = [ARTICLES[0], ...parsed]
        } else {
          blogs = parsed
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  const blog = blogs.find((b) => b.id === params.slug)

  if (!blog) {
    notFound()
  }

  const relatedBlogs = blogs.filter((b) => b.id !== blog.id).slice(0, 4)

  return (
    <article className="min-h-screen bg-white">
      {/* 1. Header Area with Return and Title */}
      <div className="bg-[#f4f5f7] pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-bold text-[#08479b] uppercase tracking-widest hover:underline mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Blog
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-extrabold text-[#08479b] uppercase tracking-widest mb-6">
              <span className="bg-[#08479b] text-white px-3 py-1 rounded-sm">
                {blog.category}
              </span>
              <span className="text-gray-500">
                {blog.date}
              </span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500">
                {blog.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-normal text-gray-900 leading-tight tracking-tight mb-8">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 border-l-2 border-[#08479b] pl-4">
              <div>
                <span className="text-sm font-bold text-gray-900 block">{blog.author}</span>
                <span className="text-xs text-gray-500 block">{blog.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hero Image */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 -mt-12 relative z-10">
        <div className="aspect-[21/9] md:aspect-[24/9] w-full overflow-hidden rounded-md shadow-lg bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 3. Main Content & Sidebar Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Sidebar (Left on Desktop, Bottom on Mobile) */}
        <aside className="lg:col-span-4 order-2 lg:order-1 space-y-8">
          <div className="sticky top-32">
            <h3 className="text-xl font-black text-gray-900 border-b-2 border-[#08479b] pb-2 mb-6">Artículos Relacionados</h3>
            <div className="flex flex-col gap-6">
              {relatedBlogs.map((r) => (
                <Link href={`/blog/${r.id}`} key={r.id} className="group flex gap-4 items-start">
                  <div className="w-24 h-24 flex-shrink-0 rounded bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#08479b] uppercase tracking-wider mb-1">{r.category}</span>
                    <h4 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#08479b] transition-colors line-clamp-3">
                      {r.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Body (Right on Desktop, Top on Mobile) */}
        <div className="lg:col-span-8 order-1 lg:order-2">
          
          {/* Share Buttons */}
          <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-8">
            <span className="text-sm font-bold text-gray-600">Compartir:</span>
            <button className="w-9 h-9 rounded-full bg-gray-100 text-[#08479b] flex items-center justify-center hover:bg-[#08479b] hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-gray-100 text-[#08479b] flex items-center justify-center hover:bg-[#08479b] hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-gray-100 text-[#08479b] flex items-center justify-center hover:bg-[#08479b] hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </button>
          </div>

          {/* Content HTML or Description */}
          {blog.contentHtml ? (
            <div 
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
            />
          ) : (
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6">
              {blog.desc.split('\n').map((paragraph, idx) => {
                if (!paragraph.trim()) return null
                return (
                  <p key={idx} className="text-[17px] md:text-[18px]">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          )}
          
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
              <span className="text-sm font-bold text-gray-600 mr-2 flex items-center">Etiquetas:</span>
              {blog.tags.map((tag, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
