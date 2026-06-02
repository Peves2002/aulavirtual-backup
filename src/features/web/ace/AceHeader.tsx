'use client'

import { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Menu, X } from 'lucide-react'

import { useAuthModal } from '@/contexts/AuthModalContext'

const nav = [
  { to: '/', label: 'Inicio' },
  { to: '/cursos', label: 'Cursos' },
  { to: '/ebooks', label: 'Ebooks' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function AceHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { openLogin, openRegister } = useAuthModal()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo — same image as the auth modal */}
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Logo" className="h-14 w-auto" height={56} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            const active = pathname === n.to

            return (
              <Link
                key={n.to}
                href={n.to}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  active ? 'text-primary bg-muted' : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                {n.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => openLogin()}
            className="px-4 py-2 rounded-md text-sm font-semibold border border-border text-foreground hover:bg-muted transition-colors"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => openRegister()}
            className="px-4 py-2 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-[var(--shadow-glow)]"
          >
            Registrarse
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground" aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                href={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => { setOpen(false); openLogin() }}
                className="flex-1 px-3 py-2 rounded-md text-sm font-semibold border border-border text-foreground text-center hover:bg-muted"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => { setOpen(false); openRegister() }}
                className="flex-1 px-3 py-2 rounded-md text-sm font-semibold bg-primary text-primary-foreground text-center hover:opacity-90"
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
