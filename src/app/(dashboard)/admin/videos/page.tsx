import { redirect } from 'next/navigation'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import { VideosPage } from '@/features/admin/videos/pages/VideosPage'

export const metadata = {
  title: 'Gestión de Videos de YouTube | Aula Virtual',
}

export default async function Page() {
  const session = await getAuthSession()

  if (!session) redirect('/login')

  return <VideosPage />
}
