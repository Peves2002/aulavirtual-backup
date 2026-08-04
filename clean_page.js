const fs = require('fs');
const file = 'src/app/(web)/programas/[slug]/page.tsx';
let c = fs.readFileSync(file, 'utf8');

const strToFind = "</div>m 'next/navigation'";
const idx = c.indexOf(strToFind);

if (idx > -1) {
  c = c.substring(0, idx) + '</div>\n        </div>\n      </section>\n    </div>\n  )\n}\n';
  fs.writeFileSync(file, c, 'utf8');
  console.log('Cleaned page.tsx');
} else {
  console.log('Not found');
}
