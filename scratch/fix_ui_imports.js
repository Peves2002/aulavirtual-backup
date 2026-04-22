const fs = require('fs');
const path = require('path');

const uiDir = 'd:/GitHub/aulavirtual/src/features/web/landing/components/ui';

fs.readdirSync(uiDir).forEach(file => {
    if (file.endsWith('.tsx')) {
        const filePath = path.join(uiDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        const newContent = content.replace(/from "@\/?components\/ui\//g, 'from "./');
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
});
