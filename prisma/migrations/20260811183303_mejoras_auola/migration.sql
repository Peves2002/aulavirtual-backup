-- AlterTable
ALTER TABLE "categorias" ADD COLUMN     "icono" TEXT;

-- AlterTable
ALTER TABLE "cursos" ADD COLUMN     "documento_adicional" TEXT,
ADD COLUMN     "documento_adicional_titulo" TEXT,
ADD COLUMN     "landing_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "landing_bg_image" TEXT,
ADD COLUMN     "landing_flyer_image" TEXT,
ADD COLUMN     "landing_timer" TIMESTAMP(3),
ADD COLUMN     "landing_wsp_link" TEXT,
ADD COLUMN     "numero_asesor" TEXT;
