const fs = require('fs');
let path = 'src/hooks/use-reveal.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/import \{ useLocation \} from "@tanstack\/react-router";/g, 'import { usePathname } from "next/navigation";');
content = content.replace(/const pathname = useLocation.*?;/g, 'const pathname = usePathname();');

fs.writeFileSync(path, content);
