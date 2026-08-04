-- CreateTable
CREATE TABLE "configs_cuota_manual" (
    "id" TEXT NOT NULL,
    "curso_id" TEXT NOT NULL,
    "numero_cuota" INTEGER NOT NULL,
    "modulo_ids" JSONB NOT NULL DEFAULT '[]',
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configs_cuota_manual_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "configs_cuota_manual_curso_id_idx" ON "configs_cuota_manual"("curso_id");

-- CreateIndex
CREATE UNIQUE INDEX "configs_cuota_manual_curso_id_numero_cuota_key" ON "configs_cuota_manual"("curso_id", "numero_cuota");

-- AddForeignKey
ALTER TABLE "configs_cuota_manual" ADD CONSTRAINT "configs_cuota_manual_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;