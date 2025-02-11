import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import Grid from '@mui/material/Grid2'; // ✅ Correct Grid2 import
import { useNavigate } from 'react-router-dom';

import AnalyticsCard from '../components/common/AnalyticsCard';
import CustomButton from '../components/common/CustomButton';

import { fetchAppointments } from '../services/appointmentService';
import { Appointment } from '../assets/types'; // ✅ Import updated types

const DentistDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState({
    totalAppointmentsToday: 0,
    totalAppointmentsWeek: 0,
    totalPatients: 0,
    pendingFollowUps: 0,
  });

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: Appointment[] = await fetchAppointments('dentist');
        setAppointments(data);

        // Calculate analytics from fetched data
        const today = new Date().toISOString().split('T')[0];
        const totalAppointmentsToday = data.filter(
          (appt) => appt.appointment_date === today
        ).length;
        const totalAppointmentsWeek = data.length;
        const totalPatients = new Set(data.map((appt) => appt.patient.id)).size;
        const pendingFollowUps = data.filter(
          (appt) => appt.status === 'Follow-Up Required'
        ).length;

        setAnalytics({
          totalAppointmentsToday,
          totalAppointmentsWeek,
          totalPatients,
          pendingFollowUps,
        });
      } catch (err) {
        console.error('Error loading appointments:', err);
        setError('Error loading appointments. Please try again.');
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
          {/* Analytics Summary */}
          <Box mb={6}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Analytics Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <AnalyticsCard
                  title="Appointments Today"
                  value={analytics.totalAppointmentsToday}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <AnalyticsCard
                  title="Appointments This Week"
                  value={analytics.totalAppointmentsWeek}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <AnalyticsCard
                  title="Total Patients"
                  value={analytics.totalPatients}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <AnalyticsCard
                  title="Pending Follow-Ups"
                  value={analytics.pendingFollowUps}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Upcoming Appointments */}
          <Box mb={6}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Today&apos;s Appointments
            </Typography>
            <Card>
              <CardContent>
                {appointments.length > 0 ? (
                  appointments
                    .filter(
                      (appt) =>
                        appt.appointment_date ===
                        new Date().toISOString().split('T')[0]
                    )
                    .map((appt) => (
                      <Typography key={appt.id}>
                        {appt.patient.name} - {appt.appointment_time} -{' '}
                        {appt.status}
                      </Typography>
                    ))
                ) : (
                  <Typography>No appointments scheduled for today.</Typography>
                )}
              </CardContent>
            </Card>
          </Box>

          {/* Quick Actions */}
          <Box mb={6}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Quick Actions
            </Typography>
            <Box display="flex" gap={2}>
              <CustomButton
                label="Create Appointment"
                onClick={() => navigate('/dentist/create-appointment')}
                color="primary"
                variant="contained"
              />
              <CustomButton
                label="Check-In Patients"
                onClick={() => navigate('/dentist/checkin')}
                color="secondary"
                variant="contained"
              />
              <CustomButton
                label="Generate Reports"
                onClick={() => navigate('/dentist/reports')}
                color="success"
                variant="contained"
              />
            </Box>
          </Box>

          {/* Follow-Up Appointments */}
          <Box mb={6}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Follow-Up Appointments
            </Typography>
            <Card>
              <CardContent>
                {appointments.length > 0 ? (
                  appointments
                    .filter((appt) => appt.status === 'Follow-Up Required')
                    .map((appt) => (
                      <Typography key={appt.id}>
                        {appt.patient.name} - {appt.appointment_date} -{' '}
                        {appt.appointment_time}
                      </Typography>
                    ))
                ) : (
                  <Typography>No follow-up appointments pending.</Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DentistDashboard;
