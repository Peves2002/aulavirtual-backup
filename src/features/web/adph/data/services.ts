import type { LucideIcon } from 'lucide-react'
import { Users, ShieldCheck, Target, BarChart3, MessageSquare, GraduationCap, Monitor, Brain } from 'lucide-react'

export interface ConsultoriaServicio {
  id: string
  title: string
  desc: string
  image: string
  icon: LucideIcon
}

export interface HrcorexServicio {
  id: string
  title: string
  desc: string
  image: string
  icon: LucideIcon
}

export interface HrcorexProducto {
  id: string
  title: string
  category: string
  desc: string
  image: string
  features: string[]
}

/**
 * Servicios de Consultoría Estratégica (In House, Evaluaciones, Clima, Desempeño, Asesoría).
 * Portado de SERVICES_DATA.consultoria (adph-exec-bloom/src/lib/services-data.ts)
 * + imágenes/iconos de Servicios.tsx (CONSULTORIA_IMAGES / CONSULTORIA_ICONS).
 */
export const CONSULTORIA_SERVICIOS: ConsultoriaServicio[] = [
  {
    id: 'in-house',
    title: 'Capacitaciones In House',
    desc: 'Entrenamiento diseñado exclusivamente para las necesidades de tu equipo.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
    icon: GraduationCap
  },
  {
    id: 'evaluaciones',
    title: 'Evaluaciones Ocupacionales',
    desc: 'Diagnóstico preciso del perfil y salud laboral de tus colaboradores.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
    icon: ShieldCheck
  },
  {
    id: 'clima',
    title: 'Evaluación de Clima Laboral',
    desc: 'Mide y mejora el ambiente de trabajo en tu organización.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    icon: MessageSquare
  },
  {
    id: 'desempeno',
    title: 'Evaluación de Desempeño',
    desc: 'Sistemas modernos para potenciar la productividad y el feedback.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    icon: Target
  },
  {
    id: 'asesoria',
    title: 'Asesoría en Gestión del Talento',
    desc: 'Consultoría estratégica para optimizar tus procesos de RRHH.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    icon: BarChart3
  }
]

/**
 * Servicios de HR CoreX (versión "corta", usada en el teaser de /consultoria
 * y en el detalle /hrcorex/[serviceId]). Portado de SERVICES_DATA.hrcorex
 * + imágenes/iconos de Servicios.tsx (HRCOREX_IMAGES / HRCOREX_ICONS).
 */
export const HRCOREX_SERVICIOS: HrcorexServicio[] = [
  {
    id: 'seleccion',
    title: 'Plataforma de Selección',
    desc: 'Software avanzado para digitalizar y optimizar tus procesos de reclutamiento.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80',
    icon: Users
  },
  {
    id: 'evaluacion-online',
    title: 'Plataforma de Evaluación',
    desc: 'Herramienta digital para evaluaciones psicométricas y técnicas.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    icon: Monitor
  },
  {
    id: 'tests',
    title: 'Test Psicológicos',
    desc: 'Batería completa de pruebas psicológicas validadas científicamente.',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=600&q=80',
    icon: Brain
  }
]

/**
 * Suite completa de productos HR CoreX (usada en el grid de /hrcorex).
 * Portado de la constante PRODUCTS de adph-exec-bloom/src/routes/hrcorex.index.tsx.
 * Solo los ids incluidos en HRCOREX_DETALLE_IDS tienen página de detalle propia;
 * el resto redirige a /contacto (igual que `existsInServices` en el origen).
 */
export const HRCOREX_PRODUCTOS: HrcorexProducto[] = [
  {
    id: 'seleccion',
    title: 'CoreX Recruiter',
    category: 'Reclutamiento & ATS',
    desc: 'Digitaliza y acelera tu proceso de selección de personal. Publica convocatorias, gestiona candidatos y filtra perfiles automáticamente.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    features: [
      'Publicación multiposting en bolsas de empleo.',
      'Filtros de candidatos asistidos por inteligencia artificial.',
      'Embudo de selección Kanban altamente interactivo.'
    ]
  },
  {
    id: 'evaluacion-online',
    title: 'CoreX Assessment',
    category: 'Evaluaciones en Línea',
    desc: 'Plataforma de pruebas técnicas y de competencias diseñada para medir habilidades con máxima precisión y seguridad.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    features: [
      'Biblioteca de pruebas técnicas listas para aplicar.',
      'Reportes automáticos de adecuación al puesto.',
      'Algoritmos de monitoreo seguro y protección anti-plagio.'
    ]
  },
  {
    id: 'tests',
    title: 'CoreX Testing',
    category: 'Batería Psicométrica',
    desc: 'Acceso digital a una amplia biblioteca de test psicológicos y de personalidad científicamente validados.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    features: [
      'Evaluación profunda de perfil conductual y cognitivo.',
      'Generación inmediata de informes descriptivos en PDF.',
      'Pruebas estandarizadas y adaptadas al entorno regional.'
    ]
  },
  {
    id: 'salud-ocupacional',
    title: 'CoreX Ocupacional',
    category: 'Salud & Vigilancia Médica',
    desc: 'Módulo integrado para la programación, control y seguimiento digital de las aptitudes ocupacionales e historial de tu personal.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    features: [
      'Monitoreo continuo de fichas médicas anuales.',
      'Alertas automáticas de vencimiento de certificados médicos.',
      'Cumplimiento garantizado ante auditorías de SUNAFIL.'
    ]
  },
  {
    id: 'analytics-clima',
    title: 'CoreX Analytics',
    category: 'Clima & Desempeño 360°',
    desc: 'Cuadros de mando interactivos y herramientas de encuestas para medir el desempeño, el clima laboral y predecir la rotación.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    features: [
      'Evaluaciones de desempeño 180° y 360° en pocos clics.',
      'Encuestas de clima laboral rápidas y anónimas.',
      'Dashboards analíticos con insights predictivos de talento.'
    ]
  }
]

/** Ids de HRCOREX_PRODUCTOS que cuentan con página de detalle propia en /hrcorex/[serviceId]. */
export const HRCOREX_DETALLE_IDS = ['seleccion', 'evaluacion-online', 'tests']

export const getConsultoriaServicio = (id: string) => CONSULTORIA_SERVICIOS.find(s => s.id === id)
export const getHrcorexServicio = (id: string) => HRCOREX_SERVICIOS.find(s => s.id === id)
export const getHrcorexProducto = (id: string) => HRCOREX_PRODUCTOS.find(p => p.id === id)
