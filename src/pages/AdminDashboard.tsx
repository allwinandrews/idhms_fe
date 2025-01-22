import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import AnalyticsCard from '../components/common/AnalyticsCard';
import CustomButton from '../components/common/CustomButton'; // Reusable button component

const AdminDashboard: React.FC = () => {
    // Dummy state simulating API responses
    const [analytics, setAnalytics] = useState({
        totalUsers: 0,
        totalAppointments: 0,
    });

    useEffect(() => {
        const fetchDummyData = () => {
            const dummyData = {
                totalUsers: 123,
                totalAppointments: 456,
            };
            setAnalytics(dummyData);
        };

        fetchDummyData();
    }, []);


    return (

        <Box p={4}>
            {/* Analytics Section */}
            <Box mb={6}>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    Analytics Summary
                </Typography>
                <Box display="flex" gap={2}>
                    <AnalyticsCard title="Total Users" value={analytics.totalUsers} />
                    <AnalyticsCard title="Total Appointments" value={analytics.totalAppointments} />
                </Box>
            </Box>

            {/* User Management Section */}
            <Box mb={6}>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    User Management
                </Typography>
                <Typography>
                    Manage users, assign roles, and perform other administrative tasks.
                </Typography>
                <CustomButton
                    label="Manage Users"
                    onClick={() => (window.location.href = '/admin/users')}
                    color="primary"
                    variant="contained"
                />
            </Box>

            {/* Appointment Management Section */}
            <Box>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    Appointment Management
                </Typography>
                <Typography>
                    View, create, and manage appointments for all users.
                </Typography>
                <CustomButton
                    label="Manage Appointments"
                    onClick={() => (window.location.href = '/admin/appointments')}
                    color="success"
                    variant="contained"
                />
            </Box>
        </Box>
    );
};

export default AdminDashboard;
