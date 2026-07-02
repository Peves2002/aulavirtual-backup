// La página de Capacitación redirige a la misma página de Programas del Aula Virtual
// ya que usa el mismo catálogo de cursos
import { redirect } from 'next/navigation'

export default function CapacitacionPage() {
  redirect('/programas')
}
