import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const root = process.cwd();
const port = Number(process.env.PORT || 3000);
const dataFile = process.env.DASHBOARD_DATA_FILE || path.join(root, 'data', 'consumo.json');
const publicDir = root;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

async function readJson(filePath) {
  const text = await readFile(filePath, 'utf8');
  return JSON.parse(text);
}

async function serveStatic(reqPath, res) {
  const safePath = path.normalize(decodeURIComponent(reqPath)).replace(/^\/+/, '');
  const filePath = path.join(publicDir, safePath || 'index.html');
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  let target = filePath;
  if (reqPath === '/' || reqPath === '') target = path.join(publicDir, 'index.html');
  if (reqPath === '/data/consumo.json') target = dataFile;

  if (!existsSync(target)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const ext = path.extname(target).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  const body = await readFile(target);
  res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-store' });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  try {
    const parsed = new URL(req.url, `http://${req.headers.host}`);

    if (parsed.pathname === '/api/consumo') {
      const payload = existsSync(dataFile) ? await readJson(dataFile) : null;
      const enriched = payload || {
        source: 'fallback-api',
        lastUpdated: new Date().toISOString(),
        periodDays: 7,
        totalBudget: 100000,
        consumed: 0,
        reserved: 0,
        thresholds: { warning: 0.7, danger: 0.9 },
        daily: [],
      };
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      });
      res.end(JSON.stringify(enriched, null, 2));
      return;
    }

    await serveStatic(parsed.pathname, res);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Erro interno: ${error.message}`);
  }
});

server.listen(port, () => {
  console.log(`Dashboard de Consumo rodando em http://localhost:${port}`);
  console.log(`Fonte de dados: ${dataFile}`);
});
