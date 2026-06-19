-- CreateEnum
CREATE TYPE "IntervaloPlan" AS ENUM ('MENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL');

-- CreateEnum
CREATE TYPE "EstadoSuscripcion" AS ENUM ('PENDIENTE', 'ACTIVO', 'CANCELADO', 'VENCIDO');

-- AlterEnum
ALTER TYPE "TipoCurso" ADD VALUE 'PROGRAMA';

-- CreateTable
CREATE TABLE "planes_suscripcion" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "intervalo" "IntervaloPlan" NOT NULL,
    "culqi_plan_id" TEXT NOT NULL,
    "esta_activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "planes_suscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suscripciones" (
    "id" TEXT NOT NULL,
    "culqi_suscripcion_id" TEXT,
    "estado" "EstadoSuscripcion" NOT NULL DEFAULT 'PENDIENTE',
    "fecha_fin" TIMESTAMP(3),
    "usuario_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "suscripciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "planes_suscripcion_culqi_plan_id_key" ON "planes_suscripcion"("culqi_plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "suscripciones_culqi_suscripcion_id_key" ON "suscripciones"("culqi_suscripcion_id");

-- CreateIndex
CREATE UNIQUE INDEX "suscripciones_usuario_id_plan_id_key" ON "suscripciones"("usuario_id", "plan_id");

-- AddForeignKey
ALTER TABLE "suscripciones" ADD CONSTRAINT "suscripciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suscripciones" ADD CONSTRAINT "suscripciones_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "planes_suscripcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
