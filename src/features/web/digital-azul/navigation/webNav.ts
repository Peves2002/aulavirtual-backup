import type { LucideIcon } from 'lucide-react'
import {
  Home,
  Users,
  GraduationCap,
  BookOpen,
  BookMarked,
  Trophy,
  Mail,
  Landmark,
  Building2,
  ShoppingBag,
  BookOpen as BookIcon,
} from 'lucide-react'

export type WebNavItem = {
  title: string
  url: string
  icon: LucideIcon
  key: string

  /** Rutas adicionales que marcan este ítem como activo */
  matchPaths?: string[]
}

export type SolucionesNavItem = {
  title: string
  url: string
  icon: LucideIcon
  description: string
}

/** Menú principal v1.0 — Página Web Institucional Digital Azul */
export const MAIN_NAV_ITEMS: WebNavItem[] = [
  { title: 'Inicio', url: '/', icon: Home, key: 'inicio' },
  { title: 'Nosotros', url: '/nosotros', icon: Users, key: 'nosotros' },
  { title: 'Cursos', url: '/cursos', icon: BookMarked, key: 'cursos' },
  { title: 'Campus', url: '/campus', icon: GraduationCap, key: 'campus', matchPaths: ['/login', '/forgot-password'] },
  { title: 'Recursos', url: '/recursos', icon: BookOpen, key: 'recursos' },
  { title: 'Casos de Éxito', url: '/casos-de-exito', icon: Trophy, key: 'casos' },
  { title: 'Contacto', url: '/contacto', icon: Mail, key: 'contacto' },
]

/** Enlaces de la sección Soluciones (home + footer) — redirigen al catálogo */
export const SOLUCIONES_NAV_ITEMS: SolucionesNavItem[] = [
  {
    title: 'Entidades Públicas',
    url: '/cursos',
    icon: Landmark,
    description: 'Programas institucionales para el sector público.',
  },
  {
    title: 'Entidades Privadas',
    url: '/cursos',
    icon: Building2,
    description: 'Programas corporativos a medida para empresas.',
  },
  {
    title: 'Cursos Abiertos',
    url: '/cursos',
    icon: ShoppingBag,
    description: 'Capacitaciones disponibles para participantes individuales.',
  },
  {
    title: 'Recursos',
    url: '/cursos',
    icon: BookIcon,
    description: 'Manuales, guías, plantillas y artículos.',
  },
]

/** Botones destacados permanentes en header / menú móvil */
export const HIGHLIGHTED_CTAS = {
  campus: { label: 'Campus Digital Azul', url: '/campus' },
  contact: { label: 'Contacto', url: '/contacto' },
} as const

/** Ítems del menú central (sin Contacto ni Campus — van como CTAs destacados) */
export const HEADER_NAV_ITEMS = MAIN_NAV_ITEMS.filter(item => !['contacto', 'campus'].includes(item.key))

/** Ítems prioritarios para la barra inferior móvil */
export const MOBILE_BOTTOM_NAV_KEYS = ['inicio', 'recursos', 'campus', 'contacto'] as const

export function isNavItemActive(pathname: string, item: WebNavItem): boolean {
  if (item.url === '/') return pathname === '/'

  const paths = [item.url, ...(item.matchPaths ?? [])]

  return paths.some(path => pathname === path || pathname.startsWith(`${path}/`))
}

export function isSolucionesActive(pathname: string): boolean {
  return pathname === '/' || pathname.startsWith('/cursos')
}
