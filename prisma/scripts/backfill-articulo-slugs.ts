/**
 * Backfill de una sola vez: genera `slug` para los `Articulo` existentes que
 * no tienen uno (se agregó el campo después de que ya existieran artículos).
 * Es idempotente: solo toca filas con `slug IS NULL`.
 *
 * Uso:
 *   npx dotenv -e .env -- npx tsx prisma/scripts/backfill-articulo-slugs.ts
 */
import { PrismaClient } from '@prisma/client'

import { generateUniqueSlug } from '../../src/utils/libs/slug'

const prisma = new PrismaClient()

async function main() {
  // NOTA: schema.prisma ya declara `slug` como obligatorio (fin del backfill en 2 etapas
  // documentado en el plan), por lo que el tipo generado no admite `null` aquí. Este script
  // solo tiene sentido ejecutarlo en el punto intermedio de la migración (slug aún nullable
  // en la BD real), de ahí el cast.
  const pendientes = await prisma.articulo.findMany({
    where: { slug: null as unknown as undefined },
    select: { id: true, titulo: true }
  })

  console.log(`Artículos sin slug: ${pendientes.length}`)

  for (const articulo of pendientes) {
    const slug = await generateUniqueSlug(articulo.titulo, prisma.articulo)

    await prisma.articulo.update({ where: { id: articulo.id }, data: { slug } })
    console.log(`  ${articulo.id} → ${slug}`)
  }

  console.log('Listo.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
