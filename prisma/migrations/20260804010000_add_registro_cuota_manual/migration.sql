-- CreateEnum
CREATE TYPE "ConfirmacionCuota" AS ENUM ('NO_ENVIADO', 'ENVIADO');

-- CreateTable
CREATE TABLE "registros_cuota_manual" (
    "id" TEXT NOT NULL,
    "curso_id" TEXT NOT NULL,
    "inscripcion_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "numero_cuota" INTEGER NOT NULL,
    "monto_pago" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "confirmacion" "ConfirmacionCuota" NOT NULL DEFAULT 'NO_ENVIADO',
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registros_cuota_manual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accesos_modulo_inscripcion" (
    "id" TEXT NOT NULL,
    "inscripcion_id" TEXT NOT NULL,
    "modulo_id" TEXT NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accesos_modulo_inscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "registros_cuota_manual_curso_id_idx" ON "registros_cuota_manual"("curso_id");

-- CreateIndex
CREATE INDEX "registros_cuota_manual_usuario_id_idx" ON "registros_cuota_manual"("usuario_id");

-- CreateIndex
CREATE INDEX "registros_cuota_manual_confirmacion_idx" ON "registros_cuota_manual"("confirmacion");

-- CreateIndex
CREATE UNIQUE INDEX "registros_cuota_manual_inscripcion_id_numero_cuota_key" ON "registros_cuota_manual"("inscripcion_id", "numero_cuota");

-- CreateIndex
CREATE INDEX "accesos_modulo_inscripcion_inscripcion_id_idx" ON "accesos_modulo_inscripcion"("inscripcion_id");

-- CreateIndex
CREATE INDEX "accesos_modulo_inscripcion_modulo_id_idx" ON "accesos_modulo_inscripcion"("modulo_id");

-- CreateIndex
CREATE UNIQUE INDEX "accesos_modulo_inscripcion_inscripcion_id_modulo_id_key" ON "accesos_modulo_inscripcion"("inscripcion_id", "modulo_id");

-- AddForeignKey
ALTER TABLE "registros_cuota_manual" ADD CONSTRAINT "registros_cuota_manual_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_cuota_manual" ADD CONSTRAINT "registros_cuota_manual_inscripcion_id_fkey" FOREIGN KEY ("inscripcion_id") REFERENCES "inscripciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_cuota_manual" ADD CONSTRAINT "registros_cuota_manual_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accesos_modulo_inscripcion" ADD CONSTRAINT "accesos_modulo_inscripcion_inscripcion_id_fkey" FOREIGN KEY ("inscripcion_id") REFERENCES "inscripciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accesos_modulo_inscripcion" ADD CONSTRAINT "accesos_modulo_inscripcion_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "modulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;