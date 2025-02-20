export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'therapist';
  specialization?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  therapistId: string;
  date: string;
  duration: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  type: 'speech' | 'audiology';
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  recordDate: string;
  diagnosis: string;
  treatmentPlan: string;
  attachments?: Record<string, any>;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  patientId: string;
  therapistId: string;
  medication: string;
  dosage: string;
  instructions?: string;
  validUntil: string;
}

export interface Exercise {
  id: string;
  patientId: string;
  therapistId: string;
  title: string;
  description: string;
  instructions?: string;
  videoUrl?: string;
  frequency?: string;
  duration?: string;
}

export interface ProgressNote {
  id: string;
  appointmentId: string;
  patientId: string;
  therapistId: string;
  notes: string;
  progressRating: number;
}

export interface Payment {
  id: string;
  appointmentId: string;
  patientId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod?: string;
  transactionId?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file';
}