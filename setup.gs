/**
 * ============================================================================
 * WD.PROJECT - SETUP & SAFE DATABASE MIGRATION SCRIPT
 * ============================================================================
 * File: setup.gs
 * Versi: 1.0 (Idempoten & Non-Destruktif)
 * Deskripsi: Menginisialisasi lembar kerja Google Sheets untuk WD.Project
 *            (Divisi Fabrikasi & Maintenance Makassar).
 * 
 * Aturan Mutlak:
 * - DILARANG menggunakan karakter underscore (_) pada nama tab sheet.
 * - Idempoten: Aman dijalankan berulang kali tanpa merusak data yang sudah ada.
 * - Data dummy hanya diisi saat tab baru pertama kali dibuat dalam kondisi kosong.
 * ============================================================================
 */

function setupDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("Spreadsheet aktif tidak ditemukan. Pastikan script ini dijalankan di dalam Google Sheets terikat (Bound Script).");
  }

  Logger.log("=== Memulai Inisialisasi Database WD.Project ===");

  // 1. Inisialisasi Tab PermintaanPenawaran
  var headersPermintaan = [
    "IDPenawaran",
    "TanggalWaktu",
    "NamaKlien",
    "NamaPerusahaan",
    "NoWhatsApp",
    "DivisiLayanan",
    "SpesifikasiKebutuhan",
    "Status",
    "CatatanInternal"
  ];
  
  var dummyPermintaan = [
    [
      "RFQ-202611-001",
      Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss"),
      "Bapak Ridwan",
      "PT Makassar Indah Steel",
      "081234567890",
      "Fabrikasi",
      "Sandblasting & Vapor Blasting tangki penyimpanan kapasitas 3000L serta pembuatan kanopi workshop baja",
      "Baru",
      "Sampel data awal sistem"
    ],
    [
      "RFQ-202611-002",
      Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss"),
      "Ibu Sri Wahyuni",
      "CV Celebes Agro",
      "082198765432",
      "Maintenance",
      "Overhaul berkala genset industri 50 kVA dan perbaikan hidrolik excavator loader",
      "Diproses",
      "Jadwal inspeksi teknisi disetujui"
    ]
  ];

  inisialisasiTabSafe(ss, "PermintaanPenawaran", headersPermintaan, dummyPermintaan);

  // 2. Inisialisasi Tab KatalogLayanan
  var headersKatalog = [
    "IDLayanan",
    "Divisi",
    "NamaLayanan",
    "DeskripsiSingkat",
    "StatusAktif"
  ];

  var dummyKatalog = [
    [
      "SRV-001",
      "Fabrikasi",
      "Vapor Blasting Presisi",
      "Pembersihan dan restorasi permukaan logam dengan metode wet-blasting tekanan terkontrol, hasil halus tanpa mengikis dimensi part.",
      "Aktif"
    ],
    [
      "SRV-002",
      "Fabrikasi",
      "Sandblasting & Surface Prep",
      "Pengupasan karat kerak berat, cat lama, dan persiapan profil permukaan sebelum proses coating/painting struktur baja industri.",
      "Aktif"
    ],
    [
      "SRV-003",
      "Fabrikasi",
      "Pengelasan Presisi (MIG/TIG/MMA)",
      "Pengerjaan sambungan logam bersertifikat untuk tangki, pipa presisi, dan perakitan rangka besi berkekuatan tinggi.",
      "Aktif"
    ],
    [
      "SRV-004",
      "Fabrikasi",
      "Pagar, Kanopi & Tralis",
      "Desain dan fabrikasi kanopi spandek/alderon/kaca, pagar minimalis/industri, serta tralis pengaman jendela tahan karat.",
      "Aktif"
    ],
    [
      "SRV-005",
      "Maintenance",
      "Perbaikan & Servis Mobil / Armada",
      "Perawatan rutin mesin, transmisi, kaki-kaki, kelistrikan, dan sistem pengereman kendaraan operasional perusahaan maupun pribadi.",
      "Aktif"
    ],
    [
      "SRV-006",
      "Maintenance",
      "Overhaul & Perbaikan Alat Berat",
      "Layanan teknis sistem hidrolik, engine overhaul, swing gear, dan servis pencegahan pada excavator, forklift, dan wheel loader.",
      "Aktif"
    ],
    [
      "SRV-007",
      "Maintenance",
      "Servis Berkala & Tuning Genset",
      "Pemeriksaan berkala, kalibrasi sistem AVR/governor, pembersihan injektor, pergantian filter, dan pengetesan beban (load-bank test).",
      "Aktif"
    ],
    [
      "SRV-008",
      "Maintenance",
      "Servis Darurat On-Site (Panggilan)",
      "Layanan tim mekanik tanggap darurat yang siap meluncur ke lokasi proyek / pabrik klien di wilayah Makassar & sekitarnya.",
      "Aktif"
    ]
  ];

  inisialisasiTabSafe(ss, "KatalogLayanan", headersKatalog, dummyKatalog);

  // Pastikan perubahan tertulis instan
  SpreadsheetApp.flush();
  Logger.log("=== Inisialisasi Database WD.Project Selesai dengan Aman! ===");
}

