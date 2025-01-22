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
    status: string;
}

const ReceptionistDashboard: React.FC = () => {
    // State for analytics
    const [analytics, setAnalytics] = useState({
        appointmentsToday: 0,
        pendingCheckIns: 0,
        missedAppointments: 0,
    });

    // State for appointments
    const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);

    // Simulate API calls for analytics and appointments
    useEffect(() => {
        const fetchAnalytics = () => {
            const dummyAnalytics = {
                appointmentsToday: 10,
                pendingCheckIns: 4,
                missedAppointments: 1,
            };
            setAnalytics(dummyAnalytics);
        };

        const fetchTodayAppointments = () => {
            const dummyAppointments = [
                { id: 1, patientName: 'John Doe', date: '2025-01-20', time: '10:00 AM', status: 'Pending Check-In' },
                { id: 2, patientName: 'Jane Smith', date: '2025-01-20', time: '11:00 AM', status: 'Pending Check-In' },
                { id: 3, patientName: 'Alice Johnson', date: '2025-01-20', time: '12:30 PM', status: 'Completed' },
            ];
            setTodayAppointments(dummyAppointments);
        };

        fetchAnalytics();
        fetchTodayAppointments();
    }, []);

    return (
        <Box p={4}>
            {/* Analytics Section */}
            <Box mb={6}>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    Analytics Summary
                </Typography>
                <Box display="flex" gap={2}>
                    <AnalyticsCard title="Appointments Today" value={analytics.appointmentsToday} />
                    <AnalyticsCard title="Pending Check-Ins" value={analytics.pendingCheckIns} />
                    <AnalyticsCard title="Missed Appointments" value={analytics.missedAppointments} />
                </Box>
            </Box>

            {/* Today's Appointments Section */}
            <Box mb={6}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" fontWeight="bold">
                        Upcoming Appointments
                    </Typography>
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
                {todayAppointments.length > 0 ? (
                    <Table<Appointment>
                        columns={[
                            { id: 'id', label: 'ID', width: 50 },
                            { id: 'patientName', label: 'Patient Name', sortable: true },
                            { id: 'time', label: 'Time', sortable: true },
                            { id: 'status', label: 'Status', sortable: true },
                        ]}
                        rows={todayAppointments}
                        initialSortColumn="time"
                        filters={{
                            patientName: '', // Default filter values for columns
                            status: '',
                        }}
                        onFilterChange={(filters) => {
                            console.log('Filters changed:', filters);
                            // You can use the filters here to update the state or perform any custom action
                        }}
                    />
                ) : (
                    <Typography>No appointments available today.</Typography>
                )}

            </Box>
        </Box>
    );
};

export default ReceptionistDashboard;
