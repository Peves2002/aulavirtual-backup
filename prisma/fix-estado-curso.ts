import prisma from '../src/utils/libs/prisma'

async function main() {
  // Actualiza todos los cursos de Psicologia Organizacional que esten en BORRADOR
  const result = await prisma.curso.updateMany({
    where: {
      escuela: 'Psicología Organizacional',
      estado: 'BORRADOR',
    },
    data: {
      estado: 'PUBLICADO',
    },
  })

  console.log(`? ${result.count} curso(s) publicados en Psicología Organizacional`)
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
