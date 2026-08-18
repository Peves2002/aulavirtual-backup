const axios = require('axios');
async function main() {
  try {
    const res = await axios.get('http://localhost:3000/');
    if (res.data.includes('Nuestras Categorías')) {
      console.log('Homepage loads correctly');
    } else {
      console.log('Homepage does not contain categories');
    }
    if (res.data.includes('Next.js (')) {
      console.log('Looks like Next.js error page');
    }
  } catch(e) {
    console.error('Error fetching homepage:', e.message);
    if (e.response && e.response.data) {
       console.log(e.response.data.substring(0, 500));
    }
  }
}
main();
