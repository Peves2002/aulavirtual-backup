import { PrismaClient, Rol } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const correo = 'admin@gmail.com'
  const contrasena = await bcrypt.hash('Admin123@', 10)

  const admin = await prisma.usuario.upsert({
    where: { correo },
    update: {
      contrasena,
      rol: Rol.ADMIN,
      esta_activo: true
    },
    create: {
      correo,
      contrasena,
      nombre: 'Administrador',
      apellido: 'Sistema',
      rol: Rol.ADMIN,
      esta_activo: true
    }
  })

  console.log(`Administrador listo: ${admin.correo}`)
}

main()
  .catch(error => {
    console.error('No se pudo crear el administrador:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
