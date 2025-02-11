import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import AnalyticsCard from '../components/common/AnalyticsCard';
import CustomButton from '../components/common/CustomButton';
import { fetchAdminAnalytics } from '../services/adminService';
import { AdminAnalyticsResponse } from '../assets/types';

const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AdminAnalyticsResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const loadAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminAnalytics();
      if (data) {
        setAnalytics(data);
      } else {
        setError('Failed to fetch analytics data.');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Error loading data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
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
          <CustomButton label="Retry" onClick={loadAnalytics} color="primary" />
        </Box>
      ) : analytics ? (
        <>
          {/* Analytics Summary */}
          <Box mb={4}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Analytics Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <AnalyticsCard
                  title="Total Users"
                  value={analytics?.total_users ?? 0}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <AnalyticsCard
                  title="Active Users"
                  value={analytics?.active_users ?? 0}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <AnalyticsCard
                  title="Total Appointments"
                  value={analytics?.total_appointments ?? 0}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <AnalyticsCard
                  title="Completed Appointments"
                  value={analytics?.appointment_statuses?.completed ?? 0}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Users by Role */}
          <Box mb={4}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Users by Role
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(analytics.users_by_role).map(([role, count]) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={role}>
                  <AnalyticsCard
                    title={role.charAt(0).toUpperCase() + role.slice(1)}
                    value={count as number}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* User Growth */}
          <Box mb={4}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              User Growth (Last 7 Days)
            </Typography>
            <Card>
              <CardContent>
                {analytics.user_growth_last_7_days.map((entry) => (
                  <Typography key={entry.date}>
                    {entry.date} ({entry.new_users})
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Box>

          {/* Most Active Users */}
          <Box mb={4}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Most Active Users
            </Typography>
            <Card>
              <CardContent>
                {analytics.most_active_users.map((user) => (
                  <Typography key={user.name}>
                    {user.name} (Last Login: {user.last_login})
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Box>

          {/* Top Dentists by Appointments */}
          <Box mb={4}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Top Dentists by Appointments
            </Typography>
            <Card>
              <CardContent>
                {analytics.top_dentists_by_appointments.map((dentist) => (
                  <Typography key={dentist.name}>
                    {dentist.name} ({dentist.appointments})
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Box>

          {/* Navigation Buttons */}
          <Box display="flex" gap={2}>
            <CustomButton
              label="Manage Users"
              onClick={() => navigate('/admin/users')}
              color="primary"
              variant="contained"
            />
            <CustomButton
              label="Manage Appointments"
              onClick={() => navigate('/admin/appointments')}
              color="success"
              variant="contained"
            />
          </Box>
        </>
      ) : (
        <Typography>No analytics data available.</Typography>
      )}
    </Box>
  );
};

export default AdminDashboard;
