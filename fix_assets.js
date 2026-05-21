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
    
    // Find all asset imports like: import imgName from "../../assets/path.png"
    const regex = /import\s+(\w+)\s+from\s+['"](?:\.\.\/)+assets\/(.+?)['"];?/g;
    
    content = content.replace(regex, (match, varName, assetPath) => {
      changed = true;
      return 'const ' + varName + ' = "/assets/' + assetPath + '";';
    });
    
    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed assets in ' + filePath);
    }
  }
});
