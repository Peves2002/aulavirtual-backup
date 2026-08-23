import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const all = await prisma.usuario.findMany({ select: { id: true, nombre: true } });
  console.log('All Users:', all);
}
main().finally(() => prisma.$disconnect());
