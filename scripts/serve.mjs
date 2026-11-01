import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, extname, sep } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.mp4':'video/mp4','.webm':'video/webm','.pdf':'application/pdf'};
createServer(async(req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + sep)) {res.writeHead(403).end();return;}
    if (!extname(file)) file = pathname.endsWith('/') ? resolve(file,'index.html') : file + '.html';
    try {await stat(file);} catch {
      res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
      res.end(await readFile(resolve(root,'404.html')));return;
    }
    res.writeHead(200,{'Content-Type':types[extname(file)] || 'application/octet-stream','Cache-Control':'no-cache'});
    res.end(await readFile(file));
  } catch {res.writeHead(400).end('Bad request');}
}).listen(port, '127.0.0.1', () => console.log(`Kayla portfolio preview: http://127.0.0.1:${port}`));
