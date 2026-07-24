const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.usuario.findMany({
    where: {
      pedidos: {
        some: {}
      }
    },
    include: {
      pedidos: true
    }
  });
  console.log(users.length);
}
main().catch(console.error).finally(() => prisma.$disconnect());
