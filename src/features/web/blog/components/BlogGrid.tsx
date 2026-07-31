'use client'

import Link from 'next/link'

import { ArrowRight, Calendar, Clock, ExternalLink } from 'lucide-react'

interface Blog {
  id: string
  title: string
  category: string
  readTime: string
  date: string
  desc: string
  image: string
  author: string
  role: string
  tags: string[]
  enlaceExterno?: string
  imagenesSecundarias?: string[]
}

interface BlogGridProps {
  blogs: Blog[]
}

export default function BlogGrid({ blogs }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((art) => {
        const hasExternalLink = !!art.enlaceExterno
        const targetUrl = art.enlaceExterno || `/blog/${art.id}`
        const isExternal = hasExternalLink

        return (
          <Link
            key={art.id}
            href={targetUrl}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="group"
          >
            <article className="bg-white border border-slate-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 rounded-xl overflow-hidden flex flex-col shadow-sm h-full">
              {/* Image Header */}
              <div className="aspect-[16/10] w-full overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#08479b] text-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                  {art.category}
                </div>
                {hasExternalLink && (
                  <div className="absolute bottom-4 right-4 bg-emerald-600 text-white px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-md flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" /> Red social
                  </div>
                )}
                {!hasExternalLink && art.imagenesSecundarias && art.imagenesSecundarias.length > 0 && (
                  <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-md flex items-center gap-1">
                    + {art.imagenesSecundarias.length} fotos
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#3BA8C5]" /> {art.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#3BA8C5]" /> {art.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight group-hover:text-[#3BA8C5] transition-colors">
                  {art.title}
                </h3>
                {art.tags && art.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {art.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="bg-slate-100 text-slate-600 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-sm text-slate-600 font-semibold leading-relaxed mb-6 flex-grow line-clamp-3">
                  {art.desc}
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-slate-800 text-[11px] font-extrabold block leading-tight">{art.author}</span>
                    <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider block mt-0.5">
                      {art.role}
                    </span>
                  </div>
                  {hasExternalLink ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3BA8C5] uppercase tracking-widest group-hover:text-[#0083B0] transition-colors flex-shrink-0">
                      Ir a Post <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3BA8C5] uppercase tracking-widest group-hover:text-[#0083B0] transition-colors flex-shrink-0">
                      Leer <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            </article>
          </Link>
        )
      })}
    </div>
  )
}
