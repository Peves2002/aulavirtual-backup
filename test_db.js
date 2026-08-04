const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const c = await prisma.curso.findFirst();
  console.log('estado_venta:', c.estado_venta);
}

main().finally(() => prisma.$disconnect());
