import React, { createContext, useState, useContext } from 'react';

// Define the type for the Role Context
interface RoleContextType {
    roles: string[] | null; // Array of roles or null
    setRoles: (roles: string[] | null) => void; // Function to update roles
}

// Create the Context
const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Create a Provider Component
export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [roles, setRoles] = useState<string[] | null>(
        JSON.parse(localStorage.getItem('roles') || 'null') // Parse roles from localStorage
    );

    return (
        <RoleContext.Provider value={{ roles, setRoles }}>
            {children}
        </RoleContext.Provider>
    );
};

// Create a Custom Hook to Use the Role Context
export const useRoles = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error('useRoles must be used within a RoleProvider');
    }
    return context;
};
