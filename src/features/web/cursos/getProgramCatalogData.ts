import { AxiosWebCursos } from '@/features/web/cursos/http/axiosWebCursos'
import type { TipoPrograma } from '@/utils/configs/tipoPrograma'

export async function getProgramCatalogData(tipo: TipoPrograma, token: string | null) {
  try {
    const axiosWebCursos = new AxiosWebCursos({ getAuthToken: () => token })
    const data = await axiosWebCursos.getCatalog(tipo)

    const courses = (data.courses || []).map((c: any) => {
      const precio = c.precio ? Number(c.precio) : 0
      const precioOferta = c.precio_oferta ? Number(c.precio_oferta) : null

      return {
        ...c,
        id: c.id,
        slug: c.slug,
        title: c.titulo,
        desc: c.descripcion,
        image: c.miniatura,
        level: c.nivel,
        duration: c.tipo_emision === 'SINCRONO' ? 'En vivo' : 'Asíncrono',
        category: c.categoria?.nombre ?? '',
        price: precioOferta ?? precio,
        oldPrice: precioOferta ? precio : 0,
        precio,
        precio_oferta: precioOferta
      }
    })

    const categories = ['Todos', ...(data.categories || []).map((cat: any) => cat.nombre)]

    return { courses, categories }
  } catch (error) {
    console.error(`Error fetching catalog (${tipo}):`, error)

    return { courses: [], categories: [] }
  }
}
