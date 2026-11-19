/**
 * ============================================================================
 * WD.PROJECT - BACKEND API CONTROLLER (Google Apps Script)
 * ============================================================================
 * File: code.gs
 * Versi: 1.0
 * Deskripsi: Menangani perutean Web App, penerimaan formulir penawaran (RFQ),
 *            penomoran ID otomatis anti-tabrakan, dan penyajian data katalog.
 * 
 * Standar Mutlak ZettBOT:
 * 1. Pemetaan Kolom Berbasis Indeks (Index-Based Array Mapping).
 * 2. Kebal distorsi waktu via getDisplayValues().
 * 3. Sinkronisasi instan via SpreadsheetApp.flush().
 * 4. Proteksi race condition via LockService.
 * ============================================================================
 */

// Konstanta Pemetaan Indeks Kolom Tabel PermintaanPenawaran (0-based)
const COL_RFQ = {
  ID: 0,                   // Kolom A: IDPenawaran
  TANGGAL: 1,              // Kolom B: TanggalWaktu
  NAMA_KLIEN: 2,           // Kolom C: NamaKlien
  NAMA_PERUSAHAAN: 3,      // Kolom D: NamaPerusahaan
  NO_WHATSAPP: 4,          // Kolom E: NoWhatsApp
  DIVISI: 5,               // Kolom F: DivisiLayanan
  SPESIFIKASI: 6,          // Kolom G: SpesifikasiKebutuhan
  STATUS: 7,               // Kolom H: Status
  CATATAN_INTERNAL: 8      // Kolom I: CatatanInternal
};

// Konstanta Pemetaan Indeks Kolom Tabel KatalogLayanan (0-based)
const COL_SRV = {
  ID: 0,                   // Kolom A: IDLayanan
  DIVISI: 1,               // Kolom B: Divisi
  NAMA: 2,                 // Kolom C: NamaLayanan
  DESKRIPSI: 3,            // Kolom D: DeskripsiSingkat
  STATUS_AKTIF: 4          // Kolom E: StatusAktif
};

// Konstanta Konfigurasi Usaha
const CONFIG_WD = {
  NAMA_BISNIS: "WD.Project",
  TAGLINE: "Fabrication & Maintenance",
  NO_WA_ADMIN: "6282292489480", // Format internasional tanpa simbol '+'
  LOKASI: "Jl. Balang Turungan, Paccerakkang, Kec. Biringkanaya, Kota Makassar, Sulawesi Selatan, 90241"
};

/**
 * Endpoint Utama Web App (HTML Viewer)
 */
function doGet(e) {
  var template = HtmlService.createTemplateFromFile("index");
  var output = template.evaluate();
  output.setTitle("WD.Project - Fabrication & Maintenance Makassar");
  output.addMetaTag("viewport", "width=device-width, initial-scale=1.0, maximum-scale=5.0");
  output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return output;
}

/**
 * Menyimpan data formulir permintaan penawaran (RFQ) ke Google Sheets
 * dan menyusun tautan pesan resmi WhatsApp.
 * 
 * @param {Object} payload Objek data primitif dari frontend
 * @return {Object} Status keberhasilan, ID Tiket, dan URL WhatsApp
 */
