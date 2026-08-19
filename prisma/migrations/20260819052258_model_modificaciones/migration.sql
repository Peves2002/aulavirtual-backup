-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('DNI', 'CE', 'PASAPORTE', 'OTRO');

-- AlterEnum
ALTER TYPE "Rol" ADD VALUE 'ASESOR';

-- AlterTable
ALTER TABLE "detalles_pedido" ADD COLUMN     "ruta_id" TEXT;

-- AlterTable
ALTER TABLE "rutas_aprendizaje" ADD COLUMN     "moneda" TEXT NOT NULL DEFAULT 'PEN',
ADD COLUMN     "precio" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "precio_falso" DECIMAL(10,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "tipo_documento" "TipoDocumento" DEFAULT 'DNI';

-- CreateIndex
CREATE INDEX "detalles_pedido_ruta_id_idx" ON "detalles_pedido"("ruta_id");

-- AddForeignKey
ALTER TABLE "detalles_pedido" ADD CONSTRAINT "detalles_pedido_ruta_id_fkey" FOREIGN KEY ("ruta_id") REFERENCES "rutas_aprendizaje"("id") ON DELETE SET NULL ON UPDATE CASCADE;
