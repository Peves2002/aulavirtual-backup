const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const categorias = await prisma.categoria.findMany({
      where: { esta_activo: true },
      include: {
        cursos: {
          where: { estado: 'PUBLICADO' },
          select: { tipo: true },
        },
      },
      orderBy: { orden: 'asc' },
    });
    console.log("Categorias:", categorias.length);

    const cursosRaw = await prisma.curso.findMany({
      where: { estado: 'PUBLICADO', tipo: 'CURSO' },
      orderBy: { creado_en: 'desc' },
      take: 1,
    });
    console.log("Cursos:", cursosRaw.length);

  } catch (e) {
    console.error("PRISMA ERROR:");
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
