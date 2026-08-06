import * as XLSX from 'xlsx'

function formatFechaExcel(value: string | null | undefined) {
  if (!value) return ''

  try {
    return new Date(value).toLocaleString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return value
  }
}

function confirmacionLabel(value: string) {
  return value === 'ENVIADO' ? 'Enviado' : 'No enviado'
}

function joinModulos(titulos: string[]) {
  return titulos.length > 0 ? titulos.join(', ') : ''
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 40)
}

export type FilaExportCuota = {
  alumno: string
  dni: string
  correo: string
  numero_cuota: number
  monto_pago: number
  confirmacion: string
  fecha_envio: string
  observaciones: string | null
}

export function exportExcelTablaCuota(params: {
  cursoTitulo: string
  numeroCuota: number
  filas: FilaExportCuota[]
  modulosCuota: string[]
}) {
  const { cursoTitulo, numeroCuota, filas, modulosCuota } = params
  const modulosTexto = joinModulos(modulosCuota)

  const sheetDatos = XLSX.utils.json_to_sheet(
    filas.map((f, index) => ({
      Programa: cursoTitulo,
      'N° Cuota': f.numero_cuota,
      Alumno: f.alumno,
      DNI: f.dni,
      Correo: f.correo,
      'Monto pagó': f.monto_pago,
      Confirmación: confirmacionLabel(f.confirmacion),
      'Fecha envío': formatFechaExcel(f.fecha_envio),
      Observaciones: f.observaciones ?? '',
      ' ': '', // columna vacía de separación
      // Solo en la primera fila: identifica el módulo habilitado de la cuota (no se repite)
      'Módulos de la cuota': index === 0 ? modulosTexto : ''
    }))
  )

  const sheetModulos = XLSX.utils.json_to_sheet(
    modulosCuota.length > 0
      ? modulosCuota.map((titulo, index) => ({
          '#': index + 1,
          Módulo: titulo,
          'N° Cuota': numeroCuota,
          Programa: cursoTitulo
        }))
      : [{ '#': '', Módulo: 'Sin módulos configurados', 'N° Cuota': numeroCuota, Programa: cursoTitulo }]
  )

  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(wb, sheetDatos, 'Cuotas')
  XLSX.utils.book_append_sheet(wb, sheetModulos, 'Módulos')

  const fecha = new Date().toISOString().slice(0, 10)
  const nombre = `pagos_${slugify(cursoTitulo) || 'curso'}_cuota_${numeroCuota}_${fecha}.xlsx`

  XLSX.writeFile(wb, nombre)
}

export type FilaExportAlumno = {
  curso_titulo: string
  categoria_nombre: string
  subcategoria_nombre: string
  numero_cuota: number
  monto_pago: number
  confirmacion: string
  fecha_envio: string
  observaciones: string | null
  modulosCuota: string[]
}

export function exportExcelReporteAlumno(params: {
  alumno: string
  dni: string
  correo: string
  filas: FilaExportAlumno[]
}) {
  const { alumno, dni, correo, filas } = params

  const sheet = XLSX.utils.json_to_sheet(
    filas.map(f => ({
      Alumno: alumno,
      DNI: dni,
      Correo: correo,
      Programa: f.curso_titulo,
      Categoría: [f.categoria_nombre, f.subcategoria_nombre].filter(Boolean).join(' / '),
      'N° Cuota': f.numero_cuota,
      'Monto pagó': f.monto_pago,
      Confirmación: confirmacionLabel(f.confirmacion),
      'Fecha envío': formatFechaExcel(f.fecha_envio),
      Observaciones: f.observaciones ?? '',
      ' ': '', // columna vacía de separación
      'Módulos de la cuota': joinModulos(f.modulosCuota)
    }))
  )

  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(wb, sheet, 'Pagos alumno')

  const fecha = new Date().toISOString().slice(0, 10)
  const nombreBase = slugify(dni || alumno) || 'alumno'

  XLSX.writeFile(wb, `pagos_alumno_${nombreBase}_${fecha}.xlsx`)
}