/**
 * Helper Safe Migration:
 * - Menjaga tab lama agar tidak terhapus.
 * - Menambah header baru di sebelah kanan jika ada pembaruan versi.
 * - Memasukkan data dummy hanya jika sheet baru dibuat / kosong melompong.
 */
function inisialisasiTabSafe(spreadsheet, namaSheet, headerWajib, dataDummyAwal) {
  var sheet = spreadsheet.getSheetByName(namaSheet);
  var sheetBaruDibuat = false;

  if (!sheet) {
    sheet = spreadsheet.insertSheet(namaSheet);
    sheetBaruDibuat = true;
    Logger.log("Sheet baru dibuat: " + namaSheet);
  } else {
    Logger.log("Sheet sudah ada, memeriksa sinkronisasi kolom: " + namaSheet);
  }

  // Cek apakah sheet kosong
  var barisTerisi = sheet.getLastRow();
  var kolomTerisi = sheet.getLastColumn();

  if (barisTerisi === 0 || kolomTerisi === 0) {
    // Sheet benar-benar kosong: pasang header dan dummy awal
    sheet.getRange(1, 1, 1, headerWajib.length).setValues([headerWajib]);
    formatHeaderRow(sheet, headerWajib.length);

    if (dataDummyAwal && dataDummyAwal.length > 0) {
      sheet.getRange(2, 1, dataDummyAwal.length, headerWajib.length).setValues(dataDummyAwal);
    }
    Logger.log("Header dan data awal berhasil dipasang pada: " + namaSheet);
  } else {
    // Sheet sudah terisi data: Lakukan Safe Migration Header tanpa hapus data pengguna
    var existingHeaders = sheet.getRange(1, 1, 1, kolomTerisi).getDisplayValues()[0];
    
    // Periksa apakah ada kolom baru yang belum ada di spreadsheet pengguna
    for (var i = 0; i < headerWajib.length; i++) {
      var targetColName = headerWajib[i];
      var ditemukan = false;
      for (var j = 0; j < existingHeaders.length; j++) {
        if (existingHeaders[j].trim().toLowerCase() === targetColName.trim().toLowerCase()) {
          ditemukan = true;
          break;
        }
      }
      
      // Jika kolom belum ada, sisipkan di posisi paling kanan (Safe Migration)
      if (!ditemukan) {
        var kolomBaruIndex = sheet.getLastColumn() + 1;
        sheet.getRange(1, kolomBaruIndex).setValue(targetColName);
        formatSingleHeaderCell(sheet, 1, kolomBaruIndex);
        Logger.log("Safe Migration: Menambahkan kolom baru [" + targetColName + "] pada posisi kolom ke-" + kolomBaruIndex);
      }
    }
  }

  // Rapikan lebar kolom
  sheet.autoResizeColumns(1, Math.max(headerWajib.length, sheet.getLastColumn()));
}

/**
 * Styling Header Google Sheets Profesional
 */
function formatHeaderRow(sheet, totalKolom) {
  var headerRange = sheet.getRange(1, 1, 1, totalKolom);
  headerRange.setBackground("#0F172A"); // Slate Dark khas WD.Project
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
}

function formatSingleHeaderCell(sheet, baris, kolom) {
  var cell = sheet.getRange(baris, kolom);
  cell.setBackground("#EA580C"); // Amber Orange penanda kolom baru
  cell.setFontColor("#FFFFFF");
  cell.setFontWeight("bold");
  cell.setHorizontalAlignment("center");
}

