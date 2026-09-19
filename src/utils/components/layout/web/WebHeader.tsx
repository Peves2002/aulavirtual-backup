'use client'

import { useEffect, useState, useRef, type FormEvent } from 'react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'
import { Mail, MapPin, Menu, MessageCircle, Search, UserRound, Facebook, Instagram, Linkedin, Youtube, Globe } from 'lucide-react'
import { IconButton } from '@mui/material'

import Logo from '@components/layout/shared/Logo'
import UserDropdown from '@components/layout/shared/UserDropdown'
import MobileNavDrawer from '@/utils/components/layout/web/MobileNavDrawer'
import { SERVICES_DATA } from '@/features/web/servicios/data/servicesData'
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
  { title: 'Nuestros programas', url: '/cursos', key: 'cursos' },
  ...(isFeatureEnabled('simulacros') ? [{ title: 'Simulacros', url: '/simulacros', key: 'simulacros' as const }] : []),
  ...(isFeatureEnabled('ebooks') ? [{ title: 'Ebooks', url: '/ebooks', key: 'ebooks' as const }] : []),
  ...(isFeatureEnabled('rutas') ? [{ title: 'Rutas', url: '/rutas', key: 'rutas' as const }] : []),
  { title: 'Capacitación y entrenamiento', url: '/empresas', key: 'empresas' },
  ...(isFeatureEnabled('suscripciones') ? [{ title: 'Suscripciones', url: '/suscripciones', key: 'suscripciones' as const }] : []),
  { title: 'Conócenos', url: '/nosotros', key: 'nosotros' },
  { title: 'Blog', url: '/blogs', key: 'blogs' },
]

const staticSocialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/share/19MA86pCRJ/', icon: <Facebook size={15} /> },
  { label: 'Instagram', href: 'https://www.instagram.com/msymconsulting?igsi=YnRqZTVscnB1bzNr', icon: <Instagram size={15} /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/msymconsulting/', icon: <Linkedin size={15} /> },
  { label: 'Youtube', href: 'https://youtube.com/@msym_consulting?si=cmlw1LJvuh6eDaQt', icon: <Youtube size={15} /> },
  { label: 'Web', href: 'https://msymconsulting.com/', icon: <Globe size={15} /> },
]

