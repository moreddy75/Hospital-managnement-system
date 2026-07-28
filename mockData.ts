import { Doctor, Patient, Appointment, Prescription, Invoice, DashboardStats, SpringBootFile } from './types';

export const initialDoctors: Doctor[] = [
  {
    id: 'doc-1',
    doctorCode: 'DOC-101',
    name: 'Dr. Sarah Jenkins',
    specialty: 'Cardiology',
    department: 'Cardiovascular Sciences',
    qualification: 'MD, DM (Cardiology), FACC',
    experienceYears: 14,
    phone: '+1 (555) 234-5678',
    email: 's.jenkins@carepulse.hospital',
    consultationFee: 150,
    roomNumber: 'Suite 302 (Block A)',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    availableHours: '09:00 AM - 02:00 PM',
    status: 'Available',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80',
    totalConsultations: 1240,
    rating: 4.9,
    createdAt: '2025-01-15T08:00:00Z',
  },
  {
    id: 'doc-2',
    doctorCode: 'DOC-102',
    name: 'Dr. Rajesh Sharma',
    specialty: 'Neurology',
    department: 'Neurosciences',
    qualification: 'MBBS, MD, MCh (Neurosurgery)',
    experienceYears: 18,
    phone: '+1 (555) 876-5432',
    email: 'r.sharma@carepulse.hospital',
    consultationFee: 180,
    roomNumber: 'Suite 405 (Block B)',
    availableDays: ['Mon', 'Wed', 'Fri'],
    availableHours: '10:00 AM - 04:00 PM',
    status: 'In Consultation',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
    totalConsultations: 1850,
    rating: 4.8,
    createdAt: '2025-01-18T09:30:00Z',
  },
  {
    id: 'doc-3',
    doctorCode: 'DOC-103',
    name: 'Dr. Emily Vance',
    specialty: 'Pediatrics',
    department: 'Pediatric Care',
    qualification: 'MD (Pediatrics), DCH',
    experienceYears: 9,
    phone: '+1 (555) 345-6789',
    email: 'e.vance@carepulse.hospital',
    consultationFee: 110,
    roomNumber: 'Suite 104 (Block C)',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Sat'],
    availableHours: '08:30 AM - 01:30 PM',
    status: 'Available',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813566-82823d5afe4a?w=300&auto=format&fit=crop&q=80',
    totalConsultations: 980,
    rating: 4.95,
    createdAt: '2025-02-01T10:00:00Z',
  },
  {
    id: 'doc-4',
    doctorCode: 'DOC-104',
    name: 'Dr. Marcus Thorne',
    specialty: 'Orthopedics',
    department: 'Orthopedics & Joint Care',
    qualification: 'MS (Orthopedics), FRCS',
    experienceYears: 16,
    phone: '+1 (555) 456-7890',
    email: 'm.thorne@carepulse.hospital',
    consultationFee: 160,
    roomNumber: 'Suite 208 (Block A)',
    availableDays: ['Tue', 'Thu', 'Fri', 'Sat'],
    availableHours: '11:00 AM - 05:00 PM',
    status: 'In Surgery',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop&q=80',
    totalConsultations: 1420,
    rating: 4.7,
    createdAt: '2025-02-10T11:15:00Z',
  },
  {
    id: 'doc-5',
    doctorCode: 'DOC-105',
    name: 'Dr. Sophia Al-Mansoor',
    specialty: 'General Medicine',
    department: 'Internal Medicine',
    qualification: 'MBBS, MD (Internal Medicine)',
    experienceYears: 11,
    phone: '+1 (555) 567-8901',
    email: 's.almansoor@carepulse.hospital',
    consultationFee: 100,
    roomNumber: 'Suite 101 (Main Building)',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availableHours: '09:00 AM - 05:00 PM',
    status: 'Available',
    avatarUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&auto=format&fit=crop&q=80',
    totalConsultations: 2100,
    rating: 4.85,
    createdAt: '2025-02-15T14:00:00Z',
  },
  {
    id: 'doc-6',
    doctorCode: 'DOC-106',
    name: 'Dr. Alan Turing',
    specialty: 'Emergency Medicine',
    department: 'Trauma & Emergency',
    qualification: 'MD (Emergency Medicine), Dip. ACLS',
    experienceYears: 12,
    phone: '+1 (555) 678-9012',
    email: 'a.turing@carepulse.hospital',
    consultationFee: 200,
    roomNumber: 'ER Bay 1 (Emergency Dept)',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    availableHours: '24/7 Shift Rotation',
    status: 'Available',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80',
    totalConsultations: 3100,
    rating: 4.9,
    createdAt: '2025-03-01T08:30:00Z',
  }
];

