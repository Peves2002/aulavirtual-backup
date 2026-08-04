const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', '(web)', 'escuelas', '[escuelaId]', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacement = `              ))}
            </div>
            {programasEscuela.length > 6 && (
              <ScrollReveal delay={0.2}>
                <div className="mt-16 text-center">
                  <Link href="/programas" className="bg-[#fcd116] hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 transition-all hover:-translate-y-1 hover:shadow-lg">
                    Conoce todos los programas <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </ScrollReveal>
            )}
          ) : (`;

if (!content.includes('Conoce todos los programas')) {
  content = content.replace(`              ))}\n            </div>\n          ) : (`, replacement);
  
  if (!content.includes('<>')) {
      // we need to wrap the grid and the button in a fragment
      content = content.replace(`            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">`, `            <>\n              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">`);
      content = content.replace(`              </ScrollReveal>\n            )}\n          ) : (`, `              </ScrollReveal>\n            )}\n            </>\n          ) : (`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated escuela page');
} else {
  console.log('Already updated');
}
