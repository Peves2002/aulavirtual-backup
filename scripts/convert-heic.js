const fs = require('fs')
const path = require('path')
const heicConvert = require('heic-convert')

const inputDir = path.join(__dirname, '../public/images/equipo')
const outputDir = path.join(__dirname, '../public/images/equipo/jpg')

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

const files = fs.readdirSync(inputDir).filter(f => f.toLowerCase().endsWith('.heic'))

console.log(`Convirtiendo ${files.length} archivos HEIC...`)

;(async () => {
  for (const file of files) {
    const inputPath = path.join(inputDir, file)
    const outputName = file.replace(/\.heic$/i, '.jpg')
    const outputPath = path.join(outputDir, outputName)

    if (fs.existsSync(outputPath)) {
      console.log(`  Ya existe: ${outputName}`)
      continue
    }

    try {
      const input = fs.readFileSync(inputPath)
      const output = await heicConvert({ buffer: input, format: 'JPEG', quality: 0.85 })
      fs.writeFileSync(outputPath, Buffer.from(output))
      console.log(`  ✅ ${outputName}`)
    } catch (e) {
      console.error(`  ❌ ${file}: ${e.message}`)
    }
  }
  console.log('¡Listo!')
})()
