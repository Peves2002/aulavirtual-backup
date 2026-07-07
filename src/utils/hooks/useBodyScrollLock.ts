'use client'

import { useLayoutEffect } from 'react'

let lockCount = 0
let savedScrollY = 0

function measureScrollbarWidth() {
  const diff = window.innerWidth - document.documentElement.clientWidth

  if (diff > 0) return diff

  if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
    return 0
  }

  const scrollDiv = document.createElement('div')

  scrollDiv.style.cssText = 'width:100px;height:100px;overflow:scroll;position:absolute;top:-9999px;'
  document.body.appendChild(scrollDiv)
  const width = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)

  return width
}

function lockScroll() {
  savedScrollY = window.scrollY
  const scrollbarWidth = measureScrollbarWidth()

  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
  document.documentElement.classList.add('scroll-locked')

  document.body.style.position = 'fixed'
  document.body.style.top = `-${savedScrollY}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.width = '100%'
  document.body.style.overflow = 'hidden'

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }
}

function unlockScroll() {
  document.documentElement.classList.remove('scroll-locked')
  document.documentElement.style.removeProperty('--scrollbar-width')

  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''

  window.scrollTo(0, savedScrollY)
}

/** Bloquea el scroll sin desplazar el layout al ocultar la barra de scroll. */
export function useBodyScrollLock(active: boolean) {
  useLayoutEffect(() => {
    if (!active) return

    lockCount += 1
    if (lockCount === 1) lockScroll()

    return () => {
      lockCount -= 1
      if (lockCount === 0) unlockScroll()
    }
  }, [active])
}
