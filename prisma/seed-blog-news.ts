import { PrismaClient, TipoArticulo, EstadoArticulo } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de Blogs, Noticias y Cursos adicionales...')

  // ─── 1. ESCUELAS (Hardcoded) ─────────────────────────────────────────────────
  const escuelas = [
    { id: 'escuela-de-recursos-humanos-y-talento', name: 'Escuela de Recursos Humanos y Talento', slug: 'escuela-de-recursos-humanos-y-talento' },
    { id: 'escuela-de-salud-y-bienestar-corporativo', name: 'Escuela de Salud y Bienestar Corporativo', slug: 'escuela-de-salud-y-bienestar-corporativo' },
    { id: 'escuela-de-relaciones-laborales-y-legal', name: 'Escuela de Relaciones Laborales y Legal', slug: 'escuela-de-relaciones-laborales-y-legal' },
    { id: 'escuela-de-liderazgo-y-management', name: 'Escuela de Liderazgo y Management', slug: 'escuela-de-liderazgo-y-management' },
    { id: 'escuela-de-tecnologia-y-transformacion-digital', name: 'Escuela de Tecnología y Transformación Digital', slug: 'escuela-de-tecnologia-y-transformacion-digital' },
    { id: 'escuela-de-finanzas-y-estrategia', name: 'Escuela de Finanzas y Estrategia', slug: 'escuela-de-finanzas-y-estrategia' }
  ]
  
  // ─── 2. CATEGORÍAS DE CURSOS ───────────────────────────────────────────────────
  const catNegocios = await prisma.categoria.upsert({
    where: { slug: 'negocios-seed' },
    update: {},
    create: {
      nombre: 'Negocios',
      slug: 'negocios-seed',
      descripcion: 'Cursos de Negocios y Finanzas',
      esta_activo: true,
      orden: 10
    }
  })

  // Obtener un profesor para asignarlo a los cursos
  let profesor = await prisma.usuario.findFirst({ where: { rol: 'PROFESOR' } })
  if (!profesor) {
    console.log('⚠️ No se encontró ningún profesor, creando uno...')
    profesor = await prisma.usuario.create({
      data: {
        correo: 'profesor_seed@gmail.com',
        contrasena: 'Profesor123!', // No bcrypt for speed here since it's just seed data
        nombre: 'Profe',
        apellido: 'Prueba',
        rol: 'PROFESOR',
        esta_activo: true
      }
    })
  }

  // ─── 3. CURSOS (Programas) ────────────────────────────────────────────────────
  console.log('📚 Generando Cursos...')
  const modalidades = ['ASINCRONICO', 'EN_CONVOCATORIA']
  
  for (let i = 0; i < escuelas.length; i++) {
    const escuela = escuelas[i]
    // Generate 3 courses per school
    for (let j = 1; j <= 3; j++) {
      const modal = modalidades[(i + j) % modalidades.length]
      await prisma.curso.upsert({
        where: { slug: `curso-seed-${escuela.slug}-${j}` },
        update: {
            estado_venta: modal as any,
            codigo_embeber: modal === 'EN_CONVOCATORIA' ? '<div style="background:#eee;padding:20px;text-align:center;border-radius:10px;">Formulario CRM Externo Inyectado de Prueba</div>' : null
        },
        create: {
          titulo: `Programa Especializado en ${escuela.name} Vol. ${j}`,
          slug: `curso-seed-${escuela.slug}-${j}`,
          descripcion: `Este es un programa avanzado enfocado en las últimas tendencias de ${escuela.name}. Aprenderás casos prácticos y teóricos.`,
          miniatura: `https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80`,
          estado: 'PUBLICADO',
          categoria_id: catNegocios.id,
          escuela: escuela.name,
          profesor_id: profesor.id,
          precio: 299.99,
          estado_venta: modal as any,
          codigo_embeber: modal === 'EN_CONVOCATORIA' ? '<div style="background:#eee;padding:20px;text-align:center;border-radius:10px;">Formulario CRM Externo Inyectado de Prueba</div>' : null
        }
      })
    }
  }

  // ─── 4. CATEGORÍAS Y ETIQUETAS DE ARTÍCULOS ──────────────────────────────────
  console.log('🏷️ Generando Categorías y Etiquetas para Artículos...')
  const catData = ['Recursos Humanos', 'Liderazgo', 'Tecnología', 'Innovación', 'Finanzas']
  const tagData = ['Selección', 'Bienestar', 'Salud Mental', 'Desempeño', 'IA', 'Transformación Digital', 'Estrategia', 'Cultura']
  
  const cats = await Promise.all(catData.map(c => 
    prisma.categoriaArticulo.upsert({
      where: { slug: c.toLowerCase().replace(/ /g, '-') },
      update: {},
      create: { nombre: c, slug: c.toLowerCase().replace(/ /g, '-') }
    })
  ))

  const tags = await Promise.all(tagData.map(t => 
    prisma.etiquetaArticulo.upsert({
      where: { slug: t.toLowerCase().replace(/ /g, '-') },
      update: {},
      create: { nombre: t, slug: t.toLowerCase().replace(/ /g, '-') }
    })
  ))

  // ─── 5. BLOGS ────────────────────────────────────────────────────────────────
  console.log('📝 Generando Blogs...')
  for (let i = 1; i <= 8; i++) {
    await prisma.articulo.upsert({
      where: { slug: `blog-estrategico-seed-${i}` },
      update: {
        categorias: { connect: [{ id: cats[i % cats.length].id }, { id: cats[(i+1) % cats.length].id }] },
        etiquetas: { connect: [{ id: tags[i % tags.length].id }, { id: tags[(i+1) % tags.length].id }, { id: tags[(i+2) % tags.length].id }] }
      },
      create: {
        titulo: `El impacto de la ${catData[i%catData.length]} en la era moderna parte ${i}`,
        slug: `blog-estrategico-seed-${i}`,
        resumen: `Explora a fondo las mejores estrategias sobre ${catData[i%catData.length]} y cómo la ${tagData[i%tagData.length]} puede transformar tu organización.`,
        contenido: `<p>Este es un <strong>artículo de prueba</strong> sumamente extenso sobre ${catData[i%catData.length]}. En la era actual, las empresas necesitan adaptarse rápidamente.</p><p>La aplicación de metodologías probadas en ${tagData[i%tagData.length]} ha demostrado incrementar la retención de talento en un 40%.</p><p>Además, es vital considerar que...</p>`,
        miniatura: `https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80`,
        tipo: 'BLOG',
        estado: 'PUBLICADO',
        autor: 'Académico ADPH',
        fecha_publicacion: new Date(Date.now() - i * 86400000), // Dias pasados
        categorias: { connect: [{ id: cats[i % cats.length].id }, { id: cats[(i+1) % cats.length].id }] },
        etiquetas: { connect: [{ id: tags[i % tags.length].id }, { id: tags[(i+1) % tags.length].id }, { id: tags[(i+2) % tags.length].id }] }
      }
    })
  }

  // ─── 6. NOTICIAS Y EVENTOS ───────────────────────────────────────────────────
  console.log('📰 Generando Noticias y Eventos...')
  for (let i = 1; i <= 8; i++) {
    const isEvento = i % 2 === 0
    await prisma.articulo.upsert({
      where: { slug: `noticia-evento-seed-${i}` },
      update: {
        categorias: { connect: [{ id: cats[i % cats.length].id }] },
        etiquetas: { connect: [{ id: tags[i % tags.length].id }] }
      },
      create: {
        titulo: isEvento ? `Masterclass en Vivo: Tendencias de ${catData[i%catData.length]}` : `ADPH anuncia nueva alianza estratégica enfocada en ${tagData[i%tagData.length]}`,
        slug: `noticia-evento-seed-${i}`,
        resumen: `Breve resumen de esta gran noticia o evento para que los profesionales se enteren rápidamente.`,
        contenido: `<p>Este evento/noticia es una demostración en el sistema...</p>`,
        miniatura: isEvento ? `https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&q=80` : `https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=800&q=80`,
        tipo: isEvento ? 'EVENTO' : 'NOTICIA',
        estado: 'PUBLICADO',
        fecha_publicacion: new Date(Date.now() - i * 43200000),
        fecha_evento: isEvento ? new Date(Date.now() + i * 86400000) : null,
        hora_evento: isEvento ? '19:00 PM' : null,
        modalidad_evento: isEvento ? 'Zoom (Online)' : null,
        expositor: isEvento ? 'Dr. Experto' : null,
        categorias: { connect: [{ id: cats[i % cats.length].id }] },
        etiquetas: { connect: [{ id: tags[i % tags.length].id }] }
      }
    })
  }

  console.log('✅ Seed finalizado exitosamente!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
