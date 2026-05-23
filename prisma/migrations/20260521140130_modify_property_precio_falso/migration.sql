/*
  Warnings:

  - Made the column `precio_falso` on table `cursos` required. This step will fail if there are existing NULL values in that column.

*/
-- Update existing NULL values to 0 before altering the table
UPDATE "cursos" SET "precio_falso" = 0 WHERE "precio_falso" IS NULL;

-- AlterTable
ALTER TABLE "cursos" ALTER COLUMN "precio_falso" SET NOT NULL,
ALTER COLUMN "precio_falso" SET DEFAULT 0;
