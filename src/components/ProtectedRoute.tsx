import React, { JSX, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/store';
import { selectIsAuthenticated, logout } from '../store/slices/authSlice';
import {
  selectRoles,
  selectCurrentRole,
  setCurrentRole,
} from '../store/slices/roleSlice';
import { RoleKeys } from '../assets/types';

interface ProtectedRouteProps {
  allowedRoles: RoleKeys[];
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const roles = useAppSelector(selectRoles);
  const currentRole = useAppSelector(selectCurrentRole);

  useEffect(() => {
    if (roles.length > 0 && currentRole && !roles.includes(currentRole)) {
      const defaultRole =
        roles.find((role) => allowedRoles.includes(role)) || roles[0];
      dispatch(setCurrentRole(defaultRole as RoleKeys));
    }
  }, [roles, currentRole, allowedRoles, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login7" replace />;
  }

  if (roles.length === 0) {
    dispatch(logout());
    return <Navigate to="/login8" replace />;
  }

  if (!roles.some((role) => allowedRoles.includes(role))) {
    const validRole = roles.find((role) => allowedRoles.includes(role));
    if (validRole) {
      dispatch(setCurrentRole(validRole as RoleKeys));
      return <Navigate to={`/${validRole.toLowerCase()}-dashboard`} replace />;
    }
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
