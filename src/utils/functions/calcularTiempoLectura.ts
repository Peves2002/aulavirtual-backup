import { stripHtml } from './stripHtml'

/** Calcula el tiempo estimado de lectura (en minutos, mínimo 1) a partir del cuerpo HTML de un artículo. */
export function calcularTiempoLectura(html: string, wpm = 200): number {
  const texto = stripHtml(html)
  const palabras = texto.length ? texto.split(' ').filter(Boolean).length : 0

  return Math.max(1, Math.ceil(palabras / wpm))
}
