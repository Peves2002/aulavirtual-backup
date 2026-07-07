import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight, GraduationCap } from 'lucide-react'

import { homeHero } from '../homeContent'
import { daColors, daFont, sectionWrap } from '../homeTheme'

type Props = {
  title?: string
  subtitle?: string
}

export default function HomeHero({ title, subtitle }: Props) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        marginTop: 'calc(-1 * var(--navbar-height))',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Fondo imagen */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src={homeHero.image}
          alt="Formación en aula"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center right' }}
        />
      </div>

      {/* Overlay azul izquierdo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(90deg, ${daColors.blue} 0%, ${daColors.blue} 42%, rgba(11,58,130,0.85) 58%, rgba(11,58,130,0.4) 75%, transparent 100%)`,
        }}
      />

      <div
        style={{
          ...sectionWrap,
          position: 'relative',
          zIndex: 2,
          width: '100%',
          paddingTop: 'calc(var(--navbar-height) + 2rem)',
          paddingBottom: '3rem',
          maxWidth: '1200px',
        }}
      >
        <div style={{ maxWidth: '520px' }}>
          <h1
            style={{
              fontFamily: daFont,
              fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
            }}
          >
            {title || homeHero.title}
          </h1>
          <p
            style={{
              fontFamily: daFont,
              fontSize: '1.0625rem',
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 1.65,
              marginBottom: '2rem',
            }}
          >
            {subtitle || homeHero.subtitle}
          </p>
          <Link
            href={homeHero.cta.href}
            className="no-underline inline-flex items-center gap-2.5 transition-opacity hover:opacity-90"
            style={{
              fontFamily: daFont,
              fontWeight: 700,
              fontSize: '0.9375rem',
              color: daColors.blue,
              backgroundColor: '#ffffff',
              padding: '0.875rem 1.5rem',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          >
            <GraduationCap size={20} />
            {homeHero.cta.label}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
