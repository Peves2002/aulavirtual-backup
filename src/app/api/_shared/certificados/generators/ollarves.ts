import { fetchImageBuffer, compressImageForPdf, formatDateLong, resolveLogoDimensions } from './utils'

import type { GeneratorFn } from './types'

const ASSETS = {
  logoSanLuis: '/images/certificado/logo-san-luis-gonzaga.png',
  logoPrincipal: '/images/certificado/logo-principal.png',
  logoSecundario: '/images/certificado/logo-secundario.png',
  logoSanLuisSecundario: '/images/certificado/logosanluisgonzagasecundario.png',
  marcaAgua: '/images/certificado/marca-de-agua.png',
  firma: '/images/certificado/firma.png',
  firmaRepresentanteLegal: '/images/certificado/firma-derecha.png',
} as const

/** Firmante fijo — representante legal Ollarves (pág. 1, firma derecha) */
const REPRESENTANTE_LEGAL = {
  nombre: 'Víctor Raúl Trelles Perez',
  apellido: '',
  cargo: 'Representante Legal',
} as const

/** Azul institucional Ollarves / UNMSM (fijo — no depende del color primario del tenant) */
const BLUE = { r: 26, g: 86, b: 163 }
const GRAY = { r: 100, g: 100, b: 100 }
const GRAY_FOOT = { r: 90, g: 90, b: 90 }
const INK = { r: 18, g: 18, b: 18 }

/** Simula bold reforzado (títulos principales) */
function drawHeavyText(
  doc: { text: (text: string | string[], x: number, y: number, options?: Record<string, unknown>) => void },
  text: string,
  x: number,
  y: number,
  opts?: { align?: 'left' | 'center' | 'right'; angle?: number; maxWidth?: number }
) {
  const layers: Array<[number, number]> = [
    [0, 0],
    [0.14, 0],
    [0, 0.1],
  ]

  for (const [ox, oy] of layers) {
    doc.text(text, x + ox, y + oy, opts)
  }
}

/** QR en tono azul sobre fondo blanco */
async function buildBlueQr(qrDataUrl: string): Promise<Buffer> {
  try {
    const { default: sharp } = await import('sharp')
    const raw = Buffer.from(qrDataUrl.split(',')[1], 'base64')

    return sharp(raw)
      .flatten({ background: '#ffffff' })
      .greyscale()
      .threshold(210)
      .negate()
      .tint({ r: BLUE.r, g: BLUE.g, b: BLUE.b })
      .png()
      .toBuffer()
  } catch {
    return Buffer.from(qrDataUrl.split(',')[1], 'base64')
  }
}

/** Elimina fondo oscuro de firmas escaneadas para el PDF blanco */
async function prepareSignatureForPdf(buffer: Buffer): Promise<Buffer> {
  try {
    const { default: sharp } = await import('sharp')

    return sharp(buffer).flatten({ background: '#ffffff' }).png().toBuffer()
  } catch {
    return buffer
  }
}

/** Duración en meses aproximada entre dos fechas */
function mesesEntre(inicio: Date | string | null | undefined, fin: Date | string | null | undefined): string {
  if (!inicio || !fin) return '---'
  const a = new Date(inicio)
  const b = new Date(fin)
  const meses = Math.max(1, Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24 * 30)))

  return `${meses} ${meses === 1 ? 'MES' : 'MESES'}`
}

/**
 * Plantilla OLLARVES — Certificado con respaldo UNMSM San Luis Gonzaga.
 * Página 1: certificado con barra lateral azul, logos institucionales y marca de agua.
 * Página 2: rendimiento académico, temario por módulos con notas e información del certificado.
 */
