import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  try {
    const usuario = await prisma.usuario.findFirst();
    if (!usuario) {
      console.log('No user found');
      return;
    }
    console.log('Found user:', usuario.id, usuario.esta_activo);
    const updated = await prisma.usuario.update({
      where: { id: usuario.id },
      data: { esta_activo: !usuario.esta_activo }
    });
    console.log('Updated user:', updated.id, updated.esta_activo);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
  }
}
main().finally(() => prisma.$disconnect());
