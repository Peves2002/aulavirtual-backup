import { PrismaClient } from '@prisma/client'
import { sign } from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET!

async function main() {
  const u = await prisma.usuario.findUnique({
    where: { correo: 'jose@gmail.com' },
    include: {
      inscripciones: {
        where: { estado: 'ACTIVO', curso: { tipo: 'CURSO' } },
        include: { curso: { select: { titulo: true, tipo: true } } },
      },
    },
  })

  if (!u) {
    console.log('Usuario no encontrado')
    return
  }

  console.log('User id:', u.id)
  console.log('Inscripciones CURSO activas:', u.inscripciones.length)
  u.inscripciones.forEach(i => console.log(' -', i.curso.titulo))

  const token = sign(
    {
      id: u.id,
      email: u.correo,
      rol: u.rol,
      name: `${u.nombre} ${u.apellido}`,
      numero_documento: u.numero_documento,
      esta_activo: u.esta_activo,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  )

  const base = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const res = await fetch(`${base}/api/estudiante/mis-cursos?tipo=CURSO`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  console.log('\nAPI status:', res.status)
  const body = await res.json()
  console.log('API courses count:', body?.result?.courses?.length ?? body?.courses?.length ?? 'N/A')
  console.log(JSON.stringify(body, null, 2).slice(0, 800))
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
