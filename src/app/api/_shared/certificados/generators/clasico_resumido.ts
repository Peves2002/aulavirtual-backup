import type { GeneratorFn } from './types'
import { fetchImageBuffer } from './utils'

/**
 * Plantilla CLÁSICA RESUMIDA — Igual que Clásico, pero en la página 2
 * solo muestra los módulos y lecciones en dos columnas, sin notas,
 * para ahorrar espacio.
 */
export const generarClasicoResumido: GeneratorFn = async data => {
  const {
    pr,
    pg,
    pb,
    logoBuffer,
    logoUrl,
    base64Logo,
    nombreInstitucion,
    slogan,
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
    previewFlag
  } = data

  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
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
          const sigExt = user.firma.split('.').pop()?.split('?')[0]?.toLowerCase() ?? 'png'

          doc.addImage(signatureBuffer, sigExt.toUpperCase(), x - 17, lineY - 34, 34, 34)
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
  doc.text(`Reg: ${codigoVerificacion}`, 18, pageHeight - 10)

  void previewFlag
  void avatarBuffer
  void cursoDuracion
  void fechaInicioVal
  void fechaFinVal
  void vigenciaHastaVal
  void qrDataUrl
  void mostrarFirmaDocente
  void nombreInstitucion
  void slogan

  // ── PÁGINA 2 ─────────────────────────────────────────────────────────
  doc.addPage()
  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  const T = { label: 8, body: 9, small: 7 }
  const margin = 16

  // Dibujar un marco ligero alrededor de la página (como en la referencia)
  doc.setDrawColor(pr, pg, pb)
  doc.setLineWidth(0.8)
  doc.roundedRect(8, 8, pageWidth - 16, pageHeight - 16, 5, 5)

  // Banda superior — esquinas redondeadas que siguen el marco (r=5, kappa=0.5523)
  const bk = 0.5523
  const br = 5

  const bx = 8,
    by = 8

  const bRight = pageWidth - 8
  const bandBottom = 24

  doc.setFillColor(pr, pg, pb)
  doc.path([
    { op: 'm', c: [bx, by + br] },
    { op: 'c', c: [bx, by + br - br * bk, bx + br - br * bk, by, bx + br, by] },
    { op: 'l', c: [bRight - br, by] },
    { op: 'c', c: [bRight - br + br * bk, by, bRight, by + br - br * bk, bRight, by + br] },
    { op: 'l', c: [bRight, bandBottom] },
    { op: 'l', c: [bx, bandBottom] },
    { op: 'h', c: [] }
  ])
  doc.fill()

  const bandH = 15.6 // 24 - 8.4
  const maxLogoHP2 = bandH - 4
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

      doc.addImage(base64Logo, ext, margin, 8.4 + (bandH - logoP2H) / 2, logoP2W, logoP2H)
    } catch {
      /* skip */
    }
  }


  doc.setFontSize(T.label)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text(`Código: ${codigoVerificacion}`, pageWidth - margin, 13, { align: 'right' })
  doc.setFontSize(T.label)
  doc.setFont('helvetica', 'normal')
  doc.text(`Fecha de emisión: ${fechaFirmadaTxt}`, pageWidth - margin, 19, { align: 'right' })

  // Contenido de módulos y lecciones a dos columnas
  let currentY = 32
  const colGap = 12
  const colW = (pageWidth - margin * 2 - colGap) / 2
  const col1X = margin
  const col2X = margin + colW + colGap
  const limitY = pageHeight - 20

  let currentColumn = 1

  const addLine = (text: string, isModule: boolean) => {
    doc.setFontSize(T.body)
    doc.setFont('helvetica', isModule ? 'bold' : 'normal')
    doc.setTextColor(30, 30, 30)

    const lines = doc.splitTextToSize(text, colW)
    const lineHeight = isModule ? 5 : 4.5
    const requiredSpace = lines.length * lineHeight + (isModule ? 3 : 1)

    if (currentY + requiredSpace > limitY) {
      if (currentColumn === 1) {
        currentColumn = 2
        currentY = 32
      } else {
        // Nueva página si ambas columnas se llenaron (manteniendo el formato)
        doc.addPage()
        doc.setFillColor(255, 255, 255)
        doc.rect(0, 0, pageWidth, pageHeight, 'F')
        doc.setDrawColor(pr, pg, pb)
        doc.setLineWidth(0.8)
        doc.roundedRect(8, 8, pageWidth - 16, pageHeight - 16, 5, 5)

        // Header simplificado en página extra — esquinas redondeadas
        doc.setFillColor(pr, pg, pb)
        doc.path([
          { op: 'm', c: [8, 8 + 5] },
          { op: 'c', c: [8, 8 + 5 - 5 * 0.5523, 8 + 5 - 5 * 0.5523, 8, 8 + 5, 8] },
          { op: 'l', c: [pageWidth - 13, 8] },
          { op: 'c', c: [pageWidth - 13 + 5 * 0.5523, 8, pageWidth - 8, 8 + 5 - 5 * 0.5523, pageWidth - 8, 8 + 5] },
          { op: 'l', c: [pageWidth - 8, 18] },
          { op: 'l', c: [8, 18] },
          { op: 'h', c: [] }
        ])
        doc.fill()
        doc.setFontSize(T.label)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(255, 255, 255)
        doc.text('CONTENIDO DEL PROGRAMA ACADÉMICO (continuación)', margin, 14.5)

        currentColumn = 1
        currentY = 26
      }
    }

    const x = currentColumn === 1 ? col1X : col2X

    if (isModule) currentY += 2 // Extra gap before module
    doc.text(lines, x, currentY)
    currentY += lines.length * lineHeight
  }

  for (const modulo of modulos) {
    const tituloMod = `${modulo.orden + 1}. ${modulo.titulo}`.toUpperCase()

    addLine(tituloMod, true)

    for (const leccion of modulo.lecciones) {
      addLine(`${modulo.orden + 1}.${leccion.orden + 1} ${leccion.titulo}`, false)
    }
  }

  return doc.output('arraybuffer')
}
