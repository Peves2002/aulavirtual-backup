const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src/components', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    if (content.includes('<Link=')) {
      content = content.replace(/<Link=/g, '<Link href=');
      changed = true;
    }
    if (content.includes('<Link"')) {
      content = content.replace(/<Link"/g, '<Link href="');
      changed = true;
    }
    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed ' + filePath);
    }
  }
});
