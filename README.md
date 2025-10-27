<div align="center">

  <img src="https://cdn.yupra.my.id/yp/rpvaywxy.jpg" width="120" style="border-radius:20px" alt="JunnAPIs Logo" />

  <h1 style="font-weight:800; font-size:2.2em; margin:10px 0 4px;">
    🌌 <span style="background:linear-gradient(90deg,#7aa2ff,#4ad295); -webkit-background-clip:text; color:transparent;">JunnAPIs</span>
  </h1>

  <p>
    Koleksi REST API modular — siap pakai untuk <b>Downloader</b>, <b>AI</b>, <b>Search</b>, dan banyak lagi.<br/>
    Ringan, otomatis, dengan dokumentasi interaktif langsung di browser.
  </p>

  <p>
    <a href="https://junnapi.vercel.app">
      <img src="https://img.shields.io/badge/🌐_Live_Demo-junnapi.vercel.app-3b82f6?style=for-the-badge&logo=vercel" alt="Live Demo"/>
    </a>
    <a href="https://junnapi.vercel.app/docs">
      <img src="https://img.shields.io/badge/📘_Docs-Interactive-16a34a?style=for-the-badge" alt="Docs"/>
    </a>
    <img src="https://img.shields.io/badge/Node.js-18%2B-18181b?style=for-the-badge&logo=node.js" alt="Node 18+"/>
    <img src="https://img.shields.io/badge/Vercel-Deploy_Ready-000000?style=for-the-badge&logo=vercel" alt="Vercel"/>
  </p>

</div>

## 🧠 Overview

> **JunnAPIs** dirancang modular & otomatis: setiap file di `api-setting/Scrape` langsung terdaftar sebagai endpoint, dengan contoh penggunaan otomatis pada halaman **/docs**.

---

## ✨ Fitur Unggulan

| ⚙️ Fitur | 💬 Deskripsi |
|---|---|
| ⚡ **Cepat & Stabil** | Output JSON konsisten, parameter jelas |
| 🔐 **API Key Support** | `apikey` via query/header untuk kontrol akses |
| 🧩 **Auto Route** | File di `api-setting/Scrape` → otomatis jadi route |
| 🤖 **AI Tools** | Contoh: Gemini text, siap ditambah image/audio |
| 🖥️ **Docs Interaktif** | Open Endpoint + Example Code (cURL/CJS/ESM) + Execute |
| ☁️ **Deploy Mudah** | Optimized untuk **Vercel**, tanpa setup server |

---

## 🖼️ Cuplikan UI

<table align="center">
  <tr>
    <td align="center"><b>🏠 Landing Page</b></td>
    <td align="center"><b>📘 Docs Page</b></td>
  </tr>
  <tr>
    <td><img src="https://qu.ax/ouxKU.jpg" width="400" alt="Landing"/></td>
    <td><img src="https://qu.ax/OsSgb.jpg" width="400" alt="Docs"/></td>
  </tr>
</table>

---

## 🗂️ Struktur Proyek

```text
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

Ringkas:

api-setting/Scrape → semua handler endpoint (auto-register)

src/web-set.json → branding, kategori, item (title/desc/path/example/requireKey)

public/docs.html → dokumentasi interaktif (Open/Execute)

index.js → router otomatis untuk Vercel



---

⚙️ Contoh Konfigurasi (src/web-set.json)

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


---

🧩 Contoh Endpoint

GET /downloader/capcut?url=<videoURL>&apikey=<key>
GET /download/tiktok?url=<videoURL>&apikey=<key>
GET /facebook?url=<fbURL>&apikey=<key>
GET /instagram?url=<igURL>&apikey=<key>
GET /ai/gemini-text?text=<prompt>&apikey=<key>

Response umum:

{
  "status": true,
  "creator": "juun4",
  "result": { "...": "..." }
}


---

🧱 Menambahkan Endpoint

1) Buat file di api-setting/Scrape/... (contoh: downloader/capcut.js)

import axios from "axios";

export default async function capcutDl(url) {
  try {
    const { data } = await axios.post("https://3bic.com/api/download", { url });
    if (!data?.originalVideoUrl) return { status: false, msg: "Gagal ambil data" };
    const video = Buffer.from(data.originalVideoUrl.split("/api/cdn/")[1], "base64").toString();
    return { status: true, title: data.title || "", video };
  } catch (e) {
    return { status: false, msg: e.message };
  }
}

2) Daftarkan di src/web-set.json

{
  "title": "CapCut Downloader",
  "desc": "Unduh video dari CapCut",
  "path": "/downloader/capcut?url=&apikey=",
  "requireKey": true,
  "example": "https://www.capcut.com/t/1234567890"
}

3) Deploy → otomatis muncul di halaman /docs.


---

☁️ Deploy ke Vercel

1. Fork repo ini


2. Buka vercel.com → Add New Project → pilih repo


3. Tanpa build step (Node/Express) → Deploy 🎉



URL Otomatis

Landing → https://<project>.vercel.app/

Docs → https://<project>.vercel.app/docs



---

💬 FAQ

Kenapa 401/403?
Endpoint membutuhkan API key (apikey atau header x-api-key). Pastikan nilainya terdaftar di apiSettings.globalKey.

Bisa di VPS?
Fokus repo ini untuk Vercel. Jalur VPS memungkinkan, tapi belum didokumentasikan di sini.

Tambah kategori baru?
Buat folder/file di api-setting/Scrape/... lalu tambahkan item di src/web-set.json.


---

🤝 Kontribusi

Pull Request welcome!
Ikuti struktur folder & tambahkan contoh di web-set.json agar tampil di /docs.


---

⚖️ Lisensi

MIT — bebas dipakai & dimodifikasi, sertakan atribusi pembuat.


---

<div align="center">
  <sub>Made with 💙 by <b>juun4</b></sub><br/>
  <a href="https://github.com/juun4/RestApi-s">GitHub</a> •
  <a href="https://wa.me/628672763507">WhatsApp</a> •
  <a href="https://youtube.com/@JunaaInHeree">YouTube</a>
</div>
```