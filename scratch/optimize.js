const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, '..', 'public', 'images', 'nosotros1.JPG');
const output = path.join(__dirname, '..', 'public', 'images', 'nosotros1.webp');

sharp(input)
  .resize(1280)
  .webp({ quality: 80 })
  .toFile(output)
  .then(info => {
    console.log('Successfully optimized to webp:', info);
  })
  .catch(err => {
    console.error('Error optimizing image:', err);
  });
