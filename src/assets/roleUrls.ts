import { Route, RoleBasedRoutes } from './types';

export const roleUrls: {
  global: Route[];
  roleBased: RoleBasedRoutes;
} = {
  global: [
    { path: '/login', name: 'Login' },
    { path: '/logout', name: 'Logout' },
    { path: '/register', name: 'Register' },
    { path: '/forgot-password', name: 'Forgot Password' },
    { path: '/profile', name: 'Profile' },
    { path: '/settings', name: 'Settings' },
    { path: '/appointments', name: 'Appointments' },
  ],
  roleBased: {
    admin: [
      { path: '/admin-dashboard', name: 'Admin Dashboard' },
      { path: '/admin/users', name: 'User Management' },
      // { path: '/admin/appointments', name: 'Appointment Management' },
      { path: '/admin/reports', name: 'Reports' },
      { path: '/admin/settings', name: 'Settings' },
    ],
    dentist: [
      { path: '/dentist-dashboard', name: 'Dentist Dashboard' },
      { path: '/dentist/patients', name: 'patient Records' },
      // { path: '/dentist/appointments', name: 'Appointments' },
      { path: '/dentist/reports', name: 'Reports' },
      { path: '/dentist/settings', name: 'Settings' },
    ],
    receptionist: [
      { path: '/receptionist-dashboard', name: 'Receptionist Dashboard' },
      // { path: '/receptionist/appointments', name: 'Manage Appointments' },
      { path: '/receptionist/book', name: 'Book Appointment' },
      { path: '/receptionist/reports', name: 'Reports' },
      { path: '/receptionist/settings', name: 'Settings' },
    ],
    patient: [
      { path: '/patient-dashboard', name: 'Patient Dashboard' },
      // { path: '/patient/appointments', name: 'View Appointments' },
      { path: '/patient/book', name: 'Book Appointment' },
      { path: '/patient/reports', name: 'Reports' },
      { path: '/patient/settings', name: 'Settings' },
    ],
  },
};
