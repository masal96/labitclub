import React, { useState } from 'react';
import { 
  Play, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Laptop, 
  Cpu, 
  Users, 
  Trophy,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface HeroSectionProps {
  onExplorePortfolio: () => void;
  onExploreModules: () => void;
  onOpenJoinClub: () => void;
  onOpenAdminLogin: () => void;
  isAdmin: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePortfolio,
  onExploreModules,
  onOpenJoinClub,
  onOpenAdminLogin,
  isAdmin,
}) => {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);

  const csharpCode = `using System;

namespace SMPDigitalLab
{
    class Program
    {
        static void Main(string[] args)
        {
            string clubName = "IT Club SMP";
            int activeMembers = 120;
            Console.WriteLine($"=== Selamat Datang di {clubName} ===");
            Console.WriteLine($"Total Anggota Aktif: {activeMembers} Siswa");
            Console.WriteLine("Status: Siap Menciptakan Inovasi Digital!");
            
            // Materi Unggulan:
            string[] skills = { "Scratch 3.0", "C# .NET", "Web Dev", "Robotika" };
            foreach (var skill in skills)
            {
                Console.WriteLine($"[✓] Modul Siap Dipelajari: {skill}");
            }
        }
    }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(csharpCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTerminalOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setTerminalOutput(
`[Compiling ITClub_Welcome.cs with .NET 8.0 SDK...]
Done. Executing binary:
=== Selamat Datang di IT Club SMP ===
Total Anggota Aktif: 120 Siswa
Status: Siap Menciptakan Inovasi Digital!
[✓] Modul Siap Dipelajari: Scratch 3.0
[✓] Modul Siap Dipelajari: C# .NET
[✓] Modul Siap Dipelajari: Web Dev
[✓] Modul Siap Dipelajari: Robotika
--------------------------------------------
Program exited with return code 0 (Success).`
      );
    }, 700);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-28 bg-[#060913] bg-tech-grid">
      {/* Radial ambient glow orbs */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-600/20 via-violet-600/20 to-transparent blur-[120px] rounded-full"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/3 -right-20 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Hero Container */}
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Badge Pengumuman: Kapsul semi-transparan dengan indikator titik hijau */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-200 text-xs sm:text-sm font-medium backdrop-blur-md shadow-lg shadow-cyan-950/50 mb-7 hover:border-cyan-400/50 transition-all cursor-pointer"
               onClick={onOpenJoinClub}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white tracking-wide">Penerimaan Anggota IT Club 2026/2027 Dibuka!</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          {/* Judul Utama (Headline) dengan Efek Gradasi Sian ke Ungu */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
            Wadah Kreativitas &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.45)]">
              Inovasi Digital
            </span>{' '}
            Siswa.
          </h1>

          {/* Deskripsi Sub-teks */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            Eksplorasi potensi teknologi generasi muda melalui pemrograman <span className="text-cyan-300 font-semibold">C#</span>,{' '}
            <span className="text-cyan-300 font-semibold">Scratch</span> visual block,{' '}
            <span className="text-purple-300 font-semibold">desain grafis</span> UI/UX, dan perakitan{' '}
            <span className="text-teal-300 font-semibold">jaringan komputer &amp; robotika</span> di Laboratorium Komputer modern berstandar sekolah digital.
          </p>

          {/* Call to Action (CTA) Dua Tombol */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExplorePortfolio}
              className="px-7 py-3.5 rounded-xl text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-[0_0_25px_-3px_rgba(6,182,212,0.7)] hover:shadow-[0_0_30px_-1px_rgba(6,182,212,0.9)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Jelajahi Karya Siswa</span>
            </button>

            <button
              onClick={onExploreModules}
              className="px-7 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-cyan-200 bg-slate-900/60 hover:bg-slate-800/80 border border-cyan-500/50 hover:border-cyan-300 backdrop-blur-md transition-all duration-200 flex items-center gap-2.5 shadow-sm hover:shadow-cyan-500/20"
            >
              <Laptop className="w-4 h-4 text-cyan-400" />
              <span>Akses Modul Belajar</span>
            </button>
          </div>

          {/* Quick Lab Metric strip */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Laptop className="w-4 h-4" />
                <span className="text-xs font-mono text-slate-400">Laboratorium</span>
              </div>
              <div className="text-2xl font-extrabold text-white font-mono tabular-nums">40 Unit PC</div>
              <div className="text-xs text-slate-400 mt-0.5">Dual Monitor Core i7 &amp; LAN Gigabit</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs font-mono text-slate-400">Komunitas</span>
              </div>
              <div className="text-2xl font-extrabold text-white font-mono tabular-nums">120+ Siswa</div>
              <div className="text-xs text-slate-400 mt-0.5">Anggota Aktif Kls 7, 8, &amp; 9</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-teal-400 mb-1">
                <Trophy className="w-4 h-4" />
                <span className="text-xs font-mono text-slate-400">Prestasi</span>
              </div>
              <div className="text-2xl font-extrabold text-white font-mono tabular-nums">32 Karya</div>
              <div className="text-xs text-slate-400 mt-0.5">Game, Web &amp; Prototipe IoT</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-mono text-slate-400">Presensi Pintar</span>
              </div>
              <div className="text-2xl font-extrabold text-white font-mono tabular-nums">QR &amp; RFID</div>
              <div className="text-xs text-slate-400 mt-0.5">Absensi Otomatis Khusus Guru</div>
            </div>
          </div>

        </div>

        {/* Preview Editor / Kode: Kontainer Bergaya IDE / Editor Kode */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#0b101f] shadow-2xl shadow-cyan-950/60 backdrop-blur-xl">
            
            {/* Header Jendela Kode dengan Dots Merah, Kuning, Hijau */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-[#080d19] border-b border-slate-800/80 select-none">
              
              {/* Window Dots: Red, Yellow, Green */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] hover:opacity-80 transition-opacity"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] hover:opacity-80 transition-opacity"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] hover:opacity-80 transition-opacity"></div>
                
                {/* Tab Berkas */}
                <div className="ml-4 flex items-center gap-2 px-3 py-1 rounded-md bg-[#0e172a] border border-cyan-500/20 text-xs font-mono text-cyan-300">
                  <span className="text-cyan-400 font-bold">C#</span>
                  <span>ITClub_Welcome.cs</span>
                </div>
              </div>

              {/* Toolbar Aksi IDE: Run Code & Copy */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  title="Salin Kode Sumber"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : 'fill-slate-950'}`} />
                  <span>{isRunning ? 'Mengompilasi...' : 'Jalankan (F5)'}</span>
                </button>
              </div>

            </div>

            {/* Code Body dengan Syntax Highlighting */}
            <div className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-[#070b16]">
              <div className="grid grid-cols-[auto_1fr] gap-4">
                {/* Line Numbers */}
                <div className="text-slate-600 select-none text-right pr-2 space-y-1">
                  {csharpCode.split('\n').map((_, idx) => (
                    <div key={idx}>{idx + 1}</div>
                  ))}
                </div>

                {/* Code Lines Styled */}
                <div className="text-slate-200 space-y-1">
                  <div><span className="text-purple-400">using</span> <span className="text-cyan-200">System</span>;</div>
                  <div>&nbsp;</div>
                  <div><span className="text-purple-400">namespace</span> <span className="text-emerald-300 font-semibold">SMPDigitalLab</span></div>
                  <div>{'{'}</div>
                  <div className="pl-4"><span className="text-purple-400">class</span> <span className="text-yellow-300 font-bold">Program</span></div>
                  <div className="pl-4">{'{'}</div>
                  <div className="pl-8"><span className="text-purple-400">static void</span> <span className="text-blue-400 font-semibold">Main</span>(<span className="text-cyan-300">string</span>[] args)</div>
                  <div className="pl-8">{'{'}</div>
                  <div className="pl-12"><span className="text-cyan-300">string</span> clubName = <span className="text-amber-200">"IT Club SMP"</span>;</div>
                  <div className="pl-12"><span className="text-cyan-300">int</span> activeMembers = <span className="text-orange-400">120</span>;</div>
                  <div className="pl-12"><span className="text-cyan-200">Console</span>.<span className="text-blue-400">WriteLine</span>(<span className="text-amber-200">$&quot;=== Selamat Datang di {'{'}clubName{'}'} ===&quot;</span>);</div>
                  <div className="pl-12"><span className="text-cyan-200">Console</span>.<span className="text-blue-400">WriteLine</span>(<span className="text-amber-200">$&quot;Total Anggota Aktif: {'{'}activeMembers{'}'} Siswa&quot;</span>);</div>
                  <div className="pl-12"><span className="text-cyan-200">Console</span>.<span className="text-blue-400">WriteLine</span>(<span className="text-amber-200">&quot;Status: Siap Menciptakan Inovasi Digital!&quot;</span>);</div>
                  <div>&nbsp;</div>
                  <div className="pl-12 text-slate-500">// Materi Unggulan:</div>
                  <div className="pl-12"><span className="text-cyan-300">string</span>[] skills = {'{'} <span className="text-amber-200">&quot;Scratch 3.0&quot;</span>, <span className="text-amber-200">&quot;C# .NET&quot;</span>, <span className="text-amber-200">&quot;Web Dev&quot;</span>, <span className="text-amber-200">&quot;Robotika&quot;</span> {'}'};</div>
                  <div className="pl-12"><span className="text-purple-400">foreach</span> (<span className="text-purple-400">var</span> skill <span className="text-purple-400">in</span> skills)</div>
                  <div className="pl-12">{'{'}</div>
                  <div className="pl-16"><span className="text-cyan-200">Console</span>.<span className="text-blue-400">WriteLine</span>(<span className="text-amber-200">$&quot;[✓] Modul Siap Dipelajari: {'{'}skill{'}'}&quot;</span>);</div>
                  <div className="pl-12">{'}'}</div>
                  <div className="pl-8">{'}'}</div>
                  <div className="pl-4">{'}'}</div>
                  <div>{'}'}</div>
                </div>
              </div>

              {/* Live Terminal Output Panel */}
              {terminalOutput && (
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-semibold text-slate-300">Output Terminal Konsol (.NET Runtime)</span>
                  </div>
                  <pre className="p-3 rounded-lg bg-[#050811] text-emerald-300 whitespace-pre-wrap font-mono border border-emerald-500/20">
                    {terminalOutput}
                  </pre>
                </div>
              )}

            </div>

            {/* Bottom Bar IDE: Status & File Info */}
            <div className="px-4 py-2 bg-[#090e1c] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  Ready to code
                </span>
                <span className="hidden sm:inline">UTF-8</span>
                <span className="hidden sm:inline">C# 12.0 / .NET 8.0</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onExploreModules}
                  className="hover:text-cyan-300 flex items-center gap-1 text-slate-400 transition-colors"
                >
                  <span>Buka Modul C# Lengkap</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Section Notice Banner for Teachers */}
        {!isAdmin && (
          <div className="mt-8 max-w-3xl mx-auto p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 backdrop-blur-sm flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-purple-200">
              <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                <strong>Akses Khusus Guru:</strong> Presensi QR &amp; RFID serta pengelolaan Jadwal &amp; Portofolio hanya dapat diakses melalui Portal Admin.
              </span>
            </div>
            <button
              onClick={onOpenAdminLogin}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-100 border border-purple-400/40 whitespace-nowrap"
            >
              Masuk Guru
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
