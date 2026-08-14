-- CreateEnum
CREATE TYPE "EstadoArticulo" AS ENUM ('BORRADOR', 'PUBLICADO');

-- AlterTable
-- estado se agrega con DEFAULT 'PUBLICADO' para que los articulos existentes
-- (creados antes de este campo) sigan siendo visibles publicamente. El
-- default se cambia a 'BORRADOR' justo despues, asi que solo afecta a las
-- filas existentes; los articulos nuevos naceran en borrador.
ALTER TABLE "articulos" ADD COLUMN     "autor_id" TEXT,
ADD COLUMN     "categoria" TEXT,
ADD COLUMN     "estado" "EstadoArticulo" NOT NULL DEFAULT 'PUBLICADO',
ADD COLUMN     "slug" TEXT,
ALTER COLUMN "archivo_pdf" DROP NOT NULL;

-- Cambia el default para inserts futuros (las filas existentes ya quedaron en PUBLICADO)
ALTER TABLE "articulos" ALTER COLUMN "estado" SET DEFAULT 'BORRADOR';

-- CreateIndex
CREATE UNIQUE INDEX "articulos_slug_key" ON "articulos"("slug");

-- CreateIndex
CREATE INDEX "articulos_estado_idx" ON "articulos"("estado");

-- CreateIndex
CREATE INDEX "articulos_autor_id_idx" ON "articulos"("autor_id");

-- CreateIndex
CREATE INDEX "articulos_categoria_idx" ON "articulos"("categoria");

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
