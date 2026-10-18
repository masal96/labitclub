import React, { useState } from 'react';
import { 
  Flame, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Users, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Search,
  Sparkles
} from 'lucide-react';
import { Activity } from '../types';
import { triggerConfetti } from '../utils/audio';

interface ActivitiesSectionProps {
  activities: Activity[];
  onAddActivity?: (activity: Activity) => void;
  onDeleteActivity?: (id: string) => void;
  isAdmin: boolean;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  activities,
  onAddActivity,
  onDeleteActivity,
  isAdmin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [registeredSuccess, setRegisteredSuccess] = useState<string | null>(null);
  
  // Registration Form State for student
  const [regName, setRegName] = useState('');
  const [regClass, setRegClass] = useState('');
  const [regNisn, setRegNisn] = useState('');

  // Admin Add Activity State
  const [isAddingModal, setIsAddingModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Activity['category']>('Workshop');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newLocation, setNewLocation] = useState('Lab Komputer 1 (Multimedia)');
  const [newSpeaker, setNewSpeaker] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newMaxSlots, setNewMaxSlots] = useState(30);

  const categories = ['Semua', 'Workshop', 'Lomba', 'Sesi Rutin', 'Proyek Terbuka'];

  const filteredActivities = activities.filter((act) => {
    const matchesCat = selectedCategory === 'Semua' || act.category === selectedCategory;
    const matchesSearch = act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          act.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivity || !regName || !regClass) return;
    setRegisteredSuccess(`Selamat ${regName} (${regClass}), pendaftaran untuk "${selectedActivity.title}" berhasil dicatat!`);
    triggerConfetti();
    setTimeout(() => {
      setSelectedActivity(null);
      setRegisteredSuccess(null);
      setRegName('');
      setRegClass('');
      setRegNisn('');
    }, 2500);
  };

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDate || !onAddActivity) return;
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      date: newDate,
      time: newTime || '14.00 - 15.30 WIB',
      location: newLocation,
      speaker: newSpeaker || 'Guru Pembina IT Club',
      description: newDesc || 'Kegiatan praktikum dan pembelajaran IT Club.',
      maxSlots: Number(newMaxSlots) || 30,
      registeredCount: 0,
      status: 'Pendaftaran Dibuka',
      tags: [newCategory, 'Lab Komputer']
    };
    onAddActivity(newAct);
    setIsAddingModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <section className="py-16 bg-[#060913] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <Flame className="w-4 h-4 text-cyan-400" />
              <span>Agenda &amp; Pelatihan IT Club SMP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Kegiatan &amp; Workshop Terjadwal
            </h2>
            <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
              Rangkaian aktivitas interaktif pengembangan bakat digital siswa SMP: dari workshop game Scratch, pelatihan C#, hingga perakitan kabel jaringan dan robotika.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsAddingModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-md shadow-cyan-500/20 whitespace-nowrap self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Kegiatan Baru (Guru)</span>
            </button>
          )}
        </div>

        {/* Filter Bar & Search */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Cari nama kegiatan / lab..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Activities Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredActivities.map((act) => {
            const slotPercent = Math.min(100, Math.round((act.registeredCount / act.maxSlots) * 100));
            const isFull = act.registeredCount >= act.maxSlots;

            return (
              <div
                key={act.id}
                className="group relative rounded-2xl bg-[#090e1c] border border-slate-800/80 hover:border-cyan-500/40 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/40 flex flex-col justify-between"
              >
                <div>
                  {/* Category and Status */}
                  <div className="flex items-center justify-between gap-2 text-xs font-mono mb-3">
                    <span className="text-cyan-400 font-semibold uppercase">{act.category}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${
                        act.status === 'Pendaftaran Dibuka'
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                          : act.status === 'Segera Dimulai'
                          ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {act.status}
                      </span>
                      {isAdmin && onDeleteActivity && (
                        <button
                          onClick={() => onDeleteActivity(act.id)}
                          title="Hapus Kegiatan"
                          className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {act.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {act.description}
                  </p>

                  {/* Metadata Chips: Date, Time, Location, Speaker */}
                  <div className="mt-5 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{act.date}</span>
                      <span className="text-slate-600">·</span>
                      <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{act.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                      <span className="font-medium text-slate-200">{act.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Pembina / Pemateri: <strong className="text-slate-200">{act.speaker}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Bottom Card: Quota & Action */}
                <div className="mt-6 pt-5 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Kuota Peserta</span>
                    </div>
                    <span className="font-mono font-semibold text-slate-200">
                      {act.registeredCount} / {act.maxSlots} Kursi PC ({slotPercent}%)
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull ? 'bg-amber-500' : 'bg-gradient-to-r from-cyan-500 to-teal-400'
                      }`}
                      style={{ width: `${slotPercent}%` }}
                    />
                  </div>

                  <button
                    onClick={() => setSelectedActivity(act)}
                    disabled={isFull}
                    className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                      isFull
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 shadow-sm'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>{isFull ? 'Kuota Penuh' : 'Daftar Sesi Ini'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal Pendaftaran Kegiatan Siswa */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#090e1c] border border-cyan-500/40 p-6 sm:p-7 shadow-2xl">
            <h3 className="text-xl font-bold text-white">Daftar Kegiatan IT Club</h3>
            <p className="text-xs text-cyan-300 mt-1 font-mono">{selectedActivity.title}</p>
            <p className="text-xs text-slate-400 mt-0.5">{selectedActivity.date} · {selectedActivity.location}</p>

            {registeredSuccess ? (
              <div className="mt-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs leading-relaxed flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <span>{registeredSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="mt-5 space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nama Lengkap Siswa</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Raditya Pratama"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Kelas</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 8A / 7B"
                      value={regClass}
                      onChange={(e) => setRegClass(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">NISN (Opsional)</label>
                    <input
                      type="text"
                      placeholder="009871xxxx"
                      value={regNisn}
                      onChange={(e) => setRegNisn(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedActivity(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200"
                  >
                    Konfirmasi Registrasi
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Admin Modal Tambah Kegiatan */}
      {isAddingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#090e1c] border border-cyan-500/50 p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Tambah Kegiatan Baru (Portal Guru)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Buat jadwal workshop atau sesi club baru untuk siswa SMP.</p>

            <form onSubmit={handleCreateActivity} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Judul Kegiatan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Workshop Pembuatan Game Scratch"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Kategori</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as Activity['category'])}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Lomba">Lomba</option>
                    <option value="Sesi Rutin">Sesi Rutin</option>
                    <option value="Proyek Terbuka">Proyek Terbuka</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Lokasi Lab</label>
                  <select
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Lab Komputer 1 (Multimedia)">Lab Komputer 1 (Multimedia)</option>
                    <option value="Lab Komputer 2 (Coding & Robotika)">Lab Komputer 2 (Coding & Robotika)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Tanggal</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 30 Oktober 2026"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Waktu</label>
                  <input
                    type="text"
                    placeholder="13.30 - 15.30 WIB"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Pemateri / Guru</label>
                  <input
                    type="text"
                    placeholder="Nama Pembina / Mentor"
                    value={newSpeaker}
                    onChange={(e) => setNewSpeaker(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Kapasitas Kursi PC</label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    value={newMaxSlots}
                    onChange={(e) => setNewMaxSlots(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan tujuan dan materi yang akan dipelajari..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddingModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200"
                >
                  Simpan Kegiatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
