import React, { useEffect, useState, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { roleUrls } from './assets/roleUrls';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Layout from './components/layouts/Layout';
import Sidebar from './components/common/Sidebar';
import { RoleKeys } from './assets/types';

import { Provider } from 'react-redux';
import store from './store/store';
import { useAppDispatch, useAppSelector } from './store/store';
import {
  setCurrentRole,
  selectRoles,
  selectCurrentRole,
} from './store/slices/roleSlice';

// Static imports (no lazy loading)
import AdminDashboard from './pages/AdminDashboard';
import DentistDashboard from './pages/DentistDashboard';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Appointments from './pages/Appointments';

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const dispatch = useAppDispatch();
  const roles = useAppSelector(selectRoles);
  const currentRole = useAppSelector(selectCurrentRole);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roles !== null) {
      setLoading(false);
    }
  }, [roles]);

  const defaultDashboard = useMemo(() => {
    console.log('roles', roles);

    // if (!roles || roles.length === 0) return '/login1';
    if (!roles || roles.length === 0) return '/login';

    const normalizedCurrentRole = currentRole
      ? (currentRole.toLowerCase() as RoleKeys)
      : null;

    if (normalizedCurrentRole && roleUrls.roleBased[normalizedCurrentRole]) {
      return roleUrls.roleBased[normalizedCurrentRole]?.[0]?.path || '/login';
      // return roleUrls.roleBased[normalizedCurrentRole]?.[0]?.path || '/login2';
    }

    const fallbackRole =
      roles.length > 0 ? (roles[0].toLowerCase() as RoleKeys) : null;

    return fallbackRole && roleUrls.roleBased[fallbackRole]
      ? roleUrls.roleBased[fallbackRole]?.[0]?.path || '/login'
      : '/login';
    // ? roleUrls.roleBased[fallbackRole]?.[0]?.path || '/login3'
    // : '/login4';
  }, [currentRole, roles]);

  useEffect(() => {
    if (!roles) return;

    const normalizedRoles = roles.map((role) => role.toLowerCase() as RoleKeys);
    const normalizedCurrentRole = currentRole
      ? (currentRole.toLowerCase() as RoleKeys)
      : null;

    const roleFromUrl = Object.keys(roleUrls.roleBased).find((role) =>
      roleUrls.roleBased[role as RoleKeys]?.some(
        (link) => link.path === location.pathname
      )
    ) as RoleKeys | undefined;

    if (roleFromUrl && normalizedRoles.includes(roleFromUrl)) {
      if (roleFromUrl !== normalizedCurrentRole) {
        dispatch(setCurrentRole(roleFromUrl as RoleKeys));
      }
    } else if (roleFromUrl && !normalizedRoles.includes(roleFromUrl)) {
      navigate('/login', { replace: true });
      // navigate('/login5', { replace: true });
    }
  }, [location.pathname, currentRole, roles, navigate]);

  const roleBasedRoutes = useMemo(() => {
    return roles
      ? roles.flatMap(
          (role) =>
            roleUrls.roleBased[role.toLowerCase() as RoleKeys]?.map(
              (link) => link.path
            ) || []
        )
      : [];
  }, [roles]);

  const routeComponentMap: Record<string, React.FC> = {
    '/admin-dashboard': AdminDashboard,
    '/dentist-dashboard': DentistDashboard,
    '/receptionist-dashboard': ReceptionistDashboard,
    '/patient-dashboard': PatientDashboard,
    '/appointments': Appointments,
  };

  const sidebarLinks = useMemo(() => {
    return currentRole &&
      roleUrls.roleBased[currentRole.toLowerCase() as RoleKeys]
      ? roleUrls.roleBased[currentRole.toLowerCase() as RoleKeys].map(
          ({ path, name }) => ({
            path,
            label: name,
          })
        )
      : [];
  }, [currentRole]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {location.pathname !== '/login' && (
        <Navbar toggleSidebar={toggleSidebar} />
      )}
      <Routes>
        <Route path="/" element={<Navigate to={defaultDashboard} />} />
        <Route path="/login" element={<Login />} />

        {roleBasedRoutes.map((route) => {
          const Component =
            routeComponentMap[route] || (() => <div>Component Not Found</div>);
          const allowedRoles = Object.keys(roleUrls.roleBased).filter((role) =>
            roleUrls.roleBased[role as RoleKeys]?.some(
              (link) => link.path === route
            )
          ) as RoleKeys[];

          const routeTitle =
            sidebarLinks.find((link) => link.path === route)?.label ||
            'Dashboard';

          return (
            <Route
              key={route}
              path={route}
              element={
                <ProtectedRoute allowedRoles={allowedRoles}>
                  <Layout
                    title={routeTitle}
                    sidebar={
                      <Sidebar
                        links={sidebarLinks}
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                      />
                    }
                  >
                    <Component />
                  </Layout>
                </ProtectedRoute>
              }
            />
          );
        })}
        <Route path="*" element={<Navigate to={defaultDashboard} />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <Router>
      <AppContent />
    </Router>
  </Provider>
);

export default App;
