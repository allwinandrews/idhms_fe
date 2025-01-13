import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { useRoles } from '../contexts/RoleContext';

import { login } from '../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const { setRoles } = useRoles();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const roles = await login(email, password); // Call login API
            console.log('User roles:', roles);

            // Save roles to localStorage
            localStorage.setItem('roles', JSON.stringify(roles));
            setRoles(roles);

            // Redirect to the first role's dashboard
            if (roles.length > 0) {
                const defaultRole = roles[0]; // First role in the array
                navigate(`/${defaultRole.toLowerCase()}-dashboard`);
            } else {
                setError('No roles assigned to this user.');
            }
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                setError(err.response?.data?.detail || 'Invalid email or password');
            } else if (err instanceof Error) {
                setError(err.message || 'An unexpected error occurred');
            } else {
                setError('An unknown error occurred');
            }
        }
    };



    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle input type
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                            className="absolute top-2 right-3 text-gray-500 cursor-pointer"
                        >
                            {showPassword ? '🙈' : '👁️'} {/* Eye icon */}
                        </span>
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <a href="#" className="text-blue-500 hover:underline">
                        Forgot Password?
                    </a>
                    <p className="text-gray-600 mt-2">
                        Don’t have an account?{' '}
                        <a href="#" className="text-blue-500 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
