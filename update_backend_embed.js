const fs = require('fs');
const path = require('path');

// 1. Update Articulos API
const articuloPost = path.join(__dirname, 'src', 'app', 'api', 'admin', 'articulos', 'route.ts');
if (fs.existsSync(articuloPost)) {
  let content = fs.readFileSync(articuloPost, 'utf8');
  if (!content.includes('codigo_embeber: data.codigo_embeber')) {
    content = content.replace(
      "link_registro: data.tipo === 'EVENTO' ? data.link_registro : null",
      "link_registro: data.tipo === 'EVENTO' ? data.link_registro : null,\n        codigo_embeber: data.codigo_embeber || null"
    );
    fs.writeFileSync(articuloPost, content, 'utf8');
    console.log('Articulo POST updated');
  }
}

const articuloPut = path.join(__dirname, 'src', 'app', 'api', 'admin', 'articulos', '[id]', 'route.ts');
if (fs.existsSync(articuloPut)) {
  let content = fs.readFileSync(articuloPut, 'utf8');
  if (!content.includes('codigo_embeber: data.codigo_embeber')) {
    content = content.replace(
      "link_registro: data.tipo === 'EVENTO' ? data.link_registro : null",
      "link_registro: data.tipo === 'EVENTO' ? data.link_registro : null,\n        codigo_embeber: data.codigo_embeber !== undefined ? data.codigo_embeber : undefined"
    );
    fs.writeFileSync(articuloPut, content, 'utf8');
    console.log('Articulo PUT updated');
  }
}

// 2. Update Cursos API
const cursoPost = path.join(__dirname, 'src', 'app', 'api', 'admin', 'cursos', 'route.ts');
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

const cursoPut = path.join(__dirname, 'src', 'app', 'api', 'admin', 'cursos', '[id]', 'route.ts');
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
