const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.set('trust proxy', true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// statics
app.use(express.static('public'));
app.use('/src', express.static('src'));

const apiConfig = require('./src/web-set.json');

// ===== util =====
const toLc = (p) => (p || '').toString().replace(/\/+$/, '').toLowerCase();

// ===== loader scrapers =====
const loadScrapers = () => {
  const scrapers = {};
  const endpointConfigs = {};
  const baseDir = path.join(__dirname, 'api-setting', 'Scrape');

  // muat konfigurasi endpoint dari web-set.json (supaya sinkron dengan UI)
  if (apiConfig && Array.isArray(apiConfig.categories)) {
    apiConfig.categories.forEach((cat) => {
      (cat.items || []).forEach((item) => {
        const cleanPath = toLc((item.path || '').split('?')[0]);
        if (!cleanPath) return;
        endpointConfigs[cleanPath] = {
          requireKey: item.requireKey !== undefined
            ? !!item.requireKey
            : !!apiConfig.apiSettings?.defaultRequireKey,
          path: item.path || cleanPath
        };
      });
    });
  }

  const walkDir = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) { walkDir(full); continue; }
      if (!file.endsWith('.js')) continue;

      const relative = path.relative(baseDir, full);
      const routePath = '/' + relative.replace(/\\/g, '/').replace(/\.js$/i, '').toLowerCase();

      const config = endpointConfigs[routePath] || {
        requireKey: !!apiConfig.apiSettings?.defaultRequireKey,
        path: routePath
      };

      scrapers[routePath] = {
        handler: require(full),
        config
      };
    }
  };

  walkDir(baseDir);
  return scrapers;
};

const scrapers = loadScrapers();

// ===== middleware cek key per endpoint =====
const checkApiKey = (req, res, next) => {
  const reqPath = toLc(req.path);
  const endpoint = scrapers[reqPath];
  if (!endpoint) return next();

  if (!endpoint.config.requireKey) return next();

  const apiKey = req.headers['x-api-key'] || req.query.apikey;
  if (!apiKey) {
    return res.status(401).json({ status: false, message: 'API key diperlukan untuk endpoint ini' });
  }
  if (!Array.isArray(apiConfig.apiSettings?.globalKey) ||
      !apiConfig.apiSettings.globalKey.includes(apiKey)) {
    return res.status(403).json({ status: false, message: 'API key tidak valid' });
  }
  next();
};

// ===== daftar route scraper otomatis =====
Object.entries(scrapers).forEach(([route, { handler, config }]) => {
  app.get(route, checkApiKey, async (req, res) => {
    try {
      const params = Object.keys(req.query || {})
        .filter((k) => k.toLowerCase() !== 'apikey')
        .sort()
        .map((k) => req.query[k]);

      const fn = typeof handler === 'function' ? handler : handler?.default;
      if (typeof fn !== 'function') {
        return res.status(500).json({ status: false, message: 'Handler tidak valid untuk endpoint ini' });
      }
      const result = await fn(...params);
      res.json({ status: true, creator: apiConfig.apiSettings?.creator || 'unknown', result });
    } catch (error) {
      res.status(500).json({ status: false, message: error?.message || String(error) });
    }
  });

  // jika config.path ada tanda tanya, sediakan contoh pemakaian di base path
  const hasQuery = !!(config.path && config.path.includes('?'));
  if (hasQuery) {
    const base = toLc((config.path || '').split('?')[0]);
    app.get(base, checkApiKey, (req, res) => {
      return res.status(400).json({
        status: false,
        message: 'Parameter diperlukan',
        example: `${req.protocol}://${req.get('host')}${config.path}param_value`
      });
    });
  }
});

// ===== halaman utama & 404 =====
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.use((req, res) => {
  const f404 = path.join(__dirname, 'public', '404.html');
  if (fs.existsSync(f404)) return res.status(404).sendFile(f404);
  res.status(404).json({ status: false, message: 'Halaman tidak ditemukan' });
});

// ===== start =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
  console.log('Endpoint yang tersedia:');
  Object.entries(scrapers).forEach(([p, { config }]) => {
    console.log(`- ${p} (Require Key: ${config.requireKey ? 'Ya' : 'Tidak'})`);
  });
});

module.exports = app;
