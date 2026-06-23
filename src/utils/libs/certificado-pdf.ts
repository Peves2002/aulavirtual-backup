import { readFile } from 'fs/promises'
import { join } from 'path'

import * as QRCode from 'qrcode'
import sharp from 'sharp'

/** Convierte un color hex (#RRGGBB) a rgb [r, g, b] */
function hexToRgb(hex: string): [number, number, number] {
  try {
    const clean = hex.replace('#', '')
    const r = parseInt(clean.substring(0, 2), 16)
    const g = parseInt(clean.substring(2, 4), 16)
    const b = parseInt(clean.substring(4, 6), 16)

    return [isNaN(r) ? 30 : r, isNaN(g) ? 120 : g, isNaN(b) ? 70 : b]
  } catch {
    return [30, 120, 70]
  }
}

// Las imágenes (logos/firmas/marco) suelen subirse a resolución completa de cámara/escáner.
// jsPDF NO reutiliza la compresión propia del PNG: lo decodifica y lo vuelve a comprimir de forma
// mucho menos eficiente (un PNG de 500KB puede generar un PDF de varios MB). Por eso se reescalan
// y se aplanan a JPEG (sin transparencia, ya que todas se colocan sobre fondo blanco): ahí jsPDF sí
// reutiliza el stream JPEG casi 1:1, reduciendo el peso final del PDF entre 10x y 30x.
const MAX_IMAGE_DIMENSION = 600
const JPEG_QUALITY = 85

// El logo institucional es el elemento de marca más visible del certificado: a diferencia del
// resto de imágenes, se mantiene en PNG sin pérdida (sin pasar por JPEG) para que el texto y los
// bordes finos se vean nítidos tanto en la vista previa como en el PDF descargado.
const LOGO_MAX_DIMENSION = 2000

async function readImageBytes(url: string): Promise<Buffer | null> {
  try {
    if (url.startsWith('/')) {
      const cleanUrl = url.replace(/\/+/g, '/')
      const filePath = join(process.cwd(), 'public', cleanUrl)

      return await readFile(filePath)
    }

    const response = await fetch(url)

    if (!response.ok) return null

    return Buffer.from(await response.arrayBuffer())
  } catch {
    return null
  }
}

async function downscaleImage(buffer: Buffer, maxDimension: number): Promise<Buffer> {
  try {
    return await sharp(buffer)
      .resize({ width: maxDimension, height: maxDimension, fit: 'inside', withoutEnlargement: true })
      .flatten({ background: '#ffffff' })
      .jpeg({ quality: JPEG_QUALITY })
      .toBuffer()
  } catch {
    return buffer
  }
}

/** Intenta cargar una imagen (local o remota), la reescala y devuelve Buffer JPEG aplanado sobre blanco */
async function fetchImageBuffer(url: string | null, maxDimension: number = MAX_IMAGE_DIMENSION): Promise<Buffer | null> {
  if (!url) return null

  const raw = await readImageBytes(url)

  if (!raw) return null

  return await downscaleImage(raw, maxDimension)
}

