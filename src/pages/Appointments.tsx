import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Table from '../components/common/Table';
import { fetchAppointments } from '../services/appointmentService';
import { useAppSelector } from '../store/store'; // Get user role from Redux
import { Appointment, Column } from '../assets/types';

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userRole = useAppSelector((state) => state.role.currentRole); // Get user role from Redux store

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: Appointment[] = await fetchAppointments(userRole); // Fetch all appointments
        setAppointments(data);
      } catch (err) {
        console.error('Error loading appointments:', err);
        setError('Error loading appointments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [userRole]);

  // Define columns based on user role

  const getColumns = (): Column<Appointment>[] => {
    if (userRole === 'admin' || userRole === 'receptionist') {
      return [
        { id: 'id' as keyof Appointment, label: 'ID', width: 50 },
        {
          id: 'patient' as keyof Appointment,
          label: 'Patient Name',
          width: 150,
          sortable: true,
          render: (value) =>
            value && typeof value === 'object' && 'name' in value
              ? value.name
              : 'N/A', // ✅ Type-safe check
        },
        {
          id: 'dentist' as keyof Appointment,
          label: 'Dentist Name',
          width: 150,
          sortable: true,
          render: (value) =>
            value && typeof value === 'object' && 'name' in value
              ? value.name
              : 'N/A', // ✅ Type-safe check
        },
        {
          id: 'appointment_type' as keyof Appointment,
          label: 'Type',
          width: 120,
        },
        {
          id: 'reason_for_visit' as keyof Appointment,
          label: 'Reason',
          width: 200,
        },
        {
          id: 'appointment_date' as keyof Appointment,
          label: 'Date',
          width: 100,
          sortable: true,
        },
        {
          id: 'appointment_time' as keyof Appointment,
          label: 'Time',
          width: 100,
          sortable: true,
        },
        {
          id: 'status' as keyof Appointment,
          label: 'Status',
          width: 100,
          sortable: true,
        },
        {
          id: 'created_at' as keyof Appointment,
          label: 'Created At',
          width: 150,
        },
      ];
    }
    if (userRole === 'dentist') {
      return [
        { id: 'id' as keyof Appointment, label: 'ID', width: 50 },
        {
          id: 'patient' as keyof Appointment,
          label: 'Patient Name',
          width: 150,
          sortable: true,
          render: (value) =>
            value && typeof value === 'object' && 'name' in value
              ? value.name
              : 'N/A', // ✅ Type-safe check
        },
        {
          id: 'appointment_type' as keyof Appointment,
          label: 'Type',
          width: 120,
        },
        {
          id: 'reason_for_visit' as keyof Appointment,
          label: 'Reason',
          width: 200,
        },
        {
          id: 'appointment_date' as keyof Appointment,
          label: 'Date',
          width: 100,
          sortable: true,
        },
        {
          id: 'appointment_time' as keyof Appointment,
          label: 'Time',
          width: 100,
          sortable: true,
        },
        {
          id: 'status' as keyof Appointment,
          label: 'Status',
          width: 100,
          sortable: true,
        },
        {
          id: 'notes' as keyof Appointment,
          label: 'Dentist Notes',
          width: 200,
        },
      ];
    }
    if (userRole === 'patient') {
      return [
        { id: 'id' as keyof Appointment, label: 'ID', width: 50 },
        {
          id: 'dentist' as keyof Appointment,
          label: 'Dentist Name',
          width: 150,
          sortable: true,
          render: (value) =>
            value && typeof value === 'object' && 'name' in value
              ? value.name
              : 'N/A', // ✅ Type-safe check
        },
        {
          id: 'appointment_type' as keyof Appointment,
          label: 'Type',
          width: 120,
        },
        {
          id: 'reason_for_visit' as keyof Appointment,
          label: 'Reason',
          width: 200,
        },
        {
          id: 'appointment_date' as keyof Appointment,
          label: 'Date',
          width: 100,
          sortable: true,
        },
        {
          id: 'appointment_time' as keyof Appointment,
          label: 'Time',
          width: 100,
          sortable: true,
        },
        {
          id: 'status' as keyof Appointment,
          label: 'Status',
          width: 100,
          sortable: true,
        },
      ];
    }
    return [];
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Appointments
      </Typography>

      {loading ? (
        <Typography>Loading appointments...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : appointments.length > 0 ? (
        <Table<Appointment>
          columns={getColumns()}
          rows={appointments}
          initialSortColumn="appointment_date"
          filters={{
            appointment_date: '',
          }}
          onFilterChange={(filters) => {
            console.log('Appointments Filters:', filters);
          }}
        />
      ) : (
        <Typography>No appointments available.</Typography>
      )}
    </Box>
  );
};

export default Appointments;
