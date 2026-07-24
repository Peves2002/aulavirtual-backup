import { HistorialPedidosUsuarioPage } from '@/features/admin/pedidos/pages/HistorialPedidosUsuarioPage'

export default function PedidosUsuarioPage({ params }: { params: { usuarioId: string } }) {
  return <HistorialPedidosUsuarioPage usuarioId={params.usuarioId} />
}
