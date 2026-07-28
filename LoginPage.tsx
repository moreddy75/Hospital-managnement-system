import React, { useState } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  KeyRound, 
  Building2, 
  Stethoscope, 
  HelpCircle,
  X,
  AlertCircle,
  FileCode2,
  Database
} from 'lucide-react';
import { User, UserRole } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: User, token: string) => void;
}

// Preset Demo Users
export const DEMO_USERS: (User & { passwordHint: string })[] = [
  {
    id: 'user-admin',
    employeeCode: 'EMP-9001',
    name: 'Alexander Wright',
    email: 'admin@carepulse.hospital',
    role: 'ADMIN',
    title: 'Hospital Operations Director',
    department: 'Administration & Executive Board',
    phone: '+1 (555) 019-2831',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    passwordHint: 'admin123'
  },
  {
    id: 'user-doc-1',
    employeeCode: 'DOC-101',
    name: 'Dr. Sarah Jenkins',
    email: 's.jenkins@carepulse.hospital',
    role: 'DOCTOR',
    title: 'Chief Cardiologist',
    department: 'Cardiovascular Sciences',
    phone: '+1 (555) 234-5678',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    passwordHint: 'doctor123'
  },
  {
    id: 'user-nurse-1',
    employeeCode: 'NRS-402',
    name: 'Clara Barton',
    email: 'c.barton@carepulse.hospital',
    role: 'NURSE',
    title: 'Head Nurse - Emergency Unit',
    department: 'Emergency & Critical Care',
    phone: '+1 (555) 321-9876',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813566-82823d5afe4a?w=150&auto=format&fit=crop&q=80',
    passwordHint: 'nurse123'
  },
  {
    id: 'user-rec-1',
    employeeCode: 'REC-204',
    name: 'David Miller',
    email: 'd.miller@carepulse.hospital',
    role: 'RECEPTIONIST',
    title: 'Billing & Intake Specialist',
    department: 'Patient Admissions & Revenue Desk',
    phone: '+1 (555) 654-3210',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    passwordHint: 'reception123'
  }
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('s.jenkins@carepulse.hospital');
  const [password, setPassword] = useState('doctor123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    // Simulate Spring Security JWT auth network latency
    setTimeout(() => {
      const foundUser = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (foundUser || password.length >= 4) {
        const authenticatedUser: User = foundUser || {
          id: `user-custom-${Date.now()}`,
          employeeCode: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
          name: email.split('@')[0].replace('.', ' ').toUpperCase(),
          email: email.trim(),
          role: 'DOCTOR',
          title: 'Senior Clinical Specialist',
          department: 'General Medical Care',
          avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
        };

        const simulatedJwtToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(authenticatedUser))}.${Date.now()}`;
        
        setIsLoading(false);
        onLoginSuccess(authenticatedUser, simulatedJwtToken);
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid employee email or security PIN. Try clicking a Demo Account below.');
      }
    }, 700);
  };

  const handleQuickPresetSelect = (preset: typeof DEMO_USERS[0]) => {
    setEmail(preset.email);
    setPassword(preset.passwordHint);
    setErrorMessage('');
    
    // Auto submit after brief visual feedback
    setIsLoading(true);
    setTimeout(() => {
      const simulatedJwtToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(preset))}.${Date.now()}`;
      setIsLoading(false);
      onLoginSuccess(preset, simulatedJwtToken);
    }, 500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setShowForgotModal(false);
      setResetEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="p-6 flex items-center justify-between border-b border-slate-900 bg-slate-950/60 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-black text-xl sm:text-2xl lg:text-3xl tracking-tight bg-gradient-to-r from-amber-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
              Bharath Reddy Medical Sciences
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 px-2.5 py-0.5 rounded-full font-bold">
                HMS v2.6
              </span>
            </h1>
            <p className="text-xs text-slate-300 font-semibold tracking-wide">CarePulse Hospital Management System</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>HIPAA & ISO 27001 Security Active</span>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          
          {/* Left Column: Hospital Vision & Resume Highlights (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 hidden lg:block">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Enterprise Architecture</span>
            </div>

            <h2 className="text-3xl font-black text-white leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-amber-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent block text-4xl mb-1">
                Bharath Reddy Medical Sciences
              </span>
              Clinical Workflow & EHR System
            </h2>

            <p className="text-sm text-slate-400 leading-relaxed">
              CarePulse HMS connects outpatient clinics, emergency units, diagnostic laboratories, and pharmacy billing into a unified RESTful portal powered by React, Spring Boot 3, and MySQL.
            </p>

            {/* Architecture Highlights for Resume */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Spring Security + JWT Authentication</h3>
                  <p className="text-[11px] text-slate-400">Stateless token verification with encrypted session cookies and password hashing.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Role-Based Access Control (RBAC)</h3>
                  <p className="text-[11px] text-slate-400">Granular permissions for Doctors, Hospital Admins, Emergency Nurses, and Billing Staff.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">MySQL & Spring Data JPA Backend</h3>
                  <p className="text-[11px] text-slate-400">Optimized relational schema with Foreign Key integrity and indexing on Patient MRN.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Login Card & Demo Quick Access (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Login Form Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-cyan-400" />
                    Clinical Staff Sign In
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Enter your hospital employee credentials to access patient records
                  </p>
                </div>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-lg">
                  REST API Online
                </span>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {/* Email / Employee ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Hospital Email / Employee ID *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. s.jenkins@carepulse.hospital"
                      id="login-email-input"
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Security Password / PIN *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs text-cyan-400 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      id="login-password-input"
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-800 text-cyan-600 focus:ring-cyan-500 w-4 h-4"
                    />
                    <span>Remember session on this clinical workstation</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  id="login-submit-btn"
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-600/20 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Clinical Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

              {/* Demo Accounts Presets Section */}
              <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    One-Click Quick Demo Login Presets
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Select Role</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DEMO_USERS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleQuickPresetSelect(preset)}
                      id={`preset-login-${preset.role.toLowerCase()}`}
                      className="p-3 bg-slate-950 hover:bg-slate-800/80 rounded-xl border border-slate-800 hover:border-cyan-500/50 text-left transition-all group flex items-center gap-3"
                    >
                      <img
                        src={preset.avatarUrl}
                        alt={preset.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-700 group-hover:border-cyan-400 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-white truncate group-hover:text-cyan-300">
                            {preset.name}
                          </span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold shrink-0 ${
                            preset.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' :
                            preset.role === 'DOCTOR' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' :
                            preset.role === 'NURSE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                            'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}>
                            {preset.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{preset.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-cyan-400" />
                Reset Hospital Account Password
              </h3>
              <button onClick={() => setShowForgotModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {resetSent ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <p className="font-bold text-white">Password Reset Link Dispatched!</p>
                <p>Check your hospital inbox for instructions or contact IT Service Desk (Ext: 4400).</p>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <p className="text-xs text-slate-400">
                  Enter your registered CarePulse medical email address. We will send a secure token link to reset your account credentials.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hospital Email</label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="doctor@carepulse.hospital"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-xl text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl text-xs"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="p-4 border-t border-slate-900 text-center text-xs text-slate-500 z-10">
        CarePulse Hospital Management System — Bharath Reddy Institute of Medical Sciences • Spring Security JWT Enabled • HIPAA Security Standard
      </footer>

    </div>
  );
};
