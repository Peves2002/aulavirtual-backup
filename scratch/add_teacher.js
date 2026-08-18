const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);
  
  const newTeacher = await prisma.usuario.create({
    data: {
      correo: 'maria.perez@gmail.com',
      contrasena: hashedPassword,
      nombre: 'María',
      apellido: 'Pérez',
      numero_documento: '99999999',
      celular: '900000003',
      rol: 'PROFESOR',
      esta_activo: true,
      slug: 'maria-perez',
      orden: 1
    }
  });
  console.log('Added teacher:', newTeacher);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
