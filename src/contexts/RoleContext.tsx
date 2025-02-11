import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { roleUrls } from '../assets/roleUrls'; // Updated to TS file
import { RoleKeys } from '../assets/types';

interface RoleContextType {
  roles: RoleKeys[] | null;
  currentRole: RoleKeys | null;
  setRoles: (roles: RoleKeys[] | null) => void;
  setCurrentRole: (role: RoleKeys | null) => void;
  getAllowedUrls: () => string[];
  isUrlAccessible: (url: string) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve stored roles from localStorage or assign default values
  const storedRoles = useMemo<RoleKeys[]>(() => {
    const savedRoles = JSON.parse(localStorage.getItem('roles') || 'null');
    return Array.isArray(savedRoles) && savedRoles.length > 0
      ? (savedRoles as RoleKeys[])
      : ([] as RoleKeys[]);
  }, []);

  const storedCurrentRole = useMemo<RoleKeys>(() => {
    const savedCurrentRole = localStorage.getItem(
      'currentRole'
    ) as RoleKeys | null;
    return savedCurrentRole && storedRoles.includes(savedCurrentRole)
      ? savedCurrentRole
      : storedRoles[0]; // Default to first valid role
  }, [storedRoles]);

  const [roles, setRoles] = useState<RoleKeys[] | null>(storedRoles);
  const [currentRole, setCurrentRole] = useState<RoleKeys | null>(
    storedCurrentRole
  );

  useEffect(() => {
    localStorage.setItem('roles', JSON.stringify(roles));
    localStorage.setItem('currentRole', currentRole || '');
  }, [roles, currentRole]);

  // Get allowed URLs based on roles
  const getAllowedUrls = useMemo(() => {
    return (): string[] => {
      if (!roles) return roleUrls.global.map((url) => url.path);
      return roles.flatMap(
        (role) => roleUrls.roleBased[role]?.map((url) => url.path) || []
      );
    };
  }, [roles]);

  // Check if a URL is accessible
  const isUrlAccessible = useMemo(() => {
    return (url: string): boolean => {
      if (!roles) return false;
      const allowedUrls = getAllowedUrls();
      return allowedUrls.includes(url);
    };
  }, [getAllowedUrls, roles]);

  // Sync current role with the URL on route change
  useEffect(() => {
    console.log(
      '🔄 [RoleContext.tsx] Route Change Detected:',
      location.pathname
    );

    if (!roles) {
      console.warn(
        '🚨 [RoleContext.tsx] Roles not available yet, skipping redirect.'
      );
      return; // Prevents early redirects
    }

    const normalizedRoles = roles.map((role) => role.toLowerCase() as RoleKeys);
    const normalizedCurrentRole = currentRole
      ? (currentRole.toLowerCase() as RoleKeys)
      : null;

    console.log('📌 [RoleContext.tsx] Normalized Roles:', normalizedRoles);
    console.log(
      '📌 [RoleContext.tsx] Normalized Current Role:',
      normalizedCurrentRole
    );

    const roleFromUrl = Object.keys(roleUrls.roleBased).find((role) =>
      roleUrls.roleBased[role as RoleKeys]?.some(
        (urlObj) => urlObj.path === location.pathname
      )
    ) as RoleKeys | undefined;

    console.log('🔍 [RoleContext.tsx] Detected Role from URL:', roleFromUrl);

    if (roleFromUrl && normalizedRoles.includes(roleFromUrl)) {
      if (roleFromUrl !== normalizedCurrentRole) {
        console.log('✅ [RoleContext.tsx] Setting Current Role:', roleFromUrl);
        setCurrentRole(roleFromUrl);
        localStorage.setItem('currentRole', roleFromUrl);
      }
    } else if (roleFromUrl && !normalizedRoles.includes(roleFromUrl)) {
      console.error(
        '🚨 [RoleContext.tsx] Unauthorized role access. Redirecting to /login6'
      );
      navigate('/login', { replace: true });
      // navigate('/login7', { replace: true });
    }
  }, [location.pathname, currentRole, roles, navigate]);

  // Update roles state and localStorage
  const updateRoles = (newRoles: RoleKeys[] | null) => {
    if (!newRoles || JSON.stringify(newRoles) === JSON.stringify(roles)) return;
    setRoles(newRoles);
    localStorage.setItem('roles', JSON.stringify(newRoles));

    if (!newRoles.includes(currentRole as RoleKeys)) {
      const defaultRole = newRoles.length ? newRoles[0] : 'patient';
      setCurrentRole(defaultRole as RoleKeys); // Ensure valid role assignment
      localStorage.setItem('currentRole', defaultRole);
    }
  };

  // Update currentRole state and localStorage
  const updateCurrentRole = (role: RoleKeys | null) => {
    if (role === currentRole) return;
    setCurrentRole(role);
    if (role) {
      localStorage.setItem('currentRole', role);
    } else {
      localStorage.removeItem('currentRole');
    }
  };

  return (
    <RoleContext.Provider
      value={{
        roles,
        currentRole,
        setRoles: updateRoles,
        setCurrentRole: updateCurrentRole,
        getAllowedUrls,
        isUrlAccessible,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRoles = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRoles must be used within a RoleProvider');
  }
  return context;
};
