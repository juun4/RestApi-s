Siap. Berikut README.md lengkap yang sudah rapi (mobile-friendly), fokus deploy via Vercel, struktur proyek ringkas + tabel deskripsi, fitur, cuplikan antarmuka, contoh konfigurasi, cara tambah endpoint, FAQ, kontribusi, dan lisensi. Tinggal salin ke README.md repo kamu.

<div align="center">
  <img src="https://cdn.yupra.my.id/yp/rpvaywxy.jpg" alt="JunnAPIs" width="96" style="border-radius:16px" />
  <h1>JunnAPIs — RestApi-s</h1>

  <p>
    Kumpulan endpoint REST minimalis untuk kebutuhan harian:
    downloader, AI tools, searching utilities, dan banyak lagi —
    dengan dokumentasi interaktif & eksekusi langsung di web.
  </p>

  <!-- Badges -->
  <p>
    <a href="https://junnapi.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-junnapi.vercel.app-7aa2ff?style=for-the-badge" /></a>
    <a href="https://junnapi.vercel.app/docs"><img src="https://img.shields.io/badge/Docs-Interactive-4ad295?style=for-the-badge" /></a>
    <img src="https://img.shields.io/badge/Runtime-Node.js%2018+-18181b?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel" />
  </p>
</div>

---

## ✨ Fitur Utama

- ⚡ **Cepat & Sederhana** — JSON konsisten, parameter jelas.
- 🔐 **API Key Support** — aktifkan per-endpoint sesuai kebutuhan.
- 🧩 **Modular Scrapers** — auto-register dari folder `api-setting/Scrape`.
- 📘 **Docs Interaktif** — tombol **Open Endpoint** + **Example Code** (cURL / CJS / ESM) + **Execute** langsung di web.
- ☁️ **Siap Vercel** — cukup satu klik deploy, tanpa setup server.
- 🗂️ **Kategori Terorganisir** — tab + *badge* jumlah endpoint per kategori.

---

## 🖼️ Cuplikan UI

**Landing / Hero**
> Halaman depan dengan tombol **Get Started** (scroll ke highlight) & **View Documentation**.

**Docs Interaktif**
> Kartu endpoint per kategori, tombol **Open Endpoint** + **Example Code** (modal runner dengan parameter, cURL/CJS/ESM, dan tombol **Execute**).

> *Cuplikan hanya pratinjau — kunjungi live demo untuk pengalaman penuh.*

---

## 🗂️ Struktur Proyek

RestApi-s ├─ api-setting/ │  └─ Scrape/ │     ├─ downloader/ │     │  ├─ tiktok.js │     │  ├─ capcut.js │     │  └─ facebook.js │     ├─ instagram.js │     └─ ai/ │        └─ gemini-text.js ├─ public/ │  ├─ index.html │  ├─ docs.html │  └─ 404.html ├─ src/ │  └─ web-set.json ├─ index.js ├─ vercel.json └─ README.md

**Ringkasan direktori**

| Path | Fungsi |
|---|---|
| `api-setting/Scrape/` | Tempat semua scraper/handler endpoint. Auto-register jadi route. |
| `api-setting/Scrape/downloader/` | Sub-kategori downloader (`tiktok.js`, `capcut.js`, `facebook.js`, …). |
| `api-setting/Scrape/ai/` | Sub-kategori AI (mis. `gemini-text.js`). |
| `public/index.html` | Landing / hero page. |
| `public/docs.html` | Docs interaktif (Open Endpoint, Example Code + Execute). |
| `public/404.html` | Halaman 404. |
| `src/web-set.json` | Branding, kategori, daftar item (`title`, `desc`, `path`, `example`, `requireKey`). |
| `index.js` | Express adapter (dipanggil oleh Vercel). Auto route dari folder Scrape. |
| `vercel.json` | Routing Vercel ke `index.js` dan file publik. |

---

## 🚀 Deploy ke Vercel (Direkomendasikan)

Proyek ini dibuat **khusus** untuk platform **Vercel** (tanpa setup VPS).

