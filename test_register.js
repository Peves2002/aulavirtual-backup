const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/register', {
      correo: 'testdep@test.com',
      contrasena: 'Test1234',
      confirmarContrasena: 'Test1234',
      nombre: 'Test',
      apellido: 'Dep',
      numero_documento: '99998888',
      celular: '999888777',
      departamento: 'Lima',
      provincia: 'Lima'
    });
    console.log('User created:', res.data);
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}
test();
