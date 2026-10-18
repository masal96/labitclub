import { Activity, AdminUser, AttendanceRecord, LearningModule, PortfolioProject, ScheduleItem, Student } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    nisn: '0098712301',
    name: 'Raditya Pratama',
    classRoom: '8A',
    rfidUid: 'RFID-9921-A',
    qrToken: 'SMP-IT-RADITYA-01',
    gender: 'L',
    specialization: 'Game Dev (Scratch)',
    totalAttendance: 14,
  },
  {
    id: 'std-2',
    nisn: '0098712302',
    name: 'Nayla Azzahra',
    classRoom: '7B',
    rfidUid: 'RFID-4810-B',
    qrToken: 'SMP-IT-NAYLA-02',
    gender: 'P',
    specialization: 'Robotika',
    totalAttendance: 12,
  },
  {
    id: 'std-3',
    nisn: '0098712303',
    name: 'Fathir Ahmad',
    classRoom: '9C',
    rfidUid: 'RFID-1029-C',
    qrToken: 'SMP-IT-FATHIR-03',
    gender: 'L',
    specialization: 'Web & Jaringan',
    totalAttendance: 16,
  },
  {
    id: 'std-4',
    nisn: '0098712304',
    name: 'Zahra Kirana',
    classRoom: '8C',
    rfidUid: 'RFID-7712-D',
    qrToken: 'SMP-IT-ZAHRA-04',
    gender: 'P',
    specialization: 'Pemrograman C#',
    totalAttendance: 15,
  },
  {
    id: 'std-5',
    nisn: '0098712305',
    name: 'Kevin Jonathan',
    classRoom: '8B',
    rfidUid: 'RFID-6623-E',
    qrToken: 'SMP-IT-KEVIN-05',
    gender: 'L',
    specialization: 'Desain Grafis',
    totalAttendance: 11,
  },
  {
    id: 'std-6',
    nisn: '0098712306',
    name: 'Aisyah Putri Maharani',
    classRoom: '7A',
    rfidUid: 'RFID-3349-F',
    qrToken: 'SMP-IT-AISYAH-06',
    gender: 'P',
    specialization: 'Game Dev (Scratch)',
    totalAttendance: 9,
  },
  {
    id: 'std-7',
    nisn: '0098712307',
    name: 'Dimas Setiawan',
    classRoom: '9A',
    rfidUid: 'RFID-5582-G',
    qrToken: 'SMP-IT-DIMAS-07',
    gender: 'L',
    specialization: 'Web & Jaringan',
    totalAttendance: 18,
  },
  {
    id: 'std-8',
    nisn: '0098712308',
    name: 'Clarissa Valerie',
    classRoom: '8A',
    rfidUid: 'RFID-2218-H',
    qrToken: 'SMP-IT-CLARISSA-08',
    gender: 'P',
    specialization: 'Desain Grafis',
    totalAttendance: 13,
  },
];