export const generarOllarves: GeneratorFn = async data => {
  const {
    logoBuffer,
    logoUrl,
    base64Logo,
    nombreInstitucion,
    slogan,
    disclaimer,
    institutionUrl,
    nombreCompleto,
    avatarBuffer,
    cursoTitulo,
    cursoDuracion,
    fechaEmisionVal,
    fechaInicioVal,
    fechaFinVal,
    vigenciaHastaVal,
    gerenteGeneral,
    profesorSnapshot,
    mostrarFirmaDocente,
    codigoVerificacion,
    qrDataUrl,
    modulos,
    notasPorModulo,
    notaInscripcion,
    previewFlag,
  } = data

  void previewFlag
  void avatarBuffer
  void disclaimer
  void institutionUrl
  void logoBuffer
  void logoUrl
  void base64Logo

  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  const [logoSanLuisBuf, logoPrincipalBuf, logoSecundarioBuf, logoSanLuisSecundarioBuf, marcaAguaBuf, firmaBuf, firmaRepLegalBuf] =
    await Promise.all([
      fetchImageBuffer(ASSETS.logoSanLuis),
      fetchImageBuffer(ASSETS.logoPrincipal),
      fetchImageBuffer(ASSETS.logoSecundario),
      fetchImageBuffer(ASSETS.logoSanLuisSecundario),
      fetchImageBuffer(ASSETS.marcaAgua),
      fetchImageBuffer(ASSETS.firma),
      fetchImageBuffer(ASSETS.firmaRepresentanteLegal),
    ])

  const firmaRepLegalPrepared = firmaRepLegalBuf ? await prepareSignatureForPdf(firmaRepLegalBuf) : null
  const defaultSigMax = 34 * 0.6

  const [logoSanLuisComp, logoPrincipalComp, logoSecundarioComp, logoSanLuisSecundarioComp, marcaAguaComp, firmaComp, firmaRepLegalComp, blueQrBuf] =
    await Promise.all([
      logoSanLuisBuf ? compressImageForPdf(logoSanLuisBuf, { maxWidth: 400, format: 'png' }) : null,
      logoPrincipalBuf ? compressImageForPdf(logoPrincipalBuf, { maxWidth: 300, format: 'png' }) : null,
      logoSecundarioBuf ? compressImageForPdf(logoSecundarioBuf, { maxWidth: 400, format: 'png' }) : null,
      logoSanLuisSecundarioBuf ? compressImageForPdf(logoSanLuisSecundarioBuf, { maxWidth: 500, format: 'png' }) : null,
      marcaAguaBuf ? compressImageForPdf(marcaAguaBuf, { maxWidth: 900, format: 'png' }) : null,
      firmaBuf ? compressImageForPdf(firmaBuf, { maxWidth: 400, format: 'png' }) : null,
      firmaRepLegalPrepared ? compressImageForPdf(firmaRepLegalPrepared, { maxWidth: 500, format: 'png' }) : null,
      buildBlueQr(qrDataUrl),
    ])

  const firmaRepLegalDims = firmaRepLegalPrepared
    ? await resolveLogoDimensions(firmaRepLegalPrepared, 48, defaultSigMax)
    : { w: defaultSigMax, h: defaultSigMax }

  const fechaFirmadaTxt = new Date(fechaEmisionVal).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

  const addImageSafe = (
    comp: { buffer: Buffer; jsPdfFormat: string } | null,
    x: number,
    y: number,
    w: number,
    h: number,
    alias?: string
  ) => {
    if (!comp) return

    try {
      doc.addImage(comp.buffer, comp.jsPdfFormat, x, y, w, h, alias)
    } catch {
      /* skip */
    }
  }

  const addSignatureBlock = (
    x: number,
    lineY: number,
    user: { nombre?: string; apellido?: string; cargo?: string | null; firma?: string | null } | null,
    signature?: {
      comp: { buffer: Buffer; jsPdfFormat: string } | null
      w: number
      h: number
      alias?: string
    }
  ) => {
    if (!user) return

    const sigComp = signature?.comp ?? firmaComp
    const sigW = signature?.w ?? defaultSigMax
    const sigH = signature?.h ?? defaultSigMax
    const sigAlias = signature?.alias ?? 'FIRMA'

    if (sigComp) {
      addImageSafe(sigComp, x - sigW / 2, lineY - sigH, sigW, sigH, sigAlias)
    }

    doc.setDrawColor(50, 50, 50)
    doc.setLineWidth(0.5)
    doc.line(x - 36, lineY, x + 36, lineY)

    const nombreFirmante = `${user.nombre || ''} ${user.apellido || ''}`.trim()

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(INK.r, INK.g, INK.b)
    doc.text(nombreFirmante, x, lineY + 7, { align: 'center' })

    if (user.cargo) {
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(GRAY.r, GRAY.g, GRAY.b)
      doc.text(user.cargo, x, lineY + 13, { align: 'center' })
    }
  }

  // ══════════════════════════════════════════════════════════════════════
  // PÁGINA 1
  // ══════════════════════════════════════════════════════════════════════
  const panelW = 72
  const contentW = pageWidth - panelW
  const cx = contentW / 2
  const margin = 16

  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  // Panel lateral — azul institucional sólido (referencia Ollarves)
  doc.setFillColor(BLUE.r, BLUE.g, BLUE.b)
  doc.rect(contentW, 0, panelW, pageHeight, 'F')

  // QR en barra lateral
  const qrSz = 30
  const qrX0 = contentW + (panelW - qrSz) / 2
  const qrY0 = pageHeight - qrSz - 24

  doc.setFillColor(255, 255, 255)
  doc.roundedRect(qrX0 - 3, qrY0 - 3, qrSz + 6, qrSz + 6, 2, 2, 'F')
  doc.addImage(blueQrBuf, 'PNG', qrX0, qrY0, qrSz, qrSz)
  doc.setFontSize(10)
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'normal')
  doc.text('Escanea para verificar', contentW + panelW / 2, pageHeight - 16, { align: 'center' })

  // Área blanca principal
  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, contentW, pageHeight, 'F')

  // Marca de agua centrada (imagen original sin efectos)
  if (marcaAguaComp && marcaAguaBuf) {
    const wmDims = await resolveLogoDimensions(marcaAguaBuf, contentW * 0.7, pageHeight * 0.7)
    const wmW = wmDims.w * 0.6
    const wmH = wmDims.h * 0.6
    const wmX = (contentW - wmW) / 2
    const wmY = (pageHeight - wmH) / 2

    addImageSafe(marcaAguaComp, wmX, wmY, wmW, wmH, 'WATERMARK')
  }

  // "CERTIFICADO" vertical en barra lateral (blanco extra-bold)
  doc.setFontSize(58)
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  drawHeavyText(doc, 'CERTIFICADO', contentW + panelW / 2 + 8, 148, { angle: 90 })

  // Logos superiores
  const headerY = 10

  if (logoSanLuisComp) {
    const slDims = await resolveLogoDimensions(logoSanLuisBuf, 50, 28)

    addImageSafe(logoSanLuisComp, margin, headerY, slDims.w, slDims.h, 'SLG')
  }

  if (logoPrincipalComp) {
    const prDims = await resolveLogoDimensions(logoPrincipalBuf, 30, 26)

    addImageSafe(logoPrincipalComp, contentW - margin - prDims.w, headerY, prDims.w, prDims.h, 'LOGO_PR')
  }

  let y = headerY + 30

  // Título y contenido — tipografía extra-bold como referencia
  doc.setFontSize(28)
  doc.setTextColor(BLUE.r, BLUE.g, BLUE.b)
  doc.setFont('helvetica', 'bold')
  drawHeavyText(doc, 'CERTIFICADO', cx, y, { align: 'center' })
  y += 12

  doc.setFontSize(12)
  doc.setTextColor(GRAY.r, GRAY.g, GRAY.b)
  doc.setFont('helvetica', 'normal')
  doc.text('Otorgado a:', cx, y, { align: 'center' })
  y += 10

  doc.setFontSize(22)
  doc.setTextColor(BLUE.r, BLUE.g, BLUE.b)
  doc.setFont('helvetica', 'bold')
  const nombreLines = doc.splitTextToSize(nombreCompleto.toUpperCase(), contentW - 34)

  drawHeavyText(doc, nombreLines, cx, y, { align: 'center' })
  y += nombreLines.length * 8 + 4

  doc.setFontSize(12)
  doc.setTextColor(GRAY.r, GRAY.g, GRAY.b)
  doc.setFont('helvetica', 'normal')
  doc.text('Por haber concluido y aprobado con éxito el curso de:', cx, y, { align: 'center' })
  y += 9

  doc.setFontSize(18)
  doc.setTextColor(INK.r, INK.g, INK.b)
  doc.setFont('helvetica', 'bold')
  const cursoLines = doc.splitTextToSize(cursoTitulo, contentW - 34)

  doc.text(cursoLines, cx, y, { align: 'center' })
  y += cursoLines.length * 7 + 5

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(GRAY.r, GRAY.g, GRAY.b)

  const duracionTxt = cursoDuracion?.match(/hora/i)
    ? (cursoDuracion || '---')
    : `${cursoDuracion || '---'} horas lectivas`

  const descripcionTxt = `Emitido por ${nombreInstitucion}, con el respaldo académico de la Universidad Nacional San Luis Gonzaga, con una duración de ${duracionTxt}, realizado desde el ${formatDateLong(fechaInicioVal)} hasta el ${formatDateLong(fechaFinVal)}.`
  const descripcionLines = doc.splitTextToSize(descripcionTxt, contentW - 40)

  doc.text(descripcionLines, cx, y, { align: 'center' })
  y += descripcionLines.length * 6 + 4

  const porcuantoLines = doc.splitTextToSize(
    'Por cuanto: Para que conste y sea reconocido, se otorga el presente certificado en calidad de:',
    contentW - 40
  )

  doc.text(porcuantoLines, cx, y, { align: 'center' })
  y += porcuantoLines.length * 6 + 5

  doc.setFontSize(14)
  doc.setTextColor(BLUE.r, BLUE.g, BLUE.b)
  doc.setFont('helvetica', 'bold')
  doc.text('APROBADO', cx, y, { align: 'center' })
  const aprobadoW = doc.getTextWidth('APROBADO')
  const aprobadoLineGap = 3
  const aprobadoLineLen = 9

  doc.setDrawColor(BLUE.r, BLUE.g, BLUE.b)
  doc.setLineWidth(0.25)
  doc.line(
    cx - aprobadoW / 2 - aprobadoLineGap - aprobadoLineLen,
    y - 1.5,
    cx - aprobadoW / 2 - aprobadoLineGap,
    y - 1.5
  )
  doc.line(
    cx + aprobadoW / 2 + aprobadoLineGap,
    y - 1.5,
    cx + aprobadoW / 2 + aprobadoLineGap + aprobadoLineLen,
    y - 1.5
  )
  y += 8

  doc.setFontSize(12)
  doc.setTextColor(GRAY.r, GRAY.g, GRAY.b)
  doc.setFont('helvetica', 'normal')
  doc.text(`Firmado, el ${fechaFirmadaTxt}.`, cx, y, { align: 'center' })
  y += 18

  const hasGerente = gerenteGeneral !== null
  const sigOffsetY = 26

  const representanteLegalSignature = {
    comp: firmaRepLegalComp,
    w: firmaRepLegalDims.w,
    h: firmaRepLegalDims.h,
    alias: 'FIRMA_REP_LEGAL',
  }

  if (mostrarFirmaDocente) {
    addSignatureBlock(cx - 54, y + sigOffsetY, profesorSnapshot)
    addSignatureBlock(cx + 54, y + sigOffsetY, REPRESENTANTE_LEGAL, representanteLegalSignature)
  } else if (hasGerente) {
    addSignatureBlock(cx, y + sigOffsetY, REPRESENTANTE_LEGAL, representanteLegalSignature)
  }

  doc.setFontSize(10)
  doc.setTextColor(GRAY_FOOT.r, GRAY_FOOT.g, GRAY_FOOT.b)
  doc.setFont('helvetica', 'normal')
  doc.text(`Código de Registro: ${codigoVerificacion}`, 16, pageHeight - 12)
  doc.text(`Fecha de Emisión: ${fechaFirmadaTxt}`, 16, pageHeight - 7)
  doc.text(
    `Vigencia de acceso: ${vigenciaHastaVal ? formatDateLong(vigenciaHastaVal) : 'sin caducidad'}`,
    contentW - 16,
    pageHeight - 7,
    { align: 'right' }
  )

  // ══════════════════════════════════════════════════════════════════════
  // PÁGINA 2 — Suplemento académico (referencia Grupo Ollarves)
  // ══════════════════════════════════════════════════════════════════════
  doc.addPage()

  const T = { sectionTitle: 9, label: 8, body: 8, small: 7, score: 22 }
  const p2Margin = 12
  const headerH = 18

  const lightBg = {
    r: Math.round(BLUE.r * 0.1 + 255 * 0.9),
    g: Math.round(BLUE.g * 0.1 + 255 * 0.9),
    b: Math.round(BLUE.b * 0.1 + 255 * 0.9),
  }

  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  // Banda superior a todo el ancho
  doc.setFillColor(BLUE.r, BLUE.g, BLUE.b)
  doc.rect(0, 0, pageWidth, headerH, 'F')

  if (logoSecundarioComp) {
    const dims = await resolveLogoDimensions(logoSecundarioBuf, 52, 14)

    addImageSafe(logoSecundarioComp, p2Margin, (headerH - dims.h) / 2, dims.w, dims.h, 'LOGO_P2')
  } else if (logoPrincipalComp) {
    const dims = await resolveLogoDimensions(logoPrincipalBuf, 52, 14)

    addImageSafe(logoPrincipalComp, p2Margin, (headerH - dims.h) / 2, dims.w, dims.h, 'LOGO_P2')
  } else {
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(255, 255, 255)
    doc.text(nombreInstitucion.toUpperCase(), p2Margin, 9)
    doc.setFontSize(T.body)
    doc.setFont('helvetica', 'normal')
    doc.text(slogan, p2Margin, 14)
  }

  doc.setFontSize(T.label)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text(`Código: ${codigoVerificacion}`, pageWidth - p2Margin, 8, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.text(`Fecha de emisión: ${fechaFirmadaTxt}`, pageWidth - p2Margin, 14, { align: 'right' })

  const zoneAY = headerH + 8
  const perfColW = 72
  const perfX = pageWidth - p2Margin - perfColW
  const textBlockW = perfX - p2Margin - 8

  // Bloque estudiante (sin avatar — como referencia)
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(25, 25, 25)
  doc.text(nombreCompleto, p2Margin, zoneAY + 6)
  doc.setFontSize(T.body)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(110, 110, 110)
  doc.text('Certificado de Finalización', p2Margin, zoneAY + 12)

  const cursoTituloP2Lines = doc.splitTextToSize(cursoTitulo, textBlockW)

  doc.setFont('helvetica', 'italic')
  doc.setTextColor(60, 60, 60)
  doc.text(cursoTituloP2Lines, p2Margin, zoneAY + 18)

  // Rendimiento académico (derecha)
  doc.setFillColor(BLUE.r, BLUE.g, BLUE.b)
  doc.roundedRect(perfX, zoneAY, perfColW, 8, 1, 1, 'F')
  doc.setFontSize(T.sectionTitle)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('RENDIMIENTO ACADÉMICO', perfX + perfColW / 2, zoneAY + 5.5, { align: 'center' })

  const promediosPorModulo = Object.values(notasPorModulo).map(e => {
    const raw = e.puntaje / e.count

    return raw > 20 ? raw / 5 : raw
  })

  const notaMax = 20

  const notaFinal =
    promediosPorModulo.length > 0
      ? promediosPorModulo.reduce((a, b) => a + b, 0) / promediosPorModulo.length
      : (() => {
          const raw = notaInscripcion ?? null

          return raw !== null ? (raw > 20 ? raw / 5 : raw) : null
        })()

  const notaDisplay = notaFinal !== null ? notaFinal.toFixed(2) : '---'

  doc.setFontSize(T.score)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(BLUE.r, BLUE.g, BLUE.b)
  doc.text(notaDisplay, perfX + perfColW / 2 - 4, zoneAY + 18, { align: 'center' })
  doc.setFontSize(T.small)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(150, 150, 150)
  doc.text(`/ ${notaMax}.00`, perfX + perfColW / 2 + 10, zoneAY + 18)
  doc.setFontSize(T.label)
  doc.setTextColor(120, 120, 120)
  doc.text('Promedio Ponderado Final', perfX + perfColW / 2, zoneAY + 24, { align: 'center' })

  const studentBlockH = Math.max(26, cursoTituloP2Lines.length * 4 + 18)
  const dividerY = zoneAY + studentBlockH + 2

  doc.setDrawColor(220, 220, 220)
  doc.setLineWidth(0.3)
  doc.line(p2Margin, dividerY, pageWidth - p2Margin, dividerY)

  const contenidoStartY = dividerY + 4
  const infoSectionH = 24
  const footerH = 34
  const infoFooterGap = 20
  const bottomLineMargin = 8
  const contentBottomLimit = pageHeight - footerH - infoSectionH - infoFooterGap - 4
  const contentColGap = 6
  const contentColW = (pageWidth - p2Margin * 2 - contentColGap) / 2
  const contentColLeft = p2Margin
  const contentColRight = p2Margin + contentColW + contentColGap

  doc.setFillColor(BLUE.r, BLUE.g, BLUE.b)
  doc.roundedRect(p2Margin, contenidoStartY, pageWidth - p2Margin * 2, 8, 1, 1, 'F')
  doc.setFontSize(T.sectionTitle)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('CONTENIDO DEL PROGRAMA', pageWidth / 2, contenidoStartY + 5.5, { align: 'center' })

  const contentStartY = contenidoStartY + 11
  const rowH = 7.5
  const rowGap = 1.5

  const getModuloNota = (moduloId: string): string => {
    const entry = notasPorModulo[moduloId]

    if (!entry) return notaDisplay !== '---' ? notaDisplay : '---'
    const raw = entry.puntaje / entry.count
    const val = raw > 20 ? raw / 5 : raw

    return val.toFixed(2)
  }

  const sortedModulos = [...modulos].sort((a, b) => a.orden - b.orden)
  const half = Math.ceil(sortedModulos.length / 2)
  const leftMods = sortedModulos.slice(0, half)
  const rightMods = sortedModulos.slice(half)

  const renderModuloRows = (list: typeof sortedModulos, startX: number, startY: number) => {
    let ry = startY

    for (const mod of list) {
      if (ry + rowH > contentBottomLimit) break

      const label = `${mod.orden + 1}. ${mod.titulo}`.toUpperCase()
      const labelLines = doc.splitTextToSize(label, contentColW - 22)
      const boxH = Math.max(rowH, labelLines.length * 3.5 + 3)

      if (ry + boxH > contentBottomLimit) break

      doc.setFillColor(lightBg.r, lightBg.g, lightBg.b)
      doc.roundedRect(startX, ry, contentColW, boxH, 2, 2, 'F')

      doc.setFontSize(T.body)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(BLUE.r, BLUE.g, BLUE.b)
      doc.text(labelLines, startX + 3, ry + 4.5)

      doc.setFont('helvetica', 'bold')
      doc.text(getModuloNota(mod.id), startX + contentColW - 3, ry + boxH / 2 + 1, { align: 'right' })

      ry += boxH + rowGap
    }
  }

  renderModuloRows(leftMods, contentColLeft, contentStartY)
  renderModuloRows(rightMods, contentColRight, contentStartY)

  // Información del certificado
  const infoY = pageHeight - footerH - infoSectionH - infoFooterGap

  doc.setFillColor(BLUE.r, BLUE.g, BLUE.b)
  doc.roundedRect(p2Margin, infoY, pageWidth - p2Margin * 2, 8, 1, 1, 'F')
  doc.setFontSize(T.sectionTitle)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('INFORMACIÓN DEL CERTIFICADO', pageWidth / 2, infoY + 5.5, { align: 'center' })

  const boxY = infoY + 10
  const boxW = (pageWidth - p2Margin * 2 - 8) / 3
  const boxH = 10
  const horasValue = cursoDuracion?.match(/hora/i) ? cursoDuracion : `${cursoDuracion || '---'} horas`

  const infoItems = [
    { label: 'TOTAL DE HORAS:', value: horasValue },
    { label: 'DURACIÓN:', value: mesesEntre(fechaInicioVal, fechaFinVal) },
    { label: 'TOTAL DE CRÉDITOS:', value: String(Math.max(sortedModulos.length * 3, sortedModulos.length)) },
  ]

  infoItems.forEach((item, i) => {
    const bx = p2Margin + i * (boxW + 4)

    doc.setFillColor(lightBg.r, lightBg.g, lightBg.b)
    doc.roundedRect(bx, boxY, boxW, boxH, 2, 2, 'F')
    doc.setFontSize(T.label)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(BLUE.r, BLUE.g, BLUE.b)
    doc.text(item.label, bx + 3, boxY + 4)
    doc.setFont('helvetica', 'bold')
    doc.text(item.value, bx + 3, boxY + 8.5)
  })

  // Pie: firma inferior izquierda + logo UNMSM derecha
  const separatorY = pageHeight - bottomLineMargin
  const footerSigY = separatorY - 16

  addSignatureBlock(p2Margin + 38, footerSigY, gerenteGeneral ?? profesorSnapshot)

  if (logoSanLuisSecundarioComp) {
    const slDims = await resolveLogoDimensions(logoSanLuisSecundarioBuf, 90, 16)

    addImageSafe(
      logoSanLuisSecundarioComp,
      pageWidth - p2Margin - slDims.w,
      footerSigY - 10,
      slDims.w,
      slDims.h,
      'SLG_P2'
    )
  } else if (logoSanLuisComp) {
    const slDims = await resolveLogoDimensions(logoSanLuisBuf, 52, 16)

    addImageSafe(
      logoSanLuisComp,
      pageWidth - p2Margin - slDims.w,
      footerSigY - 10,
      slDims.w,
      slDims.h,
      'SLG_P2'
    )
  }

  return doc.output('arraybuffer')
}
