'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavItem {
  id: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'presentacion', label: 'Presentación' },
  { id: 'plan-de-estudios', label: 'Plan de estudios' },
  { id: 'por-que', label: 'Razones para elegirnos' },
  { id: 'perfil', label: 'Tu futuro profesional' },
  { id: 'admision', label: 'Admisión' }
]

export default function ProgramStickyNav() {
  const [activeSection, setActiveSection] = useState<string>('presentacion')
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Offset for the sticky bar to activate
      if (window.scrollY > 500) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }

      // Detect active section
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id))
      
      const scrollPosition = window.scrollY + 150 // Adjust for nav height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
