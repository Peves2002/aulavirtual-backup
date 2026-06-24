import path from 'path'

/**
 * Directorio físico donde se guardan los archivos subidos por usuarios (imágenes de
 * cursos, firmas, comprobantes de pago, etc.). Vive FUERA del repositorio de git
 * (por defecto, una carpeta hermana a la del proyecto) para que operaciones de git
 * (checkout, clean, reset, restore) nunca puedan borrar contenido subido por usuarios,
 * ya que `public/uploads` está en .gitignore y no se versiona.
 *
 * En producción, configurar UPLOADS_DIR en el .env apuntando a un volumen persistente.
 */
export function getUploadsDir(): string {
  return process.env.UPLOADS_DIR || path.join(process.cwd(), '..', 'aulavirtual-uploads')
}

/** Resuelve la ruta absoluta de un archivo a partir de su URL pública /uploads/... */
export function resolveUploadPath(relativeUrl: string): string {
  const cleanPath = relativeUrl.replace(/^\/uploads\//, '').replace(/^\/+/, '')

  return path.join(getUploadsDir(), cleanPath)
}
