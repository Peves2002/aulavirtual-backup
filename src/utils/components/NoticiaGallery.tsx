'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NoticiaGalleryProps {
  mainImage: string
  images?: string[]
}

export default function NoticiaGallery({ mainImage, images = [] }: NoticiaGalleryProps) {
  const allImages = [mainImage, ...images].filter(Boolean)
  const [activeIndex, setActiveIndex] = useState(0)

  if (allImages.length === 0) return null

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      {/* Principal Viewer */}
      <div className="w-full aspect-[16/9] overflow-hidden bg-slate-900 border border-slate-200 relative group select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={allImages[activeIndex]}
          alt={`Imagen ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {allImages.length > 1 && (
          <>
            {/* Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md hover:scale-105 transition-all focus:outline-none"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md hover:scale-105 transition-all focus:outline-none"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Indicator badge */}
            <div className="absolute bottom-4 right-4 bg-slate-900/85 backdrop-blur-sm text-white px-3 py-1 text-xs font-bold font-mono tracking-wider">
              {activeIndex + 1} / {allImages.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-20 sm:w-24 aspect-[16/10] flex-shrink-0 border-2 overflow-hidden transition-all focus:outline-none ${
                activeIndex === idx ? 'border-[#08479b] scale-[1.02]' : 'border-slate-200 opacity-60 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
