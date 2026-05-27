'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

import HeroVisual from './HeroVisual'

interface HeroCarouselProps {
  heroTitle: string
  heroDescription: string
}

export default function HeroCarousel({ heroTitle, heroDescription }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % totalSlides)
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides)

  return (
    <section style={{ position: 'relative', overflow: 'hidden', height: 'calc(100vh - var(--navbar-height))', minHeight: '560px', backgroundColor: '#0A0A0A' }}>
      
      {/* ── Backgrounds ── */}
      <div 
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 100%), url("https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920")',
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
          opacity: currentSlide === 0 ? 1 : 0, transition: 'opacity 1s ease-in-out', zIndex: 0
        }}
      />
      <div 
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.50) 100%), url("https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1920")',
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
          opacity: currentSlide === 1 ? 1 : 0, transition: 'opacity 1s ease-in-out', zIndex: 0
        }}
      />
      <div 
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.48) 100%), url("https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920")',
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
          opacity: currentSlide === 2 ? 1 : 0, transition: 'opacity 1s ease-in-out', zIndex: 0
        }}
      />

      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2, height: '100%' }}>
        
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          
          {/* ── Slide 1: Texto principal ── */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            opacity: currentSlide === 0 ? 1 : 0, pointerEvents: currentSlide === 0 ? 'auto' : 'none',
            transition: 'all 0.8s ease',
            transform: currentSlide === 0 ? 'translateY(0)' : 'translateY(20px)'
          }}>
            <div style={{ maxWidth: '600px', marginTop: '0' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5" style={{ backgroundColor: 'rgba(var(--web-light-rgb, 240, 208, 96),0.15)', border: '1px solid rgba(var(--web-light-rgb, 240, 208, 96),0.3)' }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--web-light, #F0D060)' }} />
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', color: 'var(--web-light, #F0D060)', fontWeight: 600 }}>Especialistas en Control Gubernamental</span>
              </div>
              <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                {heroTitle.split('\n')[0]}
                {heroTitle.split('\n')[1] && <><br /><span style={{ color: 'var(--web-light, #F0D060)' }}>{heroTitle.split('\n')[1]}</span></>}
              </h1>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginBottom: '2.5rem' }}>
                {heroDescription}
              </p>
              <div className="flex flex-wrap gap-4" style={{ marginBottom: '2.5rem' }}>
                <Link href="/cursos" className="inline-flex items-center gap-2 no-underline rounded-xl font-semibold transition-all duration-300 hover:scale-105" style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: 'var(--web-primary, #D4AF37)', color: '#ffffff', fontSize: '0.9375rem', padding: '0.875rem 1.75rem', boxShadow: '0 4px 20px rgba(var(--web-primary-rgb, 212, 175, 55),0.45)' }}>Ver Cursos <ArrowRight size={18} /></Link>
                <Link href="/nosotros" className="inline-flex items-center gap-2 no-underline rounded-xl font-semibold transition-all duration-200" style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff', fontSize: '0.9375rem', padding: '0.875rem 1.75rem', border: '1.5px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>Saber más</Link>
              </div>
            </div>
          </div>

          {/* ── Slide 2: Hero Visual dividida ── */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            opacity: currentSlide === 1 ? 1 : 0, pointerEvents: currentSlide === 1 ? 'auto' : 'none',
            transition: 'all 0.8s ease',
            transform: currentSlide === 1 ? 'translateY(0)' : 'translateY(20px)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', width: '100%', marginTop: '0' }}>
              <div>
                <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', lineHeight: 1.15 }}>
                  Prepárate para <br /><span style={{ color: 'var(--web-light, #F0D060)' }}>Concursos Públicos</span>
                </h2>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', maxWidth: '500px', lineHeight: 1.7 }}>
                  Accede a cursos de aptitud académica, simulacros de entrevistas técnicas y asesoría personalizada para postular y obtener una plaza como funcionario del Estado.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/cursos" className="inline-flex items-center gap-2 no-underline rounded-xl font-semibold transition-all duration-300 hover:scale-105" style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: 'var(--web-primary, #D4AF37)', color: '#ffffff', fontSize: '0.9375rem', padding: '0.875rem 1.75rem', boxShadow: '0 4px 20px rgba(var(--web-primary-rgb, 212, 175, 55),0.45)' }}>Ver Cursos <ArrowRight size={18} /></Link>
                  <Link href="/nosotros" className="inline-flex items-center gap-2 no-underline rounded-xl font-semibold transition-all duration-200" style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff', fontSize: '0.9375rem', padding: '0.875rem 1.75rem', border: '1.5px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>Saber más</Link>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '460px' }}>
                  <HeroVisual />
                </div>
              </div>
            </div>
          </div>

          {/* ── Slide 3: Especialistas ── */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            opacity: currentSlide === 2 ? 1 : 0, pointerEvents: currentSlide === 2 ? 'auto' : 'none',
            transition: 'all 0.8s ease',
            transform: currentSlide === 2 ? 'translateY(0)' : 'translateY(20px)'
          }}>
            <div style={{ maxWidth: '700px', marginLeft: 'auto', textAlign: 'right', marginTop: '0' }}>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                Los mejores <br /><span style={{ color: 'var(--web-light, #F0D060)' }}>Especialistas del Estado</span>
              </h2>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '2rem', display: 'inline-block' }}>
                Nuestros docentes son especialistas en ejercicio activo: auditores de la Contraloría, funcionarios de contratación estatal y expertos en derecho administrativo con trayectoria comprobada en el sector público.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <Link href="/cursos" className="inline-flex items-center gap-2 no-underline rounded-xl font-semibold transition-all duration-300 hover:scale-105" style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: 'var(--web-primary, #D4AF37)', color: '#ffffff', fontSize: '0.9375rem', padding: '0.875rem 1.75rem', boxShadow: '0 4px 20px rgba(var(--web-primary-rgb, 212, 175, 55),0.45)' }}>Ver Cursos <ArrowRight size={18} /></Link>
                <Link href="/nosotros" className="inline-flex items-center gap-2 no-underline rounded-xl font-semibold transition-all duration-200" style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff', fontSize: '0.9375rem', padding: '0.875rem 1.75rem', border: '1.5px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>Saber más</Link>
              </div>
            </div>
          </div>

        </div>

        {/* ── Controles ── */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '1rem', zIndex: 5 }}>
          <button onClick={prevSlide} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(4px)' }}><ChevronLeft size={20} /></button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {[0, 1, 2].map((idx) => (
              <button key={idx} onClick={() => setCurrentSlide(idx)} style={{ width: currentSlide === idx ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: currentSlide === idx ? 'var(--web-light, #F0D060)' : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </div>
          <button onClick={nextSlide} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(4px)' }}><ChevronRight size={20} /></button>
        </div>

      </div>
    </section>
  )
}
