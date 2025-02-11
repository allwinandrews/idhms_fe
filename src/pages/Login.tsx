import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../services/authService';
import Form from '../components/common/Form';
import { loginSchema } from '../schemas/user/loginSchema';
import { RoleKeys } from '../assets/types';

import { useAppDispatch } from '../store/store';
import { loginSuccess } from '../store/slices/authSlice';
import { setRoles, setCurrentRole } from '../store/slices/roleSlice';

// ** Define action types for useReducer **
type LoginAction =
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'SET_ERROR'; value: string }
  | { type: 'TOGGLE_PASSWORD' };

interface LoginState {
  loading: boolean;
  error: string;
  showPassword: boolean;
}

// ** Initial state for useReducer **
const initialState: LoginState = {
  loading: false,
  error: '',
  showPassword: false,
};

// ** Reducer function to manage login form state **
const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [state, localDispatch] = useReducer(loginReducer, initialState);

  const handleLogin = async (data: { email: string; password: string }) => {
    localDispatch({ type: 'SET_LOADING', value: true });
    localDispatch({ type: 'SET_ERROR', value: '' });

    try {
      const roles = (await login(data.email, data.password)) as RoleKeys[];
      console.log('login roles', roles);

      if (roles.length > 0) {
        const defaultRole = roles[0];

        dispatch(loginSuccess());
        dispatch(setRoles(roles));
        dispatch(setCurrentRole(defaultRole));

        navigate(`/${defaultRole.toLowerCase()}-dashboard`);
      } else {
        localDispatch({
          type: 'SET_ERROR',
          value: 'No roles assigned to this user.',
        });
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        localDispatch({
          type: 'SET_ERROR',
          value: err.response?.data?.detail || 'Invalid email or password',
        });
      } else if (err instanceof Error) {
        localDispatch({
          type: 'SET_ERROR',
          value: err.message || 'An unexpected error occurred',
        });
      } else {
        localDispatch({
          type: 'SET_ERROR',
          value: 'An unknown error occurred',
        });
      }
    } finally {
      localDispatch({ type: 'SET_LOADING', value: false });
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

        <Form<{ email: string; password: string }>
          defaultValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
          loading={state.loading}
          fields={[
            {
              type: 'text',
              name: 'email',
              label: 'Email',
              muiProps: { placeholder: 'Enter your email' },
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
                      <IconButton
                        onClick={() =>
                          localDispatch({ type: 'TOGGLE_PASSWORD' })
                        }
                      >
                        {state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
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
      </Box>
    </Box>
  );
};

export default Login;
