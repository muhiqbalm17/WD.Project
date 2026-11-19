'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Layanan', href: '#divisi-layanan' },
  { label: 'Mengapa Kami', href: '#keunggulan' },
  { label: 'Portofolio', href: '#portofolio' },
  { label: 'Alur Kerja', href: '#alur-kerja' },
  { label: 'Lokasi', href: '#lokasi-kontak' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-brand-slate via-brand-slateCard to-brand-slate border-b border-white/10 text-xs py-2 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-brand-orange/20 text-brand-orange border border-brand-orange/30">
              MAKASSAR & SULSEL
            </span>
            <span className="hidden sm:inline">Jl. Balang Turungan, Paccerakkang, Kec. Biringkanaya</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">Sen – Sab: 08:00 – 17:00 WITA</span>
            <a
              href="https://wa.me/6282292489480"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange hover:text-white font-semibold flex items-center transition-colors"
            >
              <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z" />
              </svg>
              0822-9248-9480
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-[#0B1120]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <a href="#beranda" className="flex items-center group py-2">
              <div className="bg-white px-2.5 py-1.5 rounded-lg border border-white/20 shadow-sm flex items-center justify-center">
                <Image
                  src="/assets/logo.png"
                  alt="WD.Project Logo"
                  width={120}
                  height={36}
                  className="h-9 w-auto object-contain"
                  priority
                />
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-brand-orange transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden sm:flex">
              <a
                href="#form-rfq"
                className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-bold bg-brand-orange hover:bg-brand-orangeDark text-white shadow-lg shadow-brand-orange/20 transition-all hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Minta Penawaran (RFQ)
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle Navigation"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="lg:hidden border-b border-white/10 bg-[#0F172A] px-4 pt-2 pb-6 space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-brand-orange transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <a
                href="#form-rfq"
                onClick={() => setMenuOpen(false)}
                className="w-full inline-flex justify-center items-center px-4 py-3 rounded-lg text-sm font-bold bg-brand-orange text-white"
              >
                Minta Penawaran (RFQ)
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

