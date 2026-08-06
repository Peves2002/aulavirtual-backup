export type ConfirmacionCuota = 'NO_ENVIADO' | 'ENVIADO'

export type FiltroOpcion = {
  id: string
  nombre?: string
  titulo?: string
  slug: string
}

export type RegistroCuotaManual = {
  id: string
  curso_id: string
  inscripcion_id: string
  usuario_id: string
  numero_cuota: number
  monto_pago: number
  confirmacion: ConfirmacionCuota
  observaciones: string | null
  fecha_envio: string
  alumno: string
  dni: string
  correo: string
}

export type ModuloPago = {
  id: string
  titulo: string
  orden: number
}

export type TablaCuotaResumen = {
  numero_cuota: number
  totalAlumnos: number
  enviados: number
  montoTotal: number
}

export type PagosCursoData = {
  curso: { id: string; titulo: string; slug: string }
  modulos: ModuloPago[]
  registros: RegistroCuotaManual[]
  accesosPorInscripcion: Record<string, string[]>
  modulosPorCuota: Record<string, string[]>
  totalInscritos: number
  tieneTabla: boolean
  tablas: TablaCuotaResumen[]
  siguienteCuota: number
}

export type PagosFiltrosData = {
  categorias: FiltroOpcion[]
  subcategorias: FiltroOpcion[]
  programas: FiltroOpcion[]
}

export type CuotaReciente = {
  curso_id: string
  curso_titulo: string
  curso_slug: string
  numero_cuota: number
  totalAlumnos: number
  enviados: number
  montoTotal: number
  creado_en: string | null
  actualizado_en: string | null
  categoria_id: string
  categoria_nombre: string
  subcategoria_id: string
  subcategoria_nombre: string
}

export type AlumnoPagoResumen = {
  id: string
  nombre: string
  apellido: string
  alumno: string
  dni: string
  correo: string
  totalCuotas: number
  enviados: number
  montoTotal: number
}

export type RegistroCuotaAlumno = {
  id: string
  curso_id: string
  curso_titulo: string
  categoria_nombre: string
  subcategoria_nombre: string
  inscripcion_id: string
  usuario_id: string
  numero_cuota: number
  monto_pago: number
  confirmacion: ConfirmacionCuota
  observaciones: string | null
  fecha_envio: string
  creado_en: string
  actualizado_en: string
  modulos_cuota: string[]
  modulos_enviados: string[]
}

export type PagosPorAlumnoDetalle = {
  alumno: Omit<AlumnoPagoResumen, 'totalCuotas' | 'enviados' | 'montoTotal'>
  registros: RegistroCuotaAlumno[]
}

export type VistaPagosMode = 'categoria' | 'alumno'
