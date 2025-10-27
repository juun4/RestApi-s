---

<div align="center">

<img src="https://cdn.yupra.my.id/yp/rpvaywxy.jpg" width="100" style="border-radius: 16px;" alt="JunnAPIs Logo" />

# 🌐 JunnAPIs — REST API Suite  
**Kumpulan endpoint open-source siap pakai untuk kebutuhan harian.**  
Dari downloader, AI, sampai utilities — semua dikemas ringan, modular, dan bisa langsung dijalankan di web docs.

[![Live Demo](https://img.shields.io/badge/🌍_Live_Demo-junnapi.vercel.app-3b82f6?style=for-the-badge)](https://junnapi.vercel.app)
[![Docs](https://img.shields.io/badge/📖_Docs-Interactive-16a34a?style=for-the-badge)](https://junnapi.vercel.app/docs)
![Runtime](https://img.shields.io/badge/Node.js-18%2B-18181b?style=for-the-badge&logo=node.js)
![Deploy](https://img.shields.io/badge/Vercel-Auto_Deploy-000000?style=for-the-badge&logo=vercel)

</div>

---

## 🚀 Kenapa JunnAPIs?

| 💡 Fitur | 🔍 Deskripsi |
|----------|--------------|
| ⚡ **Cepat & Stabil** | Semua endpoint mengembalikan format JSON seragam |
| 🔐 **API Key Ready** | Setiap endpoint bisa diatur agar butuh apikey |
| 🧩 **Auto Route Register** | Folder `api-setting/Scrape` langsung jadi route |
| 🧠 **AI Support** | Dukungan Gemini AI untuk teks & gambar |
| 📘 **Docs Interaktif** | Bisa uji endpoint langsung di browser |
| ☁️ **Deploy 1 Klik** | Siap langsung ke Vercel tanpa konfigurasi tambahan |

---

## 🖼️ Tampilan

| Halaman | Cuplikan |
|----------|----------|
| **Landing Page** | ![Landing](https://qu.ax/ouxKU.jpg) |
| **Dokumentasi Interaktif** | ![Docs](https://qu.ax/OsSgb.jpg) |

---

## 🗂️ Struktur Folder

RestApi-s/ ├─ api-setting/ │  └─ Scrape/ │     ├─ downloader/ │     │  ├─ tiktok.js │     │  ├─ capcut.js │     │  └─ facebook.js │     ├─ instagram.js │     └─ ai/ │        └─ gemini-text.js ├─ public/ │  ├─ index.html │  ├─ docs.html │  └─ 404.html ├─ src/ │  └─ web-set.json ├─ index.js ├─ vercel.json └─ README.md

📂 **Keterangan Singkat**
- `api-setting/Scrape` → semua endpoint otomatis diregister.  
- `src/web-set.json` → branding, kategori, contoh API, dan apikey global.  
- `public/` → halaman UI (Landing, Docs, 404).  
- `index.js` → Express adaptor yang memanggil semua route.  

---

## ⚙️ Contoh Konfigurasi (`src/web-set.json`)

```json
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

🧠 Menambah Endpoint Baru

1. Buat file baru, misalnya api-setting/Scrape/downloader/capcut.js



import axios from "axios";

export default async function capcutDl(url) {
  try {
    const { data } = await axios.post("https://3bic.com/api/download", { url }, {
      headers: { "content-type": "application/json" }
    });

    if (!data?.originalVideoUrl) return { status: false, msg: "Gagal ambil data" };

    const base64url = data.originalVideoUrl.split("/api/cdn/")[1];
    const video = Buffer.from(base64url, "base64").toString();

    return {
      status: true,
      title: data.title || "",
      author: data.authorName || "",
      thumbnail: data.coverUrl || "",
      video
    };
  } catch (e) {
    return { status: false, msg: e.message };
  }
}

2. Tambahkan di src/web-set.json



{
  "title": "CapCut Downloader",
  "desc": "Unduh video dari CapCut",
  "path": "/downloader/capcut?url=&apikey=",
  "requireKey": true,
  "example": "https://www.capcut.com/t/1234567890"
}

3. Deploy ulang → endpoint muncul otomatis di docs 🎉




---

🌍 Contoh Penggunaan API

GET /downloader/capcut?url=<videoURL>&apikey=<key>
GET /facebook?url=<fbURL>&apikey=<key>
GET /instagram?url=<igURL>&apikey=<key>
GET /ai/gemini-text?text=<prompt>&apikey=<key>

Contoh respons:

{
  "status": true,
  "creator": "juun4",
  "result": {
    "title": "Example",
    "url": "https://cdn.example.com/video.mp4"
  }
}


---

💾 Deploy ke Vercel

1. Fork repo ini


2. Buka Vercel.com


3. Add New Project → Import from GitHub


4. Klik Deploy — otomatis langsung aktif!



📎 URL hasil:

Landing: https://<project>.vercel.app

Docs: https://<project>.vercel.app/docs



---

❓ FAQ

Q: Kenapa dapat error 401/403?
A: Endpoint memerlukan API Key (apikey query atau x-api-key header).

Q: Bisa di-deploy di VPS?
A: Fokus ke Vercel, tapi dapat dijalankan manual dengan node index.js.

Q: Bisa tambah kategori sendiri?
A: Bisa! Tambahkan folder + file baru di api-setting/Scrape/, lalu tambahkan ke web-set.json.


---

🧑‍💻 Kontribusi

Pull Request sangat diterima!

Fork → buat branch → ubah → PR

Sertakan contoh endpoint di web-set.json

Gunakan gaya penamaan yang konsisten



---

📜 Lisensi

MIT License — bebas digunakan, disalin, dan dimodifikasi, asal tetap mencantumkan atribusi.


---

<div align="center">
  Made with ❤️ by <b>juun4</b><br/>
  <a href="https://github.com/juun4/RestApi-s">GitHub</a> •
  <a href="https://wa.me/628672763507">WhatsApp</a> •
  <a href="https://youtube.com/@JunaaInHeree">YouTube</a>
</div>
```
---
