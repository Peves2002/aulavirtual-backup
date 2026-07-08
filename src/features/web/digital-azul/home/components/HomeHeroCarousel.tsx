'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

type Props = {
  images: string[]
  intervalMs?: number
}

export default function HomeHeroCarousel({ images, intervalMs = 5500 }: Props) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const id = setInterval(() => {
      setActive(current => (current + 1) % images.length)
    }, intervalMs)

    return () => clearInterval(id)
  }, [images.length, intervalMs])

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {images.map((src, index) => (
        <div
          key={src}
          aria-hidden={index !== active}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === active ? 1 : 0,
            transition: 'opacity 1.4s ease-in-out',
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              transform: src.includes('/3.jpg') ? 'scaleX(-1)' : undefined,
            }}
          />
        </div>
      ))}

      {images.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 1,
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Ir a imagen ${index + 1}`}
              onClick={() => setActive(index)}
              style={{
                width: index === active ? 28 : 8,
                height: 8,
                borderRadius: 999,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                backgroundColor: index === active ? '#ffffff' : 'rgba(255,255,255,0.45)',
                transition: 'width 0.3s ease, background-color 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
