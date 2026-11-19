'use client';

import { useState } from 'react';

const FABRIKASI = [
  {
    badge: 'UNGGULAN WORKSHOP', badgeColor: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30',
    sub: 'Restorasi Logam',
    title: 'Vapor Blasting Presisi (Wet Blasting)',
    desc: 'Metode pembersihan permukaan menggunakan media mikro bertekanan air terkontrol. Membersihkan kerak, oksidasi, dan kotoran membandel hingga ke celah sempit tanpa mengikis dimensi atau ulir baut mesin.',
    specs: ['Permukaan satin mengkilap seperti baru', 'Sangat aman untuk blok mesin, karburator & velg', 'Bebas debu kering berbahaya'],
    layanan: 'Vapor Blasting Presisi',
  },
  {
    badge: 'HEAVY DUTY', badgeColor: 'bg-amber-500/15 text-amber-600 border-amber-500/30',
    sub: 'Surface Prep',
    title: 'Sandblasting Industri',
    desc: 'Pengikisan kerak karat berat, cat lama, dan kerak manufaktur pada struktur baja besar, rangka alat berat, tangki penampung sebelum proses pelapisan cat anti-karat.',
    specs: ['Standar kebersihan profil Sa 2.5', 'Daya rekat cat baru meningkat 300%', 'Kapasitas workshop & pengerjaan on-site'],
    layanan: 'Sandblasting Industri',
  },
  {
    badge: 'WELDER AHLI', badgeColor: 'bg-blue-500/15 text-blue-600 border-blue-500/30',
    sub: 'MIG / TIG / MMA',
    title: 'Pengelasan Struktur & Fabrikasi',
    desc: 'Pengerjaan sambungan logam berdaya tahan tinggi untuk instalasi industri, perakitan rangka besi, tangki penyimpanan cairan, dan konstruksi struktural.',
    specs: ['Las TIG (Argon) untuk stainless & aluminium', 'Las MIG/CO2 kecepatan tinggi', 'Hasil rapi dan lolos uji visual ketat'],
    layanan: 'Pengelasan Struktur & Fabrikasi',
  },
  {
    badge: 'ARSITEKTURAL', badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
    sub: 'Hunian & Gudang',
    title: 'Fabrikasi Kanopi Baja & Besi',
    desc: 'Pembuatan kanopi carport, kanopi loading dock gudang, dengan variasi atap spandek, alderon uPVC, solarflat, hingga tempered glass.',
    specs: ['Rangka besi hollow tebal bergaransi', 'Cat dasar epoxy anti karat menyeluruh', 'Desain bebas request sesuai arsitektur'],
    layanan: 'Fabrikasi Kanopi Baja & Besi',
  },
  {
    badge: 'ARSITEKTURAL', badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
    sub: 'Keamanan & Estetika',
    title: 'Pagar & Gerbang Industri',
    desc: 'Pagar dorong minimalis, pagar lipat, pintu gerbang workshop berbobot besar, dengan pergerakan roda bearing presisi yang enteng digeser.',
    specs: ['Desain minimalis modern & expanded metal', 'Finishing cat duco tahan cuaca Makassar', 'Sistem engsel & rel heavy duty anti anjlok'],
    layanan: 'Pagar & Gerbang Industri',
  },
  {
    badge: 'PROTEKSI', badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
    sub: 'Gedung & Rumah',
    title: 'Tralis Jendela & Pengaman Khusus',
    desc: 'Tralis jendela besi tempa/minimalis, kerangkeng pengaman outdoor AC, pintu kassa baja, dan railing tangga/balkon yang kokoh dan presisi.',
    specs: ['Ukuran presisi diukur langsung di lokasi', 'Pola kerapatan aman dan estetis', 'Pemasangan rapi tanpa merusak kusen'],
    layanan: 'Tralis Jendela & Pengaman Khusus',
  },
];

