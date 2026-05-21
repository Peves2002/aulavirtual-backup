const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public/assets/recetas');
const files = fs.readdirSync(dir);

(async () => {
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      const filePath = path.join(dir, file);
      const parsed = path.parse(filePath);
      const newPath = path.join(dir, `${parsed.name}.webp`);
      
      try {
        await sharp(filePath).webp({ quality: 80 }).toFile(newPath);
        fs.unlinkSync(filePath);
        console.log(`Converted ${file}`);
      } catch (e) {
        console.error(`Failed ${file}: ${e.message}`);
      }
    }
  }
})();
