'use client'

import Link from 'next/link'
import Logo from '@components/layout/shared/Logo'
import PublicHeaderAuth from './PublicHeaderAuth'

export default function PublicHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 flex items-center justify-between px-6 md:px-10 h-20">
      <Link href="/" className="flex items-center gap-3 no-underline">
        <Logo />
      </Link>
      <nav className="hidden md:flex gap-8 items-center">
        {[
          { href: '/', label: 'Inicio' },
          { href: '/nosotros', label: 'Nosotros' },
          { href: '/servicios', label: 'Servicios' },
          { href: '/cursos', label: 'Cursos' },
          { href: '/contacto', label: 'Contacto' },
        ].map(({ href, label }) => (
          <Link key={href} href={href} className="text-gray-600 hover:text-[var(--web-primary)] font-medium no-underline transition-colors text-sm">
            {label}
          </Link>
        ))}
      </nav>
      <PublicHeaderAuth />
    </header>
  )
}
