const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const queries = [
    'ALTER TABLE "certificados" ADD COLUMN IF NOT EXISTS "numero_intento" INTEGER NOT NULL DEFAULT 1;',
    'ALTER TABLE "cursos" ADD COLUMN IF NOT EXISTS "documento_adicional" TEXT;',
    'ALTER TABLE "cursos" ADD COLUMN IF NOT EXISTS "documento_adicional_titulo" TEXT;',
    'ALTER TABLE "cursos" ADD COLUMN IF NOT EXISTS "landing_bg_image" TEXT;',
    'ALTER TABLE "cursos" ADD COLUMN IF NOT EXISTS "landing_flyer_image" TEXT;',
    'ALTER TABLE "cursos" ADD COLUMN IF NOT EXISTS "landing_timer" TIMESTAMP(3);',
    'ALTER TABLE "cursos" ADD COLUMN IF NOT EXISTS "landing_wsp_link" TEXT;',
    'ALTER TABLE "detalles_pedido" ADD COLUMN IF NOT EXISTS "ebook_id" TEXT;',
    'ALTER TABLE "detalles_pedido" ADD COLUMN IF NOT EXISTS "simulacro_id" TEXT;',
    'ALTER TABLE "detalles_pedido" ADD COLUMN IF NOT EXISTS "tipo_item" TEXT NOT NULL DEFAULT \'CURSO\';',
    'ALTER TABLE "lecciones" ADD COLUMN IF NOT EXISTS "es_pdf" BOOLEAN NOT NULL DEFAULT false;'
  ];

  for (const q of queries) {
    try {
      await prisma.$executeRawUnsafe(q);
      console.log('Success:', q);
    } catch (err) {
      console.error('Failed:', q, err.message);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
