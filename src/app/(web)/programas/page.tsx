import ProgramCatalogLayout from '@/features/web/home/components/ProgramCatalogLayout'
import { getProgramCatalogData } from '@/features/web/cursos/getProgramCatalogData'
import { getAuthSession } from '@/utils/libs/auth-helpers'
import { getTipoProgramaConfig } from '@/utils/configs/tipoPrograma'
import AdphHeroForm from '@/features/web/adph/components/AdphHeroForm'

export default async function ProgramasPage() {
  const session = await getAuthSession()
  const token = session?.user?.accessToken ?? null
  const { courses, categories } = await getProgramCatalogData('CURSO', token)

  return (
    <>
      <AdphHeroForm
        title={<>Catálogo de <br /><span style={{ color: '#3BA8C5' }}>Programas</span></>}
        subtitle="Especializaciones y diplomados diseñados para potenciar tus competencias profesionales y resolver retos del entorno laboral."
        backgroundImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80"
        formTitle="SOLICITA INFORMACIÓN"
      />
      <ProgramCatalogLayout tipo="CURSO" courses={courses} categories={categories} hideHero={true} />
    </>
  )
}

export function generateMetadata() {
  const config = getTipoProgramaConfig('CURSO')

  return {
    title: config.catalogTitle,
    description: config.catalogDescription
  }
}