/** Carga el logo sin recompresión con pérdida: PNG, aplanado sobre blanco, solo se reescala si excede LOGO_MAX_DIMENSION */
async function fetchLogoBuffer(url: string | null): Promise<Buffer | null> {
  if (!url) return null

  const raw = await readImageBytes(url)

  if (!raw) return null

  try {
    return await sharp(raw)
      .resize({ width: LOGO_MAX_DIMENSION, height: LOGO_MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
      .flatten({ background: '#ffffff' })
      .png({ compressionLevel: 9 })
      .toBuffer()
  } catch {
    return raw
  }
}

const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return '---'

  return new Date(date).toLocaleDateString('es-PE', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

interface BuildCertificadoPdfParams {
  certificado: any
  inscripcion: { completado_en: Date | null; inscrito_en: Date } | null
  configs: Record<string, string>
  appUrl: string
  preview?: boolean
}

/**
 * Genera el PDF de un certificado (una sola página, diseño principal).
 * Compartido entre la descarga de estudiante y la de administrador.
 */
export async function buildCertificadoPdf({ certificado, inscripcion, configs, appUrl }: BuildCertificadoPdfParams): Promise<ArrayBuffer> {
  // Branding (Priorizar llaves específicas de certificado). El azul es independiente del color
  // primario genérico del sitio (PRIMARY_COLOR_MAIN): debe coincidir con el azul del logo-arm.png.
  const colorPrimario = configs.CERTIFICADO_COLOR_PRIMARIO || '#1111FF'

  // El logo del certificado es independiente del logo general del sitio (TEMPLATE_LOGO):
  // un cambio de logo en la web no debe alterar un documento ya formalizado como el certificado.
  const logoUrl = configs.CERTIFICADO_LOGO_URL || '/images/logo-arm.png'
  const sealUrl = configs.CERTIFICADO_SELLO_URL || '/images/certificado.png'
  const borderUrl = configs.CERTIFICADO_BORDE_URL || '/images/borde.jpeg'
  const nombreInstitucion = configs.CERTIFICADO_INSTITUTION_NAME || 'ARM'
  const slogan = configs.CERTIFICADO_SLOGAN || 'Asset Reliability Management'
  const divisionLabel = configs.CERTIFICADO_DIVISION_LABEL || `${nombreInstitucion.toUpperCase()} INTERNATIONAL CERTIFICATION DIVISION`

  const [pr, pg, pb] = hexToRgb(colorPrimario)
  const goldColor: [number, number, number] = [184, 134, 11]

  const verifyUrl = `${appUrl}/verificar-certificado/${encodeURIComponent(certificado.codigo_verificacion)}`

  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    width: 160,
    margin: 1,
    color: { dark: '#000000', light: '#ffffff' }
  })

  const logoBuffer = logoUrl ? await fetchLogoBuffer(logoUrl) : null
  const logoMeta = logoBuffer ? await sharp(logoBuffer).metadata() : null
  const sealBuffer = sealUrl ? await fetchImageBuffer(sealUrl) : null

  // El marco cubre la página completa, así que necesita más resolución que un logo/sello pequeño.
  const borderBuffer = borderUrl ? await fetchImageBuffer(borderUrl, 2200) : null

  // Gerente General
  const gerenteGeneralId = configs.CERTIFICADO_GERENTE_GENERAL_ID
  const prisma = (await import('./prisma')).default

  const gerenteGeneral = gerenteGeneralId
    ? await prisma.usuario.findUnique({
        where: { id: gerenteGeneralId },
        select: { nombre: true, apellido: true, cargo: true, firma: true }
      })
    : null

  const { jsPDF } = await import('jspdf')

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  // ── DISEÑO PRINCIPAL (única página) ──
  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  // Marco: imagen de borde ornamentado a página completa; si no está disponible, se usa un marco doble dorado simple.
  if (borderBuffer) {
    try {
      const base64Border = `data:image/jpeg;base64,${borderBuffer.toString('base64')}`

      doc.addImage(base64Border, 'JPEG', 0, 0, pageWidth, pageHeight)
    } catch (err) { console.error('Border Error:', err) }
  } else {
    doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2])
    doc.setLineWidth(0.6)
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16)
    doc.setLineWidth(0.2)
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24)
  }

  // Logo (centrado, arriba) + sello: el sello se centra verticalmente junto al bloque
  // logo + "slogan" + división, no solo junto al logo.
  const logoY = 18
  const logoWidth = 90

  // Ratio calculado a partir de la imagen real (evita deformarla si el logo cambia de dimensiones).
  const logoHeight = logoMeta?.width && logoMeta?.height
    ? logoWidth * (logoMeta.height / logoMeta.width)
    : logoWidth * (624 / 1655)

  const headerBlockHeight = logoHeight + 22 // +22: alto aproximado de las 2 líneas de texto debajo del logo (que ahora tienen mayor tamaño)
  let headerBottomY = logoY + logoHeight

  if (sealBuffer) {
    try {
      const base64Seal = `data:image/jpeg;base64,${sealBuffer.toString('base64')}`
      const sealSize = 46
      const sealY = logoY + (headerBlockHeight - sealSize) / 2

      doc.addImage(base64Seal, 'JPEG', pageWidth - 18 - sealSize, sealY, sealSize, sealSize)
    } catch (err) { console.error('Seal Error:', err) }
  }

  // Si el logo no carga, se usa el nombre de la institución como respaldo.
  if (logoBuffer) {
    try {
      const base64Logo = `data:image/png;base64,${logoBuffer.toString('base64')}`
      const logoX = (pageWidth - logoWidth) / 2

      doc.addImage(base64Logo, 'PNG', logoX, logoY, logoWidth, logoHeight)
      headerBottomY = logoY + logoHeight
    } catch (err) { console.error('Logo Error:', err) }
  } else {
    doc.setFontSize(20)
    doc.setTextColor(pr, pg, pb)
    doc.setFont('helvetica', 'bold')
    doc.text(nombreInstitucion.toUpperCase(), pageWidth / 2, 28, { align: 'center' })
    headerBottomY = 30
  }

  doc.setFontSize(22)
  doc.setTextColor(pr, pg, pb)
  doc.setFont('helvetica', 'bold')
  doc.text(slogan, pageWidth / 2, headerBottomY + 9, { align: 'center' })

  doc.setFontSize(13)
  doc.setTextColor(pr, pg, pb)
  doc.setFont('helvetica', 'bold')
  doc.text(divisionLabel.toUpperCase(), pageWidth / 2, headerBottomY + 17, { align: 'center' })

  const bodyStartY = headerBottomY + 19

  doc.setFontSize(13)
  doc.setTextColor(60, 60, 60)
  doc.setFont('helvetica', 'normal')
  doc.text('Se otorga el presente certificado a:', pageWidth / 2, bodyStartY + 6, { align: 'center' })

  const snapshot = certificado.datos as any

  const nombreCompleto = snapshot?.usuario
    ? `${snapshot.usuario.nombre} ${snapshot.usuario.apellido}`
    : `${certificado.usuario.nombre} ${certificado.usuario.apellido}`

  const cursoTitulo = snapshot?.curso?.titulo || certificado.curso.titulo
  const cursoNivel = snapshot?.curso?.nivel || certificado.curso.nivel
  const cursoModalidad = snapshot?.curso?.tipo_emision || certificado.curso.tipo_emision
  const cursoDuracion = snapshot?.curso?.duracion || certificado.curso.duracion

  doc.setFontSize(26)
  doc.setTextColor(20, 20, 20)
  doc.setFont('helvetica', 'bold')
  doc.text(`Ing. ${nombreCompleto}`, pageWidth / 2, bodyStartY + 18, { align: 'center' })

  doc.setFontSize(13)
  doc.setTextColor(60, 60, 60)
  doc.setFont('helvetica', 'normal')
  doc.text('Por haber desarrollado satisfactoriamente el programa de especialización:', pageWidth / 2, bodyStartY + 28, { align: 'center' })

  doc.setFontSize(16)
  doc.setTextColor(40, 40, 40)
  doc.setFont('helvetica', 'bold')
  const cursoTituloLines1 = doc.splitTextToSize(cursoTitulo.toUpperCase(), pageWidth - 80)

  doc.text(cursoTituloLines1, pageWidth / 2, bodyStartY + 37, { align: 'center' })

  const modalidad = cursoModalidad === 'ASINCRONO' ? 'VIRTUAL ASÍNCRONO' : 'PRESENCIAL/VIRTUAL'
  const tituloBlockHeight = cursoTituloLines1.length * 6

  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'bold')
  doc.text(`NIVEL: ${cursoNivel}    •    MODALIDAD: ${modalidad}`, pageWidth / 2, bodyStartY + 45 + tituloBlockHeight, { align: 'center' })

  const boxWidth = 220
  const boxX = (pageWidth - boxWidth) / 2
  const boxY = bodyStartY + 52 + tituloBlockHeight
  const boxHeight = 16

  doc.setFillColor(252, 251, 243)
  doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 2, 2, 'F')
  doc.setDrawColor(230, 220, 180)
  doc.setLineWidth(0.2)
  doc.rect(boxX, boxY, boxWidth, boxHeight)

  const colWidth = boxWidth / 4

  const snapshotFechas = snapshot?.fechas

  const fechaInicioVal = snapshotFechas?.inicio_curso || (certificado.curso.tipo_emision === 'SINCRONO'
    ? certificado.curso.fecha_inicio
    : (inscripcion?.inscrito_en || certificado.emitido_en))

  const fechaFinVal = snapshotFechas?.culminacion || (inscripcion?.completado_en || certificado.emitido_en)
  const fechaEmisionVal = snapshotFechas?.emision || certificado.emitido_en

  const fechaInicioStr = formatDate(fechaInicioVal)
  const fechaFinStr = formatDate(fechaFinVal)
  const fechaEmisionStr = formatDate(fechaEmisionVal)

  const renderColumn = (idx: number, label: string, value: string) => {
    const cx = boxX + (colWidth * idx) + (colWidth / 2)

    doc.setFontSize(8)
    doc.setTextColor(goldColor[0], goldColor[1], goldColor[2])
    doc.setFont('helvetica', 'bold')
    doc.text(label.toUpperCase(), cx, boxY + 5.5, { align: 'center' })
    doc.setFontSize(10)
    doc.setTextColor(60, 60, 60)
    doc.setFont('helvetica', 'bold')
    doc.text(value, cx, boxY + 12.5, { align: 'center' })

    if (idx < 3) {
      doc.setDrawColor(230, 220, 180)
      doc.line(boxX + colWidth * (idx + 1), boxY + 3, boxX + colWidth * (idx + 1), boxY + boxHeight - 3)
    }
  }

  renderColumn(0, 'Inicio del curso', fechaInicioStr)
  renderColumn(1, 'Culminación', fechaFinStr)
  renderColumn(2, 'Horas Lectivas', cursoDuracion || '---')
  renderColumn(3, 'Fecha de Emisión', fechaEmisionStr)

  // ── FOOTER: QR + código (izquierda) y firmas (derecha) ──
  const footerLineY = pageHeight - 30
  const qrSize = 24
  const qrX = 30
  const qrY = footerLineY - qrSize - 4

  doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2])
  doc.setLineWidth(0.3)
  doc.rect(qrX - 1, qrY - 1, qrSize + 2, qrSize + 2)
  doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize)

  doc.setFontSize(9)
  doc.setTextColor(20, 20, 20)
  doc.setFont('helvetica', 'bold')
  doc.text(certificado.codigo_verificacion, qrX + qrSize / 2, qrY + qrSize + 6, { align: 'center' })
  doc.setFontSize(6)
  doc.setTextColor(130, 130, 130)
  doc.setFont('helvetica', 'normal')
  doc.text('ESCANEA PARA VERIFICAR', qrX + qrSize / 2, qrY + qrSize + 10, { align: 'center' })

  // La imagen de la firma viene del usuario vinculado (firma), pero el texto mostrado
  // (cargo/nombre/credenciales) se recibe aparte: así el texto del certificado puede
  // mantenerse fijo aunque la cuenta vinculada tenga otro nombre registrado en el sistema.
  const addSignatureBlock = async (x: number, y: number, firma: string | null | undefined, nombreCompleto: string, cargo: string, credenciales?: string) => {
    if (!nombreCompleto) return
    doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2])
    doc.setLineWidth(0.4)
    doc.line(x - 24, y, x + 24, y)

    if (firma) {
      try {
        const signatureBuffer = await fetchImageBuffer(firma)

        if (signatureBuffer) {
          doc.addImage(signatureBuffer, 'JPEG', x - 18, y - 18, 36, 15)
        }
      } catch { /* skip */ }
    }

    // Orden: cargo/rol (arriba) → nombre con prefijo "Ing." → credenciales (abajo, si se proporcionan)
    doc.setFontSize(7.5)
    doc.setTextColor(120, 120, 120)
    doc.setFont('helvetica', 'normal')
    doc.text(cargo, x, y + 4, { align: 'center' })

    doc.setFontSize(8.5)
    doc.setTextColor(20, 20, 20)
    doc.setFont('helvetica', 'bold')
    doc.text(`Ing. ${nombreCompleto}`, x, y + 8.5, { align: 'center' })

    if (credenciales) {
      doc.setFontSize(7)
      doc.setTextColor(120, 120, 120)
      doc.setFont('helvetica', 'normal')
      doc.text(credenciales, x, y + 12.5, { align: 'center' })
    }
  }

  // Solo se muestra la firma del Gerente General (única firma, como en la referencia).
  // Su nombre/cargo/credenciales son configurables y no dependen del nombre registrado
  // en la cuenta vinculada (esa cuenta solo aporta la imagen de la firma).
  const signatureCenterX = pageWidth / 2

  const gerenteNombreDisplay = configs.CERTIFICADO_GERENTE_GENERAL_NOMBRE || 'Edison Prospero Muñante Mendoza'
  const gerenteCargoDisplay = configs.CERTIFICADO_GERENTE_GENERAL_CARGO || 'Reliability Engineering Manager'
  const gerenteCredencialesDisplay = configs.CERTIFICADO_GERENTE_GENERAL_CREDENCIALES || 'CIP N°: 181526 – CMRP ID: 243036'

  await addSignatureBlock(
    signatureCenterX,
    footerLineY,
    gerenteGeneral?.firma,
    gerenteNombreDisplay,
    gerenteCargoDisplay,
    gerenteCredencialesDisplay
  )

  return doc.output('arraybuffer')
}
