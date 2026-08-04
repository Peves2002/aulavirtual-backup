'use client'

import React, { useEffect, useRef } from 'react'

interface SafeHtmlProps {
  html: string
  className?: string
}

export default function SafeHtml({ html, className }: SafeHtmlProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create a shadow DOM or just parse the HTML
    const slotHtml = document.createRange().createContextualFragment(html)
    
    // Clear the container
    containerRef.current.innerHTML = ''
    
    // Append the evaluated HTML (which runs scripts if they are appended this way)
    containerRef.current.appendChild(slotHtml)
  }, [html])

  return <div ref={containerRef} className={className} />
}
