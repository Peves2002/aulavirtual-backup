import { EstadoCurso, PrismaClient, EstadoInscripcion, Rol } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando la creación de 9 alumnos de prueba...')
  
  // Contraseña común para los alumnos de prueba: Alumno123!
  const passwordHash = await bcrypt.hash('Alumno123!', 10)

  // Obtener cursos publicados para poder inscribir a los nuevos alumnos
  const cursos = await prisma.curso.findMany({
    where: { estado: EstadoCurso.PUBLICADO }
  })
  console.log(`Encontrados ${cursos.length} cursos publicados para inscripción.`)

  for (let i = 1; i <= 9; i++) {
    const correo = `alumno_test${i}@gmail.com`
    const nombre = `Alumno Test`
    const apellido = `${i}`
    const doc = `9999000${i}`
    const celular = `99990000${i}`

    console.log(`Creando/Actualizando usuario: ${correo}...`)

    const usuario = await prisma.usuario.upsert({
      where: { correo },
      update: {
        nombre,
        apellido,
        numero_documento: doc,
        celular,
        rol: Rol.ESTUDIANTE,
        contrasena: passwordHash,
        esta_activo: true
      },
      create: {
        correo,
        contrasena: passwordHash,
        nombre,
        apellido,
        numero_documento: doc,
        celular,
        rol: Rol.ESTUDIANTE,
        esta_activo: true
      }
    })

    console.log(`Usuario creado/actualizado: ${usuario.correo} (ID: ${usuario.id})`)

    // Inscribir al alumno en los cursos publicados
    for (const curso of cursos) {
      try {
        await prisma.inscripcion.upsert({
          where: {
            usuario_id_curso_id: {
              usuario_id: usuario.id,
              curso_id: curso.id
            }
          },
          update: {
            estado: EstadoInscripcion.ACTIVO
          },
          create: {
            usuario_id: usuario.id,
            curso_id: curso.id,
            estado: EstadoInscripcion.ACTIVO
          }
        })

        // Generar un progreso aleatorio
        const progreso = Math.floor(Math.random() * 100)
        await prisma.progresoCurso.upsert({
          where: {
            usuario_id_curso_id: {
              usuario_id: usuario.id,
              curso_id: curso.id
            }
          },
          update: {
            porcentaje_progreso: progreso
          },
          create: {
            usuario_id: usuario.id,
            curso_id: curso.id,
            porcentaje_progreso: progreso
          }
        })
      } catch (e: any) {
        console.error(`Error inscribiendo a ${correo} en "${curso.titulo}":`, e.message)
      }
    }
  }

  console.log('🎉 9 alumnos creados y matriculados exitosamente.')
}

main()
  .catch((e: any) => {
    console.error('❌ Error ejecutando el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
