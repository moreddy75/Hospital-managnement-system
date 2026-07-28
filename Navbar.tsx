import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  AlertTriangle, 
  UserPlus, 
  CalendarPlus, 
  LogOut, 
  ShieldCheck, 
  User as UserIcon,
  X
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenNewPatient: () => void;
  onOpenBookAppointment: () => void;
  onOpenNewDoctor: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  emergencyAlertCount: number;
  currentUser: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenNewPatient,
  onOpenBookAppointment,
  setActiveTab,
  emergencyAlertCount,
  currentUser,
  onLogout,
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Hospital Branding */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          id="navbar-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2.5">
              <span className="font-black text-lg sm:text-xl lg:text-2xl tracking-tight bg-gradient-to-r from-amber-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
                Bharath Reddy Medical Sciences
              </span>
              <span className="text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-700/80 px-2.5 py-0.5 rounded-full shrink-0 shadow-inner">
                HMS v2.6
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-300/90 tracking-wide">CarePulse Hospital Management System</p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="global-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Patients (MRN), Doctors, or Appointments..."
            className="w-full pl-9 pr-4 py-1.5 text-xs lg:text-sm bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Action Shortcuts & User Profile / Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Emergency Alert Indicator */}
          {emergencyAlertCount > 0 && (
            <button
              onClick={() => setActiveTab('patients')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
              title="View Emergency Patients"
              id="emergency-alert-btn"
            >
              <AlertTriangle className="w-4 h-4 animate-bounce text-red-400" />
              <span className="hidden lg:inline">ER Critical</span>
              <span className="bg-red-500 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                {emergencyAlertCount}
              </span>
            </button>
          )}

          {/* Quick Add Patient Button */}
          <button
            onClick={onOpenNewPatient}
            id="quick-add-patient-btn"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
          >
            <UserPlus className="w-4 h-4 text-cyan-400" />
            <span className="hidden lg:inline">Reg. Patient</span>
          </button>

          {/* Quick Book Appointment Button */}
          <button
            onClick={onOpenBookAppointment}
            id="quick-book-appt-btn"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-lg shadow-md transition-all active:scale-95"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Book Appt</span>
          </button>

          {/* Logged-In User Profile Badge & Logout Button */}
          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="flex items-center gap-2 bg-slate-950 p-1 pr-3 rounded-xl border border-slate-800">
                <img
                  src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover border border-slate-700 shrink-0"
                />
                <div className="hidden lg:block text-left min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white truncate max-w-[110px]">
                      {currentUser.name}
                    </span>
                    <span className={`text-[9px] font-mono px-1 py-0.2 rounded font-bold shrink-0 ${
                      currentUser.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' :
                      currentUser.role === 'DOCTOR' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' :
                      currentUser.role === 'NURSE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {currentUser.role}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate max-w-[130px]">{currentUser.title}</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                id="logout-btn"
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl border border-slate-800 hover:border-red-500/30 transition-all flex items-center gap-1 text-xs font-semibold"
                title="Sign Out of Clinical Portal"
              >
                <LogOut className="w-4 h-4 text-red-400" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <LogOut className="w-4 h-4 text-red-400" />
                Confirm Sign Out
              </h3>
              <button onClick={() => setShowLogoutConfirm(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to log out of <strong>CarePulse HMS</strong>? Unsaved clinical notes or draft prescriptions will be safely preserved.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="px-3.5 py-1.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                id="confirm-logout-btn"
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Yes, Sign Out Now
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};

