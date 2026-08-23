import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const cursos = await prisma.curso.findMany({
    select: { titulo: true, slug: true, estado: true, categoria: { select: { nombre: true } } }
  });
  console.dir(cursos, { depth: null });
}
main().finally(() => prisma.$disconnect());
