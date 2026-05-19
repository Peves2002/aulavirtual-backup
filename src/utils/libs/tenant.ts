import { headers } from 'next/headers'

/**
 * Helper para manejar la resolución de multitenancy por dominios.
 * En el futuro, esto consultará la base de datos para validar dominios registrados.
 */
export const getTenantConfig = () => {
  const headersList = headers()
  const host = headersList.get('host') || 'localhost:3000'
  
  // Lógica de mapeo demo/provisional
  // Se puede expandir para obtener configuraciones específicas (colores, logo, id del tenant en DB)
  const tenantConfigs: Record<string, any> = {
    'localhost:3000': {
      id: 'master-academy-tenant',
      name: 'Master Academy',
      domain: 'localhost:3000',
      color_primario: '#025E44',
      color_secundario: '#BDD962',
    },
    'mastergrupodeestudio.com': {
      id: 'master-academy-prod',
      name: 'Master Academy',
      domain: 'mastergrupodeestudio.com',
      color_primario: '#025E44',
      color_secundario: '#BDD962',
    }
  }

  // Si el host no está en el mapa, devolvemos un default o intentamos extraer el subdominio
  const config = tenantConfigs[host] || tenantConfigs['localhost:3000']

  return config
}

/**
 * Obtiene el ID del tenant para filtrar en consultas de base de datos
 */
export const getTenantId = () => {
  return getTenantConfig().id
}
