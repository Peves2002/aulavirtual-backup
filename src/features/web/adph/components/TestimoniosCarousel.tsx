'use client'

import { useRef } from 'react'

import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

import FadeIn from '@/utils/components/animations/FadeIn'

interface Testimonio {
  id: string | number
  name: string
  role: string
  company?: string
  quote: string
  image: string
}

interface TestimoniosCarouselProps {
  testimonios: Testimonio[]
}

export default function TestimoniosCarousel({ testimonios }: TestimoniosCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (!testimonios || testimonios.length === 0) return null

  // If 3 or less, render static grid
  if (testimonios.length <= 3) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonios.map((testimonio, index) => (
          <FadeIn key={testimonio.id} delay={index * 0.15}>
            <div className="bg-white p-10 border border-slate-100 rounded-xl relative flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 h-full">
              <div className="absolute -top-6 -right-2 bg-[#08479b] text-white p-4 rounded-xl shadow-lg">
                <Quote className="w-6 h-6 fill-current" />
              </div>
              <p className="text-slate-700 font-medium text-[15px] leading-relaxed mb-8 flex-grow relative z-10 italic">
                &quot;{testimonio.quote}&quot;
              </p>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-200">
                <img src={testimonio.image} alt={testimonio.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
                <div>
                  <h4 className="text-slate-900 font-bold text-sm leading-tight font-manrope">{testimonio.name}</h4>
                  <span className="text-[#08479b] text-[11px] font-bold uppercase tracking-wider font-manrope">
                    {testimonio.role}{testimonio.company ? ` @ ${testimonio.company}` : ''}
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    )
  }

  // If more than 3, render scroll-snap Carousel
  const handlePrev = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.testimonios-card-wrapper')

      if (card) {
        const isAtStart = scrollRef.current.scrollLeft <= 10

        if (isAtStart) {
          // Wrap to end
          scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth, behavior: 'smooth' })
        } else {
          // Scroll left by one card width + 32px (gap-8)
          scrollRef.current.scrollBy({ left: -(card.clientWidth + 32), behavior: 'smooth' })
        }
      }
    }
  }

  const handleNext = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.testimonios-card-wrapper')

      if (card) {
        const isAtEnd = scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth - 15

        if (isAtEnd) {
          // Wrap to start
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          // Scroll right by one card width + 32px (gap-8)
          scrollRef.current.scrollBy({ left: card.clientWidth + 32, behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <div className="relative w-full">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Slider viewport */}
      <div 
        ref={scrollRef}
        className="overflow-x-auto scroll-smooth flex snap-x snap-mandatory gap-8 scrollbar-hide w-full px-1 py-4"
      >
        {testimonios.map((testimonio) => (
          <div
            key={testimonio.id}
            className="testimonios-card-wrapper snap-start w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.33px)] shrink-0 flex flex-col"
          >
            <div className="bg-white p-10 border border-slate-100 rounded-xl relative flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 h-full min-h-[300px]">
              <div className="absolute -top-6 -right-2 bg-[#08479b] text-white p-4 rounded-xl shadow-lg">
                <Quote className="w-6 h-6 fill-current" />
              </div>
              <p className="text-slate-700 font-medium text-[15px] leading-relaxed mb-8 flex-grow relative z-10 italic">
                &quot;{testimonio.quote}&quot;
              </p>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-200">
                <img src={testimonio.image} alt={testimonio.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
                <div>
                  <h4 className="text-slate-900 font-bold text-sm leading-tight font-manrope">{testimonio.name}</h4>
                  <span className="text-[#08479b] text-[11px] font-bold uppercase tracking-wider font-manrope">
                    {testimonio.role}{testimonio.company ? ` @ ${testimonio.company}` : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors shadow-sm focus:outline-none"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors shadow-sm focus:outline-none"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
