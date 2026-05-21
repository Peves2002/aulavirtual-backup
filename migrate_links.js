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
    if (content.includes('@tanstack/react-router')) {
      content = content.replace(/import\s+\{([^}]*)Link([^}]*)\}\s+from\s+['"]@tanstack\/react-router['"];?/, (match, p1, p2) => {
        return 'import Link from "next/link";' + (p1.trim() || p2.trim() ? '\n// TODO: fix other imports from @tanstack/react-router: ' + p1 + p2 : '');
      });
      content = content.replace(/<Link([^>]+)to=/g, '<Link=');
      fs.writeFileSync(filePath, content);
      console.log('Updated ' + filePath);
    }
  }
});
