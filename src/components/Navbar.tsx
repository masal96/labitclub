import React, { useState } from 'react';
import { 
  Code2, 
  Moon, 
  Sun, 
  Lock, 
  UserCheck, 
  Menu, 
  X, 
  Sparkles, 
  Calendar, 
  FolderKanban, 
  BookOpen, 
  Flame, 
  LogOut,
  QrCode,
  Globe
} from 'lucide-react';
import { AdminUser } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  adminUser: AdminUser | null;
  onOpenAdminLogin: () => void;
  onLogoutAdmin: () => void;
  onOpenJoinClub: () => void;
  onOpenHostingGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  isDarkMode,
  setIsDarkMode,
  adminUser,
  onOpenAdminLogin,
  onLogoutAdmin,
  onOpenJoinClub,
  onOpenHostingGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Sparkles },
    { id: 'kegiatan', label: 'Kegiatan', icon: Flame },
    { id: 'pembelajaran', label: 'Pembelajaran', icon: BookOpen },
    { id: 'portofolio', label: 'Portofolio', icon: FolderKanban },
    { id: 'jadwal', label: 'Jadwal', icon: Calendar },
    { 
      id: 'absensi', 
      label: 'Absensi QR & RFID', 
      icon: QrCode, 
      isTeacherOnly: true 
    },
  ];

  const handleNavClick = (itemId: string, isTeacherOnly?: boolean) => {
    if (isTeacherOnly && !adminUser) {
      onOpenAdminLogin();
      return;
    }
    setCurrentTab(itemId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060913]/90 border-b border-cyan-900/30 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Sisi Kiri: Logo IT CLUB & <LabKomputer/> */}
          <button 
            onClick={() => setCurrentTab('beranda')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-400/40 transition-all duration-300 transform group-hover:scale-105 border border-cyan-300/40">
              <Code2 className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-extrabold tracking-wider text-xl text-white font-sans">
                IT CLUB
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">SMP</span>
              </div>
              <div className="font-mono text-xs text-cyan-400 tracking-tight font-medium">
                &lt;LabKomputer/&gt;
              </div>
            </div>
          </button>

          {/* Navigasi Utama (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.isTeacherOnly)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.isTeacherOnly && !adminUser && (
                    <span className="flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      <Lock className="w-2.5 h-2.5" /> Guru
                    </span>
                  )}
                  {item.isTeacherOnly && adminUser && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sisi Kanan: Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Status Online & Custom Domain Info */}
            <button
              onClick={onOpenHostingGuide}
              title="Informasi Hosting & Domain Sekolah"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/40 transition-colors shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xl:inline">Domain &amp; Hosting</span>
            </button>

            {/* Toggle Mode Gelap / Terang */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors"
              aria-label="Toggle Mode Gelap/Terang"
            >
              {isDarkMode ? <Moon className="w-4 h-4 text-cyan-300" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Tombol Portal Admin */}
            {adminUser ? (
              <div className="flex items-center gap-2 bg-purple-950/40 border border-purple-500/50 rounded-xl px-3 py-1.5 shadow-lg shadow-purple-950/40">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-200">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="truncate max-w-[130px] font-semibold">{adminUser.name.split(' ')[0]} (Guru)</span>
                </div>
                <button
                  onClick={onLogoutAdmin}
                  title="Keluar dari Portal Admin"
                  className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="relative group px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-purple-200 bg-purple-950/40 border border-purple-500/60 hover:border-purple-400 shadow-[0_0_15px_-3px_rgba(168,85,247,0.4)] hover:shadow-[0_0_20px_-2px_rgba(168,85,247,0.6)] transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
              >
                <Lock className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Portal Admin</span>
              </button>
            )}

            {/* Tombol Aksi Utama: Gabung Club */}
            <button
              onClick={onOpenJoinClub}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-[0_0_20px_-3px_rgba(6,182,212,0.6)] hover:shadow-[0_0_25px_-2px_rgba(6,182,212,0.8)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 whitespace-nowrap"
            >
              <UserCheck className="w-4 h-4 text-slate-950" />
              <span>Gabung Club</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              {isDarkMode ? <Moon className="w-4 h-4 text-cyan-300" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-cyan-800/40 text-cyan-400 hover:bg-slate-800"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 border-b border-cyan-900/40 bg-[#060913]/98 backdrop-blur-2xl space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.isTeacherOnly)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium ${
                  currentTab === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.label}</span>
                </div>
                {item.isTeacherOnly && !adminUser && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Khusus Guru
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {adminUser ? (
              <div className="flex items-center justify-between p-3 rounded-lg bg-purple-950/40 border border-purple-500/40">
                <span className="text-xs text-purple-200 font-mono">Halo, {adminUser.name}</span>
                <button
                  onClick={onLogoutAdmin}
                  className="text-xs text-rose-300 font-semibold hover:underline"
                >
                  Keluar Admin
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="w-full py-2.5 rounded-lg text-sm font-medium text-purple-300 bg-purple-950/50 border border-purple-500/50 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-purple-400" />
                Portal Admin Guru
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHostingGuide();
              }}
              className="w-full py-2.5 rounded-lg text-xs font-mono font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Info Hosting &amp; Domain Sekolah (.sch.id)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinClub();
              }}
              className="w-full py-2.5 rounded-lg text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              Gabung IT Club 2026/2027
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
