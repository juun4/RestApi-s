---

<div align="center">

  <img src="https://cdn.yupra.my.id/yp/rpvaywxy.jpg" width="120" style="border-radius:20px;" alt="JunnAPIs Logo"/>

  <h1 style="font-weight:800; font-size:2.2em; margin-top:10px;">
    🌌 <span style="background:linear-gradient(90deg,#7aa2ff,#4ad295); -webkit-background-clip:text; color:transparent;">JunnAPIs</span>
  </h1>

  <p>
    Koleksi REST API modular — siap pakai untuk <b>Downloader</b>, <b>AI</b>, <b>Search</b>, dan banyak lagi.<br/>
    Dibangun ringan, otomatis, dan dengan dokumentasi interaktif langsung di browser.
  </p>

  <p>
    <a href="https://junnapi.vercel.app">
      <img src="https://img.shields.io/badge/🌐_Live_Demo-junnapi.vercel.app-3b82f6?style=for-the-badge&logo=vercel"/>
    </a>
    <a href="https://junnapi.vercel.app/docs">
      <img src="https://img.shields.io/badge/📘_Docs-Interactive-16a34a?style=for-the-badge"/>
    </a>
    <img src="https://img.shields.io/badge/Node.js-18%2B-18181b?style=for-the-badge&logo=node.js"/>
    <img src="https://img.shields.io/badge/Vercel-Deploy_Ready-000000?style=for-the-badge&logo=vercel"/>
  </p>

</div>

---

## ✨ Fitur Utama

| ⚙️ Fitur | 💬 Deskripsi |
|----------|--------------|
| ⚡ **Cepat & Stabil** | Semua endpoint JSON konsisten dan mudah digunakan |
| 🔐 **API Key Support** | Kontrol akses via query `apikey` atau header |
| 🧩 **Auto Route Register** | File otomatis jadi endpoint tanpa konfigurasi manual |
| 🤖 **AI Tools Ready** | Dukungan Gemini Text dan Image |
| 🖥️ **Docs Interaktif** | Jalankan API langsung dari browser |
| ☁️ **Deploy Cepat (Vercel)** | Tanpa setup server — langsung online |

---

## 🖼️ Cuplikan UI

<table align="center">
<tr>
<td align="center"><b>🏠 Landing Page</b></td>
<td align="center"><b>📘 Docs Page</b></td>
</tr>
<tr>
<td><img src="https://qu.ax/ouxKU.jpg" width="400"/></td>
<td><img src="https://qu.ax/OsSgb.jpg" width="400"/></td>
</tr>
</table>

---

## 🗂️ Struktur Proyek

<p align="center"><img src="./.github/neon-top.svg" width="100%"></p>

```plaintext
RestApi-s/
├─ api-setting/
│  └─ Scrape/
│     ├─ downloader/
│     │  ├─ tiktok.js
│     │  ├─ capcut.js
│     │  └─ facebook.js
│     ├─ instagram.js
│     └─ ai/
│        └─ gemini-text.js
├─ public/
│  ├─ index.html
│  ├─ docs.html
│  └─ 404.html
├─ src/
│  └─ web-set.json
├─ index.js
├─ vercel.json
└─ README.md

<p align="center"><img src="./.github/neon-bottom.svg" width="100%"></p>📄 Penjelasan singkat

api-setting/Scrape → semua handler endpoint (auto-register)

src/web-set.json → branding, kategori, path, example

public/docs.html → dokumentasi interaktif

index.js → router otomatis untuk Vercel



---

⚙️ Konfigurasi (src/web-set.json)

<p align="center"><img src="./.github/neon-top.svg" width="100%"></p>{
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
          "desc": "Ambil video (no wm / hd)",
          "path": "/download/tiktok?url=&apikey=",
          "requireKey": true,
          "example": "https://vt.tiktok.com/ZGJBtcsDq/"
        }
      ]
    },
    {
      "title": "AI",
      "icon": "🤖",
      "items": [
        {
          "title": "Gemini Text",
          "desc": "Jawab pertanyaan berbasis teks",
          "path": "/ai/gemini-text?text=&apikey=",
          "requireKey": true,
          "example": "jelaskan apa itu REST API"
        }
      ]
    }
  ]
}

<p align="center"><img src="./.github/neon-bottom.svg" width="100%"></p>
---

🧩 Contoh Endpoint

<p align="center"><img src="./.github/neon-top.svg" width="100%"></p>GET /downloader/capcut?url=<videoURL>&apikey=<key>
GET /download/tiktok?url=<videoURL>&apikey=<key>
GET /facebook?url=<fbURL>&apikey=<key>
GET /instagram?url=<igURL>&apikey=<key>
GET /ai/gemini-text?text=<prompt>&apikey=<key>

Response umum

{
  "status": true,
  "creator": "juun4",
  "result": { "...": "..." }
}

<p align="center"><img src="./.github/neon-bottom.svg" width="100%"></p>
---

☁️ Deploy ke Vercel

<p align="center"><img src="./.github/neon-top.svg" width="100%"></p>1. Fork repo ini


2. Buka https://vercel.com → Add New Project → import repo


3. Klik Deploy 🎉



URL otomatis

Landing → https://<project>.vercel.app

Docs → https://<project>.vercel.app/docs


<p align="center"><img src="./.github/neon-bottom.svg" width="100%"></p>
---

💬 FAQ

<p align="center"><img src="./.github/neon-top.svg" width="100%"></p>❓ 401 / 403 Unauthorized?

> Endpoint butuh API key (apikey atau header x-api-key).



❓ Jalan di VPS?

> Fokus Vercel. Bisa manual via node index.js tapi tidak didokumentasikan di repo ini.



❓ Tambah kategori baru?

> Tambahkan file/folder di api-setting/Scrape/, lalu daftarkan item di src/web-set.json.



<p align="center"><img src="./.github/neon-bottom.svg" width="100%"></p>
---

🤝 Kontribusi

<p align="center"><img src="./.github/neon-top.svg" width="100%"></p>Fork → buat branch → PR

Ikuti struktur folder

Sertakan contoh pada web-set.json supaya muncul di /docs


<p align="center"><img src="./.github/neon-bottom.svg" width="100%"></p>
---

⚖️ Lisensi

<p align="center"><img src="./.github/neon-top.svg" width="100%"></p>MIT License — bebas digunakan & dimodifikasi, sertakan atribusi ke pembuat asli.

<p align="center"><img src="./.github/neon-bottom.svg" width="100%"></p>
---

<div align="center">
  <sub>Made with 💙 by <b>juun4</b></sub><br/>
  <a href="https://github.com/juun4/RestApi-s">GitHub</a> •
  <a href="https://wa.me/628672763507">WhatsApp</a> •
  <a href="https://youtube.com/@JunaaInHeree">YouTube</a>
</div>
```