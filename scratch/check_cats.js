const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cat = await prisma.categoria.findMany({ include: { padre: true } });
  console.log(cat.map(c => ({ nombre: c.nombre, padre: c.padre?.nombre })));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
