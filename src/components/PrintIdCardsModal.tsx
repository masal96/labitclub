import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Printer, Download, CreditCard, Sparkles, Code2 } from 'lucide-react';
import { Student } from '../types';

interface PrintIdCardsModalProps {
  students: Student[];
  isOpen: boolean;
  onClose: () => void;
}

export const PrintIdCardsModal: React.FC<PrintIdCardsModalProps> = ({
  students,
  isOpen,
  onClose,
}) => {
  const [qrImages, setQrImages] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen) return;

    const generateQrs = async () => {
      const images: Record<string, string> = {};
      for (const s of students) {
        try {
          const url = await QRCode.toDataURL(s.qrToken, {
            width: 160,
            margin: 1,
            color: {
              dark: '#0f172a',
              light: '#ffffff',
            },
          });
          images[s.id] = url;
        } catch (err) {
          console.error(err);
        }
      }
      setQrImages(images);
    };

    generateQrs();
  }, [isOpen, students]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#090e1c] border border-cyan-500/40 p-5 sm:p-7 shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-cyan-400" />
              <span>Cetak Kartu Siswa IT Club (QR Code &amp; Chip RFID)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Kartu identitas resmi siswa SMP untuk absensi otomatis di Laboratorium Komputer.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Kartu Sekarang</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card Grid Ready for Print */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[65vh] overflow-y-auto p-1 print:overflow-visible">
          {students.map((student) => (
            <div
              key={student.id}
              className="relative rounded-2xl bg-gradient-to-br from-[#0c1427] via-[#091020] to-[#0d162d] border border-cyan-500/40 p-5 shadow-xl text-slate-100 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle top decorative ribbon */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-teal-300"></div>

              {/* School & Club Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-400 text-slate-950 flex items-center justify-center font-black text-xs">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-wider text-white">IT CLUB SMP</div>
                    <div className="text-[9px] font-mono text-cyan-400">&lt;LabKomputer/&gt;</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60 font-semibold">
                    KARTU ANGGOTA
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="py-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 font-mono">Nama Siswa:</div>
                  <div className="text-base font-extrabold text-white leading-tight">
                    {student.name}
                  </div>
                  
                  <div className="text-xs text-slate-300 mt-1">
                    Kelas: <strong className="text-cyan-300">{student.classRoom}</strong> · NISN: <strong className="text-slate-200">{student.nisn}</strong>
                  </div>

                  <div className="text-[11px] text-purple-300 mt-1 font-mono">
                    Minat: {student.specialization}
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                      RFID: {student.rfidUid}
                    </span>
                  </div>
                </div>

                {/* QR Code */}
                <div className="w-24 h-24 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-md">
                  {qrImages[student.id] ? (
                    <img
                      src={qrImages[student.id]}
                      alt={`QR Code ${student.name}`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 animate-pulse rounded"></div>
                  )}
                </div>
              </div>

              {/* Footer chip */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>T.A. 2026/2027</span>
                <span className="text-emerald-400">Verifikasi Resmi Lab</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
