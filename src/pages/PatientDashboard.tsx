import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2'; // ✅ Correct MUI Grid2 import
import { useNavigate } from 'react-router-dom';

import AnalyticsCard from '../components/common/AnalyticsCard';
import CustomButton from '../components/common/CustomButton';
import Table from '../components/common/Table';

import { fetchAppointments } from '../services/appointmentService';
import { Appointment } from '../assets/types'; // ✅ Import updated types

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();

  // States for analytics and appointments
  const [analytics, setAnalytics] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
  });

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: Appointment[] = await fetchAppointments('patient');
        if (data) {
          setAppointments(data);

          // Calculate analytics from fetched data
          const totalAppointments = data.length;
          const upcomingAppointments = data.filter(
            (appt) => appt.status === 'Upcoming'
          ).length;

          setAnalytics({ totalAppointments, upcomingAppointments });
        } else {
          setError('Failed to fetch appointment data.');
        }
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Error loading data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  return (
    <Box p={4}>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box textAlign="center">
          <Typography color="error">{error}</Typography>
          <CustomButton
            label="Retry"
            onClick={() => window.location.reload()}
            color="primary"
          />
        </Box>
      ) : (
        <>
          {/* Analytics Section */}
          <Box mb={6}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Analytics Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <AnalyticsCard
                  title="Total Appointments"
                  value={analytics.totalAppointments}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <AnalyticsCard
                  title="Upcoming Appointments"
                  value={analytics.upcomingAppointments}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Book Appointment Section */}
          <Box mb={6}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Book a New Appointment
            </Typography>
            <CustomButton
              label="Book Appointment"
              onClick={() => navigate('/patient/book')}
              color="primary"
              variant="contained"
            />
          </Box>

          {/* Appointments Table */}
          <Box mb={6}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Your Appointments
            </Typography>
            {appointments.length > 0 ? (
              <Table
                columns={[
                  { id: 'id', label: 'ID', width: 50 },
                  {
                    id: 'dentist',
                    label: 'Dentist Name',
                    width: 150,
                    sortable: true,
                    render: (value) =>
                      value && typeof value === 'object' && 'name' in value
                        ? value.name
                        : 'N/A',
                  },
                  { id: 'appointment_type', label: 'Type', width: 120 },
                  { id: 'reason_for_visit', label: 'Reason', width: 200 },
                  {
                    id: 'appointment_date',
                    label: 'Date',
                    width: 100,
                    sortable: true,
                  },
                  {
                    id: 'appointment_time',
                    label: 'Time',
                    width: 100,
                    sortable: true,
                  },
                  { id: 'status', label: 'Status', width: 100, sortable: true },
                ]}
                rows={appointments}
                initialSortColumn="appointment_date"
                filters={{
                  appointment_date: '',
                  appointment_type: '',
                }}
                onFilterChange={(filters) => {
                  console.log('Appointments Filters:', filters);
                }}
              />
            ) : (
              <Typography>No appointments available.</Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default PatientDashboard;
