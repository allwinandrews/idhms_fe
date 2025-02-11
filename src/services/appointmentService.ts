import { apiGet, apiPost, apiPut, apiDelete } from './api';
import backendUrls from '../assets/backendUrls';
import { Appointment } from '../assets/types';

/**
 * Fetch appointments based on user role.
 * @param role - The role of the user (e.g., "admin", "dentist", "receptionist", "patient").
 * @returns Promise<Appointment[]>
 */
export const fetchAppointments = async (
  role: string
): Promise<Appointment[]> => {
  const url = `${backendUrls.appointments.list}?role=${role}`; // ✅ Append role dynamically
  return await apiGet(url);
};

/**
 * Fetch a specific appointment by ID
 */
export const fetchAppointmentById = async (
  id: number
): Promise<Appointment> => {
  return await apiGet(backendUrls.appointments.getById(id));
};

/**
 * Create a new appointment
 */
export const createAppointment = async (
  appointmentData: Partial<Appointment>
): Promise<Appointment> => {
  return await apiPost(backendUrls.appointments.list, appointmentData);
};

/**
 * Update an appointment
 */
export const updateAppointment = async (
  id: number,
  updatedData: Partial<Appointment>
): Promise<Appointment> => {
  return await apiPut(backendUrls.appointments.getById(id), updatedData);
};

/**
 * Delete an appointment
 */
export const deleteAppointment = async (id: number): Promise<void> => {
  return await apiDelete(backendUrls.appointments.getById(id));
};
