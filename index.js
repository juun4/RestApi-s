const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

// ---------- Base config ----------
app.set('trust proxy', true);
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static('public'));       // /, assets umum
app.use('/src', express.static('src'));  // expose web-set.json, dll

// config UI / API
const apiConfig = require('./src/web-set.json');

// ---------- Utils ----------
const toLc = (p) => (p || '').toString().replace(/\/+$/, '').toLowerCase();
const exists = (f) => { try { return fs.existsSync(f); } catch { return false; } };

// ---------- Load scrapers ----------
const loadScrapers = () => {
  const scrapers = {};
  const endpointConfigs = {};
  const baseDir = path.join(__dirname, 'api-setting', 'Scrape');

  // ambil konfigurasi endpoint dari web-set.json (sinkron sama UI)
  if (apiConfig && Array.isArray(apiConfig.categories)) {
    for (const cat of apiConfig.categories) {
      for (const item of (cat.items || [])) {
        const rawPath = (item.path || '').trim();
        if (!rawPath) continue;
        const cleanPath = toLc(rawPath.split('?')[0]); // base path tanpa query
        endpointConfigs[cleanPath] = {
          requireKey:
            item.requireKey !== undefined
              ? !!item.requireKey
              : !!apiConfig.apiSettings?.defaultRequireKey,
          path: rawPath,           // simpan path original (bisa mengandung ?)
          example: item.example || null
        };
      }
    }
  }

  const walkDir = (dir) => {
    if (!exists(dir)) return;
    for (const file of fs.readdirSync(dir)) {
      const full = path.join(dir, file);
      const st = fs.statSync(full);
      if (st.isDirectory()) { walkDir(full); continue; }
      if (!file.endsWith('.js')) continue;

      const relative = path.relative(baseDir, full);
      const routePath = '/' + relative.replace(/\\/g, '/').replace(/\.js$/i, '').toLowerCase();
      const cfg = endpointConfigs[routePath] || {
        requireKey: !!apiConfig.apiSettings?.defaultRequireKey,
        path: routePath,
        example: null
      };

      scrapers[routePath] = {
        handler: require(full),
        config: cfg
      };
    }
  };

  walkDir(baseDir);
  return scrapers;
};

const scrapers = loadScrapers();

// ---------- API Key middleware ----------
const checkApiKey = (req, res, next) => {
  const reqPath = toLc(req.path);
  const endpoint = scrapers[reqPath];
  if (!endpoint) return next();                 // bukan scraper → lanjut

  if (!endpoint.config.requireKey) return next();

  const apiKey = req.headers['x-api-key'] || req.query.apikey;
  if (!apiKey) {
    return res.status(401).json({ status: false, message: 'API key diperlukan untuk endpoint ini' });
  }
  const keys = Array.isArray(apiConfig.apiSettings?.globalKey) ? apiConfig.apiSettings.globalKey : [];
  if (!keys.includes(apiKey)) {
    return res.status(403).json({ status: false, message: 'API key tidak valid' });
  }
  next();
};

// ---------- Dynamic scraper routes ----------
Object.entries(scrapers).forEach(([route, { handler, config }]) => {
  app.get(route, checkApiKey, async (req, res) => {
    try {
      // ambil semua query (kecuali apikey) sebagai argumen handler (urutan by key)
      const params = Object.keys(req.query || {})
        .filter((k) => k.toLowerCase() !== 'apikey')
        .sort()
        .map((k) => req.query[k]);

      const fn = typeof handler === 'function' ? handler : handler?.default;
      if (typeof fn !== 'function') {
        return res.status(500).json({ status: false, message: 'Handler tidak valid untuk endpoint ini' });
      }

      const result = await fn(...params);
      res.json({
        status: true,
        creator: apiConfig.apiSettings?.creator || 'unknown',
        result
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error?.message || String(error) });
    }
  });

  // bila di web-set.json path mengandung query (contoh: /download/tiktok?url=&apikey=)
  // sediakan helper di base path untuk kasih contoh pemakaian
  const hasQuery = !!(config.path && config.path.includes('?'));
  if (hasQuery) {
    const base = toLc((config.path || '').split('?')[0]);
    app.get(base, checkApiKey, (req, res) => {
      const exampleLink = (() => {
        // rakit contoh URL dari config.path + example (RAW, tidak di-encode)
        const raw = config.path || '';
        if (!config.example) return `${req.protocol}://${req.get('host')}${raw}param_value`;
        // isi 'url=' bila ada
        if (raw.includes('url=')) {
          const [prefix, q] = raw.split('?');
          const sp = new URLSearchParams(q);
          if (sp.has('url')) sp.set('url', config.example);
          return `${req.protocol}://${req.get('host')}${prefix}?${sp.toString()}`;
        }
        // fallback
        return `${req.protocol}://${req.get('host')}${raw}${config.example}`;
      })();

      return res.status(400).json({
        status: false,
        message: 'Parameter diperlukan',
        example: exampleLink
      });
    });
  }
});

// ---------- Pages ----------
// Landing page (bio/penjelasan)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Docs page (daftar fitur)
app.get('/docs', (req, res) => {
  const docsFile = path.join(__dirname, 'public', 'docs.html');
  if (exists(docsFile)) return res.sendFile(docsFile);
  // fallback kalau belum ada docs.html
  res.redirect('/'); // atau ganti ke 404 sesuai selera
});

// Opsional: health check
app.get('/status', (req, res) => res.json({ ok: true }));

// 404 handler
app.use((req, res) => {
  const f404 = path.join(__dirname, 'public', '404.html');
  if (exists(f404)) return res.status(404).sendFile(f404);
  res.status(404).json({ status: false, message: 'Halaman tidak ditemukan' });
});

// ---------- Start ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
  console.log('Endpoint yang tersedia:');
  Object.entries(scrapers).forEach(([p, { config }]) => {
    console.log(`- ${p} (Require Key: ${config.requireKey ? 'Ya' : 'Tidak'})`);
  });
});

module.exports = app;
