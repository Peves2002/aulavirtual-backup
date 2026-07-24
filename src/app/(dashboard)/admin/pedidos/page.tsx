import { redirect } from 'next/navigation'

import { getAuthSession } from '@/utils/libs/auth-helpers'


import { PedidosPage } from '@/features/admin/pedidos/pages/PedidosPage'
import { AxiosPedido } from '@/features/admin/pedidos/http/axiosPedido'

export const metadata = {
  title: 'Gestión de Pedidos | Aula Virtual'
}

export default async function Page() {
  const session = await getAuthSession()

  if (!session) {
    redirect('/login')
  }

  const token = session.user?.accessToken ?? null

  const axiosPedido = new AxiosPedido({
    getAuthToken: () => token
  })

  let initialData: any[] = []
  let initialTotal = 0

  try {
    const result = await axiosPedido.getAgrupados({})

    initialData = result.agrupados ?? []
    initialTotal = result.paginacion?.total ?? 0
  } catch (error) {
    console.error('Error fetching pedidos:', error)
  }

  return <PedidosPage initialData={initialData} initialTotal={initialTotal} />
}
