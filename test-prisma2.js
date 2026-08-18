const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const coursesRaw = await prisma.curso.findMany({
      where: { estado: 'PUBLICADO', tipo: 'CURSO' },
      include: {
        profesor: { select: { nombre: true, apellido: true, avatar: true } },
        categoria: { select: { id: true, nombre: true } },
        _count: { select: { modulos: true, inscripciones: true } },
      },
      orderBy: { creado_en: 'desc' },
      take: 6,
    });
    console.log("Cursos Raw:", coursesRaw.length);

    const addLecciones = async (raw) =>
      Promise.all(
        raw.map(async course => {
          const leccionesCount = await prisma.leccion.count({ where: { modulo: { curso_id: course.id } } })
          return { ...course, _count: { ...course._count, lecciones: leccionesCount } }
        })
      );

    const courses = await addLecciones(coursesRaw);
    console.log("Courses parsed:", courses.length);

  } catch (e) {
    console.error("PRISMA ERROR:");
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
