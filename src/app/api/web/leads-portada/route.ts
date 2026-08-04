import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { sendMail } from '@/utils/libs/mailer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const { nombres, apellidos, email, celular, pais, ciudad, profesion, detalle, escuela, dni } = body

    // Validation
    if (!nombres || !apellidos || !email || !celular) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const lead = await prisma.leadPortada.create({
      data: {
        nombres,
        apellidos,
        email,
        celular,
        pais,
        ciudad,
        profesion,
        detalle,
        dni: dni || '',
        escuela: escuela || '',
        modalidad: '',
        aceptaDatos: true,
        autorizaPublicidad: true,
      }
    })

    // Enviar correo de confirmación si es un registro de evento
    if (escuela === 'Registro de Evento') {
      try {
        const eventName = detalle.split('Registro al evento: ')[1] || 'Evento'

        await sendMail({
          to: email,
          subject: `Confirmación de Registro: ${eventName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
              <div style="text-align: center; padding: 20px 0; background-color: #08479b; color: white;">
                <h1 style="margin: 0; font-size: 24px;">ADPH Group</h1>
                <p style="margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #e2e8f0;">Confirmación de Registro</p>
              </div>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-top: none; padding: 30px; border-radius: 0 0 8px 8px;">
                <p style="font-size: 16px; margin-top: 0;">Hola <strong>${nombres} ${apellidos}</strong>,</p>
                <p style="font-size: 15px;">Te confirmamos que te has registrado correctamente para el evento:</p>
                
                <div style="background-color: white; border-left: 4px solid #3BA8C5; padding: 15px; margin: 20px 0; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                  <h3 style="margin: 0 0 5px 0; color: #08479b; font-size: 18px;">${eventName}</h3>
                  <p style="margin: 0; color: #666; font-size: 13px;">Registrado el ${new Date().toLocaleDateString('es-PE')}</p>
                </div>
                
                <p style="font-size: 15px;">Pronto te enviaremos los accesos y las instrucciones para participar. Mantente atento a tu correo.</p>
                <p style="font-size: 15px; font-weight: bold; margin-bottom: 0; color: #08479b;">Atentamente,<br/>El equipo de ADPH Group</p>
              </div>
              <div style="text-align: center; padding: 20px 0; font-size: 11px; color: #94a3b8;">
                <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
                <p>&copy; ${new Date().getFullYear()} ADPH Group. Todos los derechos reservados.</p>
              </div>
            </div>
          `
        })
      } catch (mailErr) {
        console.error('Error sending confirmation email:', mailErr)
      }
    }

    return NextResponse.json({ success: true, data: lead })
  } catch (error) {
    console.error('Error creating lead portada:', error)
    
return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const leads = await prisma.leadPortada.findMany({
      orderBy: { creado_en: 'desc' }
    })
    
    return NextResponse.json({ success: true, data: leads })
  } catch (error) {
    console.error('Error fetching leads portada:', error)
    
return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
