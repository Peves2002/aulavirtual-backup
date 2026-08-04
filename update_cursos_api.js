const fs = require('fs');
const path = require('path');

const cursoPost = path.join(__dirname, 'src', 'app', 'api', 'cursos', 'route.ts');
if (fs.existsSync(cursoPost)) {
  let content = fs.readFileSync(cursoPost, 'utf8');
  if (!content.includes('codigo_embeber: data.codigo_embeber')) {
    content = content.replace(
      'brochure: data.brochure,',
      'brochure: data.brochure,\n        codigo_embeber: data.codigo_embeber || null,'
    );
    fs.writeFileSync(cursoPost, content, 'utf8');
    console.log('Curso POST updated');
  }
}

const cursoPut = path.join(__dirname, 'src', 'app', 'api', 'cursos', '[id]', 'route.ts');
if (fs.existsSync(cursoPut)) {
  let content = fs.readFileSync(cursoPut, 'utf8');
  if (!content.includes('codigo_embeber: data.codigo_embeber')) {
    content = content.replace(
      'brochure: data.brochure,',
      'brochure: data.brochure,\n        codigo_embeber: data.codigo_embeber !== undefined ? data.codigo_embeber : undefined,'
    );
    fs.writeFileSync(cursoPut, content, 'utf8');
    console.log('Curso PUT updated');
  }
}
