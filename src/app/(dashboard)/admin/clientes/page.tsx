import { redirect } from 'next/navigation'

import type { Metadata } from 'next'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import { ClientesPage } from '@/features/admin/clientes/pages/ClientesPage'

export const metadata: Metadata = {
    title: 'Gestión de Clientes',
    description: 'Directorio visual de empresas clientes de la plataforma'
}

export default async function Page() {
    const session = await getAuthSession()

    if (!session) redirect('/login')

    return <ClientesPage />
}
