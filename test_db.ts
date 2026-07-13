import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categorias = await prisma.categoria.findMany()
  
  const badCats = categorias.filter(c => c.nombre?.includes('<p>'))
  console.log('Categorias:', badCats)
}

main().finally(() => prisma.$disconnect())
