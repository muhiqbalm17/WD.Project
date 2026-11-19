'use client';

import { useState } from 'react';

const ITEMS = [
  { category: 'blasting', badge: 'Vapor Blasting', badgeColor: 'bg-brand-orange/20 text-brand-orange border-brand-orange/30', sub: 'Restorasi Presisi', title: 'Restorasi Blok Mesin & Karburator', desc: 'Pembersihan kerak karbon dan oksidasi menggunakan micro-bead bertekanan air. Hasil permukaan satin halus seragam tanpa merusak drat ulir atau kepresisian lubang silinder.', specs: [['Material', 'Aluminium Die-Cast & Alloy'], ['Metode', 'Eco Wet Vapor Blasting'], ['Hasil', 'Bebas residu, siap rakit langsung']], layanan: 'Restorasi Vapor Blasting Blok Mesin' },
  { category: 'blasting', badge: 'Sandblasting', badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30', sub: 'Heavy Industrial', title: 'Stripping Karat Tangki 5000L', desc: 'Pengupasan kerak korosi tebal pada tangki penyimpanan kimia industri hingga standar Sa 2.5 sebelum pelapisan cat epoxy primer.', specs: [['Standar', 'ISO 8501-1 Sa 2.5'], ['Kapasitas', 'Volume 5.000 Liter'], ['Tahap Lanjut', 'Epoxy Coating 200 Micron']], layanan: 'Sandblasting Tangki Industri' },
  { category: 'fabrikasi', badge: 'Fabrikasi', badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30', sub: 'Arsitektural', title: 'Kanopi Alderon & Pagar Gerbang Gudang', desc: 'Fabrikasi kanopi loading bay bentang 8 meter dengan rangka WF mini dan pipa hollow galvanis tebal, serta gerbang dorong sistem rel double bearing anti-macet.', specs: [['Dimensi', 'Kanopi 8x12m + Gerbang 6x2.5m'], ['Rangka', 'Hollow Galvanis 40x80 tebal 1.8mm'], ['Finishing', 'Cat Duco Semi-Gloss Hitam']], layanan: 'Fabrikasi Kanopi & Pagar Gudang' },
  { category: 'fabrikasi', badge: 'Pengelasan', badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30', sub: 'Struktur & Pengaman', title: 'Pengelasan Presisi Pipa & Tralis', desc: 'Sambungan flange pipa bertekanan dengan las TIG Argon dan pembuatan 24 unit tralis jendela motif minimalis geometris dengan akurasi sudut 90 derajat.', specs: [['Las', 'GTAW / TIG Argon Full Penetration'], ['Item', '24 Unit Tralis + Manifold Pipa'], ['Inspeksi', 'Dye Penetrant Test Bebas Cacat']], layanan: 'Pengelasan Presisi & Tralis' },
  { category: 'maintenance', badge: 'Maintenance', badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', sub: 'Alat Berat', title: 'Overhaul Silinder Hidrolik Excavator', desc: 'Pembongkaran dan peremajaan piston silinder boom excavator kelas 20 ton, penggantian seal kit poliuretan tahan panas, dan kalibrasi valve relief.', specs: [['Unit', 'Excavator Kelas 20 Ton'], ['Kendala Awal', 'Kebocoran Internal & Tekanan Turun'], ['Hasil', 'Tekanan kembali normal 320 Bar']], layanan: 'Servis Silinder Hidrolik Alat Berat' },
  { category: 'maintenance', badge: 'Maintenance', badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', sub: 'Daya Genset', title: 'Servis Berkala Genset 150 kVA', desc: 'Perawatan menyeluruh genset standby: kalibrasi AVR, penyetelan klep mesin, pergantian filter oli & solar, dan pengujian beban penuh 100%.', specs: [['Kapasitas', 'Genset Silent 150 kVA'], ['Pekerjaan', 'Full Tune-up & ATS Panel Check'], ['Uji Beban', '100% Load-Bank Test Lolos']], layanan: 'Servis & Tuning Genset 150 kVA' },
];

const FILTERS = [
  { key: 'all', label: 'Semua' },
  { key: 'blasting', label: 'Vapor & Sandblasting' },
  { key: 'fabrikasi', label: 'Fabrikasi & Las' },
  { key: 'maintenance', label: 'Maintenance Mesin' },
];

export default function Portofolio() {
  const [active, setActive] = useState('all');

  const filtered = ITEMS.filter((i) => active === 'all' || i.category === active);

  function pilih(layanan) {
    const ta = document.getElementById('spesifikasiKebutuhan');
    if (ta) ta.value = `Saya tertarik mengajukan penawaran untuk layanan: ${layanan}.\nMohon estimasi biaya dan persyaratannya.`;
    document.getElementById('form-rfq')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="portofolio" className="py-20 bg-brand-bgAlt border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">REKAM JEJAK WORKSHOP</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Galeri Proyek & Hasil Pengerjaan</h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">Bukti nyata dedikasi presisi teknis, kerapian pengerjaan las, kebersihan blasting, dan keandalan perbaikan mesin.</p>
          </div>
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${active === f.key ? 'bg-brand-orange text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div key={item.title} className="glass-card rounded-xl overflow-hidden flex flex-col justify-between">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 text-[11px] font-bold rounded border ${item.badgeColor}`}>{item.badge}</span>
                  <span className="text-xs text-slate-400">{item.sub}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-4">{item.desc}</p>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-400 space-y-1">
                  {item.specs.map(([k, v]) => (
                    <div key={k}><strong className="text-slate-300">{k}:</strong> {v}</div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-slate-900/50 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-semibold flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block mr-1.5" />
                  Selesai & Lolos QC
                </span>
                <button onClick={() => pilih(item.layanan)} className="text-brand-orange hover:underline font-bold">
                  Ajukan Serupa →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

