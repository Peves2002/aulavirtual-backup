'use client'

import { useState, useEffect } from 'react'


interface NavItem {
  id: string
  label: string
}

const ALL_NAV_ITEMS: NavItem[] = [
  { id: 'presentacion', label: 'Presentación' },
  { id: 'plan-de-estudios', label: 'Plan de estudios' },
  { id: 'por-que', label: 'Razones para elegirnos' },
  { id: 'perfil', label: 'Tu futuro profesional' },
  { id: 'admision', label: 'Admisión' }
]

interface Props {
  visibleSections?: {
    planEstudios?: boolean
    porQue?: boolean
    perfil?: boolean
  }
}

export default function ProgramStickyNav({ visibleSections }: Props = {}) {
  const [activeSection, setActiveSection] = useState<string>('presentacion')
  const [isSticky, setIsSticky] = useState(false)

  // Filtrar los items en base a las opciones recibidas
  const NAV_ITEMS = ALL_NAV_ITEMS.filter(item => {
    if (item.id === 'plan-de-estudios' && visibleSections?.planEstudios === false) return false
    if (item.id === 'por-que' && visibleSections?.porQue === false) return false
    if (item.id === 'perfil' && visibleSections?.perfil === false) return false
    
return true
  })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }

      const scrollPosition = 150 // Adjust for nav height

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i]
        const section = document.getElementById(item.id)
        
        if (section) {
          const rect = section.getBoundingClientRect()


          // Ignorar 'admision' en desktop porque es sticky y siempre estaría activo
          if (item.id === 'admision' && window.innerWidth >= 1024) {
            continue
          }

          if (rect.top <= scrollPosition) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Run once on mount
    handleScroll()
    
return () => window.removeEventListener('scroll', handleScroll)
  }, [NAV_ITEMS])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Account for sticky nav height
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={`w-full bg-white border-b border-slate-200 transition-all duration-300 z-40 hidden md:block ${isSticky ? 'fixed top-[80px] left-0 right-0 shadow-md' : 'relative mt-12'}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <nav className="flex items-center overflow-x-auto hide-scrollbar">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollTo(e, item.id)}
              className={`whitespace-nowrap py-5 px-6 font-bold text-sm transition-colors relative ${
                activeSection === item.id 
                  ? 'text-[#08479b]' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#fcd116]" />
              )}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
