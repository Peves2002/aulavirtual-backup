import { mkdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'

import sharp from 'sharp'

const PUBLIC_DIR = join(process.cwd(), 'public')
const BRANDING_DIR = join(PUBLIC_DIR, 'uploads', 'branding')
const ICONS_DIR = join(PUBLIC_DIR, 'icons')
const FAVICON_PUBLIC_PATH = '/uploads/branding/site-favicon.png'

const PWA_ICONS: { file: string; size: number }[] = [
  { file: 'icon-192x192.png', size: 192 },
  { file: 'icon-512x512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
]

function resolvePublicPath(url: string): string {
  const clean = url.split('?')[0]
  const normalized = clean.startsWith('/') ? clean.slice(1) : clean

  return join(PUBLIC_DIR, normalized)
}

/**
 * Crea un buffer en formato ICO estándar conteniendo múltiples tamaños en formato PNG
 */
export async function createIcoBuffer(sourceBuffer: Buffer, sizes: number[] = [16, 32, 48]): Promise<Buffer> {
  const images: { size: number; data: Buffer }[] = []

  for (const size of sizes) {
    const pngBuf = await sharp(sourceBuffer)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png()
      .toBuffer()

    images.push({ size, data: pngBuf })
  }

  // Header: 6 bytes
  const header = Buffer.alloc(6)

  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // icon type (1 = icon)
  header.writeUInt16LE(images.length, 4) // count

  let offset = 6 + images.length * 16

  const entries: Buffer[] = []

  for (const img of images) {
    const entry = Buffer.alloc(16)

    entry.writeUInt8(img.size >= 256 ? 0 : img.size, 0) // width
    entry.writeUInt8(img.size >= 256 ? 0 : img.size, 1) // height
    entry.writeUInt8(0, 2) // color count
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // color planes
    entry.writeUInt16LE(32, 6) // bpp
    entry.writeUInt32LE(img.data.length, 8) // size
    entry.writeUInt32LE(offset, 12) // offset
    entries.push(entry)
    offset += img.data.length
  }

  return Buffer.concat([header, ...entries, ...images.map(img => img.data)])
}

/**
 * Genera el favicon de pestaña (32×32), el favicon.ico multi-resolución y los íconos de instalación PWA
 * (192, 512, apple-touch-icon) a partir de la imagen fuente.
 */
export async function syncFaviconFromUrl(sourceUrl: string): Promise<string> {
  if (!sourceUrl?.trim()) {
    throw new Error('URL de favicon inválida')
  }

  let sourceBuffer: Buffer

  if (sourceUrl.startsWith('http://') || sourceUrl.startsWith('https://')) {
    const response = await fetch(sourceUrl)

    if (!response.ok) {
      throw new Error(`Error al obtener favicon remoto: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()

    sourceBuffer = Buffer.from(arrayBuffer)
  } else {
    const sourcePath = resolvePublicPath(sourceUrl)

    sourceBuffer = await readFile(sourcePath)
  }

  await mkdir(BRANDING_DIR, { recursive: true })
  await mkdir(ICONS_DIR, { recursive: true })

  // 1. Generar site-favicon.png (32x32)
  const faviconBuffer = await sharp(sourceBuffer)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer()

  await writeFile(join(BRANDING_DIR, 'site-favicon.png'), faviconBuffer)

  // 2. Generar public/favicon.ico estándar
  try {
    const icoBuffer = await createIcoBuffer(sourceBuffer, [16, 32, 48])

    await writeFile(join(PUBLIC_DIR, 'favicon.ico'), icoBuffer)
  } catch (icoErr) {
    console.error('[FAVICON_ICO_GEN_ERROR]', icoErr)
  }

  // 3. Generar íconos PWA
  await Promise.all(
    PWA_ICONS.map(async ({ file, size }) => {
      const buffer = await sharp(sourceBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png()
        .toBuffer()

      await writeFile(join(ICONS_DIR, file), buffer)
    })
  )

  return FAVICON_PUBLIC_PATH
}

export function getDefaultFaviconPath(): string {
  return '/favicon.ico'
}

export function resolveFaviconUrl(configs: Record<string, string>): string {
  const custom = configs.SITE_FAVICON?.trim()

  if (custom) {
    return custom.startsWith('http') || custom.startsWith('/') ? custom : `/${custom}`
  }

  return '/favicon.ico'
}

