import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import AnalyticsCard from '../components/common/AnalyticsCard';
import Table from '../components/common/Table';
import CustomButton from '../components/common/CustomButton';

// Define the type for an appointment
interface Appointment {
    id: number;
    doctorName: string;
    date: string;
    time: string;
    status: string;
}

const PatientDashboard: React.FC = () => {
    // States for analytics and appointments
    const [analytics, setAnalytics] = useState({
        totalAppointments: 0,
        upcomingAppointments: 0,
    });
    const [appointments, setAppointments] = useState<Appointment[]>([]); // Explicitly typed

    useEffect(() => {
        // Simulate fetching analytics and appointment data
        const fetchDummyData = () => {
            // Simulated API response for analytics
            const dummyAnalytics = {
                totalAppointments: 15,
                upcomingAppointments: 5,
            };

            // Simulated API response for appointments
            const dummyAppointments: Appointment[] = [
                { id: 1, doctorName: 'Dr. Smith', date: '2025-01-20', time: '10:00 AM', status: 'Upcoming' },
                { id: 2, doctorName: 'Dr. Johnson', date: '2025-01-15', time: '2:00 PM', status: 'Completed' },
            ];

            // Update states with fetched data
            setAnalytics(dummyAnalytics);
            setAppointments(dummyAppointments);
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
                    <AnalyticsCard title="Total Appointments" value={analytics.totalAppointments} />
                    <AnalyticsCard title="Upcoming Appointments" value={analytics.upcomingAppointments} />
                </Box>
            </Box>

            {/* Appointment Table */}
            <Box mb={6}>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    Upcoming and Past Appointments
                </Typography>
                {appointments.length > 0 ? (
                    <Table
                        columns={[
                            { id: 'id', label: 'ID', width: 50 },
                            { id: 'doctorName', label: 'Doctor Name', width: 150 },
                            { id: 'date', label: 'Date', width: 100, sortable: true },
                            { id: 'time', label: 'Time', width: 100, sortable: true },
                            { id: 'status', label: 'Status', width: 100, sortable: true },
                        ]}
                        rows={appointments}
                        initialSortColumn="date"
                        initialSortDirection="asc"
                        filters={{
                            doctorName: '', // Default filter value for doctorName
                            status: '',     // Default filter value for status
                            date: '',       // Default filter value for date
                        }}
                        onFilterChange={(filters) => {
                            console.log('Appointments Filters:', filters);
                            // Handle filter updates for all appointments
                        }}
                    />
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No appointments available.
                    </Typography>
                )}
            </Box>

            {/* Book Appointment Section */}
            <Box>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    Book a New Appointment
                </Typography>
                <CustomButton
                    label="Book Appointment"
                    onClick={() => (window.location.href = '/patient/book')}
                    color="primary"
                    variant="contained"
                />
            </Box>
        </Box>
    );
};

export default PatientDashboard;
