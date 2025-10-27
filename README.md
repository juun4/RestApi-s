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

<p align="center"><img src="./.github/neon-bottom.svg" width="100%"></p>📄 Penjelasan:

api-setting/Scrape → Semua handler endpoint (auto-register)

src/web-set.json → Branding, kategori, path, dan contoh API

public/docs.html → Halaman dokumentasi interaktif

index.js → Router otomatis untuk Vercel



---

⚙️ Konfigurasi (src/web-set.json)

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

Contoh Response:

{
  "status": true,
  "creator": "juun4",
  "result": {
    "title": "Contoh Judul",
    "url": "https://cdn.example.com/video.mp4"
  }
}


---

🧱 Menambah Endpoint Baru

1️⃣ Buat File

api-setting/Scrape/downloader/capcut.js

import axios from "axios";

export default async function capcutDl(url) {
  try {
    const { data } = await axios.post("https://3bic.com/api/download", { url });
    if (!data?.originalVideoUrl) return { status: false, msg: "Gagal ambil data" };
    const video = Buffer.from(data.originalVideoUrl.split("/api/cdn/")[1], "base64").toString();
    return { status: true, title: data.title || "", video };
  } catch (err) {
    return { status: false, msg: err.message };
  }
}

2️⃣ Daftarkan di src/web-set.json

{
  "title": "CapCut Downloader",
  "desc": "Unduh video dari CapCut",
  "path": "/downloader/capcut?url=&apikey=",
  "requireKey": true,
  "example": "https://www.capcut.com/t/1234567890"
}

3️⃣ Deploy ke Vercel

> Endpoint otomatis aktif dan muncul di halaman /docs.




---

☁️ Deploy ke Vercel

1. Fork repo ini


2. Buka vercel.com


3. Pilih Add New Project → Import GitHub Repo


4. Klik Deploy 🎉



URL Otomatis

Landing → https://<project>.vercel.app

Docs → https://<project>.vercel.app/docs



---

💬 FAQ

❓ 401 / 403 Unauthorized?

> Endpoint membutuhkan API key (apikey atau header x-api-key).



❓ Bisa jalan di VPS?

> Fokus ke Vercel, tapi bisa manual via node index.js.



❓ Nambah kategori baru?

> Tambahkan folder/file di api-setting/Scrape/, lalu update web-set.json.




---

🤝 Kontribusi

Pull Request sangat diterima!

Fork → buat branch → ubah → PR

Sertakan contoh di web-set.json agar tampil di /docs



---

⚖️ Lisensi

MIT License — bebas digunakan, dikembangkan, & dimodifikasi
asalkan tetap mencantumkan atribusi ke pembuat asli.


---

<div align="center">
  <sub>Made with 💙 by <b>juun4</b></sub><br/>
  <a href="https://github.com/juun4/RestApi-s">GitHub</a> • 
  <a href="https://wa.me/628672763507">WhatsApp</a> • 
  <a href="https://youtube.com/@JunaaInHeree">YouTube</a>
</div>
```
---