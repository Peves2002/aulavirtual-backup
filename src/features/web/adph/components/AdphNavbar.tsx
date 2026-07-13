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
  { label: 'Programas', href: '/programas' },
  { label: 'Empresas', href: '/empresas' },
  { label: 'Consultoría', href: '/consultoria' },
  { label: 'Admisión', href: '/ficha-de-inscripcion' },
  { label: 'Nosotros', href: '/nosotros' },
]

export default function AdphNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 font-manrope ${
          isScrolled 
            ? 'bg-[#08479b]/90 backdrop-blur-md shadow-lg shadow-[#08479b]/20 py-3 border-b border-white/10' 
            : 'bg-gradient-to-b from-[#08479b] to-[#08479b]/95 py-5 border-b border-white/5'
        }`}
        style={{ height: 'var(--adph-navbar-height, 80px)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between h-full">

          {/* LOGO */}
          <Link href="/" className="flex items-center flex-shrink-0 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/adph/Logo_ADPH.png"
              alt="ADPH Group"
              className="h-10 lg:h-12 w-auto transition-all duration-300 group-hover:scale-[1.03] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] brightness-0 invert"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8 ml-8 flex-1">

            {/* Escuelas Dropdown */}
            <div className="relative group h-full flex items-center">
              <button
                className="flex items-center gap-1.5 text-[15px] font-semibold text-white/90 hover:text-white tracking-wide transition-colors py-2 font-manrope bg-transparent border-0 cursor-pointer"
              >
                Escuelas
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-white/60 group-hover:text-[#fcd116]" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-[calc(100%-5px)] left-1/2 -translate-x-1/2 pt-6 w-[340px] opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out">
                <div className="bg-[#08479b]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden py-3 flex flex-col relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:bg-[#08479b]/95 before:border-l before:border-t before:border-white/10 before:rotate-45">
                  {ESCUELAS.map((escuela) => (
                    <Link
                      key={escuela.id}
                      href={`/escuelas/${escuela.id}`}
                      className="px-6 py-3.5 text-[14px] font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all block font-manrope"
                    >
                      {escuela.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Nav Links */}
            {MAIN_NAV.filter(item => session || item.href !== '/programas').map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[15px] font-semibold tracking-wide transition-all duration-300 py-2 font-manrope group ${
                  pathname === item.href ? 'text-white' : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 bg-[#fcd116] rounded-t-md transition-all duration-300 ease-out ${
                  pathname === item.href ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }`} />
              </Link>
            ))}

            {/* CAMPUS VIRTUAL CTA */}
            {!session && (
              <button
                onClick={() => openLogin()}
                className="relative flex items-center gap-1.5 text-[15px] font-semibold tracking-wide transition-all duration-300 py-2 font-manrope group text-white/80 hover:text-[#fcd116] bg-transparent border-0 cursor-pointer"
              >
                Campus Virtual
                <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </button>
            )}
          </nav>

          {/* CART, USER & MOBILE MENU TRIGGER */}
          <div className="flex items-center gap-3">
            <CartIcon />

            {session && <UserDropdown />}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -mr-2 text-white hover:text-[#fcd116] transition-colors bg-transparent border-0 cursor-pointer"
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
          className="fixed inset-0 z-40 bg-white lg:hidden overflow-y-auto font-manrope"
          style={{ paddingTop: 'var(--adph-navbar-height, 80px)' }}
        >
          <div className="px-6 py-8 flex flex-col gap-6">

            {/* Escuelas Mobile */}
            <div className="space-y-3 font-manrope">
              <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Escuelas</div>
              {ESCUELAS.map((escuela) => (
                <Link
                  key={escuela.id}
                  href={`/escuelas/${escuela.id}`}
                  className="block text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 hover:text-[#08479b] transition-colors"
                >
                  {escuela.name}
                </Link>
              ))}
            </div>

            {/* Main Nav Mobile */}
            <div className="space-y-3 mt-4 font-manrope">
              <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Menú Principal</div>
              {MAIN_NAV.filter(item => session || item.href !== '/programas').map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 hover:text-[#08479b] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            {!session && (
              <div className="mt-8 font-manrope">
                <button
                  onClick={() => openLogin()}
                  className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-extrabold uppercase text-xs tracking-widest py-4 transition-colors hover:bg-[#08479b]"
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
