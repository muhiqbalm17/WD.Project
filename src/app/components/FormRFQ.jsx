'use client';

import { useState, useCallback } from 'react';

function generateTicketId() {
  if (typeof window === 'undefined') return 'RFQ-000000-001';
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const prefix = `RFQ-${year}${month}-`;
  const storageKey = `wd_last_ticket_seq_${year}${month}`;
  let lastSeq = parseInt(localStorage.getItem(storageKey) || '0', 10);
  lastSeq += 1;
  localStorage.setItem(storageKey, lastSeq.toString());
  return prefix + String(lastSeq).padStart(3, '0');
}

function Toast({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto toast-enter flex items-center space-x-3 px-4 py-3 rounded-lg shadow-xl text-sm font-semibold border ${
            t.type === 'success'
              ? 'bg-[#064E3B] text-emerald-100 border-emerald-600/40'
              : t.type === 'error'
              ? 'bg-[#7F1D1D] text-red-100 border-red-600/40'
              : 'bg-slate-900 text-slate-100 border-slate-700'
          }`}
        >
          {t.type === 'success' ? (
            <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          ) : (
            <svg className="w-5 h-5 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
          )}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

export default function FormRFQ() {
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const [form, setForm] = useState({
    namaKlien: '',
    namaPerusahaan: '',
    noWhatsApp: '',
    divisiLayanan: 'Fabrikasi',
    spesifikasiKebutuhan: '',
  });

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4500);
  }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.namaKlien || form.namaKlien.length < 2) {
      addToast('Mohon masukkan nama lengkap Anda.', 'error');
      return;
    }
    if (!form.noWhatsApp || form.noWhatsApp.length < 9) {
      addToast('Mohon masukkan nomor WhatsApp yang valid.', 'error');
      return;
    }
    if (!form.spesifikasiKebutuhan || form.spesifikasiKebutuhan.length < 5) {
      addToast('Mohon uraikan kebutuhan Anda minimal 5 karakter.', 'error');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const ticketId = generateTicketId();

      // Simpan histori ke localStorage
      try {
        const key = 'wd_rfq_history';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.unshift({ id: ticketId, timestamp: new Date().toISOString(), ...form });
        localStorage.setItem(key, JSON.stringify(existing.slice(0, 50)));
      } catch (_) {}

      const pesan =
        `Halo Tim WD.Project Makassar,\n\n` +
        `Saya ingin mengajukan Permintaan Penawaran Harga (RFQ) via website resmi:\n\n` +
        `*No. Tiket RFQ:* ${ticketId}\n` +
        `*Nama Klien:* ${form.namaKlien}\n` +
        `*Perusahaan/Instansi:* ${form.namaPerusahaan || '-'}\n` +
        `*No. WhatsApp:* ${form.noWhatsApp}\n` +
        `*Divisi Layanan:* ${form.divisiLayanan}\n\n` +
        `*Rincian Kebutuhan:*\n"${form.spesifikasiKebutuhan}"\n\n` +
        `Mohon informasi estimasi biaya dan jadwal. Terima kasih.`;

      const waUrl = `https://wa.me/6282292489480?text=${encodeURIComponent(pesan)}`;

      setLoading(false);
      addToast(`Tiket ${ticketId} berhasil dibuat! Membuka WhatsApp...`, 'success');
      setForm({ namaKlien: '', namaPerusahaan: '', noWhatsApp: '', divisiLayanan: 'Fabrikasi', spesifikasiKebutuhan: '' });

      setTimeout(() => window.open(waUrl, '_blank'), 600);
    }, 700);
  }

  return (
    <>
      <section id="form-rfq" className="py-20 bg-brand-bg relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-brand-slateCard to-brand-slate rounded-2xl border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-orange/20 text-brand-orange mb-3 border border-brand-orange/30">
                FORMULIR RESMI B2B &amp; PERORANGAN
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ajukan Permintaan Penawaran Harga (RFQ)</h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
                Dapatkan proposal estimasi biaya yang transparan. Data Anda akan terhubung langsung ke tim estimator melalui WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="namaKlien" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Nama Lengkap <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    id="namaKlien" name="namaKlien" type="text" required value={form.namaKlien}
                    onChange={handleChange} placeholder="Contoh: Bapak Ridwan"
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="namaPerusahaan" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Perusahaan <span className="text-slate-500 text-xs normal-case">(Opsional)</span>
                  </label>
                  <input
                    id="namaPerusahaan" name="namaPerusahaan" type="text" value={form.namaPerusahaan}
                    onChange={handleChange} placeholder="Contoh: PT Sulawesi Logam / Perorangan"
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="noWhatsApp" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Nomor WhatsApp <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    id="noWhatsApp" name="noWhatsApp" type="tel" required value={form.noWhatsApp}
                    onChange={handleChange} placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="divisiLayanan" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Divisi Layanan <span className="text-brand-orange">*</span>
                  </label>
                  <select
                    id="divisiLayanan" name="divisiLayanan" required value={form.divisiLayanan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-sm"
                  >
                    <option value="Fabrikasi">Divisi Fabrikasi (Blasting, Pengelasan, Pagar, Kanopi)</option>
                    <option value="Maintenance">Divisi Maintenance (Mobil, Alat Berat, Genset)</option>
                    <option value="Gabungan">Layanan Gabungan / Konsultasi Proyek Khusus</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="spesifikasiKebutuhan" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Rincian Kebutuhan <span className="text-brand-orange">*</span>
                </label>
                <textarea
                  id="spesifikasiKebutuhan" name="spesifikasiKebutuhan" rows={4} required value={form.spesifikasiKebutuhan}
                  onChange={handleChange}
                  placeholder="Jelaskan kebutuhan Anda, misal: 'Vapor blasting part mesin motor 5 unit' atau 'Kanopi spandek 4x6 meter' atau 'Overhaul genset 60 kVA'."
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit" disabled={loading}
                  className="w-full py-4 px-6 rounded-lg font-bold text-white bg-brand-orange hover:bg-brand-orangeDark transition-all flex items-center justify-center space-x-2 shadow-xl shadow-brand-orange/30 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Memproses Tiket RFQ...</span>
                    </>
                  ) : (
                    <>
                      <span>Kirim Permintaan &amp; Dapatkan Penawaran via WhatsApp</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-400 mt-3">
                  🔒 Data Anda aman dan hanya digunakan untuk keperluan kalkulasi penawaran WD.Project.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Toast toasts={toasts} />
    </>
  );
}

