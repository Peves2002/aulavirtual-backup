/**
 * Seed demo para Admin Pagos:
 * Ingeniería → Ingeniería Civil → Estudio de suelos
 * + alumno jose@gmail.com inscrito
 *
 * Uso: pnpm db:seed:pagos
 */
import { PrismaClient, Rol, EstadoCurso, EstadoInscripcion } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seed Pagos demo...')

  const profesor =
    (await prisma.usuario.findFirst({ where: { rol: Rol.PROFESOR } })) ||
    (await prisma.usuario.upsert({
      where: { correo: 'profesor@gmail.com' },
      update: {},
      create: {
        correo: 'profesor@gmail.com',
        contrasena: await bcrypt.hash('Profesor123!', 10),
        nombre: 'Juan',
        apellido: 'García',
        numero_documento: '00000002',
        rol: Rol.PROFESOR,
        esta_activo: true
      }
    }))

  const catIngenieria = await prisma.categoria.upsert({
    where: { slug: 'ingenieria' },
    update: { nombre: 'Ingeniería', esta_activo: true, categoria_padre_id: null },
    create: {
      nombre: 'Ingeniería',
      slug: 'ingenieria',
      descripcion: 'Área de ingeniería',
      esta_activo: true,
      orden: 0,
      categoria_padre_id: null
    }
  })

  const catCivil = await prisma.categoria.upsert({
    where: { slug: 'ingenieria-civil' },
    update: {
      nombre: 'Ingeniería Civil',
      esta_activo: true,
      categoria_padre_id: catIngenieria.id
    },
    create: {
      nombre: 'Ingeniería Civil',
      slug: 'ingenieria-civil',
      descripcion: 'Subcategoría de ingeniería civil',
      esta_activo: true,
      orden: 1,
      categoria_padre_id: catIngenieria.id
    }
  })

  const curso = await prisma.curso.upsert({
    where: { slug: 'estudio-de-suelos' },
    update: {
      titulo: 'Estudio de suelos',
      categoria_id: catCivil.id,
      estado: EstadoCurso.PUBLICADO,
      profesor_id: profesor.id
    },
    create: {
      titulo: 'Estudio de suelos',
      slug: 'estudio-de-suelos',
      descripcion: 'Programa demo para registro manual de cuotas',
      estado: EstadoCurso.PUBLICADO,
      es_gratis: false,
      precio: 1800,
      profesor_id: profesor.id,
      categoria_id: catCivil.id,
      orden: 1
    }
  })

  const modulosData = [
    { titulo: 'Módulo 1: Introducción a la mecánica de suelos', orden: 1 },
    { titulo: 'Módulo 2: Ensayos de laboratorio', orden: 2 },
    { titulo: 'Módulo 3: Capacidad portante y cimentaciones', orden: 3 }
  ]

  for (const mod of modulosData) {
    const existing = await prisma.modulo.findFirst({
      where: { curso_id: curso.id, orden: mod.orden }
    })

    if (existing) {
      await prisma.modulo.update({
        where: { id: existing.id },
        data: { titulo: mod.titulo }
      })
    } else {
      const created = await prisma.modulo.create({
        data: {
          titulo: mod.titulo,
          orden: mod.orden,
          curso_id: curso.id
        }
      })

      await prisma.leccion.create({
        data: {
          titulo: `Lección introductoria — ${mod.titulo}`,
          orden: 1,
          modulo_id: created.id,
          contenido: 'Contenido de ejemplo para el módulo.',
          estado: 'PUBLICADO'
        }
      })
    }
  }

  const alumnosPrueba = [
    {
      correo: 'jose@gmail.com',
      password: 'Jose123@',
      nombre: 'José',
      apellido: 'Pérez',
      numero_documento: '12345678',
      celular: '999888777'
    },
    {
      correo: 'maria.suelo@gmail.com',
      password: 'Alumno123@',
      nombre: 'María',
      apellido: 'González',
      numero_documento: '87654321',
      celular: '999888701'
    },
    {
      correo: 'carlos.suelo@gmail.com',
      password: 'Alumno123@',
      nombre: 'Carlos',
      apellido: 'Ramírez',
      numero_documento: '45678912',
      celular: '999888702'
    },
    {
      correo: 'ana.suelo@gmail.com',
      password: 'Alumno123@',
      nombre: 'Ana',
      apellido: 'Torres',
      numero_documento: '78912345',
      celular: '999888703'
    }
  ]

  const inscritos: { id: string; correo: string }[] = []

  for (const alumno of alumnosPrueba) {
    const passwordHash = await bcrypt.hash(alumno.password, 10)
    const user = await prisma.usuario.upsert({
      where: { correo: alumno.correo },
      update: {
        nombre: alumno.nombre,
        apellido: alumno.apellido,
        numero_documento: alumno.numero_documento,
        celular: alumno.celular,
        rol: Rol.ESTUDIANTE,
        esta_activo: true
      },
      create: {
        correo: alumno.correo,
        contrasena: passwordHash,
        nombre: alumno.nombre,
        apellido: alumno.apellido,
        numero_documento: alumno.numero_documento,
        celular: alumno.celular,
        rol: Rol.ESTUDIANTE,
        esta_activo: true
      }
    })

    const insc = await prisma.inscripcion.upsert({
      where: {
        usuario_id_curso_id: {
          usuario_id: user.id,
          curso_id: curso.id
        }
      },
      update: { estado: EstadoInscripcion.ACTIVO },
      create: {
        usuario_id: user.id,
        curso_id: curso.id,
        estado: EstadoInscripcion.ACTIVO
      }
    })

    inscritos.push({ id: insc.id, correo: alumno.correo })

    // Si ya existen tablas de cuota, agregar filas faltantes para este alumno
    const cuotasExistentes = await prisma.registroCuotaManual.findMany({
      where: { curso_id: curso.id },
      distinct: ['numero_cuota'],
      select: { numero_cuota: true }
    })

    for (const { numero_cuota } of cuotasExistentes) {
      await prisma.registroCuotaManual.upsert({
        where: {
          inscripcion_id_numero_cuota: {
            inscripcion_id: insc.id,
            numero_cuota
          }
        },
        update: {},
        create: {
          curso_id: curso.id,
          inscripcion_id: insc.id,
          usuario_id: user.id,
          numero_cuota,
          monto_pago: 0,
          confirmacion: 'NO_ENVIADO'
        }
      })
    }
  }

  console.log('✅ Pagos demo listo')
  console.log('   Categoría: Ingeniería')
  console.log('   Subcategoría: Ingeniería Civil')
  console.log('   Programa: Estudio de suelos')
  console.log('   Alumnos:')
  for (const a of alumnosPrueba) {
    console.log(`   - ${a.correo} / ${a.password} (DNI ${a.numero_documento})`)
  }
}

main()
  .catch((e: any) => {
    console.error('❌ Error seed pagos:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
