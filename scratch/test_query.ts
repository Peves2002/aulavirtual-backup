import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  try {
    const slug = 'masterclass-completo-demostracion-1787454114137';
    const course = await prisma.curso.findUnique({
      where: {
        slug,
        estado: 'PUBLICADO',
        es_privado: false
      },
      include: {
        profesor: {
          select: { id: true, slug: true, nombre: true, apellido: true, avatar: true, biografia: true, cargo: true }
        },
        categoria: {
          select: { id: true, nombre: true }
        },
        modulos: {
          include: {
            lecciones: {
              where: { estado: 'PUBLICADO' },
              orderBy: { orden: 'asc' }
            }
          },
          orderBy: { orden: 'asc' }
        }
      }
    });
    console.log("Found course:", !!course);
  } catch (error) {
    console.error("PRISMA ERROR:", error);
  }
}
main().finally(() => prisma.$disconnect());
