'use client'

import { useEffect, useState, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight, GraduationCap } from 'lucide-react'

import { daType } from '../homeTheme'

type Banner = {
  title: string
  subtitle: string
  cta: { label: string; href: string }
  image: string
}

type Props = {
  banners: Banner[]
  intervalMs?: number
}

export default function HomeHeroCarousel({ banners, intervalMs = 6000 }: Props) {
  const [active, setActive] = useState(0)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const slidesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (banners.length <= 1) return

    const id = setInterval(() => {
      setActive(current => (current + 1) % banners.length)
    }, intervalMs)

    return () => clearInterval(id)
  }, [banners.length, intervalMs])

  useEffect(() => {
    if (slidesRef.current[active]) {
      setHeight(slidesRef.current[active]?.offsetHeight)
    }
  }, [active])

  useEffect(() => {
    const handleResize = () => {
      if (slidesRef.current[active]) {
        setHeight(slidesRef.current[active]?.offsetHeight)
      }
    }

    window.addEventListener('resize', handleResize)
    
return () => window.removeEventListener('resize', handleResize)
  }, [active])

  return (
    <div style={{ position: 'relative', width: '100%', height, transition: 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)', overflow: 'hidden' }}>
      {banners.map((banner, index) => {
        const isActive = index === active
        const isMeasured = typeof height === 'number'

        return (
          <div
            key={banner.image}
            ref={(el) => { slidesRef.current[index] = el }}
            aria-hidden={!isActive}
            style={{
              position: (!isMeasured && isActive) ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              opacity: isActive ? 1 : 0,
              visibility: isActive ? 'visible' : 'hidden',
              transition: 'opacity 1.4s ease-in-out, visibility 1.4s ease-in-out',
            }}
          >
            {/* Background Image */}
            <div style={{ position: 'absolute', inset: 0 }}>
              <Image
                src={banner.image}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transform: banner.image.includes('/3.jpg') ? 'scaleX(-1)' : undefined,
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#02163b] via-[#02163b]/90 to-[#02163b]/40 md:to-transparent"
              />
            </div>

            {/* Content */}
            <div
              className="relative flex flex-col w-full mx-auto lg:min-h-screen"
              style={{
                zIndex: 2,
                paddingTop: 'calc(var(--navbar-height) + 1rem)',
                paddingBottom: 'clamp(2rem, 4vh, 4rem)',
                paddingLeft: 'clamp(1.5rem, 5vw, 6rem)',
                paddingRight: 'clamp(1.5rem, 5vw, 6rem)',
                maxWidth: '1920px',
              }}
            >
              {/* Text Block Wrapper (Centers text in remaining vertical space) */}
              <div className="flex-1 flex flex-col justify-center py-6 lg:py-10">
                <div
                  style={{
                    maxWidth: '700px',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s',
                  }}
                >
                <h1
                  className="text-white mb-4"
                  style={{ ...daType.heroTitle }}
                >
                  {banner.title}
                </h1>
                <p
                  className="text-white/90 mb-6 lg:mb-8"
                  style={{ ...daType.heroBody }}
                >
                  {banner.subtitle}
                </p>
                <div>
                  <Link
                    href={banner.cta.href}
                    className="no-underline inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 bg-white text-[#2563eb] rounded-lg px-5 py-3 lg:px-6 lg:py-4 shadow-md"
                    style={{
                      ...daType.link,
                      fontSize: '1rem',
                    }}
                  >
                    <GraduationCap size={22} />
                    {banner.cta.label}
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
              </div>

              {/* Bottom Stats (now on all banners) */}
              <div
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 1s ease-out 0.6s, transform 1s ease-out 0.6s',
                  width: '100%',
                  paddingBottom: '2.5rem',
                }}
              >
                <div
                  className="bg-transparent border border-white/15 rounded-2xl p-4 lg:p-6 flex flex-col gap-6 backdrop-blur-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {/* Stat 1 */}
                    <div className="flex gap-3 items-start">
                      <GraduationCap size={28} color="#ffffff" className="opacity-80 mt-1 shrink-0" />
                      <div>
                        <div className="text-[#4da6ff] text-2xl lg:text-[1.75rem] font-bold leading-none">10+</div>
                        <div className="text-white text-xs font-semibold tracking-wider my-1">AÑOS DE EXPERIENCIA</div>
                        <div className="text-white/70 text-xs leading-relaxed">Formando talento y generando impacto desde el 2014.</div>
                      </div>
                    </div>
                    
                    {/* Stat 2 */}
                    <div className="flex gap-3 items-start md:border-l border-white/10 md:pl-6 lg:pl-8">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 mt-1 shrink-0">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <div>
                        <div className="text-[#4da6ff] text-2xl lg:text-[1.75rem] font-bold leading-none">500+</div>
                        <div className="text-white text-xs font-semibold tracking-wider my-1">ORGANIZACIONES</div>
                        <div className="text-white/70 text-xs leading-relaxed">Instituciones públicas y empresas que confían en nosotros.</div>
                      </div>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex gap-3 items-start lg:border-l border-white/10 lg:pl-8">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 mt-1 shrink-0">
                        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      <div>
                        <div className="text-[#4da6ff] text-2xl lg:text-[1.75rem] font-bold leading-none">1,500+</div>
                        <div className="text-white text-xs font-semibold tracking-wider my-1">PROGRAMAS IMPARTIDOS</div>
                        <div className="text-white/70 text-xs leading-relaxed">Cursos y talleres especializados en diversas áreas del conocimiento.</div>
                      </div>
                    </div>

                    {/* Stat 4 */}
                    <div className="flex gap-3 items-start md:border-l border-white/10 md:pl-6 lg:pl-8">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 mt-1 shrink-0">
                        <path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5" />
                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                        <path d="M7.14 16.48 4 19.62" />
                        <circle cx="9.5" cy="14.12" r="2.5" />
                      </svg>
                      <div>
                        <div className="text-[#4da6ff] text-2xl lg:text-[1.75rem] font-bold leading-none">25,000+</div>
                        <div className="text-white text-xs font-semibold tracking-wider my-1">PERSONAS CAPACITADAS</div>
                        <div className="text-white/70 text-xs leading-relaxed">Profesionales que hoy aplican lo aprendido y marcan la diferencia.</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Links / Tags */}
                  <div className="mt-2 grid grid-cols-2 gap-y-3 sm:flex sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-2 text-center">
                    <span className="text-[#4da6ff] text-xs font-medium tracking-widest whitespace-nowrap">
                      CONOCIMIENTO <span className="text-white/30 ml-2 hidden sm:inline">•</span>
                    </span>
                    <span className="text-[#4da6ff] text-xs font-medium tracking-widest whitespace-nowrap">
                      EXPERIENCIA <span className="text-white/30 ml-2 hidden sm:inline">•</span>
                    </span>
                    <span className="text-[#4da6ff] text-xs font-medium tracking-widest whitespace-nowrap">
                      INNOVACIÓN <span className="text-white/30 ml-2 hidden sm:inline">•</span>
                    </span>
                    <span className="text-[#4da6ff] text-xs font-medium tracking-widest whitespace-nowrap">
                      RESULTADOS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {banners.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '0',
            right: '0',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
          }}
        >
          {banners.map((banner, index) => (
            <button
              key={banner.image}
              type="button"
              aria-label={`Ir a banner ${index + 1}`}
              onClick={() => setActive(index)}
              style={{
                width: index === active ? 32 : 10,
                height: 10,
                borderRadius: 999,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                backgroundColor: index === active ? '#ffffff' : 'rgba(255,255,255,0.45)',
                transition: 'width 0.3s ease, background-color 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
