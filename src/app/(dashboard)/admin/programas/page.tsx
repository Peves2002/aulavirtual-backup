import { redirect } from 'next/navigation'

import type { Metadata } from 'next'

import { CursosPage } from '@/features/admin/cursos/pages/CursosPage'
import { getAuthSession } from '@/utils/libs/auth-helpers'
import { AxiosCurso } from '@/features/admin/cursos/http/axiosCurso'
import type { Curso } from '@/features/admin/cursos/entity/Curso'

export const metadata: Metadata = {
    title: 'Gestión de Programas',
    description: 'Administra los programas del aula virtual'
}

export default async function Page() {
    const session = await getAuthSession()

    if (!session) {
        redirect('/login')
    }

    const token = session.user?.accessToken ?? null

    const axiosCurso = new AxiosCurso({
        getAuthToken: () => token
    })

    let initialDataCursos: Curso[] = []

    try {
        const response = await axiosCurso.searchAll({ tipo: 'PROGRAMA' })

        initialDataCursos = response.cursos || []
    } catch (error) {
        console.error('Error fetching programas:', error)
    }

    return <CursosPage initialDataCursos={initialDataCursos} tipo="PROGRAMA" />
}
