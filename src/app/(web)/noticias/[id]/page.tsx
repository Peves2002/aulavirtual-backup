import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ArrowLeft, Calendar } from 'lucide-react'

import { getConfigs } from '@/utils/libs/config'
import FadeIn from '@/utils/components/animations/FadeIn'
import NoticiaGallery from '@/utils/components/NoticiaGallery'

interface Noticia {
  id: string
  tag: string
  title: string
  date: string
  image: string
  url?: string
  imagenesSecundarias?: string[]
}

const DEFAULT_NOTICIAS: Noticia[] = [
  {
    id: '1',
    tag: 'TENDENCIAS',
    title: 'ADPH Group presenta el estudio de Clima Laboral 2026',
    date: 'Julio 05, 2026',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    url: '/blog'
  },
  {
    id: '2',
    tag: 'INNOVACIÓN',
    title: 'Nuevas metodologías experienciales en alianza internacional',
    date: 'Junio 28, 2026',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
    url: '/blog'
  }
]

export async function generateMetadata({ params }: { params: { id: string } }) {
  const configs = await getConfigs()
  let noticias = DEFAULT_NOTICIAS
  const dbNoticiasStr = configs['WEB_NOTICIAS']

  if (dbNoticiasStr?.trim()) {
    try {
      noticias = JSON.parse(dbNoticiasStr)
    } catch {}
  }

  const news = noticias.find(n => n.id === params.id)

  
return {
    title: `${news ? news.title : 'Noticia'} | ADPH Group`,
    description: 'Actualidad y desarrollo organizacional en Latinoamérica.'
  }
}

export default async function NoticiaDetailPage({ params }: { params: { id: string } }) {
  const configs = await getConfigs()
  
  let noticias = DEFAULT_NOTICIAS
  const dbNoticiasStr = configs['WEB_NOTICIAS']

  if (dbNoticiasStr?.trim()) {
    try {
      noticias = JSON.parse(dbNoticiasStr)
    } catch (e) {
      console.error(e)
    }
  }

  const news = noticias.find((n) => n.id === params.id)

  if (!news) {
    notFound()
  }

  return (
    <article className="py-20 bg-[#F4F7FC] min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        {/* Volver */}
        <Link 
          href="/noticias" 
          className="inline-flex items-center gap-2 text-xs font-bold text-[#08479b] uppercase tracking-widest hover:underline mb-12 font-manrope"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Noticias
        </Link>

        <FadeIn>
          <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-none shadow-sm space-y-6">
            {/* Tag & Date */}
            <div className="flex items-center gap-3 text-[10px] font-extrabold text-[#08479b] uppercase tracking-widest">
              <span className="bg-[#08479b] text-white px-3 py-1 rounded-none font-manrope">
                {news.tag}
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-[#08479b]" /> {news.date}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-slate-900 font-black text-3xl md:text-5xl leading-tight tracking-tight font-manrope">
              {news.title}
            </h1>

            {/* Image (Square Corners) or Gallery */}
            <div className="mt-8">
              <NoticiaGallery mainImage={news.image} images={news.imagenesSecundarias} />
            </div>

            {/* Simulated editorial content for clean corporate feel */}
            <div className="text-slate-700 text-base md:text-lg leading-relaxed space-y-6 mt-12 font-medium">
              <p className="font-semibold text-slate-800 text-lg md:text-xl border-l-4 border-[#08479b] pl-4 italic">
                ADPH Group continúa fortaleciendo su presencia regional a través de iniciativas enfocadas en el desarrollo organizacional, clima laboral e innovación académica.
              </p>
              <p>
                Este hito representa nuestro compromiso continuo de brindar a los profesionales y empresas en Latinoamérica herramientas de vanguardia y metodologías ágiles basadas en altos estándares de calidad internacional. En las próximas semanas, se desplegarán nuevas mesas de trabajo y sesiones ejecutivas para profundizar en los alcances de esta iniciativa.
              </p>
              <p>
                Para obtener más información sobre próximas capacitaciones y programas in-house a medida, te invitamos a ponerte en contacto con nuestro equipo de asesores corporativos a través de nuestros canales oficiales de atención.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </article>
  )
}
