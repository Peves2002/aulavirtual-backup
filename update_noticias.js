const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', '(web)', 'noticias', '[slug]', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Update imports
content = content.replace(
  `import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'`,
  `import { ArrowLeft, Calendar, User, Tag, Clock, MapPin, ExternalLink } from 'lucide-react'`
);

// Add event UI logic
const eventJSX = `          {articulo.tipo === 'EVENTO' && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 md:p-8 rounded-xl mt-8 mb-8 flex flex-col md:flex-row gap-6 md:items-center justify-between shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {articulo.fecha_evento && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#3BA8C5]" />
                    <span className="font-semibold text-lg">{new Date(articulo.fecha_evento).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                  </div>
                )}
                {articulo.hora_evento && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#3BA8C5]" />
                    <span className="font-semibold text-lg">{articulo.hora_evento}</span>
                  </div>
                )}
                {articulo.modalidad_evento && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#3BA8C5]" />
                    <span className="font-semibold text-lg">{articulo.modalidad_evento}</span>
                  </div>
                )}
                {articulo.expositor && (
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-[#3BA8C5]" />
                    <span className="font-semibold text-lg">{articulo.expositor}</span>
                  </div>
                )}
              </div>
              {articulo.link_registro && (
                <div className="mt-4 md:mt-0 flex-shrink-0">
                  <a href={articulo.link_registro} target="_blank" rel="noopener noreferrer" className="bg-[#3BA8C5] hover:bg-[#2b88a1] text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_4px_20px_rgba(59,168,197,0.4)] hover:shadow-[0_8px_30px_rgba(59,168,197,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2 w-full md:w-auto text-center">
                    Regístrate Aquí <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              )}
            </div>
          )}
`;

content = content.replace(
  `          {articulo.resumen && (`,
  `${eventJSX}\n          {articulo.resumen && (`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Noticias page updated');
