'use client'

import React from 'react'

import Script from 'next/script'

interface IzipayScriptProps {
  onLoad?: () => void
}

export default function IzipayScript({ onLoad }: IzipayScriptProps) {
  return (
    <Script
      src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js"
      onLoad={onLoad}
    />
  )
}
