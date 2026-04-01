-- AlterTable
ALTER TABLE "progreso_leccion" ADD COLUMN     "segundos_vistos" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ultimo_visto_en" TIMESTAMP(3);
