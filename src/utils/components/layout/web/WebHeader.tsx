'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react'
import { useSession } from 'next-auth/react'

import Logo from '@components/layout/shared/Logo'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { useCart } from '@/features/web/cart/context/CartContext'

export interface Category {
  id: string
  nombre: string
  slug: string
}

interface WebHeaderProps {
  initialCategories?: Category[]
  platformName?: string
  platformSlogan?: string
  empresasHabilitado?: boolean
}

export default function WebHeader({
  initialCategories = [],
}: WebHeaderProps) {
  const { openLogin } = useAuthModal()
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { itemCount, setIsCartDrawerOpen } = useCart()
  
  // Dummy total for demonstration (can be connected to CartContext if needed)
  const cartTotal = 0

  const handleAulaVirtualClick = () => {
    if (session) {
      // Redirect based on role if needed, or simply go to dashboard
      window.location.href = '/dashboard'
    } else {
      openLogin()
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm h-[80px]">
      <div className="max-w-[1440px] mx-auto h-full px-4 md:px-8 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="block">
            <Logo enlargeSquare />
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Item 1: Programas Académicos */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-[13px] font-bold text-gray-800 hover:text-secondary tracking-wide uppercase transition-colors py-8">
              PROGRAMAS ACADÉMICOS
              <ChevronDown size={14} className="text-gray-500 group-hover:text-secondary" />
            </button>
            {/* Simple Dropdown Menu */}
            <div className="absolute top-full left-0 bg-white shadow-xl border border-gray-100 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <Link href="/cursos" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary border-b border-gray-50">
                Todos los Programas
              </Link>
              <Link href="/cursos" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary border-b border-gray-50">
                Diplomados
              </Link>
              <Link href="/cursos" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary">
                Cursos
              </Link>
            </div>
          </div>

          {/* Item 2: Novedades */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-[13px] font-bold text-gray-800 hover:text-secondary tracking-wide uppercase transition-colors py-8">
              NOVEDADES
              <ChevronDown size={14} className="text-gray-500 group-hover:text-secondary" />
            </button>
            <div className="absolute top-full left-0 bg-white shadow-xl border border-gray-100 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <Link href="/blog" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary">
                Blog / Noticias
              </Link>
            </div>
          </div>

          {/* Item 3: Somos EGEC */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-[13px] font-bold text-gray-800 hover:text-secondary tracking-wide uppercase transition-colors py-8">
              SOMOS EGEC
              <ChevronDown size={14} className="text-gray-500 group-hover:text-secondary" />
            </button>
            <div className="absolute top-full left-0 bg-white shadow-xl border border-gray-100 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <Link href="/nosotros" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary border-b border-gray-50">
                Sobre Nosotros
              </Link>
              <Link href="/verificar-certificado" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary">
                Verificar Certificado
              </Link>
            </div>
          </div>
        </nav>

        {/* Right: Aula Virtual + Cart + Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={handleAulaVirtualClick}
            className="hidden sm:block text-[13px] font-medium text-gray-800 hover:text-secondary tracking-wide uppercase transition-colors"
          >
            AULA VIRTUAL
          </button>
          
          {/* Cart Icon Redesign */}
          <button 
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-secondary font-bold text-[15px]">
              S/ {cartTotal}
            </span>
            <div className="relative flex items-center justify-center w-10 h-10">
              <ShoppingCart size={22} className="text-secondary" strokeWidth={2.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {itemCount}
                </span>
              )}
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-800 p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[80px] left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col py-4 px-6 z-40 max-h-[calc(100vh-80px)] overflow-y-auto">
          <Link href="/cursos" className="py-3 font-bold text-sm border-b border-gray-100 uppercase" onClick={() => setMobileMenuOpen(false)}>Programas Académicos</Link>
          <Link href="/blog" className="py-3 font-bold text-sm border-b border-gray-100 uppercase" onClick={() => setMobileMenuOpen(false)}>Novedades</Link>
          <Link href="/nosotros" className="py-3 font-bold text-sm border-b border-gray-100 uppercase" onClick={() => setMobileMenuOpen(false)}>Somos EGEC</Link>
          <Link href="/verificar-certificado" className="py-3 font-bold text-sm border-b border-gray-100 uppercase" onClick={() => setMobileMenuOpen(false)}>Certificado</Link>
          <button onClick={() => { setMobileMenuOpen(false); handleAulaVirtualClick(); }} className="py-3 font-bold text-secondary text-sm text-left uppercase">
            AULA VIRTUAL
          </button>
        </div>
      )}
    </header>
  )
}
