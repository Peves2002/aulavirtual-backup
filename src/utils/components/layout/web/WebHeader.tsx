'use client'

import { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Menu } from 'lucide-react'
import { Button, IconButton } from '@mui/material'

import Logo from '@components/layout/shared/Logo'
import UserDropdown from '@components/layout/shared/UserDropdown'
import CartIcon from '@/features/web/cart/components/CartIcon'
import MobileNavDrawer from '@/utils/components/layout/web/MobileNavDrawer'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { useConfig } from '@/contexts/ConfigContext'
import { isFeatureEnabled } from '@/utils/configs/projectFeatures'

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

const ALL_NAV_ITEMS = [
  { title: 'Inicio', url: '/', key: 'inicio' },
  { title: 'Servicios', url: '/servicios', key: 'servicios' },
  { title: 'Cursos', url: '/cursos', key: 'cursos' },
  ...(isFeatureEnabled('simulacros') ? [{ title: 'Simulacros', url: '/simulacros', key: 'simulacros' as const }] : []),
  ...(isFeatureEnabled('ebooks') ? [{ title: 'Ebooks', url: '/ebooks', key: 'ebooks' as const }] : []),
  ...(isFeatureEnabled('rutas') ? [{ title: 'Rutas', url: '/rutas', key: 'rutas' as const }] : []),
  { title: 'Empresas', url: '/empresas', key: 'empresas' },
  ...(isFeatureEnabled('suscripciones') ? [{ title: 'Suscripciones', url: '/suscripciones', key: 'suscripciones' as const }] : []),
  { title: 'Nosotros', url: '/nosotros', key: 'nosotros' },
  { title: 'Certificado', url: '/verificar-certificado', key: 'certificado' },
]

export default function WebHeader({ initialCategories = [], platformName = 'MS&M CONSULTING', platformSlogan = '', empresasHabilitado = true }: WebHeaderProps) {
  void initialCategories
  void platformName
  void platformSlogan
  const pathname = usePathname()
  const { data: session } = useSession()
  const { openLogin, openRegister } = useAuthModal()
  const configs = useConfig()
  const primaryColor = configs.COLOR_PRIMARIO || '#02115C'
  const [navOpen, setNavOpen] = useState(false)

  const navItems = ALL_NAV_ITEMS.filter(item => item.key !== 'empresas' || empresasHabilitado)

  const isActive = (url: string) => {
    if (url === '/') return pathname === '/'
    return pathname.startsWith(url)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 bg-white border-b border-border shadow-sm z-50 flex items-center justify-between px-4 md:px-8 lg:px-10"
      style={{ height: 'var(--navbar-height)' }}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <Logo />
      </div>

      {/* Center: Navigation items for desktop */}
      <nav className="hidden md:flex items-center gap-1 xl:gap-2">
        {navItems.map(item => {
          const active = isActive(item.url)

          return (
            <Link
              key={item.title}
              href={item.url}
              className="no-underline px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold transition-all relative flex items-center"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: active ? 'var(--web-primary, #25927F)' : '#334155',
                backgroundColor: active ? 'rgba(var(--web-primary-rgb, 37, 146, 127), 0.08)' : 'transparent',
              }}
            >
              {item.title}
              {active && (
                <span
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--web-primary, #25927F)' }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <CartIcon />
        {session ? (
          <UserDropdown />
        ) : (
          <>
            <Button
              onClick={() => openLogin()}
              size="small"
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, fontWeight: 700, fontSize: '0.875rem', color: '#02115C', fontFamily: 'Poppins, sans-serif' }}
            >
              Iniciar Sesión
            </Button>
            <Button
              onClick={() => openRegister()}
              variant="contained"
              size="small"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '0.875rem',
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

        <IconButton
          onClick={() => setNavOpen(true)}
          aria-label="Abrir menú"
          sx={{
            display: { xs: 'inline-flex', md: 'none' },
            color: '#02115C',
          }}
        >
          <Menu size={26} />
        </IconButton>
      </div>

      <MobileNavDrawer open={navOpen} onClose={() => setNavOpen(false)} empresasHabilitado={empresasHabilitado} />
    </header>
  )
}
