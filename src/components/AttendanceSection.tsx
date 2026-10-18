import React, { useState, useEffect, useRef } from 'react';
import { 
  QrCode, 
  CreditCard, 
  Camera, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Printer, 
  Download, 
  Sparkles, 
  UserCheck, 
  Clock, 
  Trash2, 
  Volume2, 
  Radio, 
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import { AdminUser, AttendanceRecord, AttendanceStatus, Student } from '../types';
import { playScanSound, triggerConfetti } from '../utils/audio';

interface AttendanceSectionProps {
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  onAddAttendance: (record: AttendanceRecord) => void;
  onUpdateAttendanceStatus: (id: string, newStatus: AttendanceStatus) => void;
  onDeleteAttendance: (id: string) => void;
  adminUser: AdminUser | null;
  onOpenAdminLogin: () => void;
  onOpenPrintCards: () => void;
}

export const AttendanceSection: React.FC<AttendanceSectionProps> = ({
  students,
  attendanceRecords,
  onAddAttendance,
  onUpdateAttendanceStatus,
  onDeleteAttendance,
  adminUser,
  onOpenAdminLogin,
  onOpenPrintCards,
}) => {
  const [activeTab, setActiveTab] = useState<'qr' | 'rfid' | 'records'>('rfid');
  const [sessionName, setSessionName] = useState('Pelatihan Game Dev Scratch - Sesi Sore');
  
  // RFID Mode States
  const [rfidInput, setRfidInput] = useState('');
  const [lastScannedStudent, setLastScannedStudent] = useState<{
    student: Student;
    timestamp: string;
    method: 'QR_CODE' | 'RFID_CARD';
  } | null>(null);
  const [scanMessage, setScanMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Camera QR States
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Table Filters
  const [filterClass, setFilterClass] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [searchStudent, setSearchStudent] = useState('');

  // Handle camera start/stop
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (activeTab === 'qr' && isCameraActive && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.play();
          }
        })
        .catch((err) => {
          console.warn('Camera error:', err);
          setCameraError('Kamera tidak dapat diakses atau izin belum diberikan. Gunakan fitur simulasi di bawah.');
          setIsCameraActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraActive, activeTab]);

  // Process RFID or QR scan
  const handleProcessScan = (tokenOrUid: string, method: 'QR_CODE' | 'RFID_CARD') => {
    const student = students.find((s) => 
      method === 'RFID_CARD' ? s.rfidUid.toLowerCase() === tokenOrUid.toLowerCase() : s.qrToken.toLowerCase() === tokenOrUid.toLowerCase()
    );

    if (!student) {
      playScanSound('error');
      setScanMessage({
        type: 'error',
        text: `Data kartu / kode [${tokenOrUid}] tidak ditemukan dalam basis data siswa IT Club.`
      });
      return;
    }

    // Check if already present today for this session
    const alreadyAttended = attendanceRecords.some(
      (r) => r.studentId === student.id && r.sessionName === sessionName
    );

    const now = new Date().toISOString();
    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      classRoom: student.classRoom,
      rfidUid: student.rfidUid,
      method: method,
      status: 'HADIR',
      timestamp: now,
      sessionName: sessionName,
    };

    onAddAttendance(newRecord);
    playScanSound('success');
    triggerConfetti();

    setLastScannedStudent({
      student,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB',
      method,
    });

    setScanMessage({
      type: 'success',
      text: alreadyAttended
        ? `Presensi ulang tercatat untuk ${student.name} (${student.classRoom}).`
        : `Presensi berhasil! Selamat datang, ${student.name} (${student.classRoom}).`
    });

    setRfidInput('');
  };

  const handleRfidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfidInput.trim()) return;
    handleProcessScan(rfidInput.trim(), 'RFID_CARD');
  };

  const handleExportCSV = () => {
    const headers = ['No', 'Nama Siswa', 'Kelas', 'UID Kartu RFID', 'Metode Presensi', 'Status', 'Sesi', 'Waktu'];
    const rows = attendanceRecords.map((r, i) => [
      i + 1,
      `"${r.studentName}"`,
      r.classRoom,
      r.rfidUid,
      r.method,
      r.status,
      `"${r.sessionName}"`,
      new Date(r.timestamp).toLocaleString('id-ID')
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Absensi_ITClub_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If NOT ADMIN, show prominent protected barrier
  if (!adminUser) {
    return (
      <section className="py-20 bg-[#060913] text-slate-100 flex items-center justify-center min-h-[650px] relative">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-3xl bg-purple-950/70 border border-purple-500/50 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-900/40">
            <Lock className="w-10 h-10 text-purple-400" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono uppercase mb-4">
            Akses Khusus Guru &amp; Pembina Lab
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Portal Absensi Digital Terkunci
          </h2>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Sesuai kebijakan keamanan laboratorium, fitur pemindai QR Code dan RFID Reader hanya dapat dioperasikan oleh Guru Pembina atau Kepala Lab Komputer untuk memverifikasi kehadiran siswa secara resmi.
          </p>

          <div className="mt-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-200 font-semibold font-mono">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Ingin mencoba fitur pemindai absensi?</span>
            </div>
            <p>
              Klik tombol di bawah untuk masuk menggunakan akun demo <strong>Guru Pembina IT Club</strong> dengan satu klik tanpa perlu mengetik ulang sandi.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAdminLogin}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-purple-400 to-cyan-300 hover:from-purple-300 hover:to-cyan-200 shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-slate-950" />
              <span>Buka Portal Admin Guru</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Filtered records
  const filteredRecords = attendanceRecords.filter((rec) => {
    const matchClass = filterClass === 'Semua' || rec.classRoom === filterClass;
    const matchStatus = filterStatus === 'Semua' || rec.status === filterStatus;
    const matchSearch = rec.studentName.toLowerCase().includes(searchStudent.toLowerCase()) ||
                        rec.rfidUid.toLowerCase().includes(searchStudent.toLowerCase());
    return matchClass && matchStatus && matchSearch;
  });

  return (
    <section className="py-14 bg-[#060913] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1.5">
              <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Sistem Presensi Lab Komputer SMP</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Absensi Digital QR Code &amp; RFID</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono font-medium">
                Admin Aktif: {adminUser.name}
              </span>
            </h2>
            <p className="text-slate-400 mt-1.5 text-xs sm:text-sm">
              Mendukung pemindaian kartu RFID fisik (USB Reader) dan kamera QR Code digital untuk presensi otomatis siswa per sesi kegiatan.
            </p>
          </div>

          {/* Action Header: Print Cards & Export */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenPrintCards}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-cyan-300 bg-slate-900 border border-cyan-500/40 hover:bg-slate-800 transition-colors"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Cetak Kartu Siswa (QR + RFID)</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-300 bg-slate-900 border border-emerald-500/40 hover:bg-slate-800 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Ekspor Rekap CSV</span>
            </button>
          </div>
        </div>

        {/* Session Selector Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-[#090e1c] border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="text-xs font-mono text-slate-400">Sesi Kegiatan Presensi Aktif:</div>
              <input
                type="text"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                className="font-bold text-white bg-transparent border-b border-cyan-500/40 focus:border-cyan-400 focus:outline-none text-sm sm:text-base w-full sm:w-[350px]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-mono text-slate-400">Total Hadir:</span>
            <span className="text-base font-extrabold font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-3 py-1 rounded-lg">
              {attendanceRecords.filter(r => r.sessionName === sessionName && r.status === 'HADIR').length} Siswa
            </span>
          </div>
        </div>

        {/* Tab Selection: RFID Reader vs QR Camera vs Records */}
        <div className="mt-6 flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('rfid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'rfid'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4 text-purple-400" />
            <span>Mode Tap Kartu RFID</span>
          </button>

          <button
            onClick={() => setActiveTab('qr')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'qr'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4 text-cyan-400" />
            <span>Mode Pindai QR Code</span>
          </button>

          <button
            onClick={() => setActiveTab('records')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'records'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Daftar Rekap Kehadiran ({attendanceRecords.length})</span>
          </button>
        </div>

        {/* TAB 1: RFID READER */}
        {activeTab === 'rfid' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Input & Reader Simulator */}
            <div className="lg:col-span-6 rounded-2xl bg-[#090e1c] border border-purple-500/30 p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/50 flex items-center justify-center">
                    <Radio className="w-5 h-5 text-purple-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Sensor RFID Reader (13.56 MHz)</h3>
                    <p className="text-xs text-slate-400">Siap menerima tap kartu RFID fisik siswa</p>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  READY
                </span>
              </div>

              {/* Form Input Emulation for USB RFID Scanner */}
              <form onSubmit={handleRfidSubmit} className="mt-5 space-y-3">
                <label className="block text-xs font-medium text-slate-300">
                  Input UID Kartu (Otomatis terisi saat kartu ditempelkan ke reader):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Contoh: RFID-9921-A"
                    value={rfidInput}
                    onChange={(e) => setRfidInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-purple-500/40 text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-purple-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/30 transition-colors"
                  >
                    Simulasikan Tap
                  </button>
                </div>
              </form>

              {/* Scan Message Alert */}
              {scanMessage && (
                <div className={`mt-4 p-3.5 rounded-xl text-xs leading-relaxed flex items-center gap-2.5 ${
                  scanMessage.type === 'success'
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
                }`}>
                  {scanMessage.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                  <span>{scanMessage.text}</span>
                </div>
              )}

              {/* Interactive Student RFID Card Deck */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span>Klik Kartu Siswa di Bawah untuk Simulasi Tap Cepat:</span>
                  <span className="text-purple-300">{students.length} Siswa Terdaftar</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => handleProcessScan(student.rfidUid, 'RFID_CARD')}
                      className="p-3 rounded-xl bg-slate-900/80 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition-all duration-200 group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-800 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-bold text-white group-hover:text-purple-300 truncate">
                            {student.name}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400">
                            Kelas {student.classRoom} · <span className="text-cyan-400">{student.rfidUid}</span>
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60 shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        TAP
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Last Scanned Student Card Preview */}
            <div className="lg:col-span-6 rounded-2xl bg-[#090e1c] border border-cyan-500/30 p-6 shadow-xl flex flex-col justify-between min-h-[460px]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono">
                  <span className="text-slate-400">Status Pemindaian Terakhir:</span>
                  <span className="text-cyan-400">Verifikasi Berhasil</span>
                </div>

                {lastScannedStudent ? (
                  <div className="mt-6 text-center">
                    {/* Student Avatar */}
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 mx-auto shadow-xl shadow-cyan-500/20">
                      <div className="w-full h-full rounded-2xl bg-[#070b14] flex items-center justify-center text-3xl font-bold font-mono text-cyan-300">
                        {lastScannedStudent.student.name.charAt(0)}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-2xl font-extrabold text-white">
                        {lastScannedStudent.student.name}
                      </h4>
                      <p className="text-sm font-semibold text-cyan-300 font-mono mt-0.5">
                        Kelas {lastScannedStudent.student.classRoom} · NISN {lastScannedStudent.student.nisn}
                      </p>
                      <p className="text-xs text-purple-300 mt-1">
                        Peminatan: {lastScannedStudent.student.specialization}
                      </p>
                    </div>

                    {/* Badge Hadir */}
                    <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-sm font-bold shadow-lg shadow-emerald-950/60">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>HADIR · {lastScannedStudent.timestamp}</span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 max-w-sm mx-auto text-left text-xs font-mono">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-slate-500 block">Metode:</span>
                        <span className="text-cyan-300 font-semibold">{lastScannedStudent.method}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-slate-500 block">UID Kartu:</span>
                        <span className="text-purple-300 font-semibold">{lastScannedStudent.student.rfidUid}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center text-slate-500">
                    <Radio className="w-12 h-12 mx-auto mb-3 text-slate-600 opacity-60" />
                    <p className="text-sm">Belum ada kartu siswa yang dipindai pada sesi ini.</p>
                    <p className="text-xs text-slate-600 mt-1">Tempelkan kartu RFID atau klik salah satu kartu siswa di sebelah kiri.</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Audio Scanner: Aktif (Web Audio)</span>
                <span className="text-cyan-400">Siap mencatat</span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: QR CODE SCANNER */}
        {activeTab === 'qr' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Camera View or Simulation */}
            <div className="lg:col-span-7 rounded-2xl bg-[#090e1c] border border-cyan-500/30 p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">Pemindai Kamera QR Code</h3>
                </div>

                <button
                  onClick={() => setIsCameraActive(!isCameraActive)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isCameraActive
                      ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  }`}
                >
                  {isCameraActive ? 'Hentikan Kamera' : 'Nyalakan Kamera Web'}
                </button>
              </div>

              {/* Video or Fallback Frame */}
              <div className="mt-5 relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                {isCameraActive ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    {/* Scanner Target Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-48 h-48 sm:w-56 sm:h-56 border-2 border-cyan-400/80 rounded-2xl relative">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-300"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-300"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-300"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-300"></div>
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse absolute top-1/2"></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 text-slate-500">
                    <QrCode className="w-16 h-16 mx-auto mb-3 text-cyan-400/60" />
                    <p className="text-sm font-semibold text-slate-300">Kamera Standby / Nonaktif</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      Nyalakan kamera atau gunakan tombol simulasi pemindaian QR siswa di bawah.
                    </p>
                  </div>
                )}
              </div>

              {cameraError && (
                <div className="mt-3 p-3 rounded-lg bg-amber-950/60 border border-amber-500/40 text-xs text-amber-300">
                  {cameraError}
                </div>
              )}

              {/* Quick QR Simulation for testing */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-2.5">
                  Simulasikan Pindai QR Siswa dari Kartu ID:
                </span>
                <div className="flex flex-wrap gap-2">
                  {students.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => handleProcessScan(student.qrToken, 'QR_CODE')}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                    >
                      <QrCode className="w-3 h-3 text-cyan-400" />
                      <span>{student.name.split(' ')[0]} ({student.classRoom})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Scan Notification & Guide */}
            <div className="lg:col-span-5 rounded-2xl bg-[#090e1c] border border-cyan-500/30 p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white">Petunjuk Presensi QR Siswa</h3>
              
              <ol className="text-xs text-slate-300 space-y-2.5 list-decimal pl-4">
                <li>Siswa menunjukkan kartu pengenal resmi IT Club yang memiliki cetakan QR Code.</li>
                <li>Arahkan QR Code ke bingkai kamera hingga kode terbaca otomatis.</li>
                <li>Sistem mengeluarkan nada konfirmasi &amp; data kehadiran tersimpan di rekapan.</li>
                <li>Guru dapat mengunduh rekapan absensi berformat CSV kapan saja.</li>
              </ol>

              {lastScannedStudent && (
                <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-emerald-500/40">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Terverifikasi ({lastScannedStudent.timestamp}):</span>
                  </div>
                  <div className="text-sm font-bold text-white">{lastScannedStudent.student.name}</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    Kelas {lastScannedStudent.student.classRoom} · QR Token: {lastScannedStudent.student.qrToken}
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: RECORDS TABLE */}
        {activeTab === 'records' && (
          <div className="mt-6 rounded-2xl bg-[#090e1c] border border-slate-800 p-6 shadow-xl">
            {/* Table Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                {/* Filter Class */}
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
                >
                  <option value="Semua">Semua Kelas</option>
                  <option value="7A">Kelas 7A</option>
                  <option value="7B">Kelas 7B</option>
                  <option value="8A">Kelas 8A</option>
                  <option value="8B">Kelas 8B</option>
                  <option value="8C">Kelas 8C</option>
                  <option value="9A">Kelas 9A</option>
                  <option value="9C">Kelas 9C</option>
                </select>

                {/* Filter Status */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
                >
                  <option value="Semua">Semua Status</option>
                  <option value="HADIR">Hadir</option>
                  <option value="IZIN">Izin</option>
                  <option value="SAKIT">Sakit</option>
                  <option value="ALPA">Alpa</option>
                </select>
              </div>

              {/* Search */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Cari nama siswa / UID kartu..."
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#060913] text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4">Waktu Presensi</th>
                    <th className="py-3 px-4">Nama Siswa</th>
                    <th className="py-3 px-4">Kelas</th>
                    <th className="py-3 px-4">Metode</th>
                    <th className="py-3 px-4">Sesi Kegiatan</th>
                    <th className="py-3 px-4">Status Kehadiran</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {filteredRecords.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap text-slate-300">
                        {new Date(rec.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                        <div className="text-[10px] text-slate-500">
                          {new Date(rec.timestamp).toLocaleDateString('id-ID')}
                        </div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap font-sans font-bold text-white">
                        {rec.studentName}
                        <div className="text-[11px] font-mono text-cyan-400 font-normal">
                          {rec.rfidUid}
                        </div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-purple-300 font-bold">
                        {rec.classRoom}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[11px] bg-slate-900 border border-slate-800 text-slate-300">
                          {rec.method}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-xs font-sans text-slate-300 max-w-[200px] truncate">
                        {rec.sessionName}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <select
                          value={rec.status}
                          onChange={(e) => onUpdateAttendanceStatus(rec.id, e.target.value as AttendanceStatus)}
                          className={`px-2 py-0.5 rounded text-xs font-bold border focus:outline-none ${
                            rec.status === 'HADIR'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                              : rec.status === 'IZIN'
                              ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                              : rec.status === 'SAKIT'
                              ? 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                              : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                          }`}
                        >
                          <option value="HADIR">HADIR</option>
                          <option value="IZIN">IZIN</option>
                          <option value="SAKIT">SAKIT</option>
                          <option value="ALPA">ALPA</option>
                        </select>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => onDeleteAttendance(rec.id)}
                          title="Hapus Rekaman"
                          className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredRecords.length === 0 && (
                <div className="py-12 text-center text-slate-500 text-xs">
                  Tidak ada rekaman kehadiran yang cocok dengan filter yang dipilih.
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
