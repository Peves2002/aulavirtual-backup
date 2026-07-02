import { PrismaClient } from '@prisma/client'
import { sign } from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET!

async function main() {
  const u = await prisma.usuario.findUnique({ where: { correo: 'jose@gmail.com' } })
  if (!u) return console.log('no user')

  const token = sign(
    { id: u.id, email: u.correo, rol: u.rol, name: `${u.nombre} ${u.apellido}`, numero_documento: u.numero_documento, esta_activo: u.esta_activo },
    JWT_SECRET,
    { expiresIn: '1h' }
  )

  const base = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const slug = 'curso-prueba-evaluaciones'
  const res = await fetch(`${base}/api/estudiante/cursos/${slug}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  console.log('Status:', res.status)
  const body = await res.json()
  console.log(JSON.stringify(body, null, 2).slice(0, 1500))
}

main().finally(() => prisma.$disconnect())
