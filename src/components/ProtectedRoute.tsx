import React, { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRoles } from '../contexts/RoleContext';

interface ProtectedRouteProps {
    allowedRoles: string[]; // Roles allowed to access this route
    children: JSX.Element; // The component to render if authorized
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const { roles, setCurrentRole, isUrlAccessible } = useRoles(); // Retrieve roles and utilities from context
    const location = useLocation(); // Get the current route
    console.log('roles', roles)

    // Validate if the user has roles
    if (!roles || roles.length === 0) {
        return <Navigate to="/login" replace />; // Redirect to login if no roles are assigned
    }

    // Check if the current route is accessible
    if (!isUrlAccessible(location.pathname)) {
        // Find the first valid role for the user
        const validRole = roles.find((role) => allowedRoles.includes(role));

        if (validRole) {
            // Update currentRole and redirect to its dashboard
            setCurrentRole(validRole);
            return <Navigate to={`/${validRole.toLowerCase()}-dashboard`} replace />;
        }

        // Redirect to login if no valid role exists
        return <Navigate to="/login" replace />;
    }
    // If authorized, render the child component
    return children;
};

export default ProtectedRoute;
