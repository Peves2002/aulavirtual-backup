/** Tokens visuales — landing Digital Azul v1 */
export const daColors = {
  blue: 'var(--color-primary)',
  blueDark: 'var(--color-primary-dark)',
  blueLight: 'var(--color-primary-light)',
  teal: '#0D9488',
  purple: '#7C3AED',
  orange: '#EA580C',
  sky: '#0284C7',
  grayBg: 'var(--color-surface)',
  white: 'var(--color-background)',
  text: 'var(--color-text-primary)',
  textMuted: 'var(--color-text-secondary)',
} as const

export const daFont = 'var(--font-inter), sans-serif'

export const sectionWrap = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1.5rem',
} as const

/** Espaciado vertical amplio — principios de diseño v1.0 */
export const sectionPadding = '5rem 0'

/** Escala tipográfica Digital Azul — home y layout web */
export const daType = {
  sectionTitle: {
    fontFamily: daFont,
    fontWeight: 800,
    fontSize: 'clamp(1.375rem, 3.5vw, 1.875rem)',
    color: '#0F172A',
    letterSpacing: '0.02em',
    lineHeight: 1.2,
  },
  sectionSubtitle: {
    fontFamily: daFont,
    fontSize: '1.0625rem',
    color: '#64748B',
    lineHeight: 1.65,
  },
  cardTitle: {
    fontFamily: daFont,
    fontWeight: 700,
    fontSize: '1.0625rem',
    color: '#0F172A',
    lineHeight: 1.35,
  },
  cardBody: {
    fontFamily: daFont,
    fontSize: '0.9375rem',
    color: '#64748B',
    lineHeight: 1.65,
  },
  cardBodySm: {
    fontFamily: daFont,
    fontSize: '0.875rem',
    color: '#64748B',
    lineHeight: 1.55,
  },
  link: {
    fontFamily: daFont,
    fontSize: '0.9375rem',
    fontWeight: 700,
  },
  heroTitle: {
    fontFamily: daFont,
    fontSize: 'clamp(2rem, 4.5vw, 3rem)',
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
  },
  heroBody: {
    fontFamily: daFont,
    fontSize: '1.125rem',
    lineHeight: 1.65,
  },
  nav: {
    fontFamily: daFont,
    fontSize: '0.9375rem',
  },
  navSm: {
    fontFamily: daFont,
    fontSize: '0.875rem',
  },
} as const

export const daCardPadding = '1.5rem 1.75rem'
