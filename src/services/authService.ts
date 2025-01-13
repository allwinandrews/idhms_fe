import apiClient from './api';

// Login function
export const login = async (email: string, password: string) => {
    const response = await apiClient.post('/login/', { email, password }, { withCredentials: true });

    // Save roles to localStorage or global state
    const roles = response.data.roles; // List of roles from the API response

    return roles; // Return roles for further use
};

// Refresh Token function
export const refreshAccessToken = async () => {
    // No need to manually handle refresh token; it's sent as an HttpOnly cookie
    const response = await apiClient.post('/login/refresh/', {}, { withCredentials: true });

    // The new access token will be available for the backend to use in secure API calls
    return response.data.access; // If you need to return it for debugging/logging
};

// Register function
export const register = async (userData: { email: string; password: string; role: string }) => {
    const response = await apiClient.post('/register/', userData, { withCredentials: true });

    return response.data;
};
