import CursosCatalogo from '@/marketing/pages/CursosCatalogo'
import { getCursosPorTipoEmision } from '@/marketing/lib/getCursosPublicos'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const cursos = await getCursosPorTipoEmision('ASINCRONO')

  return <CursosCatalogo cursos={cursos} />
}