export const initialPatients: Patient[] = [
  {
    id: 'pat-1',
    mrn: 'PAT-2026-001',
    name: 'Eleanor Vance',
    age: 42,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '+1 (555) 901-2345',
    email: 'eleanor.vance@example.com',
    address: '742 Evergreen Terrace, Springfield',
    emergencyContactName: 'Thomas Vance (Husband)',
    emergencyContactPhone: '+1 (555) 901-9999',
    primaryDoctorId: 'doc-1',
    primaryDoctorName: 'Dr. Sarah Jenkins',
    status: 'Admitted',
    roomNumber: 'Ward 3B - Bed 12',
    allergies: ['Penicillin', 'Peanuts'],
    medicalRecords: [
      {
        id: 'mr-1',
        date: '2026-07-20',
        diagnosis: 'Acute Coronary Syndrome / Angina',
        doctorName: 'Dr. Sarah Jenkins',
        doctorSpecialty: 'Cardiology',
        notes: 'Patient presented with sudden chest tightness radiating to left shoulder. EKG shows subtle ST changes.',
        treatment: 'Admitted for continuous ECG monitoring, Nitroglycerin sublingual, Aspirin 150mg.',
      },
      {
        id: 'mr-2',
        date: '2026-05-12',
        diagnosis: 'Hypertension Stage 1',
        doctorName: 'Dr. Sophia Al-Mansoor',
        doctorSpecialty: 'General Medicine',
        notes: 'Routine blood pressure check recorded 142/90 mmHg.',
        treatment: 'Prescribed Amlodipine 5mg daily. Low sodium dietary counsel.',
      }
    ],
    createdAt: '2026-07-20T10:15:00Z',
  },
  {
    id: 'pat-2',
    mrn: 'PAT-2026-002',
    name: 'Robert Hayes',
    age: 58,
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '+1 (555) 812-3456',
    email: 'robert.hayes@example.com',
    address: '108 Ocean Drive, Suite 4, Miami',
    emergencyContactName: 'Clara Hayes (Daughter)',
    emergencyContactPhone: '+1 (555) 812-8888',
    primaryDoctorId: 'doc-2',
    primaryDoctorName: 'Dr. Rajesh Sharma',
    status: 'Outpatient',
    allergies: ['Sulfa Drugs'],
    medicalRecords: [
      {
        id: 'mr-3',
        date: '2026-07-25',
        diagnosis: 'Chronic Migraine & Cervical Spondylosis',
        doctorName: 'Dr. Rajesh Sharma',
        doctorSpecialty: 'Neurology',
        notes: 'Recurrent occipital headaches with neck stiffness. MRI spine ordered.',
        treatment: 'Physiotherapy recommended, Naproxen 500mg SOS.',
      }
    ],
    createdAt: '2026-07-22T11:00:00Z',
  },
  {
    id: 'pat-3',
    mrn: 'PAT-2026-003',
    name: 'Liam Martinez',
    age: 7,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+1 (555) 723-4567',
    email: 'parent.martinez@example.com',
    address: '42 Wallaby Way, Sydney',
    emergencyContactName: 'Maria Martinez (Mother)',
    emergencyContactPhone: '+1 (555) 723-7777',
    primaryDoctorId: 'doc-3',
    primaryDoctorName: 'Dr. Emily Vance',
    status: 'Under Observation',
    roomNumber: 'Pediatric Observation - Bed 4',
    allergies: ['Dust Mites'],
    medicalRecords: [
      {
        id: 'mr-4',
        date: '2026-07-27',
        diagnosis: 'Acute Bronchial Asthma Exacerbation',
        doctorName: 'Dr. Emily Vance',
        doctorSpecialty: 'Pediatrics',
        notes: 'Child presented with wheezing and mild intercostal retractions after outdoor play.',
        treatment: 'Nebulization with Salbutamol + Ipratropium. SpO2 maintained at 98%.',
      }
    ],
    createdAt: '2026-07-27T07:45:00Z',
  },
  {
    id: 'pat-4',
    mrn: 'PAT-2026-004',
    name: 'Sophia Patel',
    age: 34,
    gender: 'Female',
    bloodGroup: 'AB+',
    phone: '+1 (555) 634-5678',
    email: 'spatel@example.com',
    address: '221B Baker Street, London',
    emergencyContactName: 'Aarav Patel (Brother)',
    emergencyContactPhone: '+1 (555) 634-9900',
    primaryDoctorId: 'doc-4',
    primaryDoctorName: 'Dr. Marcus Thorne',
    status: 'Admitted',
    roomNumber: 'Ortho Wing - Room 204',
    allergies: [],
    medicalRecords: [
      {
        id: 'mr-5',
        date: '2026-07-26',
        diagnosis: 'Anterior Cruciate Ligament (ACL) Tear - Right Knee',
        doctorName: 'Dr. Marcus Thorne',
        doctorSpecialty: 'Orthopedics',
        notes: 'Sports injury during tennis match. Positive Lachman test.',
        treatment: 'Scheduled for Arthroscopic Reconstruction. Knee brace applied.',
      }
    ],
    createdAt: '2026-07-26T16:30:00Z',
  },
  {
    id: 'pat-5',
    mrn: 'PAT-2026-005',
    name: 'Arthur Pendelton',
    age: 68,
    gender: 'Male',
    bloodGroup: 'O-',
    phone: '+1 (555) 545-6789',
    email: 'arthur.p@example.com',
    address: '15 Pinecrest Drive, Boston',
    emergencyContactName: 'Grace Pendelton (Wife)',
    emergencyContactPhone: '+1 (555) 545-1122',
    primaryDoctorId: 'doc-5',
    primaryDoctorName: 'Dr. Sophia Al-Mansoor',
    status: 'Discharged',
    allergies: ['Iodine Contrast'],
    medicalRecords: [
      {
        id: 'mr-6',
        date: '2026-07-15',
        diagnosis: 'Type 2 Diabetes Mellitus with Peripheral Neuropathy',
        doctorName: 'Dr. Sophia Al-Mansoor',
        doctorSpecialty: 'General Medicine',
        notes: 'HbA1c measured at 8.2%. Complaining of tingling sensation in feet.',
        treatment: 'Metformin 850mg BD, Pregabalin 75mg at bedtime.',
      }
    ],
    createdAt: '2026-07-15T09:00:00Z',
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-1',
    appointmentCode: 'APT-8901',
    patientId: 'pat-1',
    patientName: 'Eleanor Vance',
    patientPhone: '+1 (555) 901-2345',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialty: 'Cardiology',
    date: '2026-07-27',
    timeSlot: '09:30 AM',
    type: 'Consultation',
    priority: 'Urgent',
    reasonForVisit: 'Post-admission cardiology evaluation and Echo review',
    status: 'In-Progress',
    createdAt: '2026-07-26T14:20:00Z',
  },
  {
    id: 'apt-2',
    appointmentCode: 'APT-8902',
    patientId: 'pat-2',
    patientName: 'Robert Hayes',
    patientPhone: '+1 (555) 812-3456',
    doctorId: 'doc-2',
    doctorName: 'Dr. Rajesh Sharma',
    doctorSpecialty: 'Neurology',
    date: '2026-07-27',
    timeSlot: '11:00 AM',
    type: 'Follow-Up',
    priority: 'Routine',
    reasonForVisit: 'Review MRI Brain scan results for chronic migraine',
    status: 'Scheduled',
    createdAt: '2026-07-25T10:00:00Z',
  },
  {
    id: 'apt-3',
    appointmentCode: 'APT-8903',
    patientId: 'pat-3',
    patientName: 'Liam Martinez',
    patientPhone: '+1 (555) 723-4567',
    doctorId: 'doc-3',
    doctorName: 'Dr. Emily Vance',
    doctorSpecialty: 'Pediatrics',
    date: '2026-07-27',
    timeSlot: '12:15 PM',
    type: 'Emergency',
    priority: 'Emergency',
    reasonForVisit: 'Pediatric asthma neb check & chest clearance',
    status: 'Scheduled',
    createdAt: '2026-07-27T08:00:00Z',
  },
  {
    id: 'apt-4',
    appointmentCode: 'APT-8904',
    patientId: 'pat-4',
    patientName: 'Sophia Patel',
    patientPhone: '+1 (555) 634-5678',
    doctorId: 'doc-4',
    doctorName: 'Dr. Marcus Thorne',
    doctorSpecialty: 'Orthopedics',
    date: '2026-07-28',
    timeSlot: '02:00 PM',
    type: 'General Checkup',
    priority: 'Routine',
    reasonForVisit: 'Pre-surgery orthogonal evaluation for right ACL',
    status: 'Scheduled',
    createdAt: '2026-07-26T17:00:00Z',
  },
  {
    id: 'apt-5',
    appointmentCode: 'APT-8905',
    patientId: 'pat-5',
    patientName: 'Arthur Pendelton',
    patientPhone: '+1 (555) 545-6789',
    doctorId: 'doc-5',
    doctorName: 'Dr. Sophia Al-Mansoor',
    doctorSpecialty: 'General Medicine',
    date: '2026-07-26',
    timeSlot: '10:00 AM',
    type: 'Follow-Up',
    priority: 'Routine',
    reasonForVisit: 'Routine blood sugar check & prescription renewal',
    status: 'Completed',
    diagnosisNote: 'FBS: 118 mg/dL, PPBS: 165 mg/dL. Controlled well. Renewed Metformin.',
    createdAt: '2026-07-24T12:00:00Z',
  }
];

