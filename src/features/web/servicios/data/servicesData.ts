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
  imageAlt?: string
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
    badgeText: 'Implementación / Soporte mensual',
    image: '/servicios/seguridad-y-salud-en-el-trabajo/seguridad-y-salud-en-el-trabajo.webp',
    shortDescription:
      'Implementación del SG-SST y soporte mensual: diagnóstico, documentación, IPERC, comités y preparación ante emergencias.',
    description:
      'Implementamos y acompañamos el Sistema de Gestión de Seguridad y Salud en el Trabajo de tu empresa. Organizamos la documentación, evaluamos riesgos y damos seguimiento al plan anual, con asesoría y formación para responsables, comités y trabajadores.',
    subServicios: [
      {
        title: 'Implementación del SG-SST',
        desc: 'Diagnóstico de línea base, política y objetivos, reglamento interno, plan y programa anual, registros y organización del comité o supervisor.'
      },
      {
        title: 'Soporte mensual y seguimiento',
        desc: 'Actualización documentaria, procedimientos, indicadores, seguimiento del plan anual y asesoría para la atención de inspecciones.'
      },
      {
        title: 'Gestión de Simulacros',
        desc: 'Organización y ejecución de simulacros, preparación de brigadas y evaluación de la respuesta ante emergencias.',
        image: '/servicios/seguridad-y-salud-en-el-trabajo/gestion-de-simulacros.webp'
      },
      {
        title: 'Evaluación de Riesgos (IPERC)',
        desc: 'Matriz IPERC, inspecciones de campo, identificación de peligros, visitas técnicas y diagnóstico preventivo.',
        image: '/servicios/seguridad-y-salud-en-el-trabajo/evaluacion-de-riesgos.webp'
      },
      {
        title: 'Inducción de Seguridad y Salud en el Trabajo',
        desc: 'Cursos de inducción, bienvenida preventiva, sensibilización y capacitación inicial en SST.',
        image: '/servicios/seguridad-y-salud-en-el-trabajo/induccion-de-seguridad-y-salud-en-el-trabajo.webp'
      }
    ],
    normativas: [
      {
        code: 'LEY SST N° 29783 Y D.S 005-2012-TR',
        desc: 'Ley de Seguridad y Salud en el Trabajo y su Reglamento'
      },
      {
        code: 'R.M. N° 245-2021-TR',
        desc: 'Procedimientos para elección de representantes ante el Comité de SST'
      },
      {
        code: 'LEY GENERAL DE INSPECCIÓN N° 28806',
        desc: 'Normativa de fiscalización laboral e inspecciones de SUNAFIL'
      }
    ],
    entregables: [
      'Diagnóstico de línea base y acciones de mejora.',
      'Política, objetivos y reglamento interno de SST.',
      'Plan y programa anual, procedimientos e indicadores de seguimiento.',
      'Documentación del comité o supervisor y organización de brigadas.',
      'Matriz IPERC, mapa de riesgos y registros del sistema.',
      'Capacitaciones, simulacros y seguimiento de las acciones acordadas.'
    ],
    ejes: [
      {
        title: 'Implementación inicial',
        desc: 'Partimos del diagnóstico para priorizar acciones, organizar responsabilidades y desarrollar la documentación del sistema.'
      },
      {
        title: 'Acompañamiento mensual',
        desc: 'Revisamos avances, actualizamos documentos y orientamos al equipo en la ejecución del programa anual.'
      }
    ],
    imageAlt: 'Equipo con implementos de seguridad durante una actividad de campo'
  },
  {
    id: 'salud-ocupacional',
    slug: 'salud-ocupacional',
    title: 'SALUD OCUPACIONAL Y VIGILANCIA MÉDICA',
    shortTitle: 'Salud Ocupacional',
    category: 'Salud Ocupacional',
    badgeText: 'Vigilancia Médica / EMO',
    image: '/servicios/salud-ocupacional/salud-ocupacional.webp',
    shortDescription:
      'Vigilancia de la salud laboral, gestión de Exámenes Médicos Ocupacionales (EMO) y acompañamiento ocupacional.',
    description:
      'Acompañamos la vigilancia de la salud de tus trabajadores con médicos ocupacionales. Coordinamos los exámenes médicos, su lectura y seguimiento, y desarrollamos programas preventivos preservando la confidencialidad de la información médica.',
    subServicios: [
      {
        title: 'Evaluaciones de Exámenes Médicos Ocupacionales (EMO)',
        desc: 'Gestión y seguimiento reservado de evaluaciones médicas ocupacionales en clínicas autorizadas.',
        image: '/servicios/salud-ocupacional/evaluaciones-de-examenes-medicos-ocupacionales.webp'
      },
      {
        title: 'Gestión de Salud Ocupacional',
        desc: 'Vigilancia continua de la salud, campañas preventivas, seguimiento ocupacional y soporte médico especializado.',
        image: '/servicios/salud-ocupacional/gestion-de-salud-ocupacional.webp'
      },
      {
        title: 'Informes de vigilancia médica',
        desc: 'Elaboración de informes de vigilancia médica para la gestión ocupacional y su presentación ante DIGESA según corresponda.'
      },
      {
        title: 'Capacitación en salud ocupacional',
        desc: 'Formación y sensibilización para promover hábitos saludables y prevenir enfermedades relacionadas con el trabajo.'
      }
    ],
    entregables: [
      'Programa de vigilancia de la salud ocupacional.',
      'Coordinación de EMO con clínicas autorizadas y lectura de resultados por médicos ocupacionales.',
      'Seguimiento médico ocupacional de los trabajadores.',
      'Informes de vigilancia médica según el alcance del servicio.',
      'Capacitaciones y acciones de promoción de la salud.'
    ],
    imageAlt: 'Personal de salud realizando una evaluación ocupacional'
  },
  {
    id: 'monitoreos-ocupacionales',
    slug: 'monitoreos-ocupacionales',
    title: 'EJECUCIÓN DE MONITOREOS OCUPACIONALES',
    shortTitle: 'Monitoreos Ocupacionales',
    category: 'Monitoreos Ocupacionales',
    badgeText: 'Higiene industrial / Evaluación de riesgos',
    image: '/servicios/monitoreos-ocupacionales/monitoreos-ocupacionales.webp',
    shortDescription:
      'Evaluación de agentes físicos, químicos, ergonómicos y psicosociales, con informes para orientar medidas de prevención.',
    description:
      'Evaluamos las condiciones de exposición en los puestos de trabajo mediante monitoreos ocupacionales. Elaboramos el programa de higiene industrial, la matriz de riesgos y los informes técnicos para que tu empresa pueda priorizar medidas de prevención y control.',
    subServicios: [
      {
        title: 'Agentes físicos',
        desc: 'Evaluación de ruido ocupacional, vibración e iluminación mediante mediciones de campo.',
        image: '/servicios/monitoreos-ocupacionales/monitoreos-ocupacionales-de-campo.webp'
      },
      {
        title: 'Agentes químicos',
        desc: 'Evaluación de exposición a polvo, humos, vapores y otros agentes según las condiciones del puesto.'
      },
      {
        title: 'Factores ergonómicos',
        desc: 'Evaluación de posturas y tareas con metodologías como RULA, REBA, OWAS y ROSA, según corresponda.'
      },
      {
        title: 'Factores psicosociales',
        desc: 'Evaluación con instrumentos como COPSOQ-ISTAS21 y CENSOPAS-COPSOQ, según el alcance acordado.'
      }
    ],
    entregables: [
      'Programa de higiene industrial.',
      'Matriz de riesgos en higiene laboral.',
      'Resultados de monitoreos físicos y químicos contratados.',
      'Evaluaciones de factores ergonómicos y psicosociales.',
      'Informes técnicos con resultados y recomendaciones de control.'
    ],
    imageAlt: 'Especialistas con chalecos de seguridad durante una evaluación de campo'
  },
  {
    id: 'capacitaciones-sst',
    slug: 'capacitaciones-en-sst',
    title: 'CAPACITACIONES EN SEGURIDAD Y SALUD EN EL TRABAJO',
    shortTitle: 'Capacitaciones en SST',
    category: 'Capacitaciones en SST',
    badgeText: 'Talleres / Entrenamiento práctico',
    image: '/servicios/capacitaciones-en-sst/capacitaciones-en-sst.webp',
    shortDescription:
      'Formación empresarial combinando contenidos técnicos, talleres prácticos de brigadas, primeros auxilios e higiene.',
    description:
      'Formamos a tu equipo en gestión de SST, primeros auxilios, evacuación, rescate, brigadas e higiene ocupacional. Combinamos contenidos técnicos con talleres prácticos adaptados a las actividades y necesidades de tu organización.',
    subServicios: [
      {
        title: 'Sistema de Gestión de SST',
        desc: 'Cursos normativos, gestión preventiva, comités de SST y responsables de seguridad.',
        image: '/servicios/capacitaciones-en-sst/sistema-de-gestion-de-seguridad-y-salud-en-el-trabajo.webp'
      },
      {
        title: 'Entrenamiento de Primeros Auxilios',
        desc: 'Talleres prácticos de atención primaria de emergencias y respuesta rápida.',
        image: '/servicios/capacitaciones-en-sst/entrenamiento-primeros-auxilios.webp'
      },
      {
        title: 'Entrenamiento de Evacuación y Rescate',
        desc: 'Prácticas operativas y dinámicas asociadas a protocolos de evacuación.',
        image: '/servicios/capacitaciones-en-sst/entrenamiento-de-evacuacion-y-rescate.webp'
      },
      {
        title: 'Entrenamiento a la Brigada ante Emergencias',
        desc: 'Formación, preparación y entrenamiento de brigadistas empresariales.',
        image: '/servicios/capacitaciones-en-sst/entrenamiento-a-la-brigada-ante-emergencias.webp'
      },
      {
        title: 'Higiene Ocupacional',
        desc: 'Formación técnica en higiene industrial y control de agentes ambientales.',
        image: '/servicios/capacitaciones-en-sst/higiene-ocupacional.webp'
      }
    ],
    entregables: [
      'Capacitación en el Sistema de Gestión de Seguridad y Salud en el Trabajo.',
      'Entrenamiento práctico de Primeros Auxilios.',
      'Entrenamiento de Evacuación y Rescate.',
      'Entrenamiento a la Brigada ante Emergencias.',
      'Capacitaciones especializadas en Higiene Ocupacional.'
    ],
    imageAlt: 'Participantes y facilitadores de una capacitación práctica'
  },
  {
    id: 'itse-gestion-municipal',
    slug: 'itse-y-gestion-municipal',
    title: 'ITSE Y GESTIÓN MUNICIPAL',
    shortTitle: 'ITSE y Gestión Municipal',
    category: 'ITSE y Gestión Municipal',
    badgeText: 'Expediente técnico / Seguridad',
    image: '/servicios/itse-y-gestion-municipal/itse-y-gestion-municipal.webp',
    shortDescription:
      'Elaboración de expedientes técnicos, arquitectura, señalización y condiciones de seguridad edilicia.',
    description:
      'Preparamos la documentación técnica y brindamos asistencia para el trámite de Inspección Técnica de Seguridad en Edificaciones y la gestión municipal. Revisamos las condiciones del establecimiento y organizamos planos, cálculos y protocolos según el alcance de la inspección.',
    subServicios: [
      {
        title: 'Arquitectura, ubicación y aforo',
        desc: 'Croquis de ubicación, planos de distribución existente y cálculo de aforo del establecimiento.',
        image: '/servicios/itse-y-gestion-municipal/itse-y-gestion-municipal.webp'
      },
      {
        title: 'Instalaciones eléctricas',
        desc: 'Planos de tableros, diagramas unifilares, cuadro de cargas y documentación de medición de puesta a tierra.'
      },
      {
        title: 'Seguridad y evacuación',
        desc: 'Plan de seguridad, señalización, rutas de evacuación y documentación de operatividad o mantenimiento de equipos.'
      }
    ],
    entregables: [
      'Croquis de ubicación, planos de arquitectura y cálculo de aforo.',
      'Planos eléctricos, diagramas unifilares y cuadro de cargas.',
      'Certificado de medición de resistencia del sistema de puesta a tierra según el servicio contratado.',
      'Plan de seguridad y planos de señalización y evacuación.',
      'Memorias o protocolos de equipos de detección y alarma, extintores, sistemas contra incendios y luces de emergencia.',
      'Asistencia técnica y organización del expediente para el trámite municipal.'
    ],
    imageAlt: 'Personal técnico inspeccionando las instalaciones de un establecimiento'
  },
  {
    id: 'hostigamiento-sexual-laboral',
    slug: 'prevencion-hostigamiento-sexual-laboral',
    title: 'PREVENCIÓN DEL HOSTIGAMIENTO SEXUAL LABORAL',
    shortTitle: 'Hostigamiento Sexual Laboral',
    category: 'Hostigamiento Sexual Laboral',
    badgeText: 'Prevención / Comité de intervención',
    image: '/servicios/hostigamiento-sexual-laboral/hostigamiento-sexual-laboral.webp',
    shortDescription:
      'Asesoría en comités de intervención, capacitaciones de sensibilización y protocolos institucionales.',
    description:
      'Ayudamos a tu organización a prevenir y atender el hostigamiento sexual laboral mediante orientación, protocolos y capacitación. Acompañamos la conformación del comité o delegado de intervención y su preparación para actuar con respeto y confidencialidad.',
    subServicios: [
      {
        title: 'Sensibilización del personal',
        desc: 'Capacitación sobre prevención del hostigamiento sexual laboral y los canales de atención de la organización.',
        image: '/servicios/hostigamiento-sexual-laboral/prevencion-del-hostigamiento-sexual-laboral.webp'
      },
      {
        title: 'Comité o delegado de intervención',
        desc: 'Orientación para la convocatoria y conformación del comité o delegado y capacitación especializada de titulares y suplentes.'
      },
      {
        title: 'Protocolos y evidencias',
        desc: 'Elaboración de procedimientos internos, registros de asistencia, fotografías de las capacitaciones y certificados.'
      }
    ],
    normativas: [
      {
        code: 'LEY N° 27942',
        desc: 'Ley de Prevención y Sanción del Hostigamiento Sexual'
      },
      {
        code: 'D.S. N° 014-2019-MIMP',
        desc: 'Reglamento de la Ley N° 27942'
      },
      {
        code: 'D.S. N° 021-2021-MIMP',
        desc: 'Modifica el Reglamento de la Ley N° 27942'
      }
    ],
    entregables: [
      'Proceso de elección y conformación del Comité / Delegado de Intervención.',
      'Elaboración del protocolo interno de prevención y procedimiento de sanción.',
      'Capacitaciones y talleres de sensibilización al personal.',
      'Asesoría técnica y orientación ante inspecciones normativas.',
      'Registros de asistencia, fotografías y certificados de las capacitaciones.',
      'Capacitación especializada para el comité o delegado de intervención.'
    ],
    imageAlt: 'Participantes de una jornada de sensibilización en un auditorio'
  },
  {
    id: 'homologaciones-sig',
    slug: 'homologaciones-y-sistemas-integrados-de-gestion',
    title: 'HOMOLOGACIONES Y SISTEMAS INTEGRADOS DE GESTIÓN',
    shortTitle: 'Homologaciones y SIG',
    category: 'Sistemas Integrados de Gestión',
    badgeText: 'ISO 45001 / 9001 / 14001',
    shortDescription:
      'Diagnóstico, documentación, auditorías y acompañamiento para homologaciones en seguridad, calidad y gestión ambiental.',
    description:
      'Preparamos a tu empresa para procesos de homologación de Sistemas Integrados de Gestión. Evaluamos brechas, organizamos la documentación y acompañamos la implementación, las auditorías y la coordinación con casas certificadoras según los requisitos del proceso.',
    image: '/servicios/homologaciones-sig/homologaciones-sig.webp',
    imageAlt: 'Expositor y participantes en una sesión de formación empresarial',
    subServicios: [
      {
        title: 'Diagnóstico y documentación SIG',
        desc: 'Evaluación inicial y adecuación de documentos a los requisitos de homologación.'
      },
      {
        title: 'Seguridad, calidad y medio ambiente',
        desc: 'Acompañamiento en sistemas relacionados con ISO 45001, ISO 9001 e ISO 14001.'
      },
      {
        title: 'Auditorías internas',
        desc: 'Evaluación del sistema e identificación de oportunidades de mejora.'
      },
      {
        title: 'Capacitación y soporte permanente',
        desc: 'Formación especializada y seguimiento de la implementación con el equipo de la empresa.'
      },
      {
        title: 'Coordinación con casas certificadoras',
        desc: 'Soporte para preparar el proceso de certificación de la trinorma con la entidad certificadora.'
      }
    ],
    entregables: [
      'Diagnóstico inicial y brechas del sistema integrado.',
      'Documentación y acciones de adecuación según los requisitos del proceso.',
      'Informes de auditoría interna y acciones de mejora.',
      'Capacitaciones especializadas y seguimiento de avances.',
      'Acompañamiento en la preparación para homologación o certificación.'
    ]
  },
  {
    id: 'gestion-empresarial-recursos-humanos',
    slug: 'gestion-empresarial-y-recursos-humanos',
    title: 'GESTIÓN EMPRESARIAL Y RECURSOS HUMANOS',
    shortTitle: 'Gestión Empresarial y RR. HH.',
    category: 'Gestión Empresarial',
    badgeText: 'Talento humano / Organización',
    shortDescription:
      'Selección de personal, perfiles de puestos, desempeño, MOF, política salarial y soporte al área de Recursos Humanos.',
    description:
      'Fortalecemos la organización interna y la gestión del talento de tu empresa. Acompañamos al área de Recursos Humanos en la selección de personal, la evaluación del desempeño y la elaboración de documentos y procedimientos de gestión.',
    image: '/servicios/gestion-empresarial/gestion-empresarial.webp',
    imageAlt: 'Participantes en una capacitación empresarial en un aula',
    subServicios: [
      {
        title: 'Selección y perfiles de puestos',
        desc: 'Evaluación y actualización de perfiles, reclutamiento, selección y acompañamiento en la contratación.'
      },
      {
        title: 'Documentos de gestión',
        desc: 'Elaboración y actualización del Manual de Organización y Funciones (MOF), política salarial y Reglamento Interno de Trabajo (RIT).'
      },
      {
        title: 'Desempeño y productividad',
        desc: 'Evaluación del desempeño, seguimiento de indicadores de talento humano y planes de mejora.'
      },
      {
        title: 'Bienestar, clima y liderazgo',
        desc: 'Capacitaciones empresariales para fortalecer el bienestar, el clima laboral y las habilidades de liderazgo.'
      },
      {
        title: 'Soporte a Recursos Humanos',
        desc: 'Políticas, procedimientos y formatos para la gestión cotidiana del área.'
      }
    ],
    entregables: [
      'Perfiles de puestos actualizados.',
      'Soporte en los procesos de selección y contratación acordados.',
      'MOF, política salarial y RIT según el alcance contratado.',
      'Evaluaciones de desempeño e indicadores de talento humano.',
      'Políticas, procedimientos y formatos de Recursos Humanos.',
      'Capacitaciones y planes de mejora organizacional.'
    ]
  }
]
