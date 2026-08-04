const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', '(web)', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add Prisma queries for blogs and news
const queries = `
  // Load dynamic blogs from DB
  const dbBlogs = await prisma.articulo.findMany({
    where: { tipo: 'BLOG', estado: 'PUBLICADO' },
    orderBy: { fecha_publicacion: 'desc' },
    take: 4,
    include: { categorias: true }
  })
  const parsedBlogs = dbBlogs.length > 0 ? dbBlogs.map(blog => ({
    id: blog.slug,
    title: blog.titulo,
    date: new Date(blog.fecha_publicacion).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
    image: blog.miniatura || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80',
    author: blog.autor || 'Académico ADPH',
    resumen: blog.resumen || 'Explora a fondo las mejores estrategias de formación ejecutiva.',
    enlaceExterno: blog.enlace_externo,
    targetUrl: blog.enlace_externo || \`/blog/\${blog.slug}\`
  })) : BLOGS; // Fallback to hardcoded if empty

  // Load dynamic news from DB
  const dbNoticias = await prisma.articulo.findMany({
    where: { tipo: { in: ['NOTICIA', 'EVENTO'] }, estado: 'PUBLICADO' },
    orderBy: { fecha_publicacion: 'desc' },
    take: 6,
    include: { etiquetas: true }
  })
  const parsedNoticias = dbNoticias.length > 0 ? dbNoticias.map(news => ({
    id: news.slug,
    title: news.titulo,
    date: new Date(news.fecha_publicacion).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
    image: news.miniatura || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    tag: news.tipo,
    enlaceExterno: news.enlace_externo,
    targetUrl: news.enlace_externo || \`/noticias/\${news.slug}\`
  })) : NOTICIAS; // Fallback to hardcoded if empty
`;

// Insert after TESTIMONIOS load
if (!content.includes('const dbBlogs = await prisma.articulo.findMany')) {
  content = content.replace(
    `  // Load dynamic blogs`,
    `${queries}\n\n  // Load dynamic blogs`
  );
}

// Replace dynamicBlogs loop with parsedBlogs (in JSX)
content = content.replace(
  `{dynamicBlogs.slice(0, 3).map((blog, index) => (`,
  `{parsedBlogs.slice(0, 4).map((blog, index) => (`
);

content = content.replace(
  `href={blog.enlaceExterno || '/blog'}`,
  `href={blog.targetUrl || '/blog'}`
);

// Replace dynamicNoticias with parsedNoticias (in JSX)
content = content.replace(
  `{dynamicNoticias.map((news, index) => {`,
  `{parsedNoticias.map((news, index) => {`
);

content = content.replace(
  `const targetUrl = news.url && news.url.startsWith('http') ? news.url : \`/noticias/\${news.id}\``,
  `const targetUrl = news.targetUrl || (news.url && news.url.startsWith('http') ? news.url : \`/noticias/\${news.id}\`)`
);

// Fix grid layout for 6 items in Noticias
content = content.replace(
  `<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1440px] mx-auto">`,
  `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1440px] mx-auto">`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Home page updated');
