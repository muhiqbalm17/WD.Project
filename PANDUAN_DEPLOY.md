# PANDUAN DEPLOY WEBSITE WD.PROJECT KE VERCEL
(Fabrication & Maintenance Makassar)

Website **WD.Project** telah dioptimalkan secara penuh untuk platform **Vercel** (Global Edge CDN, SSL Otomatis, dan Kecepatan Akses Instan).

---

## 1. STRUKTUR BERKAS SIAP DEPLOY (VERCEL ARCHITECTURE)
```text
c:\Users\HP\NEWP\
├── assets/
│   └── logo.png              <-- Logo resmi WD.Project (Oranye & Hitam)
├── index.html                <-- Tampilan website utama (Frontend SPA & Smart RFQ Form)
├── vercel.json               <-- Konfigurasi routing, cache & header keamanan Vercel
├── package.json              <-- Manifest projek Node/Vercel
├── prd.md                    <-- Spesifikasi sistem & Master Living Context
├── ZettBOT.md                <-- Sakelar identitas ZettBOT
└── PANDUAN_DEPLOY.md         <-- Dokumen petunjuk ini
```

---

## 2. PILIHAN CARA DEPLOY KE VERCEL (GRATIS SELAMANYA)

Anda dapat memilih salah satu dari 2 cara mudah berikut:

### CARA 1: Melalui GitHub & Dashboard Vercel (Sangat Direkomendasikan)
Cara ini paling praktis dan otomatis memperbarui website setiap kali Anda mengubah file:
1. **Buat Repository Baru di GitHub:**
   - Buka [github.com](https://github.com) dan buat repository baru bernama `wd-project`.
   - Upload/push semua file dari folder `c:\Users\HP\NEWP` ke repository tersebut.
2. **Buka Vercel:**
   - Kunjungi [vercel.com](https://vercel.com) dan masuk menggunakan akun GitHub Anda.
   - Klik tombol **"Add New..."** lalu pilih **"Project"**.
   - Cari repository `wd-project` Anda, lalu klik **"Import"**.
3. **Klik Deploy:**
   - Biarkan pengaturan default (Framework Preset: *Other*).
   - Klik tombol **"Deploy"**.
4. **Selesai!** Dalam 15–30 detik, website WD.Project Anda sudah resmi online di alamat seperti:
   `https://wd-project.vercel.app`

---

### CARA 2: Langsung Menggunakan Vercel CLI dari Terminal Komputer
Jika Anda ingin langsung mengunggah dari laptop/komputer tanpa membuka GitHub:
1. Buka PowerShell / Terminal di folder `c:\Users\HP\NEWP`.
2. Ketikkan perintah:
   ```bash
   npx vercel
   ```
3. Tekan `Enter` untuk menyetujui akun Vercel Anda dan konfirmasi pembuatan projek:
   - *Set up and deploy?* -> Ketik `y`
   - *Which scope?* -> Pilih akun Anda
   - *Link to existing project?* -> Ketik `n`
   - *Project's name?* -> Tekan `Enter` (default: `wd-project-makassar`)
   - *In which directory is your code located?* -> Tekan `Enter` (`./`)
4. Setelah pratinjau berhasil, deploy langsung ke server produksi utama dengan perintah:
   ```bash
   npx vercel --prod
   ```
5. Website Anda langsung online dan Vercel akan memberikan tautan publiknya!

---

## 3. CARA MEMASANG DOMAIN SENDIRI (CUSTOM DOMAIN)
Jika Anda memiliki nama domain sendiri (seperti `wdproject.id` atau `wdproject.com`):
1. Masuk ke dashboard Vercel Anda di [vercel.com](https://vercel.com).
2. Klik projek **wd-project-makassar**.
3. Masuk ke menu **Settings** -> pilih tab **Domains**.
4. Masukkan nama domain Anda, lalu klik **Add**.
5. Ikuti panduan DNS yang diberikan Vercel (cukup tambahkan CNAME / A record di penyedia domain Anda).
6. Sertifikat SSL HTTPS otomatis diterbitkan dan aktif gratis selamanya!

---

## 4. CARA KERJA FORMULIR RFQ & WHATSAPP
- Calon klien membuka website di Vercel.
- Saat mengisi formulir RFQ dan menekan tombol *"Kirim Permintaan"*, sistem secara otomatis:
  1. Men-generate nomor tiket unik berformat `RFQ-YYYYMM-XXX`.
  2. Menyimpan rekap di penyimpanan browser lokal (*localStorage*).
  3. Membuka aplikasi WhatsApp resmi WD.Project (**+62 822-9248-9480**) dengan draf pesan penawaran yang sudah terformat rapi.
- Hasil: 0% risiko error database backend, kecepatan respon instan, dan calon klien langsung terhubung dengan tim sales/estimator Anda!
