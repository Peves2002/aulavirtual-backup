/**
 * Resuelve el id de plantilla de certificado a usar.
 * Prioridad: override del curso > configuración global CERTIFICADO_PLANTILLA > 'clasico'.
 *
 * Única fuente de verdad para esta cadena de fallback: la usan tanto los
 * puntos de emisión (para congelar `plantilla_id` en el snapshot del
 * certificado) como el fallback legacy en getPdfBuffer.ts para certificados
 * emitidos antes de que existiera ese snapshot.
 */
export function resolverPlantillaId(
  cursoPlantilla: string | null | undefined,
  configs: Record<string, string>
): string {
  return cursoPlantilla || configs.CERTIFICADO_PLANTILLA || 'clasico'
}
