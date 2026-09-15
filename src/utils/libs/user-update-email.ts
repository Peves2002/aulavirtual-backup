import type { ActualizarUsuarioDto } from '@/schemas/usuario.schema'

const fieldLabels: Record<keyof ActualizarUsuarioDto, string> = {
  nombre: 'Nombre',
  apellido: 'Apellido',
  correo: 'Correo electrónico',
  numero_documento: 'DNI / Documento',
  celular: 'Celular',
  biografia: 'Descripción / Biografía',
  avatar: 'Foto de perfil',
  cargo: 'Cargo',
  firma: 'Firma',
  rol: 'Rol de usuario',
  esta_activo: 'Estado de la cuenta',
  contrasena: 'Contraseña'
}

export function getChangedUserFields(
  previous: Partial<Record<keyof ActualizarUsuarioDto, unknown>>,
  changes: { [Key in keyof ActualizarUsuarioDto]?: ActualizarUsuarioDto[Key] | null }
) {
  return (Object.keys(fieldLabels) as (keyof ActualizarUsuarioDto)[])
    .filter(key => changes[key] !== undefined && (previous[key] ?? '') !== (changes[key] ?? ''))
    .map(key => fieldLabels[key])
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]!))

export function getUserUpdatedTemplate(customerName: string, fields: string[]) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#333">
      <h1 style="color:#25927F">Tu información ha sido actualizada</h1>
      <p>Hola, ${escapeHtml(customerName)}:</p>
      <p>Un administrador ha actualizado la información de tu cuenta en el aula virtual.</p>
      <p>Se modificaron los siguientes campos:</p>
      <ul>${fields.map(field => `<li>${escapeHtml(field)}</li>`).join('')}</ul>
      <p>Si tienes alguna duda sobre estos cambios, contacta con la administración.</p>
    </div>
  `
}
