const STEPS = [
  { num: '01', title: 'Permintaan RFQ', desc: 'Kirimkan detail kebutuhan fabrikasi atau kendala mesin Anda melalui form website atau WhatsApp resmi.' },
  { num: '02', title: 'Survei & Estimasi', desc: 'Tim estimator kami menganalisis spesifikasi dimensi, material, atau inspeksi unit di workshop/lapangan.' },
  { num: '03', title: 'Pengerjaan Workshop', desc: 'Eksekusi pengerjaan dengan standar ketat (pengelasan, blasting, atau perbaikan mesin) sesuai jadwal disepakati.' },
  { num: '04', title: 'Quality Check & Serah', desc: 'Pemeriksaan presisi akhir bersama Anda, uji fungsi operasional, serah terima unit, dan jaminan purna jual.' },
];

export default function AlurKerja() {
  return (
    <section id="alur-kerja" className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">TRANSPARANSI PROSES</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Alur Kerja Sama yang Jelas &amp; Terukur
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <div key={s.num} className="glass-card p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="text-4xl font-extrabold text-brand-orange/30 mb-3">{s.num}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
