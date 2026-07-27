'use client'

import { useState, useEffect } from 'react'

import { usePathname } from 'next/navigation'

import { Button } from '@mui/material'
import { useSession } from 'next-auth/react'

import Logo from '@components/layout/shared/Logo'
import UserDropdown from '@components/layout/shared/UserDropdown'
import CartIcon from '@/features/web/cart/components/CartIcon'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { useConfig } from '@/contexts/ConfigContext'
import WebNavLinks from '@/utils/components/layout/web/WebNavLinks'

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

export default function WebHeader({ initialCategories = [], platformName = 'Aula Virtual', platformSlogan = 'Aprende sin límites', empresasHabilitado = true }: WebHeaderProps) {
  void initialCategories
  void platformName
  void platformSlogan
  const { data: session } = useSession()
  const { openLogin, openRegister } = useAuthModal()
  const configs = useConfig()
  const primaryColor = configs.COLOR_PRIMARIO || '#02115C'

  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) return
    const handleScroll = () => setIsScrolled(window.scrollY > 50)

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  const isTransparent = isHome && !isScrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-colors duration-300 ${
        isTransparent
          ? 'bg-transparent border-transparent shadow-none'
          : 'bg-white border-b border-border shadow-sm'
      }`}
      style={{ height: 'var(--navbar-height)' }}
    >
      {/* Logo */}
      <div className={`transition-all duration-300 ${isTransparent ? 'brightness-0 invert' : ''}`}>
        <Logo />
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex flex-1 justify-center mx-4">
        <WebNavLinks empresasHabilitado={empresasHabilitado} isTransparent={isTransparent} />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <CartIcon isTransparent={isTransparent} />
        {session ? (
          <UserDropdown />
        ) : (
          <>
            <Button
              onClick={() => openLogin()}
              size="small"
              sx={{ fontWeight: 700, fontSize: '0.9rem', color: isTransparent ? '#ffffff' : '#02115C', fontFamily: 'Inter, sans-serif' }}
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
                backgroundColor: isTransparent ? 'rgba(255,255,255,0.2)' : primaryColor,
                color: isTransparent ? '#ffffff' : undefined,
                backdropFilter: isTransparent ? 'blur(4px)' : 'none',
                display: { xs: 'none', sm: 'inline-flex' },
                '&:hover': { backgroundColor: primaryColor, opacity: 0.85, color: '#ffffff' },
              }}
            >
              Registrarse
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
