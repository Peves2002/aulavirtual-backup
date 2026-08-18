-- CreateEnum
CREATE TYPE "EstadoEbook" AS ENUM ('BORRADOR', 'PUBLICADO', 'ARCHIVADO');

-- CreateEnum
CREATE TYPE "IntervaloSuscripcion" AS ENUM ('MENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL');

-- CreateEnum
CREATE TYPE "EstadoSuscripcion" AS ENUM ('ACTIVA', 'CANCELADA', 'VENCIDA', 'PENDIENTE', 'EN_PRUEBA');

-- CreateEnum
CREATE TYPE "EstadoPagoSuscripcion" AS ENUM ('PENDIENTE', 'COMPLETADO', 'FALLIDO', 'REEMBOLSADO');

-- CreateEnum
CREATE TYPE "EstadoSimulacro" AS ENUM ('BORRADOR', 'PUBLICADO', 'ARCHIVADO');

-- CreateEnum
CREATE TYPE "NivelSimulacro" AS ENUM ('BASICO', 'INTERMEDIO', 'AVANZADO');

-- CreateEnum
CREATE TYPE "TipoActividad" AS ENUM ('ARCHIVO', 'FORMULARIO');

-- AlterEnum
BEGIN;
CREATE TYPE "Rol_new" AS ENUM ('ADMIN', 'PROFESOR', 'ESTUDIANTE');
ALTER TABLE "public"."usuarios" ALTER COLUMN "rol" DROP DEFAULT;
ALTER TABLE "usuarios" ALTER COLUMN "rol" TYPE "Rol_new" USING ("rol"::text::"Rol_new");
ALTER TYPE "Rol" RENAME TO "Rol_old";
ALTER TYPE "Rol_new" RENAME TO "Rol";
DROP TYPE "public"."Rol_old";
ALTER TABLE "usuarios" ALTER COLUMN "rol" SET DEFAULT 'ESTUDIANTE';
COMMIT;

-- AlterEnum
ALTER TYPE "TipoCurso" ADD VALUE 'PROGRAMA';

-- DropForeignKey
ALTER TABLE "detalles_pedido" DROP CONSTRAINT "detalles_pedido_curso_id_fkey";

-- DropIndex
DROP INDEX "certificados_usuario_id_curso_id_tipo_key";

-- DropIndex
DROP INDEX "pedidos_tipo_idx";

-- AlterTable
ALTER TABLE "certificados" DROP COLUMN "tipo",
ADD COLUMN     "numero_intento" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "cursos" DROP COLUMN "certificado_cip_entregas",
DROP COLUMN "certificado_ipg_espera_unidad",
DROP COLUMN "certificado_ipg_espera_valor",
DROP COLUMN "grupo_whatsapp",
DROP COLUMN "precio_certificado_cip",
DROP COLUMN "precio_certificado_ipg",
ADD COLUMN     "documento_adicional" TEXT,
ADD COLUMN     "documento_adicional_titulo" TEXT,
ADD COLUMN     "landing_bg_image" TEXT,
ADD COLUMN     "landing_flyer_image" TEXT,
ADD COLUMN     "landing_timer" TIMESTAMP(3),
ADD COLUMN     "landing_wsp_link" TEXT;

-- AlterTable
ALTER TABLE "detalles_pedido" DROP COLUMN "certificado_tipo",
ADD COLUMN     "ebook_id" TEXT,
ADD COLUMN     "simulacro_id" TEXT,
ADD COLUMN     "tipo_item" TEXT NOT NULL DEFAULT 'CURSO',
ALTER COLUMN "curso_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "inscripciones" DROP COLUMN "certificado_cip_habilitado",
DROP COLUMN "certificado_cip_habilitado_en",
DROP COLUMN "certificado_ipg_habilitado",
DROP COLUMN "certificado_ipg_habilitado_en";

-- AlterTable
ALTER TABLE "lecciones" DROP COLUMN "subtemas",
ADD COLUMN     "es_pdf" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "pedidos" DROP COLUMN "fecha_entrega_estimada",
DROP COLUMN "tipo";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "tipo_documento";

-- DropEnum
DROP TYPE "CertificadoTipo";

-- DropEnum
DROP TYPE "TipoDocumento";

-- DropEnum
DROP TYPE "TipoPedido";

