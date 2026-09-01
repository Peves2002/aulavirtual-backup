import { homeHero } from '../homeContent'
import HomeHeroCarousel from './HomeHeroCarousel'

export default function HomeHero() {
  return (
    <section
      style={{
        position: 'relative',
        marginTop: 'calc(-1 * var(--navbar-height))',
        overflowX: 'hidden',
      }}
    >
      <HomeHeroCarousel banners={homeHero} />
    </section>
  )
}
