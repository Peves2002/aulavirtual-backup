import { PrismaClient, Rol } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // ─── USUARIOS ────────────────────────────────────────────────────────────────

  const adminPassword = await bcrypt.hash('Admin123@', 10)

  await prisma.usuario.upsert({
    where: { correo: 'admin@gmail.com' },
    update: {},
    create: {
      correo: 'admin@gmail.com',
      contrasena: adminPassword,
      nombre: 'Administrador',
      apellido: 'Sistema',
      numero_documento: '00000001',
      celular: '900000001',
      rol: Rol.ADMIN,
      esta_activo: true
    }
  })

  const profesorPassword = await bcrypt.hash('Profesor123!', 10)

  const profesor = await prisma.usuario.upsert({
    where: { correo: 'profesor@gmail.com' },
    update: {},
    create: {
      correo: 'profesor@gmail.com',
      contrasena: profesorPassword,
      nombre: 'Juan',
      apellido: 'García',
      numero_documento: '00000002',
      celular: '900000002',
      rol: Rol.PROFESOR,
      esta_activo: true
    }
  })

  const alumnoPassword = await bcrypt.hash('Alumno123!', 10)

  await prisma.usuario.upsert({
    where: { correo: 'alumno@gmail.com' },
    update: {},
    create: {
      correo: 'alumno@gmail.com',
      contrasena: alumnoPassword,
      nombre: 'María',
      apellido: 'López',
      numero_documento: '00000003',
      celular: '900000003',
      rol: Rol.ESTUDIANTE,
      esta_activo: true
    }
  })

  console.log('✅ Usuarios creados')

  // ─── CATEGORÍAS ──────────────────────────────────────────────────────────────

  const catProgramacion = await prisma.categoria.upsert({
    where: { slug: 'programacion' },
    update: {},
    create: {
      nombre: 'Programación',
      slug: 'programacion',
      descripcion: 'Cursos de desarrollo de software y programación',
      esta_activo: true,
      orden: 1
    }
  })

  const catMarketing = await prisma.categoria.upsert({
    where: { slug: 'marketing-digital' },
    update: {},
    create: {
      nombre: 'Marketing Digital',
      slug: 'marketing-digital',
      descripcion: 'Cursos de marketing, redes sociales y publicidad digital',
      esta_activo: true,
      orden: 2
    }
  })

  const catDiseno = await prisma.categoria.upsert({
    where: { slug: 'diseno' },
    update: {},
    create: {
      nombre: 'Diseño',
      slug: 'diseno',
      descripcion: 'Cursos de diseño gráfico, UX/UI y multimedia',
      esta_activo: true,
      orden: 3
    }
  })

  console.log('✅ Categorías creadas')

  // ─── CURSOS ──────────────────────────────────────────────────────────────────

  await prisma.curso.upsert({
    where: { slug: 'introduccion-programacion-python' },
    update: {},
    create: {
      titulo: 'Introducción a la Programación con Python',
      slug: 'introduccion-programacion-python',
      descripcion: 'Aprende los fundamentos de la programación usando Python desde cero.',
      precio: 99.00,
      precio_falso: 149.00,
      moneda: 'PEN',
      nivel: 'BASICO',
      estado: 'PUBLICADO',
      tipo_emision: 'ASINCRONO',
      duracion: '20 horas',
      profesor_id: profesor.id,
      categoria_id: catProgramacion.id,
      objetivos: ['Entender la lógica de programación', 'Escribir scripts en Python', 'Crear proyectos básicos'],
      beneficios: ['Acceso de por vida', 'Certificado al completar', 'Material descargable'],
      modulos: {
        create: [
          {
            titulo: 'Fundamentos de Python',
            orden: 0,
            lecciones: {
              create: [
                {
                  titulo: 'Instalación y configuración del entorno',
                  orden: 0,
                  duracion: 15,
                  video_url: 'https://www.youtube.com/watch?v=example1',
                  es_vista_previa: true
                },
                {
                  titulo: 'Variables y tipos de datos',
                  orden: 1,
                  duracion: 20,
                  video_url: 'https://www.youtube.com/watch?v=example2'
                },
                {
                  titulo: 'Estructuras de control',
                  orden: 2,
                  duracion: 25,
                  video_url: 'https://www.youtube.com/watch?v=example3'
                }
              ]
            }
          },
          {
            titulo: 'Funciones y Módulos',
            orden: 1,
            lecciones: {
              create: [
                {
                  titulo: 'Definición de funciones',
                  orden: 0,
                  duracion: 20,
                  video_url: 'https://www.youtube.com/watch?v=example4'
                },
                {
                  titulo: 'Importando módulos',
                  orden: 1,
                  duracion: 15,
                  video_url: 'https://www.youtube.com/watch?v=example5'
                }
              ]
            }
          }
        ]
      }
    }
  })

  await prisma.curso.upsert({
    where: { slug: 'marketing-digital-redes-sociales' },
    update: {},
    create: {
      titulo: 'Marketing Digital y Redes Sociales',
      slug: 'marketing-digital-redes-sociales',
      descripcion: 'Domina las estrategias de marketing digital para hacer crecer tu negocio.',
      precio: 149.00,
      precio_falso: 199.00,
      moneda: 'PEN',
      nivel: 'INTERMEDIO',
      estado: 'PUBLICADO',
      tipo_emision: 'ASINCRONO',
      duracion: '30 horas',
      profesor_id: profesor.id,
      categoria_id: catMarketing.id,
      objetivos: ['Crear estrategias de contenido', 'Gestionar campañas de ads', 'Analizar métricas'],
      beneficios: ['Acceso de por vida', 'Certificado al completar', 'Plantillas incluidas'],
      modulos: {
        create: [
          {
            titulo: 'Fundamentos del Marketing Digital',
            orden: 0,
            lecciones: {
              create: [
                {
                  titulo: 'Introducción al marketing digital',
                  orden: 0,
                  duracion: 20,
                  video_url: 'https://www.youtube.com/watch?v=example6',
                  es_vista_previa: true
                },
                {
                  titulo: 'El embudo de ventas',
                  orden: 1,
                  duracion: 25,
                  video_url: 'https://www.youtube.com/watch?v=example7'
                }
              ]
            }
          },
          {
            titulo: 'Redes Sociales',
            orden: 1,
            lecciones: {
              create: [
                {
                  titulo: 'Estrategia en Instagram',
                  orden: 0,
                  duracion: 30,
                  video_url: 'https://www.youtube.com/watch?v=example8'
                },
                {
                  titulo: 'Facebook Ads desde cero',
                  orden: 1,
                  duracion: 35,
                  video_url: 'https://www.youtube.com/watch?v=example9'
                }
              ]
            }
          }
        ]
      }
    }
  })

  await prisma.curso.upsert({
    where: { slug: 'diseno-ux-ui-figma' },
    update: {},
    create: {
      titulo: 'Diseño UX/UI con Figma',
      slug: 'diseno-ux-ui-figma',
      descripcion: 'Aprende a diseñar interfaces profesionales y experiencias de usuario con Figma.',
      precio: 129.00,
      precio_falso: 179.00,
      moneda: 'PEN',
      nivel: 'BASICO',
      estado: 'PUBLICADO',
      tipo_emision: 'ASINCRONO',
      duracion: '25 horas',
      profesor_id: profesor.id,
      categoria_id: catDiseno.id,
      objetivos: ['Dominar Figma', 'Crear wireframes y prototipos', 'Aplicar principios UX'],
      beneficios: ['Acceso de por vida', 'Certificado al completar', 'Proyectos prácticos'],
      modulos: {
        create: [
          {
            titulo: 'Introducción a Figma',
            orden: 0,
            lecciones: {
              create: [
                {
                  titulo: 'Interfaz y herramientas básicas',
                  orden: 0,
                  duracion: 20,
                  video_url: 'https://www.youtube.com/watch?v=example10',
                  es_vista_previa: true
                },
                {
                  titulo: 'Componentes y Auto Layout',
                  orden: 1,
                  duracion: 25,
                  video_url: 'https://www.youtube.com/watch?v=example11'
                }
              ]
            }
          },
          {
            titulo: 'Principios UX',
            orden: 1,
            lecciones: {
              create: [
                {
                  titulo: 'Investigación de usuarios',
                  orden: 0,
                  duracion: 30,
                  video_url: 'https://www.youtube.com/watch?v=example12'
                },
                {
                  titulo: 'Wireframes y prototipado',
                  orden: 1,
                  duracion: 35,
                  video_url: 'https://www.youtube.com/watch?v=example13'
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('✅ Cursos creados')

  // ─── DATOS DE CALENDARIO ─────────────────────────────────────────────────────

  // Actualizar fechas de inicio/fin de cursos
  await prisma.curso.update({
    where: { slug: 'introduccion-programacion-python' },
    data: { fecha_inicio: new Date('2026-06-01'), fecha_fin: new Date('2026-08-31') }
  })

  await prisma.curso.update({
    where: { slug: 'marketing-digital-redes-sociales' },
    data: { fecha_inicio: new Date('2026-06-15'), fecha_fin: new Date('2026-09-30') }
  })

  await prisma.curso.update({
    where: { slug: 'diseno-ux-ui-figma' },
    data: { fecha_inicio: new Date('2026-07-01'), fecha_fin: new Date('2026-10-31') }
  })

  // Obtener módulos para añadir clases en vivo
  const moduloPython = await prisma.modulo.findFirst({
    where: { curso: { slug: 'introduccion-programacion-python' } }
  })

  const moduloMarketing = await prisma.modulo.findFirst({
    where: { curso: { slug: 'marketing-digital-redes-sociales' } }
  })

  const moduloFigma = await prisma.modulo.findFirst({
    where: { curso: { slug: 'diseno-ux-ui-figma' } }
  })

  // Clases en vivo — Python
  if (moduloPython) {
    const clasesPython = [
      { titulo: 'Sesión en vivo: Fundamentos de Python', fecha: new Date('2026-06-03T09:00:00'), fin: new Date('2026-06-03T10:30:00'), orden: 10 },
      { titulo: 'Sesión en vivo: Estructuras de datos', fecha: new Date('2026-06-10T09:00:00'), fin: new Date('2026-06-10T10:30:00'), orden: 11 },
      { titulo: 'Sesión en vivo: Funciones avanzadas', fecha: new Date('2026-06-17T09:00:00'), fin: new Date('2026-06-17T10:30:00'), orden: 12 }
    ]

    for (const clase of clasesPython) {
      await prisma.leccion.upsert({
        where: { modulo_id_orden: { modulo_id: moduloPython.id, orden: clase.orden } },
        update: { fecha_programada: clase.fecha, fecha_fin: clase.fin },
        create: {
          modulo_id: moduloPython.id,
          titulo: clase.titulo,
          orden: clase.orden,
          duracion: 90,
          es_en_vivo: true,
          fecha_programada: clase.fecha,
          fecha_fin: clase.fin,
          enlace_reunion: 'https://zoom.us/j/123456789'
        }
      })
    }
  }

  // Clases en vivo — Marketing
  if (moduloMarketing) {
    const clasesMarketing = [
      { titulo: 'Sesión en vivo: Estrategia de contenido', fecha: new Date('2026-06-05T15:00:00'), fin: new Date('2026-06-05T16:30:00'), orden: 10 },
      { titulo: 'Sesión en vivo: Campañas de ads', fecha: new Date('2026-06-19T15:00:00'), fin: new Date('2026-06-19T16:30:00'), orden: 11 }
    ]

    for (const clase of clasesMarketing) {
      await prisma.leccion.upsert({
        where: { modulo_id_orden: { modulo_id: moduloMarketing.id, orden: clase.orden } },
        update: { fecha_programada: clase.fecha, fecha_fin: clase.fin },
        create: {
          modulo_id: moduloMarketing.id,
          titulo: clase.titulo,
          orden: clase.orden,
          duracion: 90,
          es_en_vivo: true,
          fecha_programada: clase.fecha,
          fecha_fin: clase.fin,
          enlace_reunion: 'https://zoom.us/j/987654321'
        }
      })
    }
  }

  // Clases en vivo — Figma
  if (moduloFigma) {
    await prisma.leccion.upsert({
      where: { modulo_id_orden: { modulo_id: moduloFigma.id, orden: 10 } },
      update: { fecha_programada: new Date('2026-07-02T11:00:00'), fecha_fin: new Date('2026-07-02T12:30:00') },
      create: {
        modulo_id: moduloFigma.id,
        titulo: 'Sesión en vivo: Componentes y Design System',
        orden: 10,
        duracion: 90,
        es_en_vivo: true,
        fecha_programada: new Date('2026-07-02T11:00:00'),
        fecha_fin: new Date('2026-07-02T12:30:00'),
        enlace_reunion: 'https://meet.google.com/abc-defg-hij'
      }
    })
  }

  // Exámenes con fechas
  const cursoPython = await prisma.curso.findUnique({ where: { slug: 'introduccion-programacion-python' } })
  const cursoMarketing = await prisma.curso.findUnique({ where: { slug: 'marketing-digital-redes-sociales' } })
  const cursoFigma = await prisma.curso.findUnique({ where: { slug: 'diseno-ux-ui-figma' } })

  if (cursoPython) {
    await prisma.examen.upsert({
      where: { id: 'examen-python-final' },
      update: {},
      create: {
        id: 'examen-python-final',
        titulo: 'Examen Final — Python',
        descripcion: 'Evaluación de todos los fundamentos de Python vistos en el curso.',
        tipo: 'FINAL',
        peso: 100,
        puntaje_aprobacion: 60,
        intentos_maximos: 2,
        esta_publicado: true,
        fecha_inicio: new Date('2026-06-20T10:00:00'),
        fecha_fin: new Date('2026-06-20T11:00:00'),
        curso_id: cursoPython.id
      }
    })
  }

  if (cursoMarketing) {
    await prisma.examen.upsert({
      where: { id: 'examen-marketing-final' },
      update: {},
      create: {
        id: 'examen-marketing-final',
        titulo: 'Examen Final — Marketing Digital',
        descripcion: 'Evalúa tu dominio en estrategias de marketing y redes sociales.',
        tipo: 'FINAL',
        peso: 100,
        puntaje_aprobacion: 70,
        intentos_maximos: 1,
        esta_publicado: true,
        fecha_inicio: new Date('2026-06-25T14:00:00'),
        fecha_fin: new Date('2026-06-25T15:00:00'),
        curso_id: cursoMarketing.id
      }
    })
  }

  if (cursoFigma) {
    await prisma.examen.upsert({
      where: { id: 'examen-figma-final' },
      update: {},
      create: {
        id: 'examen-figma-final',
        titulo: 'Examen Final — UX/UI con Figma',
        descripcion: 'Demuestra tu conocimiento en diseño de interfaces y principios UX.',
        tipo: 'FINAL',
        peso: 100,
        puntaje_aprobacion: 65,
        intentos_maximos: 2,
        esta_publicado: true,
        fecha_inicio: new Date('2026-07-15T10:00:00'),
        fecha_fin: new Date('2026-07-15T11:30:00'),
        curso_id: cursoFigma.id
      }
    })
  }

  console.log('✅ Datos de calendario creados')

  // ─── CUPONES ─────────────────────────────────────────────────────────────────

  await prisma.cupon.upsert({
    where: { codigo: 'BIENVENIDO20' },
    update: {},
    create: {
      codigo: 'BIENVENIDO20',
      valor: 20,
      tipo: 'PORCENTAJE',
      limite_uso: 100,
      esta_activo: true,
      fecha_expiracion: new Date('2027-12-31')
    }
  })

  await prisma.cupon.upsert({
    where: { codigo: 'DESCUENTO50' },
    update: {},
    create: {
      codigo: 'DESCUENTO50',
      valor: 50,
      tipo: 'MONTO_FIJO',
      limite_uso: 50,
      esta_activo: true,
      fecha_expiracion: new Date('2027-12-31')
    }
  })

  console.log('✅ Cupones creados')

  // ─── RECETAS ─────────────────────────────────────────────────────────────────

  await prisma.receta.upsert({
    where: { slug: 'tarta-de-frutas' },
    update: {},
    create: {
      nombre: 'Tarta de Frutas',
      slug: 'tarta-de-frutas',
      descripcion: 'Tarta clásica con base de masa sucreé, crema pastelera y frutas frescas.',
      insumos: [
        {
          grupo: 'Masa Sucreé',
          items: [
            { insumo: 'Harina pastelera', cantidad: '0.200' },
            { insumo: 'Azúcar impalpable', cantidad: '0.100' },
            { insumo: 'Mantequilla sin sal', cantidad: '0.120' },
            { insumo: 'Huevo', cantidad: '0.030' }
          ]
        },
        {
          grupo: 'Crema Pastelera',
          items: [
            { insumo: 'Leche fresca', cantidad: '0.500' },
            { insumo: 'Yema', cantidad: '0.120' },
            { insumo: 'Azúcar blanca', cantidad: '0.120' },
            { insumo: 'Maicena', cantidad: '0.040' },
            { insumo: 'Esencia de vainilla', cantidad: '0.003' },
            { insumo: 'Mantequilla sin sal', cantidad: '0.040' }
          ]
        },
        {
          grupo: 'Montaje',
          items: [
            { insumo: 'Fresa', cantidad: '0.120' },
            { insumo: 'Durazno en conserva', cantidad: '0.120' },
            { insumo: 'Mandarina', cantidad: '0.120' },
            { insumo: 'Arándano', cantidad: '0.060' },
            { insumo: 'Gel neutro', cantidad: '0.080' }
          ]
        }
      ],
      procedimiento: [
        {
          seccion: 'Elaboración de la Masa Sucreé',
          pasos: [
            'Cremar la mantequilla junto con el azúcar impalpable hasta obtener una textura suave y homogénea.',
            'Agregar el huevo e incorporar completamente.',
            'Añadir la harina pastelera y mezclar hasta integrar la masa, evitando sobre trabajarla.',
            'Cubrir la masa y refrigerar durante 20 minutos.'
          ]
        },
        {
          seccion: 'Elaboración de la Crema Pastelera',
          pasos: [
            'Mezclar las yemas con el azúcar blanca y la maicena.',
            'Batir hasta obtener una mezcla homogénea y ligeramente blanqueada. Reservar.',
            'Colocar la leche fresca en una olla y llevar a ebullición.',
            'Temperar la mezcla de yemas agregando parte de la leche caliente lentamente mientras se mezcla constantemente.',
            'Retornar toda la preparación a la olla y cocinar a fuego moderado, removiendo continuamente hasta obtener una crema espesa.',
            'Retirar del fuego y añadir la mantequilla junto con la esencia de vainilla.',
            'Mezclar hasta homogenizar y cubrir a piel para evitar la formación de costra.',
            'Reservar hasta enfriar completamente.'
          ]
        },
        {
          seccion: 'Armado y Cocción',
          pasos: [
            'Fonzar el molde con la masa sucreé.',
            'Colocar papel aluminio y peso sobre la masa para evitar que se infle durante la cocción.',
            'Hornear a 170°C durante 15 a 20 minutos hasta lograr una cocción completa.',
            'Retirar del horno y dejar enfriar.',
            'Colocar la crema pastelera sobre la base de tarta.',
            'Decorar con las frutas: fresa, durazno en conserva, mandarina y arándanos.',
            'Cubrir con gel neutro para aportar brillo y mejor presentación.'
          ]
        }
      ]
    }
  })

  await prisma.receta.upsert({
    where: { slug: 'pye-de-limon' },
    update: {},
    create: {
      nombre: 'Pye de Limón',
      slug: 'pye-de-limon',
      descripcion: 'Clásico pye de limón con base sablé, crema cítrica y merengue suizo dorado.',
      observaciones: 'Para realizar relleno de maracuyá, reemplazar el zumo de limón por maracuyá (0.150 kg).',
      insumos: [
        {
          grupo: 'Masa Sablé',
          items: [
            { insumo: 'Harina pastelera', cantidad: '0.200' },
            { insumo: 'Mantequilla sin sal', cantidad: '0.120' },
            { insumo: 'Azúcar impalpable', cantidad: '0.060' },
            { insumo: 'Sal', cantidad: '0.002' },
            { insumo: 'Huevo', cantidad: '0.024' }
          ]
        },
        {
          grupo: 'Crema de Limón',
          items: [
            { insumo: 'Yema', cantidad: '0.072' },
            { insumo: 'Leche condensada', cantidad: '0.380' },
            { insumo: 'Zumo de limón', cantidad: '0.110' }
          ]
        },
        {
          grupo: 'Merengue Suizo',
          items: [
            { insumo: 'Clara', cantidad: '0.100' },
            { insumo: 'Azúcar blanca', cantidad: '0.150' }
          ]
        }
      ],
      procedimiento: [
        {
          seccion: 'Elaboración de la Masa Sablé',
          pasos: [
            'Arenar la mantequilla con la harina y el azúcar impalpable utilizando un cornet o espátula, hasta obtener una textura similar a la avena.',
            'Incorporar el huevo y mezclar hasta homogenizar la masa.',
            'Cubrir y refrigerar durante 20 minutos.'
          ]
        },
        {
          seccion: 'Elaboración de la Crema de Limón',
          pasos: [
            'Mezclar el zumo de limón con la leche condensada.',
            'Incorporar las yemas y mezclar hasta homogenizar.',
            'Reservar la preparación.'
          ]
        },
        {
          seccion: 'Pre Cocción de la Base',
          pasos: [
            'Fonzar la masa sobre el molde.',
            'Colocar papel aluminio y peso sobre la masa.',
            'Llevar a pre cocción a 170°C durante 10 a 15 minutos.'
          ]
        },
        {
          seccion: 'Cocción del Pye',
          pasos: [
            'Retirar la base del horno y colocar la crema de limón sobre la tarta.',
            'Hornear a 150°C durante 10 a 15 minutos.',
            'Retirar y dejar enfriar.'
          ]
        },
        {
          seccion: 'Elaboración del Merengue Suizo',
          pasos: [
            'Colocar las claras y el azúcar en un bol.',
            'Llevar a baño maría removiendo constantemente hasta alcanzar una temperatura de 55°C a 60°C.',
            'Batir la mezcla durante 10 minutos a velocidad media alta hasta obtener un merengue firme y brillante.'
          ]
        },
        {
          seccion: 'Decoración Final',
          pasos: [
            'Colocar el merengue en una manga pastelera.',
            'Formar picos con ayuda de una boquilla.',
            'Dorar el merengue horneando durante 5 minutos a 180°C o utilizando un soplete.'
          ]
        }
      ]
    }
  })

  console.log('✅ Recetas creadas')

  // ─── RESUMEN ─────────────────────────────────────────────────────────────────

  console.log('')
  console.log('🎉 Seed completado!')
  console.log('')
  console.log('📋 Credenciales:')
  console.log('   Admin:    admin@gmail.com     / Admin123@')
  console.log('   Profesor: profesor@gmail.com  / Profesor123!')
  console.log('   Alumno:   alumno@gmail.com    / Alumno123!')
  console.log('')
  console.log('🎟️  Cupones:')
  console.log('   BIENVENIDO20 → 20% descuento')
  console.log('   DESCUENTO50  → S/. 50 de descuento')
}

main()
  .catch((e: any) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
