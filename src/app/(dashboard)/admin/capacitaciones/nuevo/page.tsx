import { Metadata } from 'next'
import { CapacitacionCreate } from '@/features/admin/capacitaciones/pages/CapacitacionCreate'

export const metadata: Metadata = {
  title: 'Nueva Capacitación | Admin',
}

export default function Page() {
  return <CapacitacionCreate />
}