-- CreateTable
CREATE TABLE "ebooks" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descripcion" TEXT,
    "autor" TEXT,
    "miniatura" TEXT,
    "archivo_pdf" TEXT NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "precio_falso" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "moneda" TEXT NOT NULL DEFAULT 'PEN',
    "estado" "EstadoEbook" NOT NULL DEFAULT 'BORRADOR',
    "es_gratis" BOOLEAN NOT NULL DEFAULT false,
    "paginas" INTEGER,
    "genero" TEXT,
    "resena" TEXT,
    "editorial" TEXT,
    "anio_edicion" INTEGER,
    "saga" TEXT,
    "idioma" TEXT DEFAULT 'Espa├▒ol',
    "categoria_id" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ebooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ebook_accesos" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "ebook_id" TEXT NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ebook_accesos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ebook_annotaciones" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "ebook_id" TEXT NOT NULL,
    "pagina" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "texto" TEXT,
    "color" TEXT NOT NULL DEFAULT '#fbbf24',
    "posicion" JSONB NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ebook_annotaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planes_suscripcion" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DECIMAL(10,2) NOT NULL,
    "moneda" TEXT NOT NULL DEFAULT 'PEN',
    "intervalo" "IntervaloSuscripcion" NOT NULL,
    "culqi_interval_unit" INTEGER NOT NULL DEFAULT 1,
    "culqi_interval_count" INTEGER NOT NULL DEFAULT 1,
    "dias_prueba" INTEGER NOT NULL DEFAULT 0,
    "esta_activo" BOOLEAN NOT NULL DEFAULT true,
    "beneficios" JSONB DEFAULT '[]',
    "culqi_plan_id" TEXT,
    "culqi_short_name" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planes_suscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cursos_en_plan" (
    "plan_id" TEXT NOT NULL,
    "curso_id" TEXT NOT NULL,

    CONSTRAINT "cursos_en_plan_pkey" PRIMARY KEY ("plan_id","curso_id")
);

