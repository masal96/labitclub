import React from 'react';
import { Code2, MapPin, Mail, Phone, Heart, Sparkles, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenAdminLogin: () => void;
  onOpenHostingGuide: () => void;
  isAdmin: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenAdminLogin, onOpenHostingGuide, isAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050811] border-t border-slate-800/80 text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & School */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black">
                <Code2 className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-wider">IT CLUB SMP</span>
                <div className="font-mono text-[11px] text-cyan-400">&lt;LabKomputer/&gt;</div>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Pusat pengembangan literasi digital, pemrograman kreatif, dan rekayasa teknologi siswa jenjang Sekolah Menengah Pertama.
            </p>

            <div className="text-[11px] font-mono text-slate-500">
              Lab Komputer 1 &amp; 2 · SMP Bina Digital Nusantara
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div>
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider mb-3">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2">
              {['Beranda', 'Kegiatan', 'Pembelajaran', 'Portofolio', 'Jadwal'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavClick(item.toLowerCase())}
                    className="hover:text-cyan-300 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Fasilitas Laboratorium */}
          <div>
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider mb-3">
              Fasilitas Lab
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• 40 Unit PC Intel Core i7 &amp; SSD NVMe</li>
              <li>• Akses Internet Fiber Optic 200 Mbps</li>
              <li>• Jaringan LAN Gigabit Switch TP-Link</li>
              <li>• 12 Kit Robotika Arduino &amp; Mikrokontroler</li>
              <li>• AC Dual Zone &amp; Sound System Multimedia</li>
              <li>• Sistem Presensi RFID &amp; Kamera QR</li>
            </ul>
          </div>

          {/* Col 4: Keamanan & Admin Portal */}
          <div>
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider mb-3">
              Pengelolaan &amp; Guru
            </h4>
            <p className="text-slate-400 mb-3 leading-relaxed">
              Pengelolaan jadwal praktikum, absensi RFID/QR, dan portofolio karya terpusat di Portal Guru Pembina.
            </p>

            {isAdmin ? (
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-200">
                <span className="text-[11px] font-mono block">Status: Terautentikasi sebagai Guru</span>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="w-full py-2 px-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/50 text-purple-300 font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Masuk Portal Admin Guru</span>
              </button>
            )}

            <button
              onClick={onOpenHostingGuide}
              className="mt-3 w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-cyan-300 font-medium transition-all flex items-center justify-center gap-2 text-xs"
            >
              <span>🌐 Panduan Domain &amp; Hosting (.sch.id)</span>
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Laboratorium Komputer &amp; IT Club SMP. Hak Cipta Dilindungi.
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-cyan-400">
              v2.4 Production Ready
            </span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Kembali ke Atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
