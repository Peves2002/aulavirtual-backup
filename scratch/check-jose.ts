import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  for (const correo of ['jose@gmaill.com', 'jose@gmail.com']) {
    const u = await prisma.usuario.findUnique({
      where: { correo },
      include: {
        inscripciones: {
          include: { curso: { select: { titulo: true, slug: true, estado: true, tipo: true } } },
        },
      },
    })

    console.log('\n---', correo, '---')
    if (!u) {
      console.log('NO EXISTE en la BD')
      continue
    }
    console.log('Nombre:', u.nombre, u.apellido)
    console.log('Rol:', u.rol, '| Activo:', u.esta_activo)
    console.log('Inscripciones:', u.inscripciones.length)
    for (const i of u.inscripciones) {
      console.log(`  [${i.estado}] ${i.curso.titulo} (${i.curso.tipo}) vigencia_meses=${i.curso.vigencia_meses ?? 'null'}`)
    }
  }

  const similares = await prisma.usuario.findMany({
    where: { correo: { contains: 'jose', mode: 'insensitive' } },
    select: { correo: true, rol: true, _count: { select: { inscripciones: true } } },
  })
  console.log('\nUsuarios con "jose" en el correo:')
  for (const s of similares) console.log(' ', s.correo, s.rol, 'inscripciones:', s._count.inscripciones)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
