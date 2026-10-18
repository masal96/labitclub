import React, { useState } from 'react';
import { 
  Globe, 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Server, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  FolderArchive,
  Layers
} from 'lucide-react';

interface HostingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  sharedUrl: string;
}

export const HostingGuideModal: React.FC<HostingGuideModalProps> = ({
  isOpen,
  onClose,
  sharedUrl,
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<'instant' | 'custom_domain' | 'vercel' | 'cpanel'>('instant');

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#090e1c] border border-cyan-500/50 p-6 sm:p-8 shadow-2xl my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Panduan Hosting &amp; Domain Publik Sekolah
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cara menggunakan website ini secara online, publik, dan memakai nama domain sendiri (contoh: <span className="text-cyan-300 font-mono">itclub.smpn1.sch.id</span>).
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('instant')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'instant'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>1. Link Publik Aktif Saat Ini</span>
          </button>

          <button
            onClick={() => setActiveTab('custom_domain')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'custom_domain'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span>2. Pasang Domain Sendiri (.sch.id)</span>
          </button>

          <button
            onClick={() => setActiveTab('vercel')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'vercel'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Deploy Gratis (Vercel / Cloudflare)</span>
          </button>

          <button
            onClick={() => setActiveTab('cpanel')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'cpanel'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderArchive className="w-3.5 h-3.5 text-amber-400" />
            <span>4. cPanel Hosting Sekolah</span>
          </button>
        </div>

        {/* Tab 1: Current Instant Live URL */}
        {activeTab === 'instant' && (
          <div className="mt-5 space-y-4">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-emerald-300 text-sm">Website Anda Sudah Langsung Online &amp; Publik!</strong>
                Aplikasi ini telah aktif di Google Cloud Run dengan sertifikat HTTPS SSL resmi. Siswa, guru, dan orang tua dapat langsung mengaksesnya dari mana saja tanpa perlu install apa pun.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <label className="block text-xs font-mono text-slate-400 mb-1.5">
                Alamat URL Publik Anda Saat Ini:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={sharedUrl}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 select-all focus:outline-none"
                />
                <button
                  onClick={() => handleCopy(sharedUrl)}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 flex items-center gap-1.5 shrink-0"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? 'Tersalin' : 'Salin URL'}</span>
                </button>
                <a
                  href={sharedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  title="Buka di Tab Baru"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-2">
              <p className="font-semibold text-white">Cara Membagikan ke Siswa &amp; Guru:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>Bagikan URL di atas ke grup WhatsApp kelas atau ekstrakurikuler IT Club SMP.</li>
                <li>Buat QR Code cetak di pintu Lab Komputer agar siswa tinggal scan dari kamera HP.</li>
                <li>Siswa dapat membuka menu Portofolio dan mendaftar sesi di menu Kegiatan.</li>
                <li>Guru dapat login lewat tombol "Portal Admin" di pojok kanan atas untuk presensi RFID/QR.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Custom Domain (.sch.id) */}
        {activeTab === 'custom_domain' && (
          <div className="mt-5 space-y-4 text-xs text-slate-300">
            <p>
              Untuk menggunakan domain resmi sekolah Anda seperti <strong className="text-cyan-300 font-mono">itclub.smpn1contoh.sch.id</strong> atau domain khusus seperti <strong className="text-cyan-300 font-mono">labkomputer-smp.id</strong>, ikuti 3 langkah mudah:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-900 text-purple-200 flex items-center justify-center text-xs font-mono">1</span>
                  <span>Siapkan Domain atau Subdomain Sekolah</span>
                </div>
                <p className="text-slate-400 mt-1 pl-7">
                  Hubungi staf IT / Operator Web Sekolah untuk membuat subdomain baru (contoh: <code className="text-cyan-300">itclub.sekolahanda.sch.id</code> atau <code className="text-cyan-300">lab.sekolahanda.sch.id</code>).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-900 text-purple-200 flex items-center justify-center text-xs font-mono">2</span>
                  <span>Tambahkan Record DNS (CNAME)</span>
                </div>
                <div className="mt-2 pl-7 overflow-x-auto font-mono text-[11px]">
                  <table className="w-full text-left bg-slate-950 rounded-lg p-2 border border-slate-800">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500">
                        <th className="p-2">Tipe</th>
                        <th className="p-2">Nama Host (Subdomain)</th>
                        <th className="p-2">Target / Nilai</th>
                        <th className="p-2">Proxy / TTL</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      <tr>
                        <td className="p-2 text-cyan-400 font-bold">CNAME</td>
                        <td className="p-2">itclub</td>
                        <td className="p-2 text-emerald-400 truncate max-w-xs">ghs.googlehosted.com / cname.vercel-dns.com</td>
                        <td className="p-2">Otomatis</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-900 text-purple-200 flex items-center justify-center text-xs font-mono">3</span>
                  <span>Sertifikat SSL Otomatis (HTTPS)</span>
                </div>
                <p className="text-slate-400 mt-1 pl-7">
                  Layanan seperti Cloudflare atau Vercel secara otomatis menerbitkan sertifikat SSL gratis sehingga website aman dengan gembok hijau HTTPS saat diakses browser.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Vercel / Cloudflare Deploy */}
        {activeTab === 'vercel' && (
          <div className="mt-5 space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
              <strong className="text-cyan-300 text-sm block">Deployment Permanen 100% Gratis via Vercel atau Cloudflare Pages:</strong>
              Website ini dibangun dengan React + Vite + Tailwind CSS standar industri yang didukung penuh oleh platform hosting modern secara gratis selamanya.
            </div>

            <ol className="list-decimal pl-5 space-y-2 text-slate-300">
              <li>
                <strong>Download atau Simpan Source Code ke GitHub</strong>: Hubungkan repositori ke akun GitHub sekolah.
              </li>
              <li>
                <strong>Buka <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">Vercel.com</a> atau Cloudflare Pages</strong>: Klik <em>"Add New Project"</em> &gt; Import dari GitHub.
              </li>
              <li>
                <strong>Otomatis Terdeteksi</strong>:
                <div className="mt-1.5 p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800">
                  Framework: Vite<br />
                  Build Command: <span className="text-cyan-300">npm run build</span><br />
                  Output Directory: <span className="text-emerald-300">dist</span>
                </div>
              </li>
              <li>
                <strong>Klik Deploy</strong>: Dalam 1 menit website akan aktif di domain <code className="text-cyan-300">itclub-smp.vercel.app</code> dan Anda bisa menghubungkan domain <code className="text-purple-300">.sch.id</code> gratis.
              </li>
            </ol>
          </div>
        )}

        {/* Tab 4: cPanel Hosting Sekolah */}
        {activeTab === 'cpanel' && (
          <div className="mt-5 space-y-4 text-xs text-slate-300">
            <p>
              Jika sekolah Anda sudah memiliki paket web hosting cPanel (misal <strong className="text-white">smpn1.sch.id/cpanel</strong>):
            </p>

            <ol className="list-decimal pl-5 space-y-2.5 text-slate-300">
              <li>
                Jalankan perintah build di terminal lokal: <code className="text-cyan-300 font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">npm run build</code> untuk membuat folder <code className="text-emerald-300 font-mono">dist/</code>.
              </li>
              <li>
                Buka File Manager cPanel sekolah Anda.
              </li>
              <li>
                Buat folder baru di <code className="text-cyan-300 font-mono">public_html/itclub</code> atau buat Subdomain <code className="text-cyan-300 font-mono">itclub.smpn1.sch.id</code>.
              </li>
              <li>
                Upload seluruh file dan folder di dalam <code className="text-emerald-300 font-mono">dist/</code> (seperti index.html, assets, dll) ke dalam folder tersebut.
              </li>
              <li>
                Website langsung bisa diakses publik di alamat <code className="text-cyan-300 font-mono">https://smpn1.sch.id/itclub</code>!
              </li>
            </ol>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-500">
            Protokol: HTTPS SSL Aktif · Port 3000 / Cloud Run
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Tutup Panduan
          </button>
        </div>

      </div>
    </div>
  );
};
