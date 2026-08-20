import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const admins = await prisma.usuario.findMany({
    where: { rol: 'ADMIN' },
    select: { id: true, correo: true, numero_documento: true, esta_activo: true, contrasena: true, actualizado_en: true }
  })

  console.log('ADMINS:', JSON.stringify(admins, null, 2))

  const dniConflict = await prisma.usuario.findUnique({
    where: { numero_documento: '12345678' },
    select: { id: true, correo: true, rol: true, numero_documento: true }
  })

  console.log('DNI 12345678 owner:', JSON.stringify(dniConflict, null, 2))
}

main().finally(() => prisma.$disconnect())
