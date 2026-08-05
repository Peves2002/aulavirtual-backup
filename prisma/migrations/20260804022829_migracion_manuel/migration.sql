/*
  Warnings:

  - The values [SINCRONO,MIXTO] on the enum `TipoEmision` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "EstadoVentaCurso" AS ENUM ('ASINCRONICO', 'EN_CONVOCATORIA');

-- CreateEnum
CREATE TYPE "TipoArticulo" AS ENUM ('NOTICIA', 'EVENTO', 'EXPERTO', 'BLOG');

-- CreateEnum
CREATE TYPE "EstadoArticulo" AS ENUM ('BORRADOR', 'PUBLICADO');

-- AlterEnum
BEGIN;
CREATE TYPE "TipoEmision_new" AS ENUM ('EN_VIVO', 'ASINCRONO', 'HIBRIDO');
ALTER TABLE "public"."cursos" ALTER COLUMN "tipo_emision" DROP DEFAULT;
ALTER TABLE "cursos" ALTER COLUMN "tipo_emision" TYPE "TipoEmision_new" USING ("tipo_emision"::text::"TipoEmision_new");
ALTER TYPE "TipoEmision" RENAME TO "TipoEmision_old";
ALTER TYPE "TipoEmision_new" RENAME TO "TipoEmision";
DROP TYPE "public"."TipoEmision_old";
ALTER TABLE "cursos" ALTER COLUMN "tipo_emision" SET DEFAULT 'ASINCRONO';
COMMIT;

-- AlterTable
ALTER TABLE "cursos" ADD COLUMN     "advanced_specializations" JSONB DEFAULT '{}',
ADD COLUMN     "banner_disponibilidad" JSONB DEFAULT '{}',
ADD COLUMN     "codigo_embeber" TEXT,
ADD COLUMN     "estado_venta" "EstadoVentaCurso" NOT NULL DEFAULT 'ASINCRONICO',
ADD COLUMN     "mostrar_advanced_specializations" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "mostrar_banner_disponibilidad" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "mostrar_partners_institucionales" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "partners_institucionales" JSONB DEFAULT '{}';

-- CreateTable
CREATE TABLE "articulos" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "resumen" TEXT,
    "contenido" TEXT NOT NULL,
    "miniatura" TEXT,
    "tipo" "TipoArticulo" NOT NULL DEFAULT 'NOTICIA',
    "estado" "EstadoArticulo" NOT NULL DEFAULT 'BORRADOR',
    "autor" TEXT,
    "es_destacado" BOOLEAN NOT NULL DEFAULT false,
    "fecha_publicacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,
    "enlace_externo" TEXT,
    "fecha_evento" TIMESTAMP(3),
    "hora_evento" TEXT,
    "modalidad_evento" TEXT,
    "expositor" TEXT,
    "link_registro" TEXT,
    "codigo_embeber" TEXT,

    CONSTRAINT "articulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias_articulo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descripcion" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_articulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etiquetas_articulo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "etiquetas_articulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticuloCategorias" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ArticuloCategorias_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ArticuloEtiquetas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ArticuloEtiquetas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "articulos_slug_key" ON "articulos"("slug");

-- CreateIndex
CREATE INDEX "articulos_tipo_idx" ON "articulos"("tipo");

-- CreateIndex
CREATE INDEX "articulos_estado_idx" ON "articulos"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_articulo_slug_key" ON "categorias_articulo"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "etiquetas_articulo_nombre_key" ON "etiquetas_articulo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "etiquetas_articulo_slug_key" ON "etiquetas_articulo"("slug");

-- CreateIndex
CREATE INDEX "_ArticuloCategorias_B_index" ON "_ArticuloCategorias"("B");

-- CreateIndex
CREATE INDEX "_ArticuloEtiquetas_B_index" ON "_ArticuloEtiquetas"("B");

-- AddForeignKey
ALTER TABLE "_ArticuloCategorias" ADD CONSTRAINT "_ArticuloCategorias_A_fkey" FOREIGN KEY ("A") REFERENCES "articulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticuloCategorias" ADD CONSTRAINT "_ArticuloCategorias_B_fkey" FOREIGN KEY ("B") REFERENCES "categorias_articulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticuloEtiquetas" ADD CONSTRAINT "_ArticuloEtiquetas_A_fkey" FOREIGN KEY ("A") REFERENCES "articulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticuloEtiquetas" ADD CONSTRAINT "_ArticuloEtiquetas_B_fkey" FOREIGN KEY ("B") REFERENCES "etiquetas_articulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
