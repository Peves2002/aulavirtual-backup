const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src', 'app', '(web)', 'programas', '[slug]', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

if (!content.includes("import SafeHtml from '@/components/SafeHtml'")) {
  content = content.replace(
    "import { notFound } from 'next/navigation'",
    "import { notFound } from 'next/navigation'\nimport SafeHtml from '@/components/SafeHtml'"
  );
}

const formStart = '<div className="sticky top-[160px] bg-[#f4f5f7] p-8 shadow-lg border border-gray-100 z-20">';
const formEnd = '</form>\n          </div>';

const replacement = `          <div className="sticky top-[160px] bg-[#f4f5f7] p-8 shadow-lg border border-gray-100 z-20">
            {(curso as any).codigo_embeber ? (
              <SafeHtml html={(curso as any).codigo_embeber} />
            ) : (
              <>
                <h3 className="text-2xl font-normal mb-3 text-center text-gray-800 tracking-tight">Solicita información</h3>
                <p className="text-[13px] text-center text-gray-600 mb-8 px-2">
                  Un asesor académico <b>contactará contigo</b> en un plazo máximo de <b>24 horas.</b>
                </p>
                
                <form className="space-y-4">
                  <div className="bg-white border border-gray-300 relative">
                    <select className="w-full p-3 text-[14px] text-gray-600 bg-transparent focus:outline-none appearance-none cursor-pointer">
                      <option value="" disabled selected>Especialidad *</option>
                      <option>{curso.categoria?.nombre || 'Especialización'}</option>
                    </select>
                    <div className="absolute right-3 top-4 pointer-events-none text-gray-400 text-xs">▼</div>
                  </div>
                  
                  <div className="text-[12px] font-bold text-[#08479b] cursor-pointer flex items-center gap-1 pl-1">
                     ▶ Más
                  </div>

                  <div>
                    <input type="text" placeholder="Nombre y apellidos *" className="w-full bg-white border border-gray-300 p-3 text-[14px] text-gray-600 focus:outline-none placeholder-gray-400" />
                  </div>

                  <div>
                    <input type="email" placeholder="Email *" className="w-full bg-white border border-gray-300 p-3 text-[14px] text-gray-600 focus:outline-none placeholder-gray-400" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-300 relative">
                      <select className="w-full p-3 text-[14px] text-gray-600 bg-transparent focus:outline-none appearance-none cursor-pointer">
                        <option value="" disabled selected>Edad *</option>
                        <option>18 - 25</option>
                        <option>26 - 35</option>
                        <option>36+</option>
                      </select>
                      <div className="absolute right-3 top-4 pointer-events-none text-gray-400 text-xs">▼</div>
                    </div>
                    <div className="bg-white border border-gray-300 relative">
                      <select className="w-full p-3 text-[14px] text-gray-600 bg-transparent focus:outline-none appearance-none cursor-pointer">
                        <option value="" disabled selected>País *</option>
                        <option>Perú</option>
                        <option>Colombia</option>
                        <option>México</option>
                      </select>
                      <div className="absolute right-3 top-4 pointer-events-none text-gray-400 text-xs">▼</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pb-2">
                    <div>
                      <input type="text" placeholder="Teléfono *" className="w-full bg-white border border-gray-300 p-3 text-[14px] text-gray-600 focus:outline-none placeholder-gray-400" />
                    </div>
                    <div className="bg-white border border-gray-300 relative">
                      <select className="w-full p-3 text-[14px] text-gray-600 bg-transparent focus:outline-none appearance-none cursor-pointer">
                        <option value="" disabled selected>Nivel de estudios</option>
                        <option>Bachiller</option>
                        <option>Titulado</option>
                      </select>
                      <div className="absolute right-3 top-4 pointer-events-none text-gray-400 text-xs">▼</div>
                    </div>
                  </div>

                  <div className="text-[10px] text-gray-400 text-justify leading-tight mb-4 h-12 overflow-y-auto pr-2">
                     ADPH Institución Superior tratará sus datos personales para contactarle e informarle del programa seleccionado de cara a las próximas convocatorias del mismo, pudiendo ejercer sus derechos de privacidad en cualquier momento.
                  </div>

                  <a 
                    href={\`https://wa.me/51959436827?text=\${encodeURIComponent('Hola, quisiera solicitar información sobre el programa: ' + curso.titulo)}\`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full bg-[#fcd116] hover:bg-yellow-400 text-slate-900 font-bold py-4 text-[13px] tracking-wide uppercase transition-colors flex justify-center items-center shadow-md"
                  >
                    Solicitar Información
                  </a>
                </form>
              </>
            )}
          </div>`;

if (!content.includes('SafeHtml html={(curso as any).codigo_embeber}')) {
  const startIndex = content.indexOf(formStart);
  if (startIndex !== -1) {
    const endIndex = content.indexOf(formEnd, startIndex) + formEnd.length;
    content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log('Programas page updated successfully');
  } else {
    console.log('Could not find form start string');
  }
} else {
  console.log('Already updated');
}
