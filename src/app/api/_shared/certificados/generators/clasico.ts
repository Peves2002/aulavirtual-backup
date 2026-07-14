import { fetchImageBuffer, compressImageForPdf, resolveSignatureDimensions } from './utils'

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
          const { w: sigW, h: sigH } = await resolveSignatureDimensions(signatureBuffer, 48, 30)

          doc.addImage(compressed, jsPdfFormat, x - sigW / 2, lineY - sigH, sigW, sigH)
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
    doc.setFont('times', 'bold')
    doc.setTextColor(25, 25, 25)
    doc.text(nombreFirmante, x, lineY + 7, { align: 'center' })

    doc.setFontSize(12)
    doc.setFont('times', 'normal')
    doc.setTextColor(80, 80, 80)

    const cargoText = user.cargo || 'Director General'

    doc.text(cargoText, x, lineY + 13, { align: 'center' })
    doc.text('ACE Consulting PERÚ', x, lineY + 19, { align: 'center' })
  }

  // ── PÁGINA 1 ─────────────────────────────────────────────────────────
  const cx = pageWidth / 2

  // Background
  const backgroundBuffer = await fetchImageBuffer('/images/certificados/border-ace.png')

  if (backgroundBuffer) {
    try {
      doc.addImage(backgroundBuffer, 'PNG', 0, 0, pageWidth, pageHeight)
    } catch {
      // Fallback
      doc.setFillColor(252, 249, 240)
      doc.rect(0, 0, pageWidth, pageHeight, 'F')
      doc.setDrawColor(30, 120, 70)
      doc.setLineWidth(2.5)
      doc.rect(8, 8, pageWidth - 16, pageHeight - 16)
    }
  } else {
    // Fallback
    doc.setFillColor(252, 249, 240)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')
    doc.setDrawColor(30, 120, 70)
    doc.setLineWidth(2.5)
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16)
  }

  // 1. CERTIFICADO de APROBACIÓN
  doc.setFontSize(26)
  doc.setFont('times', 'bold')
  doc.setTextColor(19, 48, 117)
  doc.text('CERTIFICADO de APROBACIÓN', cx, 36, { align: 'center' })

  // 2. ACE Consulting PERÚ (nombre de institución)
  doc.setFontSize(30)
  doc.setFont('times', 'bold')
  doc.setTextColor(20, 20, 20)
  doc.text('ACE Consulting PERÚ', cx, 52, { align: 'center' })

  // 3. Asesoría y Capacitación Empresarial (slogan)
  doc.setFontSize(16)
  doc.setFont('times', 'bold')
  doc.setTextColor(20, 20, 20)
  doc.text('Asesoría y Capacitación Empresarial', cx, 63, { align: 'center' })

  // 4. Otorga el presente a :
  doc.setFontSize(13)
  doc.setFont('times', 'italic')
  doc.setTextColor(80, 80, 80)
  doc.text('Otorga el presente a :', cx, 74, { align: 'center' })

  // 5. Estudiante
  doc.setFontSize(28)
  doc.setFont('times', 'bold')
  doc.setTextColor(20, 20, 20)
  doc.text(nombreCompleto, cx, 91, { align: 'center' })

  // Subrayado del estudiante
  doc.setDrawColor(60, 60, 60)
  doc.setLineWidth(0.4)
  doc.line(cx - 70, 96, cx + 70, 96)

  // 6. Por haber completado...
  doc.setFontSize(13)
  doc.setFont('times', 'italic')
  doc.setTextColor(80, 80, 80)
  doc.text('Por haber completado satisfactoriamente el módulo :', cx, 108, { align: 'center' })

  // 7. Título del Curso
  doc.setFontSize(22)
  doc.setFont('times', 'bold')
  doc.setTextColor(20, 20, 20)
  const cursoLines = doc.splitTextToSize(cursoTitulo.toUpperCase(), pageWidth - 60)

  doc.text(cursoLines, cx, 122, { align: 'center' })

  // Subrayado del título
  const lineY = 122 + (cursoLines.length * 7) + 2

  doc.line(cx - 75, lineY, cx + 75, lineY)

  // 8. Firma del Administrador (bottom-left)
  const sigY = 162
  const signee = gerenteGeneral || profesorSnapshot

  if (signee) {
    await addSignatureBlock(90, sigY, signee)
  }

  // 9. Fecha (bottom-right)
  doc.setFontSize(12)
  doc.setFont('times', 'normal')
  doc.setTextColor(20, 20, 20)
  doc.text(`Lima, ${fechaFirmadaTxt}`, pageWidth - 72, sigY + 6, { align: 'right' })

  // 10. Código de registro y vigencia discretos en la parte inferior externa
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(120, 120, 120)
  // doc.text(`Reg: ${codigoVerificacion}`, 18, pageHeight - 10)

  // 11. QR de verificación (debajo del encabezado, lado derecho)
  const qrSz = 28
  const qrX = pageWidth - qrSz - 40
  const qrY = 54

  doc.setFillColor(255, 255, 255)
  doc.roundedRect(qrX - 2, qrY - 2, qrSz + 4, qrSz + 4, 1, 1, 'F')
  doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSz, qrSz)

  void previewFlag
  void cursoDuracion
  void fechaInicioVal
  void fechaFinVal
  void vigenciaHastaVal
  void mostrarFirmaDocente
  void nombreInstitucion
  void slogan

  // ── PÁGINA 2 ─────────────────────────────────────────────────────────
  doc.addPage()

  if (backgroundBuffer) {
    try {
      doc.addImage(backgroundBuffer, 'PNG', 0, 0, pageWidth, pageHeight)
    } catch {
      doc.setFillColor(255, 255, 255)
      doc.rect(0, 0, pageWidth, pageHeight, 'F')
    }
  } else {
    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')
  }

  const T = { sectionTitle: 9, label: 8, body: 8, small: 7, score: 22 }
  const margin = 32

  const maxLogoHP2 = 11
  const maxLogoWP2 = 40
  let logoP2W = maxLogoHP2
  let logoP2H = maxLogoHP2

  if (logoBuffer) {
    try {
      const { default: sharp } = await import('sharp')
      const meta = await sharp(logoBuffer).metadata()

      if (meta.width && meta.height) {
        const ratio = meta.width / meta.height

        logoP2H = maxLogoHP2
        logoP2W = Math.min(logoP2H * ratio, maxLogoWP2)
        if (logoP2W === maxLogoWP2) logoP2H = maxLogoWP2 / ratio

        if (logoP2H > maxLogoHP2) {
          logoP2H = maxLogoHP2
          logoP2W = logoP2H * ratio
        }
      }
    } catch {
      /* default */
    }
  }

  if (base64Logo) {
    try {
      const ext = logoUrl.split('.').pop()?.split('?')[0]?.toUpperCase() ?? 'PNG'

      doc.addImage(base64Logo, ext, margin, 28, logoP2W, logoP2H, 'LOGO')
    } catch {
      /* skip */
    }
  }


  doc.setFontSize(T.label)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(pr, pg, pb)
  doc.text(`Código: ${codigoVerificacion}`, pageWidth - margin, 30, { align: 'right' })
  doc.setFontSize(T.label)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 80, 80)
  doc.text(`Fecha de emisión: ${fechaFirmadaTxt}`, pageWidth - margin, 35, { align: 'right' })

  // Zona A: Avatar + datos graduado
  const zoneAY = 46
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
  const contentBottomLimit = pageHeight - 36

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

      if (backgroundBuffer) {
        try {
          doc.addImage(backgroundBuffer, 'PNG', 0, 0, pageWidth, pageHeight)
        } catch {
          doc.setFillColor(255, 255, 255)
          doc.rect(0, 0, pageWidth, pageHeight, 'F')
        }
      } else {
        doc.setFillColor(255, 255, 255)
        doc.rect(0, 0, pageWidth, pageHeight, 'F')
      }

      doc.setFontSize(T.small)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(pr, pg, pb)
      doc.text('CONTENIDO DEL PROGRAMA ACADÉMICO (continuación)', margin, 30)
    }

    const y0 = pi === 0 ? contentStartY : 40

    renderColumnSegment(columnPages[pi].left, contentColLeft, y0)
    renderColumnSegment(columnPages[pi].right, contentColRight, y0)
  }

  // ── Pie de página 2 ───────────────────────────────────────────────────
  const footerTopY = pageHeight - 32

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
