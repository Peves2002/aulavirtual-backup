'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type WebNavMenuContextValue = {
  isOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
}

const WebNavMenuContext = createContext<WebNavMenuContextValue | null>(null)

export function WebNavMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openMenu = useCallback(() => setIsOpen(true), [])
  const closeMenu = useCallback(() => setIsOpen(false), [])
  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), [])

  const value = useMemo(
    () => ({ isOpen, openMenu, closeMenu, toggleMenu }),
    [isOpen, openMenu, closeMenu, toggleMenu],
  )

  return <WebNavMenuContext.Provider value={value}>{children}</WebNavMenuContext.Provider>
}

export function useWebNavMenu() {
  const ctx = useContext(WebNavMenuContext)

  if (!ctx) throw new Error('useWebNavMenu must be used within WebNavMenuProvider')

  return ctx
}
