const fs = require('fs')
const path = require('path')

const SOURCE_DIR = path.join(__dirname, '..', 'public', 'images', 'cursos')
const DEST_DIR = path.join(__dirname, '..', 'public', 'uploads', 'cursos')

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true })
}

const mappings = [
  { src: 'diseno-y-formulacion-de-indicadores.jpg', dest: 'elaboracion-de-costos.jpg' },
  { src: 'direccion-y-consultoria-en-seleccion-de-personal.jpg', dest: 'valorizacion.jpg' },
  { src: 'seleccion-de-personal-para-entornos-de-trabajo-hibrido.jpg', dest: 'lean-construccion.jpg' },
  { src: 'planes-de-desarrollo-y-capacitacion-del-talento-humano.jpg', dest: 'constrtuccion-y-mantenimiento.jpg' },
  { src: 'herramientas-y-test-psicologicos-para-la-evaluacion-ocupacional.jpg', dest: 'seguridad-y-salud.jpg' }
]

mappings.forEach(m => {
  const srcPath = path.join(SOURCE_DIR, m.src)
  const destPath = path.join(DEST_DIR, m.dest)
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath)
    console.log(`Copied ${m.src} to ${m.dest}`)
  } else {
    console.warn(`Source not found: ${srcPath}`)
  }
})
