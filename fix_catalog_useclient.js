const fs = require('fs');
let path = 'src/components/site/Catalog.tsx';
let content = fs.readFileSync(path, 'utf8');

// strip any leading "use client"; and re-add it cleanly
content = content.replace(/^(?:'use client'|"use client");?\s*/g, '');
content = '"use client";\n' + content.trimStart();

fs.writeFileSync(path, content, 'utf8');
