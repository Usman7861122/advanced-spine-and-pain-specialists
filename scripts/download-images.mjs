/**
 * Downloads every photo linked in src/data/site.ts (advspine.org + Unsplash)
 * into public/images/advspine, then switches the site to use the local copies.
 * Run on your own computer:  npm run images
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const file = new URL('../src/data/site.ts', import.meta.url);
const outDir = new URL('../public/images/advspine/', import.meta.url);
let src = await readFile(file, 'utf8');

const PP = 'https://sa1s3optim.patientpop.com/assets';
const PPI = `${PP}/production/practices/9ad76f4d18372bb977f3707403818f5c30da69d1/images`;
const block = src.slice(src.indexOf('const remote = {'), src.indexOf('};', src.indexOf('const remote = {')));
const entries = [...block.matchAll(/^\s+(\w+):\s*(`[^`]+`|unsplash\('([^']+)'\)),/gm)].map((m) => {
  const url = m[3]
    ? `https://images.unsplash.com/photo-${m[3]}?auto=format&fit=crop&w=2000&q=80&fm=jpg`
    : m[2].slice(1, -1).replace('${PPI}', PPI).replace('${PP}', PP);
  return { key: m[1], url };
});

await mkdir(outDir, { recursive: true });
const PNG = ['logo', 'memorialHermann', 'houstonMethodist'];
let failed = 0;
for (const { key, url } of entries) {
  const name = `${key}.${PNG.includes(key) ? 'png' : 'jpg'}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(new URL(name, outDir), Buffer.from(await res.arrayBuffer()));
    console.log('saved', name);
  } catch (e) {
    failed++;
    console.error('FAILED', name, url, e.message);
  }
}

if (failed) {
  console.error(`\n${failed} image(s) failed. The site still uses the online links. Fix and run again.`);
  process.exit(1);
}
src = src.replace('const USE_LOCAL_IMAGES = false;', 'const USE_LOCAL_IMAGES = true;');
await writeFile(file, src);
console.log(`\nAll ${entries.length} images saved to public/images/advspine. The site now uses local copies.`);