1. **Fork** repo ini.
2. Buka [vercel.com](https://vercel.com) → **Add New Project** → pilih repo.
3. **Root Directory**: `/` (default).
4. **Build & Output**: tidak perlu build step (Node/Express).
5. Pastikan `vercel.json` seperti di bawah:

```json
{
  "version": 2,
  "functions": {
    "api/index.js": { "runtime": "nodejs18.x" }
  },
  "routes": [
    { "src": "/src/(.*)", "dest": "/src/$1" },
    { "src": "/docs", "dest": "/public/docs.html" },
    { "src": "/(.*)", "dest": "/api/index.js" }
  ]
}

6. Klik Deploy.



URL hasil:

Landing: https://<project>.vercel.app/

Docs: https://<project>.vercel.app/docs



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
          "desc": "Ambil video (no wm / hd) atau image set",
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

> Catatan

defaultRequireKey: jika true, semua endpoint butuh API key kecuali item menimpa dengan requireKey:false.

globalKey: daftar key yang diizinkan (contoh: "free" untuk demo).

path: boleh dengan query (?url=&apikey=) agar docs bisa membangkitkan contoh otomatis.





---

➕ Menambah Endpoint

1. Buat file handler di api-setting/Scrape/... sesuai kategori.
Contoh: api-setting/Scrape/downloader/capcut.js

import axios from "axios";

export default async function capcutDl(url) {
  try {
    const headers = {
      "accept": "application/json, text/plain, */*",
      "content-type": "application/json"
    }

    const { data } = await axios.post("https://3bic.com/api/download", { url }, { headers })
    if (!data || !data.originalVideoUrl) {
      return { status: false, msg: "Gagal ambil data" }
    }

    const base64url = data.originalVideoUrl.split("/api/cdn/")[1]
    const video = Buffer.from(base64url, "base64").toString()

    return {
      status: true,
      title: data.title || "",
      author: data.authorName || "",
      thumbnail: data.coverUrl || "",
      video
    }
  } catch (err) {
    return { status: false, msg: err.message }
  }
}


2. Tambahkan item-nya di src/web-set.json:

{
  "title": "CapCut Downloader",
  "desc": "Unduh video CapCut",
  "path": "/downloader/capcut?url=&apikey=",
  "requireKey": true,
  "example": "https://www.capcut.com/t/1234567890"
}


3. Deploy — route akan terdaftar otomatis (auto-register) dan tampil di docs.




---

🔌 Endpoint Contoh

GET /download/tiktok?url=<videoUrl>&apikey=<key>
GET /downloader/capcut?url=<capcutUrl>&apikey=<key>
GET /facebook?url=<facebookUrl>&apikey=<key>
GET /instagram?url=<igUrl>&apikey=<key>
GET /ai/gemini-text?text=<prompt>&apikey=<key>

Response (umum)

{
  "status": true,
  "creator": "juun4",
  "result": { "...": "..." }
}


---

❓ FAQ

Q: Kenapa dapat 401/403?
A: Endpoint butuh API key. Pastikan mengirim apikey (query) atau x-api-key (header) dan nilainya termasuk dalam apiSettings.globalKey.

Q: Bisa deploy di VPS?
A: Proyek ini difokuskan untuk Vercel. Jalur VPS belum didokumentasikan di repo ini.

Q: Bagaimana menambah kategori baru?
A: Tambah folder / file handler di api-setting/Scrape/..., lalu daftarkan item di src/web-set.json.


---

🤝 Kontribusi

Fork → buat branch → PR.

Ikuti gaya kode yang ada, dan sertakan contoh di web-set.json agar tampil di docs.



---

📄 Lisensi

Lisensi MIT — bebas digunakan & dimodifikasi, tetap sertakan atribusi.


---

<p align="center">
  Made by <b>juun4</b> • <a href="https://github.com/juun4/RestApi-s">GitHub</a> • <a href="https://wa.me/628672763507">WhatsApp</a> • <a href="https://youtube.com/@JunaaInHeree">YouTube</a>
</p>
```