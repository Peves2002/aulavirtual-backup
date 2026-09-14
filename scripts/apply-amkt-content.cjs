/** Apply the AMKT course covers and institutional copy to the configured database. */
require('dotenv').config({ quiet: true })
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const covers = {
  'costos-presupuestos-obra-s10': 'costos',
  'valorizacion-liquidacion-obras-contrata': 'valorizacion',
  'lean-construction-gestion-proyectos': 'lean',
  'construccion-mantenimiento-rehabilitacion-carreteras': 'carreteras',
  'seguridad-salud-ocupacional-obras': 'seguridad'
}
const copy = {
  NOSOTROS_MISION_TEXTO: 'Brindar una formación accesible, práctica y de calidad que ayude a las personas a desarrollar sus habilidades, fortalecer sus conocimientos y alcanzar sus metas personales y profesionales.',
  NOSOTROS_VISION_TEXTO: 'Ser una comunidad educativa de referencia, reconocida por impulsar el aprendizaje continuo, la innovación y el desarrollo de profesionales que contribuyan positivamente a la sociedad.'
}
async function main() {
  await prisma.$transaction(async tx => {
    for (const [slug, image] of Object.entries(covers)) {
      const result = await tx.curso.updateMany({ where: { slug }, data: { miniatura: '/images/contenido/' + image + '.jpg' } })
      console.log(slug + ': ' + result.count + ' actualizado(s)')
    }
    for (const [clave, valor] of Object.entries(copy)) {
      await tx.configuracion.upsert({ where: { clave }, create: { clave, valor }, update: { valor } })
    }
  })
}
main().catch(error => { console.error(error.message); process.exitCode = 1 }).finally(() => prisma.$disconnect())
