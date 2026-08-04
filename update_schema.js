const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// 1. Add fields to Articulo
const targetLine = '  enlace_externo    String?';
if (schema.includes(targetLine) && !schema.includes('fecha_evento')) {
  schema = schema.replace(
    targetLine,
    `  enlace_externo    String?

  // Campos para Eventos
  fecha_evento      DateTime?
  hora_evento       String?
  modalidad_evento  String?
  expositor         String?
  link_registro     String?
  etiquetas         EtiquetaArticulo[]  @relation("ArticuloEtiquetas")`
  );
}

// 2. Add EtiquetaArticulo model at the end
if (!schema.includes('model EtiquetaArticulo')) {
  schema += `

model EtiquetaArticulo {
  id             String     @id @default(uuid())
  nombre         String     @unique
  slug           String     @unique
  creado_en      DateTime   @default(now())
  actualizado_en DateTime   @updatedAt
  articulos      Articulo[] @relation("ArticuloEtiquetas")

  @@map("etiquetas_articulo")
}
`;
}

fs.writeFileSync(schemaPath, schema, 'utf8');
console.log('Schema updated successfully');
