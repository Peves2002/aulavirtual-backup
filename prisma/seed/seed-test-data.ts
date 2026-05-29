import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Insertando datos de prueba...')

  const profesor = await prisma.usuario.findFirst({ where: { rol: 'PROFESOR' }, select: { id: true } })
  if (!profesor) throw new Error('No hay ningún profesor en la base de datos. Ejecuta el seed principal primero.')

  const cat1 = await prisma.categoria.upsert({
    where: { slug: 'tecnologia' },
    update: {},
    create: { nombre: 'Tecnología', slug: 'tecnologia', descripcion: 'Cursos de tecnología e informática', esta_activo: true, orden: 1 },
  })

  const cat2 = await prisma.categoria.upsert({
    where: { slug: 'negocios' },
    update: {},
    create: { nombre: 'Negocios', slug: 'negocios', descripcion: 'Cursos de negocios y emprendimiento', esta_activo: true, orden: 2 },
  })

  console.log(`✅ Categorías: ${cat1.nombre}, ${cat2.nombre}`)

  await prisma.curso.upsert({
    where: { slug: 'introduccion-a-la-programacion' },
    update: {},
    create: {
      titulo: 'Introducción a la Programación',
      slug: 'introduccion-a-la-programacion',
      descripcion: 'Aprende los fundamentos de la programación desde cero con ejercicios prácticos.',
      estado: 'PUBLICADO',
      nivel: 'BASICO',
      precio: 99.90,
      es_gratis: false,
      profesor_id: profesor.id,
      categoria_id: cat1.id,
      duracion: '20 horas',
    },
  })

  await prisma.curso.upsert({
    where: { slug: 'emprendimiento-digital' },
    update: {},
    create: {
      titulo: 'Emprendimiento Digital',
      slug: 'emprendimiento-digital',
      descripcion: 'Crea y escala tu negocio digital con estrategias probadas en el mercado.',
      estado: 'PUBLICADO',
      nivel: 'INTERMEDIO',
      precio: 149.90,
      es_gratis: false,
      profesor_id: profesor.id,
      categoria_id: cat2.id,
      duracion: '15 horas',
    },
  })

  console.log('✅ Cursos de prueba creados.')
  console.log('🎉 Listo!')
}

main()
  .catch((e: any) => { console.error('❌ Error:', e.message); process.exit(1) })
  .finally(() => prisma.$disconnect())