function submitRFQ(payload) {
  // 1. Kunci eksekusi backend untuk mencegah duplikasi penomoran ID (Concurrency Lock)
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); // Tunggu antrean maksimal 15 detik
  } catch (err) {
    return {
      success: false,
      message: "Server sedang sibuk menangani penawaran lain. Silakan coba 5 detik lagi."
    };
  }

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error("Spreadsheet database tidak terhubung.");
    }

    var sheet = ss.getSheetByName("PermintaanPenawaran");
    if (!sheet) {
      // Jalankan setup otomatis jika tab belum ada
      setupDatabase();
      sheet = ss.getSheetByName("PermintaanPenawaran");
    }

    // 2. Sanitasi & Validasi Input Primitif
    var namaKlien = sanitizeInput(payload.namaKlien);
    var namaPerusahaan = sanitizeInput(payload.namaPerusahaan) || "-";
    var noWhatsApp = sanitizeInput(payload.noWhatsApp);
    var divisiLayanan = sanitizeInput(payload.divisiLayanan) || "Konsultasi Umum";
    var spesifikasiKebutuhan = sanitizeInput(payload.spesifikasiKebutuhan);

    if (!namaKlien || namaKlien.length < 2) {
      throw new Error("Nama lengkap wajib diisi minimal 2 karakter.");
    }
    if (!noWhatsApp || noWhatsApp.length < 9) {
      throw new Error("Nomor WhatsApp tidak valid (minimal 9 digit).");
    }
    if (!spesifikasiKebutuhan || spesifikasiKebutuhan.length < 5) {
      throw new Error("Mohon uraikan kebutuhan atau jenis pekerjaan minimal 5 karakter.");
    }

    // 3. Generate ID Sekuensial Anti-Tabrakan: RFQ-YYYYMM-XXX
    var idPenawaran = generateSequentialRFQId(sheet);
    var timestampWaktu = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");

    // 4. Susun Baris Data Sesuai Urutan Kolom Indeks
    var rowData = new Array(9);
    rowData[COL_RFQ.ID] = idPenawaran;
    rowData[COL_RFQ.TANGGAL] = timestampWaktu;
    rowData[COL_RFQ.NAMA_KLIEN] = namaKlien;
    rowData[COL_RFQ.NAMA_PERUSAHAAN] = namaPerusahaan;
    rowData[COL_RFQ.NO_WHATSAPP] = noWhatsApp;
    rowData[COL_RFQ.DIVISI] = divisiLayanan;
    rowData[COL_RFQ.SPESIFIKASI] = spesifikasiKebutuhan;
    rowData[COL_RFQ.STATUS] = "Baru";
    rowData[COL_RFQ.CATATAN_INTERNAL] = "Diterima otomatis dari website WD.Project";

    // 5. Tulis ke Baris Paling Bawah
    sheet.appendRow(rowData);

    // 6. Paksa Google Sheets menulis seketika ke memori fisik
    SpreadsheetApp.flush();

    // 7. Format Template Pesan WhatsApp Resmi
    var pesanWA = "Halo Tim WD.Project Makassar,\n\n" +
      "Saya ingin mengajukan Permintaan Penawaran Harga (RFQ) via website resmi:\n\n" +
      "*No. Tiket RFQ:* " + idPenawaran + "\n" +
      "*Nama Klien:* " + namaKlien + "\n" +
      "*Perusahaan/Instansi:* " + namaPerusahaan + "\n" +
      "*No. WhatsApp:* " + noWhatsApp + "\n" +
      "*Divisi Layanan:* " + divisiLayanan + "\n\n" +
      "*Rincian Kebutuhan:* \n\"" + spesifikasiKebutuhan + "\"\n\n" +
      "Mohon informasi estimasi biaya dan jadwal survei/workshop. Terima kasih.";

    var waUrl = "https://wa.me/" + CONFIG_WD.NO_WA_ADMIN + "?text=" + encodeURIComponent(pesanWA);

    return {
      success: true,
      idPenawaran: idPenawaran,
      waUrl: waUrl,
      message: "Permintaan penawaran Anda berhasil dicatat dengan tiket " + idPenawaran + "."
    };

  } catch (e) {
    Logger.log("Error pada submitRFQ: " + e.toString());
    return {
      success: false,
      message: e.message || "Terjadi kesalahan sistem saat memproses penawaran."
    };
  } finally {
    // Selalu lepaskan kunci mutex
    lock.releaseLock();
  }
}

/**
 * Generator ID Sekuensial: RFQ-YYYYMM-XXX
 * Memindai angka tertinggi pada bulan berjalan di database
 */
function generateSequentialRFQId(sheet) {
  var now = new Date();
  var prefixTahunBulan = "RFQ-" + Utilities.formatDate(now, "Asia/Jakarta", "yyyyMM") + "-";
  
  var lastRow = sheet.getLastRow();
  var maxUrutan = 0;

  if (lastRow > 1) {
    // Baca seluruh kolom ID (Kolom A) menggunakan getDisplayValues bebas distorsi
    var ids = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
    for (var i = 0; i < ids.length; i++) {
      var currentId = ids[i][0].toString().trim();
      if (currentId.indexOf(prefixTahunBulan) === 0) {
        var strNomor = currentId.substring(prefixTahunBulan.length);
        var nomor = parseInt(strNomor, 10);
        if (!isNaN(nomor) && nomor > maxUrutan) {
          maxUrutan = nomor;
        }
      }
    }
  }

  var urutanBerikutnya = maxUrutan + 1;
  var padding = ("000" + urutanBerikutnya).slice(-3);
  return prefixTahunBulan + padding;
}

