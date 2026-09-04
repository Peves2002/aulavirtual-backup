import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

interface ImageMeta {
  filePath: string
  fileName: string
  width: number
  height: number
  sizeKB: number
  aspectRatio: number
  score: number
}

function walkDir(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList
  const items = fs.readdirSync(dir)
  for (const item of items) {
    const fullPath = path.join(dir, item)
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, fileList)
    } else {
      if (/\.(jpg|jpeg|png|heic|webp)$/i.test(item)) {
        fileList.push(fullPath)
      }
    }
  }
  return fileList
}

async function evaluateFolder(folderPath: string): Promise<ImageMeta[]> {
  const files = walkDir(folderPath)
  const list: ImageMeta[] = []

  for (const file of files) {
    try {
      const stat = fs.statSync(file)
      // Test if sharp can decode a thumbnail buffer
      const meta = await sharp(file).resize(100, 100).toBuffer().then(() => sharp(file).metadata())
      const width = meta.width || 0
      const height = meta.height || 0
      const aspectRatio = width / (height || 1)
      const sizeKB = Math.round(stat.size / 1024)

      let score = width * height
      if (aspectRatio >= 1.2 && aspectRatio <= 1.8) {
        score *= 1.5
      } else if (aspectRatio < 1.0) {
        score *= 0.6
      }

      list.push({
        filePath: file,
        fileName: path.basename(file),
        width,
        height,
        sizeKB,
        aspectRatio,
        score,
      })
    } catch {
      // Skip file if sharp cannot decode it (e.g. unsupported HEIC codec)
    }
  }

  list.sort((a, b) => b.score - a.score)
  return list
}

