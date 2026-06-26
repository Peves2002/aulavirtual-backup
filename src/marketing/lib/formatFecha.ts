const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

export function formatFechaLarga(iso: string | null | undefined): string {
  if (!iso) return ''

  const d = new Date(iso)

  return `${d.getDate()} de ${MESES[d.getMonth()]} ${d.getFullYear()}`
}

export function formatHora(iso: string | null | undefined): string {
  if (!iso) return ''

  const d = new Date(iso)

  return d.toLocaleTimeString('es-PE', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase()
}
