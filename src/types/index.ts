export type StudentGrade = 'Kelas 7' | 'Kelas 8' | 'Kelas 9';

export interface Student {
  id: string;
  nisn: string;
  name: string;
  classRoom: string; // e.g. "8A", "7B", "9C"
  rfidUid: string;   // e.g. "RFID-8812-A"
  qrToken: string;   // e.g. "SMP-IT-RADITYA-01"
  gender: 'L' | 'P';
  avatar?: string;
  specialization: 'Game Dev (Scratch)' | 'Pemrograman C#' | 'Desain Grafis' | 'Web & Jaringan' | 'Robotika';
  totalAttendance: number;
}

export type AttendanceMethod = 'QR_CODE' | 'RFID_CARD' | 'MANUAL';
export type AttendanceStatus = 'HADIR' | 'IZIN' | 'SAKIT' | 'ALPA';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classRoom: string;
  rfidUid: string;
  method: AttendanceMethod;
  status: AttendanceStatus;
  timestamp: string; // ISO string
  notes?: string;
  sessionName: string; // e.g., "Sesi Coding Sore - Lab 1"
}

export interface Activity {
  id: string;
  title: string;
  category: 'Workshop' | 'Lomba' | 'Sesi Rutin' | 'Kunjungan Industri' | 'Proyek Terbuka';
  date: string;
  time: string;
  location: string;
  speaker: string;
  description: string;
  maxSlots: number;
  registeredCount: number;
  status: 'Pendaftaran Dibuka' | 'Segera Dimulai' | 'Selesai';
  tags: string[];
}

export interface LearningModule {
  id: string;
  title: string;
  category: 'Scratch 3.0' | 'Pemrograman C#' | 'Web Development' | 'Desain Grafis' | 'Jaringan Komputer' | 'Robotika & IoT';
  level: 'Pemula (Kelas 7)' | 'Menengah (Kelas 8)' | 'Mahir (Kelas 9)';
  duration: string;
  lessonsCount: number;
  description: string;
  syllabus: string[];
  codeExample?: {
    language: string;
    filename: string;
    code: string;
    explanation: string;
  };
  tools: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  studentName: string;
  studentClass: string;
  category: 'Game Scratch' | 'Aplikasi C#' | 'Website' | 'Desain Grafis' | 'Robotika IoT';
  description: string;
  toolsUsed: string[];
  date: string;
  likes: number;
  hasUserLiked?: boolean;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface ScheduleItem {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  time: string;
  activityName: string;
  targetGroup: string; // e.g., "Anggota Pemula (Kls 7)"
  mentor: string;
  labRoom: 'Lab Komputer 1 (Multimedia)' | 'Lab Komputer 2 (Coding & Robotika)';
  capacity: string;
  status: 'Aktif' | 'Terjadwal' | 'Pemeliharaan Lab';
}

export interface AdminUser {
  id: string;
  name: string;
  nip: string;
  email: string;
  role: 'Guru Pembina IT Club' | 'Kepala Lab Komputer' | 'Instruktur IT';
  avatar: string;
}

export interface JoinRequest {
  id: string;
  fullName: string;
  nisn: string;
  classRoom: string;
  email: string;
  phoneWhatsapp: string;
  interest: string;
  reason: string;
  submissionDate: string;
  status: 'Menunggu Review' | 'Diterima' | 'Ditolak';
}
