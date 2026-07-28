import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { DoctorManager } from './components/DoctorManager';
import { PatientManager } from './components/PatientManager';
import { AppointmentManager } from './components/AppointmentManager';
import { PrescriptionWriter } from './components/PrescriptionWriter';
import { BillingManager } from './components/BillingManager';
import { SpringBootCodeViewer } from './components/SpringBootCodeViewer';
import { LoginPage, DEMO_USERS } from './components/LoginPage';
import { apiService } from './services/api';
import { 
  Doctor, 
  Patient, 
  Appointment, 
  Prescription, 
  Invoice, 
  DashboardStats, 
  SpringBootFile,
  User 
} from './types';
import { initialStats, springBootCodeFiles } from './mockData';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('carepulse_user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Failed reading user session:', e);
    }
    // Default logged-in user for instant interactive preview
    return DEMO_USERS[1]; // Dr. Sarah Jenkins (Chief Cardiologist)
  });

  // App Data State
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [codeFiles, setCodeFiles] = useState<SpringBootFile[]>(springBootCodeFiles);

  // Modals state
  const [isOpenNewPatientModal, setIsOpenNewPatientModal] = useState(false);
  const [isOpenBookApptModal, setIsOpenBookApptModal] = useState(false);
  const [isOpenNewDoctorModal, setIsOpenNewDoctorModal] = useState(false);
  const [presetAppointmentForRx, setPresetAppointmentForRx] = useState<Appointment | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Auth Handlers
  const handleLoginSuccess = (user: User, token: string) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('carepulse_user', JSON.stringify(user));
      localStorage.setItem('carepulse_jwt_token', token);
    } catch (e) {
      console.error('Failed saving session:', e);
    }
    showToast(`Welcome, ${user.name} (${user.role} Portal)`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('carepulse_user');
      localStorage.removeItem('carepulse_jwt_token');
    } catch (e) {
      console.error('Failed clearing session:', e);
    }
    showToast('Signed out of CarePulse HMS session', 'success');
  };

  // Fetch initial data from REST API backend
  const loadData = async () => {
    try {
      const [docsData, patsData, apptsData, rxsData, invsData, statsData, springCode] = await Promise.all([
        apiService.getDoctors(),
        apiService.getPatients(),
        apiService.getAppointments(),
        apiService.getPrescriptions(),
        apiService.getInvoices(),
        apiService.getStats(),
        apiService.getSpringBootCode(),
      ]);

      if (docsData) setDoctors(docsData);
      if (patsData) setPatients(patsData);
      if (apptsData) setAppointments(apptsData);
      if (rxsData) setPrescriptions(rxsData);
      if (invsData) setInvoices(invsData);
      if (statsData) setStats(statsData);
      if (springCode) setCodeFiles(springCode);
    } catch (err) {
      console.error('Failed loading data from server:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handler: Doctor Operations
  const handleCreateDoctor = async (docData: Partial<Doctor>) => {
    try {
      const newDoc = await apiService.createDoctor(docData);
      if (newDoc) {
        setDoctors((prev) => [newDoc, ...prev]);
        showToast(`Registered Dr. ${newDoc.name} (${newDoc.specialty})`);
        loadData();
      }
    } catch (err) {
      showToast('Failed to add doctor', 'error');
    }
  };

  const handleUpdateDoctor = async (id: string, docData: Partial<Doctor>) => {
    try {
      const updated = await apiService.updateDoctor(id, docData);
      setDoctors((prev) => prev.map((d) => (d.id === id ? { ...d, ...updated } : d)));
      showToast('Doctor profile updated');
    } catch (err) {
      showToast('Failed to update doctor', 'error');
    }
  };

  const handleDeleteDoctor = async (id: string) => {
    try {
      await apiService.deleteDoctor(id);
      setDoctors((prev) => prev.filter((d) => d.id !== id));
      showToast('Doctor removed from directory');
    } catch (err) {
      showToast('Failed to delete doctor', 'error');
    }
  };

  // Handler: Patient Operations
  const handleCreatePatient = async (patData: Partial<Patient> & { initialDiagnosis?: string }) => {
    try {
      const newPat = await apiService.createPatient(patData);
      if (newPat) {
        setPatients((prev) => [newPat, ...prev]);
        showToast(`Patient Registered: ${newPat.name} (MRN: ${newPat.mrn})`);
        loadData();
      }
    } catch (err) {
      showToast('Failed to register patient', 'error');
    }
  };

  const handleUpdatePatient = async (id: string, patData: Partial<Patient>) => {
    try {
      const updated = await apiService.updatePatient(id, patData);
      setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
      showToast('Patient medical record updated');
    } catch (err) {
      showToast('Failed to update patient', 'error');
    }
  };

  const handleDeletePatient = async (id: string) => {
    try {
      await apiService.deletePatient(id);
      setPatients((prev) => prev.filter((p) => p.id !== id));
      showToast('Patient record archived / discharged');
    } catch (err) {
      showToast('Failed to archive patient', 'error');
    }
  };

  // Handler: Appointment Operations
  const handleCreateAppointment = async (aptData: Partial<Appointment>) => {
    try {
      const newApt = await apiService.createAppointment(aptData);
      if (newApt) {
        setAppointments((prev) => [newApt, ...prev]);
        showToast(`Appointment Booked: Code ${newApt.appointmentCode}`);
        loadData();
      }
    } catch (err) {
      showToast('Failed to book appointment', 'error');
    }
  };

  const handleUpdateAppointmentStatus = async (id: string, status: string, diagnosisNote?: string) => {
    try {
      const updated = await apiService.updateAppointmentStatus(id, status, diagnosisNote);
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, ...updated, status: status as any, diagnosisNote } : a)));
      showToast(`Appointment status changed to ${status}`);
      loadData();
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleCancelAppointment = async (id: string) => {
    try {
      await apiService.cancelAppointment(id);
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a)));
      showToast('Appointment cancelled');
    } catch (err) {
      showToast('Failed to cancel appointment', 'error');
    }
  };

  // Handler: Prescription Operations
  const handleCreatePrescription = async (rxData: Partial<Prescription>) => {
    try {
      const newRx = await apiService.createPrescription(rxData);
      if (newRx) {
        setPrescriptions((prev) => [newRx, ...prev]);
        showToast(`Prescription ${newRx.prescriptionCode} issued to ${newRx.patientName}`);
        loadData();
      }
    } catch (err) {
      showToast('Failed to issue prescription', 'error');
    }
  };

  const handleOpenRxForAppointment = (apt: Appointment) => {
    setPresetAppointmentForRx(apt);
    setActiveTab('prescriptions');
  };

  // Handler: Billing Operations
  const handleCreateInvoice = async (invData: Partial<Invoice>) => {
    try {
      const newInv = await apiService.createInvoice(invData);
      if (newInv) {
        setInvoices((prev) => [newInv, ...prev]);
        showToast(`Invoice ${newInv.invoiceCode} generated ($${newInv.totalAmount})`);
        loadData();
      }
    } catch (err) {
      showToast('Failed to generate invoice', 'error');
    }
  };

  const handlePayInvoice = async (id: string, method: string) => {
    try {
      const updated = await apiService.payInvoice(id, method);
      setInvoices((prev) => prev.map((i) => (i.id === id ? { ...i, paymentStatus: 'Paid', paymentMethod: method as any } : i)));
      showToast('Payment received & invoice settled!');
      loadData();
    } catch (err) {
      showToast('Failed to record payment', 'error');
    }
  };

  if (!currentUser) {
    return (
      <>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-white shadow-2xl animate-bounce">
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span className="text-xs font-semibold">{toastMessage.text}</span>
            <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenNewPatient={() => setIsOpenNewPatientModal(true)}
        onOpenBookAppointment={() => setIsOpenBookApptModal(true)}
        onOpenNewDoctor={() => setIsOpenNewDoctorModal(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        emergencyAlertCount={stats.emergencyAlertsCount}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Body with Sidebar + Workspace */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto px-2 sm:px-4 lg:px-6 py-4 gap-4">
        
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          doctorCount={doctors.length}
          patientCount={patients.length}
          appointmentCount={appointments.length}
          pendingInvoiceCount={invoices.filter((i) => i.paymentStatus === 'Pending' || i.paymentStatus === 'Overdue').length}
        />

        {/* Content View Switcher */}
        <main className="flex-1 min-w-0 bg-slate-950">
          
          {activeTab === 'dashboard' && (
            <Dashboard
              stats={stats}
              appointments={appointments}
              doctors={doctors}
              patients={patients}
              onOpenNewPatient={() => setIsOpenNewPatientModal(true)}
              onOpenBookAppointment={() => setIsOpenBookApptModal(true)}
              onOpenNewDoctor={() => setIsOpenNewDoctorModal(true)}
              onSelectTab={setActiveTab}
              onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            />
          )}

          {activeTab === 'doctors' && (
            <DoctorManager
              doctors={doctors}
              onCreateDoctor={handleCreateDoctor}
              onUpdateDoctor={handleUpdateDoctor}
              onDeleteDoctor={handleDeleteDoctor}
              isOpenAddModal={isOpenNewDoctorModal}
              setIsOpenAddModal={setIsOpenNewDoctorModal}
            />
          )}

          {activeTab === 'patients' && (
            <PatientManager
              patients={patients}
              doctors={doctors}
              onCreatePatient={handleCreatePatient}
              onUpdatePatient={handleUpdatePatient}
              onDeletePatient={handleDeletePatient}
              isOpenRegisterModal={isOpenNewPatientModal}
              setIsOpenRegisterModal={setIsOpenNewPatientModal}
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentManager
              appointments={appointments}
              doctors={doctors}
              patients={patients}
              onCreateAppointment={handleCreateAppointment}
              onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
              onCancelAppointment={handleCancelAppointment}
              onOpenRxForAppointment={handleOpenRxForAppointment}
              isOpenBookModal={isOpenBookApptModal}
              setIsOpenBookModal={setIsOpenBookApptModal}
            />
          )}

          {activeTab === 'prescriptions' && (
            <PrescriptionWriter
              prescriptions={prescriptions}
              doctors={doctors}
              patients={patients}
              onCreatePrescription={handleCreatePrescription}
              presetAppointment={presetAppointmentForRx}
            />
          )}

          {activeTab === 'billing' && (
            <BillingManager
              invoices={invoices}
              patients={patients}
              doctors={doctors}
              onCreateInvoice={handleCreateInvoice}
              onPayInvoice={handlePayInvoice}
            />
          )}

          {activeTab === 'springboot' && (
            <SpringBootCodeViewer codeFiles={codeFiles} />
          )}

        </main>

      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-white shadow-2xl animate-bounce">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span className="text-xs font-semibold">{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-400">
        Bharath Reddy Medical Sciences — CarePulse Hospital Management System • Real-World Full-Stack Architecture (React + Express + Java Spring Boot REST API + MySQL)
      </footer>

    </div>
  );
}
