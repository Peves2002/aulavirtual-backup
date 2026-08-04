-- CreateEnum
CREATE TYPE "EstadoProductoIA" AS ENUM ('BORRADOR', 'PUBLICADO', 'ARCHIVADO');

-- AlterTable
ALTER TABLE "detalles_pedido" ADD COLUMN     "producto_ia_id" TEXT;

-- CreateTable
CREATE TABLE "productos_ia" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descripcion" TEXT,
    "miniatura" TEXT,
    "estado" "EstadoProductoIA" NOT NULL DEFAULT 'BORRADOR',
    "precio" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "precio_falso" DECIMAL(10,2),
    "moneda" TEXT NOT NULL DEFAULT 'USD',
    "es_gratis" BOOLEAN NOT NULL DEFAULT false,
    "categoria" TEXT,
    "url_acceso" TEXT,
    "url_regalo" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productos_ia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inscripciones_gpt" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "producto_ia_id" TEXT NOT NULL,
    "estado" "EstadoInscripcion" NOT NULL DEFAULT 'ACTIVO',
    "inscrito_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inscripciones_gpt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "productos_ia_slug_key" ON "productos_ia"("slug");

-- CreateIndex
CREATE INDEX "productos_ia_estado_idx" ON "productos_ia"("estado");

-- CreateIndex
CREATE INDEX "inscripciones_gpt_usuario_id_idx" ON "inscripciones_gpt"("usuario_id");

-- CreateIndex
CREATE INDEX "inscripciones_gpt_producto_ia_id_idx" ON "inscripciones_gpt"("producto_ia_id");

-- CreateIndex
CREATE UNIQUE INDEX "inscripciones_gpt_usuario_id_producto_ia_id_key" ON "inscripciones_gpt"("usuario_id", "producto_ia_id");

-- CreateIndex
CREATE INDEX "detalles_pedido_producto_ia_id_idx" ON "detalles_pedido"("producto_ia_id");

-- AddForeignKey
ALTER TABLE "inscripciones_gpt" ADD CONSTRAINT "inscripciones_gpt_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripciones_gpt" ADD CONSTRAINT "inscripciones_gpt_producto_ia_id_fkey" FOREIGN KEY ("producto_ia_id") REFERENCES "productos_ia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_pedido" ADD CONSTRAINT "detalles_pedido_producto_ia_id_fkey" FOREIGN KEY ("producto_ia_id") REFERENCES "productos_ia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
