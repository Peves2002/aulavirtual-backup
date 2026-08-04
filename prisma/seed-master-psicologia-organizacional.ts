/**
 * Seed: Máster en Psicología Organizacional
 * Escuela: psicologia-organizacional
 *
 * Uso (cuando la BD esté activa):
 *   pnpm dlx tsx prisma/seed-master-psicologia-organizacional.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Iniciando seed: Máster en Psicología Organizacional...\n')

  // ─── 1. Categoría ────────────────────────────────────────────────────────────
  const categoria = await prisma.categoria.upsert({
    where: { slug: 'psicologia-organizacional' },
    update: {},
    create: {
      nombre: 'Psicología Organizacional',
      slug: 'psicologia-organizacional',
      descripcion: 'Programas especializados en Psicología Organizacional, talento humano y desarrollo del comportamiento en entornos laborales.',
      esta_activo: true,
      orden: 1,
    },
  })
  console.log(`✅ Categoría: ${categoria.nombre} (${categoria.id})`)

  // ─── 2. Profesor/Director del programa ───────────────────────────────────────
  let profesor = await prisma.usuario.findFirst({
    where: { rol: { in: ['ADMIN', 'PROFESOR'] } },
    orderBy: { creado_en: 'asc' },
  })

  if (!profesor) {
    profesor = await prisma.usuario.create({
      data: {
        correo: 'direccion.academica@adphgroup.com',
        nombre: 'Dirección',
        apellido: 'Académica ADPH',
        rol: 'PROFESOR',
        esta_activo: true,
      },
    })
    console.log(`✅ Profesor creado: ${profesor.nombre} ${profesor.apellido}`)
  } else {
    console.log(`✅ Profesor encontrado: ${profesor.nombre} ${profesor.apellido}`)
  }

  // ─── 3. Curso / Programa principal ───────────────────────────────────────────
  const programa = await prisma.curso.upsert({
    where: { slug: 'master-en-psicologia-organizacional' },
    update: {
      titulo: 'Máster en Psicología Organizacional',
      descripcion: 'Programa de formación avanzada para profesionales que buscan especializarse en la gestión del talento humano, el desarrollo organizacional y el liderazgo estratégico.',
      escuela: 'Psicología Organizacional',
      estado: 'PUBLICADO',
      duracion: '12 meses',
      precio: 2990.00,
      precio_falso: 3990.00,
      moneda: 'PEN',
      tipo: 'MAESTRIA',
      nivel: 'AVANZADO',
      tipo_emision: 'ASINCRONO',
      miniatura: '/images/diplomados/diplomado-en-psicologia-organizacional.png',
      orden: 1,
      es_destacado: true,
    },
    create: {
      titulo: 'Máster en Psicología Organizacional',
      slug: 'master-en-psicologia-organizacional',
      descripcion: 'Programa de formación avanzada para profesionales que buscan especializarse en la gestión del talento humano, el desarrollo organizacional y el liderazgo estratégico.',
      escuela: 'Psicología Organizacional',
      estado: 'PUBLICADO',
      duracion: '12 meses',
      precio: 2990.00,
      precio_falso: 3990.00,
      moneda: 'PEN',
      tipo: 'MAESTRIA',
      nivel: 'AVANZADO',
      tipo_emision: 'ASINCRONO',
      miniatura: '/images/diplomados/diplomado-en-psicologia-organizacional.png',
      orden: 1,
      es_destacado: true,
      profesor_id: profesor.id,
      categoria_id: categoria.id,

      beneficios: [
        { texto: 'Certificado de Máster avalado por ADPH Group Executive Education' },
        { texto: 'Acceso a más de 200 horas de contenido multimedia de alta calidad' },
        { texto: 'Sesiones en vivo con expertos del sector corporativo latinoamericano' },
        { texto: 'Acceso de por vida a los materiales del programa' },
        { texto: 'Red de egresados en más de 8 países de Latinoamérica' },
        { texto: 'Mentoring personalizado con profesionales en activo' },
        { texto: 'Bolsa de empleo y networking exclusivo para egresados' },
      ],

      incluye: [
        { texto: 'Material de estudio descargable en PDF y formatos interactivos' },
        { texto: 'Casos prácticos reales de empresas Fortune 500 y líderes de LATAM' },
        { texto: 'Plantillas y herramientas listas para aplicar en tu organización' },
        { texto: 'Simulaciones de Assessment Center y Development Center' },
        { texto: 'Biblioteca digital con recursos actualizados' },
        { texto: 'Acceso a webinars mensuales con directores de RRHH' },
      ],

      metodologia: [
        { texto: 'Aprendizaje basado en casos reales de empresas líderes' },
        { texto: 'Metodología ADPH: Aprender · Aplicar · Transformar' },
        { texto: 'Sesiones sincrónicas de resolución de casos en grupos pequeños' },
        { texto: 'Proyectos integradores aplicados a tu propia organización' },
        { texto: 'Feedback continuo de tutores expertos' },
        { texto: 'Evaluación por competencias, no solo por conocimientos teóricos' },
      ],

      objetivos: [
        { texto: 'Diseñar e implementar estrategias de gestión del talento humano' },
        { texto: 'Aplicar herramientas de evaluación psicolaboral y Assessment Center' },
        { texto: 'Desarrollar programas de desarrollo organizacional y cultura corporativa' },
        { texto: 'Liderar procesos de cambio organizacional con enfoque psicológico' },
        { texto: 'Utilizar People Analytics para la toma de decisiones estratégicas' },
        { texto: 'Diseñar planes de desarrollo y sucesión para talento clave' },
        { texto: 'Implementar programas de clima, bienestar y engagement organizacional' },
      ],

      salidas_profesionales: [
        { texto: 'Director/a de Recursos Humanos' },
        { texto: 'Business Partner de RRHH' },
        { texto: 'Especialista en Gestión del Talento' },
        { texto: 'Consultor/a en Desarrollo Organizacional' },
        { texto: 'Jefe/a de Cultura y Clima Organizacional' },
        { texto: 'Especialista en People Analytics' },
        { texto: 'Responsable de Employer Branding' },
        { texto: 'Coordinador/a de Formación y Desarrollo' },
      ],

      certificaciones: [
        { texto: 'Certificado de Máster en Psicología Organizacional — ADPH Group' },
        { texto: 'Certificado de Especialista en Gestión del Talento Humano' },
        { texto: 'Certificado de Especialista en Assessment Center' },
      ],

      herramientas: [
        { texto: 'Assessment Center ADPH™' },
        { texto: 'Modelos de evaluación por competencias (BEI, DISC, 360°)' },
        { texto: 'People Analytics con Power BI y Google Looker Studio' },
        { texto: 'Herramientas de clima organizacional (Great Place to Work)' },
        { texto: 'Frameworks de Desarrollo Organizacional (McKinsey 7S, OKRs)' },
        { texto: 'Plataformas LMS para gestión de la formación corporativa' },
      ],

      por_que_estudiar: [
        {
          titulo: 'Alta demanda laboral',
          descripcion: 'Los profesionales en psicología organizacional son de los más buscados, con salarios hasta un 35% superiores al promedio del sector.',
        },
        {
          titulo: 'Contenido actualizado al mercado',
          descripcion: 'Nuestro plan de estudios se revisa semestralmente con líderes de RRHH de empresas top.',
        },
        {
          titulo: 'Comunidad de +10,000 egresados',
          descripcion: 'Únete a una red profesional activa que genera oportunidades laborales en toda Latinoamérica.',
        },
        {
          titulo: 'Metodología de impacto real',
          descripcion: 'Cada módulo incluye proyectos que puedes implementar en tu organización desde el primer día.',
        },
      ],

      director: {
        nombre: 'Dr. Carlos Ramírez Vega',
        cargo: 'Director Académico — Escuela de Psicología Organizacional',
        descripcion: 'Psicólogo Organizacional con más de 20 años de experiencia en consultoría de talento humano para empresas de Fortune 500 en Latinoamérica.',
        imagen: '/images/instructores/director-psicologia-organizacional.jpg',
        linkedin: 'https://www.linkedin.com',
      },

      proceso_admision: [
        { paso: 1, titulo: 'Registro de interés', descripcion: 'Completa el formulario de registro con tus datos y motivación.' },
        { paso: 2, titulo: 'Entrevista de admisión', descripcion: 'Un asesor académico revisará tu perfil y realizará una entrevista breve.' },
        { paso: 3, titulo: 'Inscripción formal', descripcion: 'Completa tu matrícula y accede al campus virtual desde el primer día.' },
        { paso: 4, titulo: 'Inducción y bienvenida', descripcion: 'Participa en la sesión de bienvenida y conoce tu plan de estudios.' },
      ],

      requisitos_admision: [
        { texto: 'Título universitario en Psicología, Administración, RRHH o afines' },
        { texto: 'Experiencia profesional mínima de 1 año (deseable en áreas de RRHH)' },
        { texto: 'Motivación para el desarrollo del talento humano y organizaciones' },
        { texto: 'Acceso a internet y dispositivo para el seguimiento de clases' },
      ],

      ayudas_becas: [
        { nombre: 'Beca de Mérito Académico', descripcion: 'Descuento del 30% para egresados universitarios con promedio superior a 15/20.', descuento: '30%' },
        { nombre: 'Beca Corporativa', descripcion: 'Descuentos especiales para empresas que inscriban a más de 3 colaboradores.', descuento: 'Hasta 40%' },
        { nombre: 'Beca de Egresados ADPH', descripcion: 'Descuento exclusivo para egresados de programas anteriores de ADPH Group.', descuento: '20%' },
      ],

      faqs: [
        { pregunta: '¿El programa es 100% online?', respuesta: 'Sí, completamente online con acceso las 24 horas. Las sesiones en vivo quedan grabadas.' },
        { pregunta: '¿Cuánto tiempo debo dedicar por semana?', respuesta: 'Entre 8 y 12 horas semanales, incluyendo clases, lecturas y proyectos.' },
        { pregunta: '¿El certificado tiene reconocimiento internacional?', respuesta: 'Sí, reconocido en más de 8 países de Latinoamérica.' },
        { pregunta: '¿Puedo pagar en cuotas?', respuesta: 'Sí, ofrecemos planes en 3, 6 y 12 cuotas. Consulta con tu asesor.' },
        { pregunta: '¿Hay garantía de satisfacción?', respuesta: 'Ofrecemos 7 días de garantía. Si no quedas conforme, devolvemos el 100%.' },
      ],

      testimonios: [
        {
          nombre: 'Ana Patricia Gutiérrez',
          cargo: 'Gerente de Talento en Grupo Intercorp',
          pais: 'Perú',
          texto: 'El Máster transformó completamente mi visión del talento humano. Apliqué herramientas reales desde el primer módulo.',
          estrellas: 5,
          imagen: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&q=80',
        },
        {
          nombre: 'Miguel Ángel Torres',
          cargo: 'HRBP Senior en Grupo Romero',
          pais: 'Perú',
          texto: 'La calidad de los docentes y la profundidad del contenido superó todas mis expectativas.',
          estrellas: 5,
          imagen: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80',
        },
        {
          nombre: 'Daniela Restrepo',
          cargo: 'Directora de RRHH en Bancolombia',
          pais: 'Colombia',
          texto: 'El enfoque práctico basado en casos reales diferencia a ADPH de cualquier otra propuesta académica.',
          estrellas: 5,
          imagen: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80',
        },
      ],
    },
  })

  console.log(`\n✅ Programa creado/actualizado:`)
  console.log(`   📚 Título:   ${programa.titulo}`)
  console.log(`   🆔 ID:       ${programa.id}`)
  console.log(`   🔗 Slug:     /programas/${programa.slug}`)
  console.log(`   🏫 Escuela:  ${programa.escuela}`)
  console.log(`   💰 Precio:   S/ ${programa.precio}`)
  console.log(`   📅 Duración: ${programa.duracion}`)

  // ─── 4. Módulos del programa ──────────────────────────────────────────────────
  const modulosDatos = [
    { orden: 1, titulo: 'Módulo 1 — Fundamentos de la Psicología Organizacional', descripcion: 'Historia, evolución y marcos teóricos de la psicología en las organizaciones. Diagnóstico y modelos de análisis del comportamiento humano en el trabajo.' },
    { orden: 2, titulo: 'Módulo 2 — Reclutamiento y Selección Estratégica', descripcion: 'Diseño de perfiles por competencias, entrevista conductual estructurada, técnicas de evaluación psicolaboral y Assessment Center.' },
    { orden: 3, titulo: 'Módulo 3 — Gestión del Desempeño y Desarrollo', descripcion: 'Sistemas de evaluación del desempeño (360°, OKRs, KPIs), planes de desarrollo individual y gestión del potencial.' },
    { orden: 4, titulo: 'Módulo 4 — Cultura, Clima y Engagement', descripcion: 'Diagnóstico y transformación cultural, medición del clima organizacional, diseño de iniciativas de bienestar y engagement.' },
    { orden: 5, titulo: 'Módulo 5 — Liderazgo y Desarrollo Organizacional', descripcion: 'Modelos de liderazgo contemporáneo, gestión del cambio, desarrollo de equipos de alto rendimiento y coaching organizacional.' },
    { orden: 6, titulo: 'Módulo 6 — People Analytics e IA en RRHH', descripcion: 'Análisis de datos aplicado a la gestión de personas, dashboards de talento, inteligencia artificial y el futuro del trabajo.' },
    { orden: 7, titulo: 'Módulo 7 — Proyecto Integrador Final', descripcion: 'Aplicación integral de las competencias adquiridas a un caso organizacional real. Presentación ante panel de expertos.' },
  ]

  console.log('\n📦 Creando módulos...')
  for (const mod of modulosDatos) {
    await prisma.modulo.upsert({
      where: { curso_id_orden: { curso_id: programa.id, orden: mod.orden } },
      update: { titulo: mod.titulo, descripcion: mod.descripcion },
      create: { curso_id: programa.id, orden: mod.orden, titulo: mod.titulo, descripcion: mod.descripcion },
    })
    console.log(`   ✅ Módulo ${mod.orden}: ${mod.titulo}`)
  }

  console.log('\n🎉 Seed completado exitosamente!')
  console.log(`\n👉 Escuela:   http://localhost:3000/escuelas/psicologia-organizacional`)
  console.log(`👉 Programa:  http://localhost:3000/programas/master-en-psicologia-organizacional\n`)
}

main()
  .catch(e => {
    console.error('❌ Error en el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
