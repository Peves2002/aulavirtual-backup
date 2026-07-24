const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const user = await prisma.usuario.findUnique({ where: { correo: 'testdep@test.com' } });
  console.log('User from DB:', user);
}
check().catch(console.error).finally(() => prisma.$disconnect());
