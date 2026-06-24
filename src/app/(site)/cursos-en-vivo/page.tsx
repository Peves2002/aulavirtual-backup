import CursosEnVivo from '@/marketing/pages/CursosEnVivo'
import { getCursosPorTipoEmision } from '@/marketing/lib/getCursosPublicos'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const courses = await getCursosPorTipoEmision('SINCRONO')

  return <CursosEnVivo courses={courses} />
}
