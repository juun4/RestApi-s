Here’s a polished README.md you can drop straight into your repo. It’s lively (badges, banner, screenshots), has clear quick-start, deploy to Vercel, usage examples (cURL & JS), and a tidy endpoints table that’s easy to extend.


---

<!-- Banner -->
<p align="center">
  <img src="https://cdn.yupra.my.id/yp/rpvaywxy.jpg" width="140" height="140" style="border-radius:16px" alt="JunnAPIs Logo" />
</p>

<h1 align="center">JunnAPIs • Free & Simple REST Endpoints</h1>

<p align="center">
  Kumpulan endpoint REST minimalis untuk kebutuhan dev harian: downloader, AI tools, searching utilities, dan lainnya.
</p>

<p align="center">
  <a href="https://junnapi.vercel.app"><img alt="Website" src="https://img.shields.io/badge/Live-Website-7aa2ff?style=for-the-badge"></a>
  <a href="https://junnapi.vercel.app/docs"><img alt="Docs" src="https://img.shields.io/badge/Open-Docs-4ad295?style=for-the-badge"></a>
  <img alt="Node" src="https://img.shields.io/badge/Node-18+-111736?style=for-the-badge&logo=node.js">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-0e1430?style=for-the-badge">
</p>

---

## ✨ Highlights

- ⚡ **Cepat & sederhana** — JSON konsisten, parameter jelas.
- 🔐 **API Key Support** — aktifkan per-endpoint sesuai kebutuhan.
- 📦 **Modular Scrapers** — auto-register dari folder `api-setting/Scrape`.
- 🔍 **Docs interaktif** — tombol **Open Endpoint** + **Example Code** (cURL / CJS / ESM) + **Execute** langsung di web.
- ☁️ **Siap Vercel** — satu klik deploy & auto scale.
- 🧭 **Kategori terorganisir** — tab + badge jumlah endpoint.

---

## 🖼️ Cuplikan UI

> Halaman beranda + hero
>
> ![Hero](https://dummyimage.com/1200x420/0b1020/ffffff&text=JunnAPIs+Hero)

> Halaman **Docs** dengan runner modal (Example Code + Execute)
>
> ![Docs](https://dummyimage.com/1200x420/0e1430/ffffff&text=Docs:+Open+Endpoint+%2B+Example+Code)

> *Gambar hanya pratinjau—kunjungi live demo untuk pengalaman penuh.*

---

## 📚 Daftar Isi

- [Struktur Proyek](#-struktur-proyek)
- [Quick Start (Local)](#-quick-start-local)
- [Deploy ke Vercel](#-deploy-ke-vercel)
- [Konfigurasi](#-konfigurasi)
- [Endpoint Contoh](#-endpoint-contoh)
- [Cara Menambah Endpoint](#-cara-menambah-endpoint)
- [FAQ](#-faq)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 🗂 Struktur Proyek

. ├─ api-setting/ │  └─ Scrape/                 # scraper per endpoint (auto-register) │     ├─ download/ │     │  ├─ tiktok.js │     │  ├─ capcut.js │     │  ├─ facebook.js │     │  └─ instagram.js │     └─ ai/ │        └─ gemini-text.js ├─ public/ │  ├─ index.html              # landing │  ├─ docs.html               # docs UI (interaktif) │  └─ 404.html ├─ src/ │  └─ web-set.json            # branding, kategori, item/path, example, requireKey ├─ server.js                  # Express server + auto route from Scrape └─ README.md

---

## 🚀 Quick Start (Local)

```bash
# 1) Clone
git clone https://github.com/juun4/RestApi-s.git
cd RestApi-s

# 2) Install
npm i

# 3) Jalankan
npm run start
# default: http://localhost:3000

Buka:

http://localhost:3000 → landing

http://localhost:3000/docs → dokumentasi interaktif



---

☁️ Deploy ke Vercel

1. Fork repo ini.


2. Klik Deploy ke Vercel (import dari GitHub).


3. Set Build & Output:

Framework: Other

Build command: (kosong) atau npm i

Output: public

Node: 18 atau lebih baru



4. Pastikan server dijalankan via vercel.json atau package.json:

Aplikasi ini adalah serverless friendly (Express). Contoh minimal:

vercel.json (opsional) men-route semua ke server.js.





> Sudah ada konfigurasi siap pakai—cukup deploy. 🎉




---

⚙️ Konfigurasi

Semua UI & daftar endpoint diatur lewat src/web-set.json.

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

> Catatan:

requireKey bisa override per item.

globalKey berisi daftar API key valid (x-api-key header atau apikey query).





---

🌐 Endpoint Contoh

Kategori	Endpoint	Query Utama	Perlu Key	Keterangan

Downloader	/download/tiktok?url=&apikey=	url	Ya	TikTok video/info
Downloader	/download/capcut?url=&apikey=	url	Ya	CapCut original video
Downloader	/download/facebook?url=&apikey=	url	Ya	Facebook multi-quality
Downloader	/download/instagram?url=&apikey=	url	Ya	Instagram links
AI	/ai/gemini-text?prompt=&apikey=	prompt	Ya	Jawab pertanyaan berbasis teks


> Daftar lengkap + Example Code langsung ada di /docs.




---

🧪 Contoh Penggunaan

cURL

curl -s "https://junnapi.vercel.app/download/tiktok?url=https://vt.tiktok.com/ZGJBtcsDq/&apikey=free" \
  -H "Accept: application/json"

JavaScript (ESM / Browser)

async function fetchApi(url){
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  return await res.json();
}

const base = 'https://junnapi.vercel.app/download/tiktok';
const qs   = new URLSearchParams({ url: 'https://vt.tiktok.com/ZGJBtcsDq/', apikey: 'free' });
const data = await fetchApi(`${base}?${qs}`);
console.log(data);


---

➕ Cara Menambah Endpoint

1. Buat file baru di api-setting/Scrape/... sesuai kategori.

// contoh: api-setting/Scrape/download/mytool.js
module.exports = async function myTool(mainParam) {
  // lakukan scraping/fetch…
  return { status: true, result: { ... } };
}


2. Tambahkan item pada src/web-set.json (title, desc, path, example).


3. Jalankan ulang server—route akan terdaftar otomatis.



> Handler dipanggil dengan urutan parameter dari query string (tanpa apikey).




---

❓ FAQ

Q: Kenapa apikey wajib?
A: Untuk fitur/frekuensi tertentu, API key menjaga rate-limit & penyalahgunaan. Kamu bisa menyalakan defaultRequireKey:false jika ingin open.

Q: Bagaimana mengganti branding/logo?
A: Ubah branding.siteName, tagline, dan pakai gambar favoritmu di public/index.html.

Q: Bisa self-host selain Vercel?
A: Bisa. Ini Express biasa—pakai PM2, Docker, Fly.io, Railway, dll.


---

🤝 Kontribusi

Pull Request sangat welcome!
Langkah cepat:

1. Fork → buat branch → commit perubahan


2. Pastikan lulus linting (npm i saja, simple)


3. PR dengan deskripsi jelas + preview bila menyentuh UI




---

📣 Sosial & Kontak

GitHub: @juun4

WhatsApp: +62 857-2763-507 (direct: https://wa.me/628572763507)

YouTube: @JunaaInHeree (https://youtube.com/@JunaaInHeree)



---

🪪 Lisensi

MIT © 2025 juun4 — bebas digunakan & dimodifikasi.
Kredit untuk layanan pihak ketiga yang dijadikan sumber scraping/API.


---