import { PrismaClient, Rol } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Crear usuario admin
  const adminPassword = await bcrypt.hash('Admin123@', 10)

  await prisma.usuario.upsert({
    where: { correo: 'admin@gmail.com' },
    update: {},
    create: {
      correo: 'admin@gmail.com',
      contrasena: adminPassword,
      nombre: 'Administrador',
      apellido: 'Sistema',
      numero_documento: '12345678',
      celular: '987654321',
      rol: Rol.ADMIN,
      esta_activo: true
    }
  })

  // Crear usuario profesor
  const profesorPassword = await bcrypt.hash('Profesor123!', 10)

   await prisma.usuario.upsert({
    where: { correo: 'profesor@aulavirtual.com' },
    update: {},
    create: {
      correo: 'profesor@aulavirtual.com',
      contrasena: profesorPassword,
      nombre: 'Juan',
      apellido: 'Profesor',
      numero_documento: '87654321',
      celular: '987654322',
      rol: Rol.PROFESOR,
      esta_activo: true
    }
  })





  // Crear simulacro de prueba
  const simulacro = await prisma.simulacro.upsert({
    where: { slug: 'simulacro-general-aptitud-profesional-ia' },
    update: {},
    create: {
      titulo: 'Simulacro General — Aptitud Profesional con IA',
      slug: 'simulacro-general-aptitud-profesional-ia',
      descripcion: 'Pon a prueba tus conocimientos en IA aplicada a entornos profesionales. Este simulacro cubre herramientas de IA, prompts efectivos, automatización de tareas y uso estratégico de modelos de lenguaje en el trabajo diario.',
      estado: 'PUBLICADO',
      nivel: 'INTERMEDIO',
      duracion: '40',
      numero_preguntas: 5,
      area_tematica: 'Inteligencia Artificial',
      es_gratis: true,
      precio: 0,
      moneda: 'PEN',
    },
  })

  // Agregar preguntas de prueba si no existen
  const existentes = await prisma.preguntaSimulacro.count({ where: { simulacro_id: simulacro.id } })
  if (existentes === 0) {
    const preguntasData = [
      {
        enunciado: '¿Qué significa el acrónimo "IA" en el contexto tecnológico?',
        tema: 'Conceptos Básicos de IA',
        fundamento: 'IA significa "Inteligencia Artificial", rama de la informática que busca crear sistemas capaces de realizar tareas que normalmente requieren inteligencia humana, como aprender, razonar y tomar decisiones.',
        orden: 1,
        opciones: [
          { texto: 'Información Automatizada', es_correcta: false, orden: 0 },
          { texto: 'Inteligencia Artificial', es_correcta: true, orden: 1 },
          { texto: 'Integración Algorítmica', es_correcta: false, orden: 2 },
          { texto: 'Interfaz Avanzada', es_correcta: false, orden: 3 },
        ],
      },
      {
        enunciado: '¿Cuál de los siguientes es un modelo de lenguaje grande (LLM) desarrollado por OpenAI?',
        tema: 'Modelos de Lenguaje',
        fundamento: 'GPT-4 (Generative Pre-trained Transformer 4) es un LLM desarrollado por OpenAI. Gemini es de Google, Claude es de Anthropic y LLaMA es de Meta.',
        orden: 2,
        opciones: [
          { texto: 'Gemini', es_correcta: false, orden: 0 },
          { texto: 'Claude', es_correcta: false, orden: 1 },
          { texto: 'GPT-4', es_correcta: true, orden: 2 },
          { texto: 'LLaMA', es_correcta: false, orden: 3 },
        ],
      },
      {
        enunciado: '¿Qué es un "prompt" en el contexto de los modelos de IA generativa?',
        tema: 'Prompt Engineering',
        fundamento: 'Un prompt es la instrucción o texto de entrada que se le proporciona al modelo de IA para guiar su respuesta. La calidad y precisión del prompt determina directamente la calidad de la respuesta generada.',
        orden: 3,
        opciones: [
          { texto: 'Un archivo de configuración del modelo', es_correcta: false, orden: 0 },
          { texto: 'La instrucción o texto de entrada que guía la respuesta del modelo', es_correcta: true, orden: 1 },
          { texto: 'El resultado generado por la IA', es_correcta: false, orden: 2 },
          { texto: 'Un tipo de red neuronal especializada', es_correcta: false, orden: 3 },
        ],
      },
      {
        enunciado: '¿Cuál es la principal ventaja del "fine-tuning" de un modelo de IA?',
        tema: 'Entrenamiento de Modelos',
        fundamento: 'El fine-tuning permite adaptar un modelo pre-entrenado a un dominio o tarea específica usando un conjunto de datos más pequeño y especializado, logrando mejor rendimiento en ese contexto sin entrenar desde cero.',
        orden: 4,
        opciones: [
          { texto: 'Reduce el tamaño del modelo a la mitad', es_correcta: false, orden: 0 },
          { texto: 'Permite adaptar el modelo a tareas específicas con menos datos', es_correcta: true, orden: 1 },
          { texto: 'Elimina la necesidad de GPU para el entrenamiento', es_correcta: false, orden: 2 },
          { texto: 'Aumenta la velocidad de inferencia en un 100%', es_correcta: false, orden: 3 },
        ],
      },
      {
        enunciado: '¿Qué herramienta de IA permite automatizar flujos de trabajo conectando diferentes aplicaciones sin código?',
        tema: 'Automatización con IA',
        fundamento: 'Zapier es una plataforma de automatización que conecta más de 6,000 aplicaciones mediante "Zaps" (automatizaciones sin código). Make (antes Integromat) cumple una función similar con mayor flexibilidad visual.',
        orden: 5,
        opciones: [
          { texto: 'Midjourney', es_correcta: false, orden: 0 },
          { texto: 'Stable Diffusion', es_correcta: false, orden: 1 },
          { texto: 'Zapier', es_correcta: true, orden: 2 },
          { texto: 'Hugging Face', es_correcta: false, orden: 3 },
        ],
      },
    ]

    for (const pData of preguntasData) {
      const { opciones, ...pregRest } = pData
      await prisma.preguntaSimulacro.create({
        data: { ...pregRest, simulacro_id: simulacro.id, opciones: { create: opciones } },
      })
    }
    await prisma.simulacro.update({ where: { id: simulacro.id }, data: { numero_preguntas: 5 } })
  }

  console.log('✅ Simulacro y preguntas de prueba creadas.')

  // ── Crear usuario alumno de prueba ────────────────────────────────
  const alumnoPassword = await bcrypt.hash('Alumno123!', 10)
  const alumno = await prisma.usuario.upsert({
    where: { correo: 'alumno@gmail.com' },
    update: {},
    create: {
      correo: 'alumno@gmail.com',
      contrasena: alumnoPassword,
      nombre: 'María',
      apellido: 'Estudiante',
      numero_documento: '11223344',
      celular: '987654323',
      rol: Rol.ESTUDIANTE,
      esta_activo: true,
    },
  })

  // Asignar un curso al alumno (primer curso disponible)
  const primerCurso = await prisma.curso.findFirst({ select: { id: true } })
  if (primerCurso) {
    await prisma.inscripcion.upsert({
      where: { usuario_id_curso_id: { usuario_id: alumno.id, curso_id: primerCurso.id } },
      update: {},
      create: {
        usuario_id: alumno.id,
        curso_id: primerCurso.id,
        estado: 'ACTIVO',
      },
    })
    console.log('✅ Curso asignado a alumno@gmail.com')
  }

  // Asignar el simulacro de prueba al alumno
  const primerSimulacro = await prisma.simulacro.findFirst({ select: { id: true } })
  if (primerSimulacro) {
    await (prisma as any).inscripcionSimulacro.upsert({
      where: { usuario_id_simulacro_id: { usuario_id: alumno.id, simulacro_id: primerSimulacro.id } },
      update: {},
      create: {
        usuario_id: alumno.id,
        simulacro_id: primerSimulacro.id,
        estado: 'ACTIVO',
      },
    })
    console.log('✅ Simulacro asignado a alumno@gmail.com')
  }

  console.log('🎉 Seed completado!')
  console.log('')
  console.log('📋 Credenciales de prueba:')
  console.log('   Admin:    admin@gmail.com       / Admin123@')
  console.log('   Profesor: profesor@aulavirtual.com / Profesor123!')
  console.log('   Alumno:   alumno@gmail.com      / Alumno123!')
}

main()
  .catch((e: any) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
