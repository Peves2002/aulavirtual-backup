-- AlterEnum
ALTER TYPE "Rol" ADD VALUE 'ASESOR';

-- AlterTable
ALTER TABLE "cursos" ADD COLUMN     "es_destacado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "escuela" TEXT;

-- CreateTable
CREATE TABLE "leads_portada" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "escuela" TEXT NOT NULL,
    "modalidad" TEXT NOT NULL,
    "aceptaDatos" BOOLEAN NOT NULL,
    "autorizaPublicidad" BOOLEAN NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leads_portada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_slides" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT,
    "imagen_url" TEXT NOT NULL,
    "boton_texto" TEXT NOT NULL DEFAULT 'Más información',
    "boton_url" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "esta_activo" BOOLEAN NOT NULL DEFAULT true,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hero_slides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletter_suscriptores" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_suscriptores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_suscriptores_email_key" ON "newsletter_suscriptores"("email");
