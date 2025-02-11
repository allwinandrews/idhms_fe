import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2'; // ✅ Correct Grid2 import
import { useNavigate } from 'react-router-dom';

import AnalyticsCard from '../components/common/AnalyticsCard';
import CustomButton from '../components/common/CustomButton';

import { fetchAppointments } from '../services/appointmentService';
import { Appointment } from '../assets/types'; // ✅ Import updated types

const ReceptionistDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: Appointment[] = await fetchAppointments('receptionist');
        setAppointments(data);
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
          {/* Appointments Summary */}
          <Box mb={4}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Appointments Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <AnalyticsCard
                  title="Total Appointments"
                  value={appointments.length}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <AnalyticsCard
                  title="Pending Appointments"
                  value={
                    appointments.filter((appt) => appt.status === 'pending')
                      .length
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <AnalyticsCard
                  title="Completed Appointments"
                  value={
                    appointments.filter((appt) => appt.status === 'completed')
                      .length
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <AnalyticsCard
                  title="Missed Appointments"
                  value={
                    appointments.filter((appt) => appt.status === 'missed')
                      .length
                  }
                />
              </Grid>
            </Grid>
          </Box>

          {/* Quick Actions */}
          <Box mb={6}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Quick Actions
            </Typography>
            <Box display="flex" gap={2}>
              <CustomButton
                label="Create Appointment"
                onClick={() => navigate('/receptionist/create-appointment')}
                color="primary"
                variant="contained"
              />
              <CustomButton
                label="Check-In Patients"
                onClick={() => navigate('/receptionist/checkin')}
                color="secondary"
                variant="contained"
              />
              <CustomButton
                label="Generate Reports"
                onClick={() => navigate('/receptionist/reports')}
                color="success"
                variant="contained"
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ReceptionistDashboard;
