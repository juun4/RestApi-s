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

<!-- RGB BOTTOM -->
<img src="./.github/rgb-divider.svg" width="100%" alt="RGB Divider"/>

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

<img src="./.github/rgb-divider.svg" width="100%" alt="RGB Divider"/>

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

<img src="./.github/rgb-divider.svg" width="100%" alt="RGB Divider"/>

---

## 🗂️ Struktur Proyek

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
```

<img src="./.github/rgb-divider.svg" width="100%" alt="RGB Divider"/>

## 📄 Penjelasan singkat
api-setting/Scrape → semua handler endpoint (auto-register)
src/web-set.json → branding, kategori, path, example
public/docs.html → dokumentasi interaktif
index.js → router otomatis untuk Vercel

<img src="./.github/rgb-divider.svg" width="100%" alt="RGB Divider"/>

## ⚙️ Konfigurasi (src/web-set.json)

```plaintext
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
```
<img src="./.github/rgb-divider.svg" width="100%" alt="RGB Divider"/>

## ☁️ Deploy ke Vercel

Fork repo ini

Buka vercel.com → Add New Project → import repo

Klik Deploy 🎉


URL otomatis
Landing → https://<project>.vercel.app
Docs → https://<project>.vercel.app/docs

<img src="./.github/rgb-divider.svg" width="100%" alt="RGB Divider"/>

## 💬 FAQ

❓ 401 / 403 Unauthorized?

> Endpoint butuh API key (apikey atau header x-api-key).



❓ Jalan di VPS?

> Fokus Vercel. Bisa manual via node index.js tapi tidak direkomendasikan.



❓ Tambah kategori baru?

> Tambahkan file/folder di api-setting/Scrape/, lalu daftarkan di src/web-set.json.



<img src="./.github/rgb-divider.svg" width="100%" alt="RGB Divider"/>

## 🤝 Kontribusi

Fork → buat branch → PR

Ikuti struktur folder

Sertakan contoh pada web-set.json supaya muncul di /docs


<img src="./.github/rgb-divider.svg" width="100%" alt="RGB Divider"/>

## ⚖️ Lisensi

MIT License — bebas digunakan & dimodifikasi, sertakan atribusi ke pembuat asli.

<div align="center">

<img src="./.github/rgb-divider.svg" width="100%" alt="RGB Divider Footer Top"/>

<p>
  <a href="https://github.com/juun4/RestApi-s">
    <img alt="GitHub" height="28"
         src="https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white">
  </a>
  &nbsp;
  <a href="https://wa.me/628672763507">
    <img alt="WhatsApp" height="28"
         src="https://img.shields.io/badge/WhatsApp-25D366?logo=whatsapp&logoColor=white">
  </a>
  &nbsp;
  <a href="https://youtube.com/@JunaaInHeree">
    <img alt="YouTube" height="28"
         src="https://img.shields.io/badge/YouTube-FF0000?logo=youtube&logoColor=white">
  </a>
</p>

<!-- SVG RGB TEXT -->
<img src="data:image/svg+xml;utf8,
<svg xmlns='http://www.w3.org/2000/svg' width='320' height='32'>
  <defs>
    <linearGradient id='grad' x1='0' y1='0' x2='1' y2='0'>
      <stop offset='0%' stop-color='#ff004c'>
        <animate attributeName='stop-color' values='#ff004c;#00e5ff;#00ff85;#ff004c' dur='6s' repeatCount='indefinite'/>
      </stop>
      <stop offset='100%' stop-color='#00e5ff'>
        <animate attributeName='stop-color' values='#00e5ff;#00ff85;#ff004c;#00e5ff' dur='6s' repeatCount='indefinite'/>
      </stop>
    </linearGradient>
  </defs>
  <text x='50%' y='60%' text-anchor='middle' font-family='Segoe UI, sans-serif' font-size='16' font-weight='600' fill='url(%23grad)'>
    Made with 💙 by juun4
  </text>
</svg>" alt="RGB Text"/>

<img src="./.github/rgb-divider.svg" width="100%" alt="RGB Divider Footer Bottom"/>

</div>