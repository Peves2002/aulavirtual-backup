const axios = require('axios');
async function main() {
  const res = await axios.get('http://localhost:3000/api/web/catalogo?tipo=CURSO');
  console.log(res.data);
}
main();
