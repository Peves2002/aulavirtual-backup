const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const courses = await prisma.curso.findMany({
    where: { estado: 'PUBLICADO' },
    select: { id: true, titulo: true, miniatura: true }
  })
  console.log('Courses miniatura values:', JSON.stringify(courses, null, 2))
}

main().catch(console.error).finally(() => prisma.$disconnect())