export const initialPrescriptions: Prescription[] = [
  {
    id: 'rx-1',
    prescriptionCode: 'RX-2026-101',
    appointmentId: 'apt-5',
    patientId: 'pat-5',
    patientName: 'Arthur Pendelton',
    patientAge: 68,
    patientGender: 'Male',
    doctorId: 'doc-5',
    doctorName: 'Dr. Sophia Al-Mansoor',
    doctorSpecialty: 'General Medicine',
    date: '2026-07-26',
    diagnosis: 'Type 2 Diabetes Mellitus with Neuropathy',
    symptoms: 'Mild numbness in feet, elevated blood sugar',
    medications: [
      {
        id: 'med-1',
        name: 'Metformin Hydrochloride (SR)',
        dosage: '850 mg',
        frequency: '1-0-1 (Twice daily after meals)',
        duration: '30 Days',
        instructions: 'Take immediately after food with plenty of water',
      },
      {
        id: 'med-2',
        name: 'Pregabalin Sustained Release',
        dosage: '75 mg',
        frequency: '0-0-1 (Once daily at bedtime)',
        duration: '15 Days',
        instructions: 'May cause mild drowsiness in the morning',
      },
      {
        id: 'med-3',
        name: 'Methylcobalamin + Alpha Lipoic Acid',
        dosage: '1 Capsule',
        frequency: '1-0-0 (Morning after breakfast)',
        duration: '30 Days',
        instructions: 'Nerve health supplement',
      }
    ],
    adviceNotes: 'Maintain low glycemic index diet. Walk 30 mins daily. Regular foot inspection.',
    followUpDate: '2026-08-26',
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceCode: 'INV-2026-501',
    patientId: 'pat-1',
    patientName: 'Eleanor Vance',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Jenkins',
    items: [
      { id: 'item-1', description: 'Specialist Cardiology Consultation', category: 'Consultation', amount: 150 },
      { id: 'item-2', description: '2D Echocardiogram Test', category: 'Laboratory', amount: 220 },
      { id: 'item-3', description: 'Troponin-I Blood Biomarker Test', category: 'Laboratory', amount: 95 },
      { id: 'item-4', description: 'CCU Bed Stay (24 Hours)', category: 'Room Charge', amount: 350 },
    ],
    subtotal: 815,
    taxAmount: 40.75,
    discountAmount: 0,
    totalAmount: 855.75,
    paymentStatus: 'Pending',
    issueDate: '2026-07-26',
    dueDate: '2026-08-02',
  },
  {
    id: 'inv-2',
    invoiceCode: 'INV-2026-502',
    patientId: 'pat-5',
    patientName: 'Arthur Pendelton',
    doctorId: 'doc-5',
    doctorName: 'Dr. Sophia Al-Mansoor',
    items: [
      { id: 'item-5', description: 'General Physician Consultation Fee', category: 'Consultation', amount: 100 },
      { id: 'item-6', description: 'Fasting Blood Sugar & HbA1c Lab Panel', category: 'Laboratory', amount: 65 },
      { id: 'item-7', description: 'Diabetes & Neuropathy Medications (30 Days)', category: 'Pharmacy', amount: 85 },
    ],
    subtotal: 250,
    taxAmount: 12.50,
    discountAmount: 20,
    totalAmount: 242.50,
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    issueDate: '2026-07-26',
    dueDate: '2026-07-26',
  }
];

