import Index from '@/marketing/pages/Index'
import { getCursosPublicos } from '@/marketing/lib/getCursosPublicos'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const cursos = await getCursosPublicos()

  return <Index cursos={cursos} />
}
