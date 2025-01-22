import React, { createContext, useState, useContext, useEffect } from 'react';
import roleUrls from '../assets/roleUrls.json'; // Assuming this is where the JSON is located
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
        JSON.parse(localStorage.getItem("roles") || "null")
    );

    const [currentRole, setCurrentRole] = useState<RoleKeys | null>(
        (localStorage.getItem("currentRole") as RoleKeys) || null
    );

    const getAllowedUrls = (): string[] => {
        if (!roles) {
            // Extract the path values from global links
            return roleUrls.global.map((link) => link.path);
        }
        // Extract the path values for role-based links
        return roles.flatMap((role) =>
            roleUrls.roleBased[role as RoleKeys]?.map((link) => link.path) || []
        );
    };

    const isUrlAccessible = (url: string): boolean => {
        const allowedUrls = getAllowedUrls();
        return allowedUrls.includes(url);
    };

    useEffect(() => {
        if (currentRole) {
            localStorage.setItem('currentRole', currentRole); // Sync currentRole with localStorage
        }
    }, [currentRole]);

    useEffect(() => {
        if (roles) {
            localStorage.setItem('roles', JSON.stringify(roles));
        }
    }, [roles]);


    return (
        <RoleContext.Provider
            value={{
                roles,
                currentRole,
                setRoles,
                setCurrentRole,
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
        throw new Error("useRoles must be used within a RoleProvider");
    }
    return context;
};
