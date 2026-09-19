import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const CapacitacionesList = dynamic(
  () => import('@/features/admin/capacitaciones/pages/CapacitacionesList').then(mod => mod.CapacitacionesList),
  { ssr: false }
)

export const metadata: Metadata = {
  title: 'Capacitaciones | Admin',
}

export default function Page() {
  return <CapacitacionesList />
}
