export default function LokasiKontak() {
  return (
    <section id="lokasi-kontak" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">KUNJUNGI WORKSHOP KAMI</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Workshop &amp; Pusat Operasional WD.Project</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Datang langsung ke workshop kami untuk konsultasi teknis, melihat sampel hasil vapor blasting,
              atau menjadwalkan survei ke lokasi pabrik/proyek Anda.
            </p>

            <div className="space-y-4 pt-2">
              {/* Alamat */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-slate-900 font-semibold text-sm">Alamat Lengkap</h4>
                  <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                    Jl. Balang Turungan, Paccerakkang, Kec. Biringkanaya, Kota Makassar, Sulawesi Selatan, 90241
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-slate-900 font-semibold text-sm">WhatsApp / Telepon</h4>
                  <p className="text-slate-600 text-xs mt-0.5">
                    <a href="https://wa.me/6282292489480" className="text-brand-orange hover:underline font-semibold" target="_blank" rel="noopener noreferrer">
                      +62 822-9248-9480
                    </a>{' '}(Respon Cepat)
                  </p>
                </div>
              </div>

              {/* Jam Operasional */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-slate-900 font-semibold text-sm">Jam Operasional</h4>
                  <p className="text-slate-600 text-xs mt-0.5">Senin – Sabtu: 08:00 – 17:00 WITA (Minggu &amp; Darurat On-Call)</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Jl.+Balang+Turungan+Paccerakkang+Biringkanaya+Makassar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-brand-orange hover:text-brand-orangeDark transition-colors"
              >
                Buka Panduan Rute di Google Maps
                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Map Card */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-4 overflow-hidden border border-slate-200 shadow-lg bg-white">
              <div className="relative w-full h-80 rounded-xl bg-slate-100 flex flex-col items-center justify-center p-6 text-center border border-slate-200">
                <div className="w-16 h-16 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Workshop WD.Project Makassar</h3>
                <p className="text-slate-600 text-xs max-w-md mb-5">
                  Kecamatan Biringkanaya, Kota Makassar (Akses strategis dekat kawasan industri &amp; pergudangan).
                </p>
                <a
                  href="https://maps.google.com/?q=Jl.+Balang+Turungan+Paccerakkang+Biringkanaya+Makassar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg text-xs font-bold bg-brand-orange hover:bg-brand-orangeDark text-white shadow-md transition-all"
                >
                  Buka Navigasi GPS Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
