import React, { useState } from 'react';
import { 
  Calendar, 
  Search, 
  CalendarPlus, 
  Clock, 
  User, 
  Stethoscope, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  FileEdit, 
  ChevronRight,
  Filter,
  Trash2
} from 'lucide-react';
import { Appointment, Doctor, Patient, AppointmentStatus, Priority, AppointmentType } from '../types';

interface AppointmentManagerProps {
  appointments: Appointment[];
  doctors: Doctor[];
  patients: Patient[];
  onCreateAppointment: (aptData: Partial<Appointment>) => void;
  onUpdateAppointmentStatus: (id: string, status: string, diagnosisNote?: string) => void;
  onCancelAppointment: (id: string) => void;
  onOpenRxForAppointment: (apt: Appointment) => void;
  isOpenBookModal: boolean;
  setIsOpenBookModal: (open: boolean) => void;
}

export const AppointmentManager: React.FC<AppointmentManagerProps> = ({
  appointments,
  doctors,
  patients,
  onCreateAppointment,
  onUpdateAppointmentStatus,
  onCancelAppointment,
  onOpenRxForAppointment,
  isOpenBookModal,
  setIsOpenBookModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Diagnosis Modal
  const [diagnosingAppointment, setDiagnosingAppointment] = useState<Appointment | null>(null);
  const [diagnosisNoteText, setDiagnosisNoteText] = useState('');

  // Form state
  const [formData, setFormData] = useState<{
    patientId: string;
    doctorId: string;
    date: string;
    timeSlot: string;
    type: AppointmentType;
    priority: Priority;
    reasonForVisit: string;
  }>({
    patientId: patients[0]?.id || '',
    doctorId: doctors[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:30 AM',
    type: 'Consultation',
    priority: 'Routine',
    reasonForVisit: 'General health evaluation & consultation',
  });

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.appointmentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.reasonForVisit.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDoc = selectedDoctorId === 'All' || apt.doctorId === selectedDoctorId;
    const matchesStatus = selectedStatus === 'All' || apt.status === selectedStatus;

    return matchesSearch && matchesDoc && matchesStatus;
  });

  const handleOpenBook = () => {
    setFormData({
      patientId: patients[0]?.id || '',
      doctorId: doctors[0]?.id || '',
      date: new Date().toISOString().split('T')[0],
      timeSlot: '10:30 AM',
      type: 'Consultation',
      priority: 'Routine',
      reasonForVisit: 'Routine health checkup',
    });
    setIsOpenBookModal(true);
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientId || !formData.doctorId) return;

    onCreateAppointment(formData);
    setIsOpenBookModal(false);
  };

  const handleCompleteDiagnosis = () => {
    if (!diagnosingAppointment) return;
    onUpdateAppointmentStatus(diagnosingAppointment.id, 'Completed', diagnosisNoteText);
    setDiagnosingAppointment(null);
    setDiagnosisNoteText('');
  };

  return (
    <div className="space-y-6" id="appointment-manager-container">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-cyan-400" />
            Outpatient & Surgery Scheduling
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Book consultations, track clinic queue status, and write post-visit clinical diagnoses.
          </p>
        </div>

        <button
          onClick={handleOpenBook}
          id="book-appointment-modal-btn"
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
        >
          <CalendarPlus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="appt-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Patient, Doctor, or Appt Code..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <select
            id="appt-doctor-filter"
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="All">All Attending Doctors</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</option>
            ))}
          </select>
        </div>

        <div>
          <select
            id="appt-status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="All">All Queue Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.length === 0 ? (
          <div className="py-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400">
            No appointments matched your filter criteria.
          </div>
        ) : (
          filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-start gap-4">
                
                {/* Time & Code Badge */}
                <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center shrink-0 text-center">
                  <span className="text-[10px] font-mono font-bold text-cyan-400">{apt.appointmentCode}</span>
                  <span className="text-xs font-bold text-white mt-0.5">{apt.timeSlot.split(' ')[0]}</span>
                  <span className="text-[9px] text-slate-400 uppercase">{apt.timeSlot.split(' ')[1]}</span>
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white">{apt.patientName}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">Phone: {apt.patientPhone}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      apt.priority === 'Emergency' ? 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse' :
                      apt.priority === 'Urgent' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                      'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {apt.priority}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-md">
                      {apt.type}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    Consulting with <span className="font-semibold text-cyan-300">{apt.doctorName}</span> ({apt.doctorSpecialty})
                  </p>

                  <p className="text-xs text-slate-400 italic">
                    Reason: "{apt.reasonForVisit}"
                  </p>

                  {apt.diagnosisNote && (
                    <div className="text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-800/40 p-2 rounded-lg mt-1">
                      <strong>Diagnosis:</strong> {apt.diagnosisNote}
                    </div>
                  )}
                </div>

              </div>

              {/* Status Badge & Action Buttons */}
              <div className="flex items-center gap-2 justify-end shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                <span className={`text-xs font-bold px-3 py-1 rounded-xl border ${
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
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-xl transition-colors"
                  >
                    Start Visit
                  </button>
                )}

                {apt.status === 'In-Progress' && (
                  <button
                    onClick={() => {
                      setDiagnosingAppointment(apt);
                      setDiagnosisNoteText('');
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Diagnose & Complete</span>
                  </button>
                )}

                {apt.status === 'Completed' && (
                  <button
                    onClick={() => onOpenRxForAppointment(apt)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1 transition-colors"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>Issue Rx Prescription</span>
                  </button>
                )}

                {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                  <button
                    onClick={() => onCancelAppointment(apt.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                    title="Cancel Appointment"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          ))
        )}
      </div>

      {/* Book Appointment Modal */}
      {isOpenBookModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CalendarPlus className="w-5 h-5 text-cyan-400" />
                Schedule New Patient Visit
              </h2>
              <button
                onClick={() => setIsOpenBookModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Patient *</label>
                <select
                  required
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  {patients.map((pat) => (
                    <option key={pat.id} value={pat.id}>
                      {pat.name} (MRN: {pat.mrn})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Attending Specialist *</label>
                <select
                  required
                  value={formData.doctorId}
                  onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} — {doc.specialty} (${doc.consultationFee})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Appointment Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Time Slot</label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:15 AM">11:15 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="04:45 PM">04:45 PM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Visit Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as AppointmentType })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-Up">Follow-Up</option>
                    <option value="General Checkup">General Checkup</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Lab Review">Lab Review</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Triage Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    <option value="Routine">Routine</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Reason for Visit / Symptoms</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g., Blood pressure check, chest pains, follow-up on medication..."
                  value={formData.reasonForVisit}
                  onChange={(e) => setFormData({ ...formData, reasonForVisit: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsOpenBookModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl text-xs shadow-md"
                >
                  Confirm Appointment
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Diagnosis & Complete Visit Modal */}
      {diagnosingAppointment && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Complete Consultation for {diagnosingAppointment.patientName}
              </h3>
              <button onClick={() => setDiagnosingAppointment(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Attending Physician Diagnosis Notes</label>
              <textarea
                rows={4}
                placeholder="Enter final diagnosis findings, advice, and next steps..."
                value={diagnosisNoteText}
                onChange={(e) => setDiagnosisNoteText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setDiagnosingAppointment(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteDiagnosis}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs shadow-md"
              >
                Mark Visit Completed
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
