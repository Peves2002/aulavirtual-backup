export const dynamic = 'force-dynamic'

import { join } from 'path'
import { writeFile, mkdir } from 'fs/promises'
import { randomUUID } from 'crypto'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { handleApiError } from '@/utils/libs/validation'
import { requireAuth } from '@/utils/libs/auth-helpers'

/** Tipos MIME permitidos y su extensión segura */
const ALLOWED_MIMES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'application/pdf': 'pdf',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/x-matroska': 'mkv',
  'video/mkv': 'mkv',

  // Audio
  'audio/webm': 'webm',
  'audio/ogg': 'ogg',
  'audio/mp4': 'mp4',
  'audio/mpeg': 'mp3',
  'audio/wav': 'wav',

  // Documentos de Office
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'application/vnd.oasis.opendocument.text': 'odt',
  'application/vnd.oasis.opendocument.spreadsheet': 'ods',
  'application/rtf': 'rtf',
  'text/rtf': 'rtf',

  // Archivos de texto / código / notebooks / datos
  'text/plain': 'txt',
  'text/x-python': 'py',
  'text/x-python-script': 'py',
  'application/xml': 'xml',
  'text/xml': 'xml',
  'application/x-ipynb+json': 'ipynb',
  'application/json': 'json',
  'text/csv': 'csv',
  'text/markdown': 'md',
  'application/sql': 'sql',
  'text/x-java-source': 'java',
  'text/x-csrc': 'c',
  'text/x-c++src': 'cpp',
  'text/x-csharp': 'cs',

  // Comprimidos
  'application/zip': 'zip',
  'application/x-zip-compressed': 'zip',
  'application/vnd.rar': 'rar',
  'application/x-rar-compressed': 'rar',
  'application/x-7z-compressed': '7z'
}

/** Tamaño máximo: 50 MB */
const MAX_FILE_SIZE = 50 * 1024 * 1024

/**
 * Verifica los magic bytes del archivo para confirmar que el tipo MIME
 * corresponde con el contenido real (no confiar solo en el header del cliente).
 */
function verifyMagicBytes(buffer: Buffer, mimeType: string): boolean {
  const signatures: Record<string, number[][]> = {
    'image/jpeg': [[0xff, 0xd8, 0xff]],
    'image/png': [[0x89, 0x50, 0x4e, 0x47]],
    'image/gif': [[0x47, 0x49, 0x46, 0x38]],
    'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF
    'application/pdf': [[0x25, 0x50, 0x44, 0x46]], // %PDF
    'video/mp4': [
      [0x00, 0x00, 0x00],
      [0x66, 0x74, 0x79, 0x70]
    ],
    'video/webm': [[0x1a, 0x45, 0xdf, 0xa3]],

    // Office antiguo (OLE2 / CFBF)
    'application/msword': [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]],
    'application/vnd.ms-excel': [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]],

    // Office moderno (OpenXML / ZIP based)
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [[0x50, 0x4b, 0x03, 0x04]], // PK..
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [[0x50, 0x4b, 0x03, 0x04]], // PK..
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': [[0x50, 0x4b, 0x03, 0x04]], // PK..
    'application/vnd.oasis.opendocument.text': [[0x50, 0x4b, 0x03, 0x04]], // PK..
    'application/vnd.oasis.opendocument.spreadsheet': [[0x50, 0x4b, 0x03, 0x04]], // PK..
    'application/vnd.ms-powerpoint': [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]],

    // Comprimidos
    'application/zip': [[0x50, 0x4b, 0x03, 0x04]],
    'application/x-zip-compressed': [[0x50, 0x4b, 0x03, 0x04]],
    'application/vnd.rar': [[0x52, 0x61, 0x72, 0x21, 0x1a, 0x07]], // Rar!
    'application/x-rar-compressed': [[0x52, 0x61, 0x72, 0x21, 0x1a, 0x07]],
    'application/x-7z-compressed': [[0x37, 0x7a, 0xbc, 0xaf, 0x27, 0x1c]]
  }

  // Archivos de texto plano (código, notebooks, xml, txt, csv, json, md, sql) tienen contenido
  // variable: no hay magic bytes fiables, se confía en la extensión + mimetype detectado
  const textLikeMimes = [
    'text/plain', 'text/x-python', 'text/x-python-script', 'application/xml', 'text/xml',
    'application/x-ipynb+json', 'application/json', 'text/csv', 'text/markdown', 'application/sql',
    'text/x-java-source', 'text/x-csrc', 'text/x-c++src', 'text/x-csharp',
    'application/rtf', 'text/rtf'
  ]

  if (textLikeMimes.includes(mimeType)) return true

  const mimeSignatures = signatures[mimeType]

  if (!mimeSignatures) return false
  if (mimeType.startsWith('video/')) return true // Los containers de video son complejos, confiamos en extensión+mime

  return mimeSignatures.some(sig => sig.every((byte, i) => buffer[i] === byte))
}

