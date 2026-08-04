const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

schema += `

model Articulo {
  id                String         @id @default(uuid())
  titulo            String
  slug              String         @unique
  resumen           String?        @db.Text
  contenido         String         @db.Text
  miniatura         String?
  tipo              TipoArticulo   @default(NOTICIA)
  estado            EstadoArticulo @default(BORRADOR)
  autor             String?
  es_destacado      Boolean        @default(false)
  fecha_publicacion DateTime       @default(now())
  creado_en         DateTime       @default(now())
  actualizado_en    DateTime       @updatedAt
  enlace_externo    String?

  // Campos para Eventos
  fecha_evento      DateTime?
  hora_evento       String?
  modalidad_evento  String?
  expositor         String?
  link_registro     String?

  categorias        CategoriaArticulo[] @relation("ArticuloCategorias")
  etiquetas         EtiquetaArticulo[]  @relation("ArticuloEtiquetas")
  
  @@index([tipo])
  @@index([estado])
  @@map("articulos")
}

enum TipoArticulo {
  NOTICIA
  EVENTO
  EXPERTO
  BLOG
}

enum EstadoArticulo {
  BORRADOR
  PUBLICADO
}

model CategoriaArticulo {
  id             String     @id @default(uuid())
  nombre         String
  slug           String     @unique
  descripcion    String?    @db.Text
  creado_en      DateTime   @default(now())
  actualizado_en DateTime   @updatedAt
  articulos      Articulo[] @relation("ArticuloCategorias")

  @@map("categorias_articulo")
}

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

fs.writeFileSync(schemaPath, schema, 'utf8');
console.log('Restored Articulo and appended changes');
