export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          role: 'patient' | 'therapist'
          specialization: string | null
          created_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          role: 'patient' | 'therapist'
          specialization?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'patient' | 'therapist'
          specialization?: string | null
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          therapist_id: string
          date: string
          duration: string
          status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
          type: 'speech' | 'audiology'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          therapist_id: string
          date: string
          duration: string
          status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
          type: 'speech' | 'audiology'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          therapist_id?: string
          date?: string
          duration?: string
          status?: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
          type?: 'speech' | 'audiology'
          notes?: string | null
          created_at?: string
        }
      }
      medical_records: {
        Row: {
          id: string
          patient_id: string
          record_date: string
          diagnosis: string
          treatment_plan: string
          attachments: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          record_date: string
          diagnosis: string
          treatment_plan: string
          attachments?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          record_date?: string
          diagnosis?: string
          treatment_plan?: string
          attachments?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}