import React, { useState } from 'react';
import { 
  Lock, 
  X, 
  KeyRound, 
  Mail, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { AdminUser } from '../types';
import { triggerConfetti } from '../utils/audio';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (admin: AdminUser) => void;
  defaultAdmin: AdminUser;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  defaultAdmin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Simple validation: Accept default admin credentials or any school teacher email
    if (
      (email.toLowerCase() === defaultAdmin.email.toLowerCase() || email.includes('@itclub.smp') || email === 'admin') &&
      (password === 'admin123' || password === 'guru123' || password.length >= 4)
    ) {
      triggerConfetti();
      onLoginSuccess(defaultAdmin);
      onClose();
    } else {
      setErrorMsg('Email / NIP atau kata sandi tidak cocok. Gunakan tombol "Isi Kredensial Guru Demo" di bawah.');
    }
  };

  const handleQuickDemoFill = () => {
    setEmail(defaultAdmin.email);
    setPassword('admin123');
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl bg-[#090e1c] border border-purple-500/50 p-6 sm:p-7 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-purple-950/80 border border-purple-500/50 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-900/30">
            <Lock className="w-7 h-7 text-purple-400" />
          </div>

          <h3 className="text-xl font-bold text-white">Portal Masuk Guru &amp; Pembina</h3>
          <p className="text-xs text-slate-400 mt-1">
            Autentikasi pengajar untuk akses Absensi QR/RFID, Manajemen Jadwal &amp; Portofolio.
          </p>
        </div>

        {/* Demo Fast-login helper banner */}
        <div className="mt-5 p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-between gap-3 text-xs">
          <div className="text-purple-200">
            <span className="font-semibold block text-white">Kredensial Pengajar Demo:</span>
            <span className="text-[11px] font-mono text-purple-300">guru@itclub.smp.sch.id / admin123</span>
          </div>
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-purple-700 hover:bg-purple-600 text-white shadow-sm shrink-0 transition-colors"
          >
            Isi Cepat
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Email Guru / NIP
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                required
                placeholder="guru@itclub.smp.sch.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Kata Sandi Portal
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Masuk Portal Admin</span>
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-[11px] text-slate-500">
            Hanya guru resmi &amp; penanggung jawab lab yang memiliki hak akses modifikasi data.
          </p>
        </div>

      </div>
    </div>
  );
};
