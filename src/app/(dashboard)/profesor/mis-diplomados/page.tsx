import React from 'react'

import ProfesorCursosPage from '@/features/profesor/cursos/pages/ProfesorCursosPage'

export const metadata = {
    title: 'Mis Diplomados | Profesor',
    description: 'Gestiona tus diplomados y contenido'
}

export default function Page() {
    return <ProfesorCursosPage tipo="DIPLOMADO" />
}
