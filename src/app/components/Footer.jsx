import Image from 'next/image';

const FABRIKASI_LINKS = [
  'Vapor Blasting (Wet Blasting)',
  'Sandblasting Karat Berat',
  'Pengelasan MIG / TIG / MMA',
  'Pagar, Kanopi & Tralis',
];
const MAINTENANCE_LINKS = [
  'Overhaul Alat Berat',
  'Servis & Tuning Genset',
  'Perawatan Armada Mobil',
  'Layanan Panggilan Lapangan',
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#070B14] border-t border-white/10 py-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="bg-white inline-block px-3 py-1.5 rounded-lg border border-white/20 shadow-sm">
              <Image src="/assets/logo.png" alt="WD.Project" width={120} height={36} className="h-8 w-auto object-contain" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Pusat fabrikasi logam presisi, vapor blasting, sandblasting industri, dan spesialis maintenance alat berat,
              armada mobil, serta genset di Makassar, Sulawesi Selatan.
            </p>
          </div>

          {/* Fabrikasi */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Divisi Fabrikasi</h4>
            <ul className="text-xs space-y-2">
              {FABRIKASI_LINKS.map((l) => (
                <li key={l}><a href="#divisi-layanan" className="hover:text-brand-orange transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Maintenance */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Divisi Maintenance</h4>
            <ul className="text-xs space-y-2">
              {MAINTENANCE_LINKS.map((l) => (
                <li key={l}><a href="#divisi-layanan" className="hover:text-brand-orange transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div>&copy; {year} WD.Project (Fabrication &amp; Maintenance). Hak Cipta Dilindungi.</div>
          <div>
            Sistem Rekayasa &amp; Arsitektur oleh{' '}
            <span className="text-brand-orange font-semibold">ZettBOT (by Zettbos)</span>.
          </div>
        </div>
      </div>
    </footer>
  );
}