-- CreateTable
CREATE TABLE "suscripciones" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "estado" "EstadoSuscripcion" NOT NULL DEFAULT 'PENDIENTE',
    "culqi_suscripcion_id" TEXT,
    "culqi_customer_id" TEXT,
    "culqi_card_id" TEXT,
    "fecha_inicio" TIMESTAMP(3),
    "fecha_fin" TIMESTAMP(3),
    "fecha_proximo_cobro" TIMESTAMP(3),
    "fecha_cancelacion" TIMESTAMP(3),
    "cancelado_por_usuario" BOOLEAN NOT NULL DEFAULT false,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suscripciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagos_suscripcion" (
    "id" TEXT NOT NULL,
    "suscripcion_id" TEXT NOT NULL,
    "monto" DECIMAL(10,2) NOT NULL,
    "moneda" TEXT NOT NULL DEFAULT 'PEN',
    "estado" "EstadoPagoSuscripcion" NOT NULL DEFAULT 'PENDIENTE',
    "culqi_cargo_id" TEXT,
    "periodo_inicio" TIMESTAMP(3),
    "periodo_fin" TIMESTAMP(3),
    "intentos" INTEGER NOT NULL DEFAULT 0,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pagos_suscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trabajos" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "archivo_url" TEXT,
    "archivo_nombre" TEXT,
    "fecha_inicio" TIMESTAMP(3),
    "fecha_fin" TIMESTAMP(3),
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,
    "leccion_id" TEXT NOT NULL,

    CONSTRAINT "trabajos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entregas_trabajo" (
    "id" TEXT NOT NULL,
    "archivo_url" TEXT NOT NULL,
    "archivo_nombre" TEXT NOT NULL,
    "comentario_estudiante" TEXT,
    "nota" DOUBLE PRECISION,
    "comentario_docente" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,
    "trabajo_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "entregas_trabajo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Simulacro" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descripcion" TEXT,
    "miniatura" TEXT,
    "estado" "EstadoSimulacro" NOT NULL DEFAULT 'BORRADOR',
    "nivel" "NivelSimulacro" NOT NULL DEFAULT 'BASICO',
    "duracion" TEXT,
    "numero_preguntas" INTEGER NOT NULL DEFAULT 0,
    "area_tematica" TEXT,
    "es_gratis" BOOLEAN NOT NULL DEFAULT false,
    "precio" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "moneda" TEXT NOT NULL DEFAULT 'PEN',
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Simulacro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inscripciones_simulacro" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "simulacro_id" TEXT NOT NULL,
    "estado" "EstadoInscripcion" NOT NULL DEFAULT 'ACTIVO',
    "inscrito_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "intentos" INTEGER NOT NULL DEFAULT 0,
    "mejor_puntaje" DOUBLE PRECISION,

    CONSTRAINT "inscripciones_simulacro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreguntaSimulacro" (
    "id" TEXT NOT NULL,
    "simulacro_id" TEXT NOT NULL,
    "enunciado" TEXT NOT NULL,
    "tema" TEXT,
    "fundamento" TEXT,
    "audio_url" TEXT,
    "imagen_url" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PreguntaSimulacro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpcionPreguntaSimulacro" (
    "id" TEXT NOT NULL,
    "pregunta_id" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "es_correcta" BOOLEAN NOT NULL DEFAULT false,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "OpcionPreguntaSimulacro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversaciones" (
    "id" TEXT NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participantes_conversacion" (
    "id" TEXT NOT NULL,
    "conversacion_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "unido_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "participantes_conversacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensajes_chat" (
    "id" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conversacion_id" TEXT NOT NULL,
    "remitente_id" TEXT NOT NULL,
    "adjunto_id" TEXT,

    CONSTRAINT "mensajes_chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actividades" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "instrucciones" TEXT,
    "tipo" "TipoActividad" NOT NULL DEFAULT 'ARCHIVO',
    "orden" INTEGER,
    "fecha_inicio" TIMESTAMP(3),
    "fecha_fin" TIMESTAMP(3),
    "puntaje_maximo" DOUBLE PRECISION NOT NULL DEFAULT 20,
    "esta_publicado" BOOLEAN NOT NULL DEFAULT false,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,
    "curso_id" TEXT NOT NULL,
    "modulo_id" TEXT,

    CONSTRAINT "actividades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preguntas_actividad" (
    "id" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "tipo" "TipoPregunta" NOT NULL DEFAULT 'OPCION_MULTIPLE',
    "puntos" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "orden" INTEGER NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,
    "actividad_id" TEXT NOT NULL,

    CONSTRAINT "preguntas_actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opciones_pregunta_actividad" (
    "id" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "es_correcta" BOOLEAN NOT NULL DEFAULT false,
    "orden" INTEGER NOT NULL,
    "pregunta_id" TEXT NOT NULL,

    CONSTRAINT "opciones_pregunta_actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entregas_actividad" (
    "id" TEXT NOT NULL,
    "archivo_url" TEXT,
    "archivo_nombre" TEXT,
    "comentario_estudiante" TEXT,
    "respuestas" JSONB,
    "nota" DOUBLE PRECISION,
    "comentario_docente" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,
    "actividad_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "entregas_actividad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ebooks_slug_key" ON "ebooks"("slug");

-- CreateIndex
CREATE INDEX "ebooks_categoria_id_idx" ON "ebooks"("categoria_id");

-- CreateIndex
CREATE INDEX "ebooks_estado_idx" ON "ebooks"("estado");

-- CreateIndex
CREATE INDEX "ebook_accesos_usuario_id_idx" ON "ebook_accesos"("usuario_id");

-- CreateIndex
CREATE INDEX "ebook_accesos_ebook_id_idx" ON "ebook_accesos"("ebook_id");

-- CreateIndex
CREATE UNIQUE INDEX "ebook_accesos_usuario_id_ebook_id_key" ON "ebook_accesos"("usuario_id", "ebook_id");

-- CreateIndex
CREATE INDEX "ebook_annotaciones_usuario_id_ebook_id_idx" ON "ebook_annotaciones"("usuario_id", "ebook_id");

-- CreateIndex
CREATE UNIQUE INDEX "planes_suscripcion_culqi_plan_id_key" ON "planes_suscripcion"("culqi_plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "planes_suscripcion_culqi_short_name_key" ON "planes_suscripcion"("culqi_short_name");

-- CreateIndex
CREATE INDEX "planes_suscripcion_esta_activo_idx" ON "planes_suscripcion"("esta_activo");

-- CreateIndex
CREATE INDEX "cursos_en_plan_plan_id_idx" ON "cursos_en_plan"("plan_id");

-- CreateIndex
CREATE INDEX "cursos_en_plan_curso_id_idx" ON "cursos_en_plan"("curso_id");

-- CreateIndex
CREATE UNIQUE INDEX "suscripciones_culqi_suscripcion_id_key" ON "suscripciones"("culqi_suscripcion_id");

-- CreateIndex
CREATE INDEX "suscripciones_usuario_id_idx" ON "suscripciones"("usuario_id");

-- CreateIndex
CREATE INDEX "suscripciones_plan_id_idx" ON "suscripciones"("plan_id");

-- CreateIndex
CREATE INDEX "suscripciones_estado_idx" ON "suscripciones"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "pagos_suscripcion_culqi_cargo_id_key" ON "pagos_suscripcion"("culqi_cargo_id");

-- CreateIndex
CREATE INDEX "pagos_suscripcion_suscripcion_id_idx" ON "pagos_suscripcion"("suscripcion_id");

-- CreateIndex
CREATE INDEX "pagos_suscripcion_estado_idx" ON "pagos_suscripcion"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "trabajos_leccion_id_key" ON "trabajos"("leccion_id");

-- CreateIndex
CREATE INDEX "entregas_trabajo_trabajo_id_idx" ON "entregas_trabajo"("trabajo_id");

-- CreateIndex
CREATE INDEX "entregas_trabajo_usuario_id_idx" ON "entregas_trabajo"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "entregas_trabajo_trabajo_id_usuario_id_key" ON "entregas_trabajo"("trabajo_id", "usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Simulacro_slug_key" ON "Simulacro"("slug");

-- CreateIndex
CREATE INDEX "Simulacro_estado_idx" ON "Simulacro"("estado");

-- CreateIndex
CREATE INDEX "inscripciones_simulacro_usuario_id_idx" ON "inscripciones_simulacro"("usuario_id");

-- CreateIndex
CREATE INDEX "inscripciones_simulacro_simulacro_id_idx" ON "inscripciones_simulacro"("simulacro_id");

-- CreateIndex
CREATE UNIQUE INDEX "inscripciones_simulacro_usuario_id_simulacro_id_key" ON "inscripciones_simulacro"("usuario_id", "simulacro_id");

-- CreateIndex
CREATE INDEX "PreguntaSimulacro_simulacro_id_idx" ON "PreguntaSimulacro"("simulacro_id");

-- CreateIndex
CREATE INDEX "OpcionPreguntaSimulacro_pregunta_id_idx" ON "OpcionPreguntaSimulacro"("pregunta_id");

-- CreateIndex
CREATE INDEX "participantes_conversacion_conversacion_id_idx" ON "participantes_conversacion"("conversacion_id");

-- CreateIndex
CREATE INDEX "participantes_conversacion_usuario_id_idx" ON "participantes_conversacion"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "participantes_conversacion_conversacion_id_usuario_id_key" ON "participantes_conversacion"("conversacion_id", "usuario_id");

-- CreateIndex
CREATE INDEX "mensajes_chat_conversacion_id_idx" ON "mensajes_chat"("conversacion_id");

-- CreateIndex
CREATE INDEX "mensajes_chat_remitente_id_idx" ON "mensajes_chat"("remitente_id");

-- CreateIndex
CREATE INDEX "mensajes_chat_conversacion_id_creado_en_idx" ON "mensajes_chat"("conversacion_id", "creado_en");

-- CreateIndex
CREATE INDEX "actividades_curso_id_idx" ON "actividades"("curso_id");

-- CreateIndex
CREATE INDEX "actividades_modulo_id_idx" ON "actividades"("modulo_id");

-- CreateIndex
CREATE INDEX "preguntas_actividad_actividad_id_idx" ON "preguntas_actividad"("actividad_id");

-- CreateIndex
CREATE INDEX "opciones_pregunta_actividad_pregunta_id_idx" ON "opciones_pregunta_actividad"("pregunta_id");

-- CreateIndex
CREATE INDEX "entregas_actividad_actividad_id_idx" ON "entregas_actividad"("actividad_id");

-- CreateIndex
CREATE INDEX "entregas_actividad_usuario_id_idx" ON "entregas_actividad"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "entregas_actividad_actividad_id_usuario_id_key" ON "entregas_actividad"("actividad_id", "usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_usuario_id_curso_id_key" ON "certificados"("usuario_id", "curso_id");

-- CreateIndex
CREATE INDEX "detalles_pedido_ebook_id_idx" ON "detalles_pedido"("ebook_id");

-- CreateIndex
CREATE INDEX "detalles_pedido_simulacro_id_idx" ON "detalles_pedido"("simulacro_id");

-- AddForeignKey
ALTER TABLE "ebooks" ADD CONSTRAINT "ebooks_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ebook_accesos" ADD CONSTRAINT "ebook_accesos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ebook_accesos" ADD CONSTRAINT "ebook_accesos_ebook_id_fkey" FOREIGN KEY ("ebook_id") REFERENCES "ebooks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ebook_annotaciones" ADD CONSTRAINT "ebook_annotaciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ebook_annotaciones" ADD CONSTRAINT "ebook_annotaciones_ebook_id_fkey" FOREIGN KEY ("ebook_id") REFERENCES "ebooks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_pedido" ADD CONSTRAINT "detalles_pedido_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "cursos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_pedido" ADD CONSTRAINT "detalles_pedido_ebook_id_fkey" FOREIGN KEY ("ebook_id") REFERENCES "ebooks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_pedido" ADD CONSTRAINT "detalles_pedido_simulacro_id_fkey" FOREIGN KEY ("simulacro_id") REFERENCES "Simulacro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cursos_en_plan" ADD CONSTRAINT "cursos_en_plan_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "planes_suscripcion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cursos_en_plan" ADD CONSTRAINT "cursos_en_plan_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suscripciones" ADD CONSTRAINT "suscripciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suscripciones" ADD CONSTRAINT "suscripciones_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "planes_suscripcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagos_suscripcion" ADD CONSTRAINT "pagos_suscripcion_suscripcion_id_fkey" FOREIGN KEY ("suscripcion_id") REFERENCES "suscripciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trabajos" ADD CONSTRAINT "trabajos_leccion_id_fkey" FOREIGN KEY ("leccion_id") REFERENCES "lecciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entregas_trabajo" ADD CONSTRAINT "entregas_trabajo_trabajo_id_fkey" FOREIGN KEY ("trabajo_id") REFERENCES "trabajos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entregas_trabajo" ADD CONSTRAINT "entregas_trabajo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripciones_simulacro" ADD CONSTRAINT "inscripciones_simulacro_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripciones_simulacro" ADD CONSTRAINT "inscripciones_simulacro_simulacro_id_fkey" FOREIGN KEY ("simulacro_id") REFERENCES "Simulacro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreguntaSimulacro" ADD CONSTRAINT "PreguntaSimulacro_simulacro_id_fkey" FOREIGN KEY ("simulacro_id") REFERENCES "Simulacro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpcionPreguntaSimulacro" ADD CONSTRAINT "OpcionPreguntaSimulacro_pregunta_id_fkey" FOREIGN KEY ("pregunta_id") REFERENCES "PreguntaSimulacro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participantes_conversacion" ADD CONSTRAINT "participantes_conversacion_conversacion_id_fkey" FOREIGN KEY ("conversacion_id") REFERENCES "conversaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participantes_conversacion" ADD CONSTRAINT "participantes_conversacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensajes_chat" ADD CONSTRAINT "mensajes_chat_conversacion_id_fkey" FOREIGN KEY ("conversacion_id") REFERENCES "conversaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensajes_chat" ADD CONSTRAINT "mensajes_chat_remitente_id_fkey" FOREIGN KEY ("remitente_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensajes_chat" ADD CONSTRAINT "mensajes_chat_adjunto_id_fkey" FOREIGN KEY ("adjunto_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actividades" ADD CONSTRAINT "actividades_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actividades" ADD CONSTRAINT "actividades_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "modulos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preguntas_actividad" ADD CONSTRAINT "preguntas_actividad_actividad_id_fkey" FOREIGN KEY ("actividad_id") REFERENCES "actividades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opciones_pregunta_actividad" ADD CONSTRAINT "opciones_pregunta_actividad_pregunta_id_fkey" FOREIGN KEY ("pregunta_id") REFERENCES "preguntas_actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entregas_actividad" ADD CONSTRAINT "entregas_actividad_actividad_id_fkey" FOREIGN KEY ("actividad_id") REFERENCES "actividades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entregas_actividad" ADD CONSTRAINT "entregas_actividad_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

