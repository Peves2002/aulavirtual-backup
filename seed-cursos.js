const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.usuario.findFirst({ where: { rol: 'ADMIN' } });
  
  if (!admin) {
    console.log("No admin found to set as instructor.");
    return;
  }

  const category = await prisma.categoria.findFirst();
  let categoryId = category ? category.id : null;
  
  if (!categoryId) {
    const newCat = await prisma.categoria.create({ data: { nombre: 'General', slug: 'general', esta_activo: true, orden: 1 }});
    categoryId = newCat.id;
  }

  const coursesToCreate = [
    {
      titulo: 'Diplomado en Gestión del Clima y Cultura',
      slug: 'diplomado-en-gestion-del-clima-y-cultura',
      descripcion: 'Aprende a gestionar el clima y la cultura organizacional.',
      miniatura: '/images/cursos/evaluacion-y-gestion-del-clima-laboral.png',
      precio: 500,
      moneda: 'PEN',
      es_gratis: false,
      profesor: { connect: { id: admin.id } },
      categoria: { connect: { id: categoryId } },
      nivel: 'INTERMEDIO',
      tipo_emision: 'SINCRONO',
      duracion: '6 meses',
      escuela: 'Psicología Ocupacional',
      estado: 'PUBLICADO',
      tipo: 'DIPLOMADO',
      perfil_estudiante: 'Profesionales de Recursos Humanos y Psicología.',
      salidas_profesionales: JSON.stringify([{ id: '1', texto: 'Jefe de Recursos Humanos' }, { id: '2', texto: 'Consultor de Clima' }]),
    },
    {
      titulo: 'Especialización en Liderazgo Efectivo',
      slug: 'especializacion-liderazgo-efectivo',
      descripcion: 'Desarrolla habilidades directivas para liderar equipos.',
      miniatura: '/images/cursos/creacion-de-equipos-de-alto-rendimiento-con-scrum.jpg',
      precio: 400,
      moneda: 'PEN',
      es_gratis: false,
      profesor: { connect: { id: admin.id } },
      categoria: { connect: { id: categoryId } },
      nivel: 'AVANZADO',
      tipo_emision: 'ASINCRONO',
      duracion: '4 meses',
      escuela: 'Liderazgo y Habilidades Directivas',
      estado: 'PUBLICADO',
      tipo: 'ESPECIALIZACION',
      perfil_estudiante: 'Gerentes y líderes de equipo.',
    },
    {
      titulo: 'Taller de Reclutamiento y Selección',
      slug: 'taller-reclutamiento-seleccion',
      descripcion: 'Técnicas modernas para la selección de talento.',
      miniatura: '/images/cursos/planes-de-desarrollo-y-capacitacion-del-talento-humano.jpg',
      precio: 150,
      moneda: 'PEN',
      es_gratis: false,
      profesor: { connect: { id: admin.id } },
      categoria: { connect: { id: categoryId } },
      nivel: 'BASICO',
      tipo_emision: 'SINCRONO',
      duracion: '2 meses',
      escuela: 'Gestión de RRHH',
      estado: 'PUBLICADO',
      tipo: 'CURSO',
    }
  ];

  for (const c of coursesToCreate) {
    const existing = await prisma.curso.findUnique({ where: { slug: c.slug }});
    if (!existing) {
      await prisma.curso.create({ data: c });
      console.log('Created course:', c.titulo);
    } else {
      await prisma.curso.update({ where: { slug: c.slug }, data: { escuela: c.escuela, estado: 'PUBLICADO' } });
      console.log('Updated course:', c.titulo);
    }
  }

  // Find all existing courses and publish them and assign an escuela if they don't have one
  const allCourses = await prisma.curso.findMany();
  for (const c of allCourses) {
    if (!c.escuela || c.escuela.trim() === '') {
      await prisma.curso.update({
        where: { id: c.id },
        data: { escuela: 'Psicología Ocupacional', estado: 'PUBLICADO' }
      });
      console.log('Updated existing course:', c.titulo, 'to Psicología Ocupacional');
    }
  }

  console.log('Done!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
