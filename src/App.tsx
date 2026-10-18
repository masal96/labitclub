import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LabShowcase } from './components/LabShowcase';
import { ActivitiesSection } from './components/ActivitiesSection';
import { LearningSection } from './components/LearningSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ScheduleSection } from './components/ScheduleSection';
import { AttendanceSection } from './components/AttendanceSection';
import { AdminLoginModal } from './components/AdminLoginModal';
import { JoinClubModal } from './components/JoinClubModal';
import { PrintIdCardsModal } from './components/PrintIdCardsModal';
import { HostingGuideModal } from './components/HostingGuideModal';
import { Footer } from './components/Footer';

import { 
  INITIAL_STUDENTS, 
  INITIAL_MODULES, 
  INITIAL_ACTIVITIES, 
  INITIAL_PORTFOLIO, 
  INITIAL_SCHEDULE, 
  INITIAL_ATTENDANCE,
  INITIAL_ADMIN
} from './data/initialData';
import { 
  Activity, 
  AdminUser, 
  AttendanceRecord, 
  AttendanceStatus, 
  PortfolioProject, 
  ScheduleItem, 
  Student 
} from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('beranda');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  // Admin Auth State
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('itclub_admin');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // App Data State (with localStorage fallback for demo persistence)
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('itclub_students');
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    try {
      const saved = localStorage.getItem('itclub_activities');
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  });

  const [modules] = useState(INITIAL_MODULES);

  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    try {
      const saved = localStorage.getItem('itclub_portfolio');
      return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
    } catch {
      return INITIAL_PORTFOLIO;
    }
  });

  const [scheduleList, setScheduleList] = useState<ScheduleItem[]>(() => {
    try {
      const saved = localStorage.getItem('itclub_schedule');
      return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
    } catch {
      return INITIAL_SCHEDULE;
    }
  });

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem('itclub_attendance');
      return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
    } catch {
      return INITIAL_ATTENDANCE;
    }
  });

  // Modals
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isJoinClubOpen, setIsJoinClubOpen] = useState(false);
  const [isPrintCardsOpen, setIsPrintCardsOpen] = useState(false);
  const [isHostingGuideOpen, setIsHostingGuideOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem('itclub_admin', JSON.stringify(adminUser));
      } else {
        localStorage.removeItem('itclub_admin');
      }
    } catch {
      // Ignore
    }
  }, [adminUser]);

  useEffect(() => {
    try {
      localStorage.setItem('itclub_portfolio', JSON.stringify(projects));
    } catch {}
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('itclub_schedule', JSON.stringify(scheduleList));
    } catch {}
  }, [scheduleList]);

  useEffect(() => {
    try {
      localStorage.setItem('itclub_attendance', JSON.stringify(attendanceRecords));
    } catch {}
  }, [attendanceRecords]);

  useEffect(() => {
    try {
      localStorage.setItem('itclub_activities', JSON.stringify(activities));
    } catch {}
  }, [activities]);

  // Handlers
  const handleLoginSuccess = (admin: AdminUser) => {
    setAdminUser(admin);
    // If they were trying to access Absensi, bring them straight there!
    if (currentTab === 'absensi' || !currentTab) {
      setCurrentTab('absensi');
    }
  };

  const handleLogout = () => {
    setAdminUser(null);
    if (currentTab === 'absensi') {
      setCurrentTab('beranda');
    }
  };

  // Activity Handlers
  const handleAddActivity = (newAct: Activity) => {
    setActivities([newAct, ...activities]);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  // Portfolio Handlers
  const handleAddProject = (newProj: PortfolioProject) => {
    setProjects([newProj, ...projects]);
  };

  const handleUpdateProject = (updated: PortfolioProject) => {
    setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // Schedule Handlers
  const handleAddSchedule = (newItem: ScheduleItem) => {
    setScheduleList([...scheduleList, newItem]);
  };

  const handleUpdateSchedule = (updated: ScheduleItem) => {
    setScheduleList(scheduleList.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleDeleteSchedule = (id: string) => {
    setScheduleList(scheduleList.filter((s) => s.id !== id));
  };

  // Attendance Handlers
  const handleAddAttendance = (record: AttendanceRecord) => {
    setAttendanceRecords([record, ...attendanceRecords]);
  };

  const handleUpdateAttendanceStatus = (id: string, newStatus: AttendanceStatus) => {
    setAttendanceRecords(
      attendanceRecords.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleDeleteAttendance = (id: string) => {
    setAttendanceRecords(attendanceRecords.filter((r) => r.id !== id));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#060913] text-slate-100' : 'bg-slate-900 text-slate-100'}`}>
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        adminUser={adminUser}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onLogoutAdmin={handleLogout}
        onOpenJoinClub={() => setIsJoinClubOpen(true)}
        onOpenHostingGuide={() => setIsHostingGuideOpen(true)}
      />

      {/* Main Tab Content */}
      <main>
        {currentTab === 'beranda' && (
          <>
            <HeroSection
              onExplorePortfolio={() => setCurrentTab('portofolio')}
              onExploreModules={() => setCurrentTab('pembelajaran')}
              onOpenJoinClub={() => setIsJoinClubOpen(true)}
              onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
              isAdmin={!!adminUser}
            />
            <LabShowcase
              onExploreModules={() => setCurrentTab('pembelajaran')}
              onExploreActivities={() => setCurrentTab('kegiatan')}
              onOpenJoinClub={() => setIsJoinClubOpen(true)}
            />
          </>
        )}

        {currentTab === 'kegiatan' && (
          <ActivitiesSection
            activities={activities}
            onAddActivity={handleAddActivity}
            onDeleteActivity={handleDeleteActivity}
            isAdmin={!!adminUser}
          />
        )}

        {currentTab === 'pembelajaran' && (
          <LearningSection modules={modules} />
        )}

        {currentTab === 'portofolio' && (
          <PortfolioSection
            projects={projects}
            onAddProject={handleAddProject}
            onUpdateProject={handleUpdateProject}
            onDeleteProject={handleDeleteProject}
            isAdmin={!!adminUser}
          />
        )}

        {currentTab === 'jadwal' && (
          <ScheduleSection
            scheduleList={scheduleList}
            onAddSchedule={handleAddSchedule}
            onUpdateSchedule={handleUpdateSchedule}
            onDeleteSchedule={handleDeleteSchedule}
            isAdmin={!!adminUser}
          />
        )}

        {currentTab === 'absensi' && (
          <AttendanceSection
            students={students}
            attendanceRecords={attendanceRecords}
            onAddAttendance={handleAddAttendance}
            onUpdateAttendanceStatus={handleUpdateAttendanceStatus}
            onDeleteAttendance={handleDeleteAttendance}
            adminUser={adminUser}
            onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
            onOpenPrintCards={() => setIsPrintCardsOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavClick={(tab) => setCurrentTab(tab)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenHostingGuide={() => setIsHostingGuideOpen(true)}
        isAdmin={!!adminUser}
      />

      {/* Modals */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        defaultAdmin={INITIAL_ADMIN}
      />

      <JoinClubModal
        isOpen={isJoinClubOpen}
        onClose={() => setIsJoinClubOpen(false)}
      />

      <PrintIdCardsModal
        students={students}
        isOpen={isPrintCardsOpen}
        onClose={() => setIsPrintCardsOpen(false)}
      />

      <HostingGuideModal
        isOpen={isHostingGuideOpen}
        onClose={() => setIsHostingGuideOpen(false)}
        sharedUrl={typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-5pdcocpg76rg5dwbwj533q-106339134669.asia-northeast1.run.app'}
      />

    </div>
  );
}