async function convertToWebp(inputPath: string, outputPath: string, maxWidth = 1200, quality = 83) {
  const dir = path.dirname(outputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  await sharp(inputPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outputPath)

  const outStat = fs.statSync(outputPath)
  console.log(`[WEBP CONVERTED] ${path.relative(process.cwd(), outputPath)} (${Math.round(outStat.size / 1024)} KB)`)
}

async function main() {
  console.log('--- STARTING IMAGE OPTIMIZATION ---')

  const publicServicios = path.join(process.cwd(), 'public', 'servicios')
  const tempDir = path.join(process.cwd(), 'public', '_temp_webp_servicios')

  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
  fs.mkdirSync(tempDir, { recursive: true })

  // Mapping of subfolders to clean categories and sub-services
  const mappings = [
    {
      rawFolder: 'a. Seguridad y Salud en el trabajo/a. Gestion de Simulacros',
      category: 'seguridad-y-salud-en-el-trabajo',
      slug: 'gestion-de-simulacros',
      isCategoryDefault: true,
    },
    {
      rawFolder: 'a. Seguridad y Salud en el trabajo/b. Evaluacion de Riesgos',
      category: 'seguridad-y-salud-en-el-trabajo',
      slug: 'evaluacion-de-riesgos',
      isCategoryDefault: false,
    },
    {
      rawFolder: 'a. Seguridad y Salud en el trabajo/c. Induccion de Seguridad y Salud en el trabajo',
      category: 'seguridad-y-salud-en-el-trabajo',
      slug: 'induccion-de-seguridad-y-salud-en-el-trabajo',
      isCategoryDefault: false,
    },
    {
      rawFolder: 'b. Salud Ocupacional/a. Evaluaciones de Examenes Medicos Ocupacionales',
      category: 'salud-ocupacional',
      slug: 'evaluaciones-de-examenes-medicos-ocupacionales',
      isCategoryDefault: true,
    },
    {
      rawFolder: 'b. Salud Ocupacional/b. Gestión de Salud Ocupacional',
      category: 'salud-ocupacional',
      slug: 'gestion-de-salud-ocupacional',
      isCategoryDefault: false,
    },
    {
      rawFolder: 'c. Monitoreos Ocupacionales',
      category: 'monitoreos-ocupacionales',
      slug: 'monitoreos-ocupacionales-de-campo',
      isCategoryDefault: true,
    },
    {
      rawFolder: 'd. Capacitaciones en SST/Entrenamiento a la Brigada ante Emergencias',
      category: 'capacitaciones-en-sst',
      slug: 'entrenamiento-a-la-brigada-ante-emergencias',
      isCategoryDefault: false,
    },
    {
      rawFolder: 'd. Capacitaciones en SST/Entrenamiento de Evacuación y Rescate',
      category: 'capacitaciones-en-sst',
      slug: 'entrenamiento-de-evacuacion-y-rescate',
      isCategoryDefault: false,
    },
    {
      rawFolder: 'd. Capacitaciones en SST/Entrenamiento Primeros Auxilios',
      category: 'capacitaciones-en-sst',
      slug: 'entrenamiento-primeros-auxilios',
      isCategoryDefault: true,
    },
    {
      rawFolder: 'd. Capacitaciones en SST/Higiene Ocupacional',
      category: 'capacitaciones-en-sst',
      slug: 'higiene-ocupacional',
      isCategoryDefault: false,
    },
    {
      rawFolder: 'd. Capacitaciones en SST/Sistema de Gestion de Seguridad y Salud en el Trabajo',
      category: 'capacitaciones-en-sst',
      slug: 'sistema-de-gestion-de-seguridad-y-salud-en-el-trabajo',
      isCategoryDefault: false,
    },
    {
      rawFolder: 'f. ITSE y Gestión Municipal',
      category: 'itse-y-gestion-municipal',
      slug: 'itse-y-gestion-municipal',
      isCategoryDefault: true,
    },
    {
      rawFolder: 'h. Hostigamiento Sexual Laboral',
      category: 'hostigamiento-sexual-laboral',
      slug: 'prevencion-del-hostigamiento-sexual-laboral',
      isCategoryDefault: true,
    },
  ]

  for (const map of mappings) {
    const srcFolder = path.join(publicServicios, map.rawFolder)
    console.log(`\nEvaluating: ${map.rawFolder}...`)
    const evaluated = await evaluateFolder(srcFolder)

    if (evaluated.length === 0) {
      console.log(`[WARNING] No valid image in ${map.rawFolder}`)
      continue
    }

    const best = evaluated[0]
    console.log(`Selected best image (${best.width}x${best.height}, ${best.sizeKB} KB): ${best.fileName}`)

    // Target path for sub-service
    const subServiceOut = path.join(tempDir, map.category, `${map.slug}.webp`)
    await convertToWebp(best.filePath, subServiceOut, 1200, 83)

    // If it's category default, save as main category image as well
    if (map.isCategoryDefault) {
      const mainCatOut = path.join(tempDir, map.category, `${map.category}.webp`)
      await convertToWebp(best.filePath, mainCatOut, 1200, 83)
    }
  }

  // Clear public/servicios entirely and move tempDir contents
  console.log('\nCleaning raw files in public/servicios...')
  fs.rmSync(publicServicios, { recursive: true, force: true })
  fs.mkdirSync(publicServicios, { recursive: true })

  // Copy tempDir contents to public/servicios
  function copyRecursive(src: string, dest: string) {
    const items = fs.readdirSync(src)
    for (const item of items) {
      const srcPath = path.join(src, item)
      const destPath = path.join(dest, item)
      if (fs.statSync(srcPath).isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true })
        copyRecursive(srcPath, destPath)
      } else {
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }
  copyRecursive(tempDir, publicServicios)
  fs.rmSync(tempDir, { recursive: true, force: true })

  console.log('\n--- CONVERTING PUBLIC HEROS TO WEBP ---')
  const herosDir = path.join(process.cwd(), 'public', 'heros')
  if (fs.existsSync(herosDir)) {
    const heroFiles = fs.readdirSync(herosDir)
    for (const file of heroFiles) {
      if (/\.(jpg|jpeg|png)$/i.test(file)) {
        const fullSrc = path.join(herosDir, file)
        const nameWithoutExt = path.parse(file).name.toLowerCase()
        const fullDest = path.join(herosDir, `${nameWithoutExt}.webp`)
        await convertToWebp(fullSrc, fullDest, 1920, 83)
        fs.unlinkSync(fullSrc)
      }
    }
  }

  console.log('\n--- CONVERTING OTHER WEB IMAGES TO WEBP ---')
  const imagesDir = path.join(process.cwd(), 'public', 'images')
  if (fs.existsSync(imagesDir)) {
    const targetImages = ['cursos.jpg', 'libro-reclamaciones.jpg', 'libro-reclamaciones.png']
    for (const img of targetImages) {
      const fullSrc = path.join(imagesDir, img)
      if (fs.existsSync(fullSrc)) {
        const nameWithoutExt = path.parse(img).name.toLowerCase()
        const fullDest = path.join(imagesDir, `${nameWithoutExt}.webp`)
        await convertToWebp(fullSrc, fullDest, 1200, 83)
      }
    }
  }

  console.log('\nALL IMAGE PROCESSING COMPLETED SUCCESSFULLY!')
}

main().catch(console.error)
