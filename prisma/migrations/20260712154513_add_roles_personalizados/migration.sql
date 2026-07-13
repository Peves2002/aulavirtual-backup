-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "rol_personalizado_id" TEXT;

-- CreateTable
CREATE TABLE "roles_personalizados" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "permisos" TEXT[],
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_personalizados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_personalizados_nombre_key" ON "roles_personalizados"("nombre");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_rol_personalizado_id_fkey" FOREIGN KEY ("rol_personalizado_id") REFERENCES "roles_personalizados"("id") ON DELETE SET NULL ON UPDATE CASCADE;
