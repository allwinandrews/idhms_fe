import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import AnalyticsCard from '../components/common/AnalyticsCard';
import CustomButton from '../components/common/CustomButton';
import Table from '../components/common/Table';

interface Appointment {
    id: number;
    patientName: string;
    date: string;
    time: string;
}

const DentistDashboard: React.FC = () => {
    // State for analytics
    const [analytics, setAnalytics] = useState({
        totalAppointmentsToday: 0,
        totalAppointmentsWeek: 0,
        totalPatients: 0,
    });

    // State for appointments
    const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);

    // Simulate API calls for analytics and appointments
    useEffect(() => {
        const fetchAnalytics = () => {
            // Simulated analytics data
            const dummyAnalytics = {
                totalAppointmentsToday: 5,
                totalAppointmentsWeek: 20,
                totalPatients: 50,
            };
            setAnalytics(dummyAnalytics);
        };

        const fetchUpcomingAppointments = () => {
            // Simulated appointments data
            const dummyAppointments = [
                { id: 1, patientName: 'John Doe', date: '2025-01-20', time: '10:00 AM' },
                { id: 2, patientName: 'Jane Smith', date: '2025-01-20', time: '11:00 AM' },
                { id: 3, patientName: 'Alice Johnson', date: '2025-01-21', time: '09:30 AM' },
            ];
            setUpcomingAppointments(dummyAppointments);
        };

        fetchAnalytics();
        fetchUpcomingAppointments();
    }, []);

    return (
        <Box p={4}>
            {/* Analytics Section */}
            <Box mb={6}>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    Analytics Summary
                </Typography>
                <Box display="flex" gap={2}>
                    <AnalyticsCard title="Appointments Today" value={analytics.totalAppointmentsToday} />
                    <AnalyticsCard title="Appointments This Week" value={analytics.totalAppointmentsWeek} />
                    <AnalyticsCard title="Total Patients" value={analytics.totalPatients} />
                </Box>
            </Box>

            {/* Upcoming Appointments Section */}
            <Box mb={6}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" fontWeight="bold">
                        Upcoming Appointments                    </Typography>
                    {/* Quick Actions */}
                    <Box display="flex" gap={2}>
                        <CustomButton
                            label="Create Appointment"
                            onClick={() => alert('Create Appointment')}
                            color="primary"
                            variant="contained"
                        />
                        <CustomButton
                            label="Check-In Patient"
                            onClick={() => alert('Check-In Patient')}
                            color="secondary"
                            variant="contained"
                        />
                        <CustomButton
                            label="Generate Reports"
                            onClick={() => alert('Generate Reports')}
                            color="success"
                            variant="contained"
                        />
                    </Box>
                </Box>
                {upcomingAppointments.length > 0 ? (
                    <Table<Appointment>
                        columns={[
                            { id: 'id', label: 'ID', width: 50 },
                            { id: 'patientName', label: 'Patient Name', sortable: true },
                            { id: 'date', label: 'Date', sortable: true },
                            { id: 'time', label: 'Time', sortable: true },
                        ]}
                        rows={upcomingAppointments}
                        initialSortColumn="date"
                        filters={{
                            patientName: '', // Default filter value for patientName
                            date: '',        // Default filter value for date
                        }}
                        onFilterChange={(filters) => {
                            console.log('Upcoming Appointments Filters:', filters);
                            // Handle filter updates for upcoming appointments
                        }}
                    />
                ) : (
                    <Typography>No upcoming appointments.</Typography>
                )}

            </Box>
        </Box>
    );
};

export default DentistDashboard;
