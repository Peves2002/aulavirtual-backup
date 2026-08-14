import { stripHtml } from './stripHtml'

/** Genera un extracto en texto plano (para tarjetas de listado) a partir del cuerpo HTML de un artículo. */
export function generarExtracto(html: string, maxLength = 160): string {
  const texto = stripHtml(html)

  if (texto.length <= maxLength) return texto

  const cortado = texto.slice(0, maxLength)
  const ultimoEspacio = cortado.lastIndexOf(' ')

  return `${cortado.slice(0, ultimoEspacio > 0 ? ultimoEspacio : maxLength)}...`
}
