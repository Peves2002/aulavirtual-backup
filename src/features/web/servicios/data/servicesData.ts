export interface SubServicioItem {
  title: string
  desc?: string
  image?: string
}

export interface ServiceItem {
  id: string
  slug: string
  title: string
  shortTitle: string
  category: string
  shortDescription: string
  description: string
  image: string
  badgeText: string
  subServicios: SubServicioItem[]
  normativas?: { code: string; desc: string }[]
  entregables: string[]
  ejes?: { title: string; desc: string }[]
  casos?: { client: string; text: string }[]
  planes?: { name: string; desc: string; features: string[]; time: string }[]
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'seguridad-salud-trabajo',
    slug: 'seguridad-y-salud-en-el-trabajo',
    title: 'SEGURIDAD Y SALUD EN EL TRABAJO (SST)',
    shortTitle: 'Seguridad y Salud en el Trabajo',
    category: 'Seguridad y Salud en el Trabajo',
    badgeText: 'Ley 29783 / IPERC / Emergencias',
    image: '/servicios/seguridad-y-salud-en-el-trabajo/seguridad-y-salud-en-el-trabajo.webp',
    shortDescription: 'Prevención de riesgos, gestión de emergencias, evaluación de peligros (IPERC) e inducción preventiva inicial.',
    description: 'Representamos la experiencia integral de MS&M Consulting en prevención de riesgos, gestión de emergencias, evaluación de peligros e inducción en Seguridad y Salud en el Trabajo para garantizar la cultura preventiva y el cumplimiento normativo.',
    subServicios: [
      {
        title: 'Gestión de Simulacros',
        desc: 'Material visual de simulacros, cultura preventiva y actividades de preparación ante emergencias.',
        image: '/servicios/seguridad-y-salud-en-el-trabajo/gestion-de-simulacros.webp',
      },
      {
        title: 'Evaluación de Riesgos (IPERC)',
        desc: 'Matriz IPERC, inspecciones de campo, identificación de peligros, visitas técnicas y diagnóstico preventivo.',
        image: '/servicios/seguridad-y-salud-en-el-trabajo/evaluacion-de-riesgos.webp',
      },
      {
        title: 'Inducción de Seguridad y Salud en el Trabajo',
        desc: 'Cursos de inducción, bienvenida preventiva, sensibilización y capacitación inicial en SST.',
        image: '/servicios/seguridad-y-salud-en-el-trabajo/induccion-de-seguridad-y-salud-en-el-trabajo.webp',
      },
    ],
    normativas: [
      { code: 'LEY SST N° 29783 Y D.S 005-2012-TR', desc: 'Ley de Seguridad y Salud en el Trabajo y su Reglamento' },
      { code: 'R.M. N° 245-2021-TR', desc: 'Procedimientos para elección de representantes ante el Comité de SST' },
      { code: 'LEY GENERAL DE INSPECCIÓN N° 28806', desc: 'Normativa de fiscalización laboral e inspecciones de SUNAFIL' },
    ],
    entregables: [
      'Gestión y ejecución de simulacros ante emergencias.',
      'Evaluación de riesgos e Identificación de Peligros (Matriz IPERC).',
      'Inducción de Seguridad y Salud en el Trabajo (SST).',
      'Inspecciones técnicas de seguridad y diagnóstico preventivo.',
      'Asesoramiento y soporte continuo en la gestión del SG-SST.',
    ],
  },
  {
    id: 'salud-ocupacional',
    slug: 'salud-ocupacional',
    title: 'SALUD OCUPACIONAL Y VIGILANCIA MÉDICA',
    shortTitle: 'Salud Ocupacional',
    category: 'Salud Ocupacional',
    badgeText: 'Vigilancia Médica / EMO',
    image: '/servicios/salud-ocupacional/salud-ocupacional.webp',
    shortDescription: 'Vigilancia de la salud laboral, gestión de Exámenes Médicos Ocupacionales (EMO) y acompañamiento ocupacional.',
    description: 'Transmitimos una gestión profesional de vigilancia de la salud y acompañamiento ocupacional, preservando la confidencialidad médica e impulsando la prevención de enfermedades laborales.',
    subServicios: [
      {
        title: 'Evaluaciones de Exámenes Médicos Ocupacionales (EMO)',
        desc: 'Gestión y seguimiento reservado de evaluaciones médicas ocupacionales en clínicas autorizadas.',
        image: '/servicios/salud-ocupacional/evaluaciones-de-examenes-medicos-ocupacionales.webp',
      },
      {
        title: 'Gestión de Salud Ocupacional',
        desc: 'Vigilancia continua de la salud, campañas preventivas, seguimiento ocupacional y soporte médico especializado.',
        image: '/servicios/salud-ocupacional/gestion-de-salud-ocupacional.webp',
      },
    ],
    entregables: [
      'Evaluaciones y seguimiento de Exámenes Médicos Ocupacionales (EMO).',
      'Gestión y soporte en Salud Ocupacional.',
      'Seguimiento y vigilancia del estado de salud de los trabajadores por Médicos Ocupacionales.',
      'Campañas preventivas y programas de promoción de la salud ocupacional.',
    ],
  },
  {
    id: 'monitoreos-ocupacionales',
    slug: 'monitoreos-ocupacionales',
    title: 'EJECUCIÓN DE MONITOREOS OCUPACIONALES',
    shortTitle: 'Monitoreos Ocupacionales',
    category: 'Monitoreos Ocupacionales',
    badgeText: 'Físicos, Psicosociales & Ergonómicos',
    image: '/servicios/monitoreos-ocupacionales/monitoreos-ocupacionales.webp',
    shortDescription: 'Evaluaciones cuantitativas y cualitativas de campo de agentes físicos, ergonómicos y psicosociales.',
    description: 'Mostramos la capacidad técnica de MS&M Consulting en evaluaciones de campo y monitoreo de agentes ocupacionales en los puestos de trabajo con equipos especializados de medición.',
    subServicios: [
      {
        title: 'Monitoreos Ocupacionales de Campo',
        desc: 'Evaluación técnica de agentes físicos (Ruido, Iluminación, Vibración), factores ergonómicos y psicosociales.',
        image: '/servicios/monitoreos-ocupacionales/monitoreos-ocupacionales-de-campo.webp',
      },
    ],
    entregables: [
      'Monitoreo de Agentes Físicos: Ruido Ocupacional (Dosimetría / Sonometría), Vibración e Iluminación.',
      'Monitoreo de Agentes y Factores de Riesgos Ergonómicos.',
      'Monitoreo de Agentes y Factores de Riesgos Psicosociales.',
      'Elaboración de informes técnicos de monitoreos ocupacionales firmados por especialistas.',
    ],
  },
  {
    id: 'capacitaciones-sst',
    slug: 'capacitaciones-en-sst',
    title: 'CAPACITACIONES EN SEGURIDAD Y SALUD EN EL TRABAJO',
    shortTitle: 'Capacitaciones en SST',
    category: 'Capacitaciones en SST',
    badgeText: 'Formación Normativa & Práctica',
    image: '/servicios/capacitaciones-en-sst/capacitaciones-en-sst.webp',
    shortDescription: 'Formación empresarial combinando contenidos técnicos, talleres prácticos de brigadas, primeros auxilios e higiene.',
    description: 'Comunicamos la experiencia de MS&M Consulting en formación empresarial, combinando contenidos normativos técnicos con entrenamiento práctico de primeros auxilios, evacuación, rescate y brigadas.',
    subServicios: [
      {
        title: 'Sistema de Gestión de SST',
        desc: 'Cursos normativos, gestión preventiva, comités de SST y responsables de seguridad.',
        image: '/servicios/capacitaciones-en-sst/sistema-de-gestion-de-seguridad-y-salud-en-el-trabajo.webp',
      },
      {
        title: 'Entrenamiento de Primeros Auxilios',
        desc: 'Talleres prácticos de atención primaria de emergencias y respuesta rápida.',
        image: '/servicios/capacitaciones-en-sst/entrenamiento-primeros-auxilios.webp',
      },
      {
        title: 'Entrenamiento de Evacuación y Rescate',
        desc: 'Prácticas operativas y dinámicas asociadas a protocolos de evacuación.',
        image: '/servicios/capacitaciones-en-sst/entrenamiento-de-evacuacion-y-rescate.webp',
      },
      {
        title: 'Entrenamiento a la Brigada ante Emergencias',
        desc: 'Formación, preparación y entrenamiento de brigadistas empresariales.',
        image: '/servicios/capacitaciones-en-sst/entrenamiento-a-la-brigada-ante-emergencias.webp',
      },
      {
        title: 'Higiene Ocupacional',
        desc: 'Formación técnica en higiene industrial y control de agentes ambientales.',
        image: '/servicios/capacitaciones-en-sst/higiene-ocupacional.webp',
      },
    ],
    entregables: [
      'Capacitación en el Sistema de Gestión de Seguridad y Salud en el Trabajo.',
      'Entrenamiento práctico de Primeros Auxilios.',
      'Entrenamiento de Evacuación y Rescate.',
      'Entrenamiento a la Brigada ante Emergencias.',
      'Capacitaciones especializadas en Higiene Ocupacional.',
    ],
  },
  {
    id: 'itse-gestion-municipal',
    slug: 'itse-y-gestion-municipal',
    title: 'ITSE Y GESTIÓN MUNICIPAL',
    shortTitle: 'ITSE y Gestión Municipal',
    category: 'ITSE y Gestión Municipal',
    badgeText: 'INDECI / Licencia Municipal',
    image: '/servicios/itse-y-gestion-municipal/itse-y-gestion-municipal.webp',
    shortDescription: 'Elaboración de expedientes técnicos, arquitectura, señalización y condiciones de seguridad edilicia.',
    description: 'Reflejamos el soporte técnico que brinda MS&M Consulting para el cumplimiento de condiciones de seguridad edilicia, tramitación de Licencia de Funcionamiento y Certificado ITSE - INDECI.',
    subServicios: [
      {
        title: 'ITSE y Gestión Municipal',
        desc: 'Asistencia técnica en inspecciones, condiciones de seguridad, memorias descriptivas, señalización y planos edilicios.',
        image: '/servicios/itse-y-gestion-municipal/itse-y-gestion-municipal.webp',
      },
    ],
    entregables: [
      'Planos de arquitectura, distribución y memorias descriptivas.',
      'Planos de distribución de tableros eléctricos y diagramas unifilares.',
      'Memoria descriptiva del sistema de detección y alarma contra incendios.',
      'Asistencia técnica para inspección y cumplimiento de condiciones de seguridad ITSE / INDECI.',
    ],
  },
  {
    id: 'hostigamiento-sexual-laboral',
    slug: 'prevencion-hostigamiento-sexual-laboral',
    title: 'PREVENCIÓN DEL HOSTIGAMIENTO SEXUAL LABORAL',
    shortTitle: 'Hostigamiento Sexual Laboral',
    category: 'Hostigamiento Sexual Laboral',
    badgeText: 'Ley 27942 / D.S 021-2021-MIMP',
    image: '/servicios/hostigamiento-sexual-laboral/hostigamiento-sexual-laboral.webp',
    shortDescription: 'Asesoría en comités de intervención, capacitaciones de sensibilización y protocolos institucionales.',
    description: 'Presentamos el servicio desde un enfoque profesional, preventivo y de sensibilización institucional, garantizando el cumplimiento normativo ante SUNAFIL y un trato respetuoso.',
    subServicios: [
      {
        title: 'Prevención del Hostigamiento Sexual Laboral',
        desc: 'Capacitaciones, talleres de sensibilización, conformación de comités/delegados y procedimiento de prevención.',
        image: '/servicios/hostigamiento-sexual-laboral/prevencion-del-hostigamiento-sexual-laboral.webp',
      },
    ],
    normativas: [
      { code: 'LEY N° 27942', desc: 'Ley de Prevención y Sanción del Hostigamiento Sexual Laboral' },
      { code: 'DECRETO SUPREMO N° 021-2021-MIMP', desc: 'Reglamento del Decreto Supremo' },
    ],
    entregables: [
      'Proceso de elección y conformación del Comité / Delegado de Intervención.',
      'Elaboración del protocolo interno de prevención y procedimiento de sanción.',
      'Capacitaciones y talleres de sensibilización al personal.',
      'Asesoría técnica y orientación ante inspecciones normativas.',
    ],
  },
]
