const fs = require('fs');
const path = require('path');

const noticiasPath = path.join(__dirname, 'src', 'app', '(web)', 'noticias', '[slug]', 'page.tsx');
let content = fs.readFileSync(noticiasPath, 'utf8');

if (!content.includes("import SafeHtml from '@/components/SafeHtml'")) {
  content = content.replace(
    "import FadeIn from '@/utils/components/animations/FadeIn'",
    "import FadeIn from '@/utils/components/animations/FadeIn'\nimport SafeHtml from '@/components/SafeHtml'"
  );
}

const replacement = `<FadeIn delay={0.1}>
              <div 
                className="prose prose-lg prose-slate prose-a:text-[#08479b] prose-a:font-semibold prose-img:rounded-xl prose-headings:font-manrope prose-headings:font-black max-w-none text-justify"
                dangerouslySetInnerHTML={{ __html: articulo.contenido }}
              />
            </FadeIn>

            {(articulo as any).codigo_embeber && (
              <div className="mt-12 p-8 bg-[#f4f5f7] rounded-xl shadow-inner border border-gray-100">
                <SafeHtml html={(articulo as any).codigo_embeber} />
              </div>
            )}`;

if (!content.includes('<SafeHtml html={(articulo as any).codigo_embeber} />')) {
  content = content.replace(
    `<FadeIn delay={0.1}>
              <div 
                className="prose prose-lg prose-slate prose-a:text-[#08479b] prose-a:font-semibold prose-img:rounded-xl prose-headings:font-manrope prose-headings:font-black max-w-none text-justify"
                dangerouslySetInnerHTML={{ __html: articulo.contenido }}
              />
            </FadeIn>`,
    replacement
  );
  fs.writeFileSync(noticiasPath, content, 'utf8');
  console.log('Noticias page updated');
} else {
  console.log('Noticias already updated');
}
