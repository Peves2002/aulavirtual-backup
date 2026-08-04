const fs = require('fs');
const path = require('path');

const route1 = path.join(__dirname, 'src', 'app', 'api', 'admin', 'articulos', 'route.ts');
let content1 = fs.readFileSync(route1, 'utf8');

// Include etiquetas in GET
content1 = content1.replace(
  'categorias: true',
  'categorias: true,\n        etiquetas: true'
);

// Add fields to POST
content1 = content1.replace(
  'const categoriaIds = data.categorias || []',
  `const categoriaIds = data.categorias || []
    const etiquetaIds = data.etiquetas || []`
);

content1 = content1.replace(
  'categorias: {\n          connect: categoriaIds.map((id: string) => ({ id }))\n        }',
  `categorias: {
          connect: categoriaIds.map((id: string) => ({ id }))
        },
        etiquetas: {
          connect: etiquetaIds.map((id: string) => ({ id }))
        },
        fecha_evento: data.tipo === 'EVENTO' && data.fecha_evento ? new Date(data.fecha_evento) : null,
        hora_evento: data.tipo === 'EVENTO' ? data.hora_evento : null,
        modalidad_evento: data.tipo === 'EVENTO' ? data.modalidad_evento : null,
        expositor: data.tipo === 'EVENTO' ? data.expositor : null,
        link_registro: data.tipo === 'EVENTO' ? data.link_registro : null`
);

fs.writeFileSync(route1, content1, 'utf8');

const route2 = path.join(__dirname, 'src', 'app', 'api', 'admin', 'articulos', '[id]', 'route.ts');
if (fs.existsSync(route2)) {
  let content2 = fs.readFileSync(route2, 'utf8');
  content2 = content2.replace(
    'categorias: true',
    'categorias: true,\n        etiquetas: true'
  );
  
  content2 = content2.replace(
    'const categoriaIds = data.categorias',
    `const categoriaIds = data.categorias
    const etiquetaIds = data.etiquetas`
  );

  const updateData = `        categorias: categoriaIds ? { set: categoriaIds.map((id: string) => ({ id })) } : undefined`;
  
  if (content2.includes(updateData)) {
    content2 = content2.replace(
      updateData,
      `        categorias: categoriaIds ? { set: categoriaIds.map((id: string) => ({ id })) } : undefined,
        etiquetas: etiquetaIds ? { set: etiquetaIds.map((id: string) => ({ id })) } : undefined,
        fecha_evento: data.tipo === 'EVENTO' && data.fecha_evento ? new Date(data.fecha_evento) : null,
        hora_evento: data.tipo === 'EVENTO' ? data.hora_evento : null,
        modalidad_evento: data.tipo === 'EVENTO' ? data.modalidad_evento : null,
        expositor: data.tipo === 'EVENTO' ? data.expositor : null,
        link_registro: data.tipo === 'EVENTO' ? data.link_registro : null`
    );
  }
  
  fs.writeFileSync(route2, content2, 'utf8');
}
