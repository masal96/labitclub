import React from 'react';
import { 
  Laptop, 
  Cpu, 
  ShieldCheck, 
  Wifi, 
  Award, 
  Users, 
  Terminal, 
  ArrowRight,
  BookOpen,
  Sparkles
} from 'lucide-react';

interface LabShowcaseProps {
  onExploreModules: () => void;
  onExploreActivities: () => void;
  onOpenJoinClub: () => void;
}

export const LabShowcase: React.FC<LabShowcaseProps> = ({
  onExploreModules,
  onExploreActivities,
  onOpenJoinClub,
}) => {
  return (
    <section className="py-16 bg-[#060913] text-slate-100 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Visual Lab Showcase with Generated High-Fidelity Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase">
              <Laptop className="w-3.5 h-3.5 text-cyan-400" />
              <span>Infrastruktur Modern Sekolah</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Dua Laboratorium Terpadu untuk Masa Depan Digital Siswa
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Dilengkapi 40 unit PC berspesifikasi tinggi, monitor ganda, koneksi internet gigabit dedicated, serta meja kerja robotika interaktif. Ruang yang dirancang untuk membangkitkan rasa ingin tahu dan kolaborasi tim siswa SMP.
            </p>

            <div className="grid grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-cyan-400 font-bold text-sm">Lab 1: Multimedia &amp; Game</div>
                <div className="text-xs text-slate-400 mt-1">
                  Fokus pada Scratch 3.0, Web HTML/CSS, dan Desain Grafis UI/UX.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-purple-400 font-bold text-sm">Lab 2: Coding &amp; Robotik</div>
                <div className="text-xs text-slate-400 mt-1">
                  Fokus pada Pemrograman C#, Jaringan UTP/LAN, &amp; Mikrokontroler Arduino.
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onExploreActivities}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 shadow-md shadow-cyan-500/20 flex items-center gap-2"
              >
                <span>Lihat Kegiatan Terdekat</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreModules}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white"
              >
                Silabus Belajar
              </button>
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Image 1: Computer Lab Interior */}
            <div className="group relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-900 shadow-xl aspect-[4/3] sm:col-span-2">
              <img
                src="/src/assets/images/smp_computer_lab_1792331963445.jpg"
                alt="Laboratorium Komputer SMP"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-800/60 self-start mb-1">
                  Lab Komputer Utama
                </span>
                <h4 className="text-base font-bold text-white">
                  Workstation Coding &amp; Game Development
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  PC Core i7 dengan sistem dual-display untuk pembelajaran pemrograman terstruktur.
                </p>
              </div>
            </div>

            {/* Image 2: Students in Club Collaboration */}
            <div className="group relative rounded-2xl overflow-hidden border border-purple-500/30 bg-slate-900 shadow-xl aspect-[4/3] sm:col-span-2">
              <img
                src="/src/assets/images/students_coding_club_1792331963529.jpg"
                alt="Kolaborasi Siswa IT Club"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-950/90 text-purple-300 border border-purple-800/60 self-start mb-1">
                  Aktivitas Siswa
                </span>
                <h4 className="text-base font-bold text-white">
                  Proyek Kolaborasi Robotika &amp; Pemrograman
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Siswa aktif berkreasi merakit alat cerdas dan mengasah logika komputasional.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Section 2: 4 Pilar Kurikulum IT Club */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              4 Pilar Kompetensi IT Club SMP
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Kurikulum dirancang bertahap agar siswa dapat bertumbuh dari pengguna menjadi pencipta teknologi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="p-5 rounded-2xl bg-[#090e1c] border border-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-4">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">1. Scratch 3.0 Game Dev</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Logika pemrograman visual untuk pemula kelas 7: perulangan, variabel skor, sprite animasi, dan deteksi collision.
              </p>
              <div className="mt-4 text-[11px] font-mono text-cyan-400">Tingkat: Dasar (Kls 7)</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#090e1c] border border-slate-800 hover:border-purple-500/50 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 mb-4">
                <Terminal className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">2. Pemrograman C# .NET</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Transisi ke bahasa teks industri: tipe data, fungsi logika if-else, array, dan aplikasi kalkulator sekolah.
              </p>
              <div className="mt-4 text-[11px] font-mono text-purple-400">Tingkat: Menengah (Kls 8)</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#090e1c] border border-slate-800 hover:border-teal-500/50 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-500/40 flex items-center justify-center text-teal-300 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">3. Desain Grafis &amp; Web</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Pembuatan poster digital, antarmuka aplikasi di Figma, serta coding web responsif dengan HTML5 &amp; Tailwind CSS.
              </p>
              <div className="mt-4 text-[11px] font-mono text-teal-400">Tingkat: Semua Jenjang</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#090e1c] border border-slate-800 hover:border-amber-500/50 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-300 mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">4. Jaringan &amp; Robotika IoT</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Praktek crimping kabel LAN RJ-45, setup IP router, dan merakit sensor mikrokontroler Arduino Uno pintar.
              </p>
              <div className="mt-4 text-[11px] font-mono text-amber-400">Tingkat: Mahir (Kls 9)</div>
            </div>

          </div>
        </div>

        {/* Section 3: Tata Tertib Lab Komputer */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-[#090e1c] border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <div>
                <h4 className="text-lg font-bold text-white">Tata Tertib &amp; Etika di Laboratorium Komputer</h4>
                <p className="text-xs text-slate-400">Wajib ditaati oleh seluruh siswa dan anggota IT Club</p>
              </div>
            </div>

            <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-3 py-1 rounded-lg self-start md:self-auto">
              Standar Operasional Prosedur (SOP)
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block mb-1">1. Presensi Wajib</span>
              Setiap siswa wajib melakukan tap kartu RFID atau scan QR di meja guru sebelum menyalakan PC.
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block mb-1">2. Makanan &amp; Minuman</span>
              Dilarang membawa makanan dan minuman ke dalam area meja komputer untuk mencegah korsleting listrik.
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block mb-1">3. Kebersihan Perangkat</span>
              Merapikan kembali keyboard, mouse, headphone, dan mematikan PC (Shut Down) secara benar setelah sesi selesai.
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block mb-1">4. Keamanan Akun</span>
              Selalu log out dari akun Google/Scratch/GitHub sebelum meninggalkan ruangan lab.
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block mb-1">5. Larangan Instalasi Liar</span>
              Tidak diperkenankan menginstal game ilegal atau aplikasi non-edukasi tanpa izin Guru Pembina.
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block mb-1">6. Perawatan Kit Robotika</span>
              Menyimpan kembali modul sensor dan kabel jumper ke kotak kit masing-masing dengan rapi.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
