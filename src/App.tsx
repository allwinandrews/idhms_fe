import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { roleUrls } from './assets/roleUrls'; // Import role-to-URL mapping
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import DentistDashboard from './pages/DentistDashboard';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import PatientDashboard from './pages/PatientDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Layout from './components/layouts/Layout';
import Sidebar from './components/common/Sidebar';
import { useRoles } from './contexts/RoleContext';
import { RoleKeys } from './assets/types';

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const { roles, currentRole, setCurrentRole } = useRoles();

  // Determine the default dashboard route based on the first role
  const defaultDashboard = currentRole
    ? roleUrls.roleBased[currentRole as RoleKeys]?.[0]?.path || '/login'
    : '/login';

  // Synchronize currentRole with the URL on route change
  useEffect(() => {
    const roleFromUrl = Object.keys(roleUrls.roleBased).find((role) =>
      roleUrls.roleBased[role as RoleKeys]?.some((link) => link.path === location.pathname)
    ) as RoleKeys;

    if (roleFromUrl && roles?.includes(roleFromUrl)) {
      if (roleFromUrl !== currentRole) {
        setCurrentRole(roleFromUrl); // Update currentRole in context
      }
    } else if (roleFromUrl && !roles?.includes(roleFromUrl)) {
      // Redirect to default dashboard if the role doesn't match
      navigate(defaultDashboard, { replace: true });
    }
  }, [location.pathname, currentRole, roles, setCurrentRole]);

  // Generate role-based routes dynamically
  const generateRoutes = () => {
    console.log('roles', roles)
    const allowedRoutes = roles
      ? roles.flatMap((role) =>
        roleUrls.roleBased[role as RoleKeys]?.map((link) => link.path) || []
      )
      : [];
    return Array.from(new Set(allowedRoutes)); // Remove duplicates
  };

  const roleBasedRoutes = generateRoutes();

  // Map routes to their respective components
  const routeComponentMap: Record<string, React.FC> = {
    '/admin-dashboard': AdminDashboard,
    '/dentist-dashboard': DentistDashboard,
    '/receptionist-dashboard': ReceptionistDashboard,
    '/patient-dashboard': PatientDashboard,
  };

  // Generate sidebar links based on the current role
  const sidebarLinks = currentRole
    ? roleUrls.roleBased[currentRole as RoleKeys]?.map(({ path, name }) => ({
      path,
      label: name,
    })) || []
    : [];
  console.log('roleBasedRoutes', roleBasedRoutes)
  return (
    <>
      {/* Conditionally render Navbar */}
      {location.pathname !== '/login' && <Navbar toggleSidebar={toggleSidebar} />}

      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to={defaultDashboard} />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Role-Based Routes */}
        {roleBasedRoutes.map((route) => {
          const Component = routeComponentMap[route];
          const allowedRoles = Object.keys(roleUrls.roleBased).filter((role) =>
            roleUrls.roleBased[role as RoleKeys]?.some((link) => link.path === route)
          );

          const routeTitle =
            sidebarLinks.find((link) => link.path === route)?.label || 'Dashboard';

          return (
            <Route
              key={route}
              path={route}
              element={
                <ProtectedRoute allowedRoles={allowedRoles}>
                  <Layout
                    title={routeTitle} // Dynamic title from `roleUrls.json`
                    sidebar={
                      <Sidebar
                        links={sidebarLinks}
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                      />
                    }
                    className="custom-dashboard-layout"
                  >
                    {/* Render the mapped component or fallback to login */}
                    {Component ? <Component /> : <Navigate to="/login" />}
                  </Layout>
                </ProtectedRoute>
              }
            />
          );
        })}


        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to={defaultDashboard} />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