/**
 * Mengambil daftar katalog layanan yang aktif untuk ditampilkan di website
 */
function getKatalogLayanan() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return getKatalogFallback();

    var sheet = ss.getSheetByName("KatalogLayanan");
    if (!sheet) {
      setupDatabase();
      sheet = ss.getSheetByName("KatalogLayanan");
    }

    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) return getKatalogFallback();

    var values = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getDisplayValues();
    var list = [];

    for (var i = 0; i < values.length; i++) {
      var row = values[i];
      var status = row[COL_SRV.STATUS_AKTIF] ? row[COL_SRV.STATUS_AKTIF].trim().toLowerCase() : "";
      if (status === "aktif") {
        list.push({
          id: row[COL_SRV.ID],
          divisi: row[COL_SRV.DIVISI],
          nama: row[COL_SRV.NAMA],
          deskripsi: row[COL_SRV.DESKRIPSI]
        });
      }
    }

    return list.length > 0 ? list : getKatalogFallback();
  } catch (err) {
    Logger.log("Error getKatalogLayanan: " + err.toString());
    return getKatalogFallback();
  }
}

/**
 * Data fallback andalan jika spreadsheet belum diinisialisasi
 */
function getKatalogFallback() {
  return [
    {
      id: "SRV-001",
      divisi: "Fabrikasi",
      nama: "Vapor Blasting Presisi",
      deskripsi: "Pembersihan dan restorasi permukaan komponen mesin dengan wet-blasting, permukaan halus seperti baru tanpa mengikis dimensi part."
    },
    {
      id: "SRV-002",
      divisi: "Fabrikasi",
      nama: "Sandblasting & Surface Prep",
      deskripsi: "Pengupasan karat kerak tebal, cat lama, dan profilasi permukaan baja industri sebelum coating/cat anti-korosi."
    },
    {
      id: "SRV-003",
      divisi: "Fabrikasi",
      nama: "Pengelasan Presisi (MIG/TIG/MMA)",
      deskripsi: "Penyambungan logam presisi untuk pipa tekanan, tangki, dan konstruksi struktural dengan kualifikasi standar."
    },
    {
      id: "SRV-004",
      divisi: "Fabrikasi",
      nama: "Pagar, Kanopi & Tralis Jendela",
      deskripsi: "Pembuatan konstruksi pagar estetis, kanopi minimalis/spandek/alderon, dan tralis pengaman bermutu tahan cuaca."
    },
    {
      id: "SRV-005",
      divisi: "Maintenance",
      nama: "Perbaikan Mobil & Armada",
      deskripsi: "Servis berkala, tune-up, kaki-kaki, kelistrikan, dan overhaul mesin untuk kendaraan operasional perusahaan maupun pribadi."
    },
    {
      id: "SRV-006",
      divisi: "Maintenance",
      nama: "Maintenance Alat Berat",
      deskripsi: "Perbaikan sistem hidrolik, undercarriage, cylinder boom/arm, dan overhaul mesin excavator, forklift, dan loader."
    },
    {
      id: "SRV-007",
      divisi: "Maintenance",
      nama: "Servis Berkala & Tuning Genset",
      deskripsi: "Perawatan genset standby/prime industri, pembersihan injektor, kalibrasi governor AVR, dan pengujian beban rutin."
    },
    {
      id: "SRV-008",
      divisi: "Maintenance",
      nama: "On-Site Repair (Panggilan Lapangan)",
      deskripsi: "Tim mekanik responsif bergerak langsung ke workshop atau lokasi proyek klien di area Makassar dan Sulawesi Selatan."
    }
  ];
}

/**
 * Sanitasi string input untuk mencegah injeksi script dan karakter terlarang
 */
function sanitizeInput(str) {
  if (typeof str !== "string") {
    return str ? String(str).trim() : "";
  }
  return str.replace(/<[^>]*>?/gm, "").trim();
}

