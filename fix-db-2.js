const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const courseInclude = {
  profesor: { select: { nombre: true, apellido: true, avatar: true } },
  categoria: { select: { id: true, nombre: true } },
  _count: { select: { modulos: true, inscripciones: true } },
}

async function main() {
  await prisma.$executeRawUnsafe('ALTER TABLE "cursos" ADD COLUMN IF NOT EXISTS "landing_active" BOOLEAN NOT NULL DEFAULT false;');
  console.log('landing_active added.');

  try {
    const coursesRaw = await prisma.curso.findMany({
        where: { estado: 'PUBLICADO', tipo: 'CURSO' },
        include: courseInclude,
        orderBy: { creado_en: 'desc' },
        take: 6,
    });
    console.log('Courses success', coursesRaw.length);
  } catch (err) {
    console.error('Error in query:');
    console.error(err);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
