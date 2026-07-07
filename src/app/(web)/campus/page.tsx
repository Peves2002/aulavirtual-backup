import { redirect } from 'next/navigation'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import InstitutionalHero from '@/features/web/digital-azul/components/InstitutionalHero'
import { digitalAzulBrand } from '@/features/web/digital-azul/data/digitalAzulContent'

import CampusClient from './components/CampusClient'

export const metadata = {
  title: `Campus Digital Azul - ${digitalAzulBrand.name}`,
  description: 'Accede al ecosistema de aprendizaje: programas, cursos, evaluaciones, certificación y reportes.',
}

export default async function CampusPage() {
  const session = await getAuthSession()

  if (session?.user?.rol === 'ESTUDIANTE') {
    redirect('/estudiante/dashboard')
  }

  return (
    <>
      <InstitutionalHero
        badge="Campus Digital Azul"
        title={<>Tu espacio de <span style={{ color: 'var(--web-light, #38BDF8)' }}>aprendizaje</span></>}
        description="Accede a programas, cursos, evaluaciones, certificación y reportes en un entorno moderno e integrado."
      />
      <CampusClient />
    </>
  )
}
