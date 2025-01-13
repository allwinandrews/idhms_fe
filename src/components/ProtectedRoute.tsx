import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useRoles } from '../contexts/RoleContext';

interface ProtectedRouteProps {
    allowedRoles: string[]; // Roles allowed to access this route
    children: JSX.Element; // The component to render if authorized
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const { roles } = useRoles(); // Retrieve the roles from the context
    console.log('roles', roles)


    // Check if the user has any role that matches the allowed roles
    const isAuthorized = roles && roles.some((role) => allowedRoles.includes(role))
    console.log('isAuthorized', isAuthorized)
    if (!isAuthorized) {
        return <Navigate to="/login" />; // Redirect to login if unauthorized
    }

    return children; // Render the child component if authorized
};

export default ProtectedRoute;
