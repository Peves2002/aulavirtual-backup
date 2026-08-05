export interface Escuela {
  id: string
  name: string
  desc: string
  image: string
  heroBg: string
  about?: string
  areas?: string[]
  certificationsEsp?: string[]
  certificationsCons?: string[]
}

export const cleanSchoolName = (name?: string | null) => {
  if (!name) return ''

  return name.replace(/^(Escuela de la |Escuela de |Escuela )/i, '').trim()
}

export const ESCUELAS: Escuela[] = [
  {
    id: 'psicologia-organizacional',
    name: 'Psicología Organizacional',
    desc: 'Formando a los profesionales que diseñan el futuro del trabajo.',
    image: '/images/cursos/evaluacion-y-gestion-del-clima-laboral.png',
    heroBg: '/images/cursos/evaluacion-y-gestion-del-clima-laboral.png',
    about: 'Las organizaciones más exitosas entienden que su principal ventaja competitiva son las personas. Formamos profesionales capaces de atraer, evaluar, desarrollar y potenciar el talento humano mediante enfoques modernos, herramientas basadas en evidencia y metodologías de aplicación práctica. Nuestra propuesta académica integra conocimientos avanzados en gestión del talento, evaluación por competencias, desarrollo organizacional, cultura, liderazgo y analítica de personas, preparando a los participantes para asumir roles estratégicos dentro de organizaciones cada vez más complejas y dinámicas.',
    areas: [
      'Reclutamiento y Selección Estratégica',
      'Entrevista por Competencias',
      'Assessment Center y Development Center',
      'Evaluación Psicolaboral',
      'Gestión del Desempeño',
      'Capacitación y Desarrollo',
      'Clima Organizacional',
      'Cultura Organizacional',
      'Desarrollo Organizacional',
      'Liderazgo y Gestión de Equipos',
      'People Analytics',
      'Employer Branding',
      'Gestión Estratégica del Talento'
    ],
    certificationsEsp: [
      'Certificado de Especialista en Reclutamiento y Selección Estratégica',
      'Certificado de Especialista en Assessment Center',
      'Certificado de Especialista en Desarrollo Organizacional',
      'Certificado de Especialista en Gestión del Talento',
      'Certificado de Especialista en People Analytics'
    ],
    certificationsCons: [
      'Certificado de Consultor en Gestión del Talento Humano',
      'Certificado de Consultor en Desarrollo Organizacional',
      'Certificado de Consultor en Evaluación de Competencias'
    ]
  },
  {
    id: 'psicologia-ocupacional-sst',
    name: 'Psicología Ocupacional y Seguridad y Salud en el Trabajo',
    desc: 'Liderando la construcción de organizaciones seguras, saludables y sostenibles.',
    image: '/images/diplomados/diplomado-en-psicologia-ocupacional.png',
    heroBg: '/images/diplomados/diplomado-en-psicologia-ocupacional.png',
    about: 'La salud, el bienestar y la seguridad de los trabajadores constituyen pilares fundamentales para el éxito organizacional. Formamos profesionales capaces de diseñar estrategias preventivas, gestionar riesgos ocupacionales y promover entornos laborales saludables y productivos. Nuestra propuesta académica integra psicología ocupacional, salud mental laboral, riesgos psicosociales, ergonomía y sistemas de gestión de seguridad y salud en el trabajo, permitiendo desarrollar competencias altamente demandadas por las organizaciones modernas.',
    areas: [
      'Factores de Riesgo Psicosocial',
      'Salud Mental Ocupacional',
      'Carga Mental y Fatiga Laboral',
      'Ergonomía Ocupacional',
      'Vigilancia de la Salud Ocupacional',
      'Bienestar Laboral',
      'Cultura Preventiva',
      'Seguridad Basada en el Comportamiento',
      'Sistemas de Gestión SST',
      'Auditorías SST',
      'Investigación de Accidentes e Incidentes',
      'Programas de Prevención y Promoción de la Salud'
    ],
    certificationsEsp: [
      'Certificado de Especialista en Factores de Riesgo Psicosocial',
      'Certificado de Especialista en Salud Mental Ocupacional',
      'Certificado de Especialista en Ergonomía Aplicada',
      'Certificado de Especialista en Bienestar Organizacional',
      'Certificado de Especialista en Gestión de SST'
    ],
    certificationsCons: [
      'Certificado de Consultor en Psicología Ocupacional',
      'Certificado de Consultor en Seguridad y Salud en el Trabajo',
      'Certificado de Consultor en Riesgos Psicosociales'
    ]
  },
  {
    id: 'capital-humano',
    name: 'Capital Humano',
    desc: 'Desarrollando líderes capaces de transformar organizaciones.',
    image: '/images/diplomados/diplomado-en-hr-analitics-y-direccion-de-personas.jpg',
    heroBg: '/images/diplomados/diplomado-en-hr-analitics-y-direccion-de-personas.jpg',
    about: 'Las organizaciones necesitan profesionales capaces de liderar personas, impulsar el cambio y generar resultados sostenibles. Formamos líderes con visión estratégica y capacidad para afrontar los desafíos de la gestión empresarial moderna. Nuestra propuesta académica combina liderazgo, estrategia, dirección de personas, innovación y transformación organizacional para preparar profesionales capaces de generar impacto en cualquier nivel de la organización.',
    areas: [
      'Liderazgo Estratégico',
      'Dirección de Personas',
      'Gestión por Competencias',
      'Gestión del Cambio',
      'Coaching Ejecutivo',
      'Mentoring Organizacional',
      'Gestión de Equipos de Alto Desempeño'
    ],
    certificationsEsp: [
      'Certificado de Especialista en Gestión Estratégica del Talento',
      'Certificado de Especialista en Liderazgo y Desarrollo Directivo',
      'Certificado de Especialista en Gestión del Cambio',
      'Certificado de Especialista en Coaching y Desarrollo de Personas'
    ],
    certificationsCons: [
      'Certificado de Consultor en Capital Humano'
    ]
  },
  {
    id: 'management',
    name: 'Management',
    desc: 'Dirección de empresas, gestión de procesos y metodologías de gestión corporativa orientadas a resultados.',
    image: '/images/especializaciones/especializacion-en-planeamiento-estrategico.jpg',
    heroBg: '/images/especializaciones/especializacion-en-planeamiento-estrategico.jpg',
    about: 'Proveemos herramientas y marcos modernos para la gestión ejecutiva y la toma de decisiones empresariales. Nuestra propuesta académica combina dirección estratégica, planeamiento estratégico, gestión empresarial, indicadores de gestión (KPIs) y procesos de transformación organizacional y toma de decisiones gerenciales para afrontar los desafíos de la dirección moderna.',
    areas: [
      'Planeamiento Estratégico',
      'Indicadores de Gestión',
      'Transformación Organizacional',
      'Gestión Empresarial',
      'Toma de Decisiones Gerenciales'
    ],
    certificationsEsp: [
      'Certificado de Especialista en Planeamiento Estratégico'
    ],
    certificationsCons: [
      'Certificado de Consultor en Gestión Estratégica',
      'Certificado de Consultor en Transformación Organizacional'
    ]
  },
  {
    id: 'psicologia-clinica',
    name: 'Psicología Clínica',
    desc: 'Formación avanzada para promover la salud mental y el bienestar humano.',
    image: '/images/cursos/elaboracion-de-programas-de-salud-mental-las-organizaciones.png',
    heroBg: '/images/cursos/elaboracion-de-programas-de-salud-mental-las-organizaciones.png',
    about: 'La salud mental es uno de los principales desafíos de nuestra sociedad. Fortalecemos las competencias profesionales de quienes trabajan en la evaluación, intervención y promoción del bienestar psicológico desde una perspectiva científica, ética y centrada en la persona. Desarrollamos profesionales capaces de responder a las necesidades emergentes de la salud mental mediante herramientas actualizadas y enfoques de intervención basados en evidencia.',
    areas: [
      'Evaluación Psicológica',
      'Psicopatología',
      'Salud Mental',
      'Bienestar Emocional',
      'Intervención Psicológica',
      'Psicología de la Salud',
      'Primeros Auxilios Psicológicos',
      'Prevención y Promoción de la Salud Mental',
      'Herramientas Diagnósticas',
      'Psicología Aplicada a Diversos Contextos'
    ],
    certificationsEsp: [
      'Certificado de Especialista en Evaluación Psicológica',
      'Certificado de Especialista en Salud Mental',
      'Certificado de Especialista en Intervención Psicológica',
      'Certificado de Especialista en Bienestar Emocional',
      'Certificado de Especialista en Psicología Aplicada'
    ],
    certificationsCons: [
      'Certificado de Consultor en Bienestar Psicológico',
      'Certificado de Consultor en Salud Mental Organizacional',
      'Certificado de Consultor en Programas de Promoción de la Salud Mental'
    ]
  },
  {
    id: 'aprendizaje-experiencial',
    name: 'Aprendizaje Experiencial e Innovación Metodológica',
    desc: 'Donde nacen las metodologías que transforman la forma de aprender, evaluar y desarrollar el talento.',
    image: '/images/talleres/taller-investigacion-del-clima-laboral-con-bloques-de-lego.jpeg',
    heroBg: '/images/talleres/taller-investigacion-del-clima-laboral-con-bloques-de-lego.jpeg',
    about: 'Representamos el espacio de investigación, desarrollo e innovación académica de ADPH Group Executive Education. Aquí convergen la psicología, la educación, el diseño instruccional, la gamificación y el aprendizaje experiencial para crear metodologías propias capaces de transformar la forma en que las organizaciones evalúan, desarrollan y potencian a las personas. Albergamos certificaciones exclusivas y metodologías propietarias desarrolladas por ADPH, convirtiéndonos en uno de los principales diferenciadores institucionales a través de ADPH Innovation Lab™, nuestro centro de investigación y desarrollo responsable de la creación, validación y perfeccionamiento de metodologías para la evaluación y desarrollo del talento humano.',
    areas: [
      'Lego Talent Assessment Center™',
      'Lego Development Center™',
      'Lego Leadership Lab™',
      'Assessment Center ADPH™',
      'Gamificación Aplicada al Aprendizaje',
      'Diseño de Experiencias de Aprendizaje',
      'Facilitación de Procesos Grupales',
      'Team Building Experiencial',
      'Desarrollo de Competencias Conductuales',
      'Simulación y Aprendizaje Inmersivo',
      'Metodologías Activas de Enseñanza',
      'Innovación en Formación Corporativa'
    ],
    certificationsEsp: [
      'Certificado de Especialista en Lego Talent Assessment Center™',
      'Certificado de Especialista en Diseño de Experiencias de Aprendizaje',
      'Certificado de Especialista en Gamificación y Metodologías Activas',
      'Certificado de Especialista en Desarrollo de Competencias',
      'Certificado de Especialista en Facilitación Experiencial'
    ],
    certificationsCons: [
      'Certificado de Consultor en Aprendizaje Experiencial e Innovación Metodológica',
      'Certificado de Consultor en Assessment Center Experiencial',
      'Certificado de Consultor en Desarrollo de Competencias',
      'Certificado de Consultor en Diseño de Soluciones de Aprendizaje Corporativo'
    ]
  }
]

export const getEscuela = (id: string) => ESCUELAS.find(e => e.id === id) ?? ESCUELAS[0]

export const getEscuelaConfigKeyPrefix = (id: string) => `ESCUELA_${id.toUpperCase().replace(/-/g, '_')}`

export const getEscuelaBrochureUrls = (configs: Record<string, string>): Record<string, string> => {
  const map: Record<string, string> = {}

  ESCUELAS.forEach(e => {
    const url = configs[`${getEscuelaConfigKeyPrefix(e.id)}_BROCHURE`]?.trim()

    if (url) map[e.id] = url
  })

  return map
}
