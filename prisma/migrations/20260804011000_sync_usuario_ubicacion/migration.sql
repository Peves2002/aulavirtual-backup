-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN IF NOT EXISTS "departamento" TEXT;
ALTER TABLE "usuarios" ADD COLUMN IF NOT EXISTS "provincia" TEXT;