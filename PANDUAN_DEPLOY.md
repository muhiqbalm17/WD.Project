# PANDUAN DEPLOY WEBSITE NEXT.JS WD.PROJECT KE VERCEL
(Fabrication & Maintenance Makassar)

Website **WD.Project** telah berarsitektur **Next.js 14 App Router** dan siap di-deploy langsung ke **Vercel** dengan fitur *Zero-Config*.

---

## 1. STRUKTUR BERKAS RESMI (NEXT.JS ARCHITECTURE)
```text
c:\Users\HP\NEWP\
├── public/
│   └── assets/
│       └── logo.png              <-- Logo resmi WD.Project (Oranye & Hitam)
├── src/
│   └── app/
│       ├── layout.js             <-- Root layout (Plus Jakarta Sans & SEO Metadata)
│       ├── page.js               <-- Halaman utama kompilasi komponen
│       ├── globals.css           <-- Tailwind directives & industrial theme styling
│       └── components/           <-- 8 Komponen modular UI
│           ├── Navbar.jsx        <-- Header & navigasi responsif
│           ├── HeroSection.jsx   <-- Hero B2B industrial showcase
│           ├── Keunggulan.jsx    <-- 4 kartu keunggulan workshop
│           ├── KatalogLayanan.jsx<-- Tab interaktif 2 divisi (Fabrikasi & Maintenance)
│           ├── Portofolio.jsx    <-- Galeri hasil pengerjaan & filter kategori
│           ├── AlurKerja.jsx     <-- 4 langkah proses kerja
│           ├── FormRFQ.jsx       <-- Smart RFQ form + auto-ticket + WhatsApp
│           ├── LokasiKontak.jsx  <-- Peta & kontak workshop Biringkanaya Makassar
│           └── Footer.jsx        <-- Footer resmi
├── next.config.mjs               <-- Konfigurasi Next.js & Image Optimization
├── tailwind.config.mjs           <-- Konfigurasi palet warna & theme Tailwind
├── postcss.config.mjs            <-- Konfigurasi compiler PostCSS
├── package.json                  <-- Dependencies Next.js 14, React 18, Tailwind
├── vercel.json                   <-- Header keamanan Vercel
├── prd.md                        <-- Spesifikasi sistem & Master Living Context
├── revisi.md                     <-- Log riwayat revisi
└── ZettBOT.md                    <-- Sakelar identitas resmi ZettBOT
```

---

## 2. CARA MENJALANKAN LOKAL DI KOMPUTER

1. **Pastikan Node.js Terpasang:**
   - Unduh Node.js LTS di: [nodejs.org](https://nodejs.org) lalu jalankan installernya sampai selesai.
2. **Jalankan Project:**
   Buka terminal di folder `c:\Users\HP\NEWP`, lalu ketik:
   ```bash
   npm install
   npm run dev
   ```
3. Buka browser di alamat: **`http://localhost:3000`**

---

## 3. CARA DEPLOY KE VERCEL (ZERO-CONFIG)

### Pilihan A: Melalui GitHub (Rekomendasi)
1. Unggah seluruh folder projek ini ke repositori GitHub Anda.
2. Di Vercel Dashboard ([vercel.com](https://vercel.com)), Vercel akan otomatis mendeteksi **Framework Preset: Next.js**.
3. Pastikan kolom **Root Directory** mengarah ke folder yang berisi `package.json` (jika file ada di dalam subfolder `NEWP`, atur Root Directory ke `NEWP`).
4. Klik **Deploy**! Vercel otomatis menjalankan `npm run build` dan website langsung online aktif.

### Pilihan B: Menggunakan Vercel CLI
Jalankan di terminal:
```bash
npx vercel --prod
```

---

## 4. CARA MEMASANG DOMAIN SENDIRI (CUSTOM DOMAIN)
1. Buka project Anda di dashboard Vercel -> menu **Settings** -> tab **Domains**.
2. Masukkan nama domain Anda (misal `wdproject.id` atau `wdproject.com`).
3. Hubungkan CNAME record sesuai instruksi Vercel. SSL HTTPS otomatis terbit dan gratis selamanya!
