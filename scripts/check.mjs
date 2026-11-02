import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const walk = async dir => (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(resolve(dir,e.name)):resolve(dir,e.name)))).flat();
const files = await walk(root);
const pages = files.filter(p=>p.endsWith('.html') && !p.includes('__mobile'));
const cache = new Map(await Promise.all(pages.map(async p=>[p,await readFile(p,'utf8')])));
let links = 0;
const errors = [];
for (const [file,html] of cache) {
 if ((html.match(/<h1\b/g)||[]).length !== 1) errors.push(`${file}: expected one h1`);
 for (const [, attr, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
  if (/^(https?:|mailto:|data:)/.test(value)) continue;
  const [path,hash] = value.split('#');
  let destination = path ? resolve(root, `.${path.startsWith('/')?path:'/'+path}`) : file;
  if (path === '/') destination = resolve(root,'index.html');
  else if (path && !extname(path)) destination += '.html';
  links++;
  try {await stat(destination);} catch {errors.push(`${file}: missing ${attr} ${value}`);continue;}
  if(hash && destination.endsWith('.html')) {
   const target = cache.get(destination) || await readFile(destination,'utf8');
   if(!target.includes(`id="${hash}"`)) errors.push(`${file}: missing anchor ${value}`);
  }
 }
}
const home = await readFile(resolve(root,'index.html'));
const css = await readFile(resolve(root,'assets/style.css'));
const scrapbookCss = await readFile(resolve(root,'assets/scrapbook.css'));
const coverCss = await readFile(resolve(root,'assets/cover.css'));
const js = await readFile(resolve(root,'assets/app.js'));
const avatar = await stat(resolve(root,'assets/avatar-wave-rest.webp'));
const wave = await stat(resolve(root,'assets/avatar-wave-atlas.webp'));
const homeText = home.toString();
const educationText = await readFile(resolve(root,'education.html'),'utf8');
for (const phrase of ['Monash University','Monash College','Purwadhika School']) if(!educationText.includes(phrase)) errors.push(`Education page missing ${phrase}`);
const experienceText = await readFile(resolve(root,'experience.html'),'utf8');
for (const phrase of ['Unitree Go2','Software Engineer Intern','Nov 2026 – Feb 2027','Coldwell Banker','Case Squad','MUMTEC']) if(!experienceText.includes(phrase)) errors.push(`Experience page missing ${phrase}`);
const projectsText = await readFile(resolve(root,'projects.html'),'utf8');
const marginPocket = projectsText.match(/<details class="margin-pocket"[^>]*>([\s\S]*?)<\/details>/)?.[1] || '';
if(!marginPocket.includes('Auctra')) errors.push('Auctra must be inside the project margins.');
if(marginPocket.includes('SupplySwipe')) errors.push('SupplySwipe belongs with the playful projects.');
if(files.some(file=>/auctra[^/]*\.pdf$/i.test(file))) errors.push('The private Auctra pitch deck must not be in the published assets.');
if(projectsText.replace(marginPocket,'').includes('Auctra')) errors.push('Auctra should not have a separate project highlight.');
const chapterLinks = [...homeText.matchAll(/href="([^"]+)" class="folder-tab /g)].map(match=>match[1]);
if(chapterLinks.join(',') !== '/,/education,/experience,/projects,/play,/blog') errors.push('Unexpected chapter order.');
for (const [file,html] of cache) for(const forbidden of ['Lumi World','Lumé Shade Lab','KaylaStudy','dancing','Monash University Malaysia','Kayla Siwi']) if(html.includes(forbidden)) errors.push(`${file}: excluded content ${forbidden}`);
console.log(`${pages.length} pages, ${links} local links/assets/anchors checked.`);
console.log(`Homepage HTML+CSS+JS: ${(gzipSync(home).length+gzipSync(css).length+gzipSync(scrapbookCss).length+gzipSync(coverCss).length+gzipSync(js).length)/1024|0} KiB gzip. Avatar poster + wave atlas: ${(avatar.size+wave.size)/1024|0} KiB.`);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log('Passed: routes, assets, anchors and required content.');
