import { Doctor, Patient, Appointment, Prescription, Invoice, DashboardStats, SpringBootFile } from '../types';

/**
 * CarePulse HMS - Central API Service
 * 
 * EASY LEARNING SUMMARY:
 * This file acts as the bridge between our React Frontend and Spring Boot Backend.
 * - Frontend calls these functions (e.g., apiService.getDoctors())
 * - `fetch()` sends an HTTP Request (GET, POST, PUT, DELETE) to `/api/v1/...`
 * - Spring Boot REST Controller receives the request, processes data with MySQL, and sends back JSON!
 */

const API_BASE = '/api/v1';

export const apiService = {
  // ==========================================
  // 1. DOCTOR MODULE API CALLS
  // ==========================================

  /** Fetch all doctors (GET /api/v1/doctors) */
  async getDoctors(params?: { specialty?: string; status?: string; search?: string }): Promise<Doctor[]> {
    const query = new URLSearchParams();
    if (params?.specialty) query.append('specialty', params.specialty);
    if (params?.status) query.append('status', params.status);
    if (params?.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE}/doctors?${query.toString()}`);
    const data = await res.json();
    return data.data || [];
  },

  /** Create a new doctor record (POST /api/v1/doctors) */
  async createDoctor(doctorData: Partial<Doctor>): Promise<Doctor> {
    const res = await fetch(`${API_BASE}/doctors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctorData),
    });
    const data = await res.json();
    return data.data;
  },

  /** Update doctor details (PUT /api/v1/doctors/{id}) */
  async updateDoctor(id: string, doctorData: Partial<Doctor>): Promise<Doctor> {
    const res = await fetch(`${API_BASE}/doctors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctorData),
    });
    const data = await res.json();
    return data.data;
  },

  /** Delete doctor by ID (DELETE /api/v1/doctors/{id}) */
  async deleteDoctor(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/doctors/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  // ==========================================
  // 2. PATIENT MODULE API CALLS
  // ==========================================

  /** Fetch all registered patients (GET /api/v1/patients) */
  async getPatients(params?: { search?: string; status?: string }): Promise<Patient[]> {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.status) query.append('status', params.status);

    const res = await fetch(`${API_BASE}/patients?${query.toString()}`);
    const data = await res.json();
    return data.data || [];
  },

  /** Register new patient (POST /api/v1/patients) */
  async createPatient(patientData: Partial<Patient> & { initialDiagnosis?: string; initialNotes?: string }): Promise<Patient> {
    const res = await fetch(`${API_BASE}/patients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData),
    });
    const data = await res.json();
    return data.data;
  },

  /** Update patient EHR record (PUT /api/v1/patients/{id}) */
  async updatePatient(id: string, patientData: Partial<Patient>): Promise<Patient> {
    const res = await fetch(`${API_BASE}/patients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData),
    });
    const data = await res.json();
    return data.data;
  },

  /** Delete patient record (DELETE /api/v1/patients/{id}) */
  async deletePatient(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/patients/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  // ==========================================
  // 3. APPOINTMENT MODULE API CALLS
  // ==========================================

  /** Fetch appointments with optional filters (GET /api/v1/appointments) */
  async getAppointments(params?: { doctorId?: string; patientId?: string; date?: string; status?: string }): Promise<Appointment[]> {
    const query = new URLSearchParams();
    if (params?.doctorId) query.append('doctorId', params.doctorId);
    if (params?.patientId) query.append('patientId', params.patientId);
    if (params?.date) query.append('date', params.date);
    if (params?.status) query.append('status', params.status);

    const res = await fetch(`${API_BASE}/appointments?${query.toString()}`);
    const data = await res.json();
    return data.data || [];
  },

  /** Book new appointment (POST /api/v1/appointments) */
  async createAppointment(aptData: Partial<Appointment>): Promise<Appointment> {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aptData),
    });
    const data = await res.json();
    return data.data;
  },

  /** Update appointment status (e.g., Scheduled -> Completed) */
  async updateAppointmentStatus(id: string, status: string, diagnosisNote?: string): Promise<Appointment> {
    const res = await fetch(`${API_BASE}/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, diagnosisNote }),
    });
    const data = await res.json();
    return data.data;
  },

  /** Cancel appointment (DELETE /api/v1/appointments/{id}) */
  async cancelAppointment(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/appointments/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  // ==========================================
  // 4. PRESCRIPTION MODULE API CALLS
  // ==========================================

  /** Get all prescriptions (GET /api/v1/prescriptions) */
  async getPrescriptions(patientId?: string): Promise<Prescription[]> {
    const query = new URLSearchParams();
    if (patientId) query.append('patientId', patientId);

    const res = await fetch(`${API_BASE}/prescriptions?${query.toString()}`);
    const data = await res.json();
    return data.data || [];
  },

  /** Issue a new prescription (POST /api/v1/prescriptions) */
  async createPrescription(rxData: Partial<Prescription>): Promise<Prescription> {
    const res = await fetch(`${API_BASE}/prescriptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rxData),
    });
    const data = await res.json();
    return data.data;
  },

  // ==========================================
  // 5. BILLING & INVOICE API CALLS
  // ==========================================

  /** Get hospital invoices (GET /api/v1/billing) */
  async getInvoices(): Promise<Invoice[]> {
    const res = await fetch(`${API_BASE}/billing`);
    const data = await res.json();
    return data.data || [];
  },

  /** Generate new invoice (POST /api/v1/billing) */
  async createInvoice(invoiceData: Partial<Invoice>): Promise<Invoice> {
    const res = await fetch(`${API_BASE}/billing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoiceData),
    });
    const data = await res.json();
    return data.data;
  },

  /** Record invoice payment (PUT /api/v1/billing/{id}/pay) */
  async payInvoice(id: string, paymentMethod: string): Promise<Invoice> {
    const res = await fetch(`${API_BASE}/billing/${id}/pay`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethod }),
    });
    const data = await res.json();
    return data.data;
  },

  // ==========================================
  // 6. DASHBOARD & EXPORT API CALLS
  // ==========================================

  /** Get aggregated stats for hospital metrics */
  async getStats(): Promise<DashboardStats> {
    const res = await fetch(`${API_BASE}/stats`);
    const data = await res.json();
    return data.data;
  },

  /** Fetch Spring Boot Java source code files for learning & export */
  async getSpringBootCode(): Promise<SpringBootFile[]> {
    const res = await fetch(`${API_BASE}/spring-boot-code`);
    const data = await res.json();
    return data.data || [];
  }
};
