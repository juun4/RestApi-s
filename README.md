---

<!-- Banner -->
<p align="center">
  <img src="https://cdn.yupra.my.id/yp/rpvaywxy.jpg" width="120" height="120" style="border-radius:16px" alt="JunnAPIs Logo" />
</p>

<h1 align="center">JunnAPIs — Free & Simple REST Endpoints</h1>

<p align="center">
  API ringan berbasis Node.js untuk kebutuhan dev harian — Downloader, AI Tools, Search Utility, dan banyak lagi!
</p>

<p align="center">
  <a href="https://junnapi.vercel.app"><img alt="Website" src="https://img.shields.io/badge/🌐_Live_Site-junnapi.vercel.app-7aa2ff?style=for-the-badge"></a>
  <a href="https://junnapi.vercel.app/docs"><img alt="Docs" src="https://img.shields.io/badge/Open_Docs-4ad295?style=for-the-badge&logo=swagger"></a>
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/juun4/RestApi-s"><img alt="Deploy to Vercel" src="https://vercel.com/button"></a>
  <img alt="Node" src="https://img.shields.io/badge/Node-18+-111736?style=for-the-badge&logo=node.js">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-0e1430?style=for-the-badge">
</p>

---

## ✨ Fitur Utama

- ⚡ **Cepat & Sederhana** — Respons JSON ringan dan konsisten.
- 🔐 **Support API Key** — Bisa diaktifkan per endpoint.
- 📦 **Auto-Register Scraper** — File di `api-setting/Scrape/` langsung jadi route.
- 🧭 **Docs Interaktif** — Jalankan endpoint langsung dari browser.
- ☁️ **100% Vercel Ready** — Deploy satu klik, tidak butuh konfigurasi tambahan.

---

## 🖼️ Cuplikan UI

> Halaman Beranda  
> ![JunnAPIs Home](https://qu.ax/ouxKU.jpg)

> Halaman Dokumentasi  
> ![JunnAPIs Docs](https://qu.ax/OsSgb.jpg)

---

## 🗂 Struktur Proyek

RestApi-s/ 
├─ api-setting/ 
│  └─ Scrape/ # Semua scraper / handler endpoint 
│     ├─ download/ 
│     │  ├─ tiktok.js 
│     │  ├─ capcut.js 
│     │  ├─ facebook.js 
│     │  └─ instagram.js 
│     └─ ai/ 
│        └─ gemini-text.js 
├─ public/ 
│  ├─ index.html # Landing page 
│  ├─ docs.html # Dokumentasi interaktif 
│  └─ 404.html 
├─ src/ 
│  └─ web-set.json # Branding, kategori, path, example, requireKey 
├─ index.js # Express adapter (dipanggil oleh Vercel) 
├─ vercel.json # Routing otomatis → server.js 
└─ README.md

---

## 🚀 Deploy ke Vercel (Direkomendasikan)

> Proyek ini dibuat **khusus untuk platform Vercel**.  
> Tidak perlu setup server — cukup klik satu tombol deploy.

### 🔘 1-Klik Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/juun4/RestApi-s)

---

### ⚙️ Pengaturan Project
- **Framework Preset:** *Other*
- **Build Command:** `npm i`
- **Output Directory:** `public`
- **Node Version:** 18+

---

### 🔁 Routing Otomatis (`vercel.json`)
```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [
    { "src": "/src/(.*)", "dest": "/src/$1" },
    { "src": "/docs", "dest": "/public/docs.html" },
    { "src": "/", "dest": "/public/index.html" },
    { "src": "/.*", "dest": "/server.js" }
  ]
}


---

💻 Jalankan Lokal (Opsional)

> Untuk test di lokal dengan environment yang sama seperti Vercel:



npm i -g vercel
vercel dev
# buka http://localhost:3000


---

⚙️ Konfigurasi web-set.json

{
  "branding": {
    "siteName": "JunnAPIs",
    "tagline": "Free & Simple REST Endpoints",
    "repo": "https://github.com/juun4/RestApi-s",
    "deployUrl": "https://junnapi.vercel.app"
  },
  "apiSettings": {
    "creator": "juun4",
    "defaultRequireKey": true,
    "globalKey": ["free"]
  },
  "categories": [
    {
      "title": "Downloader",
      "icon": "📥",
      "items": [
        {
          "title": "TikTok Downloader",
          "desc": "Ambil video (no wm / hd) atau image set",
          "path": "/download/tiktok?url=&apikey=",
          "requireKey": true,
          "example": "https://vt.tiktok.com/ZGJBtcsDq/"
        }
      ]
    }
  ]
}


---

🌐 Endpoint Contoh

Kategori	Endpoint	Query	Perlu Key	Deskripsi

Downloader	/download/tiktok?url=&apikey=	url	✅ Ya	TikTok video/info
Downloader	/download/capcut?url=&apikey=	url	✅ Ya	CapCut video original
Downloader	/download/facebook?url=&apikey=	url	✅ Ya	Facebook multi-quality
Downloader	/download/instagram?url=&apikey=	url	✅ Ya	Instagram links
AI	/ai/gemini-text?prompt=&apikey=	prompt	✅ Ya	Jawaban AI berbasis teks


> Semua endpoint bisa diuji langsung di /docs.




---

🧪 Contoh Pemakaian

cURL

curl -s "https://junnapi.vercel.app/download/tiktok?url=https://vt.tiktok.com/ZGJBtcsDq/&apikey=free" \
  -H "Accept: application/json"

JavaScript

async function fetchApi(url){
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  return await res.json();
}
const base = 'https://junnapi.vercel.app/download/tiktok';
const qs   = new URLSearchParams({ url: 'https://vt.tiktok.com/ZGJBtcsDq/', apikey: 'free' });
console.log(await fetchApi(`${base}?${qs}`));


---

➕ Tambah Endpoint Baru

1. Buat file di api-setting/Scrape/ sesuai kategori, misalnya:

api-setting/Scrape/download/youtube.js


2. Isi dengan handler:

module.exports = async function youtube(url) {
  return { status: true, result: { url, source: 'YouTube Downloader' } };
};


3. Tambahkan item di src/web-set.json
(title, desc, path, example)


4. Commit → push → Vercel auto-redeploy.




---

🤝 Kontribusi

Pull Request & ide fitur baru selalu diterima!

> Tips: Kamu bisa nonaktifkan requireKey kalau ingin api ini lebih simple




---

📣 Sosial

GitHub: @juun4

WhatsApp: 628572763507

YouTube: @JunaaInHeree



---

🪪 Lisensi

MIT © 2025 juun4
Gunakan dengan bijak — konten pihak ketiga tunduk pada aturan sumbernya.

---