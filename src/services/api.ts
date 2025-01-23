import axios, { AxiosRequestConfig } from 'axios';

// Base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api';

// Axios instance setup
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Use cookies for authentication
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        console.log(`[API Request] ${config.method?.toUpperCase()} - ${config.url}`);
        return config;
    },
    (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.error('[API Response Error]', error.response?.data || error.message);
        // Optional: Add token refresh logic here
        return Promise.reject(error);
    }
);

// Reusable API Utilities
export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.get<T>(url, config).then((res) => res.data);
};

export const apiPost = async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<T> => {
    try {
        const response = await apiClient.post<T>(url, data, config);
        return response.data;
    } catch (error: unknown) {
        console.error('[API Post Error]', error);
        throw error; // Re-throw to handle upstream
    }
};

export const apiPut = async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<T> => {
    try {
        const response = await apiClient.put<T>(url, data, config);
        return response.data;
    } catch (error: unknown) {
        console.error('[API Put Error]', error);
        throw error; // Re-throw to handle upstream
    }
};


export const apiDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.delete<T>(url, config).then((res) => res.data);
};

export default apiClient;