export const initialStats: DashboardStats = {
  totalPatients: 1420,
  todayPatientsCount: 28,
  totalDoctors: 24,
  availableDoctorsCount: 18,
  totalAppointments: 850,
  todayAppointmentsCount: 14,
  pendingAppointmentsCount: 6,
  completedAppointmentsCount: 8,
  totalRevenue: 48950,
  pendingBillsCount: 5,
  emergencyAlertsCount: 2,
  departmentOccupancy: [
    { department: 'Cardiology', patientCount: 18, capacity: 20 },
    { department: 'Neurology', patientCount: 12, capacity: 15 },
    { department: 'Pediatrics', patientCount: 15, capacity: 18 },
    { department: 'Orthopedics', patientCount: 14, capacity: 16 },
    { department: 'Emergency & ICU', patientCount: 9, capacity: 10 },
  ],
};

export const springBootCodeFiles: SpringBootFile[] = [
  {
    path: 'src/main/java/com/carepulse/hospital/controller/DoctorController.java',
    filename: 'DoctorController.java',
    category: 'Controller',
    description: 'REST Controller providing CRUD endpoints for Doctor management with search and specialty filtering.',
    code: `package com.carepulse.hospital.controller;

import com.carepulse.hospital.entity.Doctor;
import com.carepulse.hospital.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {

    private final DoctorService doctorService;

    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    // GET /api/v1/doctors - Fetch all doctors or filter by specialty/status
    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors(
            @RequestParam(required = false) String specialty,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search) {
        List<Doctor> doctors = doctorService.getDoctors(specialty, status, search);
        return ResponseEntity.ok(doctors);
    }

    // GET /api/v1/doctors/{id} - Get doctor details by ID
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doctor);
    }

    // POST /api/v1/doctors - Register a new Doctor
    @PostMapping
    public ResponseEntity<Doctor> createDoctor(@Valid @RequestBody Doctor doctor) {
        Doctor savedDoctor = doctorService.saveDoctor(doctor);
        return new ResponseEntity<>(savedDoctor, HttpStatus.CREATED);
    }

    // PUT /api/v1/doctors/{id} - Update Doctor profile
    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(
            @PathVariable Long id, 
            @Valid @RequestBody Doctor doctorDetails) {
        Doctor updatedDoctor = doctorService.updateDoctor(id, doctorDetails);
        return ResponseEntity.ok(updatedDoctor);
    }

    // DELETE /api/v1/doctors/{id} - Remove Doctor from system
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }
}`
  },
  {
    path: 'src/main/java/com/carepulse/hospital/controller/PatientController.java',
    filename: 'PatientController.java',
    category: 'Controller',
    description: 'REST Controller handling Patient registration, medical history, search, and status updates.',
    code: `package com.carepulse.hospital.controller;

import com.carepulse.hospital.entity.Patient;
import com.carepulse.hospital.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(patientService.findAll(search, status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Patient> registerPatient(@Valid @RequestBody Patient patient) {
        Patient created = patientService.registerPatient(patient);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @Valid @RequestBody Patient patient) {
        return ResponseEntity.ok(patientService.updatePatient(id, patient));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }
}`
  },
  {
    path: 'src/main/java/com/carepulse/hospital/controller/AppointmentController.java',
    filename: 'AppointmentController.java',
    category: 'Controller',
    description: 'Appointment scheduling REST endpoints with availability checks and status transitions.',
    code: `package com.carepulse.hospital.controller;

import com.carepulse.hospital.entity.Appointment;
import com.carepulse.hospital.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<List<Appointment>> getAppointments(
            @RequestParam(required = false) Long doctorId,
            @RequestParam(required = false) Long patientId,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(appointmentService.getAppointments(doctorId, patientId, date, status));
    }

    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(@Valid @RequestBody Appointment appointment) {
        Appointment booked = appointmentService.bookAppointment(appointment);
        return new ResponseEntity<>(booked, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false) String diagnosisNote) {
        return ResponseEntity.ok(appointmentService.updateAppointmentStatus(id, status, diagnosisNote));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
        return ResponseEntity.noContent().build();
    }
}`
  },
  {
    path: 'src/main/java/com/carepulse/hospital/entity/Doctor.java',
    filename: 'Doctor.java',
    category: 'Entity',
    description: 'Spring Data JPA Entity mapping Doctor model to MySQL doctors table.',
    code: `package com.carepulse.hospital.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "doctor_code", unique = true, nullable = false)
    private String doctorCode;

    @NotBlank(message = "Doctor name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Specialty is required")
    @Column(nullable = false)
    private String specialty;

    @Column(nullable = false)
    private String department;

    private String qualification;

    private Integer experienceYears;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @Email
    private String email;

    @NotNull
    private BigDecimal consultationFee;

    private String roomNumber;

    @Enumerated(EnumType.STRING)
    private DoctorStatus status; // AVAILABLE, IN_CONSULTATION, ON_LEAVE, IN_SURGERY

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = DoctorStatus.AVAILABLE;
        }
    }

    public enum DoctorStatus {
        AVAILABLE, IN_CONSULTATION, ON_LEAVE, IN_SURGERY
    }
}`
  },
  {
    path: 'src/main/java/com/carepulse/hospital/entity/Patient.java',
    filename: 'Patient.java',
    category: 'Entity',
    description: 'JPA Entity class representing Patient with Medical Record Number (MRN) and blood group.',
    code: `package com.carepulse.hospital.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "patients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mrn", unique = true, nullable = false)
    private String mrn;

    @NotBlank(message = "Patient name is required")
    private String name;

    private Integer age;

    @Column(length = 10)
    private String gender;

    @Column(name = "blood_group", length = 5)
    private String bloodGroup;

    private String phone;

    private String email;

    @Column(length = 500)
    private String address;

    private String emergencyContactName;
    private String emergencyContactPhone;

    @Enumerated(EnumType.STRING)
    private PatientStatus status;

    private String roomNumber;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = PatientStatus.OUTPATIENT;
        }
    }

    public enum PatientStatus {
        ADMITTED, OUTPATIENT, DISCHARGED, CRITICAL, UNDER_OBSERVATION
    }
}`
  },
  {
    path: 'src/main/java/com/carepulse/hospital/service/DoctorService.java',
    filename: 'DoctorService.java',
    category: 'Service',
    description: 'Business logic layer interface & implementation for Doctor management.',
    code: `package com.carepulse.hospital.service;

import com.carepulse.hospital.entity.Doctor;
import com.carepulse.hospital.repository.DoctorRepository;
import com.carepulse.hospital.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DoctorService {

    private final DoctorRepository doctorRepository;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getDoctors(String specialty, String status, String search) {
        if (search != null && !search.isEmpty()) {
            return doctorRepository.findByNameContainingIgnoreCaseOrSpecialtyContainingIgnoreCase(search, search);
        }
        if (specialty != null && !specialty.isEmpty()) {
            return doctorRepository.findBySpecialty(specialty);
        }
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));
    }

    public Doctor saveDoctor(Doctor doctor) {
        if (doctor.getDoctorCode() == null) {
            doctor.setDoctorCode("DOC-" + System.currentTimeMillis() % 10000);
        }
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor details) {
        Doctor existing = getDoctorById(id);
        existing.setName(details.getName());
        existing.setSpecialty(details.getSpecialty());
        existing.setDepartment(details.getDepartment());
        existing.setPhone(details.getPhone());
        existing.setEmail(details.getEmail());
        existing.setConsultationFee(details.getConsultationFee());
        existing.setStatus(details.getStatus());
        existing.setRoomNumber(details.getRoomNumber());
        return doctorRepository.save(existing);
    }

    public void deleteDoctor(Long id) {
        Doctor doctor = getDoctorById(id);
        doctorRepository.delete(doctor);
    }
}`
  },
  {
    path: 'src/main/java/com/carepulse/hospital/repository/DoctorRepository.java',
    filename: 'DoctorRepository.java',
    category: 'Repository',
    description: 'Spring Data JPA Repository extending JpaRepository for MySQL queries.',
    code: `package com.carepulse.hospital.repository;

import com.carepulse.hospital.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<Doctor> findByDoctorCode(String doctorCode);

    List<Doctor> findBySpecialty(String specialty);

    List<Doctor> findByStatus(Doctor.DoctorStatus status);

    List<Doctor> findByNameContainingIgnoreCaseOrSpecialtyContainingIgnoreCase(String name, String specialty);
}`
  },
  {
    path: 'src/main/resources/application.properties',
    filename: 'application.properties',
    category: 'Properties',
    description: 'Spring Boot Configuration file with MySQL HikariCP Database connection pooling & Hibernate settings.',
    code: `# Server Configuration
server.port=8080
server.servlet.context-path=/

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/carepulse_hms_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# HikariCP Connection Pool
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.idle-timeout=300000

# JPA & Hibernate Settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Jackson Date Formatting
spring.jackson.date-format=yyyy-MM-dd
spring.jackson.time-zone=UTC`
  },
  {
    path: 'src/main/resources/schema.sql',
    filename: 'schema.sql',
    category: 'SQL',
    description: 'Production MySQL DDL Schema script creating tables with foreign keys & indexes.',
    code: `-- Hospital Management System Database Schema (MySQL)
CREATE DATABASE IF NOT EXISTS carepulse_hms_db;
USE carepulse_hms_db;

-- Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    doctor_code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    qualification VARCHAR(150),
    experience_years INT,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    consultation_fee DECIMAL(10, 2) NOT NULL,
    room_number VARCHAR(50),
    status VARCHAR(30) DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients Table
CREATE TABLE IF NOT EXISTS patients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    mrn VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender VARCHAR(10),
    blood_group VARCHAR(5),
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    status VARCHAR(30) DEFAULT 'OUTPATIENT',
    room_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    appointment_code VARCHAR(50) NOT NULL UNIQUE,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    appointment_date DATE NOT NULL,
    time_slot VARCHAR(20) NOT NULL,
    type VARCHAR(50) DEFAULT 'Consultation',
    priority VARCHAR(20) DEFAULT 'Routine',
    reason_for_visit TEXT,
    status VARCHAR(30) DEFAULT 'SCHEDULED',
    diagnosis_note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

-- Indexes for query optimization
CREATE INDEX idx_doctor_specialty ON doctors(specialty);
CREATE INDEX idx_patient_mrn ON patients(mrn);
CREATE INDEX idx_appointment_date ON appointments(appointment_date);`
  },
  {
    path: 'src/main/java/com/carepulse/hms/config/SecurityConfig.java',
    filename: 'SecurityConfig.java',
    category: 'Config',
    description: 'Spring Security 6 & JWT Configuration setting up CORS, BCrypt Password Encoder, and Stateless Session Policy.',
    code: `package com.carepulse.hms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**", "/api/v1/health", "/swagger-ui/**").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/v1/doctors/**").hasAnyRole("ADMIN", "DOCTOR", "RECEPTIONIST")
                .requestMatchers("/api/v1/patients/**").hasAnyRole("ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST")
                .anyRequest().authenticated()
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}`
  },
  {
    path: 'pom.xml',
    filename: 'pom.xml',
    category: 'Maven',
    description: 'Maven build configuration file with Spring Boot Starter Web, JPA, MySQL Connector, and Lombok dependencies.',
    code: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.2</version>
        <relativePath/>
    </parent>
    
    <groupId>com.carepulse</groupId>
    <artifactId>hospital-management-system</artifactId>
    <version>1.0.0</version>
    <name>Hospital Management System</name>
    <description>Production Spring Boot REST API for Hospital Management</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`
  }
];
