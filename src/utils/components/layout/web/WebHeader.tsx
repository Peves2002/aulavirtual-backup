'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useSession } from 'next-auth/react'
import { Menu, X, Sparkles } from 'lucide-react'

import { useAuthModal } from '@/contexts/AuthModalContext'
import { useConfig } from '@/contexts/ConfigContext'
import UserDropdown from '@components/layout/shared/UserDropdown'
import CartIcon from '@/features/web/cart/components/CartIcon'
import { cn } from '@/utils/functions/cn'

export interface Category { id: string; nombre: string; slug: string }
interface WebHeaderProps {
  initialCategories?: Category[]
  platformName?: string
  platformSlogan?: string
}

/* ── Announcement Bar ── */
const messages = [
  '🚀 Lanzamiento: 50% OFF en todos los programas — por tiempo limitado',
  '🎁 Acceso GRATIS por 7 días al Plan PRO — Sin tarjeta requerida',
  '💎 Los primeros 500 alumnos reciben ATD Complete Suite de regalo',
]

function AnnouncementBar() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % messages.length), 5000)

    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary-glow to-secondary text-primary-foreground">
      <div className="container flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-medium">
        <Sparkles className="h-3.5 w-3.5 shrink-0" />
        <span key={i} className="animate-fade-up">{messages[i]}</span>
      </div>
    </div>
  )
}

/* ── Nav links (same as git) ── */
const links = [
  { to: '/programas',  label: 'Programas'     },
  { to: '/marketplace',label: 'Marketplace IA' },
  { to: '/consultoria',label: 'Consultoría'    },
  { to: '/comunidad',  label: 'Comunidad'      },
  { to: '/blog',       label: 'Blog'           },
]

/* ── Navbar ── */
export default function WebHeader({ initialCategories = [], platformName = 'Aula Virtual', platformSlogan = '' }: WebHeaderProps) {
  void initialCategories
  void platformSlogan
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const configs  = useConfig()
  const name     = configs.TEMPLATE_NAME || platformName
  const { data: session } = useSession()
  const { openLogin, openRegister } = useAuthModal()

  return (
    <>
      <AnnouncementBar />

      <header className="sticky top-0 z-50 glass-strong border-b border-white/5">
        <div className="container flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group no-underline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/pagina/logo.png" alt={name} className="h-10 w-auto" />
            <div className="font-display font-bold tracking-tight text-lg">
              {name} <span className="text-muted-foreground font-medium">Academy</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map(l => (
              <Link
                key={l.to}
                href={l.to}
                className={cn(
                  'px-3 py-2 text-sm rounded-md transition-colors no-underline',
                  pathname.startsWith(l.to)
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Auth */}
          <div className="hidden lg:flex items-center gap-2">
            <CartIcon />
            {session ? (
              <UserDropdown />
            ) : (
              <>
                <button
                  onClick={() => openLogin()}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors h-9 px-3 hover:bg-muted hover:text-foreground"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => openRegister()}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background h-9 px-3 bg-primary text-primary-foreground hover:scale-[1.02] transition-all duration-300"
                  style={{ border: 'none', cursor: 'pointer', boxShadow: '0 0 40px hsl(var(--primary)/0.6)' }}
                >
                  Empieza gratis →
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl">
            <div className="container py-4 flex flex-col gap-1">
              {links.map(l => (
                <Link
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'px-3 py-2.5 rounded-md text-sm no-underline',
                    pathname.startsWith(l.to) ? 'bg-muted text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-3">
                <button
                  onClick={() => { setOpen(false); openLogin() }}
                  className="flex-1 h-9 rounded-md text-sm font-medium border border-border bg-transparent hover:bg-muted hover:text-foreground transition-colors"
                  style={{ cursor: 'pointer' }}
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => { setOpen(false); openRegister() }}
                  className="flex-1 h-9 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:scale-[1.02] transition-all"
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  Empieza gratis
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
