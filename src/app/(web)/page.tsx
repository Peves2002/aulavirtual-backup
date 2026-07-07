import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'
import { digitalAzulBrand } from '@/features/web/digital-azul/data/digitalAzulContent'
import { homeHero } from '@/features/web/digital-azul/home/homeContent'
import { getFeaturedPrograms } from '@/features/web/digital-azul/home/getFeaturedPrograms'
import HomeHero from '@/features/web/digital-azul/home/components/HomeHero'
import HomeWhySection from '@/features/web/digital-azul/home/components/HomeWhySection'
import HomeSolucionesSection from '@/features/web/digital-azul/home/components/HomeSolucionesSection'
import HomeProgramasSection from '@/features/web/digital-azul/home/components/HomeProgramasSection'
import HomeCasosExitoSection from '@/features/web/digital-azul/home/components/HomeCasosExitoSection'
import HomeRecursosSection from '@/features/web/digital-azul/home/components/HomeRecursosSection'

export const metadata = {
  title: `${digitalAzulBrand.name} - ${digitalAzulBrand.slogan}`,
  description: digitalAzulBrand.description,
}

async function getHomeData() {
  try {
    const configs = await getConfigs()

    const heroTitle = configs.HOME_HERO_TITLE || homeHero.title
    const heroDescription = configs.HOME_HERO_DESCRIPTION || homeHero.subtitle
    const programs = await getFeaturedPrograms(prisma, configs.HOME_FEATURED_SLUGS)

    return {
      programs: JSON.parse(JSON.stringify(programs)),
      heroTitle,
      heroDescription,
    }
  } catch {
    const programs = await getFeaturedPrograms(prisma).catch(() => [])

    return {
      programs: JSON.parse(JSON.stringify(programs)),
      heroTitle: homeHero.title,
      heroDescription: homeHero.subtitle,
    }
  }
}

/** Página de inicio v1.0 — 7 bloques según brief Digital Azul */
export default async function HomePage() {
  const { programs, heroTitle, heroDescription } = await getHomeData()

  return (
    <>
      <HomeHero title={heroTitle} subtitle={heroDescription} />
      <HomeWhySection />
      <HomeSolucionesSection />
      <HomeProgramasSection programs={programs} />
      <HomeCasosExitoSection />
      <HomeRecursosSection />
    </>
  )
}
