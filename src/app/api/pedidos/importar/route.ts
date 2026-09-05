import { NextResponse } from 'next/server'

import bcrypt from 'bcryptjs'

import prisma from '@/utils/libs/prisma'
import { requireAuth } from '@/utils/libs/auth-helpers'

interface ImportRow {
  DNI_ESTUDIANTE: string
  CORREO: string
  NOMBRES: string
  APELLIDOS: string
  CELULAR?: string
  CURSO_SLUG: string
  MONTO_PAGADO: number
  METODO_PAGO?: string
}

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized) return auth.error

    if (auth.user.rol !== 'ADMIN') {
      return NextResponse.json({ message: 'No tienes permisos de administrador' }, { status: 403 })
    }

    const { registros } = await request.json() as { registros: ImportRow[] }

    if (!Array.isArray(registros) || registros.length === 0) {
      return NextResponse.json({ message: 'No se enviaron registros válidos' }, { status: 400 })
    }

    let creados = 0
    let errores = 0
    const detallesErrores: string[] = []

    for (let i = 0; i < registros.length; i++) {
      const fila = registros[i]

      try {
        if (!fila.DNI_ESTUDIANTE || !fila.CORREO || !fila.NOMBRES || !fila.APELLIDOS || !fila.CURSO_SLUG) {
          throw new Error('Faltan campos obligatorios en la fila')
        }

        const correo = String(fila.CORREO).toLowerCase().trim()
        const dni = String(fila.DNI_ESTUDIANTE).trim()
        const slug = String(fila.CURSO_SLUG).trim()
        
        // 1. Validar si el curso existe
        const curso = await prisma.curso.findUnique({
          where: { slug }
        })

        if (!curso) throw new Error(`El curso con slug '${slug}' no existe`)

        // 2. Transacción por cada fila
        await prisma.$transaction(async (tx) => {
          // Buscar usuario por correo o DNI
          let usuario = await tx.usuario.findFirst({
            where: {
              OR: [
                { correo },
                { numero_documento: dni }
              ]
            }
          })

          // Si no existe, crearlo
          if (!usuario) {
            const hashedPassword = await bcrypt.hash(dni, 10)

            usuario = await tx.usuario.create({
              data: {
                correo,
                numero_documento: dni,
                nombre: String(fila.NOMBRES).trim(),
                apellido: String(fila.APELLIDOS).trim(),
                celular: fila.CELULAR ? String(fila.CELULAR).trim() : null,
                contrasena: hashedPassword,
                rol: 'ESTUDIANTE'
              }
            })
          }

          // Crear el pedido
          const monto = Number(fila.MONTO_PAGADO) || 0
          
          const pedido = await tx.pedido.create({
            data: {
              usuario_id: usuario.id,
              estado: 'COMPLETADO',
              total: monto,
              pagado_en: new Date(),
              metodo_pago_manual_id: null,
              mensaje: `Importado masivamente - ${fila.METODO_PAGO || 'No especificado'}`
            }
          })

          // Crear Detalle
          await tx.detallePedido.create({
            data: {
              pedido_id: pedido.id,
              curso_id: curso.id,
              tipo_item: 'CURSO',
              cantidad: 1,
              precio_unitario: monto,
              subtotal: monto,
              total: monto
            }
          })

          // Crear o actualizar la inscripción
          const inscripcionExistente = await tx.inscripcion.findFirst({
            where: {
              usuario_id: usuario.id,
              curso_id: curso.id
            }
          })

          if (inscripcionExistente) {
            if (inscripcionExistente.estado !== 'ACTIVO') {
              await tx.inscripcion.update({
                where: { id: inscripcionExistente.id },
                data: { estado: 'ACTIVO', pedido_id: pedido.id }
              })
            }
          } else {
            await tx.inscripcion.create({
              data: {
                usuario_id: usuario.id,
                curso_id: curso.id,
                estado: 'ACTIVO',
                pedido_id: pedido.id
              }
            })
          }
        })
        creados++
      } catch (err: any) {
        errores++
        detallesErrores.push(`Fila ${i + 2} (${fila.CORREO || 'Sin correo'}): ${err.message}`)
      }
    }

    return NextResponse.json({
      success: true,
      creados,
      errores,
      detallesErrores,
      message: `Proceso completado. ${creados} registros creados, ${errores} errores.`
    })

  } catch (error: any) {
    console.error('Error importando pedidos:', error)
    
return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
