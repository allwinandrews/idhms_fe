import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRoles } from '../contexts/RoleContext';

const Navbar = () => {
    const { roles, setRoles } = useRoles(); // Roles list and updater from context
    const [currentRole, setCurrentRole] = useState<string | null>(null); // Selected role
    const navigate = useNavigate();

    // Initialize roles and set the first role as default
    useEffect(() => {
        if (roles && roles.length > 0) {
            setCurrentRole(roles[0]); // Set the first role as default
        }
    }, [roles]);

    const handleRoleChange = (newRole: string) => {
        setCurrentRole(newRole); // Update selected role
        navigate(`/${newRole.toLowerCase()}-dashboard`); // Navigate to the new role's dashboard
    };

    const handleLogout = () => {
        localStorage.removeItem('roles'); // Clear roles from localStorage
        setRoles(null); // Update context
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
            <div className="flex space-x-4">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-400' : 'text-white hover:text-blue-300'
                    }
                >
                    Home
                </NavLink>
            </div>

            {roles && roles.length > 0 && (
                <div className="flex items-center space-x-4">
                    <label htmlFor="role-select" className="text-sm">
                        Switch Role:
                    </label>
                    <select
                        id="role-select"
                        value={currentRole || ''}
                        onChange={(e) => handleRoleChange(e.target.value)}
                        className="bg-gray-700 text-white rounded px-2 py-1"
                    >
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div>
                {currentRole ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                        Logout
                    </button>
                ) : (
                    <NavLink
                        to="/login"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                    >
                        Login
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
