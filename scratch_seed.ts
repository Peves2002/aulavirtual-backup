import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Find or create a category
  let category = await prisma.categoria.findFirst({
    where: { slug: 'gestion-y-liderazgo' }
  })
  
  if (!category) {
    category = await prisma.categoria.create({
      data: {
        nombre: 'Gestión y Liderazgo',
        slug: 'gestion-y-liderazgo',
        descripcion: 'Cursos de gestión',
      }
    })
  }

  // Assign category to our sample Capacitacion
  await prisma.capacitacion.updateMany({
    where: { slug: 'seguridad-basada-en-el-comportamiento' },
    data: { categoria_id: category.id }
  })

  // Find an admin user to be the instructor of the sample course
  const adminUser = await prisma.usuario.findFirst({
    where: { rol: 'ADMIN' }
  })

  if (!adminUser) {
    console.log('No admin user found, cannot create sample course')
    return
  }

  // Create a sample course
  const sampleCourse = await prisma.curso.upsert({
    where: { slug: 'curso-liderazgo-efectivo-relacionado' },
    update: { categoria: { connect: { id: category.id } } },
    create: {
      titulo: 'Curso Liderazgo Efectivo',
      slug: 'curso-liderazgo-efectivo-relacionado',
      descripcion: 'Aprende a liderar equipos con eficacia y empatía en este curso especializado.',
      miniatura: '/servicios/gestion-empresarial/gestion-empresarial.webp',
      estado: 'PUBLICADO',
      nivel: 'INTERMEDIO',
      tipo: 'CURSO',
      es_gratis: false,
      precio: 150.00,
      moneda: 'PEN',
      categoria: { connect: { id: category.id } },
      profesor: { connect: { id: adminUser.id } },
    }
  })

  console.log('Sample course created:', sampleCourse.titulo)
  console.log('Category assigned to Capacitacion.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
