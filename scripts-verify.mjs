import fs from 'node:fs';import path from 'node:path';
const root=process.cwd();const needed=['src/app/page.tsx','src/app/collection/page.tsx','src/app/editorial/page.tsx','src/app/maison/page.tsx','src/app/bag/page.tsx','src/components/HomeExperience.tsx','MEDIA-BRIEF.md'];
let fail=0;for(const f of needed){const ok=fs.existsSync(path.join(root,f));console.log(ok?'PASS':'FAIL',f);if(!ok)fail++}process.exitCode=fail?1:0;
