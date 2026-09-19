const fs = require('fs');
const path = require('path');

const dir = 'd:/Proyectos-fly/manuel/aulavirtual/public/images/convenios';

function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
}

function renameContents(currentPath) {
  const items = fs.readdirSync(currentPath);
  for (const item of items) {
    const fullPath = path.join(currentPath, item);
    
    let baseName = path.parse(item).name;
    const ext = path.parse(item).ext;
    
    // special cleanup for some files based on my list
    if (baseName === 'PRODUCE-800x400') baseName = 'produce';
    if (baseName === 'LOGO_CIPM') baseName = 'logo-cipm';
    if (baseName === 'Laboratorio de higiene y seguridad insdustrial LABIHSI Logo') baseName = 'laboratorio-labihsi';
    if (baseName === 'Camara de Comercio de Lima') baseName = 'camara-de-comercio';

    const newName = toKebabCase(baseName) + ext.toLowerCase();
    
    if (newName !== item) {
       // To handle case-only renames on Windows, we rename to a temp name first
       const tempPath = path.join(currentPath, newName + '.tmp');
       const finalPath = path.join(currentPath, newName);
       fs.renameSync(fullPath, tempPath);
       fs.renameSync(tempPath, finalPath);
       console.log('Renamed:', item, '->', newName);
    }
  }
}

// Rename files inside folders first
fs.readdirSync(dir).forEach(folder => {
  const folderPath = path.join(dir, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    renameContents(folderPath);
  }
});

// Now rename folders
renameContents(dir);
