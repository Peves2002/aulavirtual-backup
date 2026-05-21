const fs = require('fs');
let path = 'src/components/site/Catalog.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/import \{ courses \} from "@\/data\/courses";/g, '');
content = content.replace(/export function Catalog\(\) \{/g, 'export function Catalog({ courses = [], categories = [] }: { courses?: any[], categories?: any[] }) {');
content = content.replace(/const categories = \[\s*"Todos",[\s\S]*?\];/g, '');

fs.writeFileSync(path, content);
