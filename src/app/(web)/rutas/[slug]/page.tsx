import { notFound } from 'next/navigation'

import { Box } from '@mui/material'

import { AxiosRuta } from '@/features/web/rutas/http/axiosRuta'
import RutaDetail from '@/features/web/rutas/components/RutaDetail'

const axiosRuta = new AxiosRuta()

export default async function RutaDetailPage({ params }: { params: { slug: string } }) {
  try {
    const ruta = await axiosRuta.getBySlug(params.slug)

    if (!ruta) notFound()

    // Serializar Decimal a Number para Client Components
    const serializedRuta = {
      ...ruta,
      precio: ruta.precio ? Number(ruta.precio) : 0,
      precio_falso: ruta.precio_falso ? Number(ruta.precio_falso) : 0,
      cursos: ruta.cursos.map((c: any) => ({
        ...c,
        precio: c.precio ? Number(c.precio) : 0,
        precio_oferta: c.precio_oferta ? Number(c.precio_oferta) : null
      }))
    }

    return (
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <RutaDetail ruta={serializedRuta} />
      </Box>
    )
  } catch {
    notFound()
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const ruta = await axiosRuta.getBySlug(params.slug)

    if (!ruta) return { title: 'Paquete no encontrado' }

    return {
      title: `${ruta.titulo} | Aula Virtual`,
      description: ruta.descripcion || 'Detalles del paquete en nuestra plataforma EdTech.'
    }
  } catch {
    return { title: 'Paquete no encontrado' }
  }
}
