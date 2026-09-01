export interface DashboardKpis {
  totalInscritos: number
  cursosEnProgreso: number
  cursosCompletados: number
  totalCertificados: number

  /** Promedio de avance en programas activos (0–100) */
  avanceGeneral: number

  /** Programas con progreso < 100% */
  programasActivos: number
}

export interface DashboardCurso {
  id: string
  titulo: string
  slug: string
  miniatura?: string
  profesor: {
    nombre: string
    apellido: string
  }
  categoria?: string
  progreso: number

  /** Sin iniciar | En progreso | Completado */
  estado: 'sin_iniciar' | 'en_progreso' | 'completado'
}

export interface DashboardProgramaRecomendado {
  id: string
  titulo: string
  slug: string
  miniatura?: string
  categoria?: string
}

export interface DashboardRecursoNovedad {
  id: string
  titulo: string
  tipo: 'articulo' | 'guia' | 'plantilla' | 'noticia'
  href: string
}

export interface DashboardCertificado {
  id: string
  codigo_verificacion: string
  emitido_en: string
  curso: {
    id: string
    titulo: string
    slug: string
    miniatura: string | null
    nivel: string | null
    profesor: {
      nombre: string
      apellido: string
    }
  }
}

export interface DashboardData {
  kpis: DashboardKpis

  /** Todos los programas inscritos activos (< 100%) */
  misProgramas: DashboardCurso[]
  cursosRecientes: DashboardCurso[]
  certificadosRecientes: DashboardCertificado[]
  programasRecomendados: DashboardProgramaRecomendado[]
  recursosNovedades: DashboardRecursoNovedad[]
}

export interface DashboardResponse {
  status: boolean
  result: DashboardData
}
