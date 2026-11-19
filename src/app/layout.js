import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata = {
  title: 'WD.Project – Fabrikasi Presisi & Maintenance Alat Berat Makassar',
  description:
    'Jasa Fabrikasi Logam, Vapor Blasting, Sandblasting, Pengelasan, Pagar, Kanopi, dan Maintenance Mobil, Alat Berat, Genset Industri di Makassar, Sulawesi Selatan.',
  keywords:
    'fabrikasi makassar, vapor blasting, sandblasting, las tig mig, kanopi besi, maintenance alat berat, servis genset makassar, WD Project',
  openGraph: {
    title: 'WD.Project – Fabrikasi & Maintenance Makassar',
    description:
      'Mitra teknik industri Makassar: vapor blasting, sandblasting, pengelasan, kanopi, pagar, maintenance alat berat & genset.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${plusJakarta.variable} font-sans antialiased bg-brand-bg text-slate-50`}>
        {children}
      </body>
    </html>
  );
}

