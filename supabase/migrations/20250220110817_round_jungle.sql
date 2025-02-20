/*
  # Initial Schema Setup for AAVAAS

  1. New Tables (if not exist)
    - `profiles`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `role` (text)
      - `specialization` (text, nullable)
      - `created_at` (timestamp)
    
    - `appointments`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, references profiles)
      - `therapist_id` (uuid, references profiles)
      - `date` (timestamp)
      - `duration` (interval)
      - `status` (text)
      - `type` (text)
      - `notes` (text, nullable)
      - `created_at` (timestamp)

    - `medical_records`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, references profiles)
      - `record_date` (timestamp)
      - `diagnosis` (text)
      - `treatment_plan` (text)
      - `attachments` (jsonb, nullable)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'profiles') THEN
    CREATE TABLE profiles (
      id uuid PRIMARY KEY REFERENCES auth.users,
      name text NOT NULL,
      email text NOT NULL UNIQUE,
      role text NOT NULL CHECK (role IN ('patient', 'therapist')),
      specialization text,
      created_at timestamptz DEFAULT now()
    );

    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Users can read own profile"
      ON profiles
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);

    CREATE POLICY "Users can update own profile"
      ON profiles
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id);
  END IF;
END $$;

-- Create appointments table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'appointments') THEN
    CREATE TABLE appointments (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      patient_id uuid REFERENCES profiles NOT NULL,
      therapist_id uuid REFERENCES profiles NOT NULL,
      date timestamptz NOT NULL,
      duration interval NOT NULL,
      status text NOT NULL CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')),
      type text NOT NULL CHECK (type IN ('speech', 'audiology')),
      notes text,
      created_at timestamptz DEFAULT now()
    );

    ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Patients can read own appointments"
      ON appointments
      FOR SELECT
      TO authenticated
      USING (auth.uid() = patient_id);

    CREATE POLICY "Therapists can read their appointments"
      ON appointments
      FOR SELECT
      TO authenticated
      USING (auth.uid() = therapist_id);
  END IF;
END $$;

-- Create medical records table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'medical_records') THEN
    CREATE TABLE medical_records (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      patient_id uuid REFERENCES profiles NOT NULL,
      record_date timestamptz NOT NULL,
      diagnosis text NOT NULL,
      treatment_plan text NOT NULL,
      attachments jsonb,
      created_at timestamptz DEFAULT now()
    );

    ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Patients can read own medical records"
      ON medical_records
      FOR SELECT
      TO authenticated
      USING (auth.uid() = patient_id);

    CREATE POLICY "Therapists can read patient medical records"
      ON medical_records
      FOR SELECT
      TO authenticated
      USING (EXISTS (
        SELECT 1 FROM appointments
        WHERE appointments.therapist_id = auth.uid()
        AND appointments.patient_id = medical_records.patient_id
      ));
  END IF;
END $$;