'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Users, Award, Map, Building2, BookText, ClipboardList, Repeat2 } from 'lucide-react'

import { isFeatureEnabled } from '@/utils/configs/projectFeatures'

const ALL_NAV_ITEMS = [
  { title: 'Inicio', url: '/', icon: Home, key: 'inicio' },
  { title: 'Servicios', url: '/servicios', icon: ClipboardList, key: 'servicios' },
  { title: 'Cursos', url: '/cursos', icon: BookOpen, key: 'cursos' },
  ...(isFeatureEnabled('simulacros')
    ? [{ title: 'Simulacros', url: '/simulacros', icon: ClipboardList, key: 'simulacros' as const }]
    : []),
  ...(isFeatureEnabled('ebooks')
    ? [{ title: 'Ebooks', url: '/ebooks', icon: BookText, key: 'ebooks' as const }]
    : []),
  ...(isFeatureEnabled('rutas')
    ? [{ title: 'Rutas', url: '/rutas', icon: Map, key: 'rutas' as const }]
    : []),
  { title: 'Empresas', url: '/empresas', icon: Building2, key: 'empresas' },
  ...(isFeatureEnabled('suscripciones')
    ? [{ title: 'Suscripciones', url: '/suscripciones', icon: Repeat2, key: 'suscripciones' as const }]
    : []),
  { title: 'Nosotros', url: '/nosotros', icon: Users, key: 'nosotros' },
  { title: 'Certificado', url: '/verificar-certificado', icon: Award, key: 'certificado' },
]

export default function WebNavLinks({
  empresasHabilitado = true,
  isTransparent = false
}: {
  empresasHabilitado?: boolean
  isTransparent?: boolean
}) {
  const pathname = usePathname()

  const navItems = ALL_NAV_ITEMS.filter(item => {
    if (item.key === 'empresas' && !empresasHabilitado) return false
    return true
  })

  const isActive = (url: string) => {
    if (url === '/') return pathname === '/'
    return pathname.startsWith(url)
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
      {navItems.map(item => {
        const active = isActive(item.url)
          return (
            <Link
              key={item.title}
              href={item.url}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
              style={{
                fontFamily: 'Inter, Poppins, sans-serif',
                backgroundColor: active ? (isTransparent ? 'rgba(255,255,255,0.15)' : 'rgba(var(--web-primary-rgb, 2, 17, 92), 0.1)') : 'transparent',
                color: active ? (isTransparent ? '#ffffff' : 'var(--web-primary, #02115C)') : (isTransparent ? 'rgba(255,255,255,0.9)' : '#4b5563'),
                fontWeight: active ? 700 : 500,
              }}
              onMouseEnter={e => {
                if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = isTransparent ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                if (!active) (e.currentTarget as HTMLElement).style.color = isTransparent ? '#ffffff' : '#4b5563'
              }}
              onMouseLeave={e => {
                if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                if (!active) (e.currentTarget as HTMLElement).style.color = isTransparent ? 'rgba(255,255,255,0.9)' : '#4b5563'
              }}
            >
              <item.icon size={18} style={{ color: active ? (isTransparent ? '#ffffff' : 'var(--web-primary, #02115C)') : (isTransparent ? 'rgba(255,255,255,0.9)' : '#6b7280') }} />
              {item.title}
            </Link>
          )
        })}
    </div>
  )
}
