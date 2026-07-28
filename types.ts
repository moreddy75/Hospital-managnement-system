/**
 * Hospital Management System Types
 */

export type UserRole = 'ADMIN' | 'DOCTOR' | 'NURSE' | 'RECEPTIONIST';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
  title: string;
  phone?: string;
  employeeCode: string;
}

export interface AuthSession {
  user: User;
  token: string;
  loginTime: string;
}

export type Specialty = 
  | 'Cardiology'
  | 'Neurology'
  | 'Pediatrics'
  | 'Orthopedics'
  | 'General Medicine'
  | 'Oncology'
  | 'Dermatology'
  | 'Radiology'
  | 'Emergency Medicine'
  | 'Gynaecology';

export type DoctorStatus = 'Available' | 'In Consultation' | 'On Leave' | 'In Surgery';

export interface Doctor {
  id: string;
  doctorCode: string; // e.g., DOC-101
  name: string;
  specialty: Specialty;
  department: string;
  qualification: string; // e.g., MD, DM (Cardiology), MBBS
  experienceYears: number;
  phone: string;
  email: string;
  consultationFee: number;
  roomNumber: string;
  availableDays: string[]; // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  availableHours: string; // e.g., "09:00 AM - 02:00 PM"
  status: DoctorStatus;
  avatarUrl?: string;
  totalConsultations?: number;
  rating?: number;
  createdAt: string;
}

export type Gender = 'Male' | 'Female' | 'Other';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type PatientStatus = 'Admitted' | 'Outpatient' | 'Discharged' | 'Critical' | 'Under Observation';

export interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  doctorName: string;
  doctorSpecialty: string;
  notes: string;
  treatment: string;
}

export interface Patient {
  id: string;
  mrn: string; // Medical Record Number e.g., PAT-2026-001
  name: string;
  age: number;
  gender: Gender;
  bloodGroup: BloodGroup;
  phone: string;
  email: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  primaryDoctorId?: string;
  primaryDoctorName?: string;
  status: PatientStatus;
  roomNumber?: string;
  allergies?: string[];
  medicalRecords: MedicalRecord[];
  createdAt: string;
}

export type AppointmentStatus = 'Scheduled' | 'In-Progress' | 'Completed' | 'Cancelled' | 'No-Show';
export type AppointmentType = 'General Checkup' | 'Follow-Up' | 'Emergency' | 'Consultation' | 'Lab Review';
export type Priority = 'Routine' | 'Urgent' | 'Emergency';

export interface Appointment {
  id: string;
  appointmentCode: string; // e.g., APT-8901
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: Specialty;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g., "10:30 AM"
  type: AppointmentType;
  priority: Priority;
  reasonForVisit: string;
  status: AppointmentStatus;
  diagnosisNote?: string;
  prescriptionId?: string;
  createdAt: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string; // e.g., "500mg"
  frequency: string; // e.g., "1-0-1 (After meals)"
  duration: string; // e.g., "5 Days"
  instructions?: string;
}

export interface Prescription {
  id: string;
  prescriptionCode: string; // e.g., RX-2026-102
  appointmentId: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: Gender;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: Specialty;
  date: string;
  diagnosis: string;
  symptoms: string;
  medications: Medication[];
  adviceNotes: string;
  followUpDate?: string;
}

export type PaymentStatus = 'Paid' | 'Pending' | 'Overdue' | 'Partially Paid';

export interface InvoiceItem {
  id: string;
  description: string; // e.g., "Cardiology Consultation Fee", "ECG Test", "Blood Test"
  category: 'Consultation' | 'Laboratory' | 'Pharmacy' | 'Room Charge' | 'Procedure';
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceCode: string; // e.g., INV-2026-554
  patientId: string;
  patientName: string;
  doctorId?: string;
  doctorName?: string;
  items: InvoiceItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: 'Cash' | 'Credit Card' | 'Health Insurance' | 'UPI' | 'Net Banking';
  issueDate: string;
  dueDate: string;
}

export interface DashboardStats {
  totalPatients: number;
  todayPatientsCount: number;
  totalDoctors: number;
  availableDoctorsCount: number;
  totalAppointments: number;
  todayAppointmentsCount: number;
  pendingAppointmentsCount: number;
  completedAppointmentsCount: number;
  totalRevenue: number;
  pendingBillsCount: number;
  emergencyAlertsCount: number;
  departmentOccupancy: {
    department: string;
    patientCount: number;
    capacity: number;
  }[];
}

export interface SpringBootFile {
  path: string;
  filename: string;
  category: 'Controller' | 'Service' | 'Repository' | 'Entity' | 'DTO' | 'Config' | 'SQL' | 'Properties' | 'Maven';
  code: string;
  description: string;
}
