'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useSession } from 'next-auth/react'
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react'

import CartIcon from '@/features/web/cart/components/CartIcon'
import UserDropdown from '@/utils/components/layout/shared/UserDropdown'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { ESCUELAS } from '@/features/web/adph/data/escuelas'

const MAIN_NAV = [
  { label: 'Programas', href: '/cursos' },
  { label: 'Soluciones Corporativas', href: '/consultoria' },
  { label: 'Admisión', href: '/ficha-de-inscripcion' },
  { label: 'Nosotros', href: '/nosotros' },
]

export default function AdphNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const { openLogin } = useAuthModal()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on path changes
  useEffect(() => {
    setMobileMenuOpen(false)
    setDropdownOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-5 border-b border-slate-200/50'
        }`}
        style={{ height: 'var(--adph-navbar-height, 80px)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between h-full">

          {/* LOGO */}
          <Link href="/" className="flex items-center flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/adph/Logo_ADPH.png"
              alt="ADPH Group"
              className="h-10 lg:h-12 w-auto transition-transform hover:scale-105"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8 ml-8 flex-1">

            {/* Escuelas Dropdown */}
            <div
              className="relative group h-full flex items-center"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 text-[13px] font-bold text-slate-700 hover:text-[#3BA8C5] uppercase tracking-wider transition-colors py-2"
              >
                Escuelas
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-[#3BA8C5]' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 pt-4 w-[320px]">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-2 flex flex-col">
                    {ESCUELAS.map((escuela) => (
                      <Link
                        key={escuela.id}
                        href={`/escuelas/${escuela.id}`}
                        className="px-5 py-3 text-xs font-bold text-slate-600 hover:text-[#3BA8C5] hover:bg-slate-50 transition-colors block border-b border-slate-50 last:border-0"
                      >
                        {escuela.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Nav Links */}
            {MAIN_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative text-[13px] font-bold uppercase tracking-wider transition-colors py-2 group ${
                  pathname === item.href ? 'text-[#3BA8C5]' : 'text-slate-700 hover:text-[#3BA8C5]'
                }`}
              >
                {item.label}
                <div className={`absolute bottom-0 inset-x-0 h-0.5 bg-[#3BA8C5] transition-transform origin-left ${
                  pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
          </nav>

          {/* CART, SESIÓN/CAMPUS VIRTUAL CTA & MOBILE MENU TRIGGER */}
          <div className="flex items-center gap-3">
            <CartIcon />

            {session ? (
              <UserDropdown />
            ) : (
              <button
                onClick={() => openLogin()}
                className="hidden lg:flex items-center gap-2 bg-slate-900 hover:bg-[#3BA8C5] text-white border border-transparent text-[11px] font-extrabold uppercase tracking-widest px-6 py-3 transition-colors shadow-sm hover:shadow-md"
                style={{ borderRadius: 0 }}
              >
                Campus Virtual
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -mr-2 text-slate-800 hover:text-[#3BA8C5] transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-white lg:hidden overflow-y-auto"
          style={{ paddingTop: 'var(--adph-navbar-height, 80px)' }}
        >
          <div className="px-6 py-8 flex flex-col gap-6">

            {/* Escuelas Mobile */}
            <div className="space-y-3">
              <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Escuelas</div>
              {ESCUELAS.map((escuela) => (
                <Link
                  key={escuela.id}
                  href={`/escuelas/${escuela.id}`}
                  className="block text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 hover:text-[#3BA8C5] transition-colors"
                >
                  {escuela.name}
                </Link>
              ))}
            </div>

            {/* Main Nav Mobile */}
            <div className="space-y-3 mt-4">
              <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Menú Principal</div>
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 hover:text-[#3BA8C5] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            {!session && (
              <div className="mt-8">
                <button
                  onClick={() => openLogin()}
                  className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-extrabold uppercase text-xs tracking-widest py-4 transition-colors hover:bg-[#3BA8C5]"
                  style={{ borderRadius: 0 }}
                >
                  Ingresar al Campus
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  )
}
