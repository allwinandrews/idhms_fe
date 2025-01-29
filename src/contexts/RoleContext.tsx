import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
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

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [roles, setRoles] = useState<RoleKeys[] | null>(
        JSON.parse(localStorage.getItem('roles') || 'null')
    );
    const [currentRole, setCurrentRole] = useState<RoleKeys | null>(
        (localStorage.getItem('currentRole') as RoleKeys) || null
    );

    const location = useLocation();
    const navigate = useNavigate();

    // Get allowed URLs based on roles
    const getAllowedUrls = useMemo(() => {
        return (): string[] => {
            if (!roles) return roleUrls.global.map((url) => url.path);
            return roles.flatMap((role) =>
                roleUrls.roleBased[role]?.map((url) => url.path) || []
            );
        };
    }, [roles]);

    // Check if a URL is accessible
    const isUrlAccessible = useMemo(() => {
        return (url: string): boolean => {
            const allowedUrls = getAllowedUrls();
            return allowedUrls.includes(url);
        };
    }, [getAllowedUrls]);

    // Sync current role with the URL on route change
    useEffect(() => {
        const roleFromUrl = Object.keys(roleUrls.roleBased).find((role) =>
            roleUrls.roleBased[role as RoleKeys]?.some((urlObj) => urlObj.path === location.pathname)
        ) as RoleKeys | undefined;

        if (roleFromUrl && roles?.includes(roleFromUrl)) {
            if (roleFromUrl !== currentRole) {
                setCurrentRole(roleFromUrl);
                localStorage.setItem('currentRole', roleFromUrl);
            }
        } else if (roleFromUrl && !roles?.includes(roleFromUrl)) {
            navigate('/login', { replace: true });
        }
    }, [location.pathname, currentRole, roles, navigate]);

    // Update roles state and localStorage
    const updateRoles = (newRoles: RoleKeys[] | null) => {
        if (JSON.stringify(newRoles) !== JSON.stringify(roles)) {
            setRoles(newRoles);
            localStorage.setItem('roles', JSON.stringify(newRoles));
        }
    };

    // Update currentRole state and localStorage
    const updateCurrentRole = (role: RoleKeys | null) => {
        if (role !== currentRole) {
            setCurrentRole(role);
            if (role) {
                localStorage.setItem('currentRole', role);
            } else {
                localStorage.removeItem('currentRole');
            }
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
