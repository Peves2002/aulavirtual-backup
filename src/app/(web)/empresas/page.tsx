import { redirect } from 'next/navigation'

/** Ruta legacy — redirige al menú Soluciones */
export default function EmpresasPage() {
  redirect('/cursos')
}
