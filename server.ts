import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  initialDoctors,
  initialPatients,
  initialAppointments,
  initialPrescriptions,
  initialInvoices,
  initialStats,
  springBootCodeFiles
} from './src/mockData';
import { Doctor, Patient, Appointment, Prescription, Invoice, DashboardStats } from './src/types';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-Memory Data Repositories (simulating database tables)
  let doctors: Doctor[] = [...initialDoctors];
  let patients: Patient[] = [...initialPatients];
  let appointments: Appointment[] = [...initialAppointments];
  let prescriptions: Prescription[] = [...initialPrescriptions];
  let invoices: Invoice[] = [...initialInvoices];

  // Helper to recompute dashboard KPIs
  function computeStats(): DashboardStats {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(a => a.date === todayStr || a.date === '2026-07-27');
    const todayPatients = patients.filter(p => p.createdAt.startsWith('2026-07-27') || p.status === 'Admitted');
    const availableDocs = doctors.filter(d => d.status === 'Available');
    const pendingAppts = appointments.filter(a => a.status === 'Scheduled');
    const completedAppts = appointments.filter(a => a.status === 'Completed');
    
    const totalRev = invoices
      .filter(i => i.paymentStatus === 'Paid')
      .reduce((sum, i) => sum + i.totalAmount, 0);

    const pendingBills = invoices.filter(i => i.paymentStatus === 'Pending' || i.paymentStatus === 'Overdue');

    return {
      totalPatients: patients.length + 1415,
      todayPatientsCount: todayPatients.length + 20,
      totalDoctors: doctors.length + 18,
      availableDoctorsCount: availableDocs.length + 12,
      totalAppointments: appointments.length + 845,
      todayAppointmentsCount: todayAppointments.length,
      pendingAppointmentsCount: pendingAppts.length,
      completedAppointmentsCount: completedAppts.length,
      totalRevenue: totalRev + 45000,
      pendingBillsCount: pendingBills.length,
      emergencyAlertsCount: patients.filter(p => p.status === 'Critical' || p.status === 'Under Observation').length + 1,
      departmentOccupancy: [
        { department: 'Cardiology', patientCount: 18, capacity: 20 },
        { department: 'Neurology', patientCount: 12, capacity: 15 },
        { department: 'Pediatrics', patientCount: 15, capacity: 18 },
        { department: 'Orthopedics', patientCount: 14, capacity: 16 },
        { department: 'Emergency & ICU', patientCount: 9, capacity: 10 },
      ],
    };
  }

  // ==================== DOCTORS API ====================
  app.get('/api/v1/doctors', (req: Request, res: Response) => {
    const { specialty, status, search } = req.query;
    let result = [...doctors];

    if (specialty && typeof specialty === 'string' && specialty !== 'All') {
      result = result.filter(d => d.specialty.toLowerCase() === specialty.toLowerCase());
    }

    if (status && typeof status === 'string' && status !== 'All') {
      result = result.filter(d => d.status === status);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.specialty.toLowerCase().includes(q) ||
        d.doctorCode.toLowerCase().includes(q) ||
        d.department.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, data: result, count: result.length });
  });

  app.get('/api/v1/doctors/:id', (req: Request, res: Response) => {
    const doc = doctors.find(d => d.id === req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: doc });
  });

  app.post('/api/v1/doctors', (req: Request, res: Response) => {
    const body = req.body;
    const newDoc: Doctor = {
      id: `doc-${Date.now()}`,
      doctorCode: `DOC-${Math.floor(100 + Math.random() * 900)}`,
      name: body.name || 'Dr. New Physician',
      specialty: body.specialty || 'General Medicine',
      department: body.department || 'Internal Medicine',
      qualification: body.qualification || 'MBBS, MD',
      experienceYears: Number(body.experienceYears) || 5,
      phone: body.phone || '+1 (555) 000-0000',
      email: body.email || 'doctor@carepulse.hospital',
      consultationFee: Number(body.consultationFee) || 120,
      roomNumber: body.roomNumber || 'Suite 101',
      availableDays: body.availableDays || ['Mon', 'Wed', 'Fri'],
      availableHours: body.availableHours || '09:00 AM - 02:00 PM',
      status: body.status || 'Available',
      avatarUrl: body.avatarUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80',
      totalConsultations: 0,
      rating: 5.0,
      createdAt: new Date().toISOString(),
    };

    doctors.unshift(newDoc);
    res.status(201).json({ success: true, message: 'Doctor created successfully', data: newDoc });
  });

  app.put('/api/v1/doctors/:id', (req: Request, res: Response) => {
    const idx = doctors.findIndex(d => d.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    doctors[idx] = { ...doctors[idx], ...req.body };
    res.json({ success: true, message: 'Doctor updated successfully', data: doctors[idx] });
  });

  app.delete('/api/v1/doctors/:id', (req: Request, res: Response) => {
    doctors = doctors.filter(d => d.id !== req.params.id);
    res.json({ success: true, message: 'Doctor deleted successfully' });
  });


  // ==================== PATIENTS API ====================
  app.get('/api/v1/patients', (req: Request, res: Response) => {
    const { search, status } = req.query;
    let result = [...patients];

    if (status && typeof status === 'string' && status !== 'All') {
      result = result.filter(p => p.status === status);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.mrn.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        p.bloodGroup.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, data: result, count: result.length });
  });

  app.get('/api/v1/patients/:id', (req: Request, res: Response) => {
    const pat = patients.find(p => p.id === req.params.id);
    if (!pat) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.json({ success: true, data: pat });
  });

  app.post('/api/v1/patients', (req: Request, res: Response) => {
    const body = req.body;
    const count = patients.length + 1;
    const newPatient: Patient = {
      id: `pat-${Date.now()}`,
      mrn: `PAT-2026-${count.toString().padStart(3, '0')}`,
      name: body.name || 'John Doe',
      age: Number(body.age) || 30,
      gender: body.gender || 'Male',
      bloodGroup: body.bloodGroup || 'O+',
      phone: body.phone || '+1 (555) 123-4567',
      email: body.email || 'patient@example.com',
      address: body.address || '123 Hospital Way',
      emergencyContactName: body.emergencyContactName || 'Relative',
      emergencyContactPhone: body.emergencyContactPhone || '+1 (555) 999-9999',
      primaryDoctorId: body.primaryDoctorId || doctors[0]?.id,
      primaryDoctorName: body.primaryDoctorName || doctors[0]?.name,
      status: body.status || 'Outpatient',
      roomNumber: body.roomNumber || '',
      allergies: body.allergies ? (Array.isArray(body.allergies) ? body.allergies : body.allergies.split(',')) : [],
      medicalRecords: body.initialDiagnosis ? [
        {
          id: `mr-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          diagnosis: body.initialDiagnosis,
          doctorName: body.primaryDoctorName || 'Duty Doctor',
          doctorSpecialty: 'General Medicine',
          notes: body.initialNotes || 'Initial registration diagnosis',
          treatment: body.initialTreatment || 'Under observation',
        }
      ] : [],
      createdAt: new Date().toISOString(),
    };

    patients.unshift(newPatient);
    res.status(201).json({ success: true, message: 'Patient registered successfully', data: newPatient });
  });

  app.put('/api/v1/patients/:id', (req: Request, res: Response) => {
    const idx = patients.findIndex(p => p.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    patients[idx] = { ...patients[idx], ...req.body };
    res.json({ success: true, message: 'Patient updated successfully', data: patients[idx] });
  });

  app.delete('/api/v1/patients/:id', (req: Request, res: Response) => {
    patients = patients.filter(p => p.id !== req.params.id);
    res.json({ success: true, message: 'Patient record archived' });
  });


  // ==================== APPOINTMENTS API ====================
  app.get('/api/v1/appointments', (req: Request, res: Response) => {
    const { doctorId, patientId, date, status } = req.query;
    let result = [...appointments];

    if (doctorId && typeof doctorId === 'string') {
      result = result.filter(a => a.doctorId === doctorId);
    }
    if (patientId && typeof patientId === 'string') {
      result = result.filter(a => a.patientId === patientId);
    }
    if (date && typeof date === 'string') {
      result = result.filter(a => a.date === date);
    }
    if (status && typeof status === 'string' && status !== 'All') {
      result = result.filter(a => a.status === status);
    }

    res.json({ success: true, data: result, count: result.length });
  });

  app.post('/api/v1/appointments', (req: Request, res: Response) => {
    const body = req.body;
    const pat = patients.find(p => p.id === body.patientId) || patients[0];
    const doc = doctors.find(d => d.id === body.doctorId) || doctors[0];

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      appointmentCode: `APT-${Math.floor(8000 + Math.random() * 1900)}`,
      patientId: pat.id,
      patientName: pat.name,
      patientPhone: pat.phone,
      doctorId: doc.id,
      doctorName: doc.name,
      doctorSpecialty: doc.specialty,
      date: body.date || new Date().toISOString().split('T')[0],
      timeSlot: body.timeSlot || '10:00 AM',
      type: body.type || 'Consultation',
      priority: body.priority || 'Routine',
      reasonForVisit: body.reasonForVisit || 'General Health Consultation',
      status: 'Scheduled',
      createdAt: new Date().toISOString(),
    };

    appointments.unshift(newApt);
    res.status(201).json({ success: true, message: 'Appointment booked successfully', data: newApt });
  });

  app.put('/api/v1/appointments/:id', (req: Request, res: Response) => {
    const idx = appointments.findIndex(a => a.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    appointments[idx] = { ...appointments[idx], ...req.body };
    res.json({ success: true, message: 'Appointment updated successfully', data: appointments[idx] });
  });

  app.delete('/api/v1/appointments/:id', (req: Request, res: Response) => {
    const idx = appointments.findIndex(a => a.id === req.params.id);
    if (idx !== -1) {
      appointments[idx].status = 'Cancelled';
    }
    res.json({ success: true, message: 'Appointment cancelled' });
  });


  // ==================== PRESCRIPTIONS API ====================
  app.get('/api/v1/prescriptions', (req: Request, res: Response) => {
    const { patientId } = req.query;
    let result = [...prescriptions];
    if (patientId && typeof patientId === 'string') {
      result = result.filter(p => p.patientId === patientId);
    }
    res.json({ success: true, data: result });
  });

  app.post('/api/v1/prescriptions', (req: Request, res: Response) => {
    const body = req.body;
    const newRx: Prescription = {
      id: `rx-${Date.now()}`,
      prescriptionCode: `RX-2026-${Math.floor(100 + Math.random() * 900)}`,
      appointmentId: body.appointmentId || '',
      patientId: body.patientId,
      patientName: body.patientName,
      patientAge: Number(body.patientAge) || 30,
      patientGender: body.patientGender || 'Male',
      doctorId: body.doctorId,
      doctorName: body.doctorName,
      doctorSpecialty: body.doctorSpecialty || 'General Medicine',
      date: new Date().toISOString().split('T')[0],
      diagnosis: body.diagnosis || 'Clinical Checkup',
      symptoms: body.symptoms || '',
      medications: body.medications || [],
      adviceNotes: body.adviceNotes || 'Take rest and drink plenty of water.',
      followUpDate: body.followUpDate || '',
    };

    prescriptions.unshift(newRx);

    // Also attach to patient medical record if patient exists
    const patIdx = patients.findIndex(p => p.id === body.patientId);
    if (patIdx !== -1) {
      patients[patIdx].medicalRecords.unshift({
        id: `mr-${Date.now()}`,
        date: newRx.date,
        diagnosis: newRx.diagnosis,
        doctorName: newRx.doctorName,
        doctorSpecialty: newRx.doctorSpecialty,
        notes: newRx.adviceNotes,
        treatment: `Prescribed ${newRx.medications.length} medication(s).`,
      });
    }

    res.status(201).json({ success: true, message: 'Prescription created', data: newRx });
  });


  // ==================== BILLING / INVOICES API ====================
  app.get('/api/v1/billing', (req: Request, res: Response) => {
    res.json({ success: true, data: invoices });
  });

  app.post('/api/v1/billing', (req: Request, res: Response) => {
    const body = req.body;
    const subtotal = (body.items || []).reduce((acc: number, item: any) => acc + (Number(item.amount) || 0), 0);
    const taxAmount = Number((subtotal * 0.05).toFixed(2));
    const discountAmount = Number(body.discountAmount) || 0;
    const totalAmount = Number((subtotal + taxAmount - discountAmount).toFixed(2));

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceCode: `INV-2026-${Math.floor(500 + Math.random() * 490)}`,
      patientId: body.patientId,
      patientName: body.patientName,
      doctorId: body.doctorId,
      doctorName: body.doctorName,
      items: body.items || [],
      subtotal,
      taxAmount,
      discountAmount,
      totalAmount,
      paymentStatus: body.paymentStatus || 'Pending',
      paymentMethod: body.paymentMethod,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: body.dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    };

    invoices.unshift(newInvoice);
    res.status(201).json({ success: true, message: 'Invoice generated', data: newInvoice });
  });

  app.put('/api/v1/billing/:id/pay', (req: Request, res: Response) => {
    const idx = invoices.findIndex(i => i.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    invoices[idx].paymentStatus = 'Paid';
    invoices[idx].paymentMethod = req.body.paymentMethod || 'Credit Card';
    res.json({ success: true, message: 'Payment recorded', data: invoices[idx] });
  });


  // ==================== STATS API ====================
  app.get('/api/v1/stats', (req: Request, res: Response) => {
    res.json({ success: true, data: computeStats() });
  });


  // ==================== JAVA SPRING BOOT CODE EXPORT API ====================
  app.get('/api/v1/spring-boot-code', (req: Request, res: Response) => {
    res.json({ success: true, data: springBootCodeFiles });
  });


  // Mount Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CarePulse HMS REST API & Vite Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
