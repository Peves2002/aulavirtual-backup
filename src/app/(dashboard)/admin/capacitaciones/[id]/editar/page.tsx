import { Metadata } from 'next'
import { CapacitacionEdit } from '@/features/admin/capacitaciones/pages/CapacitacionEdit'

export const metadata: Metadata = {
  title: 'Editar Capacitación | Admin',
}

export default function Page() {
  return <CapacitacionEdit />
}
