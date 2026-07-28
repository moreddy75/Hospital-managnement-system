import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Stethoscope, 
  Phone, 
  Mail, 
  Clock, 
  Building2, 
  DollarSign, 
  Edit3, 
  Trash2, 
  Check, 
  X,
  Star,
  UserCheck
} from 'lucide-react';
import { Doctor, Specialty, DoctorStatus } from '../types';

interface DoctorManagerProps {
  doctors: Doctor[];
  onCreateDoctor: (docData: Partial<Doctor>) => void;
  onUpdateDoctor: (id: string, docData: Partial<Doctor>) => void;
  onDeleteDoctor: (id: string) => void;
  isOpenAddModal: boolean;
  setIsOpenAddModal: (open: boolean) => void;
}

const specialtiesList: Specialty[] = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'General Medicine',
  'Oncology',
  'Dermatology',
  'Radiology',
  'Emergency Medicine',
  'Gynaecology'
];

export const DoctorManager: React.FC<DoctorManagerProps> = ({
  doctors,
  onCreateDoctor,
  onUpdateDoctor,
  onDeleteDoctor,
  isOpenAddModal,
  setIsOpenAddModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Edit Doctor Modal State
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Partial<Doctor>>({
    name: '',
    specialty: 'General Medicine',
    department: 'Internal Medicine',
    qualification: 'MBBS, MD',
    experienceYears: 5,
    phone: '',
    email: '',
    consultationFee: 120,
    roomNumber: 'Suite 101',
    availableHours: '09:00 AM - 02:00 PM',
    status: 'Available',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80',
  });

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.doctorCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    const matchesStatus = selectedStatus === 'All' || doc.status === selectedStatus;

    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      specialty: 'General Medicine',
      department: 'Internal Medicine',
      qualification: 'MBBS, MD',
      experienceYears: 6,
      phone: '+1 (555) ' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000),
      email: '',
      consultationFee: 120,
      roomNumber: 'Suite ' + Math.floor(100 + Math.random() * 400),
      availableHours: '09:00 AM - 02:00 PM',
      status: 'Available',
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
    });
    setEditingDoctor(null);
    setIsOpenAddModal(true);
  };

  const handleOpenEdit = (doc: Doctor) => {
    setEditingDoctor(doc);
    setFormData({ ...doc });
    setIsOpenAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.specialty) return;

    if (editingDoctor) {
      onUpdateDoctor(editingDoctor.id, formData);
    } else {
      onCreateDoctor(formData);
    }
    setIsOpenAddModal(false);
  };

  return (
    <div className="space-y-6" id="doctor-manager-container">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-cyan-400" />
            Doctors & Specialists Roster
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage physician credentials, consultation fees, duty status, and clinic room assignments.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          id="add-doctor-modal-btn"
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="doctor-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name, Code, Specialty..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Filter by Specialty */}
        <div>
          <select
            id="doctor-specialty-filter"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="All">All Specialties</option>
            {specialtiesList.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        {/* Filter by Status */}
        <div>
          <select
            id="doctor-status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="In Consultation">In Consultation</option>
            <option value="In Surgery">In Surgery</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDoctors.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400 space-y-2">
            <Stethoscope className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-medium text-slate-300">No doctors match your search or filter.</p>
            <p className="text-xs text-slate-400">Try adjusting your specialty or search query.</p>
          </div>
        ) : (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-5 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group shadow-sm"
            >
              <div>
                {/* Top header with code & status */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/80 px-2 py-0.5 rounded-md">
                    {doc.doctorCode}
                  </span>

                  {/* Status Selector Switcher */}
                  <select
                    value={doc.status}
                    onChange={(e) => onUpdateDoctor(doc.id, { status: e.target.value as DoctorStatus })}
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border cursor-pointer focus:outline-none ${
                      doc.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      doc.status === 'In Consultation' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' :
                      doc.status === 'In Surgery' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                      'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <option value="Available" className="bg-slate-900 text-emerald-400">Available</option>
                    <option value="In Consultation" className="bg-slate-900 text-cyan-400">In Consultation</option>
                    <option value="In Surgery" className="bg-slate-900 text-purple-400">In Surgery</option>
                    <option value="On Leave" className="bg-slate-900 text-slate-400">On Leave</option>
                  </select>
                </div>

                {/* Doctor Avatar & Info */}
                <div className="flex items-start gap-3 mt-3">
                  <img
                    src={doc.avatarUrl}
                    alt={doc.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-medium text-cyan-400">{doc.specialty}</p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{doc.qualification}</p>
                  </div>
                </div>

                {/* Details list */}
                <div className="mt-4 space-y-2 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doc.roomNumber} ({doc.department})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doc.availableHours}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800/80 text-[11px]">
                    <span>Exp: <strong className="text-white font-medium">{doc.experienceYears} Years</strong></span>
                    <span>Fee: <strong className="text-emerald-400 font-medium">${doc.consultationFee}</strong></span>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <a
                  href={`tel:${doc.phone}`}
                  className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[110px]">{doc.phone}</span>
                </a>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(doc)}
                    className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                    title="Edit Doctor Profile"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteDoctor(doc.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                    title="Remove Doctor"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Doctor Modal */}
      {isOpenAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-scaleUp my-8">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-cyan-400" />
                {editingDoctor ? 'Edit Doctor Profile' : 'Register New Doctor'}
              </h2>
              <button
                onClick={() => setIsOpenAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Doctor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Dr. Alexander Wright"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Specialty *</label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value as Specialty })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    {specialtiesList.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
                  <input
                    type="text"
                    placeholder="e.g., Cardiovascular Sciences"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Qualification</label>
                  <input
                    type="text"
                    placeholder="e.g., MD, DM, FRCS"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Consultation Fee ($)</label>
                  <input
                    type="number"
                    min="50"
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({ ...formData, consultationFee: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Room / Suite Number</label>
                  <input
                    type="text"
                    placeholder="e.g., Suite 302 (Block A)"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Duty Hours</label>
                  <input
                    type="text"
                    placeholder="09:00 AM - 02:00 PM"
                    value={formData.availableHours}
                    onChange={(e) => setFormData({ ...formData, availableHours: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsOpenAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl text-xs shadow-md"
                >
                  {editingDoctor ? 'Save Changes' : 'Register Doctor'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
