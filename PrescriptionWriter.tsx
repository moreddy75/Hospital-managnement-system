import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Printer, 
  Stethoscope, 
  User, 
  Pill, 
  Calendar, 
  X,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Prescription, Medication, Doctor, Patient, Appointment } from '../types';

interface PrescriptionWriterProps {
  prescriptions: Prescription[];
  doctors: Doctor[];
  patients: Patient[];
  onCreatePrescription: (rxData: Partial<Prescription>) => void;
  presetAppointment?: Appointment | null;
}

export const PrescriptionWriter: React.FC<PrescriptionWriterProps> = ({
  prescriptions,
  doctors,
  patients,
  onCreatePrescription,
  presetAppointment,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedRxToPrint, setSelectedRxToPrint] = useState<Prescription | null>(null);

  // Form State
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    presetAppointment?.patientId || patients[0]?.id || ''
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    presetAppointment?.doctorId || doctors[0]?.id || ''
  );
  const [diagnosis, setDiagnosis] = useState<string>(presetAppointment?.diagnosisNote || 'Acute Upper Respiratory Infection');
  const [symptoms, setSymptoms] = useState<string>(presetAppointment?.reasonForVisit || 'Fever, sore throat, mild fatigue');
  const [adviceNotes, setAdviceNotes] = useState<string>('Drink warm water, take rest for 3 days, avoid cold drinks.');
  const [followUpDate, setFollowUpDate] = useState<string>(
    new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  );

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 'm-1',
      name: 'Amoxicillin + Clavulanate (625mg)',
      dosage: '625 mg',
      frequency: '1-0-1 (Twice daily after food)',
      duration: '5 Days',
      instructions: 'Take with plenty of water',
    },
    {
      id: 'm-2',
      name: 'Paracetamol / Acetaminophen (500mg)',
      dosage: '500 mg',
      frequency: '1-1-1 (SOS for fever > 100°F)',
      duration: '3 Days',
      instructions: 'Maximum 3 tablets per day',
    }
  ]);

  const handleAddMedicationRow = () => {
    setMedications([
      ...medications,
      {
        id: `m-${Date.now()}`,
        name: '',
        dosage: '1 Tablet',
        frequency: '1-0-1',
        duration: '5 Days',
        instructions: 'After meals',
      }
    ]);
  };

  const handleRemoveMedicationRow = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const handleUpdateMedication = (id: string, field: keyof Medication, value: string) => {
    setMedications(
      medications.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pat = patients.find(p => p.id === selectedPatientId) || patients[0];
    const doc = doctors.find(d => d.id === selectedDoctorId) || doctors[0];

    if (!pat || !doc) return;

    onCreatePrescription({
      appointmentId: presetAppointment?.id || '',
      patientId: pat.id,
      patientName: pat.name,
      patientAge: pat.age,
      patientGender: pat.gender,
      doctorId: doc.id,
      doctorName: doc.name,
      doctorSpecialty: doc.specialty,
      diagnosis,
      symptoms,
      medications,
      adviceNotes,
      followUpDate,
    });

    setIsCreating(false);
  };

  return (
    <div className="space-y-6" id="prescription-writer-container">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            Clinical Prescriptions & Digital Rx Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Generate standardized clinical prescriptions with drug dosage, instructions, advice notes, and printable Rx headers.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          id="create-rx-btn"
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Prescription</span>
        </button>
      </div>

      {/* Prescription Generator Form (if creating) */}
      {isCreating ? (
        <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl animate-fadeIn">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Pill className="w-5 h-5 text-cyan-400" />
              Prescription Editor
            </h2>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Select Patient *</label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                {patients.map((pat) => (
                  <option key={pat.id} value={pat.id}>
                    {pat.name} (MRN: {pat.mrn}, {pat.age}Y/{pat.gender})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Prescribing Doctor *</label>
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} — {doc.specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Clinical Diagnosis *</label>
              <input
                type="text"
                required
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="e.g., Acute Bronchitis"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Symptoms / Chief Complaints</label>
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., Cough, chest discomfort, fever"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Medications Dynamic Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-cyan-400" />
                Prescribed Medications (Rx Table)
              </h3>
              <button
                type="button"
                onClick={handleAddMedicationRow}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-950/60 border border-cyan-800 px-3 py-1 rounded-lg"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Drug</span>
              </button>
            </div>

            <div className="space-y-2">
              {medications.map((med, idx) => (
                <div key={med.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 items-center">
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      placeholder="Medication Name (e.g., Paracetamol)"
                      value={med.name}
                      onChange={(e) => handleUpdateMedication(med.id, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Dosage (500mg)"
                      value={med.dosage}
                      onChange={(e) => handleUpdateMedication(med.id, 'dosage', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      placeholder="Frequency (1-0-1)"
                      value={med.frequency}
                      onChange={(e) => handleUpdateMedication(med.id, 'frequency', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Duration (5 Days)"
                      value={med.duration}
                      onChange={(e) => handleUpdateMedication(med.id, 'duration', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-1 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicationRow(med.id)}
                      className="p-1 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Physician Advice & Diet Notes</label>
              <textarea
                rows={2}
                value={adviceNotes}
                onChange={(e) => setAdviceNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Follow-Up Date</label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-md"
            >
              Save & Issue Prescription
            </button>
          </div>

        </form>
      ) : null}

      {/* Prescriptions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {prescriptions.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400">
            No prescriptions created yet. Click "Write New Prescription" to issue one.
          </div>
        ) : (
          prescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded-md">
                      {rx.prescriptionCode}
                    </span>
                    <span className="text-xs text-slate-400">{rx.date}</span>
                  </div>

                  <button
                    onClick={() => setSelectedRxToPrint(rx)}
                    className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 px-2.5 py-1 rounded-lg font-medium transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Rx Sheet</span>
                  </button>
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="text-sm font-bold text-white">{rx.patientName} ({rx.patientAge}Y/{rx.patientGender})</h3>
                  <p className="text-xs text-slate-400">
                    Prescribed by: <span className="text-slate-200 font-medium">{rx.doctorName}</span> ({rx.doctorSpecialty})
                  </p>
                  <p className="text-xs text-cyan-300 font-semibold mt-2">
                    Diagnosis: {rx.diagnosis}
                  </p>
                </div>

                {/* Medications preview */}
                <div className="mt-3 space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                  <div className="font-bold text-slate-300 text-[11px] uppercase tracking-wider mb-1">
                    Rx Medications ({rx.medications.length})
                  </div>
                  {rx.medications.map((m) => (
                    <div key={m.id} className="flex justify-between text-slate-300 border-b border-slate-900 last:border-b-0 pb-1">
                      <span className="font-medium text-white">{m.name} ({m.dosage})</span>
                      <span className="text-cyan-400 font-mono text-[11px]">{m.frequency} • {m.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-800">
                Advice: "{rx.adviceNotes}"
              </div>
            </div>
          ))
        )}
      </div>

      {/* Printable Rx Sheet Modal */}
      {selectedRxToPrint && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full p-8 space-y-6 shadow-2xl relative my-8" id="printable-rx-sheet">
            
            {/* Print & Close Header Controls */}
            <div className="flex items-center justify-between border-b pb-4 border-slate-200 print:hidden">
              <span className="text-xs font-bold text-slate-500 uppercase">Prescription Preview</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  Print Now
                </button>
                <button
                  onClick={() => setSelectedRxToPrint(null)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Official Hospital Rx Header */}
            <div className="flex justify-between items-start border-b-2 border-blue-600 pb-4">
              <div>
                <h1 className="text-2xl font-black text-blue-900 tracking-tight bg-gradient-to-r from-blue-900 via-cyan-800 to-blue-900 bg-clip-text text-transparent">
                  BHARATH REDDY MEDICAL SCIENCES
                </h1>
                <p className="text-xs font-bold text-blue-700">CarePulse Hospital Management System</p>
                <p className="text-[11px] text-slate-500">742 Evergreen Medical Parkway • Ph: +1 (800) 555-CARE</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">{selectedRxToPrint.doctorName}</p>
                <p className="text-xs font-semibold text-blue-700">{selectedRxToPrint.doctorSpecialty}</p>
                <p className="text-[10px] text-slate-500 font-mono">Lic #: MD-CARE-2026-X</p>
              </div>
            </div>

            {/* Patient Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-lg text-xs font-medium border border-slate-200">
              <div>
                <span className="text-slate-500 text-[10px] block">PATIENT NAME</span>
                <span className="font-bold text-slate-900">{selectedRxToPrint.patientName}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">AGE / GENDER</span>
                <span className="text-slate-800">{selectedRxToPrint.patientAge} Yrs / {selectedRxToPrint.patientGender}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">RX CODE</span>
                <span className="font-mono text-blue-800 font-bold">{selectedRxToPrint.prescriptionCode}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">DATE</span>
                <span className="text-slate-800">{selectedRxToPrint.date}</span>
              </div>
            </div>

            {/* Diagnosis */}
            <div className="text-xs border-l-4 border-blue-600 pl-3 py-1 bg-blue-50/50">
              <span className="font-bold text-blue-900 uppercase tracking-wider text-[10px] block">DIAGNOSIS & CLINICAL FINDINGS</span>
              <p className="font-semibold text-slate-800">{selectedRxToPrint.diagnosis}</p>
            </div>

            {/* RX Symbol & Medication Table */}
            <div className="space-y-3">
              <div className="text-2xl font-black italic text-blue-900 font-serif">Rx</div>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-slate-600 uppercase text-[10px] font-bold">
                    <th className="py-2">Medication Name</th>
                    <th className="py-2">Dosage</th>
                    <th className="py-2">Frequency</th>
                    <th className="py-2">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {selectedRxToPrint.medications.map((m, i) => (
                    <tr key={i}>
                      <td className="py-2.5 font-bold text-slate-900">{m.name}</td>
                      <td className="py-2.5">{m.dosage}</td>
                      <td className="py-2.5 font-semibold text-blue-800">{m.frequency}</td>
                      <td className="py-2.5">{m.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Advice & Followup */}
            <div className="grid grid-cols-2 gap-4 text-xs pt-3 border-t border-slate-200">
              <div>
                <span className="font-bold text-slate-700 text-[10px] uppercase block">ADVICE & INSTRUCTIONS</span>
                <p className="text-slate-800 italic">{selectedRxToPrint.adviceNotes}</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-700 text-[10px] uppercase block">NEXT FOLLOW-UP DATE</span>
                <p className="font-bold text-blue-900">{selectedRxToPrint.followUpDate || 'As needed'}</p>
              </div>
            </div>

            {/* Doctor Signature Block */}
            <div className="flex justify-between items-end pt-8 border-t border-slate-300">
              <div className="text-[10px] text-slate-500">
                Computer-generated prescription verified by CarePulse HMS REST API.
              </div>
              <div className="text-center">
                <div className="h-10 border-b border-slate-400 w-36 mb-1 font-serif text-blue-900 italic text-sm flex items-end justify-center pb-1">
                  {selectedRxToPrint.doctorName}
                </div>
                <span className="text-[10px] font-bold text-slate-700 uppercase">Doctor's Signature</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
