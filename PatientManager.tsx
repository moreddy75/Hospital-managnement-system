import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  FileText, 
  Phone, 
  Heart, 
  AlertCircle, 
  Edit3, 
  Trash2, 
  X, 
  ShieldAlert, 
  Stethoscope, 
  CheckCircle2,
  Calendar,
  Activity,
  Bed
} from 'lucide-react';
import { Patient, Gender, BloodGroup, PatientStatus, Doctor } from '../types';

interface PatientManagerProps {
  patients: Patient[];
  doctors: Doctor[];
  onCreatePatient: (patData: Partial<Patient> & { initialDiagnosis?: string }) => void;
  onUpdatePatient: (id: string, patData: Partial<Patient>) => void;
  onDeletePatient: (id: string) => void;
  isOpenRegisterModal: boolean;
  setIsOpenRegisterModal: (open: boolean) => void;
}

export const PatientManager: React.FC<PatientManagerProps> = ({
  patients,
  doctors,
  onCreatePatient,
  onUpdatePatient,
  onDeletePatient,
  isOpenRegisterModal,
  setIsOpenRegisterModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  
  // Selected Patient for Medical History Drawer
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null);

  // Edit Patient state
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    age: number;
    gender: Gender;
    bloodGroup: BloodGroup;
    phone: string;
    email: string;
    address: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    primaryDoctorId: string;
    status: PatientStatus;
    roomNumber: string;
    allergies: string;
    initialDiagnosis: string;
  }>({
    name: '',
    age: 32,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '',
    email: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    primaryDoctorId: doctors[0]?.id || '',
    status: 'Outpatient',
    roomNumber: '',
    allergies: 'None',
    initialDiagnosis: 'Routine clinical consultation',
  });

  const filteredPatients = patients.filter((pat) => {
    const matchesSearch =
      pat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pat.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pat.phone.includes(searchTerm) ||
      pat.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || pat.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleOpenRegister = () => {
    setFormData({
      name: '',
      age: 28,
      gender: 'Female',
      bloodGroup: 'O+',
      phone: '+1 (555) ' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000),
      email: '',
      address: '452 Medical Parkway',
      emergencyContactName: 'Family Member',
      emergencyContactPhone: '+1 (555) 999-8888',
      primaryDoctorId: doctors[0]?.id || '',
      status: 'Outpatient',
      roomNumber: '',
      allergies: 'None',
      initialDiagnosis: 'General clinical checkup',
    });
    setEditingPatient(null);
    setIsOpenRegisterModal(true);
  };

  const handleOpenEdit = (pat: Patient) => {
    setEditingPatient(pat);
    setFormData({
      name: pat.name,
      age: pat.age,
      gender: pat.gender,
      bloodGroup: pat.bloodGroup,
      phone: pat.phone,
      email: pat.email,
      address: pat.address,
      emergencyContactName: pat.emergencyContactName,
      emergencyContactPhone: pat.emergencyContactPhone,
      primaryDoctorId: pat.primaryDoctorId || '',
      status: pat.status,
      roomNumber: pat.roomNumber || '',
      allergies: pat.allergies?.join(', ') || '',
      initialDiagnosis: '',
    });
    setIsOpenRegisterModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const doc = doctors.find(d => d.id === formData.primaryDoctorId);

    if (editingPatient) {
      onUpdatePatient(editingPatient.id, {
        name: formData.name,
        age: Number(formData.age),
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,
        primaryDoctorId: doc?.id,
        primaryDoctorName: doc?.name,
        status: formData.status,
        roomNumber: formData.roomNumber,
        allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : [],
      });
    } else {
      onCreatePatient({
        name: formData.name,
        age: Number(formData.age),
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,
        primaryDoctorId: doc?.id,
        primaryDoctorName: doc?.name,
        status: formData.status,
        roomNumber: formData.roomNumber,
        allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : [],
        initialDiagnosis: formData.initialDiagnosis,
      });
    }

    setIsOpenRegisterModal(false);
  };

  return (
    <div className="space-y-6" id="patient-manager-container">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            Electronic Health Records (EMR) & Patient Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search medical record numbers (MRN), manage admissions, view clinical history, and discharge patients.
          </p>
        </div>

        <button
          onClick={handleOpenRegister}
          id="register-patient-modal-btn"
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Search & Status Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="patient-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Patient Name, MRN (e.g., PAT-2026-001), Phone or Blood Group..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <select
            id="patient-status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="All">All Admission Statuses</option>
            <option value="Admitted">Admitted</option>
            <option value="Outpatient">Outpatient</option>
            <option value="Under Observation">Under Observation</option>
            <option value="Critical">Critical (ER)</option>
            <option value="Discharged">Discharged</option>
          </select>
        </div>
      </div>

      {/* Patient Table / List */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Medical Record # (MRN)</th>
                <th className="p-4">Patient Name & Demographics</th>
                <th className="p-4">Blood Group</th>
                <th className="p-4">Primary Physician</th>
                <th className="p-4">Admission Status</th>
                <th className="p-4">Contact</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No patients found matching your query.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((pat) => (
                  <tr key={pat.id} className="hover:bg-slate-800/50 transition-colors group">
                    
                    {/* MRN */}
                    <td className="p-4 font-mono font-bold text-cyan-400">
                      {pat.mrn}
                    </td>

                    {/* Demographics */}
                    <td className="p-4">
                      <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {pat.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {pat.age} Yrs • {pat.gender} {pat.roomNumber && `• Room: ${pat.roomNumber}`}
                      </div>
                    </td>

                    {/* Blood Group */}
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 font-bold text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded-md text-xs">
                        <Heart className="w-3 h-3 fill-red-400" />
                        {pat.bloodGroup}
                      </span>
                    </td>

                    {/* Doctor */}
                    <td className="p-4 text-slate-300 font-medium">
                      {pat.primaryDoctorName || 'Duty Doctor'}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                        pat.status === 'Critical' ? 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse' :
                        pat.status === 'Admitted' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' :
                        pat.status === 'Under Observation' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                        pat.status === 'Discharged' ? 'bg-slate-800 text-slate-400 border-slate-700' :
                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}>
                        {pat.status}
                      </span>
                    </td>

                    {/* Contact */}
                    <td className="p-4 text-xs text-slate-400">
                      <div>{pat.phone}</div>
                      <div className="text-[10px] text-slate-400 italic">Emerg: {pat.emergencyContactName}</div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewingPatient(pat)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 rounded-lg font-medium text-xs flex items-center gap-1 transition-colors"
                          title="View Medical History"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>History</span>
                        </button>

                        <button
                          onClick={() => handleOpenEdit(pat)}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Edit Patient Info"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onDeletePatient(pat.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Discharge / Archive Patient"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Medical History Drawer / Modal */}
      {viewingPatient && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">{viewingPatient.name}</h2>
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded-md">
                    {viewingPatient.mrn}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {viewingPatient.age} Yrs • {viewingPatient.gender} • Blood Group: <span className="text-red-400 font-bold">{viewingPatient.bloodGroup}</span>
                </p>
              </div>

              <button
                onClick={() => setViewingPatient(null)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Patient Metadata Box */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400">Primary Doctor:</span>
                <p className="font-semibold text-white mt-0.5">{viewingPatient.primaryDoctorName || 'Duty Physician'}</p>
              </div>
              <div>
                <span className="text-slate-400">Emergency Contact:</span>
                <p className="font-semibold text-white mt-0.5">{viewingPatient.emergencyContactName}</p>
                <p className="text-[10px] text-slate-400">{viewingPatient.emergencyContactPhone}</p>
              </div>
              <div>
                <span className="text-slate-400">Known Allergies:</span>
                <p className="font-semibold text-amber-400 mt-0.5">
                  {viewingPatient.allergies?.length ? viewingPatient.allergies.join(', ') : 'No known drug allergies'}
                </p>
              </div>
            </div>

            {/* Clinical Medical Records Timeline */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Clinical Encounters & Diagnosis Timeline
              </h3>

              {viewingPatient.medicalRecords?.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No prior diagnosis records logged.</p>
              ) : (
                <div className="space-y-3 border-l-2 border-cyan-500/30 pl-4 ml-1">
                  {viewingPatient.medicalRecords?.map((rec) => (
                    <div key={rec.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-cyan-300">{rec.diagnosis}</span>
                        <span className="text-slate-400 font-mono">{rec.date}</span>
                      </div>
                      <p className="text-xs text-slate-300">{rec.notes}</p>
                      <div className="text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 p-2 rounded-lg mt-2">
                        <strong>Treatment Plan:</strong> {rec.treatment}
                      </div>
                      <div className="text-[10px] text-slate-400 text-right pt-1">
                        Attending: {rec.doctorName} ({rec.doctorSpecialty})
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setViewingPatient(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-700"
              >
                Close Medical File
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Register / Edit Patient Modal */}
      {isOpenRegisterModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-scaleUp my-8">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-cyan-400" />
                {editingPatient ? 'Edit Patient Record' : 'Patient Registration & EMR Intake'}
              </h2>
              <button
                onClick={() => setIsOpenRegisterModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Patient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Jonathan Miller"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Age</label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value as BloodGroup })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Admission Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as PatientStatus })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    <option value="Outpatient">Outpatient</option>
                    <option value="Admitted">Admitted</option>
                    <option value="Under Observation">Under Observation</option>
                    <option value="Critical">Critical (ER)</option>
                    <option value="Discharged">Discharged</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Doctor</label>
                  <select
                    value={formData.primaryDoctorId}
                    onChange={(e) => setFormData({ ...formData, primaryDoctorId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Room / Ward Bed</label>
                  <input
                    type="text"
                    placeholder="e.g., Ward 2A - Bed 8"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Emergency Contact Name</label>
                  <input
                    type="text"
                    placeholder="Relative Name"
                    value={formData.emergencyContactName}
                    onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Emergency Phone</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 999-0000"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {!editingPatient && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Initial Chief Complaint / Diagnosis</label>
                  <textarea
                    rows={2}
                    placeholder="e.g., High fever, persistent cough, chest heaviness..."
                    value={formData.initialDiagnosis}
                    onChange={(e) => setFormData({ ...formData, initialDiagnosis: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsOpenRegisterModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl text-xs shadow-md"
                >
                  {editingPatient ? 'Save Patient Record' : 'Complete Intake'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
