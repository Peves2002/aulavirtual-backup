-- AlterTable
ALTER TABLE "registros_cuota_manual" ADD COLUMN IF NOT EXISTS "fecha_envio" TIMESTAMP(3);

UPDATE "registros_cuota_manual"
SET "fecha_envio" = "creado_en"
WHERE "fecha_envio" IS NULL;

ALTER TABLE "registros_cuota_manual"
ALTER COLUMN "fecha_envio" SET NOT NULL,
ALTER COLUMN "fecha_envio" SET DEFAULT CURRENT_TIMESTAMP;