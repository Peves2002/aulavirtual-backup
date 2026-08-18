const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const courseInclude = {
  profesor: { select: { nombre: true, apellido: true, avatar: true } },
  categoria: { select: { id: true, nombre: true } },
  _count: { select: { modulos: true, inscripciones: true } },
}

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
    console.log('Categorias success', categorias.length);
    
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
main().finally(() => prisma.$disconnect());