export const INITIAL_MODULES: LearningModule[] = [
  {
    id: 'mod-1',
    title: 'Scratch 3.0: Dasar Logika & Pembuatan Game 2D',
    category: 'Scratch 3.0',
    level: 'Pemula (Kelas 7)',
    duration: '6 Pertemuan (12 JP)',
    lessonsCount: 6,
    description: 'Pelajari konsep dasar algoritma pemrograman visual berbasis blok warna. Siswa akan menciptakan animasi interaktif dan game platformer 2D seperti Flappy Bird dan Pac-Man sederhana.',
    syllabus: [
      'Pengenalan Stage, Sprite, dan Event Driven Programming',
      'Struktur Perulangan (Loops) dan Percabangan (If-Else)',
      'Variabel Skor, Waktu, dan Deteksi Tabrakan (Sensing)',
      'Efek Suara, Broadcast Message, dan Custom Block',
      'Mini Project: Game Kuis Cerdas Tangkas SMP'
    ],
    tools: ['Scratch 3.0 Desktop', 'Scratch Web Editor', 'Asset Karakter Sprite'],
    codeExample: {
      language: 'Scratch Logic',
      filename: 'MainPlayerScript.scratch',
      code: `when green flag clicked
set [skor v] to [0]
go to x: (0) y: (-120)
forever
  if <key [right arrow v] pressed?> then
    change x by (10)
    next costume
  end
  if <touching [Koin Emas v]?> then
    change [skor v] by (1)
    play sound [Coin Sound v]
  end
end`,
      explanation: 'Logika blok Scratch untuk menggerakkan sprite ke kanan dan mendeteksi koin untuk menambah skor pemain.'
    }
  },
  {
    id: 'mod-2',
    title: 'Pemrograman C#: Logika Komputasi & Aplikasi Konsol',
    category: 'Pemrograman C#',
    level: 'Menengah (Kelas 8)',
    duration: '8 Pertemuan (16 JP)',
    lessonsCount: 8,
    description: 'Mengenal bahasa pemrograman industri C# dengan .NET SDK. Mempelajari sintaksis berbasis teks, tipe data, fungsi logika, kalkulator otomatis, hingga logika game teks.',
    syllabus: [
      'Struktur Dasar Program C# (Main Method, Console.WriteLine)',
      'Tipe Data Primitif, Konversi, dan Input Pengguna (Console.ReadLine)',
      'Operator Aritmatika, Logika, dan Pengambilan Keputusan (Switch-Case)',
      'Array, List, dan Perulangan For / Foreach',
      'Pembuatan Proyek: Program Kasir Koperasi Sekolah Sederhana'
    ],
    tools: ['Visual Studio Community / VS Code', '.NET SDK', 'C# Interactive'],
    codeExample: {
      language: 'csharp',
      filename: 'ITClub_Welcome.cs',
      code: `using System;

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
            
            // Loop sambutan
            string[] skills = { "Scratch", "C# .NET", "Web Dev", "Robotika" };
            foreach (var skill in skills)
            {
                Console.WriteLine($"[✓] Modul Siap Dipelajari: {skill}");
            }
        }
    }
}`,
      explanation: 'Struktur kode C# standar yang memperkenalkan namespace, method Main, variabel bertipe, string interpolation, dan perulangan foreach.'
    }
  },
  {
    id: 'mod-3',
    title: 'Web Design Modern: HTML5, CSS3 & Tailwind Dasar',
    category: 'Web Development',
    level: 'Pemula (Kelas 7)',
    duration: '6 Pertemuan (12 JP)',
    lessonsCount: 6,
    description: 'Panduan lengkap merancang halaman website yang responsif dan estetis menggunakan elemen semantik HTML5, modern flexbox CSS, dan utility-first styling.',
    syllabus: [
      'Anatomi Struktur Dokumen Web & Tag Semantik HTML5',
      'Styling dengan CSS: Warna, Margin, Padding, dan Font Google',
      'Flexbox & Grid Layout untuk Tampilan Kartu yang Rapi',
      'Interaktivitas Dasar dengan Vanilla JavaScript (Event Listener)',
      'Deploy Website Siswa ke Hosting Gratis (GitHub Pages / Vercel)'
    ],
    tools: ['VS Code', 'Chrome DevTools', 'Tailwind CSS CDN', 'GitHub'],
    codeExample: {
      language: 'html',
      filename: 'profil_siswa.html',
      code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Profil Siswa IT Club</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-white p-8">
  <div class="max-w-md mx-auto bg-slate-800 rounded-xl p-6 border border-cyan-500/30">
    <h2 class="text-xl font-bold text-cyan-400">Halo, Saya Siswa SMP!</h2>
    <p class="text-slate-300 mt-2">Sedang belajar merancang web masa depan di Lab Komputer.</p>
    <button class="mt-4 px-4 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-lg hover:bg-cyan-400">
      Lihat Portofolio
    </button>
  </div>
</body>
</html>`,
      explanation: 'Contoh struktur website modern mini dengan utilitas kelas Tailwind CSS responsif.'
    }
  },
  {
    id: 'mod-4',
    title: 'Desain Grafis & UI/UX untuk Remaja: Poster & Mockup',
    category: 'Desain Grafis',
    level: 'Menengah (Kelas 8)',
    duration: '4 Pertemuan (8 JP)',
    lessonsCount: 4,
    description: 'Belajar prinsip visual tata letak, teori warna, tipografi, serta mendesain poster kegiatan sekolah dan antarmuka aplikasi seluler menggunakan Figma.',
    syllabus: [
      'Prinsip Desain: Hierarki Visual, Kontras, dan Spasi Negatif',
      'Teori Warna Harmonis & Pemilihan Font yang Tepat',
      'Mendesain Poster Edukasi & Pengumuman Sekolah',
      'Wireframing & Prototyping Antarmuka Aplikasi di Figma',
      'Export Aset Gambar (SVG, PNG, WebP) untuk Website'
    ],
    tools: ['Figma Web', 'Canva Edu', 'Coolors Palette', 'Google Fonts'],
  },
  {
    id: 'mod-5',
    title: 'Jaringan Komputer: Crimping Kabel UTP & Konfigurasi Wi-Fi',
    category: 'Jaringan Komputer',
    level: 'Mahir (Kelas 9)',
    duration: '4 Pertemuan (8 JP)',
    lessonsCount: 4,
    description: 'Praktek langsung di Lab Komputer 2: merakit kabel LAN RJ-45 standar Straight-through & Cross, mengetes koneksi tester, dan konfigurasi IP Address Local.',
    syllabus: [
      'Pengenalan Perangkat Jaringan: Switch, Router, Modem, Access Point',
      'Standar Urutan Warna T568A dan T568B',
      'Praktek Mengupas Kabel, Crimping Konektor RJ-45, & LAN Tester',
      'Pengaturan IP Address Statis & Uji Koneksi PING di Command Prompt',
      'Pengamanan Jaringan Wi-Fi Lab Sederhana'
    ],
    tools: ['Tang Crimping', 'Kabel UTP Cat6', 'Konektor RJ-45', 'LAN Cable Tester', 'Switch Hub'],
  },
  {
    id: 'mod-6',
    title: 'Robotika Dasar & IoT: Arduino Uno & Sensor Cerdas',
    category: 'Robotika & IoT',
    level: 'Mahir (Kelas 9)',
    duration: '6 Pertemuan (12 JP)',
    lessonsCount: 6,
    description: 'Eksplorasi integrasi perangkat keras dan perangkat lunak. Mengontrol lampu LED, sensor jarak ultrasonik, servo motor, dan buzzer peringatan.',
    syllabus: [
      'Mengenal Mikrokontroler Arduino Uno & Breadboard',
      'Menulis Kode Bahasa C/C++ pada Arduino IDE',
      'Membaca Sensor Jarak Ultrasonik HC-SR04',
      'Menggerakkan Motor Servo untuk Palang Pintu Otomatis',
      'Proyek Akhir: Tempat Sampah Pintar Tanpa Sentuh (Smart Dustbin)'
    ],
    tools: ['Arduino Uno Kit', 'Kabel Jumper', 'Sensor HC-SR04', 'Servo SG90', 'Arduino IDE'],
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    title: 'Workshop Pembuatan Game 2D Scratch Seri Petualangan',
    category: 'Workshop',
    date: '24 Oktober 2026',
    time: '13.30 - 15.30 WIB',
    location: 'Lab Komputer 1 (Multimedia)',
    speaker: 'Bpk. Hendra Wijaya, S.Kom. & Tim Mentor Kls 9',
    description: 'Pelatihan intensif 2 jam membuat game endless runner menggunakan Scratch 3.0. Setiap peserta akan membawa pulang hasil proyek game yang bisa dimainkan di laptop masing-masing.',
    maxSlots: 35,
    registeredCount: 29,
    status: 'Pendaftaran Dibuka',
    tags: ['Scratch', 'Game Dev', 'Kelas 7 & 8'],
  },
  {
    id: 'act-2',
    title: 'Sesi Rutin Mingguan: Eksplorasi C# & Pemecahan Masalah Algoritma',
    category: 'Sesi Rutin',
    date: 'Setiap Jumat',
    time: '14.00 - 16.00 WIB',
    location: 'Lab Komputer 2 (Coding & Robotika)',
    speaker: 'Ibu Rina Mariana, M.Pd.',
    description: 'Pertemuan rutin anggota IT Club tingkat menengah dan mahir. Fokus pada tantangan logika coding, debugging, dan persiapan olimpiade informatika SMP.',
    maxSlots: 30,
    registeredCount: 26,
    status: 'Pendaftaran Dibuka',
    tags: ['C# .NET', 'Algoritma', 'Sesi Rutin'],
  },
  {
    id: 'act-3',
    title: 'Kompetisi Internal: Desain Poster & Web Landing Page SMP',
    category: 'Lomba',
    date: '10 November 2026',
    time: '08.00 - 12.00 WIB',
    location: 'Lab Komputer 1 & 2',
    speaker: 'Dewan Juri Guru TIK & Osis',
    description: 'Ajang unjuk kebolehan seluruh anggota IT Club dalam mendesain materi visual bertema "Sekolah Ramah Lingkungan & Generasi Cerdas Digital". Hadiah piala, piagam, dan voucher belajar.',
    maxSlots: 50,
    registeredCount: 42,
    status: 'Pendaftaran Dibuka',
    tags: ['Lomba', 'Figma', 'Web Design', 'Sertifikat'],
  },
  {
    id: 'act-4',
    title: 'Praktek Lapangan: Crimping Kabel Jaringan & Setup Lab Baru',
    category: 'Proyek Terbuka',
    date: '28 November 2026',
    time: '09.00 - 13.00 WIB',
    location: 'Lab Komputer 2',
    speaker: 'Teknisi Jaringan Sekolah & Bpk. Hendra',
    description: 'Kegiatan gotong-royong merapikan instalasi kabel LAN dan menguji transmisi data gigabit untuk persiapan asesmen berbasis komputer sekolah.',
    maxSlots: 20,
    registeredCount: 20,
    status: 'Segera Dimulai',
    tags: ['Hardware', 'Jaringan', 'Hands-on'],
  }
];

export const INITIAL_PORTFOLIO: PortfolioProject[] = [
  {
    id: 'port-1',
    title: 'MathQuest: Petualangan Matematika Interaktif',
    studentName: 'Raditya Pratama',
    studentClass: '8A',
    category: 'Game Scratch',
    description: 'Game petualangan 2D di mana pemain harus menyelesaikan teka-teki pecahan dan aljabar untuk membuka gerbang istana digital. Dilengkapi sistem checkpoint dan suara latar 8-bit.',
    toolsUsed: ['Scratch 3.0', 'Audacity', 'Pixel Art'],
    date: '12 Oktober 2026',
    likes: 48,
    hasUserLiked: false,
    demoUrl: 'https://scratch.mit.edu',
    featured: true,
  },
  {
    id: 'port-2',
    title: 'Kalkulator Penentu Nilai Kelulusan & Predikat Rapor C#',
    studentName: 'Zahra Kirana',
    studentClass: '8C',
    category: 'Aplikasi C#',
    description: 'Program aplikasi konsol C# yang menghitung nilai akhir rata-rata tugas, UTS, dan UAS dengan bobot otomatis, serta memberikan rekomendasi remedial terstruktur.',
    toolsUsed: ['C# .NET 8.0', 'Visual Studio', 'Console GUI'],
    date: '05 Oktober 2026',
    likes: 35,
    hasUserLiked: false,
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'port-3',
    title: 'Web Portal E-Katalog Buku Perpustakaan SMP',
    studentName: 'Fathir Ahmad & Dimas Setiawan',
    studentClass: '9C / 9A',
    category: 'Website',
    description: 'Website katalog buku interaktif dengan pencarian judul instan, filter kategori fiksi/non-fiksi, dan status ketersediaan rak buku perpustakaan sekolah.',
    toolsUsed: ['HTML5', 'Tailwind CSS', 'JavaScript'],
    date: '28 September 2026',
    likes: 62,
    hasUserLiked: false,
    demoUrl: 'https://example.com/perpustakaan-smp',
    featured: true,
  },
  {
    id: 'port-4',
    title: 'Smart Dustbin: Tong Sampah Otomatis Sensor Ultrasonik',
    studentName: 'Nayla Azzahra & Aisyah Putri',
    studentClass: '7B / 7A',
    category: 'Robotika IoT',
    description: 'Prototipe tempat sampah nirsentuh untuk kantin sekolah. Penutup membuka secara otomatis saat tangan didekatkan sejauh 15cm dengan sensor HC-SR04 dan servo motor.',
    toolsUsed: ['Arduino Uno', 'Sensor HC-SR04', 'Servo SG90', 'C++'],
    date: '15 September 2026',
    likes: 54,
    hasUserLiked: false,
    featured: true,
  },
  {
    id: 'port-5',
    title: 'Desain UI/UX Konsep Aplikasi Kantin Digital Pintar',
    studentName: 'Kevin Jonathan',
    studentClass: '8B',
    category: 'Desain Grafis',
    description: 'Mockup antarmuka pemesanan makanan kantin sekolah saat istirahat untuk memangkas antrean panjang. Dilengkapi alur menu favorit dan saldo kartu siswa.',
    toolsUsed: ['Figma', 'Illustrator', 'Design System'],
    date: '02 September 2026',
    likes: 41,
    hasUserLiked: false,
    featured: false,
  },
  {
    id: 'port-6',
    title: 'Poster Digital Kampanye Literasi Siber & Keamanan Password',
    studentName: 'Clarissa Valerie',
    studentClass: '8A',
    category: 'Desain Grafis',
    description: 'Seri infografis edukatif tentang bahaya phishing, kiat membuat password kombinasi kuat, dan etika berkomunikasi santun di media sosial bagi siswa SMP.',
    toolsUsed: ['Canva Pro Edu', 'Vector Graphics'],
    date: '20 Agustus 2026',
    likes: 29,
    hasUserLiked: false,
    featured: false,
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sch-1',
    day: 'Senin',
    time: '13.30 - 15.00 WIB',
    activityName: 'Pelatihan Game Dev Scratch (Kelas 7)',
    targetGroup: 'Anggota Baru Kls 7',
    mentor: 'Bpk. Hendra Wijaya, S.Kom.',
    labRoom: 'Lab Komputer 1 (Multimedia)',
    capacity: '36 Siswa / 36 PC',
    status: 'Aktif',
  },
  {
    id: 'sch-2',
    day: 'Selasa',
    time: '14.00 - 15.30 WIB',
    activityName: 'Desain Grafis & UI/UX Figma Dasar',
    targetGroup: 'Anggota Terbuka (Kls 7-9)',
    mentor: 'Kak Alifia (Mentor Alumni)',
    labRoom: 'Lab Komputer 1 (Multimedia)',
    capacity: '32 Siswa / 36 PC',
    status: 'Aktif',
  },
  {
    id: 'sch-3',
    day: 'Rabu',
    time: '13.30 - 15.30 WIB',
    activityName: 'Pemrograman C# & Dasar Algoritma .NET',
    targetGroup: 'Anggota Lanjutan Kls 8',
    mentor: 'Ibu Rina Mariana, M.Pd.',
    labRoom: 'Lab Komputer 2 (Coding & Robotika)',
    capacity: '30 Siswa / 32 PC',
    status: 'Aktif',
  },
  {
    id: 'sch-4',
    day: 'Kamis',
    time: '14.00 - 15.30 WIB',
    activityName: 'Web Development (HTML/CSS/Tailwind)',
    targetGroup: 'Anggota Kls 8 & 9',
    mentor: 'Bpk. Hendra Wijaya, S.Kom.',
    labRoom: 'Lab Komputer 1 (Multimedia)',
    capacity: '36 Siswa / 36 PC',
    status: 'Aktif',
  },
  {
    id: 'sch-5',
    day: 'Jumat',
    time: '13.30 - 15.30 WIB',
    activityName: 'Praktikum Robotika Arduino & Sensor Pintar',
    targetGroup: 'Tim Proyek IoT Kls 8-9',
    mentor: 'Bpk. Ahmad Fauzi, S.T.',
    labRoom: 'Lab Komputer 2 (Coding & Robotika)',
    capacity: '24 Siswa (12 Kit Robotik)',
    status: 'Aktif',
  },
  {
    id: 'sch-6',
    day: 'Sabtu',
    time: '09.00 - 11.30 WIB',
    activityName: 'Sesi Bebas Konsultasi Proyek & Mentoring Lomba',
    targetGroup: 'Semua Anggota Berproyek',
    mentor: 'Seluruh Pembina & Mentor IT Club',
    labRoom: 'Lab Komputer 1 (Multimedia)',
    capacity: 'Kapasitas Penuh (36 PC)',
    status: 'Aktif',
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    studentId: 'std-1',
    studentName: 'Raditya Pratama',
    classRoom: '8A',
    rfidUid: 'RFID-9921-A',
    method: 'RFID_CARD',
    status: 'HADIR',
    timestamp: '2026-10-16T13:28:15',
    sessionName: 'Pelatihan Game Dev Scratch',
  },
  {
    id: 'att-2',
    studentId: 'std-2',
    studentName: 'Nayla Azzahra',
    classRoom: '7B',
    rfidUid: 'RFID-4810-B',
    method: 'QR_CODE',
    status: 'HADIR',
    timestamp: '2026-10-16T13:29:40',
    sessionName: 'Pelatihan Game Dev Scratch',
  },
  {
    id: 'att-3',
    studentId: 'std-3',
    studentName: 'Fathir Ahmad',
    classRoom: '9C',
    rfidUid: 'RFID-1029-C',
    method: 'RFID_CARD',
    status: 'HADIR',
    timestamp: '2026-10-16T13:30:12',
    sessionName: 'Pelatihan Game Dev Scratch',
  },
  {
    id: 'att-4',
    studentId: 'std-4',
    studentName: 'Zahra Kirana',
    classRoom: '8C',
    rfidUid: 'RFID-7712-D',
    method: 'QR_CODE',
    status: 'HADIR',
    timestamp: '2026-10-16T13:32:05',
    sessionName: 'Pelatihan Game Dev Scratch',
  },
  {
    id: 'att-5',
    studentId: 'std-5',
    studentName: 'Kevin Jonathan',
    classRoom: '8B',
    rfidUid: 'RFID-6623-E',
    method: 'MANUAL',
    status: 'IZIN',
    timestamp: '2026-10-16T13:35:00',
    sessionName: 'Pelatihan Game Dev Scratch',
    notes: 'Mengikuti seleksi olimpiade matematika sekolah',
  }
];

export const INITIAL_ADMIN: AdminUser = {
  id: 'adm-01',
  name: 'Bpk. Hendra Wijaya, S.Kom.',
  nip: '19880415 201402 1 002',
  email: 'guru@itclub.smp.sch.id',
  role: 'Guru Pembina IT Club',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
};
