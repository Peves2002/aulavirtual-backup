export type EstadoSuscripcion = 'ACTIVA' | 'CANCELADA' | 'VENCIDA' | 'PENDIENTE' | 'EN_PRUEBA'
export type EstadoPagoSuscripcion = 'PENDIENTE' | 'COMPLETADO' | 'FALLIDO' | 'REEMBOLSADO'

export interface PagoSuscripcionAdmin {
  id: string
  monto: number
  moneda: string
  estado: EstadoPagoSuscripcion
  culqi_cargo_id: string | null
  periodo_inicio: string | null
  periodo_fin: string | null
  intentos: number
  creado_en: string
}

export interface SuscripcionAdmin {
  id: string
  estado: EstadoSuscripcion
  culqi_suscripcion_id: string | null
  fecha_inicio: string | null
  fecha_proximo_cobro: string | null
  fecha_cancelacion: string | null
  cancelado_por_usuario: boolean
  creado_en: string
  usuario: { id: string; nombre: string; apellido: string; correo: string }
  plan: { id: string; nombre: string; precio: number; moneda: string; intervalo: string }
  _count: { pagos: number }
}
