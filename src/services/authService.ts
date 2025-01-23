import { apiPost } from './api'; // Use utility functions from api.ts
import backendUrls from '../assets/backendUrls';

// Define the types for API responses
interface LoginResponse {
    roles: string[]; // Adjust according to the API response structure
}

interface RefreshTokenResponse {
    access: string; // Access token structure
}

interface RegisterResponse {
    message: string; // Example response structure for registration
    user?: object; // Include any additional fields your API returns
}

// Login function
export const login = async (email: string, password: string): Promise<string[]> => {
    const response = await apiPost<LoginResponse>(backendUrls.auth.login, { email, password });

    return response.roles; // Return roles for further processing
};

// Explicit Refresh Token function (optional)
export const refreshAccessToken = async (): Promise<string> => {
    const response = await apiPost<RefreshTokenResponse>('/login/refresh/');

    return response.access; // Optionally return access token for debugging/logging
};

// Register function
export const register = async (userData: { email: string; password: string; role: string }): Promise<RegisterResponse> => {
    const response = await apiPost<RegisterResponse>('/register/', userData);

    return response; // Return full response for further use
};
