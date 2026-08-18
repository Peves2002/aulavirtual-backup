const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cursos = await prisma.curso.findMany({ include: { profesor: true } });
  const invalidProfs = cursos.filter(c => c.profesor && c.profesor.rol !== 'PROFESOR');
  console.log(invalidProfs.map(c => ({ curso: c.nombre, prof: c.profesor.nombre, rol: c.profesor.rol })));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
