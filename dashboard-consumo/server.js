import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || 3001);
const dataFile = process.env.DASHBOARD_DATA_FILE || path.join(root, 'data', 'consumo.json');
const dataUrl = process.env.DASHBOARD_DATA_URL || '';
const publicDir = root;
const requestTimeoutMs = Number(process.env.DASHBOARD_FETCH_TIMEOUT_MS || 5000);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

const fallbackData = {
  source: 'fallback-api',
  lastUpdated: new Date().toISOString(),
  periodDays: 7,
  totalBudget: 100000,
  consumed: 0,
  reserved: 0,
  thresholds: { warning: 0.7, danger: 0.9 },
  daily: [],
};

function normalizeData(payload) {
  if (!payload || typeof payload !== 'object') return fallbackData;
  return {
    ...fallbackData,
    ...payload,
    thresholds: {
      ...fallbackData.thresholds,
      ...(payload.thresholds || {}),
    },
    daily: Array.isArray(payload.daily) && payload.daily.length ? payload.daily : fallbackData.daily,
    weekly: Array.isArray(payload.weekly) ? payload.weekly : payload.weekly,
  };
}

async function readJson(filePath) {
  const text = await readFile(filePath, 'utf8');
  return JSON.parse(text);
}

async function fetchRemoteJson(remoteUrl) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), requestTimeoutMs);
  try {
    const response = await fetch(remoteUrl, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function loadData() {
  try {
    if (dataUrl) {
      const payload = await fetchRemoteJson(dataUrl);
      return normalizeData({ ...payload, source: payload.source || dataUrl });
    }

    if (existsSync(dataFile)) {
      const payload = await readJson(dataFile);
      return normalizeData({ ...payload, source: payload.source || dataFile });
    }

    return fallbackData;
  } catch (error) {
    return {
      ...fallbackData,
      source: `error:${error.message}`,
      lastUpdated: new Date().toISOString(),
    };
  }
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

    if (parsed.pathname === '/api/health') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify({ ok: true, ts: new Date().toISOString() }));
      return;
    }

    if (parsed.pathname === '/api/source') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(
        JSON.stringify(
          {
            dataFile,
            dataUrl: dataUrl || null,
            requestTimeoutMs,
            env: {
              DASHBOARD_DATA_FILE: Boolean(process.env.DASHBOARD_DATA_FILE),
              DASHBOARD_DATA_URL: Boolean(process.env.DASHBOARD_DATA_URL),
            },
          },
          null,
          2,
        ),
      );
      return;
    }

    if (parsed.pathname === '/api/consumo') {
      const data = await loadData();
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      });
      res.end(JSON.stringify(data, null, 2));
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
  console.log(`Fonte principal: ${dataUrl || dataFile}`);
});
