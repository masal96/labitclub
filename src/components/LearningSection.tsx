import React, { useState } from 'react';
import { 
  BookOpen, 
  Code, 
  Terminal, 
  Play, 
  Copy, 
  Check, 
  Layers, 
  Clock, 
  Download, 
  ChevronRight, 
  ExternalLink,
  Wrench,
  CheckCircle2
} from 'lucide-react';
import { LearningModule } from '../types';

interface LearningSectionProps {
  modules: LearningModule[];
}

export const LearningSection: React.FC<LearningSectionProps> = ({ modules }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeModule, setActiveModule] = useState<LearningModule>(modules[0]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [playgroundOutput, setPlaygroundOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const categories = ['Semua', 'Scratch 3.0', 'Pemrograman C#', 'Web Development', 'Desain Grafis', 'Jaringan Komputer', 'Robotika & IoT'];

  const filteredModules = modules.filter((m) => {
    return selectedCategory === 'Semua' || m.category === selectedCategory;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunPlayground = () => {
    setIsRunning(true);
    setPlaygroundOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      if (activeModule.category === 'Scratch 3.0') {
        setPlaygroundOutput(
`[Scratch VM Engine v3.0]
> Green Flag Event Triggered!
> Skor diatur ke 0.
> Posisi Sprite kucing: X: 0, Y: -120.
> Menekan tombol [Panah Kanan] -> X bertambah 10px -> Ganti Kostum 'berjalan'.
> Deteksi Kontak dengan 'Koin Emas' -> Benar (True)!
> [Suara Koin Berbunyi] ♫♫
> Skor Sekarang = 1!
Status: Animasi dan deteksi sprite berjalan normal 100%.`
        );
      } else if (activeModule.category === 'Pemrograman C#') {
        setPlaygroundOutput(
`[.NET 8.0 CLR Runtime Execution]
=== Selamat Datang di IT Club SMP ===
Total Anggota Aktif: 120 Siswa
Status: Siap Menciptakan Inovasi Digital!
[✓] Modul Siap Dipelajari: Scratch 3.0
[✓] Modul Siap Dipelajari: C# .NET
[✓] Modul Siap Dipelajari: Web Dev
[✓] Modul Siap Dipelajari: Robotika
---------------------------------------
Kompilasi sukses tanpa error (0 warning, 0 error).`
        );
      } else if (activeModule.category === 'Web Development') {
        setPlaygroundOutput(
`[Browser DOM Parser Engine]
Rendered HTML5 Tree:
<html>
  <head> [Tailwind CSS CDN Loaded: OK] </head>
  <body>
    <div class="max-w-md mx-auto bg-slate-800 ...">
      <h2>Halo, Saya Siswa SMP!</h2>
      <p>Sedang belajar merancang web masa depan di Lab Komputer.</p>
      <button class="bg-cyan-500">Lihat Portofolio</button>
    </div>
  </body>
</html>
Status: Card responsive layout rendered successfully!`
        );
      } else {
        setPlaygroundOutput(
`[Modul Pembelajaran IT Club SMP]
Simulasi eksekusi materi: "${activeModule.title}"
Alat yang digunakan: ${activeModule.tools.join(', ')}
Semua 5 bab silabus siap diakses siswa di Lab Komputer.`
        );
      }
    }, 600);
  };

  const handleDownloadModule = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <section className="py-16 bg-[#070b14] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Kurikulum Berjenjang SMP (Kls 7 - 9)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Modul Pembelajaran &amp; Lab Praktikum
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Materi disusun khusus dari tingkat dasar visual (Scratch) hingga bahasa teks industri (C#), desain antarmuka, jaringan komputer, dan robotika cerdas.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column Split: Module List on Left, Active Interactive Lesson on Right */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Module Cards Selector */}
          <div className="lg:col-span-5 space-y-3.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredModules.map((mod) => {
              const isSelected = activeModule.id === mod.id;
              return (
                <div
                  key={mod.id}
                  onClick={() => {
                    setActiveModule(mod);
                    setPlaygroundOutput(null);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer border transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#0f172a] border-cyan-400/80 shadow-lg shadow-cyan-950/50 -translate-y-0.5'
                      : 'bg-[#090e1c] border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-cyan-400 font-semibold">{mod.category}</span>
                    <span className="text-slate-400">{mod.level}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300">
                    {mod.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {mod.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {mod.duration}
                    </span>
                    <span className="flex items-center gap-1 text-cyan-300">
                      <span>Buka Modul</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Interactive Workspace & Code Preview */}
          <div className="lg:col-span-7 rounded-2xl bg-[#090e1c] border border-cyan-500/30 p-5 sm:p-7 shadow-xl">
            
            {/* Header Active Module */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                  <span>{activeModule.category}</span>
                  <span>·</span>
                  <span className="text-purple-300">{activeModule.level}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {activeModule.title}
                </h3>
              </div>

              <button
                onClick={handleDownloadModule}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-all self-start sm:self-auto"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Modul PDF Terunduh!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Unduh Lembar Kerja Siswa</span>
                  </>
                )}
              </button>
            </div>

            {/* Description & Tools */}
            <div className="py-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeModule.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1 mr-1">
                  <Wrench className="w-3.5 h-3.5 text-cyan-400" /> Tools Praktik:
                </span>
                {activeModule.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-800/80 text-cyan-200 border border-slate-700 font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Silabus 5 Bab */}
            <div className="mt-2 py-4 border-t border-slate-800">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Silabus &amp; Capaian Kompetensi:</span>
              </h4>
              <div className="space-y-2">
                {activeModule.syllabus.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-md bg-cyan-950/90 text-cyan-400 border border-cyan-800/50 flex items-center justify-center font-mono font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Code Preview or Simulator if available */}
            {activeModule.codeExample ? (
              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono text-slate-300 font-semibold">
                      {activeModule.codeExample.filename}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(activeModule.codeExample!.code)}
                      className="p-1 rounded text-slate-400 hover:text-white"
                      title="Salin Kode"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={handleRunPlayground}
                      disabled={isRunning}
                      className="flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all"
                    >
                      <Play className="w-3 h-3 fill-slate-950" />
                      <span>{isRunning ? 'Menjalankan...' : 'Uji Kode'}</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden bg-[#050811] border border-slate-800 text-xs font-mono p-3 text-cyan-200 overflow-x-auto">
                  <pre className="leading-relaxed">{activeModule.codeExample.code}</pre>
                </div>

                {playgroundOutput && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Hasil Simulasi Eksekusi:</span>
                    </div>
                    <pre className="whitespace-pre-wrap">{playgroundOutput}</pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-slate-800 p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Praktik Langsung di Laboratorium</div>
                  <div className="text-xs text-slate-400 mt-0.5">Modul ini melibatkan perangkat fisik &amp; workstation PC Lab 2.</div>
                </div>
                <button
                  onClick={handleRunPlayground}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30"
                >
                  Lihat Info Praktik
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
