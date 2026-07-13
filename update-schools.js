const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.curso.updateMany({ data: { escuela: 'Psicología Organizacional' } });
  console.log('Updated all to Psicología Organizacional');
}

main().catch(console.error).finally(() => prisma.$disconnect());
