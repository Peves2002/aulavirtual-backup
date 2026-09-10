'use client'

import { useEffect, useState, type FormEvent } from 'react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'
import { Mail, MapPin, Menu, MessageCircle, Search, UserRound } from 'lucide-react'
import { IconButton } from '@mui/material'

import Logo from '@components/layout/shared/Logo'
import UserDropdown from '@components/layout/shared/UserDropdown'
import CartIcon from '@/features/web/cart/components/CartIcon'
import MobileNavDrawer from '@/utils/components/layout/web/MobileNavDrawer'
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
  { title: 'Blog', url: '/blogs', key: 'blogs' },
]

export default function WebHeader({ initialCategories = [], platformName = 'MS&M CONSULTING', platformSlogan = '', empresasHabilitado = true }: WebHeaderProps) {
  void initialCategories
  void platformName
  void platformSlogan
  const pathname = usePathname()
  const { data: session } = useSession()
  const configs = useConfig()
  const primaryColor = configs.COLOR_PRIMARIO || '#02115C'
  const [navOpen, setNavOpen] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)

  useEffect(() => {
    let previousScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 20 || currentScrollY < previousScrollY) {
        setHeaderVisible(true)
      } else if (currentScrollY > previousScrollY) {
        setHeaderVisible(false)
      }

      previousScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ALL_NAV_ITEMS.filter(item => item.key !== 'empresas' || empresasHabilitado)
  const menuItems = navItems.filter(item => ['inicio', 'servicios', 'cursos', 'empresas', 'nosotros', 'blogs'].includes(item.key))
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState('')

  const isActive = (url: string) => {
    if (url === '/') return pathname === '/'

    return pathname.startsWith(url)
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = searchTerm.trim()

    router.push(query ? `/cursos?search=${encodeURIComponent(query)}` : '/cursos')
  }


  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-[51] flex items-center justify-between px-4 md:px-8 lg:px-10 text-xs font-semibold"
        style={{
          height: 'var(--topbar-height)',
          backgroundColor: primaryColor,
          color: '#ffffff',
          transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 240ms ease'
        }}
      >
        <div className="hidden md:flex items-center gap-5 opacity-95">
          <span className="flex items-center gap-1.5"><MapPin size={14} />Lima-San Martin de Porres-Lima - Residencial Montecarlo</span>
          <span className="flex items-center gap-1.5"><Mail size={14} /> contacto@msymconsulting.com</span>
        </div>
        <div className="ml-auto flex items-center gap-1 sm:gap-3">
          <Link href="/verificar-certificado" className="px-2.5 py-1.5 rounded-md hover:bg-white/15 transition-colors">Verificar Certificado</Link>
          <Link href="https://plataformamsymconsulting.com/auth/sign-in" target="_blank" rel="noopener noreferrer" className="hidden sm:block px-2.5 py-1.5 rounded-md hover:bg-white/15 transition-colors">Intranet</Link>
          {!session && <Link href="/login" className="px-2.5 py-1.5 rounded-md hover:bg-white/15 transition-colors">Aula Virtual</Link>}
        </div>
      </div>

      <header
        className="fixed left-0 right-0 bg-white z-50 shadow-sm"
        style={{
          top: 'var(--topbar-height)',
          height: 'var(--header-height-web)',
          transform: headerVisible ? 'translateY(0)' : 'translateY(calc(-1 * (var(--topbar-height) + var(--header-height-web))))',
          transition: 'transform 240ms ease'
        }}
      >
        <div className="h-[88px] flex items-center justify-between gap-4 px-4 md:px-8 lg:px-10">
          <Logo />

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-[540px] items-center rounded-full border border-slate-200 bg-slate-50 p-1 shadow-inner">
            <Search size={19} className="ml-3 text-slate-400" />
            <input
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              aria-label="Buscar cursos"
              placeholder="Buscar cursos, rutas y recursos..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
            <button type="submit" className="rounded-full px-5 py-2.5 text-xs font-extrabold text-white transition-opacity hover:opacity-85" style={{ backgroundColor: primaryColor }}>
              BUSCAR
            </button>
          </form>

          <div className="flex items-center gap-2 lg:gap-4">
            <a href={`https://wa.me/${(configs.WHATSAPP_NUMERO || '51959436827').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-2 no-underline">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white"><MessageCircle size={23} /></span>
              <span className="hidden xl:block"><strong className="block text-sm text-slate-900">WhatsApp</strong><small className="text-[0.68rem] font-semibold uppercase tracking-wider text-slate-400">Atención al cliente</small></span>
            </a>
            <CartIcon />
            <div className="hidden lg:block">
              {session ? <UserDropdown /> : <Link href="/register" className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-extrabold text-white no-underline transition-opacity hover:opacity-85" style={{ backgroundColor: primaryColor }}>Registrarse</Link>}
            </div>
            <IconButton onClick={() => setNavOpen(true)} aria-label="Abrir menú" sx={{ display: { xs: 'inline-flex', lg: 'none' }, color: '#02115C' }}><Menu size={26} /></IconButton>
          </div>
        </div>

        <div className="hidden h-[54px] items-center justify-between px-4 md:px-8 lg:flex lg:px-10" style={{ backgroundColor: '#102747' }}>
          <nav aria-label="Navegación principal" className="flex h-full items-center gap-1">
            {menuItems.map(item => {
              const active = isActive(item.url)

              return <Link key={item.title} href={item.url} className="relative flex h-full items-center px-4 text-xs font-extrabold uppercase tracking-wider no-underline transition-colors" style={{ color: active ? '#ffffff' : '#B7C5D6', backgroundColor: active ? 'rgba(255,255,255,0.08)' : 'transparent' }}>{item.title}{active && <span className="absolute bottom-0 left-4 right-4 h-1 rounded-t-full" style={{ backgroundColor: primaryColor }} />}</Link>
            })}
          </nav>
          <Link
            href="https://plataformamsymconsulting.com/auth/sign-in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full items-center gap-2 px-7 text-xs font-extrabold uppercase tracking-wider text-[#02115C] no-underline transition-colors"
            style={{ backgroundColor: '#FFB600' }}
            onMouseEnter={event => { event.currentTarget.style.backgroundColor = '#FFC833' }}
            onMouseLeave={event => { event.currentTarget.style.backgroundColor = '#FFB600' }}
          >
            <UserRound size={16} /> Intranet
          </Link>
        </div>

        <MobileNavDrawer open={navOpen} onClose={() => setNavOpen(false)} empresasHabilitado={empresasHabilitado} />
      </header>
    </>
  )
}
