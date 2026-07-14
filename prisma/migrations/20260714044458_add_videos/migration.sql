-- AlterEnum
ALTER TYPE "Rol" ADD VALUE 'SUPERVISOR';

-- AlterEnum
ALTER TYPE "TipoCurso" ADD VALUE 'ESPECIALIZACION';

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "titulo" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);
