import React, { useState } from 'react';
import { X, Sparkles, UserCheck, CheckCircle2 } from 'lucide-react';
import { triggerConfetti } from '../utils/audio';

interface JoinClubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinClubModal: React.FC<JoinClubModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [nisn, setNisn] = useState('');
  const [classRoom, setClassRoom] = useState('7A');
  const [interest, setInterest] = useState('Game Dev (Scratch)');
  const [reason, setReason] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    triggerConfetti();
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFullName('');
      setReason('');
      setWhatsapp('');
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#090e1c] border border-cyan-500/40 p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pendaftaran Anggota Baru 2026/2027</span>
          </div>

          <h3 className="text-2xl font-bold text-white">Gabung Ekstrakurikuler IT Club SMP</h3>
          <p className="text-xs text-slate-400 mt-1">
            Isi formulir pendaftaran untuk mendapatkan ID Siswa digital, akses komputer lab, dan modul praktikum.
          </p>
        </div>

        {submitted ? (
          <div className="my-8 p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Pendaftaran Berhasil Dikirim!</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Terima kasih, <strong>{fullName}</strong> ({classRoom}). Data kamu telah tersimpan. Silakan temui Guru Pembina di Lab Komputer 1 pada jam istirahat untuk pengambilan Kartu RFID &amp; QR resmi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Nama Lengkap Siswa
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Muhammad Kevin"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Kelas</label>
                <select
                  value={classRoom}
                  onChange={(e) => setClassRoom(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="7A">Kelas 7A</option>
                  <option value="7B">Kelas 7B</option>
                  <option value="7C">Kelas 7C</option>
                  <option value="8A">Kelas 8A</option>
                  <option value="8B">Kelas 8B</option>
                  <option value="8C">Kelas 8C</option>
                  <option value="9A">Kelas 9A</option>
                  <option value="9B">Kelas 9B</option>
                  <option value="9C">Kelas 9C</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">NISN (10 Digit)</label>
                <input
                  type="text"
                  required
                  placeholder="00987123xx"
                  value={nisn}
                  onChange={(e) => setNisn(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Peminatan Bidang Unggulan
              </label>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Game Dev (Scratch)">Game Dev (Scratch 3.0 &amp; Logika Animasi)</option>
                <option value="Pemrograman C#">Pemrograman C# .NET &amp; Algoritma</option>
                <option value="Web & Jaringan">Web Development (HTML, CSS, JS) &amp; Jaringan LAN</option>
                <option value="Desain Grafis">Desain Grafis &amp; UI/UX Figma</option>
                <option value="Robotika">Robotika &amp; IoT Arduino Uno</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Nomor WhatsApp Siswa / Orang Tua (Untuk Info Kegiatan)
              </label>
              <input
                type="tel"
                required
                placeholder="0812xxxxxxxx"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Alasan / Harapan Mengikuti IT Club
              </label>
              <textarea
                rows={3}
                placeholder="Saya ingin belajar membuat game sendiri dan memahami cara kerja komputer..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-md shadow-cyan-500/20 flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-slate-950" />
                <span>Kirim Formulir Pendaftaran</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
