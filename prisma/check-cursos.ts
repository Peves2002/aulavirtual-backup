import prisma from '../src/utils/libs/prisma'

async function main() {
  const cursos = await prisma.curso.findMany({
    where: { escuela: 'Psicología Organizacional' },
    select: { id: true, titulo: true, escuela: true, estado: true, slug: true },
  })

  console.log('\n=== CURSOS DE PSICOLOGIA ORGANIZACIONAL ===\n')
  cursos.forEach((c: any) => {
    console.log(`  Titulo:  ${c.titulo}`)
    console.log(`  escuela: "${c.escuela}"`)
    console.log(`  estado:  ${c.estado}`)
    console.log(`  slug:    ${c.slug}`)
    console.log()
  })

  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })

