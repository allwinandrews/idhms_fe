import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Button, Typography, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../services/authService';
import { useRoles } from '../contexts/RoleContext';
import TextField from '../components/common/TextField'; // Optimized TextField
import { RoleKeys } from '../assets/types';

const Login: React.FC = () => {
    const { setRoles, setCurrentRole } = useRoles();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const methods = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { handleSubmit } = methods;

    const handleLogin = async (data: { email: string; password: string }) => {
        setLoading(true);
        setError('');

        try {
            // Call login API
            const roles = (await login(data.email, data.password)) as RoleKeys[]; // Explicitly cast to RoleKeys[]

            // Update roles in context or state
            setRoles(roles);

            if (roles.length > 0) {
                const defaultRole = roles[0]; // Use the first role in the array
                setCurrentRole(defaultRole); // Update current role in context
                navigate(`/${defaultRole.toLowerCase()}-dashboard`); // Redirect based on the role
            } else {
                setError('No roles assigned to this user.'); // Handle case of no roles
            }
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                setError(err.response?.data?.detail || 'Invalid email or password');
            } else if (err instanceof Error) {
                setError(err.message || 'An unexpected error occurred');
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    maxWidth: 400,
                    width: '100%',
                }}
            >
                <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
                    Login
                </Typography>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <Box mb={2}>
                            <TextField
                                name="email"
                                label="Email"
                                validation={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Enter a valid email',
                                    },
                                }}
                                muiProps={{
                                    placeholder: 'Enter your email',
                                }}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                name="password"
                                label="Password"
                                validation={{ required: 'Password is required' }}
                                muiProps={{
                                    type: showPassword ? 'text' : 'password',
                                    placeholder: 'Enter your password',
                                    InputProps: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Box>
                        {error && (
                            <Typography color="error" mb={2} textAlign="center">
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                            startIcon={loading && <CircularProgress size={20} />}
                            sx={{ marginBottom: 2 }}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                </FormProvider>
                <Typography textAlign="center" mt={2}>
                    <a href="#" style={{ color: '#1976d2', textDecoration: 'none' }}>
                        Forgot Password?
                    </a>
                </Typography>
                <Typography textAlign="center" mt={1}>
                    Don’t have an account?{' '}
                    <a href="#" style={{ color: '#1976d2', textDecoration: 'none' }}>
                        Sign Up
                    </a>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
