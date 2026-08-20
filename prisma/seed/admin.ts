/**
 * Seed de acceso de administrador (login por DNI + contraseña).
 *
 * Crea o actualiza el usuario ADMIN usado para ingresar a /login con
 * numero_documento + contrasena. Pensado para bootstrap en producción,
 * donde no se quiere correr el seed completo (main.ts) con datos demo.
 *
 * Variables de entorno opcionales (si no se definen, usa valores por defecto):
 *   ADMIN_CORREO, ADMIN_DNI, ADMIN_PASSWORD, ADMIN_NOMBRE, ADMIN_APELLIDO, ADMIN_CELULAR
 *
 * Uso: pnpm db:seed:admin
 */
import { PrismaClient, Rol } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seed de acceso de administrador...')

  const correo = process.env.ADMIN_CORREO || 'admin@gmail.com'
  const numero_documento = process.env.ADMIN_DNI || '00000001'
  const password = process.env.ADMIN_PASSWORD || 'Admin123@'
  const nombre = process.env.ADMIN_NOMBRE || 'Administrador'
  const apellido = process.env.ADMIN_APELLIDO || 'Sistema'
  const celular = process.env.ADMIN_CELULAR || '900000001'

  const contrasena = await bcrypt.hash(password, 10)

  const admin = await prisma.usuario.upsert({
    where: { correo },
    update: {
      contrasena,
      numero_documento,
      nombre,
      apellido,
      celular,
      rol: Rol.ADMIN,
      esta_activo: true
    },
    create: {
      correo,
      contrasena,
      numero_documento,
      nombre,
      apellido,
      celular,
      rol: Rol.ADMIN,
      esta_activo: true
    }
  })

  console.log('✅ Administrador listo')
  console.log('')
  console.log('📋 Acceso (login con DNI + contraseña):')
  console.log(`   DNI:        ${admin.numero_documento}`)
  console.log(`   Contraseña: ${password}`)
  console.log(`   Correo:     ${admin.correo}`)
}

main()
  .catch((e: any) => {
    console.error('❌ Error en seed de administrador:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
