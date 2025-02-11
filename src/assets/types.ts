import { RegisterOptions } from 'react-hook-form';
import { ButtonProps, SelectProps, TextFieldProps } from '@mui/material';

export type RoleKeys = 'admin' | 'dentist' | 'receptionist' | 'patient';

export interface Column<T> {
  id: keyof T;
  label: string;
  width?: number;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface Route {
  path: string;
  name: string;
}

export interface RoleBasedRoutes {
  admin: Route[];
  dentist: Route[];
  receptionist: Route[];
  patient: Route[];
}

export type FieldType =
  | 'text'
  | 'dropdown'
  | 'button'
  | 'checkbox'
  | 'radio'
  | 'date';

export interface FieldConfig {
  type: FieldType;
  name: string;
  label?: string;
  options?: { value: string | number; label: string }[];
  validation?: RegisterOptions; // Validation rules for react-hook-form
  muiProps?: Partial<TextFieldProps | SelectProps | ButtonProps>; // Material-UI props
  action?: () => void; // Button-specific actions
}

export interface AdminAnalyticsResponse {
  total_users: number;
  active_users: number;
  users_by_role: {
    admin: number;
    dentist: number;
    receptionist: number;
    patient: number;
  };
  total_appointments: number;
  appointment_statuses: {
    completed: number;
    pending: number;
    canceled: number;
  };
  user_growth_last_7_days: { date: string; new_users: number }[];
  most_active_users: { name: string; last_login: number }[];
  top_dentists_by_appointments: { name: string; appointments: number }[];
}

// Define Patient and Dentist Interfaces
export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string; // ✅ Added DOB for age tracking
  gender: 'male' | 'female' | 'other'; // ✅ Needed for medical classification
  address: string; // ✅ Added for proper patient records
  emergency_contact: { name: string; phone: string }; // ✅ In case of an emergency
  insurance_provider?: string; // ✅ Optional, for billing & insurance processing
  medical_history?: string[]; // ✅ Past health conditions, allergies, surgeries
}

export interface Dentist {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  license_number: string; // ✅ Required for verification
  years_of_experience: number; // ✅ Helps patients choose experienced dentists
  clinic_address: string; // ✅ Where the dentist operates
  available_slots?: { date: string; time: string }[]; // ✅ Helps with scheduling
}

// Updated Appointment Interface
export interface Appointment {
  id: number;
  patient: Patient; // ✅ Stores patient details
  dentist: Dentist; // ✅ Stores dentist details
  appointment_date: string;
  appointment_time: string;
  appointment_type: 'checkup' | 'surgery' | 'consultation'; // ✅ Type of appointment
  reason_for_visit: string; // ✅ Why the patient booked this appointment
  status: string;
  notes?: string; // ✅ Dentist can record any details post-appointment
  created_at: string; // ✅ Tracks when the appointment was scheduled
  updated_at?: string; // ✅ Tracks modifications
}
