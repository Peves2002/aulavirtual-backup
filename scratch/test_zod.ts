import { actualizarUsuarioSchema } from './src/schemas/usuario.schema';

const body = { esta_activo: false };
const result = actualizarUsuarioSchema.safeParse(body);

if (!result.success) {
  console.log('VALIDATION FAILED:', result.error.flatten().fieldErrors);
} else {
  console.log('VALIDATION SUCCESS:', result.data);
}
