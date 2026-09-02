'use client'

import { useState } from 'react'

import Link from 'next/link'

import { IconButton } from '@mui/material'
import { Menu } from 'lucide-react'

import Logo from '@components/layout/shared/Logo'
import PublicHeaderAuth from './PublicHeaderAuth'
import PublicMobileNavDrawer from './PublicMobileNavDrawer'

const NAV_ITEMS = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export default function PublicHeader() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 flex items-center justify-between px-6 md:px-10 h-20">
      <Logo />
      <nav className="hidden md:flex gap-8 items-center">
        {NAV_ITEMS.map(({ href, label }) => (
          <Link key={href} href={href} className="text-gray-600 hover:text-[var(--web-primary)] font-medium no-underline transition-colors text-sm">
            {label}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex items-center">
        <PublicHeaderAuth />
      </div>

      <IconButton
        onClick={() => setNavOpen(true)}
        aria-label="Abrir menú"
        sx={{
          display: { xs: 'inline-flex', md: 'none' },
          color: 'var(--web-primary, #25927F)',
        }}
      >
        <Menu size={26} />
      </IconButton>

      <PublicMobileNavDrawer open={navOpen} onClose={() => setNavOpen(false)} navItems={NAV_ITEMS} />
    </header>
  )
}
