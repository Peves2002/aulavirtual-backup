import { daColors } from './homeTheme'

/** Página de inicio Digital Azul — contenido v1.0 */
export const homeHero = {
  title: 'Transformamos conocimiento en capacidades aplicables',
  subtitle:
    'Soluciones de aprendizaje para personas y organizaciones que buscan avanzar al siguiente nivel.',
  cta: { label: 'Explorar programas', href: '/cursos' },
  images: ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg'],
}

/** Bloque 2 — orden spec: Especialistas, Tecnología educativa, Experiencia */
export const homeWhy = {
  eyebrow: '¿POR QUÉ DIGITAL AZUL?',
  items: [
    {
      title: 'Especialistas',
      description:
        'Profesionales con experiencia real en sus campos, orientados a generar capacidades aplicables en el entorno laboral e institucional.',
      color: daColors.purple,
      icon: 'users',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Tecnología educativa',
      description:
        'Plataforma moderna, intuitiva y accesible que integra formación, evaluación, certificación y reportes en un solo ecosistema.',
      color: daColors.teal,
      icon: 'monitor',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Experiencia',
      description:
        'Años acompañando a entidades públicas y privadas en el diseño e implementación de programas formativos de alto impacto.',
      color: daColors.blue,
      icon: 'shield',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80',
    },
  ],
}

export const homeSoluciones = {
  title: 'NUESTRAS SOLUCIONES',
  subtitle: 'Programas diseñados para las necesidades de cada tipo de organización y participante.',
  cards: [
    {
      title: 'ENTIDADES PÚBLICAS',
      description:
        'Fortalecimiento institucional con programas en régimen disciplinario, control interno, ética e integridad.',
      color: daColors.blue,
      icon: 'landmark',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      href: '/cursos',
      ctaLabel: 'Ver programas',
    },
    {
      title: 'ENTIDADES PRIVADAS',
      description:
        'Soluciones corporativas a medida: inducción, prevención de riesgos psicosociales y desarrollo de competencias.',
      color: daColors.teal,
      icon: 'building',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
      href: '/cursos',
      ctaLabel: 'Ver programas',
    },
    {
      title: 'CURSOS ABIERTOS',
      description:
        'Capacitaciones disponibles para participantes individuales en competencias digitales y profesionales.',
      color: daColors.purple,
      icon: 'shopping',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
      href: '/cursos',
      ctaLabel: 'Ver catálogo',
    },
    {
      title: 'RECURSOS',
      description:
        'Manuales, guías, plantillas y artículos para reforzar tu aprendizaje antes y después de la formación.',
      color: daColors.blueDark,
      icon: 'book',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
      href: '/cursos',
      ctaLabel: 'Ver catálogo',
    },
  ],
}

/** Fallback cuando no hay cursos en BD ni slugs configurados */
export const homeProgramasStatic = [
  {
    title: 'Régimen Disciplinario',
    description: 'Fortalecimiento institucional para entidades del sector público.',
    color: daColors.blue,
    href: '/cursos',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Control Interno',
    description: 'Capacidades clave para la gestión y supervisión institucional.',
    color: daColors.teal,
    href: '/cursos',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Ética en la Función Pública',
    description: 'Programa orientado a la integridad y el servicio público.',
    color: daColors.orange,
    href: '/cursos',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Hostigamiento Sexual Laboral',
    description: 'Prevención y gestión en entidades públicas y privadas.',
    color: daColors.purple,
    href: '/cursos',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
  },
]

/** Imágenes Unsplash de respaldo para programas sin miniatura en BD */
export const homeProgramasFallbackImages = homeProgramasStatic.map(p => p.image)

export const homeCasosExito = [
  {
    title: 'Capacitación en Régimen Disciplinario',
    client: 'Hospital del Niño',
    result: '120+ servidores capacitados',
    testimonial: 'Programa alineado al contexto institucional con alta participación y certificación.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Programa de Control Interno',
    client: 'Entidad gubernamental',
    result: '95% de satisfacción',
    testimonial: 'Fortalecimiento de capacidades clave para la supervisión y gestión pública.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Ética e Integridad Institucional',
    client: 'Organismo público',
    result: '200 participantes',
    testimonial: 'Formación aplicable que impulsó la cultura de integridad en la organización.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Desarrollo de Competencias',
    client: 'Empresa privada',
    result: 'Programa corporativo a medida',
    testimonial: 'Equipos alineados a objetivos estratégicos con rutas de aprendizaje personalizadas.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Inteligencia Artificial aplicada',
    client: 'Participantes individuales',
    result: 'Curso abierto — alta demanda',
    testimonial: 'Acceso flexible al Campus Digital Azul con certificación verificable.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
  },
]

export const homeRecursos = {
  title: 'RECURSOS PARA TU APRENDIZAJE',
  subtitle: 'Material de apoyo para reforzar tu formación y aplicar lo aprendido en tu organización.',
  items: [
    {
      title: 'Manuales',
      description: 'Documentación especializada para reforzar tu formación.',
      color: daColors.blue,
      href: '/recursos',
      linkLabel: 'Ver manuales',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Guías',
      description: 'Material práctico para implementar lo aprendido.',
      color: daColors.teal,
      href: '/recursos',
      linkLabel: 'Ver guías',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Plantillas',
      description: 'Recursos descargables para tu organización.',
      color: daColors.purple,
      href: '/recursos',
      linkLabel: 'Ver plantillas',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Artículos',
      description: 'Contenido actualizado sobre aprendizaje y capacidades.',
      color: daColors.orange,
      href: '/recursos',
      linkLabel: 'Ver artículos',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
    },
  ],
}

/** Tarjetas de la página /recursos (biblioteca pública) */
export const recursosPageItems = [
  {
    title: 'Artículos',
    description: 'Contenidos especializados sobre aprendizaje, capacitación y desarrollo de competencias.',
    color: daColors.orange,
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Guías',
    description: 'Material práctico para implementar programas formativos en organizaciones.',
    color: daColors.teal,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Plantillas',
    description: 'Recursos descargables para planificar y ejecutar iniciativas de formación.',
    color: daColors.purple,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Materiales gratuitos',
    description: 'Contenido de valor para conocer nuestra propuesta antes de contratar un programa.',
    color: daColors.blue,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80',
  },
]
