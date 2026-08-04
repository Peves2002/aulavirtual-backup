import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'
import { sendMail } from '@/utils/libs/mailer'
import { getConfigs } from '@/utils/libs/config'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articulo = await prisma.articulo.findUnique({
      where: { id: params.id }
    })

    if (!articulo || articulo.estado !== 'PUBLICADO') {
      return NextResponse.json({ error: 'Artículo no encontrado o no está publicado' }, { status: 404 })
    }

    const suscriptores = await prisma.newsletterSuscriptor.findMany()

    if (suscriptores.length === 0) {
      return NextResponse.json({ error: 'No hay suscriptores a quienes enviar el correo' }, { status: 400 })
    }

    const configs = await getConfigs()
    const siteName = configs.TEMPLATE_NAME?.trim() || 'ADPH Group'
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pad.edu'
    
    const articleUrl = articulo.enlace_externo || `${siteUrl}/noticias/${articulo.slug}`
    const imageUrl = articulo.miniatura || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80'

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #08479b; margin-bottom: 5px;">${siteName}</h1>
          <p style="color: #666; font-size: 14px; margin-top: 0; text-transform: uppercase; letter-spacing: 1px;">Nuevo artículo publicado</p>
        </div>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <a href="${articleUrl}" style="display: block; text-decoration: none;">
            <img src="${imageUrl}" alt="${articulo.titulo}" style="width: 100%; height: auto; max-height: 300px; object-fit: cover; border-bottom: 1px solid #e2e8f0;" />
          </a>
          
          <div style="padding: 24px;">
            <div style="display: inline-block; background-color: #3BA8C5; color: white; padding: 4px 8px; font-size: 11px; font-weight: bold; text-transform: uppercase; border-radius: 4px; margin-bottom: 12px;">
              ${articulo.tipo}
            </div>
            
            <h2 style="margin: 0 0 16px 0; font-size: 22px; color: #0f172a; line-height: 1.3;">
              <a href="${articleUrl}" style="color: #0f172a; text-decoration: none;">${articulo.titulo}</a>
            </h2>
            
            ${articulo.resumen ? `<p style="margin: 0 0 20px 0; font-size: 15px; color: #475569; line-height: 1.5;">${articulo.resumen}</p>` : ''}
            
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="left">
                  <a href="${articleUrl}" style="display: inline-block; background-color: #08479b; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; font-size: 14px;">
                    Leer artículo completo
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </div>
        
        <div style="text-align: center; padding: 24px 0; font-size: 12px; color: #94a3b8;">
          <p>Has recibido este correo porque estás suscrito a nuestro Newsletter.</p>
          <p>&copy; ${new Date().getFullYear()} ${siteName}. Todos los derechos reservados.</p>
        </div>
      </div>
    `

    let envios = 0

    for (const sub of suscriptores) {
      const sent = await sendMail({
        to: sub.email,
        subject: `Nuevo: ${articulo.titulo}`,
        html: htmlContent
      })

      if (sent) envios++
    }

    return NextResponse.json({ success: true, enviados: envios })
  } catch (error) {
    console.error('Error sending emails:', error)
    
return NextResponse.json({ error: 'Error interno del servidor al enviar correos' }, { status: 500 })
  }
}
