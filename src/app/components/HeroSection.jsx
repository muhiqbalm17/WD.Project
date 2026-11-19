export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative pt-12 pb-20 md:pt-20 md:pb-32 hero-gradient grid-pattern overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300 mb-6 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Workshop Resmi & On-Site Service • Biringkanaya, Makassar</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Spesialis{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-300">
              Fabrikasi Presisi
            </span>{' '}
            &amp; Maintenance Alat Berat.
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
            Mitra teknik andalan industri dan komersial di Sulawesi Selatan. Menghadirkan pengelasan
            bersertifikasi, teknologi vapor &amp; sandblasting pembersih kerak tuntas, hingga perawatan
            armada mobil, genset, dan alat berat.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <a
              href="#form-rfq"
              className="inline-flex justify-center items-center px-7 py-3.5 rounded-lg text-base font-bold bg-brand-orange hover:bg-brand-orangeDark text-white shadow-xl shadow-brand-orange/25 transition-all hover:-translate-y-0.5"
            >
              Ajukan Estimasi Harga (RFQ)
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="https://wa.me/6282292489480?text=Halo%20WD.Project,%20saya%20ingin%20konsultasi%20layanan%20fabrikasi/maintenance."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center px-7 py-3.5 rounded-lg text-base font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <svg className="w-5 h-5 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z" />
              </svg>
              Konsultasi WhatsApp Langsung
            </a>
          </div>

          {/* Trust Pillars */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-slate-400 text-xs sm:text-sm">
            <div>
              <div className="text-white font-bold text-lg sm:text-xl">100%</div>
              <div>Standar Presisi Uji</div>
            </div>
            <div>
              <div className="text-white font-bold text-lg sm:text-xl">Dual Divisi</div>
              <div>Fabrikasi &amp; Maintenance</div>
            </div>
            <div>
              <div className="text-white font-bold text-lg sm:text-xl">Fast On-Site</div>
              <div>Makassar &amp; Sekitarnya</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

