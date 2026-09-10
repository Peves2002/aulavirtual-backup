CREATE TYPE "EstadoBlog" AS ENUM ('BORRADOR', 'PUBLICADO');

CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "extracto" TEXT,
    "contenido" TEXT NOT NULL,
    "miniatura" TEXT,
    "estado" "EstadoBlog" NOT NULL DEFAULT 'BORRADOR',
    "fecha_publicacion" TIMESTAMP(3),
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,
    "autor" TEXT NOT NULL,
    "categoria_id" TEXT,
    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "blogs_slug_key" ON "blogs"("slug");
CREATE INDEX "blogs_categoria_id_idx" ON "blogs"("categoria_id");
CREATE INDEX "blogs_estado_idx" ON "blogs"("estado");
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_categoria_id_fkey"
    FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
