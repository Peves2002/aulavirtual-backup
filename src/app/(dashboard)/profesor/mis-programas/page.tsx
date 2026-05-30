import React from 'react'

import ProfesorCursosPage from '@/features/profesor/cursos/pages/ProfesorCursosPage'

export const metadata = {
    title: 'Mis Programas | Profesor',
    description: 'Gestiona tus programas y contenido'
}

export default function Page() {
    return <ProfesorCursosPage tipo="PROGRAMA" />
}
