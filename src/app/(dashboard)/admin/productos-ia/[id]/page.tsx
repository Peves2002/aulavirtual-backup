import ProductoIAFormPage from '@/features/admin/productos-ia/pages/ProductoIAFormPage'

export default function Page({ params }: { params: { id: string } }) {
  return <ProductoIAFormPage mode="edit" productoId={params.id} />
}
