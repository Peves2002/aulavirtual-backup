import { redirect } from 'next/navigation'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import PagosPage from '@/features/admin/pagos/pages/PagosPage'

export const metadata = {
  title: 'Pagos | Aula Virtual'
}

export default async function Page() {
  const session = await getAuthSession()

  if (!session) redirect('/login')

  if (session.user?.rol !== 'ADMIN') redirect('/admin/dashboard')

  return <PagosPage />
}
