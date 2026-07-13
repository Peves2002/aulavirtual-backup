import type { Session } from 'next-auth'

export interface PermisoDef {
  code: string
  name: string
  description: string
}

export const PERMISOS: PermisoDef[] = [
  { code: 'VER_INSCRIPCIONES', name: 'Ver Inscripciones', description: 'Permite visualizar el listado de alumnos inscritos en los cursos.' },
  { code: 'VER_USUARIOS', name: 'Gestionar Usuarios', description: 'Permite crear, editar, inactivar y asignar roles a los usuarios.' },
  { code: 'VER_CATEGORIAS', name: 'Gestionar Categorías', description: 'Permite organizar y modificar las categorías de los cursos.' },
  { code: 'VER_CURSOS', name: 'Gestionar Cursos', description: 'Permite crear y estructurar cursos, lecciones y materiales.' },
  // { code: 'VER_EBOOKS', name: 'Gestionar Ebooks', description: 'Permite gestionar el catálogo de libros electrónicos.' },
  // { code: 'VER_SIMULACROS', name: 'Gestionar Simulacros', description: 'Permite configurar exámenes de simulacro y sus preguntas.' },
  // { code: 'VER_RUTAS', name: 'Gestionar Rutas de Aprendizaje', description: 'Permite trazar secuencias de aprendizaje de múltiples cursos.' },
  { code: 'VER_PEDIDOS', name: 'Gestionar Pedidos', description: 'Permite auditar las ventas, transacciones y cobros.' },
  { code: 'VER_CUPONES', name: 'Gestionar Cupones', description: 'Permite crear códigos de descuento y campañas promocionales.' },
  { code: 'VER_CERTIFICADOS', name: 'Gestionar Certificados', description: 'Permite personalizar y firmar las plantillas de certificados.' },
  // { code: 'VER_SUSCRIPCIONES', name: 'Gestionar Planes y Suscripciones', description: 'Permite administrar los planes recurrentes y alumnos suscritos.' },
  { code: 'VER_RECLAMACIONES', name: 'Ver Reclamaciones', description: 'Permite leer e responder el Libro de Reclamaciones virtual.' },
  { code: 'VER_CARRUSEL', name: 'Gestionar Carrusel', description: 'Permite subir imágenes de portada al slider principal.' },
  { code: 'EDITAR_CONTENIDO_WEB', name: 'Editar Contenido Web', description: 'Permite actualizar textos, imágenes, testimonios, blogs y noticias visibles en el portal público.' },
  // { code: 'VER_CONFIGURACION', name: 'Configuración del Sistema', description: 'Acceso a ajustes técnicos: branding, pasarelas de pago, integraciones y comportamiento de la plataforma.' }
]

export function hasPermission(session: Session | null | any, permissionCode: string): boolean {
  if (!session || !session.user) return false
  
  // El Administrador Raíz (ADMIN) siempre tiene acceso total
  if (session.user.rol === 'ADMIN') return true
  
  // Asesor de ventas por defecto tiene acceso a Pedidos y Reclamaciones si no tiene rol personalizado
  if (session.user.rol === 'ASESOR' && !session.user.rol_personalizado_nombre) {
    if (permissionCode === 'VER_PEDIDOS' || permissionCode === 'VER_RECLAMACIONES' || permissionCode === 'VER_INSCRIPCIONES') {
      return true
    }
  }

  // Verificar la lista de permisos dinámicos asignados al rol personalizado
  const userPermissions = session.user.permisos || []
  return userPermissions.includes(permissionCode)
}
