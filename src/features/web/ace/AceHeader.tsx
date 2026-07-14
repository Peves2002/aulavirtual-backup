'use client'

import { useRef, useState } from 'react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { Menu, X, ChevronDown, LayoutDashboard, BookOpen, User, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

import { useAuthModal } from '@/contexts/AuthModalContext'
import { useConfig } from '@/contexts/ConfigContext'
import themeConfig from '@/utils/configs/themeConfig'

const nav = [
  { to: '/', label: 'Inicio' },
  { to: '/cursos', label: 'Cursos' },
  { to: '/ebooks', label: 'Ebooks' },
  { to: '/videos', label: 'Videos' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function AceHeader() {
  const [open, setOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { openLogin, openRegister } = useAuthModal()
  const { data: session } = useSession()
  const userMenuRef = useRef<HTMLDivElement>(null)
  const configs = useConfig()
  const logoSrc = configs.TEMPLATE_LOGO || themeConfig.templateLogo

  const user = session?.user as any
  const initials = user ? `${user.nombre?.[0] || user.name?.[0] || '?'}`.toUpperCase() : '?'

  const handleLogout = async () => {
    setUserMenuOpen(false)
    await signOut({ redirect: false })
    router.push('/')
    router.refresh()
  }

  const dashboardUrl = user?.rol === 'ADMIN'
    ? '/admin/dashboard'
    : user?.rol === 'PROFESOR'
      ? '/profesor/dashboard'
      : '/estudiante/dashboard'

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="Logo" className="h-14 w-auto" height={56} />
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

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-2">
          {session ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(o => !o)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                {user?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {initials}
                  </span>
                )}
                <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                  {user?.nombre ? `${user.nombre} ${user.apellido || ''}`.trim() : user?.name}
                </span>
                <ChevronDown size={14} className="text-muted-foreground" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-52 rounded-xl border border-border bg-background shadow-lg z-20 overflow-hidden">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {user?.nombre ? `${user.nombre} ${user.apellido || ''}`.trim() : user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href={dashboardUrl}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <LayoutDashboard size={16} className="text-muted-foreground" />
                        Mi Panel
                      </Link>
                      <Link
                        href="/perfil"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <User size={16} className="text-muted-foreground" />
                        Mi Perfil
                      </Link>
                      {user?.rol === 'ESTUDIANTE' && (
                        <Link
                          href="/estudiante/mis-cursos"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <BookOpen size={16} className="text-muted-foreground" />
                          Mis Cursos
                        </Link>
                      )}
                    </div>
                    <div className="border-t border-border py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => openLogin()}
                className="px-4 py-2 rounded-md text-sm font-semibold border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => openRegister()}
                className="px-4 py-2 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-[var(--shadow-glow)] cursor-pointer"
              >
                Registrarse
              </button>
            </>
          )}
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

            {session ? (
              <div className="mt-3 pt-3 border-t border-border flex flex-col gap-1">
                <div className="flex items-center gap-3 px-3 py-2">
                  {user?.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.avatar} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
                  ) : (
                    <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {initials}
                    </span>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {user?.nombre ? `${user.nombre} ${user.apellido || ''}`.trim() : user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
                <Link href={dashboardUrl} onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground hover:bg-muted">
                  <LayoutDashboard size={15} /> Mi Panel
                </Link>
                <Link href="/perfil" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground hover:bg-muted">
                  <User size={15} /> Mi Perfil
                </Link>
                <button onClick={() => { setOpen(false); handleLogout() }} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50">
                  <LogOut size={15} /> Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => { setOpen(false); openLogin() }}
                  className="flex-1 px-3 py-2 rounded-md text-sm font-semibold border border-border text-foreground text-center hover:bg-muted cursor-pointer"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => { setOpen(false); openRegister() }}
                  className="flex-1 px-3 py-2 rounded-md text-sm font-semibold bg-primary text-primary-foreground text-center hover:opacity-90 cursor-pointer"
                >
                  Registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
