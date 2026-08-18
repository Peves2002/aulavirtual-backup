'use client'

import { useState } from 'react'

import { Button } from '@mui/material'
import { useSession } from 'next-auth/react'
import { Menu } from 'lucide-react'

import Logo from '@components/layout/shared/Logo'
import UserDropdown from '@components/layout/shared/UserDropdown'
import CartIcon from '@/features/web/cart/components/CartIcon'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { useConfig } from '@/contexts/ConfigContext'

export interface Category {
  id: string
  nombre: string
  slug: string
}

interface WebHeaderProps {
  initialCategories?: Category[]
  platformName?: string
  platformSlogan?: string
}

export default function WebHeader({ initialCategories = [], platformName, platformSlogan }: WebHeaderProps) {
  void initialCategories
  void platformName
  void platformSlogan
  const { data: session } = useSession()
  const { openLogin, openRegister } = useAuthModal()
  const configs = useConfig()
  const primaryColor = configs.COLOR_PRIMARIO || '#02115C'

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 bg-white border-b border-border shadow-sm z-50 flex items-center justify-between px-3 md:px-10"
        style={{ height: 'var(--navbar-height)' }}
      >
        <div className="flex items-center gap-2 md:gap-4 shrink-0 overflow-hidden">
          {/* Hamburger Menu Icon (Mobile Only) */}
          <button
            className="sm:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-100 shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} color="#02115C" />
          </button>
          
          {/* Logo */}
          <div className="shrink min-w-0 flex items-center">
            <Logo />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <CartIcon />
          {session ? (
            <UserDropdown />
          ) : (
            <>
              <Button
                onClick={() => openLogin()}
                size="small"
                sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#02115C', fontFamily: 'Inter, sans-serif' }}
              >
                Iniciar Sesión
              </Button>
              <Button
                onClick={() => openRegister()}
                variant="contained"
                size="small"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  backgroundColor: primaryColor,
                  display: { xs: 'none', sm: 'inline-flex' },
                  '&:hover': { backgroundColor: primaryColor, opacity: 0.85 },
                }}
              >
                Registrarse
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-[var(--navbar-height)] left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-40 sm:hidden flex flex-col p-4 gap-4" style={{ maxHeight: 'calc(100vh - var(--navbar-height))', overflowY: 'auto' }}>
          <a href="/" className="text-gray-800 font-semibold no-underline" onClick={() => setMobileMenuOpen(false)}>Inicio</a>
          <a href="/cursos" className="text-gray-800 font-semibold no-underline" onClick={() => setMobileMenuOpen(false)}>Cursos</a>
          <a href="/diplomados" className="text-gray-800 font-semibold no-underline" onClick={() => setMobileMenuOpen(false)}>Diplomados</a>
          <a href="/programas" className="text-gray-800 font-semibold no-underline" onClick={() => setMobileMenuOpen(false)}>Programas</a>
          <a href="/nosotros" className="text-gray-800 font-semibold no-underline" onClick={() => setMobileMenuOpen(false)}>Nosotros</a>
          <a href="/verificar-certificado" className="text-gray-800 font-semibold no-underline" onClick={() => setMobileMenuOpen(false)}>Certificado</a>
        </div>
      )}
    </>
  )
}
