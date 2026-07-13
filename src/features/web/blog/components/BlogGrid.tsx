'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const handleOpenModal = (blog: Blog) => {
    setSelectedBlog(blog)
    setActiveImageIndex(0)
  }

  const handleCloseModal = () => {
    setSelectedBlog(null)
  }

  // Get all images for the carousel (main image + secondary ones)
  const modalImages = selectedBlog
    ? [selectedBlog.image, ...(selectedBlog.imagenesSecundarias || [])].filter(Boolean)
    : []

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((art) => {
          const hasExternalLink = !!art.enlaceExterno
          const targetUrl = art.enlaceExterno || '#'

          return (
            <article
              key={art.id}
              className="bg-white border border-slate-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 rounded-xl overflow-hidden group flex flex-col shadow-sm"
            >
              {/* Image Header */}
              <div 
                onClick={() => !hasExternalLink ? handleOpenModal(art) : window.open(targetUrl, '_blank', 'noopener,noreferrer')}
                className="aspect-[16/10] w-full overflow-hidden relative cursor-pointer"
              >
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
                <h3 
                  onClick={() => !hasExternalLink ? handleOpenModal(art) : window.open(targetUrl, '_blank', 'noopener,noreferrer')}
                  className="text-lg font-black text-slate-900 mb-3 leading-tight group-hover:text-[#3BA8C5] transition-colors cursor-pointer"
                >
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
                <p className="text-sm text-slate-600 font-semibold leading-relaxed mb-6 flex-grow line-clamp-3">{art.desc}</p>
                
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-slate-800 text-[11px] font-extrabold block leading-tight">{art.author}</span>
                    <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider block mt-0.5">
                      {art.role}
                    </span>
                  </div>
                  {hasExternalLink ? (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3BA8C5] uppercase tracking-widest hover:text-[#0083B0] transition-colors flex-shrink-0"
                    >
                      Ir a Post <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => handleOpenModal(art)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3BA8C5] uppercase tracking-widest hover:text-[#0083B0] transition-colors flex-shrink-0"
                    >
                      Leer <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Modern Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-900/10 hover:bg-slate-900/20 text-slate-800 flex items-center justify-center rounded-full transition-colors focus:outline-none"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content Scroll Area */}
            <div className="overflow-y-auto flex-1">
              {/* Carousel Header */}
              <div className="relative aspect-[16/9] w-full bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={modalImages[activeImageIndex]}
                  alt="Imagen de blog"
                  className="w-full h-full object-cover transition-all duration-500"
                />

                {modalImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex(p => p === 0 ? modalImages.length - 1 : p - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md focus:outline-none"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(p => p === modalImages.length - 1 ? 0 : p + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md focus:outline-none"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white px-2.5 py-1 text-xs font-bold rounded">
                      {activeImageIndex + 1} / {modalImages.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails below carousel */}
              {modalImages.length > 1 && (
                <div className="flex gap-2 p-4 bg-slate-50 overflow-x-auto border-b border-slate-100">
                  {modalImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 aspect-[16/10] flex-shrink-0 border-2 overflow-hidden rounded transition-all focus:outline-none ${
                        activeImageIndex === idx ? 'border-[#08479b]' : 'border-transparent opacity-60'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Text Content */}
              <div className="p-8 sm:p-10 space-y-6">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span className="bg-[#08479b]/10 text-[#08479b] px-3 py-1 rounded-md">
                    {selectedBlog.category}
                  </span>
                  <span>{selectedBlog.date}</span>
                  <span>·</span>
                  <span>{selectedBlog.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {selectedBlog.title}
                </h2>

                {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-slate-700 text-base leading-relaxed space-y-4 whitespace-pre-wrap font-medium">
                  {selectedBlog.desc}
                </div>

                {/* Author Info */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-slate-900 text-sm font-black block leading-tight">{selectedBlog.author}</span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mt-1">
                      {selectedBlog.role}
                    </span>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded transition-colors"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
