import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../services/authService';
import { useRoles } from '../contexts/RoleContext';
import Form from '../components/common/Form';
import { loginSchema } from '../schemas/user/loginSchema';
import { RoleKeys } from '../assets/types';

interface LoginFormValues {
    email: string;
    password: string;
}

// Define action types
type LoginAction =
    | { type: 'SET_FIELD'; field: string; value: string }
    | { type: 'SET_LOADING'; value: boolean }
    | { type: 'SET_ERROR'; value: string }
    | { type: 'TOGGLE_PASSWORD' };

interface LoginState {
    email: string;
    password: string;
    loading: boolean;
    error: string;
    showPassword: boolean;
}

const initialState: LoginState = {
    email: '',
    password: '',
    loading: false,
    error: '',
    showPassword: false,
};

const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_LOADING':
            return { ...state, loading: action.value };
        case 'SET_ERROR':
            return { ...state, error: action.value };
        case 'TOGGLE_PASSWORD':
            return { ...state, showPassword: !state.showPassword };
        default:
            return state;
    }
};

const Login: React.FC = () => {
    const { setRoles, setCurrentRole } = useRoles();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(loginReducer, initialState);

    const handleLogin = async (data: LoginFormValues) => {
        dispatch({ type: 'SET_LOADING', value: true });
        dispatch({ type: 'SET_ERROR', value: '' });

        try {
            const roles = (await login(data.email, data.password)) as RoleKeys[];
            setRoles(roles);

            if (roles.length > 0) {
                const defaultRole = roles[0];
                setCurrentRole(defaultRole);
                navigate(`/${defaultRole.toLowerCase()}-dashboard`);
            } else {
                dispatch({ type: 'SET_ERROR', value: 'No roles assigned to this user.' });
            }
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                dispatch({ type: 'SET_ERROR', value: err.response?.data?.detail || 'Invalid email or password' });
            } else if (err instanceof Error) {
                dispatch({ type: 'SET_ERROR', value: err.message || 'An unexpected error occurred' });
            } else {
                dispatch({ type: 'SET_ERROR', value: 'An unknown error occurred' });
            }
        } finally {
            dispatch({ type: 'SET_LOADING', value: false });
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'background.default',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 2,
                    maxWidth: 400,
                    width: '100%',
                }}
            >
                <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
                    Login
                </Typography>
                <Form<LoginFormValues>
                    defaultValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleLogin}
                    loading={state.loading}
                    fields={[
                        {
                            type: 'text',
                            name: 'email',
                            label: 'Email',
                            muiProps: {
                                placeholder: 'Enter your email',
                            },
                        },
                        {
                            type: 'text',
                            name: 'password',
                            label: 'Password',
                            muiProps: {
                                type: state.showPassword ? 'text' : 'password',
                                placeholder: 'Enter your password',
                                InputProps: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => dispatch({ type: 'TOGGLE_PASSWORD' })}>
                                                {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            },
                        },
                    ]}
                />
                {state.error && (
                    <Typography color="error" mb={2} textAlign="center">
                        {state.error}
                    </Typography>
                )}
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
