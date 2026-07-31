import prisma from '@/utils/libs/prisma'
import FichaInscripcionForm from './FichaInscripcionForm'

export const dynamic = 'force-dynamic'


export const metadata = {
  title: 'Ficha de Inscripción Oficial - ADPH Group',
  description:
    'Completa la ficha de inscripción oficial para diplomados, certificaciones y programas ejecutivos de ADPH Group.'
}

export default async function FichaInscripcionPage() {
  const settings = await prisma.configuracion.findMany({
    where: {
      clave: {
        in: [
          'INSCRIPCION_CONTACTO_DIRECCION',
          'INSCRIPCION_CONTACTO_EMAIL',
          'INSCRIPCION_CONTACTO_TELEFONO',
          'INSCRIPCION_IMPORTANTE_TEXTO'
        ]
      }
    }
  })

  const config = settings.reduce((acc, curr) => {
    acc[curr.clave] = curr.valor
    
return acc
  }, {} as Record<string, string>)

  return <FichaInscripcionForm config={config} />
}
