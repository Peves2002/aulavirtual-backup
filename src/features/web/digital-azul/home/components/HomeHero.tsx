import Link from 'next/link'

import { ArrowRight, GraduationCap } from 'lucide-react'

import { homeHero } from '../homeContent'
import { daColors, daType, sectionWrap } from '../homeTheme'
import HomeHeroCarousel from './HomeHeroCarousel'

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
      <HomeHeroCarousel images={homeHero.images} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(90deg, rgba(11,58,130,0.72) 0%, rgba(11,58,130,0.58) 42%, rgba(11,58,130,0.38) 58%, rgba(11,58,130,0.18) 75%, transparent 100%)`,
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
        <div style={{ maxWidth: '560px' }}>
          <h1
            style={{
              ...daType.heroTitle,
              color: '#ffffff',
              marginBottom: '1.375rem',
            }}
          >
            {title || homeHero.title}
          </h1>
          <p
            style={{
              ...daType.heroBody,
              color: 'rgba(255,255,255,0.92)',
              marginBottom: '2.25rem',
            }}
          >
            {subtitle || homeHero.subtitle}
          </p>
          <Link
            href={homeHero.cta.href}
            className="no-underline inline-flex items-center gap-2.5 transition-opacity hover:opacity-90"
            style={{
              ...daType.link,
              fontSize: '1rem',
              color: daColors.blue,
              backgroundColor: '#ffffff',
              padding: '1rem 1.625rem',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          >
            <GraduationCap size={22} />
            {homeHero.cta.label}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
