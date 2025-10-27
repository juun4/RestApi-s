---

<div align="center">

<img src="https://cdn.yupra.my.id/yp/rpvaywxy.jpg" width="120" style="border-radius: 20px; box-shadow: 0 0 20px rgba(0,0,0,0.4)" alt="JunnAPIs Logo" />

<h1 style="font-weight: 800; font-size: 2.2em; margin-top: 10px;">
🌌 <span style="background: linear-gradient(90deg,#7aa2ff,#4ad295); -webkit-background-clip: text; color: transparent;">JunnAPIs</span>
</h1>

<p>
Koleksi REST API modular — siap pakai untuk <b>Downloader</b>, <b>AI</b>, <b>Search</b>, dan banyak lagi.<br>
Dibangun ringan, otomatis, dan dengan dokumentasi interaktif langsung di browser.
</p>

<p align="center">
  <a href="https://junnapi.vercel.app">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-junnapi.vercel.app-3b82f6?style=for-the-badge&logo=vercel">
  </a>
  <a href="https://junnapi.vercel.app/docs">
    <img src="https://img.shields.io/badge/📘_Docs-Interactive-16a34a?style=for-the-badge">
  </a>
  <img src="https://img.shields.io/badge/Node.js-18%2B-18181b?style=for-the-badge&logo=node.js">
  <img src="https://img.shields.io/badge/Vercel-Deploy_Ready-000000?style=for-the-badge&logo=vercel">
</p>

</div>

---

## 🧠 Overview

> 🚀 **JunnAPIs** adalah REST API yang dirancang modular dan otomatis.
>  
> Setiap file di folder `api-setting/Scrape` langsung menjadi endpoint aktif,  
> lengkap dengan dokumentasi dan contoh penggunaan otomatis di `/docs`.

---

## ✨ Fitur Unggulan

| ⚙️ Fitur | 💬 Deskripsi |
|----------|--------------|
| ⚡ **Cepat & Stabil** | Semua endpoint mengembalikan format JSON konsisten |
| 🔐 **API Key Support** | Gunakan `apikey` query untuk kontrol akses |
| 🧩 **Auto Route** | Setiap file di `api-setting/Scrape` otomatis jadi route |
| 🧠 **AI Tools** | Terintegrasi Gemini AI untuk teks & gambar |
| 🖥️ **Docs Interaktif** | Jalankan endpoint langsung dari web docs |
| ☁️ **Deploy Mudah (Vercel)** | Tanpa setup server, langsung online |

---

## 🖼️ Tampilan Antarmuka

<table align="center">
<tr>
<td align="center"><b>🏠 Landing Page</b></td>
<td align="center"><b>📘 Docs Page</b></td>
</tr>
<tr>
<td><img src="https://qu.ax/ouxKU.jpg" width="400"></td>
<td><img src="https://qu.ax/OsSgb.jpg" width="400"></td>
</tr>
</table>

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

🧾 Penjelasan:

api-setting/Scrape → Tempat semua handler endpoint (otomatis diregister)

src/web-set.json → Metadata kategori, nama API, dan contoh path

public/docs.html → Halaman dokumentasi interaktif

index.js → Router otomatis untuk seluruh endpoint



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

Response Umum:

{
  "status": true,
  "creator": "juun4",
  "result": {
    "title": "Contoh Judul",
    "url": "https://cdn.example.com/video.mp4"
  }
}


---

🧱 Menambahkan Endpoint Baru

1️⃣ Buat File di api-setting/Scrape/

Contoh: downloader/capcut.js

import axios from "axios";

export default async function capcutDl(url) {
  try {
    const { data } = await axios.post("https://3bic.com/api/download", { url });
    if (!data?.originalVideoUrl) return { status: false, msg: "Gagal ambil data" };

    const video = Buffer.from(data.originalVideoUrl.split("/api/cdn/")[1], "base64").toString();
    return { status: true, title: data.title, video };
  } catch (e) {
    return { status: false, msg: e.message };
  }
}

2️⃣ Tambahkan ke src/web-set.json

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


2. Masuk ke vercel.com


3. Klik Add New Project → Import GitHub Repo


4. Pilih repo hasil fork


5. Klik Deploy 🎉



🟢 URL Otomatis

Landing Page → https://<project>.vercel.app/

Docs → https://<project>.vercel.app/docs



---

💬 FAQ

❓ Kenapa dapat 401/403?

> Endpoint memerlukan API key (apikey query atau x-api-key header).



❓ Bisa di-host di VPS?

> Fokus ke Vercel. Jalur VPS bisa, tapi belum disediakan config-nya.



❓ Mau nambah kategori baru?

> Tambahkan folder baru di api-setting/Scrape/, lalu tambahkan item di web-set.json.




---

🤝 Kontribusi

💡 Kontribusi terbuka untuk semua!
Silakan buat PR (Pull Request) dengan:

Struktur folder konsisten

Tambah contoh di web-set.json

Pastikan endpoint bisa diakses via /docs



---

⚖️ Lisensi

Lisensi MIT — gratis digunakan, dikembangkan, dan dimodifikasi
dengan tetap mencantumkan atribusi ke pembuat asli.


---

<div align="center">
  <sub>Made with 💙 by <b>juun4</b></sub><br>
  <a href="https://github.com/juun4/RestApi-s">GitHub</a> • 
  <a href="https://wa.me/628572763507">WhatsApp</a> • 
  <a href="https://youtube.com/@JunaaInHeree">YouTube</a>
</div>
```
---

🎨 Kelebihan versi ini

Tampilan gelap elegan (pas banget untuk dark mode GitHub)

Semua heading dan badge selaras

Struktur bergradasi warna (biru-hijau khas JunnAPI)

Gaya presentasi seperti produk API profesional (ada tabel fitur, UI showcase, dan syntax clean)

Valid Markdown, tanpa error, bisa langsung render sempurna di GitHub



---