const MAINTENANCE = [
  {
    badge: 'ALAT BERAT', badgeColor: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30',
    sub: 'Industri & Tambang',
    title: 'Overhaul & Maintenance Alat Berat',
    desc: 'Layanan perbaikan hidrolik bocor, penggantian hose, servis cylinder boom/arm, undercarriage track, dan overhaul mesin diesel untuk excavator, forklift, dan wheel loader.',
    specs: ['Diagnosa tekanan sistem hidrolik', 'Servis komponen transmisi & final drive', 'Garansi fungsi pasca perbaikan'],
    layanan: 'Overhaul & Maintenance Alat Berat',
  },
  {
    badge: 'DAYA LISTRIK', badgeColor: 'bg-amber-500/15 text-amber-600 border-amber-500/30',
    sub: 'Standby & Prime',
    title: 'Servis & Maintenance Genset Industri',
    desc: 'Perawatan rutin berkala genset 10 kVA hingga 500+ kVA. Pembersihan sistem bahan bakar, kalibrasi governor/AVR, pergantian oli filter, hingga load-bank test.',
    specs: ['Mencegah kegagalan start saat PLN padam', 'Pengecekan otomatis panel ATS / AMF', 'Kontrak maintenance berkala bulanan/tahunan'],
    layanan: 'Servis & Maintenance Genset Industri',
  },
  {
    badge: 'KENDARAAN', badgeColor: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30',
    sub: 'Fleet & Pribadi',
    title: 'Perbaikan Mobil & Armada Usaha',
    desc: 'Tune-up mesin injeksi/diesel common-rail, servis rem & suspensi, overhaul gearbox manual/matic, dan penanganan kelistrikan mobil operasional.',
    specs: ['Paket servis berkala armada perusahaan', 'Suku cadang orisinil & bergaransi', 'Waktu pengerjaan efisien, downtime minimal'],
    layanan: 'Perbaikan Mobil & Armada Usaha',
  },
  {
    badge: 'TANGGAP DARURAT', badgeColor: 'bg-red-500/15 text-red-600 border-red-500/30',
    sub: 'Panggilan Lapangan',
    title: 'Layanan Perbaikan On-Site',
    desc: 'Ketika unit mesin atau alat berat tidak dapat dipindahkan ke workshop, tim mekanik spesialis kami siap datang langsung dengan toolkit diagnosa ke lokasi.',
    specs: ['Cakupan Makassar, Biringkanaya, Maros, Gowa', 'Diagnosa cepat di tempat pengerjaan', 'Hotline WhatsApp responsif 24 jam'],
    layanan: 'Layanan Perbaikan On-Site',
    isWA: true,
  },
];

function ServiceCard({ card, divisi, onPilih }) {
  return (
    <div className="glass-card rounded-xl p-6 flex flex-col justify-between bg-white border border-slate-200 shadow-sm">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2.5 py-1 text-xs font-bold rounded border ${card.badgeColor}`}>{card.badge}</span>
          <span className="text-xs text-slate-500">{card.sub}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">{card.desc}</p>
        <ul className="text-xs text-slate-600 space-y-1.5 mb-6">
          {card.specs.map((s) => (
            <li key={s} className="flex items-center">
              <span className="text-brand-orange mr-2">✓</span> {s}
            </li>
          ))}
        </ul>
      </div>
      {card.isWA ? (
        <a
          href="https://wa.me/6282292489480?text=Halo%20WD.Project,%20saya%20membutuhkan%20layanan%20mekanik%20darurat%20di%20lokasi%20saya."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold bg-brand-orange hover:bg-brand-orangeDark text-white text-center transition-all block shadow-md"
        >
          Panggil Teknisi ke Lokasi Sekarang
        </a>
      ) : (
        <button
          onClick={() => onPilih(divisi, card.layanan)}
          className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold bg-slate-100 hover:bg-brand-orange text-slate-800 hover:text-white border border-slate-300 hover:border-brand-orange transition-all"
        >
          Minta Penawaran
        </button>
      )}
    </div>
  );
}

export default function KatalogLayanan() {
  const [tab, setTab] = useState('fabrikasi');

  function pilihLayananRFQ(divisi, nama) {
    const sel = document.getElementById('divisiLayanan');
    const ta = document.getElementById('spesifikasiKebutuhan');
    if (sel) sel.value = divisi;
    if (ta) ta.value = `Saya tertarik mengajukan penawaran untuk layanan: ${nama}.\nMohon estimasi biaya dan persyaratannya.`;
    document.getElementById('form-rfq')?.scrollIntoView({ behavior: 'smooth' });
  }

  const list = tab === 'fabrikasi' ? FABRIKASI : MAINTENANCE;

  return (
    <section id="divisi-layanan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">KATALOG SPESIALISASI</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Layanan Dua Divisi Terpadu</h2>
          </div>

          {/* Tab Selector */}
          <div className="mt-6 md:mt-0 inline-flex p-1.5 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setTab('fabrikasi')}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center ${tab === 'fabrikasi' ? 'tab-active' : 'tab-inactive'}`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Divisi Fabrikasi
            </button>
            <button
              onClick={() => setTab('maintenance')}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center ${tab === 'maintenance' ? 'tab-active' : 'tab-inactive'}`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Divisi Maintenance
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((card) => (
            <ServiceCard
              key={card.title}
              card={card}
              divisi={tab === 'fabrikasi' ? 'Fabrikasi' : 'Maintenance'}
              onPilih={pilihLayananRFQ}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
