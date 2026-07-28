import React from 'react';
import { 
  Users, 
  Stethoscope, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Activity, 
  TrendingUp, 
  UserPlus, 
  CalendarPlus, 
  FilePlus, 
  Code2,
  ChevronRight,
  BedDouble
} from 'lucide-react';
import { DashboardStats, Appointment, Doctor, Patient } from '../types';

interface DashboardProps {
  stats: DashboardStats;
  appointments: Appointment[];
  doctors: Doctor[];
  patients: Patient[];
  onOpenNewPatient: () => void;
  onOpenBookAppointment: () => void;
  onOpenNewDoctor: () => void;
  onSelectTab: (tab: string) => void;
  onUpdateAppointmentStatus: (id: string, status: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  appointments,
  doctors,
  patients,
  onOpenNewPatient,
  onOpenBookAppointment,
  onOpenNewDoctor,
  onSelectTab,
  onUpdateAppointmentStatus,
}) => {
  const todayAppointments = appointments.slice(0, 5);
  const criticalPatients = patients.filter(p => p.status === 'Critical' || p.status === 'Under Observation' || p.status === 'Admitted');

  return (
    <div className="space-y-6 animate-fadeIn" id="dashboard-container">
      
      {/* Welcome & Quick Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            Hospital Command Center
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time multi-specialty clinical operations, patient flow & Spring Boot API integration.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenNewPatient}
            id="dash-add-patient-btn"
            className="flex items-center gap-1.5 px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>New Patient</span>
          </button>

          <button
            onClick={onOpenBookAppointment}
            id="dash-book-appt-btn"
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Book Appt</span>
          </button>

          <button
            onClick={onOpenNewDoctor}
            id="dash-add-doc-btn"
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium rounded-xl transition-all"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Add Doctor</span>
          </button>

          <button
            onClick={() => onSelectTab('springboot')}
            id="dash-view-code-btn"
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-semibold rounded-xl transition-all"
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>Java Backend</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Patients */}
        <div 
          onClick={() => onSelectTab('patients')}
          className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
          id="kpi-patients"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Patients</span>
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">{stats.totalPatients}</span>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +{stats.todayPatientsCount} today
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Active EMR & OPD Records</p>
        </div>

        {/* Active Doctors */}
        <div 
          onClick={() => onSelectTab('doctors')}
          className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
          id="kpi-doctors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Medical Staff</span>
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Stethoscope className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">{stats.totalDoctors}</span>
            <span className="text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
              {stats.availableDoctorsCount} Available
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">On Duty & Surgery Shifts</p>
        </div>

        {/* Today's Appointments */}
        <div 
          onClick={() => onSelectTab('appointments')}
          className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
          id="kpi-appointments"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Today's Appointments</span>
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">{stats.todayAppointmentsCount}</span>
            <span className="text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
              {stats.pendingAppointmentsCount} Scheduled
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">{stats.completedAppointmentsCount} Completed today</p>
        </div>

        {/* Total Revenue */}
        <div 
          onClick={() => onSelectTab('billing')}
          className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
          id="kpi-revenue"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Collections</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</span>
            <span className="text-xs font-medium text-slate-400">
              {stats.pendingBillsCount} Unpaid
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Consultation, Lab & Pharmacy</p>
        </div>

      </div>

      {/* Main Grid: Today's Schedule + Department Occupancy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Schedule Timeline (2 Columns) */}
        <div className="lg:col-span-2 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Live Appointment Queue
              </h2>
              <p className="text-xs text-slate-400">Active consultations and incoming patient visits</p>
            </div>
            <button
              onClick={() => onSelectTab('appointments')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              View All ({appointments.length})
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {todayAppointments.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No appointments scheduled for today.</p>
            ) : (
              todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase">{apt.timeSlot.split(' ')[1] || 'AM'}</span>
                      <span className="text-xs font-semibold text-white">{apt.timeSlot.split(' ')[0]}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-white">{apt.patientName}</span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                          {apt.appointmentCode}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          apt.priority === 'Emergency' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          apt.priority === 'Urgent' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                          'bg-slate-800 text-slate-300 border-slate-700'
                        }`}>
                          {apt.priority}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mt-1">
                        Doctor: <span className="text-slate-200 font-medium">{apt.doctorName}</span> ({apt.doctorSpecialty})
                      </p>
                      <p className="text-xs text-slate-400 italic mt-0.5">"{apt.reasonForVisit}"</p>
                    </div>
                  </div>

                  {/* Status & Quick Action Button */}
                  <div className="flex items-center gap-2 justify-end shrink-0">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${
                      apt.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      apt.status === 'In-Progress' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 animate-pulse' :
                      apt.status === 'Cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                      'bg-slate-800 text-amber-300 border-slate-700'
                    }`}>
                      {apt.status}
                    </span>

                    {apt.status === 'Scheduled' && (
                      <button
                        onClick={() => onUpdateAppointmentStatus(apt.id, 'In-Progress')}
                        className="text-xs px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors"
                      >
                        Start
                      </button>
                    )}
                    {apt.status === 'In-Progress' && (
                      <button
                        onClick={() => onUpdateAppointmentStatus(apt.id, 'Completed')}
                        className="text-xs px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Department Occupancy & ER Alerts (1 Column) */}
        <div className="space-y-6">
          
          {/* Department Capacity */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-cyan-400" />
                Department Inpatient Load
              </h2>
            </div>

            <div className="space-y-3">
              {stats.departmentOccupancy.map((dept) => {
                const pct = Math.round((dept.patientCount / dept.capacity) * 100);
                return (
                  <div key={dept.department} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{dept.department}</span>
                      <span className="text-slate-400 font-mono">
                        {dept.patientCount}/{dept.capacity} beds ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          pct >= 90 ? 'bg-red-500' : pct >= 75 ? 'bg-amber-500' : 'bg-cyan-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Critical Patients Quick Alert Widget */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Admitted & Emergency Patients
              </h3>
              <button 
                onClick={() => onSelectTab('patients')}
                className="text-[11px] text-cyan-400 hover:underline"
              >
                View Registry
              </button>
            </div>

            <div className="space-y-2">
              {criticalPatients.slice(0, 3).map((pat) => (
                <div key={pat.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">{pat.name}</span>
                    <p className="text-[11px] text-slate-400">MRN: {pat.mrn} • {pat.roomNumber || 'ER Ward'}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    pat.status === 'Critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}>
                    {pat.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Doctor Availability Grid */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-cyan-400" />
              On-Duty Medical Specialists
            </h2>
            <p className="text-xs text-slate-400">Active status, suite location, and consultation fees</p>
          </div>
          <button
            onClick={() => onSelectTab('doctors')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
          >
            Manage Doctor Roster ({doctors.length})
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {doctors.slice(0, 6).map((doc) => (
            <div key={doc.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <img
                src={doc.avatarUrl}
                alt={doc.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white truncate">{doc.name}</h4>
                <p className="text-[11px] text-cyan-400 font-medium truncate">{doc.specialty}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    doc.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                    doc.status === 'In Consultation' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' :
                    doc.status === 'In Surgery' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {doc.status}
                  </span>
                  <span className="text-[10px] text-slate-400">${doc.consultationFee}/visit</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
