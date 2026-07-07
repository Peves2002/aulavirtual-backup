import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { eyebrow, sectionDesc } from '@/features/web/home/components/typography'

type InstitutionalHeroProps = {
  badge?: string
  title: React.ReactNode
  description: string
  align?: 'center' | 'left'
}

export default function InstitutionalHero({
  badge,
  title,
  description,
  align = 'center',
}: InstitutionalHeroProps) {
  const centered = align === 'center'

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, var(--web-dark-deep, #0f172a) 0%, var(--web-dark, #1E40AF) 45%, var(--web-dark-mid, #1e3a8a) 100%)',
        padding: '6rem 1.5rem 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--web-primary-rgb, 37, 99, 235),0.22) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          textAlign: centered ? 'center' : 'left',
        }}
      >
        <ScrollReveal>
          {badge ? (
            <p
              style={{
                ...eyebrow,
                display: 'block',
                textAlign: centered ? 'center' : 'left',
                color: 'var(--web-light, #38BDF8)',
                marginBottom: '1rem',
              }}
            >
              {badge}
            </p>
          ) : null}
          <h1
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              letterSpacing: '-0.025em',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              ...sectionDesc,
              color: 'rgba(255,255,255,0.75)',
              textAlign: centered ? 'center' : 'left',
              maxWidth: centered ? '560px' : '640px',
              margin: centered ? '0 auto' : 0,
            }}
          >
            {description}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
