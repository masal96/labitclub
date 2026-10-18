import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Plus, 
  Trash2, 
  Edit3, 
  Printer, 
  Sparkles,
  Layers
} from 'lucide-react';
import { ScheduleItem } from '../types';

interface ScheduleSectionProps {
  scheduleList: ScheduleItem[];
  onAddSchedule: (item: ScheduleItem) => void;
  onUpdateSchedule: (item: ScheduleItem) => void;
  onDeleteSchedule: (id: string) => void;
  isAdmin: boolean;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  scheduleList,
  onAddSchedule,
  onUpdateSchedule,
  onDeleteSchedule,
  isAdmin,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Semua');
  const [selectedRoom, setSelectedRoom] = useState<string>('Semua');

  // Edit / Add Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);

  // Form states
  const [formDay, setFormDay] = useState<ScheduleItem['day']>('Senin');
  const [formTime, setFormTime] = useState('13.30 - 15.00 WIB');
  const [formActivity, setFormActivity] = useState('');
  const [formTarget, setFormTarget] = useState('Anggota Pemula Kls 7');
  const [formMentor, setFormMentor] = useState('Bpk. Hendra Wijaya, S.Kom.');
  const [formRoom, setFormRoom] = useState<ScheduleItem['labRoom']>('Lab Komputer 1 (Multimedia)');
  const [formCapacity, setFormCapacity] = useState('36 Siswa / 36 PC');
  const [formStatus, setFormStatus] = useState<ScheduleItem['status']>('Aktif');

  const days = ['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const rooms = ['Semua', 'Lab Komputer 1 (Multimedia)', 'Lab Komputer 2 (Coding & Robotika)'];

  const filteredSchedule = scheduleList.filter((item) => {
    const matchesDay = selectedDay === 'Semua' || item.day === selectedDay;
    const matchesRoom = selectedRoom === 'Semua' || item.labRoom === selectedRoom;
    return matchesDay && matchesRoom;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormDay('Senin');
    setFormTime('13.30 - 15.00 WIB');
    setFormActivity('');
    setFormTarget('Anggota Pemula Kls 7');
    setFormMentor('Bpk. Hendra Wijaya, S.Kom.');
    setFormRoom('Lab Komputer 1 (Multimedia)');
    setFormCapacity('36 Siswa / 36 PC');
    setFormStatus('Aktif');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ScheduleItem) => {
    setEditingItem(item);
    setFormDay(item.day);
    setFormTime(item.time);
    setFormActivity(item.activityName);
    setFormTarget(item.targetGroup);
    setFormMentor(item.mentor);
    setFormRoom(item.labRoom);
    setFormCapacity(item.capacity);
    setFormStatus(item.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formActivity) return;

    if (editingItem) {
      const updated: ScheduleItem = {
        ...editingItem,
        day: formDay,
        time: formTime,
        activityName: formActivity,
        targetGroup: formTarget,
        mentor: formMentor,
        labRoom: formRoom,
        capacity: formCapacity,
        status: formStatus,
      };
      onUpdateSchedule(updated);
    } else {
      const created: ScheduleItem = {
        id: `sch-${Date.now()}`,
        day: formDay,
        time: formTime,
        activityName: formActivity,
        targetGroup: formTarget,
        mentor: formMentor,
        labRoom: formRoom,
        capacity: formCapacity,
        status: formStatus,
      };
      onAddSchedule(created);
    }

    setIsModalOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-16 bg-[#070b14] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Manajemen Pemakaian Ruang Lab &amp; Ekstrakurikuler</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Jadwal Praktikum &amp; Kegiatan IT Club
            </h2>
            <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
              Alokasi waktu sesi ekstrakurikuler coding, robotika, dan pemakaian komputer di Lab 1 &amp; Lab 2 SMP.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Jadwal</span>
            </button>

            {isAdmin && (
              <button
                onClick={handleOpenAdd}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-md shadow-cyan-500/20 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Jadwal (Guru)</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Day Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            {days.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedDay === d
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Room Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">Ruang:</span>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              {rooms.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Schedule Table / Card List */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-[#090e1c] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-[#060913]/90 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-4 sm:px-6">Hari &amp; Waktu</th>
                  <th className="py-4 px-4 sm:px-6">Kegiatan / Materi</th>
                  <th className="py-4 px-4 sm:px-6">Ruang Lab</th>
                  <th className="py-4 px-4 sm:px-6">Sasaran Peserta</th>
                  <th className="py-4 px-4 sm:px-6">Pembina / Mentor</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Status / Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredSchedule.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        {item.day}
                      </div>
                      <div className="text-xs font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {item.time}
                      </div>
                    </td>

                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {item.activityName}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Kapasitas: <span className="font-mono">{item.capacity}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-medium text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{item.labRoom}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-800/40">
                        {item.targetGroup}
                      </span>
                    </td>

                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <User className="w-3.5 h-3.5 text-teal-400" />
                        <span>{item.mentor}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                          {item.status}
                        </span>

                        {isAdmin && (
                          <div className="flex items-center gap-1 ml-2">
                            <button
                              onClick={() => handleOpenEdit(item)}
                              title="Edit Jadwal"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteSchedule(item.id)}
                              title="Hapus Jadwal"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modal Tambah / Edit Jadwal (Admin) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#090e1c] border border-cyan-500/50 p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>{editingItem ? 'Edit Jadwal Praktikum' : 'Tambah Jadwal Baru'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Kelola sesi penggunaan Lab Komputer &amp; jadwal IT Club mingguan.</p>

            <form onSubmit={handleSave} className="mt-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Hari</label>
                  <select
                    value={formDay}
                    onChange={(e) => setFormDay(e.target.value as ScheduleItem['day'])}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jumat</option>
                    <option value="Sabtu">Sabtu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Waktu Pelaksanaan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 13.30 - 15.00 WIB"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Kegiatan / Materi</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pelatihan Scratch Game Dev Kls 7"
                  value={formActivity}
                  onChange={(e) => setFormActivity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Ruang Laboratorium</label>
                <select
                  value={formRoom}
                  onChange={(e) => setFormRoom(e.target.value as ScheduleItem['labRoom'])}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Lab Komputer 1 (Multimedia)">Lab Komputer 1 (Multimedia)</option>
                  <option value="Lab Komputer 2 (Coding & Robotika)">Lab Komputer 2 (Coding & Robotika)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Peserta</label>
                  <input
                    type="text"
                    placeholder="Contoh: Anggota Pemula (Kls 7)"
                    value={formTarget}
                    onChange={(e) => setFormTarget(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Kapasitas Kursi</label>
                  <input
                    type="text"
                    placeholder="Contoh: 36 Siswa / 36 PC"
                    value={formCapacity}
                    onChange={(e) => setFormCapacity(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Guru Pembina / Mentor</label>
                <input
                  type="text"
                  placeholder="Nama Pembina / Mentor"
                  value={formMentor}
                  onChange={(e) => setFormMentor(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200"
                >
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
