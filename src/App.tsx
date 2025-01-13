import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import DentistDashboard from './pages/DentistDashboard';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import PatientDashboard from './pages/PatientDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { useRoles } from './contexts/RoleContext';

const AppContent = () => {
  const location = useLocation();


  const { roles } = useRoles(); // Retrieve roles from context

  // Determine the default dashboard route based on the first role
  const defaultDashboard = roles && roles.length > 0 ? `/${roles[0].toLowerCase()}-dashboard` : '/login';

  return (
    <>
      {/* Conditionally render Navbar */}
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to={defaultDashboard} />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Dentist Dashboard */}
        <Route
          path="/dentist-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Dentist']}>
              <DentistDashboard />
            </ProtectedRoute>
          }
        />

        {/* Receptionist Dashboard */}
        <Route
          path="/receptionist-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Receptionist']}>
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />

        {/* Patient Dashboard */}
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

