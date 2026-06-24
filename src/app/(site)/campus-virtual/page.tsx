import CampusVirtual from '@/marketing/pages/CampusVirtual'
import { getCursosPublicos } from '@/marketing/lib/getCursosPublicos'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const cursos = await getCursosPublicos()

  return <CampusVirtual cursos={cursos} />
}
