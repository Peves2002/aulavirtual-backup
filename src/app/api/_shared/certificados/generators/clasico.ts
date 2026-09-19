import { fetchImageBuffer, compressImageForPdf, formatDateLong } from './utils'

import type { GeneratorFn } from './types'

/**
 * Plantilla CLÁSICA — Diseño original con panel lateral degradado y QR.
 * Página 1: Certificado principal.
 * Página 2: Rendimiento académico + Contenido del programa.
 */
export const generarClasico: GeneratorFn = async data => {
  const {
    pr,
    pg,
    pb,
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
    previewFlag
  } = data

  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  // ── Helpers ──────────────────────────────────────────────────────────
  const dpR = Math.round(pr * 0.52)
  const dpG = Math.round(pg * 0.52)
  const dpB = Math.round(pb * 0.52)

  const fechaFirmadaTxt = new Date(fechaEmisionVal).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  })

  const addSignatureBlock = async (x: number, lineY: number, user: any) => {
    if (!user) return

    if (user.firma) {
      try {
        const signatureBuffer = await fetchImageBuffer(user.firma)

        if (signatureBuffer) {
          const { buffer: compressed, jsPdfFormat } = await compressImageForPdf(signatureBuffer, { maxWidth: 300, format: 'png' })

          doc.addImage(compressed, jsPdfFormat, x - 17, lineY - 34, 34, 34)
        }
      } catch {
        /* skip */
      }
    }

    doc.setDrawColor(50, 50, 50)
    doc.setLineWidth(0.5)
    doc.line(x - 36, lineY, x + 36, lineY)
    const nombreFirmante = `${user.nombre || ''} ${user.apellido || ''}`.trim()

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(25, 25, 25)
    doc.text(nombreFirmante, x, lineY + 7, { align: 'center' })

    if (user.cargo) {
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(80, 80, 80)
      doc.text(user.cargo, x, lineY + 13, { align: 'center' })
    }
  }

  // ── PÁGINA 1 ─────────────────────────────────────────────────────────
  const panelW = 72
  const contentW = pageWidth
  const cx = pageWidth / 2

  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  let bgBufferData: { buffer: Buffer; jsPdfFormat: string } | null = null

  try {
    const bgBuffer = await fetchImageBuffer('/images/certificado.png')
    if (bgBuffer) {
      bgBufferData = await compressImageForPdf(bgBuffer, { maxWidth: 2400, format: 'jpeg', quality: 82 })
      doc.addImage(bgBufferData.buffer, bgBufferData.jsPdfFormat, 0, 0, pageWidth, pageHeight)
    }
  } catch (err) {
    // Fallback silencioso si no se encuentra la imagen
  }

  // QR
  const qrSz = 26
  const qrX0 = pageWidth - qrSz - 16
  const qrY0 = pageHeight - qrSz - 16

  doc.setFillColor(255, 255, 255)
  doc.roundedRect(qrX0 - 2, qrY0 - 2, qrSz + 4, qrSz + 4, 2, 2, 'F')
  doc.addImage(qrDataUrl, 'PNG', qrX0, qrY0, qrSz, qrSz)
  doc.setFontSize(9)
  doc.setTextColor(80, 80, 80)
  doc.setFont('helvetica', 'normal')
  doc.text('Verificar', qrX0 + qrSz / 2, qrY0 + qrSz + 4, { align: 'center' })

  let y = 46

  // Título, nombre, curso, descripción
  doc.setFontSize(20)
  doc.setTextColor(18, 18, 18)
  doc.setFont('helvetica', 'bold')
  doc.text('CERTIFICADO', cx, y, { align: 'center' })
  y += 11

  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'normal')
  doc.text('Otorgado a:', cx, y, { align: 'center' })
  y += 11

  doc.setFontSize(20)
  doc.setTextColor(pr, pg, pb)
  doc.setFont('helvetica', 'bold')
  doc.text(nombreCompleto.toUpperCase(), cx, y, { align: 'center' })
  y += 11

  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'normal')
  doc.text('Por haber concluido y aprobado con éxito el curso de:', cx, y, { align: 'center' })
  y += 10

  doc.setFontSize(20)
  doc.setTextColor(15, 15, 15)
  doc.setFont('helvetica', 'bold')
  const cursoLines = doc.splitTextToSize(cursoTitulo, contentW - 34)

  doc.text(cursoLines, cx, y, { align: 'center' })
  y += cursoLines.length * 7 + 6

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  const descripcionTxt = `Emitido por ${nombreInstitucion}, con una duración de ${cursoDuracion || '---'}, realizado desde el ${formatDateLong(fechaInicioVal)} hasta el ${formatDateLong(fechaFinVal)}.`
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
  doc.setTextColor(pr, pg, pb)
  doc.setFont('helvetica', 'bold')
  doc.text('APROBADO', cx, y, { align: 'center' })
  const aprobadoW = doc.getTextWidth('APROBADO')

  doc.setDrawColor(pr, pg, pb)
  doc.setLineWidth(0.4)
  doc.line(cx - aprobadoW / 2 - 10, y - 1.5, cx - aprobadoW / 2 - 2, y - 1.5)
  doc.line(cx + aprobadoW / 2 + 2, y - 1.5, cx + aprobadoW / 2 + 10, y - 1.5)
  y += 8

  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'normal')
  doc.text(`Firmado, el ${fechaFirmadaTxt}.`, cx, y, { align: 'center' })
  y += 12

  // Firmas
  const hasGerente = gerenteGeneral !== null

  if (hasGerente && mostrarFirmaDocente) {
    await addSignatureBlock(cx - 54, y + 20, gerenteGeneral)
    await addSignatureBlock(cx + 54, y + 20, profesorSnapshot)
  } else if (hasGerente) {
    await addSignatureBlock(cx, y + 20, gerenteGeneral)
  } else if (mostrarFirmaDocente) {
    await addSignatureBlock(cx, y + 20, profesorSnapshot)
  }

  // Footer página 1
  doc.setFontSize(10)
  doc.setTextColor(90, 90, 90)
  doc.setFont('helvetica', 'normal')
  doc.text(`Código de Registro: ${codigoVerificacion}`, 16, pageHeight - 12)
  doc.text(`Fecha de Emisión: ${fechaFirmadaTxt}`, 16, pageHeight - 7)
  doc.text(
    `Vigencia de acceso: ${vigenciaHastaVal ? formatDateLong(vigenciaHastaVal) : 'sin caducidad'}`,
    pageWidth - 80,
    pageHeight - 7,
    { align: 'right' }
  )

  void previewFlag

  // ── PÁGINA 2 ─────────────────────────────────────────────────────────
  doc.addPage()
  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  if (bgBufferData) {
    doc.addImage(bgBufferData.buffer, bgBufferData.jsPdfFormat, 0, 0, pageWidth, pageHeight)
  }

  const T = { sectionTitle: 9, label: 8, body: 8, small: 7, score: 22 }
  const margin = 12

  doc.setFontSize(T.label)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(80, 80, 80)
  doc.text(`Código: ${codigoVerificacion}`, pageWidth - margin, 9, { align: 'right' })
  doc.setFontSize(T.label)
  doc.setFont('helvetica', 'normal')
  doc.text(`Fecha de emisión: ${fechaFirmadaTxt}`, pageWidth - margin, 15, { align: 'right' })

  // Zona A: Avatar + datos graduado
  const zoneAY = 24
  const avatarSize = 22
  const avatarX = margin

  if (avatarBuffer) {
    try {
      const base64Avatar = `data:image/jpeg;base64,${avatarBuffer.toString('base64')}`

      doc.setFillColor(240, 240, 240)
      doc.circle(avatarX + avatarSize / 2, zoneAY + avatarSize / 2, avatarSize / 2, 'F')
      doc.addImage(base64Avatar, 'JPEG', avatarX, zoneAY, avatarSize, avatarSize)
    } catch {
      /* skip */
    }
  } else {
    doc.setFillColor(pr, pg, pb)
    doc.circle(avatarX + avatarSize / 2, zoneAY + avatarSize / 2, avatarSize / 2, 'F')
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(255, 255, 255)

    const initials = nombreCompleto
      .split(' ')
      .slice(0, 2)
      .map((w: string) => w[0])
      .join('')

    doc.text(initials, avatarX + avatarSize / 2, zoneAY + avatarSize / 2 + 2.5, { align: 'center' })
  }

  const textX = avatarX + avatarSize + 5

  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(25, 25, 25)
  doc.text(nombreCompleto, textX, zoneAY + 8)
  doc.setFontSize(T.body)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text('Certificado de Finalización', textX, zoneAY + 14)
  const cursoTituloP2Lines = doc.splitTextToSize(cursoTitulo, pageWidth - textX - margin - 80)

  doc.setFontSize(T.body)
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(60, 60, 60)
  doc.text(cursoTituloP2Lines, textX, zoneAY + 20)

  doc.setDrawColor(220, 220, 220)
  doc.setLineWidth(0.3)
  doc.line(margin, zoneAY + avatarSize + 5, pageWidth - margin, zoneAY + avatarSize + 5)

  // Zona B: columnas
  const colW = (pageWidth - margin * 2 - 6) / 2

  // Rendimiento académico — lado derecho a la altura del alumno
  const perfX = pageWidth - margin - colW
  const rendimientoYOffset = -6

  doc.setFillColor(pr, pg, pb)
  doc.roundedRect(perfX, zoneAY, colW, 8, 1, 1, 'F')
  doc.setFontSize(T.sectionTitle)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('RENDIMIENTO ACADÉMICO', perfX + colW / 2, zoneAY + 5.5, { align: 'center' })

  let yLeft = zoneAY + 13

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
  doc.setTextColor(pr, pg, pb)
  doc.text(notaDisplay, perfX + colW / 2, yLeft + 10 + rendimientoYOffset, { align: 'center' })
  doc.setFontSize(T.small)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(150, 150, 150)
  doc.text(`/ ${notaMax}.00`, perfX + colW / 2 + 8, yLeft + 10 + rendimientoYOffset)
  doc.setFontSize(T.label)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(120, 120, 120)
  doc.text('Promedio Ponderado Final', perfX + colW / 2, yLeft + 16 + rendimientoYOffset, { align: 'center' })
  yLeft += 10

  // ── Contenido del programa ────────────────────────────────────────────
  const contenidoStartY = yLeft + 6
  const contentColGap = 6
  const contentColW = (pageWidth - margin * 2 - contentColGap) / 2
  const contentColLeft = margin
  const contentColRight = margin + contentColW + contentColGap
  const contentBottomLimit = pageHeight - 22

  doc.setFillColor(pr, pg, pb)
  doc.roundedRect(margin, contenidoStartY, pageWidth - margin * 2, 8, 1, 1, 'F')
  doc.setFontSize(T.sectionTitle)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('CONTENIDO DEL PROGRAMA', pageWidth / 2, contenidoStartY + 5.5, { align: 'center' })

  const contentStartY = contenidoStartY + 13

  // ── Pre-calcular altura de cada módulo ────────────────────────────────
  const calcModuloHeight = (modulo: any): number => {
    const modTxt = `${modulo.orden + 1}. ${modulo.titulo}`.toUpperCase()
    const modLines = doc.splitTextToSize(modTxt, contentColW - 8)
    let h = modLines.length * 4.5 + 4 + 2

    for (const leccion of modulo.lecciones) {
      const lecTxt = `${modulo.orden + 1}.${leccion.orden + 1}  ${leccion.titulo}`
      const lecLines = doc.splitTextToSize(lecTxt, contentColW - 14)

      h += lecLines.length * 4 + 1.5
    }

    h += 3

    return h
  }

  // ── Distribuir módulos en dos columnas balanceadas por altura ─────────
  const totalH = modulos.reduce((sum: number, m: any) => sum + calcModuloHeight(m), 0)
  const leftTarget = totalH / 2
  let leftFilled = 0
  const leftModulos: any[] = []
  const rightModulos: any[] = []

  for (const modulo of modulos) {
    if (leftFilled < leftTarget || leftModulos.length === 0) {
      leftModulos.push(modulo)
      leftFilled += calcModuloHeight(modulo)
    } else {
      rightModulos.push(modulo)
    }
  }

  // ── Paginar: agrupar módulos por página (ambas columnas juntas) ───────
  const paginateColumns = (
    leftList: any[],
    rightList: any[]
  ): Array<{ left: any[]; right: any[] }> => {
    const pages: Array<{ left: any[]; right: any[] }> = []
    let li = 0
    let ri = 0
    let isFirst = true

    while (li < leftList.length || ri < rightList.length) {
      const avail = isFirst ? contentBottomLimit - contentStartY : contentBottomLimit - 14
      const page: { left: any[]; right: any[] } = { left: [], right: [] }
      let lh = 0
      let rh = 0

      while (li < leftList.length) {
        const h = calcModuloHeight(leftList[li])

        if (lh + h > avail && page.left.length > 0) break
        page.left.push(leftList[li++])
        lh += h
      }

      while (ri < rightList.length) {
        const h = calcModuloHeight(rightList[ri])

        if (rh + h > avail && page.right.length > 0) break
        page.right.push(rightList[ri++])
        rh += h
      }

      pages.push(page)
      isFirst = false
    }

    return pages
  }

  // ── Renderizar una columna en la página actual (sin addPage) ──────────
  const renderColumnSegment = (lista: any[], startX: number, startY: number): void => {
    let y = startY

    for (const modulo of lista) {
      const modTxt = `${modulo.orden + 1}. ${modulo.titulo}`.toUpperCase()
      const modLines = doc.splitTextToSize(modTxt, contentColW - 8)
      const modH = modLines.length * 4.5 + 4

      doc.setFillColor(
        Math.round(pr * 0.12 + 255 * 0.88),
        Math.round(pg * 0.12 + 255 * 0.88),
        Math.round(pb * 0.12 + 255 * 0.88)
      )
      doc.roundedRect(startX, y, contentColW, modH, 1, 1, 'F')
      doc.setFontSize(T.sectionTitle)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(pr, pg, pb)
      doc.text(modLines, startX + 4, y + 4.5)
      y += modH + 2

      for (const leccion of modulo.lecciones) {
        const lecTxt = `${modulo.orden + 1}.${leccion.orden + 1}  ${leccion.titulo}`
        const lecLines = doc.splitTextToSize(lecTxt, contentColW - 14)
        const lecH = lecLines.length * 4 + 1.5

        doc.setFillColor(pr, pg, pb)
        doc.circle(startX + 4, y + 1.5, 0.9, 'F')
        doc.setFontSize(T.body)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(60, 60, 60)
        doc.text(lecLines, startX + 7, y + 2.5)
        y += lecH
      }

      y += 3
    }
  }

  // ── Renderizar página por página con ambas columnas sincronizadas ─────
  const columnPages = paginateColumns(leftModulos, rightModulos)

  for (let pi = 0; pi < columnPages.length; pi++) {
    if (pi > 0) {
      doc.addPage()
      doc.setFillColor(255, 255, 255)
      doc.rect(0, 0, pageWidth, pageHeight, 'F')
      
      if (bgBufferData) {
        doc.addImage(bgBufferData.buffer, bgBufferData.jsPdfFormat, 0, 0, pageWidth, pageHeight)
      }

      doc.setFontSize(T.small)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(150, 150, 150)
      doc.text('CONTENIDO DEL PROGRAMA ACADÉMICO (continuación)', margin, 10)
    }

    const y0 = pi === 0 ? contentStartY : 18

    renderColumnSegment(columnPages[pi].left, contentColLeft, y0)
    renderColumnSegment(columnPages[pi].right, contentColRight, y0)
  }

  // ── Pie de página 2 ───────────────────────────────────────────────────
  const footerTopY = pageHeight - 16

  if (disclaimer) {
    const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - margin * 2 - 60)

    doc.setFontSize(T.small)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(120, 120, 120)
    doc.text(disclaimerLines, margin, footerTopY + 5)
  }

  if (institutionUrl) {
    doc.setFontSize(T.small)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(pr, pg, pb)
    doc.text(institutionUrl, pageWidth - margin, footerTopY + 5, { align: 'right' })
  }

  return doc.output('arraybuffer')
}
