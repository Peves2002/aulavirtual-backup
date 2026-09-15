'use client'

import { useSession } from 'next-auth/react'

import type { ChildrenType } from '@core/types'

export default function SessionGuard({ children }: ChildrenType) {
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => window.location.replace('/login')
  })

  if (status === 'loading') return null

  return <>{children}</>
}