export default function WebHeader({ initialCategories = [], platformName = 'MS&M CONSULTING', platformSlogan = '', empresasHabilitado = true }: WebHeaderProps) {
  void initialCategories
  void platformName
  void platformSlogan
  const pathname = usePathname()
  const { data: session } = useSession()
  const configs = useConfig()
  const primaryColor = '#FFB600'
  const [navOpen, setNavOpen] = useState(false)
  const [scrollState, setScrollState] = useState({ translateY: 0, isTransitioning: false })

  useEffect(() => {
    let previousScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const diff = currentScrollY - previousScrollY

      if (currentScrollY <= 0) {
        setScrollState(prev => prev.translateY === 0 && !prev.isTransitioning ? prev : { translateY: 0, isTransitioning: false })
      } else if (diff > 0) {
        setScrollState(prev => {
          if (prev.translateY <= -182 && !prev.isTransitioning) return prev
          return { translateY: Math.max(prev.translateY - diff, -182), isTransitioning: false }
        })
      } else if (diff < 0) {
        setScrollState(prev => {
          if (prev.translateY === 0 && prev.isTransitioning) return prev
          return { translateY: 0, isTransitioning: true }
        })
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
  const [isFocused, setIsFocused] = useState(false)
  const [courses, setCourses] = useState<any[]>([])
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)
  const searchRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isFocused && courses.length === 0 && !isLoadingSearch) {
      setIsLoadingSearch(true)
      fetch('/api/web/catalogo')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data?.courses) {
            setCourses(data.data.courses)
          }
        })
        .catch(() => {})
        .finally(() => setIsLoadingSearch(false))
    }
  }, [isFocused, courses.length, isLoadingSearch])

  const isActive = (url: string) => {
    if (url === '/') return pathname === '/'
    return pathname.startsWith(url)
  }

  const normalizeSearch = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
  const query = normalizeSearch(searchTerm)
  const filteredServices = query ? SERVICES_DATA.filter(s => normalizeSearch(s.title + s.shortTitle + s.category).includes(query)).slice(0, 4) : []
  const filteredCourses = query ? courses.filter(c => normalizeSearch(c.titulo + (c.subtitulo||'')).includes(query)).slice(0, 4) : []

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (filteredCourses.length > 0) {
       router.push(`/cursos/${filteredCourses[0].slug}`)
       setSearchTerm('')
       setIsFocused(false)
    } else if (filteredServices.length > 0) {
       router.push(`/servicios/${filteredServices[0].slug}`)
       setSearchTerm('')
       setIsFocused(false)
    } else if (query) {
       router.push(`/cursos?search=${encodeURIComponent(searchTerm)}`)
       setSearchTerm('')
       setIsFocused(false)
    }
  }


  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-[51] flex items-center justify-between px-4 md:px-8 lg:px-10 text-xs font-semibold"
        style={{
          height: 'var(--topbar-height)',
          backgroundColor: primaryColor,
          color: '#000000',
          transform: `translateY(${Math.max(scrollState.translateY, -40)}px)`,
          transition: scrollState.isTransitioning ? 'transform 240ms ease' : 'none'
        }}
      >
        <div className="hidden md:flex items-center gap-5 opacity-95">
          <span className="flex items-center gap-1.5"><MapPin size={14} />Lima-San Martin de Porres-Lima - Residencial Montecarlo</span>
          <span className="flex items-center gap-1.5"><Mail size={14} /> informes@msymconsulting.com</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/verificar-certificado" className="px-3 py-1.5 rounded-md bg-black text-white hover:text-[#FFB600] transition-colors hidden sm:block mr-2 font-bold shadow-sm">Verificar Certificado</Link>
          <div className="flex items-center gap-3 border-l border-black/20 pl-4">
            {staticSocialLinks.map(social => (
              <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="hover:text-black/70 transition-colors">
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <header
        className="fixed left-0 right-0 bg-white z-50 shadow-sm"
        style={{
          top: 'var(--topbar-height)',
          height: 'var(--header-height-web)',
          transform: `translateY(${scrollState.translateY}px)`,
          transition: scrollState.isTransitioning ? 'transform 240ms ease' : 'none'
        }}
      >
        <div className="h-[88px] flex items-center justify-between gap-4 px-4 md:px-8 lg:px-10">
          <Logo />

          <div className="hidden lg:flex flex-1 items-center justify-center gap-6 px-4">
            <form ref={searchRef} onSubmit={handleSearch} className="relative flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 shadow-sm transition-all focus-within:ring-2 focus-within:ring-[#FFB600]/40 w-48 lg:w-56">
              <Search size={16} className="text-slate-400 mr-1.5 flex-shrink-0" />
              <input
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder="Buscar programas..."
                className="min-w-0 flex-1 bg-transparent px-1 py-0.5 text-xs text-slate-700 outline-none placeholder:text-slate-400"
              />
              {isFocused && searchTerm.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden z-[60] flex flex-col max-h-[400px] overflow-y-auto text-left">
                  {isLoadingSearch && <div className="p-3 text-xs text-slate-500 text-center">Cargando...</div>}
                  
                  {!isLoadingSearch && filteredServices.length === 0 && filteredCourses.length === 0 && (
                    <div className="p-3 text-xs text-slate-500 text-center">No se encontraron resultados</div>
                  )}

                  {!isLoadingSearch && filteredCourses.length > 0 && (
                    <div className="flex flex-col">
                      <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Programas</div>
                      {filteredCourses.map(course => (
                        <Link key={course.id} href={`/cursos/${course.slug}`} onClick={() => { setIsFocused(false); setSearchTerm('') }} className="px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 border-b border-slate-100 last:border-0 block truncate">
                          {course.titulo}
                        </Link>
                      ))}
                    </div>
                  )}

                  {!isLoadingSearch && filteredServices.length > 0 && (
                    <div className="flex flex-col">
                      <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Servicios</div>
                      {filteredServices.map(service => (
                        <Link key={service.id} href={`/servicios/${service.slug}`} onClick={() => { setIsFocused(false); setSearchTerm('') }} className="px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 border-b border-slate-100 last:border-0 block truncate">
                          {service.shortTitle}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </form>
            <nav aria-label="Navegación principal" className="flex items-center h-[88px] gap-1">
              {menuItems.map(item => {
                const active = isActive(item.url)
                return (
                  <Link 
                    key={item.title} 
                    href={item.url} 
                    className="relative flex items-center justify-center h-full px-2 lg:px-3 text-[11px] font-extrabold uppercase tracking-wider no-underline transition-colors hover:text-[#FFB600] whitespace-nowrap" 
                    style={{ color: active ? '#FFB600' : '#4D4D4D' }}
                  >
                    <span className="text-center w-full">{item.title}</span>
                    {active && <span className="absolute bottom-[22px] left-2 right-2 lg:left-3 lg:right-3 h-[3px]" style={{ backgroundColor: primaryColor }} />}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden lg:flex items-center gap-2">
              <Link href="https://plataformamsymconsulting.com/auth/sign-in" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-[#FFFFFF] no-underline transition-colors bg-[#000000] hover:text-[#FFB600]">Intranet</Link>
              {session ? (
                <UserDropdown />
              ) : (
                <Link href="/login" className="px-4 py-2 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-[#000000] no-underline transition-opacity hover:opacity-85" style={{ backgroundColor: primaryColor }}>Aula Virtual</Link>
              )}
            </div>
            <IconButton onClick={() => setNavOpen(true)} aria-label="Abrir menú" sx={{ display: { xs: 'inline-flex', lg: 'none' }, color: '#000000' }}><Menu size={26} /></IconButton>
          </div>
        </div>

        <MobileNavDrawer open={navOpen} onClose={() => setNavOpen(false)} empresasHabilitado={empresasHabilitado} />
      </header>
    </>
  )
}
