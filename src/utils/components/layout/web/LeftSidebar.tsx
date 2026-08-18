'use client'

import { useRef, useState, useEffect, type RefObject } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { usePathname, useRouter } from 'next/navigation'

import { signOut, useSession } from 'next-auth/react'

import { Home, BookOpen, Users, Award, GraduationCap, Building2, LogIn, UserPlus, User, LayoutDashboard, BookMarked, LogOut } from 'lucide-react'

export interface NavCategory {
  id: string
  nombre: string
  slug: string
}

const ALL_NAV_ITEMS = [
  { key: 'inicio', title: 'Inicio', url: '/', icon: Home },
  { key: 'cursos', title: 'Cursos', url: '/cursos', icon: BookOpen },
  { key: 'diplomados', title: 'Diplomados', url: '/diplomados', icon: GraduationCap },
  { key: 'programas', title: 'Programas', url: '/programas', icon: BookMarked },
  { key: 'empresas', title: 'Empresas', url: '/empresas', icon: Building2 },
  { key: 'nosotros', title: 'Nosotros', url: '/nosotros', icon: Users },
  { key: 'certificado', title: 'Certificado', url: '/verificar-certificado', icon: Award },
]

export default function LeftSidebar({
  empresasHabilitado = true,
  rutasHabilitado = true,
  categories = [],
}: {
  empresasHabilitado?: boolean
  rutasHabilitado?: boolean
  categories?: NavCategory[]
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const [fullyExpanded, setFullyExpanded] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [menuPos, setMenuPos] = useState({ bottom: 0, left: 0 })
  const [openPanel, setOpenPanel] = useState<'cursos' | 'diplomados' | 'programas' | null>(null)
  const [categMenuPos, setCategMenuPos] = useState({ top: 0, left: 0 })
  const { data: session } = useSession()
  const userButtonRef = useRef<HTMLButtonElement>(null)
  const cursosButtonRef = useRef<HTMLButtonElement>(null)
  const diplomadosButtonRef = useRef<HTMLButtonElement>(null)
  const programasButtonRef = useRef<HTMLButtonElement>(null)

  // Wait for sidebar expansion transition (300ms) before allowing flyouts
  useEffect(() => {
    if (expanded) {
      const timer = setTimeout(() => setFullyExpanded(true), 300)

      
return () => clearTimeout(timer)
    } else {
      setFullyExpanded(false)
    }
  }, [expanded])

  const navItems = ALL_NAV_ITEMS.filter(item => {
    if (item.key === 'empresas' && !empresasHabilitado) return false
    if (item.key === 'rutas' && !rutasHabilitado) return false

    return true
  })

  const handleUserClick = () => {
    if (userButtonRef.current) {
      const rect = userButtonRef.current.getBoundingClientRect()

      setMenuPos({ bottom: window.innerHeight - rect.bottom, left: rect.right + 8 })
    }

    setUserMenuOpen(o => !o)
  }

  const handleDropdownHover = (
    key: 'cursos' | 'diplomados' | 'programas',
    ref: RefObject<HTMLButtonElement | null>
  ) => {
    if (categories.length === 0) return

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()

      setCategMenuPos({ top: rect.top, left: rect.right })
    }

    setOpenPanel(key)
  }

  const handleLogout = async () => {
    setUserMenuOpen(false)
    await signOut({ redirect: false })
    router.push('/login')
  }

  const user = session?.user as any

  const isActive = (url: string) => {
    if (url === '/') return pathname === '/'

    return pathname.startsWith(url)
  }

  const navItemStyle = (active: boolean, extraOpen = false) => ({
    height: '56px',
    color: active ? 'var(--web-light, #BDD962)' : '#ffffff',
    fontWeight: active ? 700 : 500,
    backgroundColor: active || extraOpen ? 'rgba(255,255,255,0.05)' : 'transparent',
  })

  const NavItemInterior = ({ item, active }: { item: typeof ALL_NAV_ITEMS[0]; active: boolean }) => (
    <>
      {active && (
        <div
          className="absolute left-0 rounded-r-full"
          style={{ width: '4px', height: '32px', backgroundColor: 'var(--web-light, #BDD962)' }}
        />
      )}
      <div
        className="flex items-center justify-center rounded-xl transition-all flex-shrink-0"
        style={{
          minWidth: '48px',
          height: '48px',
          backgroundColor: active ? 'var(--web-light, #BDD962)' : 'transparent',
          color: active ? '#0A0A0A' : 'inherit',
          boxShadow: active ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
        }}
      >
        <item.icon style={{ width: '22px', height: '22px' }} />
      </div>
      <span
        className="ml-3 text-sm whitespace-nowrap overflow-hidden transition-all duration-300"
        style={{
          fontFamily: 'Poppins, sans-serif',
          opacity: expanded ? 1 : 0,
          maxWidth: expanded ? '180px' : '0px',
          transition: 'opacity 0.2s, max-width 0.3s',
        }}
      >
        {item.title}
      </span>
    </>
  )

  return (
    <>
      <aside
        className="fixed left-0 bottom-0 flex flex-col items-start py-6 gap-1 overflow-hidden shadow-xl transition-all duration-300 ease-in-out"
        style={{
          top: 'var(--navbar-height)',
          width: expanded ? 'var(--sidebar-width-expanded)' : 'var(--sidebar-width)',
          backgroundColor: 'var(--web-dark, #025E44)',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          zIndex: 40,
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => { setExpanded(false); setOpenPanel(null) }}
      >
        {/* Categories flyout panel */}
        {openPanel && fullyExpanded && (
          <>

            <div
              style={{
                position: 'fixed',
                top: categMenuPos.top,
                left: 'var(--sidebar-width-expanded)',
                width: '180px',
                backgroundColor: 'var(--web-dark, #025E44)',
                borderRadius: '0 12px 12px 0',
                boxShadow: '4px 0 16px rgba(0,0,0,0.25)',
                zIndex: 50,
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '6px' }}>
                <Link
                  href={`/${openPanel}`}
                  onClick={() => setOpenPanel(null)}
                  className="no-underline flex items-center w-full px-4 transition-colors"
                  style={{ height: '44px', color: 'var(--web-light, #BDD962)', fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 600 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.08)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                >
                  Todas las categorías
                </Link>
                <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '4px 8px' }} />
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    href={`/${openPanel}?categoria=${cat.slug}`}
                    onClick={() => setOpenPanel(null)}
                    className="no-underline flex items-center w-full px-4 transition-colors"
                    style={{ height: '44px', color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 500 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.08)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                  >
                    {cat.nombre}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        {navItems.map(item => {
          const active = isActive(item.url)

          if (item.key === 'cursos' || item.key === 'diplomados' || item.key === 'programas') {
            const ref =
              item.key === 'cursos'
                ? cursosButtonRef
                : item.key === 'diplomados'
                  ? diplomadosButtonRef
                  : programasButtonRef

            const isOpen = openPanel === item.key

            return (
              <button
                key={item.key}
                ref={ref}
                onClick={() => router.push(item.url)}
                className="flex items-center w-full px-4 transition-colors duration-200 relative"
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  ...navItemStyle(active, isOpen),
                }}
                onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.05)'
                  handleDropdownHover(item.key as 'cursos' | 'diplomados' | 'programas', ref)
                }}
                onMouseLeave={e => {
                  if (!active && !isOpen) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                }}
              >
                <NavItemInterior item={item} active={active} />
              </button>
            )
          }

          return (
            <Link
              key={item.key}
              href={item.url}
              className="no-underline flex items-center w-full px-4 transition-colors duration-200 relative"
              style={navItemStyle(active)}
              onMouseEnter={e => {
                if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.05)'
                setOpenPanel(null)
              }}
              onMouseLeave={e => {
                if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
              }}
            >
              <NavItemInterior item={item} active={active} />
            </Link>
          )
        })}

        {/* Bottom: user or login */}
        <div className="mt-auto w-full" style={{ paddingBottom: '20px', position: 'relative' }}>
          <div className="px-3">
            {/* User popup menu — rendered fixed to escape overflow:hidden on aside */}
            {session?.user && userMenuOpen && (
              <>
                {/* Backdrop */}
                <div style={{ position: 'fixed', inset: 0, zIndex: 49 }} onClick={() => setUserMenuOpen(false)} />
                {/* Panel */}
                <div
                  style={{
                    position: 'fixed',
                    bottom: menuPos.bottom,
                    left: menuPos.left,
                    width: '240px',
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                    border: '1px solid hsl(214,20%,91%)',
                    zIndex: 50,
                    overflow: 'hidden',
                  }}
                >
                  {/* Header */}
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid hsl(214,20%,93%)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flexShrink: 0, width: '38px', height: '38px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'var(--web-primary, #25927F)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {user?.avatar ? (
                        <Image src={user.avatar} alt="avatar" width={38} height={38} style={{ objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 800, color: '#fff' }}>
                          {(user?.nombre?.[0] || session.user.name?.[0] || '?').toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 700, color: '#0A0A0A', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {user?.nombre ? `${user.nombre} ${user.apellido || ''}`.trim() : session.user.name}
                      </p>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', color: '#64748b', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {session.user.email}
                      </p>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div style={{ padding: '6px' }}>
                    {[
                      { label: 'Mi Perfil', icon: User, href: '/perfil' },
                      ...(user?.rol === 'ADMIN' ? [{ label: 'Panel de Administración', icon: LayoutDashboard, href: '/admin/dashboard' }] : []),
                      ...(user?.rol === 'ESTUDIANTE'
                        ? [
                          { label: 'Mis Cursos', icon: BookMarked, href: '/estudiante/mis-cursos' },
                          { label: 'Mis Diplomados', icon: Award, href: '/estudiante/mis-diplomados' },
                        ]
                        : []),
                    ].map(({ label, icon: Icon, href }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setUserMenuOpen(false)}
                        className="no-underline flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors"
                        style={{ color: '#374151', fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 600 }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(var(--web-primary-rgb,37,146,127),0.07)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                      >
                        <Icon size={16} />
                        {label}
                      </Link>
                    ))}

                    {/* Logout */}
                    <div style={{ borderTop: '1px solid hsl(214,20%,93%)', marginTop: '6px', paddingTop: '6px' }}>
                      <button
                        onClick={handleLogout}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '12px', border: 'none', cursor: 'pointer', backgroundColor: '#fef2f2', color: '#dc2626', fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 700 }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#fee2e2' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#fef2f2' }}
                      >
                        <LogOut size={16} />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {session?.user ? (

              /* Logged in — show avatar + name, click opens menu */
              <button
                ref={userButtonRef}
                onClick={handleUserClick}
                className="flex items-center gap-3 rounded-xl px-3 py-3 w-full transition-colors"
                style={{ backgroundColor: userMenuOpen ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)' }}
                onMouseLeave={e => { if (!userMenuOpen) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.05)' }}
              >
                {/* Avatar */}
                <div style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'var(--web-primary, #25927F)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.2)' }}>
                  {user?.avatar ? (
                    <Image src={user.avatar} alt="avatar" width={36} height={36} style={{ objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 800, color: '#fff' }}>
                      {(user?.nombre?.[0] || session.user.name?.[0] || '?').toUpperCase()}
                    </span>
                  )}
                </div>
                {/* Name + email */}
                <div
                  style={{
                    overflow: 'hidden',
                    textAlign: 'left',
                    opacity: expanded ? 1 : 0,
                    maxWidth: expanded ? '160px' : '0px',
                    transition: 'opacity 0.2s, max-width 0.3s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: '#ffffff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user?.nombre ? `${user.nombre} ${user.apellido || ''}`.trim() : session.user.name}
                  </p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {session.user.email}
                  </p>
                </div>
              </button>
            ) : (

              /* Not logged in — show login + register */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link
                  href="/login"
                  className="no-underline flex items-center w-full rounded-xl px-3 transition-all"
                  style={{ height: '44px', gap: '12px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.12)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.06)' }}
                >
                  <div style={{ flexShrink: 0, minWidth: '30px', display: 'flex', justifyContent: 'center' }}>
                    <LogIn size={18} color="rgba(255,255,255,0.7)" />
                  </div>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 600, color: '#ffffff', opacity: expanded ? 1 : 0, maxWidth: expanded ? '160px' : '0px', transition: 'opacity 0.2s, max-width 0.3s', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    Iniciar Sesión
                  </span>
                </Link>
                <Link
                  href="/registrarse"
                  className="no-underline flex items-center w-full rounded-xl px-3 transition-all"
                  style={{ height: '44px', gap: '12px', backgroundColor: 'var(--web-light, #BDD962)', border: '1px solid transparent' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--web-primary, #25927F)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--web-light, #BDD962)' }}
                >
                  <div style={{ flexShrink: 0, minWidth: '30px', display: 'flex', justifyContent: 'center' }}>
                    <UserPlus size={18} color="#0A0A0A" />
                  </div>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 700, color: '#0A0A0A', opacity: expanded ? 1 : 0, maxWidth: expanded ? '160px' : '0px', transition: 'opacity 0.2s, max-width 0.3s', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    Registrarse
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