/**
 * GET /api/media
 * Listar todos los archivos subidos (requiere autenticación)
 */
export async function GET(request: Request) {
  try {
    // 🔐 SEGURIDAD: Requiere autenticación
    const auth = await requireAuth(request)

    if (!auth.authorized) return auth.error

    const media = await prisma.media.findMany({
      orderBy: { creado_en: 'desc' }
    })

    return ApiResponse.success(request, media)
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * POST /api/media
 * Subir un nuevo archivo (requiere autenticación + validación estricta de tipo)
 */
export async function POST(request: Request) {
  try {
    // 🔐 SEGURIDAD: Requiere autenticación
    const auth = await requireAuth(request)

    if (!auth.authorized) return auth.error

    // 🔐 SEGURIDAD: Verificar tamaño antes de leer el body completo
    const contentLength = parseInt(request.headers.get('content-length') || '0', 10)

    if (contentLength > MAX_FILE_SIZE) {
      return ApiResponse.error(
        request,
        `El archivo supera el tamaño máximo permitido (${MAX_FILE_SIZE / 1024 / 1024}MB)`,
        413
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return ApiResponse.error(request, 'No se proporcionó ningún archivo', 400)
    }

    // 🔐 SEGURIDAD: Verificar tamaño real del archivo
    if (file.size > MAX_FILE_SIZE) {
      return ApiResponse.error(
        request,
        `El archivo supera el tamaño máximo permitido (${MAX_FILE_SIZE / 1024 / 1024}MB)`,
        413
      )
    }

    // 🔐 SEGURIDAD: Validar MIME type contra lista blanca u obtener por extensión
    let safeExtension = ALLOWED_MIMES[file.type]
    let detectedMime = file.type

    if (!safeExtension && file.name) {
      const extension = file.name.split('.').pop()?.toLowerCase() || ''

      const extToMime: Record<string, { ext: string, mime: string }> = {
        'jpg': { ext: 'jpg', mime: 'image/jpeg' },
        'jpeg': { ext: 'jpg', mime: 'image/jpeg' },
        'png': { ext: 'png', mime: 'image/png' },
        'webp': { ext: 'webp', mime: 'image/webp' },
        'gif': { ext: 'gif', mime: 'image/gif' },
        'pdf': { ext: 'pdf', mime: 'application/pdf' },
        'mp4': { ext: 'mp4', mime: 'video/mp4' },
        'webm': { ext: 'webm', mime: 'video/webm' },
        'mkv': { ext: 'mkv', mime: 'video/x-matroska' },
        'doc': { ext: 'doc', mime: 'application/msword' },
        'docx': { ext: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
        'xls': { ext: 'xls', mime: 'application/vnd.ms-excel' },
        'xlsx': { ext: 'xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
        'mp3': { ext: 'mp3', mime: 'audio/mpeg' },
        'wav': { ext: 'wav', mime: 'audio/wav' },
        'ogg': { ext: 'ogg', mime: 'audio/ogg' },
        'oga': { ext: 'ogg', mime: 'audio/ogg' },
        'm4a': { ext: 'mp4', mime: 'audio/mp4' },
        'weba': { ext: 'webm', mime: 'audio/webm' },
        'txt': { ext: 'txt', mime: 'text/plain' },
        'py': { ext: 'py', mime: 'text/x-python' },
        'xml': { ext: 'xml', mime: 'application/xml' },
        'ipynb': { ext: 'ipynb', mime: 'application/x-ipynb+json' },
        'json': { ext: 'json', mime: 'application/json' },
        'csv': { ext: 'csv', mime: 'text/csv' },
        'md': { ext: 'md', mime: 'text/markdown' },
        'sql': { ext: 'sql', mime: 'application/sql' },
        'java': { ext: 'java', mime: 'text/x-java-source' },
        'c': { ext: 'c', mime: 'text/x-csrc' },
        'cpp': { ext: 'cpp', mime: 'text/x-c++src' },
        'cs': { ext: 'cs', mime: 'text/x-csharp' },
        'rtf': { ext: 'rtf', mime: 'application/rtf' },
        'ppt': { ext: 'ppt', mime: 'application/vnd.ms-powerpoint' },
        'pptx': { ext: 'pptx', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
        'odt': { ext: 'odt', mime: 'application/vnd.oasis.opendocument.text' },
        'ods': { ext: 'ods', mime: 'application/vnd.oasis.opendocument.spreadsheet' },
        'zip': { ext: 'zip', mime: 'application/zip' },
        'rar': { ext: 'rar', mime: 'application/vnd.rar' },
        '7z': { ext: '7z', mime: 'application/x-7z-compressed' }
      }

      const matched = extToMime[extension]

      if (matched) {
        safeExtension = matched.ext
        detectedMime = matched.mime
      }
    }

    if (!safeExtension) {
      return ApiResponse.error(
        request,
        `Tipo de archivo no permitido. Tipos aceptados: imágenes (jpg, png, webp, gif), PDF, Office/OpenDocument (doc, docx, xls, xlsx, ppt, pptx, odt, ods, rtf), video (mp4, webm, mkv), audio (mp3, wav, ogg, m4a), texto/código/datos (txt, py, xml, ipynb, json, csv, md, sql, java, c, cpp, cs) y comprimidos (zip, rar, 7z)`,
        400
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 🔐 SEGURIDAD: Verificar magic bytes (contenido real del archivo)
    // Los tipos de audio se omiten de la verificación de magic bytes (formatos variables)
    if (!detectedMime.startsWith('audio/') && !verifyMagicBytes(buffer, detectedMime)) {
      return ApiResponse.error(request, 'El contenido del archivo no coincide con su tipo declarado', 400)
    }

    const { searchParams } = new URL(request.url)
    const isSignature = searchParams.get('isSignature') === 'true'

    const id = randomUUID()
    const nombreArchivo = `${id}.${safeExtension}`
    const nombreOriginal = file.name.replace(/[^a-zA-Z0-9._-]/g, '_') // Sanitizar nombre original

    // Ruta relativa para la URL y ruta absoluta para guardar
    const folder = isSignature ? 'firmas' : detectedMime.startsWith('audio/') ? 'audios' : 'cursos'
    const relativePath = `/uploads/${folder}/${nombreArchivo}`
    const uploadDir = join(process.cwd(), 'public', 'uploads', folder)
    const absolutePath = join(uploadDir, nombreArchivo)

    try {
      // Asegurar que el directorio existe
      await mkdir(uploadDir, { recursive: true })

      // Escribir el archivo
      await writeFile(absolutePath, buffer)
    } catch (fsError: any) {
      console.error('❌ Error de sistema de archivos en subida:', {
        code: fsError.code,
        path: fsError.path,
        absolutePath: absolutePath
      })

      if (fsError.code === 'EACCES') {
        return ApiResponse.error(
          request,
          `Error de permisos en el servidor (EACCES). No se pudo crear/escribir en ${fsError.path}. Ejecute 'sudo chown -R $USER:$USER public/uploads' en su servidor para solucionar este problema.`,
          500
        )
      }

      throw fsError // Re-lanzar otros errores para ser capturados por el catch general
    }

    // Si es firma, no guardamos en la tabla Media para que no aparezca en la galería general
    if (isSignature) {
      return ApiResponse.success(request, { url: relativePath }, 201)
    }

    const tipo = detectedMime.startsWith('image/') ? 'IMAGEN' : detectedMime.startsWith('video/') ? 'VIDEO' : 'OTRO'

    const mediaResult = await prisma.media.create({
      data: {
        id,
        nombre: nombreOriginal,
        url: relativePath,
        tipo,
        mimetype: detectedMime,
        peso: file.size
      }
    })

    return ApiResponse.success(request, mediaResult, 201)
  } catch (error) {
    return handleApiError(error, request)
  }
}
