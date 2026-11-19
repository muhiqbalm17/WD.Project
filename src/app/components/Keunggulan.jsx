const CARDS = [
  {
    title: 'Vapor & Sandblasting Modern',
    desc: 'Pembersihan kerak korosi, cat lama, dan restorasi logam menggunakan teknologi wet & dry blasting presisi tanpa merusak struktur dasar material.',
    colorClass: 'bg-brand-orange/15 text-brand-orange border-brand-orange/20',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: 'Pengelasan Mutu Tinggi',
    desc: 'Keahlian las MIG, TIG, dan MMA untuk konstruksi tangki, pipa presisi, kanopi kokoh, tralis elegan, dan pagar industri berdaya tahan lama.',
    colorClass: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Maintenance Alat Berat & Genset',
    desc: 'Penanganan overhaul mesin industri, perbaikan sistem hidrolik, kelistrikan genset pabrik, dan servis preventif kendaraan operasional.',
    colorClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Tim Lapangan Responsif',
    desc: 'Dukungan teknisi panggilan langsung ke lokasi proyek Anda di seluruh area Makassar, Maros, Gowa, dan sekitarnya saat terjadi kendala darurat.',
    colorClass: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Keunggulan() {
  return (
    <section id="keunggulan" className="py-16 bg-brand-bgAlt border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-widest text-brand-orange font-bold mb-2">STANDAR KUALITAS WORKSHOP</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            Mengapa Perusahaan &amp; Kontraktor Memilih WD.Project?
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card) => (
            <div key={card.title} className="glass-card p-6 rounded-xl">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 border ${card.colorClass}`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

