const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log(Object.keys(prisma))
  console.log('Has leadPortada?', !!prisma.leadPortada)
  if (prisma.leadPortada) {
    console.log(await prisma.leadPortada.count())
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
